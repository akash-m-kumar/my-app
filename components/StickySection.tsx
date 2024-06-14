"use client";
import React, { useState, useEffect, useRef } from 'react';

const Stickyboi = () => {
  const [features, setFeatures] = useState(Array.from({ length: 20 }));
  const [hasMoreFeatures, setHasMoreFeatures] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const fetchMoreFeatures = async () => {
    if (isFetching) return;
    setIsFetching(true);
    if (features.length >= 100) {
      setHasMoreFeatures(false);
      setIsFetching(false);
      return;
    }
    try {
      // Simulate API call (replace with real API call)
      const newFeatures = await new Promise((resolve) => setTimeout(() => resolve(Array.from({ length: 20 })), 500));
      setFeatures(features.concat(newFeatures));
    } finally {
      setIsFetching(false);
    }
  };

  const scrollableContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentRef = scrollableContentRef.current;
      if (currentRef) {
        const scrollHeight = currentRef.scrollHeight;
        const scrollTop = currentRef.scrollTop;
        const visibleHeight = currentRef.offsetHeight;
        const progress = (scrollTop / (scrollHeight - visibleHeight)) * 100;
        setScrollProgress(progress);
      }
    };
    const currentRef = scrollableContentRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollableContentRef]);

  return (
    <section className="hero-section h-screen flex flex-row overflow-hidden bg-gray-100">
      <div className="lg:w-1/2 w-full lg:block hidden mb-4 justify-center items-center h-screen">
        <div className="flex flex-col items-center p-4 lg:p-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-800 lg:text-6xl">Unlock Your Business Potential</h1>
          <p className="text-gray-600 mb-4 lg:text-lg">Discover the power of our platform and take your business to the next level.</p>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded lg:py-4 lg:px-6">Get Started</button>
          <div className="w-full h-1 bg-gray-300 mt-4">
            <div className="h-1 bg-orange-500" style={{ width: `${scrollProgress}%` }}></div>
          </div>
        </div>
      </div>
      <div ref={scrollableContentRef} className="lg:w-1/2 w-full flex-grow overflow-y-auto p-4">
        <div className="lg:hidden block mb-4">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">Unlock Your Business Potential</h1>
          <p className="text-gray-600 mb-4">Discover the power of our platform and take your business to the next level.</p>
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Get Started</button>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-white py-2 px-4 shadow-md lg:hidden">
          <div className="relative w-full h-4 bg-gray-300 rounded-full">
            <div className="absolute top-0 left-0 h-4 bg-orange-500 rounded-full" style={{ width: `${scrollProgress}%` }}></div>
          </div>
        </div>
        {features.map((_, index) => (
          <Feature key={index} index={index + 1} />
        ))}
        {hasMoreFeatures && (
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={fetchMoreFeatures}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

const Feature = ({ index }: { index: number }) => {
  return (
    <div className="p-4 border-b border-gray-300">
      <h3 className="text-2xl font-bold mb-2 text-gray-800">Feature {index}</h3>
      <ul>
        <li>Feature description</li>
        <li>Feature benefit</li>
        <li>Feature advantage</li>
      </ul>
    </div>
  );
};

export default Stickyboi;