import React, { useState } from 'react';
import { CheckCircle, RotateCcw, AlertCircle } from 'lucide-react';

interface TargetGameProps {
  onComplete: () => void;
  isCompleted: boolean;
}

const CORRECT_CHAIN = [
  "AIorao",
  "Sito",
  "Web",
  "Rete",
  "Retina",
  "Fovea",
  "Foveazione",
  "Saccade",
  "Movimento",
  "Esercizio",
  "Allenamento",
  "Ortottica",
  "Visione"
];

const DISTRACTORS = [
  "Prisma",
  "Occhiali",
  "Miopia",
  "Lente",
  "Ottotipo",
  "Cervello"
];

// Combine and shuffle words, but keep AIorao and Visione labeled
const ALL_WORDS = Array.from(new Set([...CORRECT_CHAIN, ...DISTRACTORS])).sort(() => Math.random() - 0.5);

export const TargetGame: React.FC<TargetGameProps> = ({ onComplete, isCompleted }) => {
  const [selectedPath, setSelectedPath] = useState<string[]>(["AIorao"]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleWordClick = (word: string) => {
    if (isCompleted) return;
    
    // If it's already selected, do nothing
    if (selectedPath.includes(word)) {
      // Allow deselecting the LAST word if they want to undo
      if (word !== "AIorao" && selectedPath[selectedPath.length - 1] === word) {
        setSelectedPath(prev => prev.slice(0, -1));
        setErrorMsg(null);
      }
      return;
    }

    const nextExpectedIndex = selectedPath.length;
    const expectedWord = CORRECT_CHAIN[nextExpectedIndex];

    if (word === expectedWord) {
      const newPath = [...selectedPath, word];
      setSelectedPath(newPath);
      setErrorMsg(null);

      // Check if game is completed
      if (word === "Visione" && newPath.length === CORRECT_CHAIN.length) {
        onComplete();
      }
    } else {
      setErrorMsg(`"${word}" non è il collegamento corretto. Cerca una parola correlata a "${selectedPath[selectedPath.length - 1]}"!`);
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  const handleReset = () => {
    setSelectedPath(["AIorao"]);
    setErrorMsg(null);
  };

  return (
    <div className="target-container">
      <h2 className="game-title">Il Bersaglio</h2>
      <p className="game-subtitle">
        Parti dal centro <strong>AIorao</strong> e raggiungi il bersaglio <strong>Visione</strong>. 
        Clicca sulle parole in ordine logico creando una catena di associazioni ortottiche e visive!
      </p>

      {errorMsg && (
        <div className="feedback-modal" style={{ backgroundColor: '#fee2e2', borderColor: '#fca5a5', color: '#991b1b' }}>
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {isCompleted && (
        <div className="feedback-modal">
          <CheckCircle size={18} />
          <span>Bersaglio colpito! Ottimo lavoro!</span>
        </div>
      )}

      {/* Interactive Path Visualization */}
      <div className="target-path-visual">
        {selectedPath.map((word, index) => (
          <React.Fragment key={word}>
            <span className={`path-step ${word === "AIorao" ? 'start' : word === "Visione" ? 'end' : ''}`}>
              {word}
            </span>
            {index < selectedPath.length - 1 && <span className="path-arrow">→</span>}
          </React.Fragment>
        ))}
        {!isCompleted && <span className="path-arrow" style={{ animation: 'pulse 1s infinite' }}>... ?</span>}
      </div>

      {/* Grid of Choices */}
      <div className="target-grid" style={{ marginTop: '20px' }}>
        {ALL_WORDS.map((word) => {
          const isSelected = selectedPath.includes(word);
          
          let className = "target-node";
          if (isSelected) className += " selected";
          if (word === "AIorao") className += " start";
          if (word === "Visione") className += " end";

          return (
            <button
              key={word}
              onClick={() => handleWordClick(word)}
              disabled={isCompleted && !isSelected}
              className={className}
              style={{
                opacity: isCompleted && !isSelected ? 0.4 : 1,
              }}
            >
              {word}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
        <button className="nav-button" onClick={handleReset}>
          <RotateCcw size={16} />
          Ricomincia
        </button>
      </div>
    </div>
  );
};
