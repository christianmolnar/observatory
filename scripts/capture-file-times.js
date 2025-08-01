const fs = require('fs');
const path = require('path');

/**
 * DESIGN-PROTECTED: Core file timestamp capture system
 * This script captures actual file modification times for image sorting
 * DO NOT MODIFY WITHOUT EXPLICIT PERMISSION
 */

function captureFileTimestamps() {
  const publicImagesDir = path.join(__dirname, '..', 'public', 'images');
  const outputFile = path.join(__dirname, '..', 'src', 'data', 'file-timestamps.json');
  
  const timestamps = {};
  
  function scanDirectory(dir, relativePath = '') {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          scanDirectory(fullPath, path.join(relativePath, item));
        } else if (stats.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
          const relativeFilePath = path.join(relativePath, item).replace(/\\/g, '/');
          timestamps[relativeFilePath] = {
            mtime: stats.mtime.toISOString(),
            mtimeMs: stats.mtimeMs,
            ctime: stats.ctime.toISOString(),
            ctimeMs: stats.ctimeMs,
            filename: item
          };
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error.message);
    }
  }
  
  console.log('Capturing file modification timestamps...');
  scanDirectory(publicImagesDir);
  
  // Write timestamps to file
  try {
    fs.writeFileSync(outputFile, JSON.stringify(timestamps, null, 2));
    console.log(`File timestamps saved to ${outputFile}`);
    console.log(`Captured ${Object.keys(timestamps).length} files`);
  } catch (error) {
    console.error('Error writing timestamps file:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  captureFileTimestamps();
}

module.exports = { captureFileTimestamps };
