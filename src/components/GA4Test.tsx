'use client';

import { useEffect } from 'react';
import { event } from '@/lib/gtag';

export default function GA4Test() {
  useEffect(() => {
    // Test GA4 connection
    if (typeof window !== 'undefined' && window.gtag) {
      console.log('✅ GA4 is loaded and ready!');
      
      // Send a test event
      event({
        action: 'ga4_test',
        category: 'debug',
        label: 'setup_verification',
      });
    } else {
      console.log('❌ GA4 not loaded yet');
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded-lg text-sm">
      GA4 Test Component Loaded
    </div>
  );
}
