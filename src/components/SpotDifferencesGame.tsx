import React, { useState, useEffect } from 'react';
import { CheckCircle, Award } from 'lucide-react';
import type { SpotDifferencesData, Difference } from '../data/issuesData';

interface SpotDifferencesGameProps {
  data: SpotDifferencesData;
  onComplete: () => void;
  isCompleted: boolean;
}

// Helper to render shared background elements for all 4 scenes
export const renderSharedBackground = () => (
  <>
    <rect x="0" y="0" width="400" height="220" fill="var(--paper-dark)" />
    <rect x="0" y="220" width="400" height="80" fill="#e5e7eb" />
    <line x1="0" y1="220" x2="400" y2="220" stroke="#d1d5db" strokeWidth="2" />
    
    {/* Desk */}
    <rect x="180" y="170" width="180" height="10" fill="#0b457e" rx="2" />
    <line x1="200" y1="180" x2="200" y2="250" stroke="#08335e" strokeWidth="4" />
    <line x1="340" y1="180" x2="340" y2="250" stroke="#08335e" strokeWidth="4" />
    
    {/* Window */}
    <rect x="250" y="20" width="100" height="60" fill="#93c5fd" stroke="#4b5563" strokeWidth="2" opacity="0.6" />
    <line x1="300" y1="20" x2="300" y2="80" stroke="#4b5563" strokeWidth="1" />
    <line x1="250" y1="50" x2="350" y2="50" stroke="#4b5563" strokeWidth="1" />
    <path d="M 290 60 C 285 55, 275 55, 270 60 C 265 60, 260 65, 265 72 L 315 72 C 320 65, 315 60, 310 60 Z" fill="white" opacity="0.9" />
  </>
);

// Custom renders per scene type for SVG A (original) and SVG B (modified)
export const renderSceneContentHelper = (sceneType: string, isSideB: boolean) => {
  const scene = sceneType || 'studio_fissazione';

  if (scene === 'studio_strabismo') {
    return (
      <>
        {renderSharedBackground()}
        {/* Hess Chart on Left Wall */}
        <rect x="40" y="30" width="85" height="80" fill="white" stroke="#374151" strokeWidth="2" />
        <path d="M 40 50 L 125 50 M 40 70 L 125 70 M 40 90 L 125 90 M 60 30 L 60 110 M 80 30 L 80 110 M 100 30 L 100 110" stroke={isSideB ? "#16a34a" : "#ef4444"} strokeWidth="1" />
        <text x="82" y="25" fill="black" fontSize="9" fontWeight="bold" textAnchor="middle">SCHERMO HESS</text>

        {/* Stecca Prismi on Desk */}
        <rect x="240" y="150" width="40" height="15" fill="#d1d5db" stroke="#374151" strokeWidth="1" rx="2" />
        <text x="260" y="161" fill={isSideB ? "#c22026" : "black"} fontSize="9" fontWeight="bold" textAnchor="middle">
          {isSideB ? "P: 25Δ" : "P: 15Δ"}
        </text>

        {/* Occhiali Bagolini */}
        <ellipse cx="330" cy="155" rx="14" ry="10" fill="none" stroke="#2563eb" strokeWidth="2" />
        <line x1="316" y1="155" x2="344" y2="155" stroke="#2563eb" strokeWidth="1" transform={isSideB ? "rotate(45, 330, 155)" : "rotate(0, 330, 155)"} />

        {/* Montatura Prova */}
        <rect x="30" y="180" width="45" height="35" fill="white" stroke="#4b5563" strokeWidth="2" rx="3" />
        <circle cx="52" cy="197" r="10" fill={isSideB ? "#ef4444" : "none"} stroke="#1f2937" strokeWidth="1.5" />

        {/* Mascot in background */}
        <circle cx="280" cy="40" r="14" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
        <circle cx="275" cy="38" r="3" fill="black" />
        <circle cx={isSideB ? "281" : "285"} cy="38" r="3" fill="black" />
        <path d="M 273 47 Q 280 52 287 47" fill="none" stroke="black" strokeWidth="1.5" />

        {/* Torcia tascabile */}
        <rect x="150" y="235" width="20" height="20" fill="#6b7280" rx="2" />
        <circle cx="160" cy="245" r="5" fill={isSideB ? "#9ca3af" : "#fef08a"} />

        {/* Angolo Kappa Poster */}
        <rect x="165" y="40" width="45" height="30" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="187" y="58" fill="#b45309" fontSize="12" fontWeight="bold" textAnchor="middle">
          {isSideB ? "Angle α" : "Angle κ"}
        </text>
      </>
    );
  }

  if (scene === 'cabinet_sinottoforo') {
    return (
      <>
        {renderSharedBackground()}
        {/* Sinottoforo Base */}
        <rect x="200" y="120" width="140" height="48" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" rx="4" />
        <circle cx="225" cy="144" r="14" fill={isSideB ? "#1f2937" : "#0284c7"} stroke="#0369a1" strokeWidth="1.5" />
        <circle cx="315" cy="144" r="14" fill={isSideB ? "#1f2937" : "#0284c7"} stroke="#0369a1" strokeWidth="1.5" />

        {/* Diapositiva Leone / Gabbia */}
        <rect x="65" y="55" width="45" height="40" fill="white" stroke="#334155" strokeWidth="2" />
        <rect x="73" y="62" width="28" height="26" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        <circle cx={isSideB ? "120" : "87"} cy="75" r="7" fill="#f59e0b" />

        {/* Scala Gradi Oggettivo */}
        <rect x="245" y="105" width="50" height="15" fill="white" stroke="#334155" strokeWidth="1" />
        <text x="270" y="116" fill="black" fontSize="9" fontWeight="bold" textAnchor="middle">
          {isSideB ? "+10°" : "0°"}
        </text>

        {/* Flashing Button */}
        <circle cx="325" cy="150" r="6" fill={isSideB ? "#9ca3af" : "#22c55e"} stroke="#15803d" strokeWidth="1" />

        {/* Specchio interno */}
        <line x1="260" y1="35" x2="290" y2="55" stroke="#38bdf8" strokeWidth={isSideB ? "4" : "2"} />

        {/* Mappa Worth */}
        <rect x="145" y="215" width="40" height="50" fill="white" stroke="#475569" strokeWidth="1.5" />
        <circle cx="165" cy="230" r="5" fill="#ef4444" />
        <circle cx="157" cy="245" r="5" fill="#22c55e" />
        <circle cx="173" cy="245" r="5" fill="#22c55e" />

        {/* Coniglio fusione */}
        <rect x="165" y="45" width="30" height="30" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />
        <circle cx="180" cy="60" r="6" fill="#cbd5e1" />
        {isSideB ? null : <circle cx="185" cy="63" r="2.5" fill="white" />}
      </>
    );
  }

  if (scene === 'laboratorio_oftalmico') {
    return (
      <>
        {renderSharedBackground()}
        {/* Forottero con Cilindro Crociato */}
        <rect x="60" y="40" width="70" height="60" fill="#334155" rx="6" />
        <circle cx="95" cy="70" r="18" fill="white" stroke="#94a3b8" strokeWidth="2" />
        <line x1="95" y1="52" x2="95" y2="88" stroke="#ef4444" strokeWidth="2" transform={isSideB ? "rotate(90, 95, 70)" : "rotate(0, 95, 70)"} />

        {/* Lampada a fessura */}
        <rect x="245" y="105" width="40" height="40" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
        <circle cx="265" cy="125" r="8" fill={isSideB ? "#64748b" : "#3b82f6"} />

        {/* Tonometro Goldmann */}
        <polygon points="320,165 340,165 330,145" fill={isSideB ? "#e11d48" : "#0284c7"} opacity="0.9" />

        {/* Topografia Corneale */}
        <rect x="20" y="180" width="50" height="40" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
        <circle cx="45" cy="200" r="12" fill="none" stroke={isSideB ? "#3b82f6" : "#ef4444"} strokeWidth="4" />

        {/* Ottotipo Snellen E */}
        <rect x="260" y="20" width="50" height="40" fill="white" stroke="#334155" strokeWidth="1.5" />
        <text x="285" y="45" fill="black" fontSize="22" fontWeight="bold" textAnchor="middle" transform={isSideB ? "rotate(180, 285, 37)" : ""}>
          E
        </text>

        {/* Montatura con Filtro Rosso-Verde */}
        <circle cx="160" cy="250" r="10" fill={isSideB ? "#22c55e" : "#ef4444"} stroke="#1f2937" strokeWidth="1.5" />

        {/* Poster bulbo occhio */}
        <rect x="155" y="35" width="40" height="40" fill="white" stroke="#334155" strokeWidth="1" />
        <circle cx="175" cy="55" r="12" fill={isSideB ? "#f59e0b" : "#3b82f6"} />
      </>
    );
  }

  // Default: studio_fissazione (Issue 1)
  return (
    <>
      {renderSharedBackground()}
      {/* Scrivania */}
      <rect x="180" y="170" width="180" height="10" fill="#7c3aed" rx="2" />
      <line x1="200" y1="180" x2="200" y2="250" stroke="#6d28d9" strokeWidth="4" />
      <line x1="340" y1="180" x2="340" y2="250" stroke="#6d28d9" strokeWidth="4" />
      
      {/* Computer monitor */}
      <path d="M 270 170 L 270 150 L 255 150 L 285 150 Z" fill="#4b5563" />
      <rect x="230" y="95" width="80" height="55" fill="#1f2937" stroke="#4b5563" strokeWidth="3" rx="4" />
      <text x="270" y="125" fill={isSideB ? "#f97316" : "#10b981"} fontSize="9" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">Vision AI</text>
      
      {/* Eye Chart */}
      <rect x="50" y="40" width="80" height="120" fill="white" stroke="#374151" strokeWidth="2" rx="4" />
      <rect x="55" y="45" width="70" height="8" fill="#ef4444" rx="1" />
      
      <text x="90" y="75" fill="black" fontSize="28" fontFamily="monospace" fontWeight="bold" textAnchor="middle" transform={isSideB ? "rotate(90, 90, 68)" : ""}>E</text>
      <text x="90" y="105" fill="black" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">T O Z</text>
      <text x="90" y="125" fill="black" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">L P E D</text>
      
      {/* Prisma sul tavolo */}
      <polygon points="320,165 340,165 330,145" fill={isSideB ? "#ec4899" : "#3b82f6"} opacity="0.8" stroke={isSideB ? "#be185d" : "#1d4ed8"} strokeWidth="1" />
      
      {/* Pianta in vaso */}
      <polygon points="28,260 48,260 43,288 33,288" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
      <path d="M 38 260 Q 26 235 20 215" stroke="#15803d" strokeWidth="2.5" fill="none" />
      <path d="M 38 260 Q 46 235 52 215" stroke="#15803d" strokeWidth="2.5" fill="none" />
      <path d="M 38 260 Q 38 215 39 198" stroke="#15803d" strokeWidth="2.5" fill="none" />
      
      <ellipse cx="20" cy="225" rx="8" ry="4" fill="#22c55e" transform="rotate(-30 20 225)" />
      <ellipse cx="52" cy="225" rx="8" ry="4" fill="#22c55e" transform="rotate(30 52 225)" />
      <ellipse cx="32" cy="235" rx="8" ry="4" fill="#22c55e" transform="rotate(-15 32 235)" />
      <ellipse cx="44" cy="235" rx="8" ry="4" fill="#22c55e" transform="rotate(15 44 235)" />

      {/* Grandi Fiori Rossi (presenti SOLO nel Disegno A a sinistra) */}
      {!isSideB && (
        <g>
          {/* Fiore principale in cima */}
          <g transform="translate(39, 195)">
            <circle cx="0" cy="0" r="11" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
            <circle cx="-7" cy="0" r="6" fill="#dc2626" />
            <circle cx="7" cy="0" r="6" fill="#dc2626" />
            <circle cx="0" cy="-7" r="6" fill="#dc2626" />
            <circle cx="0" cy="7" r="6" fill="#dc2626" />
            <circle cx="0" cy="0" r="4.5" fill="#fde047" />
          </g>
          {/* Secondo fiore a sinistra */}
          <g transform="translate(19, 212)">
            <circle cx="0" cy="0" r="8" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.2" />
            <circle cx="0" cy="0" r="3" fill="#fde047" />
          </g>
        </g>
      )}

      {/* Sole */}
      {!isSideB && <circle cx="280" cy="35" r="10" fill="#eab308" />}

      {/* Sgabello */}
      <ellipse cx="160" cy="225" rx="20" ry="6" fill="#374151" />
      <line x1="150" y1="228" x2="140" y2="270" stroke="#4b5563" strokeWidth="3" />
      <line x1="170" y1="228" x2="180" y2="270" stroke="#4b5563" strokeWidth="3" />
      {!isSideB && <line x1="160" y1="228" x2="160" y2="270" stroke="#4b5563" strokeWidth="3" />}

      {/* Quadro Occhio */}
      <rect x="150" y="30" width="60" height="45" fill="#faf5ff" stroke="#d97706" strokeWidth="2" />
      <path d="M 160 52 Q 180 40 200 52 Q 180 64 160 52 Z" fill="white" stroke="#374151" strokeWidth="1" />
      <circle cx="180" cy="52" r="8" fill="none" stroke={isSideB ? "#16a34a" : "#2563eb"} strokeWidth="2" />
      <circle cx="180" cy="52" r="4" fill="black" />
    </>
  );
};

export const SpotDifferencesGame: React.FC<SpotDifferencesGameProps> = ({ data, onComplete, isCompleted }) => {
  const [foundDiffIds, setFoundDiffIds] = useState<number[]>([]);

  useEffect(() => {
    setFoundDiffIds([]);
  }, [data]);

  const handleImageClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isCompleted) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const svgX = (clickX / rect.width) * 400;
    const svgY = (clickY / rect.height) * 300;

    let matchedDiff: Difference | null = null;
    for (const diff of data.differences) {
      if (foundDiffIds.includes(diff.id)) continue;
      const distance = Math.sqrt(Math.pow(svgX - diff.x, 2) + Math.pow(svgY - diff.y, 2));
      if (distance <= diff.radius + 6) {
        matchedDiff = diff;
        break;
      }
    }

    if (matchedDiff) {
      const newFound = [...foundDiffIds, matchedDiff.id];
      setFoundDiffIds(newFound);
      
      if (newFound.length === data.differences.length) {
        onComplete();
      }
    }
  };

  const handleRevealAll = () => {
    setFoundDiffIds(data.differences.map(d => d.id));
    onComplete();
  };

  const handleReset = () => {
    setFoundDiffIds([]);
  };

  return (
    <div className="differences-container">
      <h2 className="game-title">{data.title}</h2>
      <p className="game-subtitle">
        {data.subtitle}
      </p>

      {isCompleted && (
        <div className="feedback-modal" style={{ position: 'relative', top: 0, transform: 'none', margin: '0 auto 15px auto' }}>
          <CheckCircle size={18} />
          <span>Ottimo occhio! Hai scovato tutte le 7 differenze!</span>
        </div>
      )}

      <div className="differences-counter-banner">
        <Award size={20} />
        <span>Differenze Trovate: {foundDiffIds.length} di {data.differences.length}</span>
      </div>

      <div className="differences-view">
        {/* IMAGE A */}
        <div className="difference-frame">
          <div className="difference-frame-title">DISEGNO A</div>
          <div className="difference-svg-wrapper">
            <svg viewBox="0 0 400 300" className="difference-svg" onClick={handleImageClick}>
              {renderSceneContentHelper(data.sceneType, false)}

              {foundDiffIds.map(id => {
                const diff = data.differences.find(d => d.id === id);
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

        {/* IMAGE B */}
        <div className="difference-frame">
          <div className="difference-frame-title">DISEGNO B</div>
          <div className="difference-svg-wrapper">
            <svg viewBox="0 0 400 300" className="difference-svg" onClick={handleImageClick}>
              {renderSceneContentHelper(data.sceneType, true)}

              {foundDiffIds.map(id => {
                const diff = data.differences.find(d => d.id === id);
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
