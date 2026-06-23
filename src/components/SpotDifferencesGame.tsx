import React, { useState } from 'react';
import { CheckCircle, Award } from 'lucide-react';

interface SpotDifferencesGameProps {
  onComplete: () => void;
  isCompleted: boolean;
}

interface Difference {
  id: number;
  x: number;
  y: number;
  radius: number;
  description: string;
}

const DIFFERENCES: Difference[] = [
  { id: 1, x: 90, y: 75, radius: 22, description: "Orientamento della lettera E sull'ottotipo" },
  { id: 2, x: 270, y: 120, radius: 22, description: "Colore del logo Vision AI sullo schermo" },
  { id: 3, x: 330, y: 155, radius: 18, description: "Colore del prisma sul tavolo" },
  { id: 4, x: 40, y: 205, radius: 20, description: "Foglia superiore della pianta in vaso" },
  { id: 5, x: 280, y: 35, radius: 22, description: "Sole dietro la nuvola fuori dalla finestra" },
  { id: 6, x: 160, y: 250, radius: 22, description: "Gamba centrale dello sgabello" },
  { id: 7, x: 180, y: 52, radius: 18, description: "Colore dell'iride nel quadro dell'occhio" },
];

export const SpotDifferencesGame: React.FC<SpotDifferencesGameProps> = ({ onComplete, isCompleted }) => {
  const [foundDiffIds, setFoundDiffIds] = useState<number[]>([]);

  const handleImageClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isCompleted) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Scale screen pixels to SVG viewBox (400x300)
    const svgX = (clickX / rect.width) * 400;
    const svgY = (clickY / rect.height) * 300;

    // Check if clicked close to any difference
    let matchedDiff: Difference | null = null;
    for (const diff of DIFFERENCES) {
      if (foundDiffIds.includes(diff.id)) continue;
      const distance = Math.sqrt(Math.pow(svgX - diff.x, 2) + Math.pow(svgY - diff.y, 2));
      if (distance <= diff.radius + 5) { // Add padding for easier tapping
        matchedDiff = diff;
        break;
      }
    }

    if (matchedDiff) {
      const newFound = [...foundDiffIds, matchedDiff.id];
      setFoundDiffIds(newFound);
      
      if (newFound.length === DIFFERENCES.length) {
        onComplete();
      }
    }
  };

  const handleRevealAll = () => {
    setFoundDiffIds(DIFFERENCES.map(d => d.id));
    onComplete();
  };

  const handleReset = () => {
    setFoundDiffIds([]);
  };

  // Helper to render the shared scene elements
  const renderSharedElements = () => (
    <>
      {/* Background Room structure */}
      <rect x="0" y="0" width="400" height="220" fill="var(--paper-dark)" />
      <rect x="0" y="220" width="400" height="80" fill="#e5e7eb" />
      <line x1="0" y1="220" x2="400" y2="220" stroke="#d1d5db" strokeWidth="2" />
      
      {/* Scrivania (Desk) */}
      <rect x="180" y="170" width="180" height="10" fill="#7c3aed" rx="2" />
      <line x1="200" y1="180" x2="200" y2="250" stroke="#6d28d9" strokeWidth="4" />
      <line x1="340" y1="180" x2="340" y2="250" stroke="#6d28d9" strokeWidth="4" />
      
      {/* Computer monitor frame */}
      <path d="M 270 170 L 270 150 L 255 150 L 285 150 Z" fill="#4b5563" />
      <rect x="230" y="95" width="80" height="55" fill="#1f2937" stroke="#4b5563" strokeWidth="3" rx="4" />
      
      {/* Eye Chart (Ottotipo) structure */}
      <rect x="50" y="40" width="80" height="120" fill="white" stroke="#374151" strokeWidth="2" rx="4" />
      <rect x="55" y="45" width="70" height="8" fill="#ef4444" rx="1" />
      
      {/* Row 2 small letters */}
      <text x="90" y="105" fill="black" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">T O Z</text>
      {/* Row 3 smaller letters */}
      <text x="90" y="125" fill="black" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">L P E D</text>
      {/* Row 4 tiny letters */}
      <text x="90" y="145" fill="black" fontSize="6" fontFamily="monospace" fontWeight="bold" textAnchor="middle">P E C F D</text>
      
      {/* Window structure */}
      <rect x="250" y="20" width="100" height="60" fill="#93c5fd" stroke="#4b5563" strokeWidth="2" opacity="0.6" />
      <line x1="300" y1="20" x2="300" y2="80" stroke="#4b5563" strokeWidth="1" />
      <line x1="250" y1="50" x2="350" y2="50" stroke="#4b5563" strokeWidth="1" />
      
      {/* Cloud outside the window */}
      <path d="M 290 60 C 285 55, 275 55, 270 60 C 265 60, 260 65, 265 72 L 315 72 C 320 65, 315 60, 310 60 Z" fill="white" opacity="0.9" />
      
      {/* Plant Pot */}
      <polygon points="30,260 46,260 41,285 35,285" fill="#b45309" />
      <path d="M 38 260 Q 30 240 25 230" stroke="#15803d" strokeWidth="2" fill="none" />
      <path d="M 38 260 Q 42 235 45 225" stroke="#15803d" strokeWidth="2" fill="none" />
      <path d="M 38 260 Q 28 220 20 210" stroke="#15803d" strokeWidth="2" fill="none" />
      <path d="M 38 260 Q 38 215 40 205" stroke="#15803d" strokeWidth="2" fill="none" />
      
      {/* Plant Leaves */}
      <path d="M 25 230 C 20 232, 18 228, 25 230 Z" fill="#22c55e" />
      <path d="M 45 225 C 48 220, 52 225, 45 225 Z" fill="#22c55e" />
      <path d="M 20 210 C 14 212, 16 205, 20 210 Z" fill="#22c55e" />
      
      {/* Stool (Sgabello) Seat & Outer legs */}
      <ellipse cx="160" cy="225" rx="20" ry="6" fill="#374151" />
      <line x1="150" y1="228" x2="140" y2="270" stroke="#4b5563" strokeWidth="3" />
      <line x1="170" y1="228" x2="180" y2="270" stroke="#4b5563" strokeWidth="3" />

      {/* Drawing picture frame */}
      <rect x="150" y="30" width="60" height="45" fill="#faf5ff" stroke="#d97706" strokeWidth="2" />
      {/* Eye Drawing sclera */}
      <path d="M 160 52 Q 180 40 200 52 Q 180 64 160 52 Z" fill="white" stroke="#374151" strokeWidth="1" />
      {/* Pupil */}
      <circle cx="180" cy="52" r="4" fill="black" />
    </>
  );

  return (
    <div className="differences-container">
      <h2 className="game-title">Trova le Differenze</h2>
      <p className="game-subtitle">
        Ci sono 7 differenze tra i due disegni dello studio ortottico. Clicca direttamente sui particolari diversi di una delle due immagini!
      </p>

      {isCompleted && (
        <div className="feedback-modal" style={{ position: 'relative', top: 0, transform: 'none', margin: '0 auto 15px auto' }}>
          <CheckCircle size={18} />
          <span>Ottimo occhio! Hai scovato tutte le 7 differenze!</span>
        </div>
      )}

      {/* Differences counter banner */}
      <div className="differences-counter-banner">
        <Award size={20} />
        <span>Differenze Trovate: {foundDiffIds.length} di 7</span>
      </div>

      <div className="differences-view">
        {/* IMAGE A - Left side */}
        <div className="difference-frame">
          <div className="difference-frame-title">DISEGNO A</div>
          <div className="difference-svg-wrapper">
            <svg viewBox="0 0 400 300" className="difference-svg" onClick={handleImageClick}>
              {renderSharedElements()}
              
              {/* Diff 1 (Original E) */}
              <text x="90" y="75" fill="black" fontSize="28" fontFamily="monospace" fontWeight="bold" textAnchor="middle">E</text>

              {/* Diff 2 (Original monitor text: Green) */}
              <text x="270" y="125" fill="#10b981" fontSize="9" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">Vision AI</text>

              {/* Diff 3 (Original prism: Blue) */}
              <polygon points="320,165 340,165 330,145" fill="#3b82f6" opacity="0.8" stroke="#1d4ed8" strokeWidth="1" />

              {/* Diff 4 (Original plant has 4th leaf) */}
              <path d="M 40 205 C 38 198, 44 200, 40 205 Z" fill="#15803d" />

              {/* Diff 5 (Original sun present) */}
              <circle cx="280" cy="35" r="10" fill="#eab308" />

              {/* Diff 6 (Original middle stool leg present) */}
              <line x1="160" y1="228" x2="160" y2="270" stroke="#4b5563" strokeWidth="3" />

              {/* Diff 7 (Original iris: Blue) */}
              <circle cx="180" cy="52" r="8" fill="none" stroke="#2563eb" strokeWidth="2" />

              {/* Render circles for found differences */}
              {foundDiffIds.map(id => {
                const diff = DIFFERENCES.find(d => d.id === id);
                if (!diff) return null;
                return (
                  <circle
                    key={`a-found-${diff.id}`}
                    cx={diff.x}
                    cy={diff.y}
                    r={diff.radius}
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray="4 2"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* IMAGE B - Right side */}
        <div className="difference-frame">
          <div className="difference-frame-title">DISEGNO B</div>
          <div className="difference-svg-wrapper">
            <svg viewBox="0 0 400 300" className="difference-svg" onClick={handleImageClick}>
              {renderSharedElements()}
              
              {/* Diff 1 (Modified E -> Ш) */}
              <text x="90" y="75" fill="black" fontSize="28" fontFamily="monospace" fontWeight="bold" textAnchor="middle" transform="rotate(90, 90, 68)">E</text>

              {/* Diff 2 (Modified monitor text: Orange) */}
              <text x="270" y="125" fill="#f97316" fontSize="9" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">Vision AI</text>

              {/* Diff 3 (Modified prism: Pink) */}
              <polygon points="320,165 340,165 330,145" fill="#ec4899" opacity="0.8" stroke="#be185d" strokeWidth="1" />

              {/* Diff 4 (Modified plant leaf missing -> render nothing or just stem) */}
              {/* Left empty */}

              {/* Diff 5 (Modified sun missing) */}
              {/* Left empty */}

              {/* Diff 6 (Modified middle stool leg missing) */}
              {/* Left empty */}

              {/* Diff 7 (Modified iris: Green) */}
              <circle cx="180" cy="52" r="8" fill="none" stroke="#16a34a" strokeWidth="2" />

              {/* Render circles for found differences */}
              {foundDiffIds.map(id => {
                const diff = DIFFERENCES.find(d => d.id === id);
                if (!diff) return null;
                return (
                  <circle
                    key={`b-found-${diff.id}`}
                    cx={diff.x}
                    cy={diff.y}
                    r={diff.radius}
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray="4 2"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
        <button className="nav-button" onClick={handleReset}>
          Ricomincia
        </button>
        {!isCompleted && (
          <button className="nav-button" onClick={handleRevealAll} style={{ fontSize: '12px' }}>
            Rivela Soluzioni
          </button>
        )}
      </div>
    </div>
  );
};
