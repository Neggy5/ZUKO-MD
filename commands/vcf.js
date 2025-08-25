const fs = require('fs');
const path = require('path');
const { getContact } = require('@whiskeysockets/baileys');

async function vcfCommand(sock, chatId, message) {
    try {
        // Validate group chat
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { 
                text: '❌ This command only works in groups!' 
            }, { quoted: message });
        }

        // Verify admin status
        const metadata = await sock.groupMetadata(chatId);
        const participant = message.key.participant || message.key.remoteJid;
        const isAdmin = metadata.participants.find(p => p.id === participant)?.admin;

        if (!isAdmin && !message.key.fromMe) {
            return await sock.sendMessage(chatId, { 
                text: '❌ Only admins can export contacts!' 
            }, { quoted: message });
        }

        // Create temp directory if not exists
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        // Process participants
        const vcfContacts = [];
        const failedContacts = [];
        const participants = metadata.participants;

        for (const member of participants) {
            try {
                let contact;
                try {
                    contact = await getContact(sock, member.id);
                } catch {
                    contact = { notify: member.id.split('@')[0] };
                }

                const number = member.id.replace('@s.whatsapp.net', '');
                const name = contact?.notify || contact?.name || contact?.pushname || number;

                if (/^\d+$/.test(number)) {
                    vcfContacts.push({
                        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;TYPE=CELL:${number}\nEND:VCARD`
                    });
                }
            } catch (error) {
                failedContacts.push(member.id);
                console.error(`Contact error for ${member.id}:`, error);
            }
        }

        if (vcfContacts.length === 0) {
            return await sock.sendMessage(chatId, { 
                text: '❌ No valid contacts found to export' 
            }, { quoted: message });
        }

        // Create VCF file
        const fileName = `contacts_${metadata.id.split('@')[0]}_${Date.now()}.vcf`;
        const filePath = path.join(tempDir, fileName);
        
        const vcfContent = vcfContacts.map(c => c.vcard).join('\n');
        fs.writeFileSync(filePath, vcfContent);

        // Send results
        const resultMessage = `✅ Successfully exported ${vcfContacts.length} contacts` +
                             (failedContacts.length > 0 ? 
                             `\n❌ Failed to process ${failedContacts.length} contacts` : '');

        await sock.sendMessage(
            chatId,
            {
                document: { url: filePath },
                fileName: `${metadata.subject.replace(/[^\w\s]/gi, '') || 'group'}_contacts.vcf`,
                mimetype: 'text/vcard',
                caption: resultMessage
            },
            { quoted: message }
        );

        // Clean up after sending
        setTimeout(() => {
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch (cleanError) {
                console.error('Cleanup error:', cleanError);
            }
        }, 30000);

    } catch (error) {
        console.error('VCF command error:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ An error occurred while processing your request' 
        }, { quoted: message });
    }
}

module.exports = vcfCommand;