'use client';
import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    // Next.js sometimes restores scroll position automatically.
    // This forces it back to the top on page load.
    window.scrollTo(0, 0);
  }, []);

  return null;
}
