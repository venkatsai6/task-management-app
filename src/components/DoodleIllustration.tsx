function DoodleIllustration() {
  return (
    <div className="doodle-container">
      <svg
        viewBox="0 0 520 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="doodle-svg"
      >
        {/* ---- CLIPBOARD ---- */}
        <rect
          x="140" y="60" width="180" height="240" rx="14"
          className="doodle-line doodle-thick doodle-draw-1"
        />
        <rect
          x="190" y="44" width="60" height="30" rx="8"
          className="doodle-line doodle-thick doodle-draw-2"
        />
        <circle cx="220" cy="52" r="6" className="doodle-line doodle-draw-2" />

        {/* Row 1 - checked */}
        <rect x="166" y="105" width="24" height="24" rx="5" className="doodle-line doodle-draw-3" />
        <polyline points="171,118 178,126 192,108" className="doodle-line doodle-accent-green doodle-draw-3" />
        <line x1="204" y1="114" x2="294" y2="114" className="doodle-line doodle-draw-3" />
        <line x1="204" y1="124" x2="264" y2="124" className="doodle-line doodle-line-faint doodle-draw-3" />

        {/* Row 2 - checked */}
        <rect x="166" y="148" width="24" height="24" rx="5" className="doodle-line doodle-draw-4" />
        <polyline points="171,161 178,169 192,151" className="doodle-line doodle-accent-green doodle-draw-4" />
        <line x1="204" y1="157" x2="280" y2="157" className="doodle-line doodle-draw-4" />
        <line x1="204" y1="167" x2="250" y2="167" className="doodle-line doodle-line-faint doodle-draw-4" />

        {/* Row 3 - pending */}
        <rect x="166" y="191" width="24" height="24" rx="5" className="doodle-line doodle-draw-5" />
        <line x1="204" y1="200" x2="288" y2="200" className="doodle-line doodle-draw-5" />
        <line x1="204" y1="210" x2="258" y2="210" className="doodle-line doodle-line-faint doodle-draw-5" />

        {/* Row 4 - pending */}
        <rect x="166" y="234" width="24" height="24" rx="5" className="doodle-line doodle-draw-6" />
        <line x1="204" y1="243" x2="270" y2="243" className="doodle-line doodle-draw-6" />
        <line x1="204" y1="253" x2="240" y2="253" className="doodle-line doodle-line-faint doodle-draw-6" />

        {/* ---- PENCIL ---- */}
        <g className="doodle-pencil">
          <rect x="355" y="70" width="14" height="100" rx="3" className="doodle-line doodle-draw-7" />
          <polygon points="355,170 369,170 362,192" className="doodle-line doodle-draw-7" />
          <line x1="355" y1="85" x2="369" y2="85" className="doodle-line doodle-draw-7" />
          <line x1="355" y1="160" x2="369" y2="160" className="doodle-line doodle-draw-7" />
          <circle cx="362" cy="188" r="1.5" className="doodle-line doodle-draw-7" />
        </g>

        {/* ---- COFFEE MUG ---- */}
        <g className="doodle-mug">
          <rect x="380" y="230" width="50" height="55" rx="6" className="doodle-line doodle-thick doodle-draw-8" />
          <path d="M430,248 C448,248 448,272 430,272" className="doodle-line doodle-draw-8" />
          <line x1="378" y1="285" x2="432" y2="285" className="doodle-line doodle-draw-8" />
          {/* Steam */}
          <path d="M395,224 C395,216 402,216 402,208" className="doodle-line doodle-steam doodle-draw-9" />
          <path d="M408,222 C408,212 416,212 416,202" className="doodle-line doodle-steam doodle-draw-9" />
          <path d="M420,226 C420,218 426,218 426,210" className="doodle-line doodle-steam doodle-draw-9" />
        </g>

        {/* ---- PLANT ---- */}
        <g className="doodle-plant">
          <path d="M60,310 L56,345 L104,345 L100,310 Z" className="doodle-line doodle-thick doodle-draw-8" />
          <line x1="55" y1="310" x2="105" y2="310" className="doodle-line doodle-thick doodle-draw-8" />
          <path d="M80,310 C80,280 80,260 80,240" className="doodle-line doodle-draw-9" />
          <path d="M80,270 C60,255 50,235 65,225 C80,235 75,255 80,270" className="doodle-line doodle-accent-green doodle-draw-10" />
          <path d="M80,250 C100,235 112,220 100,208 C85,218 85,238 80,250" className="doodle-line doodle-accent-green doodle-draw-10" />
          <path d="M80,290 C95,278 108,270 100,258 C88,265 85,280 80,290" className="doodle-line doodle-accent-green doodle-draw-10" />
        </g>

        {/* ---- WAVE ---- */}
        <path
          d="M30,360 C80,340 120,370 170,350 C220,330 260,365 310,345 C360,325 400,355 470,340"
          className="doodle-line doodle-line-faint doodle-draw-6"
        />

        {/* ---- SPARKLES ---- */}
        <g className="doodle-float-1">
          <line x1="50" y1="80" x2="50" y2="104" className="doodle-line doodle-accent-yellow doodle-draw-8" />
          <line x1="38" y1="92" x2="62" y2="92" className="doodle-line doodle-accent-yellow doodle-draw-8" />
          <line x1="42" y1="82" x2="58" y2="102" className="doodle-line doodle-accent-yellow doodle-draw-8" />
          <line x1="58" y1="82" x2="42" y2="102" className="doodle-line doodle-accent-yellow doodle-draw-8" />
        </g>

        <g className="doodle-float-2">
          <line x1="470" y1="140" x2="470" y2="160" className="doodle-line doodle-accent-yellow doodle-draw-9" />
          <line x1="460" y1="150" x2="480" y2="150" className="doodle-line doodle-accent-yellow doodle-draw-9" />
          <line x1="463" y1="143" x2="477" y2="157" className="doodle-line doodle-accent-yellow doodle-draw-9" />
          <line x1="477" y1="143" x2="463" y2="157" className="doodle-line doodle-accent-yellow doodle-draw-9" />
        </g>

        <g className="doodle-float-3">
          <line x1="460" y1="60" x2="460" y2="76" className="doodle-line doodle-draw-10" />
          <line x1="452" y1="68" x2="468" y2="68" className="doodle-line doodle-draw-10" />
        </g>

        {/* Circle accents */}
        <circle cx="35" cy="170" r="5" className="doodle-line doodle-draw-8" />
        <circle cx="490" cy="100" r="4" className="doodle-line doodle-draw-9" />
        <circle cx="120" cy="340" r="6" className="doodle-line doodle-draw-10" />
        <circle cx="440" cy="300" r="3" className="doodle-line doodle-draw-10" />

        {/* Dotted arcs */}
        <path
          d="M340,40 C380,20 430,30 460,50"
          className="doodle-line doodle-line-faint doodle-dotted"
          strokeDasharray="4 6"
        />
        <path
          d="M30,300 C50,290 80,295 100,310"
          className="doodle-line doodle-line-faint doodle-dotted"
          strokeDasharray="4 6"
        />
      </svg>
    </div>
  );
}

export default DoodleIllustration;
