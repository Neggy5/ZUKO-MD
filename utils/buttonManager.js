/**
 * Complete Button Manager for @kelvdra/baileys
 * Supports interactive buttons, lists, templates, and button responses
 */

class ButtonManager {
    constructor(sock) {
        this.sock = sock;
    }

    /**
     * Send interactive buttons (Modern WhatsApp style)
     */
    async sendButtons(jid, options, quoted = null) {
        const {
            text,
            footer = 'Powered by ZUKO-MD',
            buttons = [],
            title,
            image,
            video
        } = options;

        try {
            // Format buttons for @kelvdra/baileys
            const buttonArray = buttons.map(btn => ({
                buttonId: btn.id || btn.text.toLowerCase().replace(/\s/g, '_'),
                buttonText: { displayText: btn.text },
                type: btn.type === 'url' ? 2 : 1 // 1=reply, 2=url
            }));

            const message = {
                text: text,
                footer: footer,
                buttons: buttonArray,
                headerType: 1
            };

            if (title) message.title = title;
            if (image) message.image = image;
            if (video) message.video = video;

            await this.sock.sendMessage(jid, message, { quoted });
            return true;

        } catch (error) {
            console.error('[Button Error]', error.message);
            
            // Fallback: Send as text with numbered options
            let fallback = `${text}\n\n`;
            buttons.forEach((btn, i) => {
                fallback += `${i + 1}. ${btn.text}`;
                if (btn.type === 'url') fallback += ` - ${btn.url}`;
                fallback += '\n';
            });
            fallback += `\nReply with the number to select.`;
            
            await this.sock.sendMessage(jid, { text: fallback }, { quoted });
            return false;
        }
    }

    /**
     * Send interactive list message (for multiple options)
     */
    async sendList(jid, options, quoted = null) {
        const {
            text,
            footer = 'Powered by ZUKO-MD',
            title = 'Select an option',
            buttonText = '📋 Menu',
            sections = []
        } = options;

        try {
            const listSections = sections.map(section => ({
                title: section.title,
                rows: section.rows.map(row => ({
                    title: row.title,
                    description: row.description || '',
                    rowId: row.id
                }))
            }));

            await this.sock.sendMessage(jid, {
                text: text,
                footer: footer,
                title: title,
                sections: listSections,
                buttonText: buttonText
            }, { quoted });
            
            return true;

        } catch (error) {
            console.error('[List Error]', error.message);
            
            // Fallback
            let fallback = `${text}\n\n`;
            sections.forEach(section => {
                fallback += `\n📁 ${section.title}\n`;
                section.rows.forEach((row, i) => {
                    fallback += `   ${i + 1}. ${row.title}\n`;
                    if (row.description) fallback += `      ${row.description}\n`;
                });
            });
            
            await this.sock.sendMessage(jid, { text: fallback }, { quoted });
            return false;
        }
    }

    /**
     * Send template with media and buttons
     */
    async sendTemplate(jid, options, quoted = null) {
        const {
            text,
            footer,
            buttons = [],
            image,
            video,
            gif
        } = options;

        try {
            const buttonArray = buttons.map(btn => ({
                buttonId: btn.id || btn.text.toLowerCase().replace(/\s/g, '_'),
                buttonText: { displayText: btn.text },
                type: 1
            }));

            let message = {
                text: text,
                footer: footer,
                buttons: buttonArray,
                headerType: 2
            };

            if (image) {
                message.image = image;
                message.headerType = 4;
            }
            if (video) {
                message.video = video;
                message.headerType = 5;
            }
            if (gif) {
                message.gif = gif;
                message.headerType = 6;
            }

            await this.sock.sendMessage(jid, message, { quoted });
            return true;

        } catch (error) {
            console.error('[Template Error]', error.message);
            return await this.sendButtons(jid, { text, footer, buttons }, quoted);
        }
    }

    /**
     * Create navigation buttons
     */
    createNavButtons(currentPage, totalPages, commandName, customId = null) {
        const buttons = [];
        const baseId = customId || commandName;
        
        if (currentPage > 1) {
            buttons.push({
                text: '◀️ Previous',
                id: `${baseId}_page_${currentPage - 1}`,
                type: 'reply'
            });
        }
        
        buttons.push({
            text: '🏠 Main Menu',
            id: 'menu_main',
            type: 'reply'
        });
        
        if (currentPage < totalPages) {
            buttons.push({
                text: 'Next ▶️',
                id: `${baseId}_page_${currentPage + 1}`,
                type: 'reply'
            });
        }
        
        return buttons;
    }

    /**
     * Create confirmation buttons (Yes/No)
     */
    createConfirmButtons(action, id, customText = null) {
        return [
            {
                text: customText?.yes || '✅ Yes',
                id: `${action}_confirm_${id}`,
                type: 'reply'
            },
            {
                text: customText?.no || '❌ No',
                id: `${action}_cancel_${id}`,
                type: 'reply'
            }
        ];
    }

    /**
     * Create action buttons after command execution
     */
    createActionButtons(commandName, additionalButtons = []) {
        const buttons = [
            {
                text: '🔄 Run Again',
                id: commandName,
                type: 'reply'
            },
            {
                text: '🏠 Main Menu',
                id: 'menu_main',
                type: 'reply'
            }
        ];
        
        return [...buttons, ...additionalButtons];
    }

    /**
     * Create numbered action buttons (1, 2, 3...)
     */
    createNumberedButtons(items, prefix = 'select') {
        return items.map((item, index) => ({
            text: `${index + 1}. ${item.label}`,
            id: `${prefix}_${item.id || index}`,
            type: 'reply'
        }));
    }

    /**
     * Send paginated message with navigation
     */
    async sendPaginated(jid, items, page, itemsPerPage, options, quoted = null) {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = items.slice(start, end);
        
        const content = options.renderer(pageItems, page, totalPages);
        const navButtons = this.createNavButtons(page, totalPages, options.commandName);
        
        return await this.sendButtons(jid, {
            text: content,
            footer: options.footer || `Page ${page} of ${totalPages}`,
            buttons: navButtons
        }, quoted);
    }
}

export { ButtonManager };