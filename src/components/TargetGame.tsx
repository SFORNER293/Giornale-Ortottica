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
}

// Guaranteed non-overlapping 20-dot datasets for all 4 weekly issues
const PISTA_DATA: { [key: number]: { title: string; subtitle: string; dots: DotPoint[]; svgPath: string } } = {
  1: {
    title: "La Pista Cifrata: L'Occhio Foveale",
    subtitle: "Unisci i punti in ordine numerico (da 1 a 20). Clicca sul punto N. 1 per iniziare!",
    dots: [
      { id: 1, x: 30, y: 150 },
      { id: 2, x: 70, y: 90 },
      { id: 3, x: 130, y: 50 },
      { id: 4, x: 200, y: 40 },
      { id: 5, x: 270, y: 50 },
      { id: 6, x: 330, y: 90 },
      { id: 7, x: 370, y: 150 },
      { id: 8, x: 330, y: 210 },
      { id: 9, x: 270, y: 250 },
      { id: 10, x: 200, y: 260 },
      { id: 11, x: 130, y: 250 },
      { id: 12, x: 70, y: 210 },
      { id: 13, x: 140, y: 150 },
      { id: 14, x: 160, y: 110 },
      { id: 15, x: 200, y: 95 },
      { id: 16, x: 240, y: 110 },
      { id: 17, x: 260, y: 150 },
      { id: 18, x: 240, y: 190 },
      { id: 19, x: 200, y: 205 },
      { id: 20, x: 160, y: 190 }
    ],
    svgPath: "M 30 150 Q 200 20 370 150 Q 200 280 30 150 Z M 140 150 A 60 55 0 1 0 260 150 A 60 55 0 1 0 140 150 Z"
  },
  2: {
    title: "La Pista Cifrata: La Montatura di Prova ed i Prismi",
    subtitle: "Unisci i punti in ordine numerico (da 1 a 20). Clicca sul punto N. 1 per iniziare!",
    dots: [
      { id: 1, x: 40, y: 100 },
      { id: 2, x: 170, y: 100 },
      { id: 3, x: 170, y: 200 },
      { id: 4, x: 40, y: 200 },
      { id: 5, x: 40, y: 150 },
      { id: 6, x: 70, y: 150 },
      { id: 7, x: 140, y: 150 },
      { id: 8, x: 170, y: 150 },
      { id: 9, x: 190, y: 140 },
      { id: 10, x: 210, y: 130 },
      { id: 11, x: 230, y: 140 },
      { id: 12, x: 250, y: 100 },
      { id: 13, x: 380, y: 100 },
      { id: 14, x: 380, y: 200 },
      { id: 15, x: 250, y: 200 },
      { id: 16, x: 250, y: 150 },
      { id: 17, x: 280, y: 150 },
      { id: 18, x: 350, y: 150 },
      { id: 19, x: 380, y: 150 },
      { id: 20, x: 400, y: 140 }
    ],
    svgPath: "M 40 100 L 170 100 L 170 200 L 40 200 Z M 250 100 L 380 100 L 380 200 L 250 200 Z M 170 140 L 250 140"
  },
  3: {
    title: "La Pista Cifrata: Il Sinottoforo",
    subtitle: "Unisci i punti in ordine numerico (da 1 a 20). Clicca sul punto N. 1 per iniziare!",
    dots: [
      { id: 1, x: 60, y: 260 },
      { id: 2, x: 360, y: 260 },
      { id: 3, x: 340, y: 210 },
      { id: 4, x: 210, y: 210 },
      { id: 5, x: 80, y: 210 },
      { id: 6, x: 60, y: 260 },
      { id: 7, x: 90, y: 160 },
      { id: 8, x: 70, y: 90 },
      { id: 9, x: 120, y: 70 },
      { id: 10, x: 140, y: 130 },
      { id: 11, x: 180, y: 130 },
      { id: 12, x: 195, y: 170 },
      { id: 13, x: 225, y: 170 },
      { id: 14, x: 240, y: 130 },
      { id: 15, x: 280, y: 130 },
      { id: 16, x: 300, y: 70 },
      { id: 17, x: 350, y: 90 },
      { id: 18, x: 330, y: 160 },
      { id: 19, x: 210, y: 160 },
      { id: 20, x: 210, y: 260 }
    ],
    svgPath: "M 60 260 L 360 260 L 340 210 L 80 210 Z M 90 160 L 70 90 L 120 70 L 140 130 M 330 160 L 350 90 L 300 70 L 280 130"
  },
  4: {
    title: "La Pista Cifrata: Il Forottero e l'Ottotipo",
    subtitle: "Unisci i punti in ordine numerico (da 1 a 20). Clicca sul punto N. 1 per iniziare!",
    dots: [
      { id: 1, x: 100, y: 30 },
      { id: 2, x: 320, y: 30 },
      { id: 3, x: 320, y: 150 },
      { id: 4, x: 250, y: 150 },
      { id: 5, x: 250, y: 100 },
      { id: 6, x: 170, y: 100 },
      { id: 7, x: 170, y: 150 },
      { id: 8, x: 100, y: 150 },
      { id: 9, x: 100, y: 90 },
      { id: 10, x: 100, y: 30 },
      { id: 11, x: 160, y: 180 },
      { id: 12, x: 260, y: 180 },
      { id: 13, x: 260, y: 270 },
      { id: 14, x: 160, y: 270 },
      { id: 15, x: 160, y: 210 },
      { id: 16, x: 200, y: 210 },
      { id: 17, x: 200, y: 240 },
      { id: 18, x: 220, y: 240 },
      { id: 19, x: 220, y: 210 },
      { id: 20, x: 260, y: 210 }
    ],
    svgPath: "M 100 30 L 320 30 L 320 150 L 100 150 Z M 160 180 L 260 180 L 260 270 L 160 270 Z"
  }
};

export const TargetGame: React.FC<TargetGameProps> = ({ issueId, onComplete, isCompleted }) => {
  const currentIssue = PISTA_DATA[issueId] || PISTA_DATA[1];
  const totalDots = currentIssue.dots.length;

  const [connectedDotIds, setConnectedDotIds] = useState<number[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setConnectedDotIds([]);
    setErrorMsg(null);
  }, [issueId]);

  const expectedNextId = connectedDotIds.length + 1;
  const isAllConnected = connectedDotIds.length === totalDots || isCompleted;

  const handleDotClick = (e: React.MouseEvent, dotId: number) => {
    e.stopPropagation();
    if (isCompleted || isAllConnected) return;

    if (dotId === expectedNextId) {
      const newConnected = [...connectedDotIds, dotId];
      setConnectedDotIds(newConnected);
      setErrorMsg(null);

      if (dotId === totalDots) {
        onComplete();
      }
    } else {
      if (connectedDotIds.includes(dotId)) {
        if (dotId === connectedDotIds[connectedDotIds.length - 1] && dotId > 1) {
          setConnectedDotIds(prev => prev.slice(0, -1));
          setErrorMsg(null);
        }
      } else {
        setErrorMsg(`Punto errato! Devi unire i punti in ordine numerico (da 1 a ${totalDots}). Prossimo punto da cliccare: N. ${expectedNextId}`);
        setTimeout(() => setErrorMsg(null), 3500);
      }
    }
  };

  const handleAutoConnect = () => {
    const allIds = currentIssue.dots.map(d => d.id);
    setConnectedDotIds(allIds);
    onComplete();
  };

  const handleReset = () => {
    setConnectedDotIds([]);
    setErrorMsg(null);
  };

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

      {!isCompleted && !isAllConnected && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#eff6ff',
          border: '1.5px solid #bfdbfe',
          color: 'var(--se-blue)',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '13px',
          fontFamily: 'var(--font-typewriter)'
        }}>
          <Sparkles size={16} />
          <span>Prossimo punto da unire: <strong>Punto N. {expectedNextId}</strong></span>
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
          
          {/* Revealed figure path when finished */}
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

          {/* Render individual dots */}
          {currentIssue.dots.map((dot) => {
            const isConnected = connectedDotIds.includes(dot.id);
            const isNext = !isAllConnected && dot.id === expectedNextId;

            return (
              <g
                key={dot.id}
                onClick={(e) => handleDotClick(e, dot.id)}
                style={{ cursor: isAllConnected ? 'default' : 'pointer' }}
              >
                {/* Invisible large hit area to prevent click misses */}
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r="16"
                  fill="transparent"
                />

                {/* Animated glow ring for expected next dot */}
                {isNext && (
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r="12"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                    style={{ animation: 'goldPulse 1.2s infinite' }}
                  />
                )}

                {/* Main Dot Circle */}
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={isNext ? 7 : isConnected ? 6 : 5}
                  fill={isConnected ? "var(--se-red)" : isNext ? "#f59e0b" : "white"}
                  stroke={isConnected ? "var(--se-red)" : "var(--border-color)"}
                  strokeWidth="2"
                  style={{ transition: 'all 0.15s ease' }}
                />

                {/* Dot Number Label */}
                <text
                  x={dot.x + 9}
                  y={dot.y - 6}
                  fill={isConnected ? "var(--se-red)" : isNext ? "#b45309" : "black"}
                  fontSize="12"
                  fontFamily="var(--font-mono)"
                  fontWeight={isNext || isConnected ? "bold" : "normal"}
                  pointerEvents="none"
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
