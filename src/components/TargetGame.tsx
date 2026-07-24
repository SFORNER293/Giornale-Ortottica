import React, { useState, useEffect } from 'react';
import { CheckCircle, RotateCcw, AlertCircle, Compass } from 'lucide-react';
import type { TargetData, TargetNode } from '../data/issuesData';

interface TargetGameProps {
  data: TargetData;
  onComplete: () => void;
  isCompleted: boolean;
}

export const TargetGame: React.FC<TargetGameProps> = ({ data, onComplete, isCompleted }) => {
  const [selectedPath, setSelectedPath] = useState<string[]>([data.startWord]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setSelectedPath([data.startWord]);
    setErrorMsg(null);
  }, [data]);

  const getWordCoords = (word: string) => {
    const node = data.nodes.find(n => n.word === word);
    if (!node) return { x: 250, y: 250 };
    const rad = (node.angle * Math.PI) / 180;
    return {
      x: 250 + node.r * Math.cos(rad),
      y: 250 + node.r * Math.sin(rad)
    };
  };

  const nextExpectedIndex = selectedPath.length;
  const nextExpectedWord = !isCompleted && nextExpectedIndex < data.correctChain.length ? data.correctChain[nextExpectedIndex] : null;
  const lastWord = selectedPath[selectedPath.length - 1];

  const handleWordClick = (word: string) => {
    if (isCompleted) return;
    
    if (selectedPath.includes(word)) {
      if (word !== data.startWord && lastWord === word) {
        setSelectedPath(prev => prev.slice(0, -1));
        setErrorMsg(null);
      }
      return;
    }

    if (word === nextExpectedWord) {
      const newPath = [...selectedPath, word];
      setSelectedPath(newPath);
      setErrorMsg(null);

      if (word === data.endWord && newPath.length === data.correctChain.length) {
        onComplete();
      }
    } else {
      setErrorMsg(`"${word}" non è il passaggio immediato per collegare "${lastWord}". Prova a selezionare la parola evidenziata o un concetto clinico più diretto!`);
      setTimeout(() => setErrorMsg(null), 4000);
    }
  };

  const handleReset = () => {
    setSelectedPath([data.startWord]);
    setErrorMsg(null);
  };

  const getLastTransitionText = () => {
    if (selectedPath.length < 2) return null;
    const prev = selectedPath[selectedPath.length - 2];
    const curr = selectedPath[selectedPath.length - 1];
    return data.transitions[`${prev}-${curr}`] || "Associazione clinica";
  };

  const lastTransition = getLastTransitionText();

  return (
    <div className="target-container">
      <h2 className="game-title">Il Bersaglio</h2>
      <p className="game-subtitle">
        {data.subtitle}
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
          <span>Bersaglio colpito al centro! Ottimo lavoro!</span>
        </div>
      )}

      {/* Target board visual using SVG */}
      <div style={{
        width: '100%',
        maxWidth: '460px',
        margin: '0 auto',
        position: 'relative',
        backgroundColor: 'white',
        border: '2px solid var(--border-color)',
        borderRadius: '6px',
        padding: '10px',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
      }}>
        <svg viewBox="0 0 500 500" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Concentric rings */}
          <circle cx="250" cy="250" r="230" fill="#faf9f5" stroke="var(--border-color)" strokeWidth="2" />
          <circle cx="250" cy="250" r="180" fill="#f0eee2" stroke="var(--border-color)" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="135" fill="#faf9f5" stroke="var(--border-color)" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="90" fill="#f0eee2" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx="250" cy="250" r="45" fill="var(--se-red)" stroke="var(--border-color)" strokeWidth="2.2" />

          {/* Connection lines between selected words */}
          {selectedPath.map((word, index) => {
            if (index === 0) return null;
            const prevWord = selectedPath[index - 1];
            const currCoord = getWordCoords(word);
            const prevCoord = getWordCoords(prevWord);
            return (
              <line
                key={`line-${index}`}
                x1={prevCoord.x}
                y1={prevCoord.y}
                x2={currCoord.x}
                y2={currCoord.y}
                stroke="var(--se-blue)"
                strokeWidth="3.5"
                strokeDasharray="5 3"
                opacity="0.85"
              />
            );
          })}

          {/* Render target badges */}
          {data.nodes.map((node: TargetNode) => {
            const isSelected = selectedPath.includes(node.word);
            const isNextCandidate = !isCompleted && node.word === nextExpectedWord;
            const { x, y } = getWordCoords(node.word);
            const isStart = node.word === data.startWord;
            const isEnd = node.word === data.endWord;
            
            const width = isEnd ? 65 : node.word.length * 8 + 16;
            const height = 24;

            if (isEnd) {
              return (
                <g 
                  key={node.word} 
                  onClick={() => handleWordClick(node.word)}
                  style={{ cursor: isCompleted ? 'default' : 'pointer' }}
                >
                  <circle 
                    cx={x} 
                    cy={y} 
                    r="34" 
                    fill={isSelected ? "var(--se-blue)" : isNextCandidate ? "#ca8a04" : "var(--se-red)"} 
                    stroke={isNextCandidate ? "#fef08a" : "white"} 
                    strokeWidth={isNextCandidate ? "3" : "1.5"}
                    style={{ transition: 'fill 0.2s ease' }}
                  />
                  <text
                    x={x}
                    y={y + 4}
                    fill="white"
                    fontSize="10"
                    fontFamily="var(--font-mono)"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {node.word}
                  </text>
                </g>
              );
            }

            return (
              <g
                key={node.word}
                onClick={() => handleWordClick(node.word)}
                style={{ cursor: (isCompleted && !isSelected) ? 'default' : 'pointer' }}
                opacity={isCompleted && !isSelected ? 0.35 : 1}
              >
                <rect
                  x={x - width / 2}
                  y={y - height / 2}
                  width={width}
                  height={height}
                  rx="12"
                  fill={isSelected ? "var(--se-blue)" : isNextCandidate ? "#fef9c3" : "white"}
                  stroke={isNextCandidate ? "#d97706" : isStart ? "var(--se-red)" : "var(--border-color)"}
                  strokeWidth={isNextCandidate ? "2.5" : isStart ? "2" : "1.5"}
                  style={{ transition: 'all 0.2s ease' }}
                  filter={isNextCandidate ? "drop-shadow(0px 0px 4px rgba(217, 119, 6, 0.4))" : "drop-shadow(0px 1px 2px rgba(0,0,0,0.1))"}
                />
                
                <text
                  x={x}
                  y={y + 4}
                  fill={isSelected ? "white" : isNextCandidate ? "#b45309" : "black"}
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fontWeight={isNextCandidate || isSelected ? "bold" : "normal"}
                  textAnchor="middle"
                >
                  {node.word}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {nextExpectedWord && !isCompleted && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#fefce8',
          border: '1px solid #fef08a',
          color: '#854d0e',
          padding: '6px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          fontFamily: 'var(--font-typewriter)'
        }}>
          <Compass size={14} />
          <span><strong>Guida Clinica:</strong> Trova il nodo evidenziato in dorato (<strong>{nextExpectedWord}</strong>) per proseguire!</span>
        </div>
      )}

      {lastTransition && (
        <div style={{
          backgroundColor: 'rgba(11, 69, 126, 0.05)',
          border: '1px solid var(--se-blue)',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          fontFamily: 'var(--font-typewriter)',
          color: 'var(--se-blue)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '460px',
          marginTop: '6px'
        }}>
          <strong>Ultimo step effettuato:</strong> {selectedPath[selectedPath.length - 2]} → {selectedPath[selectedPath.length - 1]} 
          <br />
          <span style={{ fontSize: '11px', opacity: 0.85 }}>{lastTransition}</span>
        </div>
      )}

      <div className="target-path-visual" style={{ width: '100%', maxWidth: '460px', marginTop: '10px' }}>
        {selectedPath.map((word, index) => (
          <React.Fragment key={word}>
            <span className={`path-step ${word === data.startWord ? 'start' : word === data.endWord ? 'end' : ''}`} style={{ fontSize: '11px', padding: '3px 6px' }}>
              {word}
            </span>
            {index < selectedPath.length - 1 && <span className="path-arrow">→</span>}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button className="nav-button" onClick={handleReset}>
          <RotateCcw size={16} />
          Ricomincia
        </button>
      </div>
    </div>
  );
};
