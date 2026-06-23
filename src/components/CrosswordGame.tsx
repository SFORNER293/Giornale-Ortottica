import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, HelpCircle } from 'lucide-react';

interface CrosswordGameProps {
  onComplete: () => void;
  isCompleted: boolean;
}

interface Clue {
  number: number;
  direction: 'across' | 'down';
  word: string;
  clue: string;
  row: number;
  col: number;
}

const CLUES: Clue[] = [
  // Across
  { number: 1, direction: 'across', word: 'ORTOTTICA', clue: 'La scienza e professione sanitaria che si occupa di riabilitazione visiva.', row: 0, col: 0 },
  { number: 4, direction: 'across', word: 'BUIO', clue: "L'assenza di luce che dilata la pupilla.", row: 2, col: 8 },
  { number: 5, direction: 'across', word: 'TESTI', clue: 'Prove o letture utilizzate durante le visite ortottiche.', row: 4, col: 4 },
  { number: 6, direction: 'across', word: 'PRISMA', clue: 'Lente speciale usata per misurare ed esercitare la deviazione oculare.', row: 6, col: 8 },
  { number: 7, direction: 'across', word: 'ACUTA', clue: 'Così è la vista normale, definita anche nitida o visus 10/10.', row: 8, col: 8 },
  { number: 8, direction: 'across', word: 'SACCADI', clue: 'I rapidi movimenti oculari di fissazione (verticali o orizzontali).', row: 9, col: 0 },
  
  // Down
  { number: 1, direction: 'down', word: 'OTTOTIPO', clue: 'Tabellone con lettere o simboli per misurare l’acutezza visiva.', row: 0, col: 0 },
  { number: 2, direction: 'down', word: 'TRATTAMENTO', clue: 'Il percorso terapeutico di esercizi per correggere un deficit visivo.', row: 0, col: 4 },
  { number: 3, direction: 'down', word: 'AMBLIOPIA', clue: "Deficit visivo monolaterale comunemente chiamato 'occhio pigro'.", row: 0, col: 8 },
  { number: 9, direction: 'down', word: 'CONI', clue: 'I fotorecettori retinici per la visione diurna e dei colori.', row: 9, col: 2 },
  { number: 10, direction: 'down', word: 'DOPPIA', clue: 'Dicesi della visione duplicata, ovvero la diplopia.', row: 9, col: 5 },
];

const GRID_SIZE = 15;

// Build correct letters grid
const correctLetters: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
CLUES.forEach(c => {
  for (let i = 0; i < c.word.length; i++) {
    if (c.direction === 'across') {
      correctLetters[c.row][c.col + i] = c.word[i];
    } else {
      correctLetters[c.row + i][c.col] = c.word[i];
    }
  }
});

// Check if a cell is black
const isBlackCell = (r: number, c: number): boolean => {
  return correctLetters[r][c] === '';
};

// Map cell to clue number if it's the start
const cellNumbers: (number | null)[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
CLUES.forEach(c => {
  cellNumbers[c.row][c.col] = c.number;
});

export const CrosswordGame: React.FC<CrosswordGameProps> = ({ onComplete, isCompleted }) => {
  const [userLetters, setUserLetters] = useState<string[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''))
  );
  
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [activeDirection, setActiveDirection] = useState<'across' | 'down'>('across');
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Check if a specific word is complete and correct
  const checkWordCorrect = (clue: Clue, currentGrid: string[][]) => {
    for (let i = 0; i < clue.word.length; i++) {
      const char = clue.direction === 'across' 
        ? currentGrid[clue.row][clue.col + i] 
        : currentGrid[clue.row + i][clue.col];
      if (char !== clue.word[i]) return false;
    }
    return true;
  };

  // Run checks when letters change
  useEffect(() => {
    const newlyCompleted: string[] = [];
    CLUES.forEach(clue => {
      const wordKey = `${clue.number}-${clue.direction}`;
      if (checkWordCorrect(clue, userLetters)) {
        newlyCompleted.push(wordKey);
      }
    });

    setCompletedWords(newlyCompleted);

    // Check global crossword completion
    let allFilledCorrectly = true;
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!isBlackCell(r, c) && userLetters[r][c] !== correctLetters[r][c]) {
          allFilledCorrectly = false;
          break;
        }
      }
    }

    if (allFilledCorrectly && !isCompleted) {
      onComplete();
    }
  }, [userLetters]);

  // Handle cell click
  const handleCellClick = (r: number, c: number) => {
    if (isBlackCell(r, c) || isCompleted) return;
    
    if (selectedCell && selectedCell.r === r && selectedCell.c === c) {
      // Toggle direction if clicking same cell
      setActiveDirection(prev => prev === 'across' ? 'down' : 'across');
    } else {
      setSelectedCell({ r, c });
    }
  };

  // Determine cells to highlight as active word
  const getActiveWordCells = () => {
    if (!selectedCell) return [];

    // Find the clue that covers the selected cell in the active direction
    const matchingClue = CLUES.find(clue => {
      if (clue.direction !== activeDirection) return false;
      if (activeDirection === 'across') {
        return clue.row === selectedCell.r && 
               selectedCell.c >= clue.col && 
               selectedCell.c < clue.col + clue.word.length;
      } else {
        return clue.col === selectedCell.c && 
               selectedCell.r >= clue.row && 
               selectedCell.r < clue.row + clue.word.length;
      }
    });

    if (matchingClue) {
      const cells = [];
      for (let i = 0; i < matchingClue.word.length; i++) {
        cells.push(
          activeDirection === 'across'
            ? { r: matchingClue.row, c: matchingClue.col + i }
            : { r: matchingClue.row + i, c: matchingClue.col }
        );
      }
      return cells;
    }

    return [];
  };

  const activeWordCells = getActiveWordCells();
  const isActiveCell = (r: number, c: number) => selectedCell && selectedCell.r === r && selectedCell.c === c;
  const isHighlightedCell = (r: number, c: number) => activeWordCells.some(cell => cell.r === r && cell.c === c);

  // Input typing handler
  const handleInputChange = (r: number, c: number, val: string) => {
    if (isCompleted) return;
    
    const key = val.toUpperCase().slice(-1);
    if (!/^[A-Z]$/.test(key) && key !== '') return;

    const newGrid = userLetters.map((rowArr, rowIndex) => 
      rowArr.map((colVal, colIndex) => {
        if (rowIndex === r && colIndex === c) {
          return key;
        }
        return colVal;
      })
    );

    setUserLetters(newGrid);

    // Move to next cell
    if (key !== '') {
      moveCursor(1);
    }
  };

  // Focus navigation helper
  const moveCursor = (step: number) => {
    if (!selectedCell) return;
    let { r, c } = selectedCell;
    
    if (activeDirection === 'across') {
      let nextCol = c + step;
      while (nextCol >= 0 && nextCol < GRID_SIZE && isBlackCell(r, nextCol)) {
        nextCol += step;
      }
      if (nextCol >= 0 && nextCol < GRID_SIZE) {
        setSelectedCell({ r, c: nextCol });
        inputRefs.current[`${r}-${nextCol}`]?.focus();
      }
    } else {
      let nextRow = r + step;
      while (nextRow >= 0 && nextRow < GRID_SIZE && isBlackCell(nextRow, c)) {
        nextRow += step;
      }
      if (nextRow >= 0 && nextRow < GRID_SIZE) {
        setSelectedCell({ r: nextRow, c });
        inputRefs.current[`${nextRow}-${c}`]?.focus();
      }
    }
  };

  const handleKeyDown = (r: number, c: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (userLetters[r][c] === '') {
        // Move back and delete
        moveCursor(-1);
      } else {
        const newGrid = userLetters.map((rowArr, rowIndex) => 
          rowArr.map((colVal, colIndex) => 
            (rowIndex === r && colIndex === c) ? '' : colVal
          )
        );
        setUserLetters(newGrid);
      }
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      let nextC = c + 1;
      while (nextC < GRID_SIZE && isBlackCell(r, nextC)) nextC++;
      if (nextC < GRID_SIZE) setSelectedCell({ r, c: nextC });
    } else if (e.key === 'ArrowLeft') {
      let nextC = c - 1;
      while (nextC >= 0 && isBlackCell(r, nextC)) nextC--;
      if (nextC >= 0) setSelectedCell({ r, c: nextC });
    } else if (e.key === 'ArrowDown') {
      let nextR = r + 1;
      while (nextR < GRID_SIZE && isBlackCell(nextR, c)) nextR++;
      if (nextR < GRID_SIZE) setSelectedCell({ r: nextR, c });
    } else if (e.key === 'ArrowUp') {
      let nextR = r - 1;
      while (nextR >= 0 && isBlackCell(nextR, c)) nextR--;
      if (nextR >= 0) setSelectedCell({ r: nextR, c });
    }
  };

  // Selecting a clue focuses its first cell
  const handleClueClick = (clue: Clue) => {
    if (isCompleted) return;
    setSelectedCell({ r: clue.row, c: clue.col });
    setActiveDirection(clue.direction);
    inputRefs.current[`${clue.row}-${clue.col}`]?.focus();
  };

  const getActiveClue = () => {
    if (!selectedCell) return null;
    return CLUES.find(clue => {
      if (clue.direction !== activeDirection) return false;
      if (activeDirection === 'across') {
        return clue.row === selectedCell.r && 
               selectedCell.c >= clue.col && 
               selectedCell.c < clue.col + clue.word.length;
      } else {
        return clue.col === selectedCell.c && 
               selectedCell.r >= clue.row && 
               selectedCell.r < clue.row + clue.word.length;
      }
    });
  };

  const activeClue = getActiveClue();

  const handleRevealAll = () => {
    setUserLetters(correctLetters);
  };

  return (
    <div className="crossword-container">
      <div style={{ flex: '1.2' }}>
        <h2 className="game-title">Parole Crociate</h2>
        <p className="game-subtitle">
          Completa lo schema ortottico! Clicca su una casella o su una definizione per iniziare.
        </p>

        {isCompleted && (
          <div className="feedback-modal" style={{ position: 'relative', top: 0, transform: 'none', margin: '0 auto 15px auto' }}>
            <CheckCircle size={18} />
            <span>Schema risolto brillantemente! Complimenti!</span>
          </div>
        )}

        {/* Selected Clue Display */}
        {activeClue && (
          <div style={{
            backgroundColor: 'var(--se-blue)',
            color: 'white',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '15px',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-typewriter)'
          }}>
            <HelpCircle size={18} />
            <span>{activeClue.number} {activeClue.direction === 'across' ? 'Orizzontale' : 'Verticale'}: {activeClue.clue}</span>
          </div>
        )}

        <div className="crossword-grid-wrapper">
          <div className="crossword-grid">
            {Array(GRID_SIZE).fill(null).map((_, r) => (
              Array(GRID_SIZE).fill(null).map((_, c) => {
                const isBlack = isBlackCell(r, c);
                const number = cellNumbers[r][c];
                const letter = userLetters[r][c];
                
                let cellClass = "crossword-cell";
                if (isBlack) cellClass += " black";
                else if (isActiveCell(r, c)) cellClass += " selected";
                else if (isHighlightedCell(r, c)) cellClass += " highlighted";

                return (
                  <div 
                    key={`${r}-${c}`} 
                    className={cellClass}
                    onClick={() => handleCellClick(r, c)}
                  >
                    {!isBlack && number && <span className="crossword-cell-number">{number}</span>}
                    {!isBlack && (
                      <input
                        ref={(el) => { inputRefs.current[`${r}-${c}`] = el; }}
                        type="text"
                        className="crossword-cell-input"
                        value={letter}
                        onChange={(e) => handleInputChange(r, c, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(r, c, e)}
                        disabled={isCompleted}
                        maxLength={1}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                      />
                    )}
                  </div>
                );
              })
            ))}
          </div>
        </div>
      </div>

      <div className="crossword-clues">
        <div>
          <h3 className="clues-section-title">Orizzontali</h3>
          <ul className="clues-list">
            {CLUES.filter(c => c.direction === 'across').map(c => {
              const key = `${c.number}-${c.direction}`;
              const isCompletedWord = completedWords.includes(key);
              const isActive = activeClue && activeClue.number === c.number && activeClue.direction === c.direction;
              
              return (
                <li 
                  key={key} 
                  className={`clue-item ${isCompletedWord ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                  onClick={() => handleClueClick(c)}
                >
                  <strong>{c.number}.</strong> {c.clue}
                </li>
              );
            })}
          </ul>
        </div>

        <div style={{ marginTop: '15px' }}>
          <h3 className="clues-section-title">Verticali</h3>
          <ul className="clues-list">
            {CLUES.filter(c => c.direction === 'down').map(c => {
              const key = `${c.number}-${c.direction}`;
              const isCompletedWord = completedWords.includes(key);
              const isActive = activeClue && activeClue.number === c.number && activeClue.direction === c.direction;

              return (
                <li 
                  key={key} 
                  className={`clue-item ${isCompletedWord ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                  onClick={() => handleClueClick(c)}
                >
                  <strong>{c.number}.</strong> {c.clue}
                </li>
              );
            })}
          </ul>
        </div>
        
        {!isCompleted && (
          <button 
            className="nav-button" 
            onClick={handleRevealAll}
            style={{ marginTop: 'auto', alignSelf: 'center', fontSize: '11px', padding: '4px 8px' }}
          >
            Rivela Soluzione
          </button>
        )}
      </div>
    </div>
  );
};
