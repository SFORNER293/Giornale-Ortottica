import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface WordSearchGameProps {
  onComplete: () => void;
  isCompleted: boolean;
}

interface WordPlacement {
  word: string;
  coords: [number, number][]; // [row, col]
}

const WORD_LIST = [
  "STRABISMO",
  "AMBLIOPIA",
  "VISIONE",
  "SACCADI",
  "RETINA",
  "FOVEA",
  "PRISMA",
  "LENTE",
  "CORNEA",
  "OCCHIO",
  "MIRA"
];

const PLACEMENTS: WordPlacement[] = [
  { word: "STRABISMO", coords: [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8]] },
  { word: "AMBLIOPIA", coords: [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8]] },
  { word: "VISIONE", coords: [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]] },
  { word: "SACCADI", coords: [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6]] },
  { word: "RETINA", coords: [[11,0],[11,1],[11,2],[11,3],[11,4],[11,5]] },
  { word: "FOVEA", coords: [[0,11],[1,11],[2,11],[3,11],[4,11]] },
  { word: "PRISMA", coords: [[5,10],[6,10],[7,10],[8,10],[9,10],[10,10]] },
  { word: "LENTE", coords: [[1,9],[2,9],[3,9],[4,9],[5,9]] },
  { word: "CORNEA", coords: [[6,8],[7,8],[8,8],[9,8],[10,8],[11,8]] },
  { word: "OCCHIO", coords: [[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]] },
  { word: "MIRA", coords: [[4,4],[4,5],[4,6],[4,7]] },
];

const SECRET_PHRASE = "LAVISTAEUNDONOPREZIOSOEDEIMPORTANTEPRENDERSENECURAOGNIGIORNOCONAIORAO";
const GRID_SIZE = 12;

// Helper to generate the grid content
const generateGrid = (): string[][] => {
  const tempGrid: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
  
  // 1. Place the words
  PLACEMENTS.forEach(({ word, coords }) => {
    coords.forEach(([r, c], idx) => {
      tempGrid[r][c] = word[idx];
    });
  });

  // 2. Fill the rest with the secret phrase
  let phraseIdx = 0;
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (tempGrid[r][c] === '') {
        if (phraseIdx < SECRET_PHRASE.length) {
          tempGrid[r][c] = SECRET_PHRASE[phraseIdx];
          phraseIdx++;
        } else {
          // If we run out, fill with random characters
          const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
          tempGrid[r][c] = randomChar;
        }
      }
    }
  }

  return tempGrid;
};

const gridContent = generateGrid();

export const WordSearchGame: React.FC<WordSearchGameProps> = ({ onComplete, isCompleted }) => {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [startCell, setStartCell] = useState<{ r: number; c: number } | null>(null);
  const [candidateCells, setCandidateCells] = useState<{ r: number; c: number }[]>([]);
  const [foundCells, setFoundCells] = useState<{ r: number; c: number }[]>([]);

  // Accumulate found cells when a word is discovered
  useEffect(() => {
    const cells: { r: number; c: number }[] = [];
    PLACEMENTS.forEach(({ word, coords }) => {
      if (foundWords.includes(word)) {
        coords.forEach(([r, c]) => {
          cells.push({ r, c });
        });
      }
    });
    setFoundCells(cells);

    // If all words found, solve
    if (foundWords.length === WORD_LIST.length && !isCompleted) {
      onComplete();
    }
  }, [foundWords]);

  const isCellInFound = (r: number, c: number) => {
    return foundCells.some(cell => cell.r === r && cell.c === c);
  };

  const isCellInCandidate = (r: number, c: number) => {
    return candidateCells.some(cell => cell.r === r && cell.c === c);
  };

  // Check if click forms a valid line (horizontal, vertical, or diagonal)
  const getLineCells = (start: { r: number; c: number }, end: { r: number; c: number }) => {
    const dr = end.r - start.r;
    const dc = end.c - start.c;
    const steps = Math.max(Math.abs(dr), Math.abs(dc));

    // Check for straight lines (horizontal, vertical, or 45-degree diagonal)
    if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) {
      return null;
    }

    const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
    const stepC = dc === 0 ? 0 : dc / Math.abs(dc);

    const cells = [];
    for (let i = 0; i <= steps; i++) {
      cells.push({ r: start.r + i * stepR, c: start.c + i * stepC });
    }
    return cells;
  };

  const handleCellClick = (r: number, c: number) => {
    if (isCompleted) return;

    if (!startCell) {
      // First click
      setStartCell({ r, c });
      setCandidateCells([{ r, c }]);
    } else {
      // Second click
      if (startCell.r === r && startCell.c === c) {
        // Deselect
        setStartCell(null);
        setCandidateCells([]);
        return;
      }

      const line = getLineCells(startCell, { r, c });
      if (!line) {
        // Invalid selection, make this the new start
        setStartCell({ r, c });
        setCandidateCells([{ r, c }]);
        return;
      }

      // Check the word formed by the line
      let wordSelected = line.map(cell => gridContent[cell.r][cell.c]).join('');
      let reversedWord = wordSelected.split('').reverse().join('');

      let matchedWord = "";
      if (WORD_LIST.includes(wordSelected) && !foundWords.includes(wordSelected)) {
        matchedWord = wordSelected;
      } else if (WORD_LIST.includes(reversedWord) && !foundWords.includes(reversedWord)) {
        matchedWord = reversedWord;
      }

      if (matchedWord) {
        setFoundWords(prev => [...prev, matchedWord]);
      }
      
      setStartCell(null);
      setCandidateCells([]);
    }
  };

  // Handle hover to show candidate selection line
  const handleCellMouseEnter = (r: number, c: number) => {
    if (!startCell || isCompleted) return;

    const line = getLineCells(startCell, { r, c });
    if (line) {
      setCandidateCells(line);
    } else {
      setCandidateCells([startCell]);
    }
  };

  const handleRevealAll = () => {
    setFoundWords(WORD_LIST);
  };

  // Render hidden message with missing characters replaced by spaces, or showing filled characters
  const getSecretPhraseMarkup = () => {
    return (
      <div className="secret-phrase-display">
        {isCompleted ? (
          <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
            "LA VISTA È UN DONO PREZIOSO ED È IMPORTANTE PRENDERSENE CURA OGNI GIORNO CON AIORAO"
          </span>
        ) : (
          <span style={{ opacity: 0.6, fontStyle: 'italic' }}>
            Trovando le parole sul tabellone, le lettere rimanenti formeranno la frase segreta...
            <br />
            (Parole trovate: {foundWords.length} di {WORD_LIST.length})
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="wordsearch-container">
      <div style={{ flex: '1.2' }}>
        <h2 className="game-title">Crucipuzzle</h2>
        <p className="game-subtitle">
          Trova le parole dell'elenco. Clicca sulla prima lettera e poi sull'ultima per cancellarle!
        </p>

        {isCompleted && (
          <div className="feedback-modal" style={{ position: 'relative', top: 0, transform: 'none', margin: '0 auto 15px auto' }}>
            <CheckCircle size={18} />
            <span>Crucipuzzle risolto! Tutte le parole sono state trovate!</span>
          </div>
        )}

        <div className="wordsearch-grid-wrapper">
          <div className="wordsearch-grid">
            {gridContent.map((row, r) => (
              row.map((letter, c) => {
                const isFound = isCellInFound(r, c);
                const isCandidate = isCellInCandidate(r, c);
                
                let cellClass = "wordsearch-cell";
                if (isFound) cellClass += " highlighted-found";
                else if (isCandidate) cellClass += " selected-candidate";

                return (
                  <div
                    key={`${r}-${c}`}
                    className={cellClass}
                    onClick={() => handleCellClick(r, c)}
                    onMouseEnter={() => handleCellMouseEnter(r, c)}
                  >
                    {letter}
                  </div>
                );
              })
            ))}
          </div>
        </div>
      </div>

      <div className="wordsearch-words-list">
        <h3 className="word-search-title">Parole da trovare</h3>
        <ul className="words-grid">
          {WORD_LIST.map((word) => {
            const isFound = foundWords.includes(word);
            return (
              <li key={word} className={`word-item ${isFound ? 'found' : ''}`}>
                {word}
              </li>
            );
          })}
        </ul>

        <div className="secret-phrase-box">
          <div className="secret-phrase-title">Frase Risolutiva</div>
          {getSecretPhraseMarkup()}
        </div>

        {!isCompleted && (
          <button 
            className="nav-button" 
            onClick={handleRevealAll}
            style={{ marginTop: '20px', width: '100%', justifyContent: 'center', fontSize: '11px', padding: '4px' }}
          >
            Rivela Soluzione
          </button>
        )}
      </div>
    </div>
  );
};
