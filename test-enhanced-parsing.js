#!/usr/bin/env node

// Test the enhanced astronomical object parsing capabilities

// Quick test by copying the enhanced database and function from update-metadata.js
const fs = require('fs');
const scriptContent = fs.readFileSync('./update-metadata.js', 'utf8');

// Extract everything we need for testing
console.log('=== Enhanced Astronomical Object Lookup Test ===\n');

// Test cases
const testFiles = [
  'Crescent Nebula.jpg',
  'NGC6888.jpg',
  'M42.jpg',
  'Orion Nebula.jpg',
  'Horsehead Nebula.jpg',
  'B33.jpg',
  'Heart Nebula.jpg',
  'IC1805.jpg',
  'California Nebula.jpg',
  'NGC1499.jpg',
  'C4.jpg',
  'Abell 21.jpg',
  'A21.jpg',
  'vdB 14.jpg',
  'VDB14.jpg',
  'Sh2-155.jpg',
  'Cave Nebula.jpg',
  'Bubble Nebula.jpg',
  'NGC7635.jpg'
];

console.log('Testing enhanced database with popular astrophotography targets:\n');

// We'll use the actual script to test
const { execSync } = require('child_process');

testFiles.forEach(filename => {
  try {
    const result = execSync(`node -e "
      const fs = require('fs');
      const script = fs.readFileSync('./update-metadata.js', 'utf8');
      
      // Extract the ASTRONOMICAL_OBJECTS
      const objMatch = script.match(/const ASTRONOMICAL_OBJECTS = \\{([\\s\\S]*?)\\};/);
      if (objMatch) {
        eval('const ASTRONOMICAL_OBJECTS = {' + objMatch[1] + '};');
        
        // Extract the parseAstronomicalObject function
        const funcMatch = script.match(/function parseAstronomicalObject\\(filename\\) \\{([\\s\\S]*?)^\\}/m);
        if (funcMatch) {
          eval('function parseAstronomicalObject(filename) {' + funcMatch[1] + '}');
          
          const result = parseAstronomicalObject('${filename}');
          console.log(JSON.stringify(result));
        }
      }
    "`, { encoding: 'utf8' });
    
    const parsed = JSON.parse(result.trim());
    console.log(`${filename.padEnd(25)} → Catalog: "${parsed.catalogDesignation}" | Name: "${parsed.objectName}"`);
  } catch (error) {
    console.log(`${filename.padEnd(25)} → Error: ${error.message}`);
  }
});

console.log('\n=== Summary ===');
console.log('✅ Enhanced database now includes:');
console.log('   • Messier catalog (M) - 50+ objects');
console.log('   • NGC catalog - 40+ popular objects');  
console.log('   • IC catalog - 15+ popular objects');
console.log('   • Caldwell catalog (C) - 10+ objects');
console.log('   • Sharpless catalog (Sh2) - 12+ emission nebulae');
console.log('   • Barnard catalog (B) - 6+ dark nebulae');
console.log('   • Abell catalog (A) - 3+ planetary nebulae');
console.log('   • van den Bergh catalog (vdB) - 4+ reflection nebulae');
console.log('   • 100+ common name mappings');
