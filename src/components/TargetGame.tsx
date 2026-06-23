import React, { useState } from 'react';
import { CheckCircle, RotateCcw, AlertCircle } from 'lucide-react';

interface TargetGameProps {
  onComplete: () => void;
  isCompleted: boolean;
}

interface WordNode {
  word: string;
  r: number;      // Radius from center
  angle: number;  // Angle in degrees
}

const CORRECT_CHAIN = [
  "AIorao",
  "Sito",
  "Dito",
  "Doti",
  "Dati",
  "Dita",
  "Vita",
  "Vista",
  "Visto",
  "Viso",
  "Occhio",
  "Ortottica",
  "Visione"
];

// Transitions metadata mapping the wordplay rules between words
const TRANSITIONS: { [key: string]: string } = {
  "AIorao-Sito": "Associazione (AIorao è un sito web)",
  "Sito-Dito": "Cambio di una lettera (S → D)",
  "Dito-Doti": "Anagramma (D-I-T-O → D-O-T-I)",
  "Doti-Dati": "Cambio di una lettera (O → A)",
  "Dati-Dita": "Anagramma (D-A-T-I → D-I-T-A)",
  "Dita-Vita": "Cambio di una lettera (D → V)",
  "Vita-Vista": "Aggiunta di una lettera (V-I-T-A + S = V-I-S-T-A)",
  "Vista-Visto": "Cambio di una lettera (A → O)",
  "Visto-Viso": "Sottrazione di una lettera (V-I-S-T-O meno T)",
  "Viso-Occhio": "Associazione (l'organo visivo si trova nel viso)",
  "Occhio-Ortottica": "Associazione (la scienza che si occupa di riabilitare l'occhio)",
  "Ortottica-Visione": "Associazione (la finalità clinica dell'ortottica è la corretta visione binoculare)"
};

const NODES: WordNode[] = [
  // Ring 4 - Outermost (r = 200)
  { word: "AIorao", r: 200, angle: 0 },
  { word: "Sito", r: 200, angle: 72 },
  { word: "Dito", r: 200, angle: 144 },
  { word: "Miopia", r: 200, angle: 216 },
  { word: "Lente", r: 200, angle: 288 },
  
  // Ring 3 (r = 155)
  { word: "Doti", r: 155, angle: 36 },
  { word: "Dati", r: 155, angle: 108 },
  { word: "Dita", r: 155, angle: 180 },
  { word: "Prisma", r: 155, angle: 252 },
  { word: "Cervello", r: 155, angle: 324 },
  
  // Ring 2 (r = 115)
  { word: "Vita", r: 115, angle: 0 },
  { word: "Vista", r: 115, angle: 90 },
  { word: "Visto", r: 115, angle: 180 },
  { word: "Ottotipo", r: 115, angle: 270 },
  
  // Ring 1 (r = 75)
  { word: "Viso", r: 75, angle: 45 },
  { word: "Occhio", r: 75, angle: 135 },
  { word: "Ortottica", r: 75, angle: 225 },
  { word: "Saccade", r: 75, angle: 315 },
  
  // Center Bullseye (r = 0)
  { word: "Visione", r: 0, angle: 0 }
];

export const TargetGame: React.FC<TargetGameProps> = ({ onComplete, isCompleted }) => {
  const [selectedPath, setSelectedPath] = useState<string[]>(["AIorao"]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Helper to calculate X and Y coordinates based on radius and angle
  const getWordCoords = (word: string) => {
    const node = NODES.find(n => n.word === word);
    if (!node) return { x: 250, y: 250 };
    const rad = (node.angle * Math.PI) / 180;
    return {
      x: 250 + node.r * Math.cos(rad),
      y: 250 + node.r * Math.sin(rad)
    };
  };

  const handleWordClick = (word: string) => {
    if (isCompleted) return;
    
    // If word is already in the selected path
    if (selectedPath.includes(word)) {
      // Allow undoing the last step (except the start AIorao)
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

      // Check for completion
      if (word === "Visione" && newPath.length === CORRECT_CHAIN.length) {
        onComplete();
      }
    } else {
      const lastWord = selectedPath[selectedPath.length - 1];
      setErrorMsg(`"${word}" non si collega a "${lastWord}". Cerca un cambio di lettera, anagramma, aggiunta o associazione semantica!`);
      setTimeout(() => setErrorMsg(null), 4000);
    }
  };

  const handleReset = () => {
    setSelectedPath(["AIorao"]);
    setErrorMsg(null);
  };

  // Helper to get the description of the last link made
  const getLastTransitionText = () => {
    if (selectedPath.length < 2) return null;
    const prev = selectedPath[selectedPath.length - 2];
    const curr = selectedPath[selectedPath.length - 1];
    return TRANSITIONS[`${prev}-${curr}`] || "Associazione";
  };

  const lastTransition = getLastTransitionText();

  return (
    <div className="target-container">
      <h2 className="game-title">Il Bersaglio</h2>
      <p className="game-subtitle">
        Crea la catena ortottica corretta. Clicca sulle parole procedendo dall'esterno (<strong>AIorao</strong>) al centro (<strong>Visione</strong>) sfruttando <strong>anagrammi</strong>, <strong>cambi di lettera</strong> (+/-) o **associazioni**!
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
          {NODES.map((node) => {
            const isSelected = selectedPath.includes(node.word);
            const { x, y } = getWordCoords(node.word);
            
            // Special styling for start and end nodes
            const isStart = node.word === "AIorao";
            const isEnd = node.word === "Visione";
            
            // Badge size depending on text length
            const width = isEnd ? 55 : node.word.length * 8 + 16;
            const height = 24;

            // Center node (Visione) is drawn inside the red bullseye without a box
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
                    r="32" 
                    fill={isSelected ? "var(--se-blue)" : "var(--se-red)"} 
                    stroke="white" 
                    strokeWidth="1.5" 
                    style={{ transition: 'fill 0.2s ease' }}
                  />
                  <text
                    x={x}
                    y={y + 4}
                    fill="white"
                    fontSize="11"
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
                {/* Badge card background */}
                <rect
                  x={x - width / 2}
                  y={y - height / 2}
                  width={width}
                  height={height}
                  rx="12"
                  fill={isSelected ? "var(--se-blue)" : "white"}
                  stroke={isStart ? "var(--se-red)" : "var(--border-color)"}
                  strokeWidth={isStart ? "2" : "1.5"}
                  style={{ transition: 'all 0.2s ease' }}
                  filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.1))"
                />
                
                {/* Badge text */}
                <text
                  x={x}
                  y={y + 4}
                  fill={isSelected ? "white" : "black"}
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {node.word}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Connection mechanism hint */}
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
          marginTop: '10px'
        }}>
          <strong>Ultimo step:</strong> {selectedPath[selectedPath.length - 2]} → {selectedPath[selectedPath.length - 1]} 
          <br />
          <span style={{ fontSize: '11px', opacity: 0.85 }}>{lastTransition}</span>
        </div>
      )}

      {/* Display path in a simple row below the target */}
      <div className="target-path-visual" style={{ width: '100%', maxWidth: '460px', marginTop: '10px' }}>
        {selectedPath.map((word, index) => (
          <React.Fragment key={word}>
            <span className={`path-step ${word === "AIorao" ? 'start' : word === "Visione" ? 'end' : ''}`} style={{ fontSize: '11px', padding: '3px 6px' }}>
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
