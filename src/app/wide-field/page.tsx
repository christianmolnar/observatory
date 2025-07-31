'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { globalConfig } from '@/config/global';
import metadata from '@/data/metadata.json';

interface ImageMetadata {
  src: string;
  filename: string;
  catalogDesignation: string;
  objectName: string;
  location: string;
  equipment: string;
  exposure: string;
}

function getGalleryImages(): ImageMetadata[] {
  const imageModules = (require as any).context('/public/images/wide-field', true, /\.(jpg|jpeg|png|webp)$/i);
  const images: ImageMetadata[] = [];
  
  imageModules.keys().forEach((imagePath: string) => {
    const filename = imagePath.replace('./', '');
    const src = `/images/wide-field/${filename}`;
    const imageMetadata = (metadata as any)[filename] || {
      catalogDesignation: '',
      objectName: filename.replace(/\.[^/.]+$/, '').replace(/-/g, ' ').toUpperCase(),
      location: '',
      equipment: '',
      exposure: ''
    };
    
    images.push({
      src,
      filename,
      ...imageMetadata
    });
  });
  
  return images.sort((a, b) => a.filename.localeCompare(b.filename));
}

export default function WideFieldPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = getGalleryImages();

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
  }, [modalOpen]);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={globalConfig.wideField.backgroundImage}
          alt="Background"
          fill
          className="object-cover opacity-50"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/20" />
      </div>

      {/* Wide Field Content */}
      <main className="relative z-10 pt-48 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light text-white tracking-[0.2em] mb-8">
              {globalConfig.wideField.title}
            </h1>
            <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
              {globalConfig.wideField.description}
            </p>
          </div>

          {/* Wide Field Gallery Grid - Centered */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-[1400px]">
              {images.map((image: ImageMetadata, index: number) => (
              <div
                key={image.filename}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => openModal(index)}
              >
                {/* Glass Card */}
                <div className="relative bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  {/* Image Container */}
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={image.src}
                      alt={image.objectName}
                      fill
                      className="object-cover"
                      quality={90}
                    />
                  </div>
                  
                  {/* Bottom Label with Thicker Border - Two Lines */}
                  <div className="relative bg-black/60 backdrop-blur-sm border-t-2 border-white/20 p-3 min-h-[60px] flex flex-col justify-center">
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

          {/* Image and Metadata Container */}
          <div className="flex flex-col items-center justify-center w-full h-full p-6">
            <div className="relative max-w-[85vw] max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
              <Image
                src={images[currentImage].src}
                alt={images[currentImage].objectName}
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
            </div>
            
            {/* Metadata Bar */}
            <div className="mt-6 bg-black/60 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/10">
              <div className="flex flex-wrap items-center justify-center gap-2 text-white/90 text-sm">
                {(() => {
                  const metadataItems = [];
                  
                  // Object name (catalog designation + object name or either one)
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
                  
                  // Location
                  if (images[currentImage].location) {
                    metadataItems.push(
                      <span key="location">{images[currentImage].location}</span>
                    );
                  }
                  
                  // Equipment
                  if (images[currentImage].equipment) {
                    metadataItems.push(
                      <span key="equipment">{images[currentImage].equipment}</span>
                    );
                  }
                  
                  // Exposure
                  if (images[currentImage].exposure) {
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
  );
}
