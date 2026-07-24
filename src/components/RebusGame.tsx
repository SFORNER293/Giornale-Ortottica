import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { RebusData, RebusItem } from '../data/issuesData';

interface RebusGameProps {
  data: RebusData;
  issueId: number;
  onComplete: () => void;
  isCompleted: boolean;
}

export const RebusGame: React.FC<RebusGameProps> = ({ data, issueId, onComplete, isCompleted }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({ a: "", b: "", c: "" });
  const [solved, setSolved] = useState<{ [key: string]: boolean }>({ a: false, b: false, c: false });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({ a: null, b: null, c: null });

  useEffect(() => {
    setAnswers({ a: "", b: "", c: "" });
    setSolved({ a: false, b: false, c: false });
    setErrors({ a: null, b: null, c: null });
  }, [data, issueId]);

  useEffect(() => {
    if (solved.a && solved.b && solved.c && !isCompleted) {
      onComplete();
    }
  }, [solved, isCompleted, onComplete]);

  const handleVerify = (rebusKey: 'a' | 'b' | 'c', expected: string, hint: string) => {
    const rawVal = answers[rebusKey] || "";
    const cleanAnswer = rawVal.replace(/[^A-Z]/gi, '').toUpperCase();
    
    if (cleanAnswer === expected) {
      setSolved(prev => ({ ...prev, [rebusKey]: true }));
      setErrors(prev => ({ ...prev, [rebusKey]: null }));
    } else {
      setErrors(prev => ({ ...prev, [rebusKey]: `Sbagliato! ${hint}` }));
      setTimeout(() => {
        setErrors(prev => ({ ...prev, [rebusKey]: null }));
      }, 4000);
    }
  };

  const handleReveal = (rebusKey: 'a' | 'b' | 'c', solutionText: string) => {
    setAnswers(prev => ({ ...prev, [rebusKey]: solutionText }));
    setSolved(prev => ({ ...prev, [rebusKey]: true }));
    setErrors(prev => ({ ...prev, [rebusKey]: null }));
  };

  const handleRevealAll = () => {
    const newAnswers: { [key: string]: string } = {};
    data.items.forEach(item => {
      newAnswers[item.id] = item.solutionFormatted;
    });
    setAnswers(newAnswers);
    setSolved({ a: true, b: true, c: true });
    onComplete();
  };

  // Helper to render custom SVG diagrams for each issue & rebus item
  const renderRebusSvg = (item: RebusItem) => {
    if (issueId === 1) {
      if (item.id === 'a') { // L'OCCHIO PIGRO
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <line x1="250" y1="10" x2="250" y2="150" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
            <g transform="translate(25, 0)">
              <text x="100" y="32" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">L</text>
              <path d="M 40 85 Q 100 45 160 85 Q 100 125 40 85 Z" fill="white" stroke="#374151" strokeWidth="2.5" />
              <circle cx="100" cy="85" r="24" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
              <circle cx="100" cy="85" r="10" fill="black" />
            </g>
            <g transform="translate(230, 0)">
              <text x="50" y="85" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">P I</text>
              <text x="160" y="28" fill="var(--se-red)" fontSize="20" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">U = O</text>
              <rect x="140" y="125" width="40" height="8" fill="#4b5563" />
              <line x1="160" y1="125" x2="160" y2="45" stroke="#4b5563" strokeWidth="3" />
              <line x1="90" y1="45" x2="230" y2="45" stroke="#374151" strokeWidth="3.5" />
              <rect x="95" y="45" width="20" height="12" fill="#ef4444" rx="1" />
            </g>
          </svg>
        );
      }
      if (item.id === 'b') { // MIRA LA RETINA
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <line x1="210" y1="10" x2="210" y2="150" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
            <g transform="translate(15, 0)">
              <circle cx="100" cy="80" r="35" fill="none" stroke="#374151" strokeWidth="2" />
              <circle cx="100" cy="80" r="9" fill="#ef4444" />
              <line x1="100" y1="35" x2="100" y2="125" stroke="#374151" strokeWidth="1.5" />
              <line x1="55" y1="80" x2="145" y2="80" stroke="#374151" strokeWidth="1.5" />
            </g>
            <g transform="translate(200, 0)">
              <text x="45" y="88" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">L A</text>
              <text x="140" y="88" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">I N A</text>
              <rect x="75" y="60" width="130" height="50" fill="none" stroke="#374151" strokeWidth="1.5" />
            </g>
          </svg>
        );
      }
      // Rebus C: LA STEREOPSI
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <text x="65" y="95" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">L A</text>
          <g transform="translate(130, 10)">
            <rect x="20" y="40" width="200" height="85" fill="#fcfcfc" stroke="#374151" strokeWidth="3" rx="6" />
            <circle cx="60" cy="82" r="26" fill="#e5e7eb" stroke="#374151" strokeWidth="1.8" />
            <circle cx="180" cy="82" r="26" fill="#e5e7eb" stroke="#374151" strokeWidth="1.8" />
          </g>
          <text x="435" y="95" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">P S I</text>
        </svg>
      );
    }

    if (issueId === 2) {
      if (item.id === 'a') { // COVER TEST
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <text x="60" y="85" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold">C O V E R</text>
            <rect x="230" y="45" width="90" height="70" fill="white" stroke="#374151" strokeWidth="2" rx="4" />
            <text x="275" y="85" fill="black" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle">TEST</text>
          </svg>
        );
      }
      if (item.id === 'b') { // ESOTROPIA
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <text x="80" y="90" fill="var(--se-red)" fontSize="28" fontFamily="var(--font-serif)" fontWeight="bold">E S O</text>
            <path d="M 230 85 Q 290 45 350 85 Q 290 125 230 85 Z" fill="white" stroke="#374151" strokeWidth="2.5" />
            <circle cx="270" cy="85" r="14" fill="#0284c7" /> {/* Deviazione verso interno */}
            <text x="420" y="90" fill="var(--se-red)" fontSize="28" fontFamily="var(--font-serif)" fontWeight="bold">P I A</text>
          </svg>
        );
      }
      // ANGOLO KAPPA
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <text x="70" y="90" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold">A N G O L O</text>
          <text x="320" y="90" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">K A P P A</text>
        </svg>
      );
    }

    if (issueId === 3) {
      if (item.id === 'a') { // SINOTTOFORO
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <text x="50" y="90" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold">S I N O T T O</text>
            <rect x="250" y="40" width="100" height="80" fill="#e2e8f0" stroke="#334155" strokeWidth="2" rx="6" />
            <circle cx="280" cy="80" r="12" fill="#0284c7" />
            <circle cx="320" cy="80" r="12" fill="#0284c7" />
            <text x="420" y="90" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold">F O R O</text>
          </svg>
        );
      }
      if (item.id === 'b') { // FUSIONE
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <circle cx="180" cy="80" r="40" fill="#3b82f6" opacity="0.6" />
            <circle cx="240" cy="80" r="40" fill="#ef4444" opacity="0.6" />
            <text x="340" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">F U S I O N E</text>
          </svg>
        );
      }
      // RETINA ANOMALA
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <text x="60" y="90" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold">R E T I N A</text>
          <text x="260" y="90" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold">A N O M A L A</text>
        </svg>
      );
    }

    // Issue 4
    if (item.id === 'a') { // CRISTALLINO
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <ellipse cx="180" cy="80" rx="35" ry="50" fill="#93c5fd" opacity="0.8" stroke="#1d4ed8" strokeWidth="2" />
          <text x="280" y="90" fill="var(--se-red)" fontSize="28" fontFamily="var(--font-serif)" fontWeight="bold">C R I S T A L L I N O</text>
        </svg>
      );
    }
    if (item.id === 'b') { // CAMPO VISIVO
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <circle cx="120" cy="80" r="45" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
          <circle cx="120" cy="80" r="25" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" strokeDasharray="3 2" />
          <text x="240" y="90" fill="var(--se-red)" fontSize="28" fontFamily="var(--font-serif)" fontWeight="bold">C A M P O  V I S I V O</text>
        </svg>
      );
    }
    // RIFRAZIONE
    return (
      <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <path d="M 60 40 L 140 80 L 220 120" stroke="#ef4444" strokeWidth="3" fill="none" />
        <polygon points="120,40 180,120 100,120" fill="none" stroke="#374151" strokeWidth="2" />
        <text x="260" y="90" fill="var(--se-red)" fontSize="28" fontFamily="var(--font-serif)" fontWeight="bold">R I F R A Z I O N E</text>
      </svg>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <h2 className="game-title">Trittico di Rebus</h2>
      <p className="game-subtitle">
        Tre rebus d'autore in un'unica grande pagina! Associa le lettere rosse alle figure degli oggetti per scoprire la soluzione.
      </p>

      {isCompleted && (
        <div className="feedback-modal" style={{ position: 'relative', top: 0, transform: 'none', margin: '0 auto 10px auto' }}>
          <CheckCircle size={18} />
          <span>Trittico di Rebus risolto! Hai completato la pagina con successo!</span>
        </div>
      )}

      {data.items.map((item: RebusItem) => {
        const isItemSolved = solved[item.id];
        const error = errors[item.id];
        const answerVal = answers[item.id] || "";

        return (
          <div key={item.id} style={{
            border: '1.5px solid var(--border-color)',
            padding: '20px',
            borderRadius: '6px',
            backgroundColor: 'var(--paper-bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px dashed var(--border-color)',
              paddingBottom: '8px',
              fontFamily: 'var(--font-typewriter)',
              fontSize: '15px',
              fontWeight: 'bold',
              color: 'var(--se-blue)'
            }}>
              <span>{item.title}</span>
              <span>Diagramma: {item.diagram}</span>
            </div>

            {error && (
              <div style={{
                backgroundColor: '#fee2e2',
                border: '1px solid #fca5a5',
                color: '#991b1b',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '13px',
                fontFamily: 'var(--font-typewriter)',
                width: '100%',
                textAlign: 'center'
              }}>
                <AlertCircle size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                <span>{error}</span>
              </div>
            )}

            <div className="rebus-svg-wrapper">
              {renderRebusSvg(item)}
            </div>

            <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px' }}>
              <input
                type="text"
                value={answerVal}
                onChange={(e) => setAnswers(prev => ({ ...prev, [item.id]: e.target.value }))}
                placeholder={isItemSolved ? "Risolto!" : "Scrivi la soluzione..."}
                className="rebus-input"
                disabled={isItemSolved}
                style={{
                  borderColor: isItemSolved ? 'var(--success-color)' : 'var(--border-color)',
                  color: isItemSolved ? 'var(--success-color)' : 'black',
                  fontWeight: isItemSolved ? 'bold' : 'normal'
                }}
              />
              {!isItemSolved ? (
                <button
                  onClick={() => handleVerify(item.id, item.expected, item.hint)}
                  className="rebus-button"
                >
                  Verifica
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--success-color)', fontWeight: 'bold', fontSize: '13px' }}>
                  <CheckCircle size={16} style={{ marginRight: '4px' }} /> Risolto
                </div>
              )}
              {!isItemSolved && (
                <button
                  onClick={() => handleReveal(item.id, item.solutionFormatted)}
                  className="nav-button"
                  style={{ padding: '6px', fontSize: '11px', borderStyle: 'dashed' }}
                >
                  Aiuto
                </button>
              )}
            </div>
          </div>
        );
      })}

      {!isCompleted && (
        <button
          className="nav-button"
          onClick={handleRevealAll}
          style={{ width: '100%', justifyContent: 'center', borderStyle: 'dashed', marginTop: '10px' }}
        >
          Rivela Soluzione Completa del Trittico
        </button>
      )}
    </div>
  );
};
