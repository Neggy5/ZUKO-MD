const { execSync } = require('child_process');

// Check if FFmpeg is installed
try {
    execSync('ffmpeg -version');
    module.exports = { ffmpeg: true };
} catch (error) {
    console.error('❌ FFmpeg is not installed! Audio conversion will not work.');
    module.exports = { ffmpeg: false };
}