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

// Comprehensive Astronomical Object Catalog Database
const ASTRONOMICAL_OBJECTS = {
  // ===== MESSIER CATALOG (Complete) =====
  'M1': { catalog: 'M1', name: 'Crab Nebula', type: 'nebula' },
  'M2': { catalog: 'M2', name: 'Globular Cluster in Aquarius', type: 'star cluster' },
  'M3': { catalog: 'M3', name: 'Globular Cluster in Canes Venatici', type: 'star cluster' },
  'M4': { catalog: 'M4', name: 'Globular Cluster in Scorpius', type: 'star cluster' },
  'M5': { catalog: 'M5', name: 'Globular Cluster in Serpens', type: 'star cluster' },
  'M6': { catalog: 'M6', name: 'Butterfly Cluster', type: 'star cluster' },
  'M7': { catalog: 'M7', name: 'Ptolemy Cluster', type: 'star cluster' },
  'M8': { catalog: 'M8', name: 'Lagoon Nebula', type: 'nebula' },
  'M9': { catalog: 'M9', name: 'Globular Cluster in Ophiuchus', type: 'star cluster' },
  'M10': { catalog: 'M10', name: 'Globular Cluster in Ophiuchus', type: 'star cluster' },
  'M11': { catalog: 'M11', name: 'Wild Duck Cluster', type: 'star cluster' },
  'M12': { catalog: 'M12', name: 'Globular Cluster in Ophiuchus', type: 'star cluster' },
  'M13': { catalog: 'M13', name: 'Great Globular Cluster in Hercules', type: 'star cluster' },
  'M14': { catalog: 'M14', name: 'Globular Cluster in Ophiuchus', type: 'star cluster' },
  'M15': { catalog: 'M15', name: 'Globular Cluster in Pegasus', type: 'star cluster' },
  'M16': { catalog: 'M16', name: 'Eagle Nebula', type: 'nebula' },
  'M17': { catalog: 'M17', name: 'Omega Nebula', type: 'nebula' },
  'M18': { catalog: 'M18', name: 'Open Cluster in Sagittarius', type: 'star cluster' },
  'M19': { catalog: 'M19', name: 'Globular Cluster in Ophiuchus', type: 'star cluster' },
  'M20': { catalog: 'M20', name: 'Trifid Nebula', type: 'nebula' },
  'M21': { catalog: 'M21', name: 'Open Cluster in Sagittarius', type: 'star cluster' },
  'M22': { catalog: 'M22', name: 'Sagittarius Cluster', type: 'star cluster' },
  'M23': { catalog: 'M23', name: 'Open Cluster in Sagittarius', type: 'star cluster' },
  'M24': { catalog: 'M24', name: 'Sagittarius Star Cloud', type: 'star cloud' },
  'M25': { catalog: 'M25', name: 'Open Cluster in Sagittarius', type: 'star cluster' },
  'M26': { catalog: 'M26', name: 'Open Cluster in Scutum', type: 'star cluster' },
  'M27': { catalog: 'M27', name: 'Dumbbell Nebula', type: 'nebula' },
  'M28': { catalog: 'M28', name: 'Globular Cluster in Sagittarius', type: 'star cluster' },
  'M29': { catalog: 'M29', name: 'Open Cluster in Cygnus', type: 'star cluster' },
  'M30': { catalog: 'M30', name: 'Globular Cluster in Capricornus', type: 'star cluster' },
  'M31': { catalog: 'M31', name: 'Andromeda Galaxy', type: 'galaxy' },
  'M32': { catalog: 'M32', name: 'Elliptical Galaxy in Andromeda', type: 'galaxy' },
  'M33': { catalog: 'M33', name: 'Triangulum Galaxy', type: 'galaxy' },
  'M34': { catalog: 'M34', name: 'Open Cluster in Perseus', type: 'star cluster' },
  'M35': { catalog: 'M35', name: 'Open Cluster in Gemini', type: 'star cluster' },
  'M36': { catalog: 'M36', name: 'Open Cluster in Auriga', type: 'star cluster' },
  'M37': { catalog: 'M37', name: 'Open Cluster in Auriga', type: 'star cluster' },
  'M38': { catalog: 'M38', name: 'Open Cluster in Auriga', type: 'star cluster' },
  'M39': { catalog: 'M39', name: 'Open Cluster in Cygnus', type: 'star cluster' },
  'M40': { catalog: 'M40', name: 'Winnecke 4', type: 'double star' },
  'M41': { catalog: 'M41', name: 'Open Cluster in Canis Major', type: 'star cluster' },
  'M42': { catalog: 'M42', name: 'Orion Nebula', type: 'nebula' },
  'M43': { catalog: 'M43', name: 'De Mairan\'s Nebula', type: 'nebula' },
  'M44': { catalog: 'M44', name: 'Beehive Cluster', type: 'star cluster' },
  'M45': { catalog: 'M45', name: 'Pleiades', type: 'star cluster' },
  'M46': { catalog: 'M46', name: 'Open Cluster in Puppis', type: 'star cluster' },
  'M47': { catalog: 'M47', name: 'Open Cluster in Puppis', type: 'star cluster' },
  'M48': { catalog: 'M48', name: 'Open Cluster in Hydra', type: 'star cluster' },
  'M49': { catalog: 'M49', name: 'Elliptical Galaxy in Virgo', type: 'galaxy' },
  'M50': { catalog: 'M50', name: 'Open Cluster in Monoceros', type: 'star cluster' },
  'M51': { catalog: 'M51', name: 'Whirlpool Galaxy', type: 'galaxy' },
  'M52': { catalog: 'M52', name: 'Open Cluster in Cassiopeia', type: 'star cluster' },
  'M53': { catalog: 'M53', name: 'Globular Cluster in Coma Berenices', type: 'star cluster' },
  'M54': { catalog: 'M54', name: 'Globular Cluster in Sagittarius', type: 'star cluster' },
  'M55': { catalog: 'M55', name: 'Globular Cluster in Sagittarius', type: 'star cluster' },
  'M56': { catalog: 'M56', name: 'Globular Cluster in Lyra', type: 'star cluster' },
  'M57': { catalog: 'M57', name: 'Ring Nebula', type: 'nebula' },
  'M58': { catalog: 'M58', name: 'Spiral Galaxy in Virgo', type: 'galaxy' },
  'M59': { catalog: 'M59', name: 'Elliptical Galaxy in Virgo', type: 'galaxy' },
  'M60': { catalog: 'M60', name: 'Elliptical Galaxy in Virgo', type: 'galaxy' },
  'M61': { catalog: 'M61', name: 'Spiral Galaxy in Virgo', type: 'galaxy' },
  'M62': { catalog: 'M62', name: 'Globular Cluster in Scorpius', type: 'star cluster' },
  'M63': { catalog: 'M63', name: 'Sunflower Galaxy', type: 'galaxy' },
  'M64': { catalog: 'M64', name: 'Black Eye Galaxy', type: 'galaxy' },
  'M65': { catalog: 'M65', name: 'Leo Triplet Galaxy', type: 'galaxy' },
  'M66': { catalog: 'M66', name: 'Leo Triplet Galaxy', type: 'galaxy' },
  'M67': { catalog: 'M67', name: 'Open Cluster in Cancer', type: 'star cluster' },
  'M68': { catalog: 'M68', name: 'Globular Cluster in Hydra', type: 'star cluster' },
  'M69': { catalog: 'M69', name: 'Globular Cluster in Sagittarius', type: 'star cluster' },
  'M70': { catalog: 'M70', name: 'Globular Cluster in Sagittarius', type: 'star cluster' },
  'M71': { catalog: 'M71', name: 'Globular Cluster in Sagitta', type: 'star cluster' },
  'M72': { catalog: 'M72', name: 'Globular Cluster in Aquarius', type: 'star cluster' },
  'M73': { catalog: 'M73', name: 'Asterism in Aquarius', type: 'asterism' },
  'M74': { catalog: 'M74', name: 'Spiral Galaxy in Pisces', type: 'galaxy' },
  'M75': { catalog: 'M75', name: 'Globular Cluster in Sagittarius', type: 'star cluster' },
  'M76': { catalog: 'M76', name: 'Little Dumbbell Nebula', type: 'nebula' },
  'M77': { catalog: 'M77', name: 'Spiral Galaxy in Cetus', type: 'galaxy' },
  'M78': { catalog: 'M78', name: 'Reflection Nebula in Orion', type: 'nebula' },
  'M79': { catalog: 'M79', name: 'Globular Cluster in Lepus', type: 'star cluster' },
  'M80': { catalog: 'M80', name: 'Globular Cluster in Scorpius', type: 'star cluster' },
  'M81': { catalog: 'M81', name: 'Bode\'s Galaxy', type: 'galaxy' },
  'M82': { catalog: 'M82', name: 'Cigar Galaxy', type: 'galaxy' },
  'M83': { catalog: 'M83', name: 'Southern Pinwheel Galaxy', type: 'galaxy' },
  'M84': { catalog: 'M84', name: 'Elliptical Galaxy in Virgo', type: 'galaxy' },
  'M85': { catalog: 'M85', name: 'Lenticular Galaxy in Coma Berenices', type: 'galaxy' },
  'M86': { catalog: 'M86', name: 'Elliptical Galaxy in Virgo', type: 'galaxy' },
  'M87': { catalog: 'M87', name: 'Virgo A Galaxy', type: 'galaxy' },
  'M88': { catalog: 'M88', name: 'Spiral Galaxy in Coma Berenices', type: 'galaxy' },
  'M89': { catalog: 'M89', name: 'Elliptical Galaxy in Virgo', type: 'galaxy' },
  'M90': { catalog: 'M90', name: 'Spiral Galaxy in Virgo', type: 'galaxy' },
  'M91': { catalog: 'M91', name: 'Spiral Galaxy in Coma Berenices', type: 'galaxy' },
  'M92': { catalog: 'M92', name: 'Globular Cluster in Hercules', type: 'star cluster' },
  'M93': { catalog: 'M93', name: 'Open Cluster in Puppis', type: 'star cluster' },
  'M94': { catalog: 'M94', name: 'Cat\'s Eye Galaxy', type: 'galaxy' },
  'M95': { catalog: 'M95', name: 'Spiral Galaxy in Leo', type: 'galaxy' },
  'M96': { catalog: 'M96', name: 'Spiral Galaxy in Leo', type: 'galaxy' },
  'M97': { catalog: 'M97', name: 'Owl Nebula', type: 'nebula' },
  'M98': { catalog: 'M98', name: 'Spiral Galaxy in Coma Berenices', type: 'galaxy' },
  'M99': { catalog: 'M99', name: 'Spiral Galaxy in Coma Berenices', type: 'galaxy' },
  'M100': { catalog: 'M100', name: 'Spiral Galaxy in Coma Berenices', type: 'galaxy' },
  'M101': { catalog: 'M101', name: 'Pinwheel Galaxy', type: 'galaxy' },
  'M102': { catalog: 'M102', name: 'Spindle Galaxy', type: 'galaxy' },
  'M103': { catalog: 'M103', name: 'Open Cluster in Cassiopeia', type: 'star cluster' },
  'M104': { catalog: 'M104', name: 'Sombrero Galaxy', type: 'galaxy' },
  'M105': { catalog: 'M105', name: 'Elliptical Galaxy in Leo', type: 'galaxy' },
  'M106': { catalog: 'M106', name: 'Spiral Galaxy in Canes Venatici', type: 'galaxy' },
  'M107': { catalog: 'M107', name: 'Globular Cluster in Ophiuchus', type: 'star cluster' },
  'M108': { catalog: 'M108', name: 'Surfboard Galaxy', type: 'galaxy' },
  'M109': { catalog: 'M109', name: 'Spiral Galaxy in Ursa Major', type: 'galaxy' },
  'M110': { catalog: 'M110', name: 'Dwarf Elliptical Galaxy', type: 'galaxy' },

  // ===== NGC CATALOG (Popular Objects) =====
  'NGC224': { catalog: 'NGC224', name: 'Andromeda Galaxy', type: 'galaxy' },
  'NGC253': { catalog: 'NGC253', name: 'Sculptor Galaxy', type: 'galaxy' },
  'NGC281': { catalog: 'NGC281', name: 'Pacman Nebula', type: 'nebula' },
  'NGC598': { catalog: 'NGC598', name: 'Triangulum Galaxy', type: 'galaxy' },
  'NGC869': { catalog: 'NGC869', name: 'Double Cluster in Persei', type: 'star cluster' },
  'NGC884': { catalog: 'NGC884', name: 'Double Cluster in Persei', type: 'star cluster' },
  'NGC1499': { catalog: 'NGC1499', name: 'California Nebula', type: 'nebula' },
  'NGC1952': { catalog: 'NGC1952', name: 'Crab Nebula', type: 'nebula' },
  'NGC1976': { catalog: 'NGC1976', name: 'Orion Nebula', type: 'nebula' },
  'NGC1977': { catalog: 'NGC1977', name: 'Running Man Nebula', type: 'nebula' },
  'NGC2070': { catalog: 'NGC2070', name: 'Tarantula Nebula', type: 'nebula' },
  'NGC2244': { catalog: 'NGC2244', name: 'Rosette Nebula', type: 'nebula' },
  'NGC2237': { catalog: 'NGC2237', name: 'Rosette Nebula', type: 'nebula' },
  'NGC2264': { catalog: 'NGC2264', name: 'Cone Nebula', type: 'star cluster' },
  'NGC2359': { catalog: 'NGC2359', name: 'Thor\'s Helmet', type: 'nebula' },
  'NGC2392': { catalog: 'NGC2392', name: 'Eskimo Nebula', type: 'nebula' },
  'NGC3031': { catalog: 'NGC3031', name: 'Bode\'s Galaxy', type: 'galaxy' },
  'NGC3034': { catalog: 'NGC3034', name: 'Cigar Galaxy', type: 'galaxy' },
  'NGC3372': { catalog: 'NGC3372', name: 'Carina Nebula', type: 'nebula' },
  'NGC4594': { catalog: 'NGC4594', name: 'Sombrero Galaxy', type: 'galaxy' },
  'NGC5128': { catalog: 'NGC5128', name: 'Centaurus A', type: 'galaxy' },
  'NGC5194': { catalog: 'NGC5194', name: 'Whirlpool Galaxy', type: 'galaxy' },
  'NGC5236': { catalog: 'NGC5236', name: 'Southern Pinwheel Galaxy', type: 'galaxy' },
  'NGC6302': { catalog: 'NGC6302', name: 'Bug Nebula', type: 'nebula' },
  'NGC6514': { catalog: 'NGC6514', name: 'Trifid Nebula', type: 'nebula' },
  'NGC6523': { catalog: 'NGC6523', name: 'Lagoon Nebula', type: 'nebula' },
  'NGC6543': { catalog: 'NGC6543', name: 'Cat\'s Eye Nebula', type: 'nebula' },
  'NGC6611': { catalog: 'NGC6611', name: 'Eagle Nebula', type: 'nebula' },
  'NGC6618': { catalog: 'NGC6618', name: 'Omega Nebula', type: 'nebula' },
  'NGC6720': { catalog: 'NGC6720', name: 'Ring Nebula', type: 'nebula' },
  'NGC6826': { catalog: 'NGC6826', name: 'Blinking Nebula', type: 'nebula' },
  'NGC6853': { catalog: 'NGC6853', name: 'Dumbbell Nebula', type: 'nebula' },
  'NGC6888': { catalog: 'NGC6888', name: 'Crescent Nebula', type: 'nebula' },
  'NGC6960': { catalog: 'NGC6960', name: 'Western Veil Nebula', type: 'nebula' },
  'NGC6992': { catalog: 'NGC6992', name: 'Eastern Veil Nebula', type: 'nebula' },
  'NGC7000': { catalog: 'NGC7000', name: 'North America Nebula', type: 'nebula' },
  'NGC7293': { catalog: 'NGC7293', name: 'Helix Nebula', type: 'nebula' },
  'NGC7317': { catalog: 'NGC7317', name: 'Stephan\'s Quintet', type: 'galaxy group' },
  'NGC7331': { catalog: 'NGC7331', name: 'Caldwell 30', type: 'galaxy' },
  'NGC7635': { catalog: 'NGC7635', name: 'Bubble Nebula', type: 'nebula' },
  'NGC7654': { catalog: 'NGC7654', name: 'Salt and Pepper Cluster', type: 'star cluster' },

  // ===== IC CATALOG (Index Catalogue) =====
  'IC59': { catalog: 'IC59', name: 'Gamma Cassiopeiae Nebula', type: 'nebula' },
  'IC63': { catalog: 'IC63', name: 'Ghost of Cassiopeia', type: 'nebula' },
  'IC342': { catalog: 'IC342', name: 'Hidden Galaxy', type: 'galaxy' },
  'IC405': { catalog: 'IC405', name: 'Flaming Star Nebula', type: 'nebula' },
  'IC410': { catalog: 'IC410', name: 'Tadpoles Nebula', type: 'nebula' },
  'IC417': { catalog: 'IC417', name: 'Spider Nebula', type: 'nebula' },
  'IC434': { catalog: 'IC434', name: 'Horsehead Nebula', type: 'nebula' },
  'IC443': { catalog: 'IC443', name: 'Jellyfish Nebula', type: 'nebula' },
  'IC1396': { catalog: 'IC1396', name: 'Elephant\'s Trunk Nebula', type: 'nebula' },
  'IC1805': { catalog: 'IC1805', name: 'Heart Nebula', type: 'nebula' },
  'IC1848': { catalog: 'IC1848', name: 'Soul Nebula', type: 'nebula' },
  'IC2118': { catalog: 'IC2118', name: 'Witch Head Nebula', type: 'nebula' },
  'IC2177': { catalog: 'IC2177', name: 'Seagull Nebula', type: 'nebula' },
  'IC5067': { catalog: 'IC5067', name: 'Pelican Nebula', type: 'nebula' },
  'IC5070': { catalog: 'IC5070', name: 'Pelican Nebula', type: 'nebula' },
  'IC5146': { catalog: 'IC5146', name: 'Cocoon Nebula', type: 'nebula' },

  // ===== SHARPLESS CATALOG (Sh2) =====
  'SH2-101': { catalog: 'Sh2-101', name: 'Tulip Nebula', type: 'nebula' },
  'SH2-115': { catalog: 'Sh2-115', name: 'Abell 71', type: 'nebula' },
  'SH2-119': { catalog: 'Sh2-119', name: 'Abell 85', type: 'nebula' },
  'SH2-129': { catalog: 'Sh2-129', name: 'Flying Bat Nebula', type: 'nebula' },
  'SH2-132': { catalog: 'Sh2-132', name: 'Lion Nebula', type: 'nebula' },
  'SH2-136': { catalog: 'Sh2-136', name: 'Ghost Nebula', type: 'nebula' },
  'SH2-140': { catalog: 'Sh2-140', name: 'Wizard Nebula', type: 'nebula' },
  'SH2-155': { catalog: 'Sh2-155', name: 'Cave Nebula', type: 'nebula' },
  'SH2-171': { catalog: 'Sh2-171', name: 'NGC7822', type: 'nebula' },
  'SH2-185': { catalog: 'Sh2-185', name: 'Ghost of Cassiopeia', type: 'nebula' },
  'SH2-240': { catalog: 'Sh2-240', name: 'Simeis 147', type: 'nebula' },
  'SH2-276': { catalog: 'Sh2-276', name: 'Barnard\'s Loop', type: 'nebula' },

  // ===== COMMON ALTERNATIVE NAMES =====
  'ANDROMEDA': { catalog: 'M31', name: 'Andromeda Galaxy', type: 'galaxy' },
  'ORION': { catalog: 'M42', name: 'Orion Nebula', type: 'nebula' },
  'PLEIADES': { catalog: 'M45', name: 'Pleiades', type: 'star cluster' },
  'WHIRLPOOL': { catalog: 'M51', name: 'Whirlpool Galaxy', type: 'galaxy' },
  'RING': { catalog: 'M57', name: 'Ring Nebula', type: 'nebula' },
  'DUMBBELL': { catalog: 'M27', name: 'Dumbbell Nebula', type: 'nebula' },
  'EAGLE': { catalog: 'M16', name: 'Eagle Nebula', type: 'nebula' },
  'OMEGA': { catalog: 'M17', name: 'Omega Nebula', type: 'nebula' },
  'TRIFID': { catalog: 'M20', name: 'Trifid Nebula', type: 'nebula' },
  'LAGOON': { catalog: 'M8', name: 'Lagoon Nebula', type: 'nebula' },
  'CRAB': { catalog: 'M1', name: 'Crab Nebula', type: 'nebula' },
  'OWL': { catalog: 'M97', name: 'Owl Nebula', type: 'nebula' },
  'SOMBRERO': { catalog: 'M104', name: 'Sombrero Galaxy', type: 'galaxy' },
  'PINWHEEL': { catalog: 'M101', name: 'Pinwheel Galaxy', type: 'galaxy' },
  'SUNFLOWER': { catalog: 'M63', name: 'Sunflower Galaxy', type: 'galaxy' },
  'TRIANGULUM': { catalog: 'M33', name: 'Triangulum Galaxy', type: 'galaxy' },
  'BEEHIVE': { catalog: 'M44', name: 'Beehive Cluster', type: 'star cluster' },
  'HERCULES': { catalog: 'M13', name: 'Great Globular Cluster in Hercules', type: 'star cluster' },
  'CALIFORNIA': { catalog: 'NGC1499', name: 'California Nebula', type: 'nebula' },
  'ROSETTE': { catalog: 'NGC2244', name: 'Rosette Nebula', type: 'nebula' },
  'HORSEHEAD': { catalog: 'IC434', name: 'Horsehead Nebula', type: 'nebula' },
  'HORSE': { catalog: 'IC434', name: 'Horsehead Nebula', type: 'nebula' },
  'FLAMING': { catalog: 'IC405', name: 'Flaming Star Nebula', type: 'nebula' },
  'TADPOLES': { catalog: 'IC410', name: 'Tadpoles Nebula', type: 'nebula' },
  'HEART': { catalog: 'IC1805', name: 'Heart Nebula', type: 'nebula' },
  'SOUL': { catalog: 'IC1848', name: 'Soul Nebula', type: 'nebula' },
  'ELEPHANT': { catalog: 'IC1396', name: 'Elephant\'s Trunk Nebula', type: 'nebula' },
  'COCOON': { catalog: 'IC5146', name: 'Cocoon Nebula', type: 'nebula' },
  'PELICAN': { catalog: 'IC5070', name: 'Pelican Nebula', type: 'nebula' },
  'WIZARD': { catalog: 'Sh2-140', name: 'Wizard Nebula', type: 'nebula' },
  'CAVE': { catalog: 'Sh2-155', name: 'Cave Nebula', type: 'nebula' },
  'TULIP': { catalog: 'Sh2-101', name: 'Tulip Nebula', type: 'nebula' },
  'JELLYFISH': { catalog: 'IC443', name: 'Jellyfish Nebula', type: 'nebula' },
  'VEIL': { catalog: 'NGC6960', name: 'Western Veil Nebula', type: 'nebula' },
  'NORTH': { catalog: 'NGC7000', name: 'North America Nebula', type: 'nebula' },
  'AMERICA': { catalog: 'NGC7000', name: 'North America Nebula', type: 'nebula' },
  'BUBBLE': { catalog: 'NGC7635', name: 'Bubble Nebula', type: 'nebula' },
  'HELIX': { catalog: 'NGC7293', name: 'Helix Nebula', type: 'nebula' },
  'CRESCENT': { catalog: 'NGC6888', name: 'Crescent Nebula', type: 'nebula' },
  'PACMAN': { catalog: 'NGC281', name: 'Pacman Nebula', type: 'nebula' },
  'CATS': { catalog: 'NGC6543', name: 'Cat\'s Eye Nebula', type: 'nebula' },
  'WITCH': { catalog: 'IC2118', name: 'Witch Head Nebula', type: 'nebula' },
  'SEAGULL': { catalog: 'IC2177', name: 'Seagull Nebula', type: 'nebula' },
  'GHOST': { catalog: 'IC63', name: 'Ghost of Cassiopeia', type: 'nebula' },
  'THOR': { catalog: 'NGC2359', name: 'Thor\'s Helmet', type: 'nebula' },
  'HELMET': { catalog: 'NGC2359', name: 'Thor\'s Helmet', type: 'nebula' }
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
        objectName = upperPart; // Just use catalog designation, not "Messier XX"
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
          // Check if the entry needs updating (missing catalog/object info)
          const needsAstronomicalUpdate = (!entry.catalogDesignation || entry.catalogDesignation === '') ||
            (entry.objectName === entry.catalogDesignation) ||
            (entry.objectName && entry.objectName.includes('Messier')) ||
            (entry.objectName === generateObjectName(image.filename));
          
          if (needsAstronomicalUpdate) {
            // Parse astronomical object info and update if we have better data
            const astronomical = parseAstronomicalObject(image.filename);
            if (astronomical.catalogDesignation || (astronomical.objectName && astronomical.objectName !== generateObjectName(image.filename))) {
              console.log(`🔄 Updating astronomical data for: ${image.filename} (${entry.catalogDesignation || 'no catalog'} → ${astronomical.catalogDesignation || 'no catalog'})`);
              entry.catalogDesignation = astronomical.catalogDesignation || entry.catalogDesignation;
              entry.objectName = astronomical.objectName || entry.objectName;
              updatedEntries++;
            } else {
              console.log(`✅ Existing entry found for: ${image.filename} (${imageType} in ${image.folder})`);
            }
          } else {
            console.log(`✅ Complete entry found for: ${image.filename} (${imageType} in ${image.folder})`);
          }
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
