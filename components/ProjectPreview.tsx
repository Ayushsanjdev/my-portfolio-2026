"use client";

import Image from "next/image";
import { useId, useState } from "react";

export default function ProjectPreview({ name, slug }: { name: string; slug: string }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();

  return (
    <div className="project-preview" data-expanded={expanded}>
      <div className="preview-stage" id={id}>
        <div className="preview-note" aria-hidden="true">
          <span>From the browser</span>
          <strong>{name}<span>↗</span></strong>
        </div>
        <div className="preview-desktop">
          <div className="preview-browser" aria-hidden="true"><i /><i /><i /><span>{slug === "evaltech" ? "evaltech.ai" : "rsvp.kim"}</span></div>
          <Image src={`/projects/${slug}.webp`} alt={`${name} public homepage on desktop`} width={1280} height={900} sizes="(max-width: 760px) 260px, 340px" />
        </div>
        <div className="preview-mobile">
          <Image src={`/projects/${slug}-mobile.webp`} alt={`${name} public homepage on mobile`} width={390} height={844} sizes="110px" />
        </div>
      </div>
      <div className="preview-caption">
        <span>Public product preview</span>
        <button type="button" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(!expanded)}>
          {expanded ? "Close preview −" : "Explore preview +"}
        </button>
      </div>
    </div>
  );
}
