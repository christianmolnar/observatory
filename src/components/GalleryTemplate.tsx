'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import SiteLayout from '@/components/SiteLayout';
import metadata from '@/data/metadata.json';

interface ImageMetadata {
  src: string;
  filename: string;
  // Astrophotography fields
  catalogDesignation?: string;
  objectName?: string;
  equipment?: string;
  exposure?: string;
  // Terrestrial fields
  name?: string;
  // Equipment fields
  equipmentName?: string;
  equipmentInfo?: string;
  // Common fields
  location: string;
}

interface GalleryTemplateProps {
  title: string;
  backgroundImage: string;
  imageFolder: string;
}

// Dynamically import gallery images and videos
function getGalleryImages(imageFolder: string): ImageMetadata[] {
  const allMedia = [];
  
  try {
    // First, get all images using require.context
    // @ts-expect-error - require.context is a webpack-specific function
    const imageContext = require.context('../../public/images', true, /\.(jpg|jpeg|png|avif|webp)$/);
    const imageFiles = imageContext.keys()
      .filter((key: string) => {
        // Make the path matching more precise to avoid cross-contamination
        const normalizedKey = key.replace(/^\.\//, '');
        return normalizedKey.startsWith(imageFolder + '/') || normalizedKey === imageFolder;
      })
      .map((key: string) => {
        const src = key.replace(/^\./, '/images');
        const filename = src.split('/').pop() || '';
        const imageMetadata = metadata[filename as keyof typeof metadata] || {
          catalogDesignation: '',
          objectName: filename.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, '').toUpperCase(),
          location: 'Maple Valley, WA',
          equipment: 'SeeStar S50',
          exposure: 'Unknown'
        };
        return { src, filename, ...imageMetadata };
      });
    
    allMedia.push(...imageFiles);
    
    // Then, manually add video files that we know exist based on metadata
    // Videos are handled differently since they can't be loaded as modules
    Object.keys(metadata).forEach(filename => {
      if (isVideoFile(filename)) {
        const videoMetadata = metadata[filename as keyof typeof metadata];
        
        if (videoMetadata) {
          // Check if this video belongs to the current folder by checking the metadata location
          // We'll use a simple path-based check since we can't use require.context for videos
          const expectedPath = `/images/${imageFolder}/${filename}`;
          
          // Only include videos that would logically belong in this folder
          // This is a safer approach than trying to scan video files as modules
          const shouldIncludeVideo = () => {
            // For eclipse videos, only include them in the eclipse-specific folder
            if (filename.toLowerCase().includes('eclipse')) {
              return imageFolder.includes('total-eclipse-2017');
            }
            
            // For other videos, you can add similar logic here based on naming conventions
            // For now, we'll be conservative and only include eclipse videos in their specific folder
            return false;
          };
          
          if (shouldIncludeVideo()) {
            allMedia.push({
              src: expectedPath,
              filename,
              ...videoMetadata
            });
          }
        }
      }
    });
    
    return allMedia;
  } catch {
    // Fallback to featured images if the specific folder doesn't exist
    // @ts-expect-error - require.context is a webpack-specific function
    const context = require.context('../../public/images/astrophotography/featured', false, /\.(jpg|jpeg|png|avif|webp)$/);
    return context.keys().map((key: string) => {
      const src = key.replace(/^\./, '/images/astrophotography/featured');
      const filename = src.split('/').pop() || '';
      const imageMetadata = metadata[filename as keyof typeof metadata] || {
        catalogDesignation: '',
        objectName: filename.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, '').toUpperCase(),
        location: 'Maple Valley, WA',
        equipment: 'SeeStar S50',
        exposure: 'Unknown'
      };
      return { src, filename, ...imageMetadata };
    });
  }
}

// Helper function to check if file is a video
function isVideoFile(filename: string): boolean {
  const videoExtensions = ['.mp4', '.mov', '.avi', '.webm'];
  const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return videoExtensions.includes(extension);
}

export default function GalleryTemplate({ title, backgroundImage, imageFolder }: GalleryTemplateProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = getGalleryImages(imageFolder);

  const openModal = (index: number) => {
    setCurrentImage(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!modalOpen) return;

    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [modalOpen, nextImage, prevImage]);

  return (
    <SiteLayout>
      <div className="min-h-screen bg-black">
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover opacity-50"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/20" />
        </div>

        {/* Gallery Content */}
      <main className="relative z-10 pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Gallery Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light text-white tracking-[0.2em] mb-8">
              {title.toUpperCase()}
            </h1>
          </div>

          {/* Gallery Grid - Centered */}
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-6 max-w-[1400px]">
              {images.map((image: ImageMetadata, index: number) => (
              <div
                key={image.filename}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                style={{ width: '280px' }}
                onClick={() => openModal(index)}
              >
                {/* Glass Card */}
                <div className="relative bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  {/* Image/Video Container */}
                  <div className="aspect-[3/4] relative">
                    {isVideoFile(image.src) ? (
                      <>
                        <video
                          src={image.src}
                          className="object-cover w-full h-full"
                          preload="metadata"
                          muted
                        />
                        {/* Video Play Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                            <div className="w-0 h-0 border-l-[16px] border-l-black border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Image
                        src={image.src}
                        alt={
                          image.objectName 
                            ? `${image.objectName} ${image.catalogDesignation ? `(${image.catalogDesignation})` : ''} - Astrophotography by Maple Valley Observatory`
                            : image.equipmentName 
                            ? `${image.equipmentName} - Telescope and Astrophotography Equipment`
                            : image.name 
                            ? `${image.name} - Photography by Maple Valley Observatory`
                            : 'Astronomy and Photography by Maple Valley Observatory'
                        }
                        fill
                        className="object-cover"
                        quality={90}
                      />
                    )}
                  </div>
                  
                  {/* Bottom Label with Thicker Border - Two Lines */}
                  <div className="relative bg-black/60 backdrop-blur-sm border-t-2 border-white/20 p-3 min-h-[60px] flex flex-col justify-center">
                    {/* For astrophotography images */}
                    {(image.catalogDesignation || image.objectName) ? (
                      <>
                        {image.catalogDesignation && (
                          <h3 className="text-white/90 text-xs font-medium tracking-widest text-center mb-1">
                            {image.catalogDesignation}
                          </h3>
                        )}
                        {image.objectName && (
                          <h4 className="text-white text-sm font-medium tracking-wide text-center">
                            {image.objectName}
                          </h4>
                        )}
                      </>
                    ) : image.equipmentName ? (
                      /* For equipment images */
                      <>
                        <h4 className="text-white text-sm font-medium tracking-wide text-center">
                          {image.equipmentName}
                        </h4>
                        {image.equipmentInfo && (
                          <p className="text-white/70 text-xs text-center mt-1">
                            {image.equipmentInfo}
                          </p>
                        )}
                      </>
                    ) : (
                      /* For terrestrial images */
                      image.name && (
                        <h4 className="text-white text-sm font-medium tracking-wide text-center">
                          {image.name}
                        </h4>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal with Metadata */}
      {modalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-lg"
          style={{ zIndex: 99999 }}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-white/80 hover:text-white text-2xl font-light bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-300 ease-out"
            aria-label="Close full screen image"
            style={{ 
              zIndex: 100000,
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '18px',
              fontWeight: 300
            }}
          >
            ✕
          </button>

          {/* Previous Image Button */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white text-4xl font-light bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-300 ease-out"
              aria-label="Previous image"
              style={{ 
                zIndex: 100000,
                width: '48px',
                height: '48px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '24px',
                fontWeight: 300
              }}
            >
              ‹
            </button>
          )}

          {/* Next Image Button */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white text-4xl font-light bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-300 ease-out"
              aria-label="Next image"
              style={{ 
                zIndex: 100000,
                width: '48px',
                height: '48px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '24px',
                fontWeight: 300
              }}
            >
              ›
            </button>
          )}

          {/* Media Container */}
          <div className="flex flex-col items-center justify-center w-full h-full p-6">
            <div className="relative max-w-[85vw] max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
              {isVideoFile(images[currentImage].src) ? (
                <video
                  src={images[currentImage].src}
                  controls
                  className="object-contain w-full h-full"
                  style={{ 
                    width: 'auto', 
                    height: 'auto',
                    maxWidth: '85vw',
                    maxHeight: '70vh',
                    minWidth: '300px'
                  }}
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={images[currentImage].src}
                  alt={
                    images[currentImage].objectName 
                      ? `${images[currentImage].objectName} ${images[currentImage].catalogDesignation ? `(${images[currentImage].catalogDesignation})` : ''} - Astrophotography by Maple Valley Observatory`
                      : images[currentImage].equipmentName 
                      ? `${images[currentImage].equipmentName} - Telescope and Astrophotography Equipment`
                      : images[currentImage].name 
                      ? `${images[currentImage].name} - Photography by Maple Valley Observatory`
                      : 'Astronomy and Photography by Maple Valley Observatory'
                  }
                  width={1400}
                  height={1000}
                  className="object-contain w-full h-full"
                  priority
                  style={{ 
                    width: 'auto', 
                    height: 'auto',
                    maxWidth: '85vw',
                    maxHeight: '70vh',
                    minWidth: '300px'
                  }}
                />
              )}
            </div>
            
            {/* Metadata Bar */}
            <div className="mt-6 bg-black/60 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/10">
              <div className="flex flex-wrap items-center justify-center gap-2 text-white/90 text-sm">
                {(() => {
                  const metadataItems = [];
                  
                  // Check if this is an astrophotography, equipment, or terrestrial image
                  const isAstrophotography = images[currentImage].catalogDesignation || images[currentImage].objectName;
                  const isEquipment = images[currentImage].equipmentName;
                  
                  if (isAstrophotography) {
                    // Astrophotography: Object name (catalog designation + object name or either one)
                    if (images[currentImage].catalogDesignation && images[currentImage].objectName) {
                      metadataItems.push(
                        <span key="name" className="font-medium tracking-wide">
                          {`${images[currentImage].catalogDesignation} - ${images[currentImage].objectName}`}
                        </span>
                      );
                    } else if (images[currentImage].catalogDesignation || images[currentImage].objectName) {
                      metadataItems.push(
                        <span key="name" className="font-medium tracking-wide">
                          {images[currentImage].catalogDesignation || images[currentImage].objectName}
                        </span>
                      );
                    }
                  } else if (isEquipment) {
                    // Equipment: Show equipment name and info
                    metadataItems.push(
                      <span key="equipmentName" className="font-medium tracking-wide">
                        {images[currentImage].equipmentName}
                      </span>
                    );
                    if (images[currentImage].equipmentInfo) {
                      metadataItems.push(
                        <span key="equipmentInfo" className="text-white/70">
                          {images[currentImage].equipmentInfo}
                        </span>
                      );
                    }
                  } else {
                    // Terrestrial: Show name if available
                    if (images[currentImage].name) {
                      metadataItems.push(
                        <span key="name" className="font-medium tracking-wide">
                          {images[currentImage].name}
                        </span>
                      );
                    }
                  }
                  
                  // Location
                  if (images[currentImage].location) {
                    metadataItems.push(
                      <span key="location">{images[currentImage].location}</span>
                    );
                  }
                  
                  // Equipment (only for astrophotography)
                  if (isAstrophotography && images[currentImage].equipment) {
                    metadataItems.push(
                      <span key="equipment">{images[currentImage].equipment}</span>
                    );
                  }
                  
                  // Exposure (only for astrophotography)
                  if (isAstrophotography && images[currentImage].exposure) {
                    metadataItems.push(
                      <span key="exposure">{images[currentImage].exposure}</span>
                    );
                  }
                  
                  // Join with bullet separators
                  return metadataItems.map((item, index) => (
                    <React.Fragment key={index}>
                      {item}
                      {index < metadataItems.length - 1 && <span className="text-white/60">•</span>}
                    </React.Fragment>
                  ));
                })()}
              </div>
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="mt-3 text-center">
                <span className="text-white/60 text-sm font-light tracking-wide">
                  {currentImage + 1} of {images.length}
                </span>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
      </div>
    </SiteLayout>
  );
}
