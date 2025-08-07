#!/bin/bash
# Arizona Observatory Document Conversion Script
# Converts markdown documents to Word format using Pandoc

echo "Converting Arizona Observatory documents to Word format..."

# Create output directory
mkdir -p word-exports

# Convert executive summary to Word
pandoc executive-summary-word.md \
  -o word-exports/Arizona-Observatory-Executive-Summary.docx \
  --toc \
  --toc-depth=3

# Convert hardware inventory to Word  
pandoc ARIZONA_OBSERVATORY_HARDWARE_INVENTORY.md \
  -o word-exports/Arizona-Observatory-Hardware-Inventory.docx \
  --toc \
  --toc-depth=3

# Convert software guide to Word
pandoc ARIZONA_OBSERVATORY_SOFTWARE_GUIDE.md \
  -o word-exports/Arizona-Observatory-Software-Guide.docx \
  --toc \
  --toc-depth=3

echo "Word documents created in word-exports/ directory"
echo ""
echo "Files created:"
echo "- Arizona-Observatory-Executive-Summary.docx"
echo "- Arizona-Observatory-Hardware-Inventory.docx"  
echo "- Arizona-Observatory-Software-Guide.docx"
echo ""
echo "CSV files for Excel:"
echo "- budget-summary.csv"
echo "- equipment-tracking.csv"
