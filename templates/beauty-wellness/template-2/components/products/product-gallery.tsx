"use client";

import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="pdpGallery">
      <div className="pdpGallery__main"><img src={images[active]} alt={active === 0 ? name : `${name} texture and detail`} /></div>
      <div className="pdpGallery__thumbs">
        {images.map((image, index) => <button key={image} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`View image ${index + 1}`}><img src={image} alt="" /></button>)}
      </div>
    </div>
  );
}
