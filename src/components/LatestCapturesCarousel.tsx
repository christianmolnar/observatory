"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  {
    src: '/images/astrophotography/featured/M33-Done.jpg',
    alt: 'M33 Galaxy',
  },
  {
    src: '/images/astrophotography/featured/SH2-248-The-Jellyfish.jpg',
    alt: 'SH2-248 The Jellyfish',
  },
  {
    src: '/images/astrophotography/featured/SH2-132-The-LobsterClaw.jpg',
    alt: 'SH2-132 The Lobster Claw',
  },
];

// ...existing code...
export default function LatestCapturesCarousel() {
  const [autoScroll, setAutoScroll] = useState(true);
  const goTo = (idx: number) => setCurrent(idx);
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const length = images.length;

  // Calculate indices for left, center, right images
  const leftIdx = (current - 1 + length) % length;
  const centerIdx = current;
  const rightIdx = (current + 1) % length;

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
      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center mt-8" style={{ minHeight: 320 }}>
        <div className="flex items-center justify-center w-full h-full gap-4" style={{ position: 'relative', zIndex: 2 }}>
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
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-3 h-3 rounded-full ${idx === current ? 'bg-yellow-400' : 'bg-white/40'} transition-colors`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Modal for full-screen image */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg">
          <button
            onClick={closeModal}
            className="absolute top-8 right-8 text-white text-3xl font-bold bg-black/60 rounded-full p-2 hover:bg-yellow-400/80 transition-colors"
            aria-label="Close full screen image"
          >
            &times;
          </button>
          <div className="max-w-4xl w-full flex items-center justify-center">
            <Image
              src={images[current].src}
              alt={images[current].alt}
              width={1200}
              height={800}
              className="object-contain rounded-2xl shadow-2xl"
              priority
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      )}
    </section>
  );
}