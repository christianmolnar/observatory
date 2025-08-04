# Maple Valley Observatory

A Next.js astrophotography website featuring contemplative viewing experiences with curated YouTube content.

## 🚀 Quick Start

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

## 📚 Documentation

**For complete site management, setup, and usage instructions, see the [docs/](docs/) folder:**

- **[📖 Site Management Guide](docs/SITE_MANAGEMENT_GUIDE.md)** - **START HERE** - Complete operational guide
- **[🎵 Contemplation System](docs/CONTEMPLATION_INVENTORY_GUIDE.md)** - Video assignment and inventory management
- **[🎨 Design Documentation](docs/DESIGN_DOCUMENT.md)** - Complete design system and components
- **[⚙️ Setup Guides](docs/)** - SEO, contact forms, and configuration

## 🎯 Common Tasks

### Adding New Images
```bash
# 1. Place images in /public/images/[category]/
# 2. Update metadata
node update-metadata.js
```

### Managing Contemplation Videos
```bash
# Check current assignments
node update-metadata.js inventory

# Add video to an image
node update-metadata.js add-video "image.jpg" "youtube-url" "Video Title"
```

## 🌟 Features

- **Responsive Astrophotography Gallery** - Mobile-optimized image viewing
- **YouTube Contemplation Overlay** - Meditative viewing experiences
- **Automated Content Management** - CLI tools for metadata and video management
- **SEO Optimized** - Full search engine optimization
- **Terrestrial Photography** - National parks and landscape sections

## 📊 Current Status

- **135 total images** in collection
- **24 images** with contemplation videos assigned
- **111 images** available for new assignments
- **8 content categories** (jazz, gratitude, poetry, cosmic, etc.)

## 🔧 Technology Stack

- **Next.js 15.4.5** with Turbopack
- **React 19.1.0** 
- **TypeScript 5**
- **Tailwind CSS 4**
- **Vercel Analytics & Speed Insights**

## 📁 Project Structure

```
├── docs/                          # Complete documentation
├── src/
│   ├── app/                       # Next.js app router pages
│   ├── components/                # React components
│   ├── data/                      # Metadata and content
│   └── config/                    # Site configuration
├── public/images/                 # Image assets
├── update-metadata.js             # Content management CLI
└── contemplation-inventory.json   # Automated tracking
```

## 📖 Documentation Index

All comprehensive documentation is organized in the [`docs/`](docs/) folder:

- **Getting Started**: [Site Management Guide](docs/SITE_MANAGEMENT_GUIDE.md)
- **Content Management**: [Contemplation Inventory Guide](docs/CONTEMPLATION_INVENTORY_GUIDE.md)
- **Design System**: [Design Document](docs/DESIGN_DOCUMENT.md)
- **Configuration**: [Setup Guides](docs/)
- **Content Library**: [YouTube Contemplation Links](docs/youtube-contemplation-links.md)

For detailed instructions on any aspect of the site, start with the [📖 Site Management Guide](docs/SITE_MANAGEMENT_GUIDE.md).
