import React, { useState, useEffect } from 'react';
import { CheckCircle, RotateCcw, Sparkles, AlertCircle } from 'lucide-react';
import type { TargetData } from '../data/issuesData';

interface TargetGameProps {
  data: TargetData;
  issueId: number;
  onComplete: () => void;
  isCompleted: boolean;
}

interface DotPoint {
  id: number;
  x: number;
  y: number;
  label?: string;
}

// Dot datasets for the 4 weekly issues to draw orthoptic figures
const PISTA_DATA: { [key: number]: { title: string; subtitle: string; dots: DotPoint[]; svgPath: string } } = {
  1: {
    title: "La Pista Cifrata: L'Occhio Foveale",
    subtitle: "Unisci i punti in ordine numerico crescente (da 1 a 20) per rivelare l'illustrazione dell'organo visivo e della fovea!",
    dots: [
      { id: 1, x: 50, y: 150 },
      { id: 2, x: 80, y: 90 },
      { id: 3, x: 140, y: 50 },
      { id: 4, x: 210, y: 40 },
      { id: 5, x: 280, y: 50 },
      { id: 6, x: 340, y: 90 },
      { id: 7, x: 370, y: 150 },
      { id: 8, x: 340, y: 210 },
      { id: 9, x: 280, y: 250 },
      { id: 10, x: 210, y: 260 },
      { id: 11, x: 140, y: 250 },
      { id: 12, x: 80, y: 210 },
      { id: 13, x: 50, y: 150 },
      { id: 14, x: 160, y: 150 },
      { id: 15, x: 180, y: 120 },
      { id: 16, x: 230, y: 120 },
      { id: 17, x: 250, y: 150 },
      { id: 18, x: 230, y: 180 },
      { id: 19, x: 180, y: 180 },
      { id: 20, x: 160, y: 150 }
    ],
    svgPath: "M 50 150 Q 210 20 370 150 Q 210 280 50 150 Z M 160 150 A 45 45 0 1 0 250 150 A 45 45 0 1 0 160 150 Z"
  },
  2: {
    title: "La Pista Cifrata: La Montatura di Prova ed i Prismi",
    subtitle: "Collega i punti dal numero 1 al 20 per ricomporre la classica montatura di prova ortottica con alloggiamento prismi!",
    dots: [
      { id: 1, x: 40, y: 120 },
      { id: 2, x: 180, y: 120 },
      { id: 3, x: 180, y: 200 },
      { id: 4, x: 40, y: 200 },
      { id: 5, x: 40, y: 120 },
      { id: 6, x: 180, y: 150 },
      { id: 7, x: 240, y: 150 },
      { id: 8, x: 240, y: 120 },
      { id: 9, x: 380, y: 120 },
      { id: 10, x: 380, y: 200 },
      { id: 11, x: 240, y: 200 },
      { id: 12, x: 240, y: 120 },
      { id: 13, x: 110, y: 160 },
      { id: 14, x: 135, y: 135 },
      { id: 15, x: 135, y: 185 },
      { id: 16, x: 310, y: 160 },
      { id: 17, x: 335, y: 135 },
      { id: 18, x: 335, y: 185 },
      { id: 19, x: 20, y: 140 },
      { id: 20, x: 400, y: 140 }
    ],
    svgPath: "M 40 120 L 180 120 L 180 200 L 40 200 Z M 240 120 L 380 120 L 380 200 L 240 200 Z M 180 150 L 240 150"
  },
  3: {
    title: "La Pista Cifrata: Il Sinottoforo",
    subtitle: "Traccia la linea continua collegando tutti i punti in sequenza numerica per disegnare lo strumento di fusione binoculare!",
    dots: [
      { id: 1, x: 80, y: 240 },
      { id: 2, x: 340, y: 240 },
      { id: 3, x: 320, y: 190 },
      { id: 4, x: 100, y: 190 },
      { id: 5, x: 80, y: 240 },
      { id: 6, x: 130, y: 190 },
      { id: 7, x: 110, y: 100 },
      { id: 8, x: 160, y: 80 },
      { id: 9, x: 175, y: 140 },
      { id: 10, x: 245, y: 140 },
      { id: 11, x: 260, y: 80 },
      { id: 12, x: 310, y: 100 },
      { id: 13, x: 290, y: 190 },
      { id: 14, x: 170, y: 170 },
      { id: 15, x: 250, y: 170 },
      { id: 16, x: 210, y: 120 },
      { id: 17, x: 135, y: 90 },
      { id: 18, x: 285, y: 90 },
      { id: 19, x: 210, y: 210 },
      { id: 20, x: 80, y: 240 }
    ],
    svgPath: "M 80 240 L 340 240 L 320 190 L 100 190 Z M 130 190 L 110 100 L 160 80 L 175 140 M 290 190 L 310 100 L 260 80 L 245 140"
  },
  4: {
    title: "La Pista Cifrata: Il Forottero e l'Ottotipo",
    subtitle: "Unisci i 20 punti per svelare l'apparecchio di rifrazione e l'ottotipo a tabella di Snellen!",
    dots: [
      { id: 1, x: 120, y: 40 },
      { id: 2, x: 300, y: 40 },
      { id: 3, x: 300, y: 140 },
      { id: 4, x: 120, y: 140 },
      { id: 5, x: 120, y: 40 },
      { id: 6, x: 160, y: 90 },
      { id: 7, x: 260, y: 90 },
      { id: 8, x: 180, y: 180 },
      { id: 9, x: 240, y: 180 },
      { id: 10, x: 240, y: 260 },
      { id: 11, x: 180, y: 260 },
      { id: 12, x: 180, y: 180 },
      { id: 13, x: 195, y: 200 },
      { id: 14, x: 225, y: 200 },
      { id: 15, x: 225, y: 220 },
      { id: 16, x: 195, y: 220 },
      { id: 17, x: 195, y: 240 },
      { id: 18, x: 225, y: 240 },
      { id: 19, x: 210, y: 65 },
      { id: 20, x: 120, y: 40 }
    ],
    svgPath: "M 120 40 L 300 40 L 300 140 L 120 140 Z M 180 180 L 240 180 L 240 260 L 180 260 Z"
  }
};

export const TargetGame: React.FC<TargetGameProps> = ({ issueId, onComplete, isCompleted }) => {
  const currentIssue = PISTA_DATA[issueId] || PISTA_DATA[1];
  const totalDots = currentIssue.dots.length;

  const [connectedDotIds, setConnectedDotIds] = useState<number[]>([1]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setConnectedDotIds([1]);
    setErrorMsg(null);
  }, [issueId]);

  const handleDotClick = (dotId: number) => {
    if (isCompleted) return;

    const lastId = connectedDotIds[connectedDotIds.length - 1];
    const expectedNextId = lastId + 1;

    if (dotId === expectedNextId) {
      const newConnected = [...connectedDotIds, dotId];
      setConnectedDotIds(newConnected);
      setErrorMsg(null);

      if (dotId === totalDots) {
        onComplete();
      }
    } else if (connectedDotIds.includes(dotId)) {
      if (dotId === lastId && dotId > 1) {
        setConnectedDotIds(prev => prev.slice(0, -1));
        setErrorMsg(null);
      }
    } else {
      setErrorMsg(`Punto errato! Devi unire i punti in ordine numerico crescente. Prossimo punto: N. ${expectedNextId}`);
      setTimeout(() => setErrorMsg(null), 3500);
    }
  };

  const handleAutoConnect = () => {
    const allIds = currentIssue.dots.map(d => d.id);
    setConnectedDotIds(allIds);
    onComplete();
  };

  const handleReset = () => {
    setConnectedDotIds([1]);
    setErrorMsg(null);
  };

  const isAllConnected = connectedDotIds.length === totalDots || isCompleted;

  return (
    <div className="target-container">
      <h2 className="game-title">{currentIssue.title}</h2>
      <p className="game-subtitle">
        {currentIssue.subtitle}
      </p>

      {errorMsg && (
        <div className="feedback-modal" style={{ backgroundColor: '#fee2e2', borderColor: '#fca5a5', color: '#991b1b' }}>
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {(isCompleted || isAllConnected) && (
        <div className="feedback-modal">
          <CheckCircle size={18} />
          <span>Pista Cifrata completata! L'illustrazione ortottica è stata svelata!</span>
        </div>
      )}

      {/* Pista Cifrata Canvas SVG */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        position: 'relative',
        backgroundColor: 'white',
        border: '2px solid var(--border-color)',
        borderRadius: '8px',
        padding: '12px',
        boxShadow: 'var(--shadow-card)'
      }}>
        <svg viewBox="0 0 420 300" style={{ width: '100%', height: 'auto', display: 'block', userSelect: 'none' }}>
          {/* Background grid texture */}
          <rect x="0" y="0" width="420" height="300" fill="var(--paper-bg)" />
          
          {/* Complete revealed figure path when finished */}
          {isAllConnected && (
            <path
              d={currentIssue.svgPath}
              fill="rgba(11, 69, 126, 0.08)"
              stroke="var(--se-blue)"
              strokeWidth="2.5"
              strokeDasharray="0"
              style={{ animation: 'fadeInDown 0.5s ease-out' }}
            />
          )}

          {/* Lines connecting completed dots */}
          {connectedDotIds.map((dotId, index) => {
            if (index === 0) return null;
            const prevDot = currentIssue.dots.find(d => d.id === connectedDotIds[index - 1]);
            const currDot = currentIssue.dots.find(d => d.id === dotId);
            if (!prevDot || !currDot) return null;

            return (
              <line
                key={`line-${index}`}
                x1={prevDot.x}
                y1={prevDot.y}
                x2={currDot.x}
                y2={currDot.y}
                stroke="var(--se-red)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}

          {/* Dots */}
          {currentIssue.dots.map((dot) => {
            const isConnected = connectedDotIds.includes(dot.id);
            const isNext = !isAllConnected && dot.id === connectedDotIds.length + 1;

            return (
              <g
                key={dot.id}
                onClick={() => handleDotClick(dot.id)}
                style={{ cursor: isAllConnected ? 'default' : 'pointer' }}
              >
                {/* Glow ring for next dot */}
                {isNext && (
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r="14"
                    fill="none"
                    stroke="#ca8a04"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                    style={{ animation: 'goldPulse 1.2s infinite' }}
                  />
                )}

                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={isNext ? 7 : isConnected ? 6 : 5}
                  fill={isConnected ? "var(--se-red)" : isNext ? "#f59e0b" : "white"}
                  stroke={isConnected ? "var(--se-red)" : "var(--border-color)"}
                  strokeWidth="2"
                  style={{ transition: 'all 0.2s ease' }}
                />

                {/* Dot Number Label */}
                <text
                  x={dot.x + 9}
                  y={dot.y - 6}
                  fill={isConnected ? "var(--se-red)" : isNext ? "#b45309" : "black"}
                  fontSize="12"
                  fontFamily="var(--font-mono)"
                  fontWeight={isNext || isConnected ? "bold" : "normal"}
                >
                  {dot.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
        <button className="nav-button" onClick={handleReset}>
          <RotateCcw size={16} />
          Ricomincia
        </button>
        {!isAllConnected && (
          <button className="nav-button" onClick={handleAutoConnect} style={{ color: 'var(--se-blue)', borderColor: 'var(--se-blue)' }}>
            <Sparkles size={16} />
            Unisci Tutti i Punti
          </button>
        )}
      </div>
    </div>
  );
};
