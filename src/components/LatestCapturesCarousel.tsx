"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

// Dynamically import all images from the featured folder
function getFeaturedImages() {
  // @ts-ignore
  const context = require.context('../../public/images/astrophotography/featured', false, /\.(jpg|jpeg|png|avif|webp)$/);
  return context.keys().map((key: string) => {
    const src = key.replace(/^\./, '/images/astrophotography/featured');
    // Alt text from filename
    const alt = src.split('/').pop()?.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, '') || 'Astrophotography';
    return { src, alt };
  });
}

const images = getFeaturedImages();

// ...existing code...
export default function LatestCapturesCarousel() {
  const [autoScroll, setAutoScroll] = useState(true);
  const goTo = (idx: number) => setCurrent(idx);
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const length = images.length;


  useEffect(() => {
    if (modalOpen || !autoScroll) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 4000);
    return () => clearInterval(timer);
  }, [length, modalOpen, autoScroll]);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <section className="w-full flex flex-col items-center py-2">
      {/* Gallery container to prevent overlap with heading/line/text */}
      <div
        className="relative w-full max-w-4xl mx-auto flex items-center justify-center mt-8"
        style={{ minHeight: 600, height: 600, maxHeight: 600 }}
      >
        <div
          className="flex items-center justify-center w-full h-full gap-4"
          style={{ position: 'relative', zIndex: 2, height: '100%', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Left Image - previous */}
          <div style={{ width: '220px', height: '320px', zIndex: 1 }}>
            <Image
              src={images[(current - 1 + length) % length].src}
              alt={images[(current - 1 + length) % length].alt}
              width={220}
              height={320}
              className="object-contain w-full h-full"
              quality={95}
              draggable={false}
            />
          </div>
          {/* Left Chevron */}
          <button
            onClick={() => {
              setAutoScroll(false);
              setCurrent((current - 1 + length) % length);
            }}
            className="mx-2 text-white text-4xl font-bold bg-black/60 rounded-full px-2 py-1 hover:bg-yellow-400/80 transition-colors z-10"
            aria-label="Previous image"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)', height: '48px' }}
          >
            {'<'}
          </button>
          {/* Center Image - current */}
          <div style={{ maxWidth: '600px', maxHeight: '810px', width: '100%', height: '100%', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={openModal}>
            <Image
              src={images[current].src}
              alt={images[current].alt}
              width={600}
              height={810}
              className="object-contain w-full h-full cursor-pointer"
              quality={98}
              draggable={false}
            />
          </div>
          {/* Right Chevron */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAutoScroll(false);
              setCurrent((current + 1) % length);
            }}
            className="mx-2 text-white text-4xl font-bold bg-black/60 rounded-full px-2 py-1 hover:bg-yellow-400/80 transition-colors z-10"
            aria-label="Next image"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)', height: '48px' }}
          >
            {'>'}
          </button>
          {/* Right Image - next */}
          <div style={{ width: '220px', height: '320px', zIndex: 1 }}>
            <Image
              src={images[(current + 1) % length].src}
              alt={images[(current + 1) % length].alt}
              width={220}
              height={320}
              className="object-contain w-full h-full"
              quality={95}
              draggable={false}
            />
          </div>
        </div>
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_: {src: string; alt: string}, idx: number) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-3 h-3 rounded-full ${idx === current ? 'bg-yellow-400' : 'bg-white/40'} transition-colors`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal rendered as a portal to document.body for complete independence */}
      {modalOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-lg"
          style={{ 
            zIndex: 99999,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          {/* Close button with elegant, subtle design */}
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
          {/* Center image with flexbox, responsive */}
          <div className="flex items-center justify-center w-full h-full p-6">
            <div className="relative max-w-[85vw] max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
              <Image
                src={images[current].src}
                alt={images[current].alt}
                width={1400}
                height={1000}
                className="object-contain w-full h-full"
                priority
                style={{ 
                  width: 'auto', 
                  height: 'auto',
                  maxWidth: '85vw',
                  maxHeight: '75vh',
                  minWidth: '300px'
                }}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}