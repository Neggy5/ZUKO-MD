/**
 * Cleanup Utility - Handles automatic cleanup of temp files
 * ES Module version
 */

import fs from 'fs';
import path from 'path';
import { getTempDir, deleteTempFiles } from './tempManager.js';

let cleanupInterval = null;

/**
 * Start automatic cleanup interval
 * @param {number} intervalMinutes - How often to run cleanup (default 10)
 * @param {number} fileAgeHours - Delete files older than this many hours (default 24)
 */
function startCleanup(intervalMinutes = 10, fileAgeHours = 24) {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
  }
  
  // Run cleanup immediately on start
  cleanupOldFiles(fileAgeHours);
  
  // Set up interval
  cleanupInterval = setInterval(() => {
    cleanupOldFiles(fileAgeHours);
  }, intervalMinutes * 60 * 1000);
  
  console.log(`🧹 Cleanup system started (runs every ${intervalMinutes} minutes)`);
}

/**
 * Stop automatic cleanup
 */
function stopCleanup() {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
    console.log('🧹 Cleanup system stopped');
  }
}

/**
 * Clean up old files in temp directory
 * @param {number} maxAgeHours - Maximum age in hours
 */
function cleanupOldFiles(maxAgeHours = 24) {
  try {
    const tempDir = getTempDir();
    const now = Date.now();
    const maxAge = maxAgeHours * 60 * 60 * 1000;
    
    if (!fs.existsSync(tempDir)) {
      return;
    }
    
    const files = fs.readdirSync(tempDir);
    let deletedCount = 0;
    let deletedSize = 0;
    
    files.forEach(file => {
      const filePath = path.join(tempDir, file);
      try {
        const stats = fs.statSync(filePath);
        
        if (stats.isFile() && (now - stats.mtimeMs) > maxAge) {
          const fileSize = stats.size;
          fs.unlinkSync(filePath);
          deletedCount++;
          deletedSize += fileSize;
        }
      } catch (err) {
        // Skip files that can't be accessed
      }
    });
    
    if (deletedCount > 0) {
      const sizeMB = (deletedSize / (1024 * 1024)).toFixed(2);
      console.log(`🧹 Cleaned up ${deletedCount} old files (${sizeMB} MB freed)`);
    }
    
    return { deletedCount, deletedSize };
  } catch (error) {
    console.error('Error during cleanup:', error.message);
    return { deletedCount: 0, deletedSize: 0 };
  }
}

/**
 * Get temp directory stats
 */
function getTempStats() {
  try {
    const tempDir = getTempDir();
    if (!fs.existsSync(tempDir)) {
      return { fileCount: 0, totalSize: 0, files: [] };
    }
    
    const files = fs.readdirSync(tempDir);
    let totalSize = 0;
    const fileList = [];
    
    files.forEach(file => {
      const filePath = path.join(tempDir, file);
      try {
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          totalSize += stats.size;
          fileList.push({
            name: file,
            size: stats.size,
            sizeMB: (stats.size / (1024 * 1024)).toFixed(2),
            modified: stats.mtime
          });
        }
      } catch (err) {
        // Skip
      }
    });
    
    return {
      fileCount: files.length,
      totalSize: totalSize,
      totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
      files: fileList
    };
  } catch (error) {
    return { fileCount: 0, totalSize: 0, totalSizeMB: '0', files: [] };
  }
}

export {
  startCleanup,
  stopCleanup,
  cleanupOldFiles,
  getTempStats
};