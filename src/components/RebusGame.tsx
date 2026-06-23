import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface RebusGameProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const RebusGame: React.FC<RebusGameProps> = ({ onComplete, isCompleted }) => {
  const [answers, setAnswers] = useState({ a: "", b: "", c: "" });
  const [solved, setSolved] = useState({ a: false, b: false, c: false });
  const [errors, setErrors] = useState<{ a: string | null; b: string | null; c: string | null }>({
    a: null,
    b: null,
    c: null,
  });

  // Automatically report completion when all three are solved
  useEffect(() => {
    if (solved.a && solved.b && solved.c && !isCompleted) {
      onComplete();
    }
  }, [solved, isCompleted, onComplete]);

  const handleVerify = (rebusKey: 'a' | 'b' | 'c', expected: string, errorMsg: string) => {
    const rawVal = answers[rebusKey];
    const cleanAnswer = rawVal.replace(/[^A-Z]/gi, '').toUpperCase();
    
    if (cleanAnswer === expected) {
      setSolved(prev => ({ ...prev, [rebusKey]: true }));
      setErrors(prev => ({ ...prev, [rebusKey]: null }));
    } else {
      setErrors(prev => ({ ...prev, [rebusKey]: errorMsg }));
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
    setAnswers({
      a: "L'OCCHIO PIGRO",
      b: "MIRA LA RETINA",
      c: "LA STEREOPSI"
    });
    setSolved({ a: true, b: true, c: true });
    onComplete();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <h2 className="game-title">Trittico di Rebus</h2>
      <p className="game-subtitle">
        Tre rebus d'autore in un'unica grande pagina! Associa le lettere rosse alle parole degli oggetti raffigurati per risolvere le tre frasi ortottiche.
      </p>

      {isCompleted && (
        <div className="feedback-modal" style={{ position: 'relative', top: 0, transform: 'none', margin: '0 auto 10px auto' }}>
          <CheckCircle size={18} />
          <span>Trittico di Rebus risolto! Hai completato la pagina con successo!</span>
        </div>
      )}

      {/* REBUS A */}
      <div style={{
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
          <span>REBUS A</span>
          <span>Diagramma: 1' 6 &nbsp; 5</span>
        </div>

        {errors.a && (
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
            <span>{errors.a}</span>
          </div>
        )}

        <div className="rebus-svg-wrapper">
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <line x1="250" y1="10" x2="250" y2="150" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* L'occhio */}
            <g transform="translate(25, 0)">
              <text x="100" y="32" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">L</text>
              <path d="M 40 85 Q 100 45 160 85 Q 100 125 40 85 Z" fill="white" stroke="#374151" strokeWidth="2.5" />
              <circle cx="100" cy="85" r="24" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
              <circle cx="100" cy="85" r="10" fill="black" />
              <circle cx="95" cy="80" r="3.5" fill="white" />
            </g>
            {/* Gru */}
            <g transform="translate(230, 0)">
              <text x="50" y="85" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">P I</text>
              <text x="160" y="28" fill="var(--se-red)" fontSize="20" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">U = O</text>
              <rect x="140" y="125" width="40" height="8" fill="#4b5563" />
              <rect x="152" y="133" width="16" height="4" fill="#1f2937" />
              <line x1="155" y1="125" x2="155" y2="45" stroke="#4b5563" strokeWidth="3" />
              <line x1="165" y1="125" x2="165" y2="45" stroke="#4b5563" strokeWidth="3" />
              <line x1="155" y1="120" x2="165" y2="110" stroke="#6b7280" strokeWidth="1" />
              <line x1="155" y1="110" x2="165" y2="100" stroke="#6b7280" strokeWidth="1" />
              <line x1="155" y1="100" x2="165" y2="90" stroke="#6b7280" strokeWidth="1" />
              <line x1="155" y1="90" x2="165" y2="80" stroke="#6b7280" strokeWidth="1" />
              <line x1="155" y1="80" x2="165" y2="70" stroke="#6b7280" strokeWidth="1" />
              <line x1="155" y1="70" x2="165" y2="60" stroke="#6b7280" strokeWidth="1" />
              <line x1="155" y1="60" x2="165" y2="45" stroke="#6b7280" strokeWidth="1" />
              <line x1="90" y1="45" x2="230" y2="45" stroke="#374151" strokeWidth="3.5" />
              <rect x="95" y="45" width="20" height="12" fill="#ef4444" rx="1" />
              <polygon points="160,32 154,45 166,45" fill="#4b5563" />
              <line x1="160" y1="32" x2="95" y2="45" stroke="#4b5563" strokeWidth="1" />
              <line x1="160" y1="32" x2="230" y2="45" stroke="#4b5563" strokeWidth="1" />
              <rect x="200" y="45" width="8" height="4" fill="#1f2937" />
              <line x1="204" y1="49" x2="204" y2="75" stroke="#1f2937" strokeWidth="1" />
              <path d="M 204 75 Q 204 81, 201 81 Q 198 81, 200 77" fill="none" stroke="#1f2937" strokeWidth="1.5" />
            </g>
          </svg>
        </div>

        <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px' }}>
          <input
            type="text"
            value={answers.a}
            onChange={(e) => setAnswers(prev => ({ ...prev, a: e.target.value }))}
            placeholder={solved.a ? "Risolto!" : "Scrivi la soluzione..."}
            className="rebus-input"
            disabled={solved.a}
            style={{
              borderColor: solved.a ? 'var(--success-color)' : 'var(--border-color)',
              color: solved.a ? 'var(--success-color)' : 'black',
              fontWeight: solved.a ? 'bold' : 'normal'
            }}
          />
          {!solved.a ? (
            <button
              onClick={() => handleVerify('a', 'LOCCHIOPIGRO', "Sbagliato! Cerca i nomi dell'organo visivo e della macchina di sollevamento.")}
              className="rebus-button"
            >
              Verifica
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--success-color)', fontWeight: 'bold', fontSize: '13px' }}>
              <CheckCircle size={16} style={{ marginRight: '4px' }} /> Risolto
            </div>
          )}
          {!solved.a && (
            <button
              onClick={() => handleReveal('a', "L'OCCHIO PIGRO")}
              className="nav-button"
              style={{ padding: '6px', fontSize: '11px', borderStyle: 'dashed' }}
            >
              Aiuto
            </button>
          )}
        </div>
      </div>

      {/* REBUS B */}
      <div style={{
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
          <span>REBUS B</span>
          <span>Diagramma: 4 &nbsp; 2 &nbsp; 6</span>
        </div>

        {errors.b && (
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
            <span>{errors.b}</span>
          </div>
        )}

        <div className="rebus-svg-wrapper">
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <line x1="210" y1="10" x2="210" y2="150" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Bersaglio / Mira */}
            <g transform="translate(15, 0)">
              <circle cx="100" cy="80" r="35" fill="none" stroke="#374151" strokeWidth="2" />
              <circle cx="100" cy="80" r="22" fill="none" stroke="#374151" strokeWidth="1.5" />
              <circle cx="100" cy="80" r="9" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
              <line x1="100" y1="35" x2="100" y2="125" stroke="#374151" strokeWidth="1.5" />
              <line x1="55" y1="80" x2="145" y2="80" stroke="#374151" strokeWidth="1.5" />
            </g>
            {/* Rete */}
            <g transform="translate(200, 0)">
              {/* LA */}
              <text x="45" y="88" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">L A</text>
              
              {/* INA */}
              <text x="140" y="88" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">I N A</text>
              
              {/* Tennis Net structure */}
              <line x1="75" y1="50" x2="75" y2="120" stroke="#374151" strokeWidth="3.5" />
              <line x1="205" y1="50" x2="205" y2="120" stroke="#374151" strokeWidth="3.5" />
              <rect x="75" y="60" width="130" height="50" fill="none" stroke="#374151" strokeWidth="1.5" />
              
              {/* Net grid */}
              <path d="M 75 60 L 125 110 M 100 60 L 150 110 M 125 60 L 175 110 M 150 60 L 200 110 M 175 60 L 205 90" stroke="#9ca3af" strokeWidth="1" />
              <path d="M 205 60 L 155 110 M 180 60 L 130 110 M 155 60 L 105 110 M 130 60 L 80 110 M 105 60 L 75 90" stroke="#9ca3af" strokeWidth="1" />
            </g>
          </svg>
        </div>

        <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px' }}>
          <input
            type="text"
            value={answers.b}
            onChange={(e) => setAnswers(prev => ({ ...prev, b: e.target.value }))}
            placeholder={solved.b ? "Risolto!" : "Scrivi la soluzione..."}
            className="rebus-input"
            disabled={solved.b}
            style={{
              borderColor: solved.b ? 'var(--success-color)' : 'var(--border-color)',
              color: solved.b ? 'var(--success-color)' : 'black',
              fontWeight: solved.b ? 'bold' : 'normal'
            }}
          />
          {!solved.b ? (
            <button
              onClick={() => handleVerify('b', 'MIRALARETINA', "Sbagliato! Identifica il bersaglio rosso (mira) e la barriera (rete).")}
              className="rebus-button"
            >
              Verifica
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--success-color)', fontWeight: 'bold', fontSize: '13px' }}>
              <CheckCircle size={16} style={{ marginRight: '4px' }} /> Risolto
            </div>
          )}
          {!solved.b && (
            <button
              onClick={() => handleReveal('b', "MIRA LA RETINA")}
              className="nav-button"
              style={{ padding: '6px', fontSize: '11px', borderStyle: 'dashed' }}
            >
              Aiuto
            </button>
          )}
        </div>
      </div>

      {/* REBUS C */}
      <div style={{
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
          <span>REBUS C</span>
          <span>Diagramma: 2 &nbsp; 9</span>
        </div>

        {errors.c && (
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
            <span>{errors.c}</span>
          </div>
        )}

        <div className="rebus-svg-wrapper">
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* LA on left */}
            <text x="65" y="95" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">L A</text>
            
            {/* Vintage Stereo Radio */}
            <g transform="translate(130, 10)">
              {/* Cabinet */}
              <rect x="20" y="40" width="200" height="85" fill="#fcfcfc" stroke="#374151" strokeWidth="3" rx="6" />
              {/* Speakers */}
              <circle cx="60" cy="82" r="26" fill="#e5e7eb" stroke="#374151" strokeWidth="1.8" />
              <circle cx="60" cy="82" r="12" fill="#1f2937" />
              
              <circle cx="180" cy="82" r="26" fill="#e5e7eb" stroke="#374151" strokeWidth="1.8" />
              <circle cx="180" cy="82" r="12" fill="#1f2937" />
              
              {/* Control panel middle */}
              <rect x="105" y="55" width="30" height="15" fill="#d1d5db" rx="1.5" />
              <line x1="110" y1="62" x2="130" y2="62" stroke="#ef4444" strokeWidth="1.5" />
              <circle cx="110" cy="90" r="4.5" fill="#4b5563" />
              <circle cx="120" cy="90" r="4.5" fill="#4b5563" />
              <circle cx="130" cy="90" r="4.5" fill="#4b5563" />
              
              {/* Handle */}
              <path d="M 50 40 L 50 22 L 190 22 L 190 40" fill="none" stroke="#374151" strokeWidth="3.5" strokeLinecap="round" />
            </g>
            
            {/* PSI on right */}
            <text x="435" y="95" fill="var(--se-red)" fontSize="26" fontFamily="var(--font-serif)" fontWeight="bold" textAnchor="middle">P S I</text>
          </svg>
        </div>

        <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px' }}>
          <input
            type="text"
            value={answers.c}
            onChange={(e) => setAnswers(prev => ({ ...prev, c: e.target.value }))}
            placeholder={solved.c ? "Risolto!" : "Scrivi la soluzione..."}
            className="rebus-input"
            disabled={solved.c}
            style={{
              borderColor: solved.c ? 'var(--success-color)' : 'var(--border-color)',
              color: solved.c ? 'var(--success-color)' : 'black',
              fontWeight: solved.c ? 'bold' : 'normal'
            }}
          />
          {!solved.c ? (
            <button
              onClick={() => handleVerify('c', 'LASTEREOPSI', "Sbagliato! Quel dispositivo è una radio/riproduttore musicale (stereo).")}
              className="rebus-button"
            >
              Verifica
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--success-color)', fontWeight: 'bold', fontSize: '13px' }}>
              <CheckCircle size={16} style={{ marginRight: '4px' }} /> Risolto
            </div>
          )}
          {!solved.c && (
            <button
              onClick={() => handleReveal('c', "LA STEREOPSI")}
              className="nav-button"
              style={{ padding: '6px', fontSize: '11px', borderStyle: 'dashed' }}
            >
              Aiuto
            </button>
          )}
        </div>
      </div>

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
