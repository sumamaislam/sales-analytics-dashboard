"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

// Dynamically import the Birthday component to avoid SSR issues
const Birthday = dynamic(() => import("@/components/birthday"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black flex items-center justify-center text-white text-2xl">Loading...</div>
});

export default function Test() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ensure component only renders on client side
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {isVisible && <Birthday isVisible={true} name="Sam" />}
    </div>
  );
}
