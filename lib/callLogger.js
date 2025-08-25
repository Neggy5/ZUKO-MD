const fs = require('fs');
const path = require('path');

const CALL_LOG_FILE = './data/call_logs.json';

function logCall(callerId, action, success = true) {
    try {
        let logs = [];
        if (fs.existsSync(CALL_LOG_FILE)) {
            logs = JSON.parse(fs.readFileSync(CALL_LOG_FILE, 'utf8'));
        }
        
        logs.push({
            callerId,
            action,
            success,
            timestamp: Date.now(),
            date: new Date().toISOString()
        });
        
        // Keep only the last 1000 logs
        if (logs.length > 1000) {
            logs = logs.slice(-1000);
        }
        
        fs.writeFileSync(CALL_LOG_FILE, JSON.stringify(logs, null, 2));
    } catch (error) {
        console.error('Error logging call:', error);
    }
}

module.exports = {
    logCall
};