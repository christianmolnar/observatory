#!/usr/bin/env node

// Test the current astronomical object parsing capabilities

// Astronomical object catalog and name database (current state)
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

// Test cases
console.log('=== Current System Capabilities ===\n');

const testFiles = [
  'Crescent Nebula.jpg',
  'NGC6888.jpg',
  'M42.jpg',
  'Orion Nebula.jpg',
  'Horse Head Nebula.jpg'
];

testFiles.forEach(filename => {
  const result = parseAstronomicalObject(filename);
  console.log(`File: ${filename}`);
  console.log(`  Catalog: "${result.catalogDesignation}"`);
  console.log(`  Name: "${result.objectName}"`);
  console.log('');
});

console.log('=== Database Coverage Analysis ===\n');
console.log('Checking for "CRESCENT" in database...');
console.log('CRESCENT entry:', ASTRONOMICAL_OBJECTS['CRESCENT'] || 'NOT FOUND');
console.log('');
console.log('NGC6888 entry:', ASTRONOMICAL_OBJECTS['NGC6888'] || 'NOT FOUND');
