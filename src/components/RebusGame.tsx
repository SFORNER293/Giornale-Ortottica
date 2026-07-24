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

  // Render true visual enigmistica rebus drawings for all 4 issues
  const renderRebusSvg = (item: RebusItem) => {
    if (issueId === 1) {
      if (item.id === 'a') { // L'OCCHIO PIGRO
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <line x1="250" y1="10" x2="250" y2="150" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
            <g transform="translate(10, 0)">
              <text x="50" y="85" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">L'</text>
              {/* Occhio */}
              <g transform="translate(90, 35)">
                <path d="M 10 45 Q 60 10 110 45 Q 60 80 10 45 Z" fill="white" stroke="#374151" strokeWidth="2.5" />
                <circle cx="60" cy="45" r="18" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
                <circle cx="60" cy="45" r="7" fill="black" />
              </g>
            </g>
            <g transform="translate(240, 0)">
              <text x="30" y="85" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">P I</text>
              {/* Gru */}
              <g transform="translate(90, 20)">
                <rect x="50" y="100" width="30" height="6" fill="#4b5563" />
                <line x1="65" y1="100" x2="65" y2="30" stroke="#4b5563" strokeWidth="3" />
                <line x1="20" y1="30" x2="110" y2="30" stroke="#374151" strokeWidth="3" />
                <text x="65" y="18" fill="var(--se-red)" fontSize="16" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">U = O</text>
              </g>
            </g>
          </svg>
        );
      }
      if (item.id === 'b') { // MIRA LA RETINA
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <line x1="220" y1="10" x2="220" y2="150" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Bersaglio (Mira) */}
            <g transform="translate(20, 20)">
              <circle cx="80" cy="60" r="38" fill="none" stroke="#374151" strokeWidth="2" />
              <circle cx="80" cy="60" r="24" fill="none" stroke="#374151" strokeWidth="1.5" />
              <circle cx="80" cy="60" r="10" fill="#ef4444" />
              <line x1="80" y1="15" x2="80" y2="105" stroke="#374151" strokeWidth="1.5" />
              <line x1="35" y1="60" x2="125" y2="60" stroke="#374151" strokeWidth="1.5" />
            </g>
            {/* Rete tennis (E=I) */}
            <g transform="translate(240, 20)">
              <text x="20" y="70" fill="var(--se-red)" fontSize="28" fontFamily="var(--font-serif)" fontWeight="bold">L A</text>
              {/* Net */}
              <rect x="75" y="40" width="110" height="50" fill="none" stroke="#374151" strokeWidth="2" />
              <path d="M 75 40 L 125 90 M 100 40 L 150 90 M 125 40 L 175 90 M 185 40 L 135 90 M 160 40 L 110 90 M 135 40 L 85 90" stroke="#9ca3af" strokeWidth="1" />
              <text x="130" y="30" fill="var(--se-red)" fontSize="16" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">E = I</text>
              <text x="205" y="70" fill="var(--se-red)" fontSize="28" fontFamily="var(--font-serif)" fontWeight="bold">N A</text>
            </g>
          </svg>
        );
      }
      // Rebus C: LA STEREOPSI
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <text x="60" y="90" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">L A</text>
          {/* Stereo Hi-Fi */}
          <g transform="translate(130, 25)">
            <rect x="20" y="20" width="200" height="85" fill="#fcfcfc" stroke="#374151" strokeWidth="3" rx="6" />
            <circle cx="60" cy="62" r="26" fill="#e5e7eb" stroke="#374151" strokeWidth="1.8" />
            <circle cx="60" cy="62" r="12" fill="#1f2937" />
            <circle cx="180" cy="62" r="26" fill="#e5e7eb" stroke="#374151" strokeWidth="1.8" />
            <circle cx="180" cy="62" r="12" fill="#1f2937" />
            <rect x="105" y="35" width="30" height="15" fill="#d1d5db" rx="1.5" />
          </g>
          <text x="380" y="90" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">P S I</text>
        </svg>
      );
    }

    if (issueId === 2) {
      if (item.id === 'a') { // COVER TEST
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <text x="40" y="90" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">C</text>
            {/* Uovo (OVO V=V) */}
            <g transform="translate(85, 30)">
              <ellipse cx="40" cy="50" rx="30" ry="40" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
              <text x="40" y="10" fill="var(--se-red)" fontSize="15" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">V = V</text>
            </g>
            <text x="175" y="90" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">E R</text>
            {/* Testa (TESTA A=T) */}
            <g transform="translate(250, 30)">
              <circle cx="45" cy="40" r="30" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" />
              <path d="M 30 55 Q 45 65 60 55" stroke="#334155" strokeWidth="2" fill="none" />
              <circle cx="35" cy="35" r="4" fill="#334155" />
              <circle cx="55" cy="35" r="4" fill="#334155" />
              <text x="45" y="5" fill="var(--se-red)" fontSize="15" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">A = T</text>
            </g>
          </svg>
        );
      }
      if (item.id === 'b') { // ESOTROPIA
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <text x="50" y="90" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">E</text>
            {/* Sole (SOLE LE=O) */}
            <g transform="translate(90, 30)">
              <circle cx="40" cy="50" r="28" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
              <line x1="40" y1="10" x2="40" y2="2" stroke="#ca8a04" strokeWidth="2.5" />
              <line x1="40" y1="90" x2="40" y2="98" stroke="#ca8a04" strokeWidth="2.5" />
              <line x1="0" y1="50" x2="-8" y2="50" stroke="#ca8a04" strokeWidth="2.5" />
              <line x1="80" y1="50" x2="88" y2="50" stroke="#ca8a04" strokeWidth="2.5" />
              <text x="40" y="5" fill="var(--se-red)" fontSize="15" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">LE = O</text>
            </g>
            <text x="200" y="90" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">T R</text>
            {/* Tabellone OPIA */}
            <g transform="translate(280, 25)">
              <rect x="20" y="20" width="80" height="70" fill="white" stroke="#334155" strokeWidth="2" />
              <text x="60" y="55" fill="black" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle">OPIA</text>
            </g>
          </svg>
        );
      }
      // ANGOLO KAPPA
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Drawing of an Angle */}
          <g transform="translate(60, 30)">
            <path d="M 10 80 L 100 80 L 70 10" stroke="#334155" strokeWidth="3.5" fill="none" />
            <path d="M 40 80 A 30 30 0 0 0 32 58" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
          </g>
          <text x="220" y="90" fill="var(--se-red)" fontSize="34" fontFamily="var(--font-serif)" fontWeight="bold">K A P P A</text>
        </svg>
      );
    }

    if (issueId === 3) {
      if (item.id === 'a') { // SINOTTOFORO
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <text x="40" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">S I</text>
            {/* Numero 9 (NOVE V=TT) */}
            <g transform="translate(100, 30)">
              <text x="35" y="70" fill="#1e293b" fontSize="55" fontFamily="var(--font-serif)" fontWeight="bold">9</text>
              <text x="35" y="5" fill="var(--se-red)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">V = TT</text>
            </g>
            <text x="180" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">O</text>
            {/* Disegno Foro / Galleria */}
            <g transform="translate(240, 35)">
              <ellipse cx="60" cy="50" rx="45" ry="35" fill="#334155" stroke="#1e293b" strokeWidth="2" />
              <ellipse cx="60" cy="50" rx="25" ry="18" fill="#0f172a" />
            </g>
          </svg>
        );
      }
      if (item.id === 'b') { // FUSIONE
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <text x="50" y="90" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">F</text>
            {/* Fuso (FUSO O=I) */}
            <g transform="translate(90, 30)">
              <ellipse cx="40" cy="50" rx="14" ry="40" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" />
              <line x1="40" y1="0" x2="40" y2="100" stroke="#334155" strokeWidth="2" />
              <text x="40" y="5" fill="var(--se-red)" fontSize="15" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">O = I</text>
            </g>
            <text x="180" y="90" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">O N E</text>
          </svg>
        );
      }
      // RETINA ANOMALA
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Rete (RETE E=I) */}
          <g transform="translate(30, 30)">
            <rect x="20" y="20" width="80" height="50" fill="none" stroke="#374151" strokeWidth="2" />
            <path d="M 20 20 L 60 70 M 50 20 L 90 70 M 80 20 L 40 70" stroke="#9ca3af" strokeWidth="1" />
            <text x="60" y="10" fill="var(--se-red)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">E = I</text>
          </g>
          <text x="145" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">N A</text>
          {/* Anatra (ANATRA TRA=MALA) */}
          <g transform="translate(230, 30)">
            <ellipse cx="45" cy="60" rx="30" ry="20" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
            <circle cx="65" cy="40" r="14" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
            <path d="M 77 40 L 90 43 L 77 48 Z" fill="#f97316" />
            <text x="50" y="10" fill="var(--se-red)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">TRA = MALA</text>
          </g>
        </svg>
      );
    }

    // Issue 4
    if (item.id === 'a') { // CRISTALLINO
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <text x="40" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">C</text>
          {/* Cresta (E=I) */}
          <g transform="translate(75, 30)">
            <path d="M 20 60 Q 30 20 40 40 Q 50 10 60 40 Q 70 20 80 60 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            <text x="50" y="5" fill="var(--se-red)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">E = I</text>
          </g>
          <text x="175" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">S T</text>
          {/* Gallo (O=I) */}
          <g transform="translate(240, 25)">
            <ellipse cx="40" cy="55" rx="25" ry="20" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <circle cx="58" cy="35" r="12" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <path d="M 68 35 L 78 38 L 68 42 Z" fill="#f97316" />
            <text x="40" y="5" fill="var(--se-red)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">O = I</text>
          </g>
          <text x="340" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">N O</text>
        </svg>
      );
    }
    if (item.id === 'b') { // CAMPO VISIVO
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Campo Verde */}
          <g transform="translate(40, 30)">
            <rect x="20" y="20" width="100" height="60" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" rx="4" />
            <line x1="20" y1="80" x2="120" y2="80" stroke="#15803d" strokeWidth="3" />
          </g>
          <text x="175" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">V I</text>
          {/* Viso (SO=VO) */}
          <g transform="translate(250, 30)">
            <circle cx="45" cy="45" r="30" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
            <circle cx="35" cy="40" r="4" fill="#431407" />
            <circle cx="55" cy="40" r="4" fill="#431407" />
            <path d="M 35 60 Q 45 68 55 60" stroke="#431407" strokeWidth="2" fill="none" />
            <text x="45" y="5" fill="var(--se-red)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">SO = VO</text>
          </g>
        </svg>
      );
    }
    // RIFRAZIONE
    return (
      <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <text x="50" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">R I</text>
        {/* Raggio luminoso */}
        <g transform="translate(110, 30)">
          <path d="M 10 20 L 60 50 L 110 80" stroke="#ef4444" strokeWidth="4" fill="none" />
          <polygon points="100,70 115,82 95,85" fill="#ef4444" />
        </g>
        <text x="240" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">A Z I O N E</text>
      </svg>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <h2 className="game-title">Trittico di Rebus</h2>
      <p className="game-subtitle">
        Tre rebus d'autore illustrati! Decifra le immagini, le chiavi ed i valori di sostituzione per trovare la soluzione ortottica.
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
