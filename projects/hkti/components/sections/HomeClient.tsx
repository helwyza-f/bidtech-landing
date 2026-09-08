'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { SloganRibbon } from '@/components/sections/SloganRibbon';
import { Pillars } from '@/components/sections/Pillars';
import { VisionMission } from '@/components/sections/VisionMission';
import { Gallery } from '@/components/sections/Gallery';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { LightboxModal } from '@/components/ui/LightboxModal';
import { Toast, ToastProps } from '@/components/ui/Toast';
import { GalleryItem } from '@/types';
import { getAssetPath } from '@/lib/utils';

export function HomeClient() {
  // Lightbox Modal State
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
    category?: string;
  }>({
    isOpen: false,
    imageUrl: '',
    title: '',
    category: '',
  });

  // Toast Notification State
  const [toastState, setToastState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'info' | 'warning';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success',
  });

  const handleOpenLightbox = (item: GalleryItem) => {
    setLightboxState({
      isOpen: true,
      imageUrl: getAssetPath(item.imageUrl),
      title: item.title,
      category: item.category,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleFormSuccess = (title: string, message: string) => {
    setToastState({
      isOpen: true,
      title,
      message,
      type: 'success',
    });
  };

  const handleCloseToast = () => {
    setToastState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* Top Navigation */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <SloganRibbon />
        <Pillars />
        <VisionMission />
        <Gallery onOpenLightbox={handleOpenLightbox} />
        <ContactSection onFormSuccess={handleFormSuccess} />
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Interactive Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={handleCloseLightbox}
        imageUrl={lightboxState.imageUrl}
        title={lightboxState.title}
        category={lightboxState.category}
      />

      {/* Toast Notification */}
      <Toast
        isOpen={toastState.isOpen}
        onClose={handleCloseToast}
        title={toastState.title}
        message={toastState.message}
        type={toastState.type}
      />
    </div>
  );
}
