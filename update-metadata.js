#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Paths
const METADATA_FILE = '/Users/christian/Repos/MapleValleyObservatory/src/data/metadata.json';
const IMAGES_BASE = '/Users/christian/Repos/MapleValleyObservatory/public/images';

// Image folders to scan (matches the global config structure)
const SCAN_FOLDERS = [
  'astrophotography/featured',
  'astrophotography/deep-sky/galaxies',
  'astrophotography/deep-sky/nebulas',
  'astrophotography/deep-sky/star-clusters',
  'astrophotography/solar-system/solar',
  'astrophotography/solar-system/lunar',
  'astrophotography/solar-system/planets',
  'astrophotography/solar-system/events',
  'astrophotography/solar-system/events/total-eclipse-2017',
  'wide-field',
  'terrestrial/yellowstone',
  'terrestrial/grand-tetons',
  'equipment'
];

// Supported image and video extensions
const MEDIA_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.avif', '.webp', '.mp4', '.mov', '.avi', '.webm'];

function findImages() {
  const allImages = [];
  
  SCAN_FOLDERS.forEach(folder => {
    const fullPath = path.join(IMAGES_BASE, folder);
    
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath);
      
      files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (MEDIA_EXTENSIONS.includes(ext)) {
          allImages.push({
            filename: file,
            folder: folder,
            fullPath: path.join(fullPath, file)
          });
        }
      });
    }
  });
  
  return allImages;
}

function loadExistingMetadata() {
  try {
    const content = fs.readFileSync(METADATA_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.log('Could not load existing metadata, starting fresh');
    return {};
  }
}

// Astronomical object catalog and name database
const ASTRONOMICAL_OBJECTS = {
  // Messier Catalog
  'M1': { catalog: 'M1', name: 'Crab Nebula', type: 'nebula' },
  'M31': { catalog: 'M31', name: 'Andromeda Galaxy', type: 'galaxy' },
  'M33': { catalog: 'M33', name: 'Triangulum Galaxy', type: 'galaxy' },
  'M42': { catalog: 'M42', name: 'Orion Nebula', type: 'nebula' },
  'M45': { catalog: 'M45', name: 'Pleiades', type: 'star cluster' },
  'M51': { catalog: 'M51', name: 'Whirlpool Galaxy', type: 'galaxy' },
  'M57': { catalog: 'M57', name: 'Ring Nebula', type: 'nebula' },
  'M81': { catalog: 'M81', name: 'Bode\'s Galaxy', type: 'galaxy' },
  'M82': { catalog: 'M82', name: 'Cigar Galaxy', type: 'galaxy' },
  'M101': { catalog: 'M101', name: 'Pinwheel Galaxy', type: 'galaxy' },
  'M104': { catalog: 'M104', name: 'Sombrero Galaxy', type: 'galaxy' },
  
  // NGC Catalog (New General Catalogue)
  'NGC7000': { catalog: 'NGC7000', name: 'North America Nebula', type: 'nebula' },
  'NGC7635': { catalog: 'NGC7635', name: 'Bubble Nebula', type: 'nebula' },
  'NGC6960': { catalog: 'NGC6960', name: 'Western Veil Nebula', type: 'nebula' },
  'NGC6992': { catalog: 'NGC6992', name: 'Eastern Veil Nebula', type: 'nebula' },
  'NGC2070': { catalog: 'NGC2070', name: 'Tarantula Nebula', type: 'nebula' },
  'NGC281': { catalog: 'NGC281', name: 'Pacman Nebula', type: 'nebula' },
  'NGC7293': { catalog: 'NGC7293', name: 'Helix Nebula', type: 'nebula' },
  'NGC1976': { catalog: 'NGC1976', name: 'Orion Nebula', type: 'nebula' },
  'NGC598': { catalog: 'NGC598', name: 'Triangulum Galaxy', type: 'galaxy' },
  'NGC224': { catalog: 'NGC224', name: 'Andromeda Galaxy', type: 'galaxy' },
  
  // IC Catalog (Index Catalogue)
  'IC445': { catalog: 'IC445', name: 'Jellyfish Nebula', type: 'nebula' },
  'IC1396': { catalog: 'IC1396', name: 'Elephant\'s Trunk Nebula', type: 'nebula' },
  'IC410': { catalog: 'IC410', name: 'Tadpoles Nebula', type: 'nebula' },
  'IC1805': { catalog: 'IC1805', name: 'Heart Nebula', type: 'nebula' },
  'IC1848': { catalog: 'IC1848', name: 'Soul Nebula', type: 'nebula' },
  
  // Sharpless Catalog (Sh2)
  'SH2-132': { catalog: 'Sh2-132', name: 'Lobster Claw Nebula', type: 'nebula' },
  'SH2-155': { catalog: 'Sh2-155', name: 'Cave Nebula', type: 'nebula' },
  'SH2-140': { catalog: 'Sh2-140', name: 'Wizard Nebula', type: 'nebula' },
  'SH2-129': { catalog: 'Sh2-129', name: 'Flying Bat Nebula', type: 'nebula' },
  'SH2-101': { catalog: 'Sh2-101', name: 'Tulip Nebula', type: 'nebula' },
  
  // Common alternative names mapping to proper catalogs
  'PELICAN': { catalog: 'NGC7000', name: 'North America Nebula', type: 'nebula' },
  'JELLYFISH': { catalog: 'IC445', name: 'Jellyfish Nebula', type: 'nebula' },
  'LOBSTERCLAW': { catalog: 'Sh2-132', name: 'Lobster Claw Nebula', type: 'nebula' },
  'WIZARD': { catalog: 'Sh2-140', name: 'Wizard Nebula', type: 'nebula' },
  'CRAB': { catalog: 'M1', name: 'Crab Nebula', type: 'nebula' },
  'ANDROMEDA': { catalog: 'M31', name: 'Andromeda Galaxy', type: 'galaxy' },
  'ORION': { catalog: 'M42', name: 'Orion Nebula', type: 'nebula' },
  'PLEIADES': { catalog: 'M45', name: 'Pleiades', type: 'star cluster' },
  'WHIRLPOOL': { catalog: 'M51', name: 'Whirlpool Galaxy', type: 'galaxy' }
};

// Parse astronomical object from filename
function parseAstronomicalObject(filename) {
  // Remove extension and clean filename
  const baseName = filename.replace(/\.[^/.]+$/, '');
  
  // Common processing indicators to ignore
  const processingTerms = ['DONE', 'FINISHED', 'FINAL', 'PROCESSED', 'LR', 'PI', 'PS', '1', '2', '3'];
  
  // Split by common separators
  const parts = baseName.split(/[-_\s]+/).filter(part => 
    part.length > 0 && !processingTerms.includes(part.toUpperCase())
  );
  
  let catalogDesignation = '';
  let objectName = '';
  
  // Look for catalog patterns
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const upperPart = part.toUpperCase();
    
    // Direct catalog lookup
    if (ASTRONOMICAL_OBJECTS[upperPart]) {
      const obj = ASTRONOMICAL_OBJECTS[upperPart];
      catalogDesignation = obj.catalog;
      objectName = obj.name;
      break;
    }
    
    // Check for catalog designation patterns
    // Messier: M + number
    if (/^M\d+$/.test(upperPart)) {
      if (ASTRONOMICAL_OBJECTS[upperPart]) {
        const obj = ASTRONOMICAL_OBJECTS[upperPart];
        catalogDesignation = obj.catalog;
        objectName = obj.name;
        break;
      } else {
        catalogDesignation = upperPart;
        objectName = `Messier ${upperPart.substring(1)}`;
        break;
      }
    }
    
    // NGC: NGC + number
    if (/^NGC\d+$/.test(upperPart)) {
      if (ASTRONOMICAL_OBJECTS[upperPart]) {
        const obj = ASTRONOMICAL_OBJECTS[upperPart];
        catalogDesignation = obj.catalog;
        objectName = obj.name;
        break;
      } else {
        catalogDesignation = upperPart;
        objectName = `${upperPart}`;
        break;
      }
    }
    
    // IC: IC + number
    if (/^IC\d+$/.test(upperPart)) {
      if (ASTRONOMICAL_OBJECTS[upperPart]) {
        const obj = ASTRONOMICAL_OBJECTS[upperPart];
        catalogDesignation = obj.catalog;
        objectName = obj.name;
        break;
      } else {
        catalogDesignation = upperPart;
        objectName = `${upperPart}`;
        break;
      }
    }
    
    // Sharpless: SH2 followed by number in next part
    if (upperPart === 'SH2' && i + 1 < parts.length && /^\d+$/.test(parts[i + 1])) {
      const number = parts[i + 1];
      const normalizedSh = `SH2-${number}`;
      if (ASTRONOMICAL_OBJECTS[normalizedSh]) {
        const obj = ASTRONOMICAL_OBJECTS[normalizedSh];
        catalogDesignation = obj.catalog;
        objectName = obj.name;
        break;
      } else {
        catalogDesignation = `Sh2-${number}`;
        objectName = catalogDesignation;
        break;
      }
    }
    
    // Sharpless: SH2-number (with dash)
    if (/^SH2-\d+$/.test(upperPart)) {
      const normalizedSh = upperPart; // Already in correct format
      if (ASTRONOMICAL_OBJECTS[normalizedSh]) {
        const obj = ASTRONOMICAL_OBJECTS[normalizedSh];
        catalogDesignation = obj.catalog;
        objectName = obj.name;
        break;
      } else {
        catalogDesignation = `Sh2-${upperPart.substring(4)}`;
        objectName = catalogDesignation;
        break;
      }
    }
    
    // Sharpless: SH + number (without dash)
    if (/^SH\d+$/.test(upperPart)) {
      const number = upperPart.substring(2);
      const normalizedSh = `SH2-${number}`;
      if (ASTRONOMICAL_OBJECTS[normalizedSh]) {
        const obj = ASTRONOMICAL_OBJECTS[normalizedSh];
        catalogDesignation = obj.catalog;
        objectName = obj.name;
        break;
      } else {
        catalogDesignation = `Sh2-${number}`;
        objectName = catalogDesignation;
        break;
      }
    }
  }
  
  // If no catalog found, look for common names in the filename
  if (!catalogDesignation) {
    const combinedParts = parts.join(' ').toUpperCase();
    
    for (const [key, obj] of Object.entries(ASTRONOMICAL_OBJECTS)) {
      // Skip catalog designations, look for common names
      if (!/^[A-Z]+\d+/.test(key) && combinedParts.includes(key)) {
        catalogDesignation = obj.catalog;
        objectName = obj.name;
        break;
      }
    }
  }
  
  // If still no match, try to extract object name from filename
  if (!objectName) {
    // Look for "The" + name patterns
    const theMatch = baseName.match(/[-_]The[-_]([A-Za-z]+)/i);
    if (theMatch) {
      objectName = `The ${theMatch[1]}`;
    } else {
      // Use the cleaned filename parts
      objectName = parts
        .filter(part => !/^\d+$/.test(part)) // Remove pure numbers
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
    }
  }
  
  return {
    catalogDesignation: catalogDesignation,
    objectName: objectName || baseName
  };
}

function generateObjectName(filename) {
  // Remove file extension
  let name = filename.replace(/\.[^.]+$/, '');
  
  // Replace hyphens, underscores, and dots with spaces
  name = name.replace(/[-_.]/g, ' ');
  
  // Convert to uppercase
  name = name.toUpperCase();
  
  return name;
}

// Helper function to clean terrestrial/equipment names from filename
function generateCleanName(filename) {
  // Remove file extension
  let name = filename.replace(/\.[^.]+$/, '');
  
  // Handle camelCase by inserting spaces before uppercase letters
  name = name.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // Replace hyphens, underscores, and dots with spaces
  name = name.replace(/[-_.]/g, ' ');
  
  // Remove common camera/phone prefixes and suffixes
  name = name.replace(/^(IMG|DSC|DSCN|P|PHOTO|PIC|IMAGE)\s*/i, '');
  name = name.replace(/\s*(JPG|JPEG|PNG|AVIF|WEBP|iOS)$/i, '');
  
  // Remove sequences of numbers in the middle or end
  name = name.replace(/\s+\d{8,}\s*/g, ' '); // Remove 8+ digit sequences (timestamps)
  
  // Remove numbers at the end (handles both spaced and unspaced numbers)
  name = name.replace(/\s*\d+\s*$/, ''); // Remove numbers with optional spaces at end
  name = name.replace(/\d+$/, ''); // Remove numbers directly attached at end (like "Basin10" -> "Basin")
  
  // Clean up extra spaces
  name = name.replace(/\s+/g, ' ').trim();
  
  // Capitalize each word properly
  name = name.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
    
  return name || 'Untitled';
}

// Helper function to generate location from folder path
function generateLocationFromFolder(folder) {
  if (!folder.startsWith('terrestrial/')) {
    return '';
  }
  
  // Extract the location part after 'terrestrial/'
  const locationPart = folder.replace('terrestrial/', '');
  
  // Convert folder names to proper location names
  const locationMap = {
    'yellowstone': 'Yellowstone National Park',
    'grand-tetons': 'Grand Teton National Park',
    'grand-teton': 'Grand Teton National Park',
    'yosemite': 'Yosemite National Park',
    'glacier': 'Glacier National Park',
    'zion': 'Zion National Park',
    'bryce': 'Bryce Canyon National Park',
    'arches': 'Arches National Park',
    'death-valley': 'Death Valley National Park',
    'joshua-tree': 'Joshua Tree National Park',
    'crater-lake': 'Crater Lake National Park',
    'olympic': 'Olympic National Park',
    'mount-rainier': 'Mount Rainier National Park',
    'north-cascades': 'North Cascades National Park'
  };
  
  // Check if we have a specific mapping
  if (locationMap[locationPart]) {
    return locationMap[locationPart];
  }
  
  // Otherwise, clean up the folder name
  return locationPart
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getImageType(folder) {
  if (folder.startsWith('terrestrial/')) {
    return 'terrestrial';
  } else if (folder === 'equipment') {
    return 'equipment';
  } else {
    return 'astrophotography';
  }
}

function createMetadataEntry(image) {
  const imageType = getImageType(image.folder);
  
  switch (imageType) {
    case 'terrestrial':
      return {
        "location": generateLocationFromFolder(image.folder), // e.g., "Yellowstone National Park"
        "name": generateCleanName(image.filename),      // e.g., "Mammoth Springs"
        "protected": false    // Set to true to prevent automatic updates
      };
      
    case 'equipment':
      return {
        "equipmentName": generateCleanName(image.filename), // e.g., "SeeStar S50"
        "equipmentInfo": "",  // e.g., "Smart Telescope by ZWO"
        "protected": false    // Set to true to prevent automatic updates
      };
      
    default: // astrophotography
      const parsed = parseAstronomicalObject(image.filename);
      return {
        "catalogDesignation": parsed.catalogDesignation,
        "objectName": parsed.objectName,
        "location": "Maple Valley, WA",
        "equipment": "",
        "exposure": "",
        "protected": false    // Set to true to prevent automatic updates
      };
  }
}

function updateMetadata() {
  console.log('🔍 Scanning for images...');
  
  const allImages = findImages();
  const existingMetadata = loadExistingMetadata();
  
  let newEntries = 0;
  let updatedEntries = 0;
  let deletedEntries = 0;
  let totalImages = allImages.length;
  
  console.log(`📁 Found ${totalImages} images across all folders`);
  
  // Ensure all existing entries have a protected field
  Object.keys(existingMetadata).forEach(filename => {
    if (typeof existingMetadata[filename].protected === 'undefined') {
      existingMetadata[filename].protected = false;
    }
  });
  
  // First, check for entries that no longer have corresponding files (cleanup)
  const currentImageFilenames = new Set(allImages.map(img => img.filename));
  const entriesToDelete = [];
  
  Object.keys(existingMetadata).forEach(filename => {
    if (!currentImageFilenames.has(filename)) {
      entriesToDelete.push(filename);
    }
  });
  
  // Remove entries for deleted files
  entriesToDelete.forEach(filename => {
    console.log(`🗑️  Removing metadata for deleted file: ${filename}`);
    delete existingMetadata[filename];
    deletedEntries++;
  });
  
  // Add/update entries for all images
  allImages.forEach(image => {
    const isNewEntry = !existingMetadata[image.filename];
    const imageType = getImageType(image.folder);
    
    if (isNewEntry) {
      console.log(`➕ Adding ${imageType} metadata for: ${image.filename} (in ${image.folder})`);
      newEntries++;
      
      // Create new entry with appropriate fields for image type
      existingMetadata[image.filename] = createMetadataEntry(image);
    } else {
      // For terrestrial and equipment images, update if not protected
      if (imageType === 'terrestrial') {
        const entry = existingMetadata[image.filename];
        // PROTECTION: Check protected flag first
        if (entry.protected) {
          console.log(`🔒 PROTECTED: Manual entry preserved for: ${image.filename} - "${entry.name}"`);
        } else {
          const needsUpdate = !entry.location || !entry.name || entry.location === '' || entry.name === '';
          
          if (needsUpdate) {
            console.log(`🔄 Updating terrestrial metadata for: ${image.filename} (${imageType} in ${image.folder})`);
            entry.location = generateLocationFromFolder(image.folder);
            entry.name = generateCleanName(image.filename);
            updatedEntries++;
          } else {
            console.log(`✅ Complete entry found for: ${image.filename} (${imageType} in ${image.folder})`);
          }
        }
      } else if (imageType === 'equipment') {
        const entry = existingMetadata[image.filename];
        // PROTECTION: Check protected flag first
        if (entry.protected) {
          console.log(`🔒 PROTECTED: Manual entry preserved for: ${image.filename} - "${entry.equipmentName}"`);
        } else {
          // FALLBACK: Don't override manual entries - only update if completely empty or generic
          const genericNames = ['My Gear', 'Equipment', generateCleanName(image.filename)];
          const isGenericOrEmpty = !entry.equipmentName || entry.equipmentName === '' || genericNames.includes(entry.equipmentName);
          
          if (isGenericOrEmpty) {
            console.log(`🔄 Updating equipment metadata for: ${image.filename} (${imageType} in ${image.folder})`);
            entry.equipmentName = generateCleanName(image.filename);
            updatedEntries++;
          } else {
            console.log(`🔒 PROTECTED: Manual equipment entry preserved for: ${image.filename} - "${entry.equipmentName}"`);
          }
        }
      } else {
        const entry = existingMetadata[image.filename];
        // PROTECTION: Check protected flag for astrophotography entries
        if (entry.protected) {
          console.log(`� PROTECTED: Manual astrophotography entry preserved for: ${image.filename}`);
        } else {
          console.log(`�🔄 Existing entry found for: ${image.filename} (${imageType} in ${image.folder})`);
          updatedEntries++;
          // Keep existing astrophotography entry as-is since user may have manually edited it
        }
      }
    }
  });
  
  if (newEntries > 0 || updatedEntries > 0 || deletedEntries > 0) {
    // Write updated metadata back to file
    const sortedMetadata = {};
    Object.keys(existingMetadata).sort().forEach(key => {
      sortedMetadata[key] = existingMetadata[key];
    });
    
    fs.writeFileSync(METADATA_FILE, JSON.stringify(sortedMetadata, null, 2));
    console.log(`✅ Updated metadata file`);
  } else {
    console.log('ℹ️  No changes needed');
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Total images found: ${totalImages}`);
  console.log(`   Total metadata entries: ${Object.keys(existingMetadata).length}`);
  console.log(`   New entries added: ${newEntries}`);
  console.log(`   Existing entries updated: ${updatedEntries}`);
  console.log(`   Obsolete entries removed: ${deletedEntries}`);
}

// Run the script
updateMetadata();
