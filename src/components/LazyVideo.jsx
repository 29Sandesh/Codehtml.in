import React, { useRef } from 'react';
import { useInView } from 'framer-motion';

export default function LazyVideo({ src, className, autoPlay = true, loop = true, muted = true, playsInline = true, children }) {
  const ref = useRef(null);
  // trigger when 10% of the container is in view
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: "200px" });

  return (
    <div ref={ref} className="w-full h-full relative">
      {isInView && (
        <video
          src={src}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          className={`absolute inset-0 w-full h-full object-cover ${className || ''}`}
        >
          {children}
        </video>
      )}
    </div>
  );
}
