import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CheckCircle, HelpCircle } from 'lucide-react';
import type { CrosswordData, CrosswordClue } from '../data/issuesData';

interface CrosswordGameProps {
  data: CrosswordData;
  onComplete: () => void;
  isCompleted: boolean;
}

export const CrosswordGame: React.FC<CrosswordGameProps> = ({ data, onComplete, isCompleted }) => {
  const GRID_SIZE = data.gridSize || 15;

  const [userLetters, setUserLetters] = useState<string[][]>(() =>
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''))
  );
  
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [activeDirection, setActiveDirection] = useState<'across' | 'down'>('across');
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    setUserLetters(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('')));
    setSelectedCell(null);
    setCompletedWords([]);
  }, [data, GRID_SIZE]);

  const { correctLetters, cellNumbers } = useMemo(() => {
    const letters: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    const numbers: (number | null)[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));

    data.clues.forEach(c => {
      numbers[c.row][c.col] = c.number;
      for (let i = 0; i < c.word.length; i++) {
        if (c.direction === 'across') {
          if (c.col + i < GRID_SIZE) letters[c.row][c.col + i] = c.word[i];
        } else {
          if (c.row + i < GRID_SIZE) letters[c.row + i][c.col] = c.word[i];
        }
      }
    });

    return { correctLetters: letters, cellNumbers: numbers };
  }, [data.clues, GRID_SIZE]);

  const isBlackCell = (r: number, c: number): boolean => {
    return correctLetters[r][c] === '';
  };

  const checkWordCorrect = (clue: CrosswordClue, currentGrid: string[][]) => {
    for (let i = 0; i < clue.word.length; i++) {
      const char = clue.direction === 'across' 
        ? currentGrid[clue.row][clue.col + i] 
        : currentGrid[clue.row + i][clue.col];
      if (char !== clue.word[i]) return false;
    }
    return true;
  };

  useEffect(() => {
    const newlyCompleted: string[] = [];
    data.clues.forEach(clue => {
      const wordKey = `${clue.number}-${clue.direction}`;
      if (checkWordCorrect(clue, userLetters)) {
        newlyCompleted.push(wordKey);
      }
    });

    setCompletedWords(newlyCompleted);

    let allFilledCorrectly = true;
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!isBlackCell(r, c) && userLetters[r][c] !== correctLetters[r][c]) {
          allFilledCorrectly = false;
          break;
        }
      }
    }

    if (allFilledCorrectly && !isCompleted && newlyCompleted.length > 0) {
      onComplete();
    }
  }, [userLetters, data.clues, correctLetters, GRID_SIZE]);

  const handleCellClick = (r: number, c: number) => {
    if (isBlackCell(r, c) || isCompleted) return;
    
    if (selectedCell && selectedCell.r === r && selectedCell.c === c) {
      setActiveDirection(prev => prev === 'across' ? 'down' : 'across');
    } else {
      setSelectedCell({ r, c });
    }
  };

  const getActiveWordCells = () => {
    if (!selectedCell) return [];

    const matchingClue = data.clues.find(clue => {
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

    if (key !== '') {
      moveCursor(1);
    }
  };

  const handleKeyDown = (r: number, c: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (userLetters[r][c] === '') {
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

  const handleClueClick = (clue: CrosswordClue) => {
    if (isCompleted) return;
    setSelectedCell({ r: clue.row, c: clue.col });
    setActiveDirection(clue.direction);
    inputRefs.current[`${clue.row}-${clue.col}`]?.focus();
  };

  const getActiveClue = () => {
    if (!selectedCell) return null;
    return data.clues.find(clue => {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
      {/* Top Header full width */}
      <h2 className="game-title">Parole Crociate</h2>
      <p className="game-subtitle">
        Completa lo schema ortottico! Clicca su una casella o su una definizione per iniziare.
      </p>

      {isCompleted && (
        <div className="feedback-modal" style={{ position: 'relative', top: 0, transform: 'none', margin: '0 auto 10px auto' }}>
          <CheckCircle size={18} />
          <span>Schema risolto brillantemente! Complimenti!</span>
        </div>
      )}

      {activeClue && (
        <div style={{
          backgroundColor: 'var(--se-blue)',
          color: 'white',
          padding: '12px 18px',
          borderRadius: '6px',
          marginBottom: '5px',
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

      {/* Two-Column Layout: Grid Left & Clues Right aligned at top of grid */}
      <div className="crossword-container">
        <div className="crossword-grid-wrapper">
          <div className="crossword-grid">
            {Array(GRID_SIZE).fill(null).map((_, r) => (
              Array(GRID_SIZE).fill(null).map((_, c) => {
                const isBlack = isBlackCell(r, c);
                const number = cellNumbers[r][c];
                const letter = userLetters[r][c];
                
                let cellClass = "crossword-cell";
                if (isBlack) cellClass += " block black";
                else if (isActiveCell(r, c)) cellClass += " selected";
                else if (isHighlightedCell(r, c)) cellClass += " highlighted";

                return (
                  <div 
                    key={`${r}-${c}`} 
                    className={cellClass}
                    onClick={() => handleCellClick(r, c)}
                  >
                    {!isBlack && number && <span className="cell-number">{number}</span>}
                    {!isBlack && (
                      <input
                        ref={(el) => { inputRefs.current[`${r}-${c}`] = el; }}
                        type="text"
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

        <div className="crossword-clues">
          <div>
            <h3 className="clues-section-title">Orizzontali</h3>
            <ul className="clues-list">
              {data.clues.filter(c => c.direction === 'across').map(c => {
                const key = `${c.number}-${c.direction}`;
                const isCompletedWord = completedWords.includes(key);
                const isActive = activeClue && activeClue.number === c.number && activeClue.direction === c.direction;
                
                return (
                  <li 
                    key={key} 
                    className={`clue-item ${isCompletedWord ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                    onClick={() => handleClueClick(c)}
                  >
                    <span className="clue-number">{c.number}.</span> {c.clue}
                  </li>
                );
              })}
            </ul>
          </div>

          <div style={{ marginTop: '15px' }}>
            <h3 className="clues-section-title">Verticali</h3>
            <ul className="clues-list">
              {data.clues.filter(c => c.direction === 'down').map(c => {
                const key = `${c.number}-${c.direction}`;
                const isCompletedWord = completedWords.includes(key);
                const isActive = activeClue && activeClue.number === c.number && activeClue.direction === c.direction;

                return (
                  <li 
                    key={key} 
                    className={`clue-item ${isCompletedWord ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                    onClick={() => handleClueClick(c)}
                  >
                    <span className="clue-number">{c.number}.</span> {c.clue}
                  </li>
                );
              })}
            </ul>
          </div>
          
          {!isCompleted && (
            <button 
              className="nav-button" 
              onClick={handleRevealAll}
              style={{ marginTop: '15px', width: '100%', justifyContent: 'center', fontSize: '11px', padding: '6px' }}
            >
              Rivela Soluzione
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
