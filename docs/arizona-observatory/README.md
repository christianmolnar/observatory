# Arizona Observatory Documents - README

This folder contains complete documentation for the Arizona Observatory automation project.

## Document Overview

### Executive Summary
- **executive-summary-word.md** - Clean format optimized for Word export via Pandoc
- **ARIZONA_OBSERVATORY_EXECUTIVE_SUMMARY.md** - Original detailed markdown with full technical specifications

### Technical Documentation
- **ARIZONA_OBSERVATORY_HARDWARE_INVENTORY.md** - Complete equipment inventory with specifications and pricing
- **ARIZONA_OBSERVATORY_SOFTWARE_GUIDE.md** - Software configuration and automation workflows
- **ARIZONA_OBSERVATORY_MONOCHROME_ALTERNATIVE.md** - Alternative monochrome camera approach reference

### Budget & Tracking
- **budget-summary.csv** - Excel-ready budget breakdown by phase with vendor links
- **equipment-tracking.csv** - Equipment tracking spreadsheet with URLs and specifications

## Export Formats

### Word Documents (via Pandoc)
Run the conversion script:
```bash
chmod +x convert-to-word.sh
./convert-to-word.sh
```

This creates Word documents in the `word-exports/` directory:
- Arizona-Observatory-Executive-Summary.docx
- Arizona-Observatory-Hardware-Inventory.docx
- Arizona-Observatory-Software-Guide.docx

### Excel Integration
Import the CSV files into Excel:
1. Open Excel
2. Data → Get Data → From Text/CSV
3. Select budget-summary.csv or equipment-tracking.csv
4. Configure import settings (headers in first row)
5. Load data

## Pandoc Setup

### Install Pandoc (macOS)
```bash
brew install pandoc
```

### Create Reference Document (Optional)
To customize Word formatting:
1. Create a Word document with your preferred styles
2. Save as `pandoc-reference.docx` in this directory
3. Pandoc will use these styles for all conversions

## File Organization

- **Markdown Files**: Source documentation in markdown format
- **CSV Files**: Budget and equipment data for Excel
- **Scripts**: Automation scripts for document conversion
- **word-exports/**: Generated Word documents (created by script)

## Usage Workflow

1. **Edit Documentation**: Modify markdown files as needed
2. **Update CSV Data**: Edit CSV files for budget changes
3. **Convert to Word**: Run `./convert-to-word.sh` to generate Word docs
4. **Import to Excel**: Use CSV files for budget tracking and analysis

## Budget Summary

**Total Project Cost**: $15,898
- **Phase 1** (Core Setup): $5,698
- **Phase 2** (Observatory): $8,600  
- **Phase 3** (Enhancements): $1,600

## Equipment Highlights

- **ZWO ASI2600MC Pro**: 26MP color camera with dual-band processing capability
- **ZWO AM5N Mount**: Automated mount with ASIAir compatibility
- **ACE SmartDome**: Professional observatory enclosure with automation
- **Dual-Band Processing**: L-Ultimate filter for pseudo-Hubble palette imaging
