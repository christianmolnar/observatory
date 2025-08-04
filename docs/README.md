# Documentation

This folder contains comprehensive documentation for the Maple Valley Observatory website.

## 📚 Documentation Index

### 🚀 **Getting Started**
- **[SITE_MANAGEMENT_GUIDE.md](SITE_MANAGEMENT_GUIDE.md)** - **START HERE** - Complete guide for running and managing the site
- **[README.md](../README.md)** - Main project overview (in root directory)

### 🎵 **Contemplation System**
- **[CONTEMPLATION_INVENTORY_GUIDE.md](CONTEMPLATION_INVENTORY_GUIDE.md)** - Video assignment and inventory management
- **[youtube-contemplation-links.md](youtube-contemplation-links.md)** - Curated contemplation content library

### 🎨 **Design & Development**
- **[DESIGN_DOCUMENT.md](DESIGN_DOCUMENT.md)** - Complete design system and component specifications
- **[DESIGN_PROTECTION.md](DESIGN_PROTECTION.md)** - Design consistency guidelines and protection measures

### ⚙️ **Setup & Configuration**
- **[SEO_SETUP_GUIDE.md](SEO_SETUP_GUIDE.md)** - Search engine optimization configuration
- **[CONTACT_SETUP.md](CONTACT_SETUP.md)** - Contact form and communication setup

### 🔧 **Technical Solutions**
- **[IMAGE_SORTING_SOLUTION.md](IMAGE_SORTING_SOLUTION.md)** - Image organization and metadata management
- **[agent-setup-instructions.md](agent-setup-instructions.md)** - AI agent configuration and workflow

## 🎯 Quick Reference

### **Most Common Tasks:**

#### Start Development
```bash
npm run dev
```

#### Add New Images
```bash
# 1. Place images in /public/images/[category]/
# 2. Update metadata
node update-metadata.js
```

#### Manage Contemplation Videos
```bash
# Check inventory
node update-metadata.js inventory

# Add video to image
node update-metadata.js add-video "image.jpg" "youtube-url" "Video Title"
```

## 📁 Documentation Organization

```
docs/
├── README.md                           ← This index file
├── SITE_MANAGEMENT_GUIDE.md           ← Main operational guide
├── CONTEMPLATION_INVENTORY_GUIDE.md   ← Video system management
├── DESIGN_DOCUMENT.md                 ← Complete design system
├── DESIGN_PROTECTION.md               ← Design consistency
├── SEO_SETUP_GUIDE.md                 ← Search optimization
├── CONTACT_SETUP.md                   ← Contact configuration
├── IMAGE_SORTING_SOLUTION.md          ← Image organization
├── agent-setup-instructions.md        ← AI agent config
└── youtube-contemplation-links.md     ← Content library
```

## 🎨 Current System Status

### Site Features
- ✅ Next.js 15.4.5 with Turbopack
- ✅ Responsive astrophotography gallery
- ✅ YouTube contemplation overlay system
- ✅ Automated metadata management
- ✅ SEO optimization
- ✅ Terrestrial photography sections

### Contemplation System
- **135 total images** in collection
- **24 images** with contemplation videos assigned
- **111 images** available for new assignments
- **8 content categories** (jazz, gratitude, poetry, etc.)

### Content Distribution
- **Lito Vitale (Jazz)**: 7 assignments
- **Gratitude Practices**: 5 assignments  
- **David Whyte Poetry**: 3 assignments
- **Classical, Progressive, Mindfulness, Cosmic, Experimental**: 1 each

## 🔍 Finding Information

- **Site Operations**: Start with `SITE_MANAGEMENT_GUIDE.md`
- **Video Management**: See `CONTEMPLATION_INVENTORY_GUIDE.md`
- **Visual Design**: Reference `DESIGN_DOCUMENT.md`
- **Content Strategy**: Check `youtube-contemplation-links.md`
- **Technical Issues**: Troubleshooting in `SITE_MANAGEMENT_GUIDE.md`

## 🚀 Next Steps

1. **For new users**: Read `SITE_MANAGEMENT_GUIDE.md` first
2. **For content management**: Use the CLI commands in the guides
3. **For design work**: Follow `DESIGN_DOCUMENT.md` specifications
4. **For advanced features**: Explore individual specialized guides

All documentation is interconnected and cross-referenced for easy navigation between related topics.
