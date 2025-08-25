/**
 * Get contact information
 * @param {object} sock - WhatsApp socket
 * @param {string} contactId - Contact JID
 * @returns {Promise<object>} - Contact details
 */
async function getContact(sock, contactId) {
    try {
        const [contact] = await sock.onWhatsApp(contactId);
        if (!contact) throw new Error('Contact not found');

        const profile = await sock.profilePictureUrl(contactId, 'image') || '';
        const name = await sock.getName(contactId);

        return {
            id: contactId.split('@')[0],
            number: contactId.replace('@s.whatsapp.net', ''),
            name: name || 'Unknown',
            username: contactId.split('@')[0],
            profile
        };
    } catch (error) {
        console.error('Contact Info Error:', error);
        throw new Error('Could not fetch contact details');
    }
}

module.exports = {
    getContact
};