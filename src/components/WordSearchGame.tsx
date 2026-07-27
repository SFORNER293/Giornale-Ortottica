import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle } from 'lucide-react';
import type { WordSearchData } from '../data/issuesData';

interface WordSearchGameProps {
  data: WordSearchData;
  onComplete: () => void;
  isCompleted: boolean;
}

export const WordSearchGame: React.FC<WordSearchGameProps> = ({ data, onComplete, isCompleted }) => {
  const GRID_SIZE = data.gridSize || 12;

  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [startCell, setStartCell] = useState<{ r: number; c: number } | null>(null);
  const [candidateCells, setCandidateCells] = useState<{ r: number; c: number }[]>([]);
  const [foundCells, setFoundCells] = useState<{ r: number; c: number }[]>([]);

  useEffect(() => {
    setFoundWords([]);
    setStartCell(null);
    setCandidateCells([]);
    setFoundCells([]);
  }, [data]);

  const gridContent = useMemo(() => {
    const tempGrid: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    
    data.placements.forEach(({ word, coords }) => {
      coords.forEach(([r, c], idx) => {
        if (r < GRID_SIZE && c < GRID_SIZE) {
          tempGrid[r][c] = word[idx];
        }
      });
    });

    let phraseIdx = 0;
    const cleanSecret = data.secretPhrase.replace(/[^A-Z]/gi, '').toUpperCase();
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (tempGrid[r][c] === '') {
          if (phraseIdx < cleanSecret.length) {
            tempGrid[r][c] = cleanSecret[phraseIdx];
            phraseIdx++;
          } else {
            const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            tempGrid[r][c] = randomChar;
          }
        }
      }
    }

    return tempGrid;
  }, [data, GRID_SIZE]);

  useEffect(() => {
    const cells: { r: number; c: number }[] = [];
    data.placements.forEach(({ word, coords }) => {
      if (foundWords.includes(word)) {
        coords.forEach(([r, c]) => {
          cells.push({ r, c });
        });
      }
    });
    setFoundCells(cells);

    if (foundWords.length === data.wordList.length && !isCompleted && data.wordList.length > 0) {
      onComplete();
    }
  }, [foundWords, data, isCompleted, onComplete]);

  const isCellInFound = (r: number, c: number) => {
    return foundCells.some(cell => cell.r === r && cell.c === c);
  };

  const isCellInCandidate = (r: number, c: number) => {
    return candidateCells.some(cell => cell.r === r && cell.c === c);
  };

  const getLineCells = (start: { r: number; c: number }, end: { r: number; c: number }) => {
    const dr = end.r - start.r;
    const dc = end.c - start.c;
    const steps = Math.max(Math.abs(dr), Math.abs(dc));

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
      setStartCell({ r, c });
      setCandidateCells([{ r, c }]);
    } else {
      if (startCell.r === r && startCell.c === c) {
        setStartCell(null);
        setCandidateCells([]);
        return;
      }

      const line = getLineCells(startCell, { r, c });
      if (!line) {
        setStartCell({ r, c });
        setCandidateCells([{ r, c }]);
        return;
      }

      let wordSelected = line.map(cell => gridContent[cell.r][cell.c]).join('');
      let reversedWord = wordSelected.split('').reverse().join('');

      let matchedWord = "";
      if (data.wordList.includes(wordSelected) && !foundWords.includes(wordSelected)) {
        matchedWord = wordSelected;
      } else if (data.wordList.includes(reversedWord) && !foundWords.includes(reversedWord)) {
        matchedWord = reversedWord;
      }

      if (matchedWord) {
        setFoundWords(prev => [...prev, matchedWord]);
      }
      
      setStartCell(null);
      setCandidateCells([]);
    }
  };

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
    setFoundWords(data.wordList);
  };

  const getSecretPhraseMarkup = () => {
    return (
      <div className="secret-phrase-display">
        {isCompleted ? (
          <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
            "{data.secretPhraseDisplay}"
          </span>
        ) : (
          <span style={{ opacity: 0.6, fontStyle: 'italic' }}>
            Trovando le parole sul tabellone, le lettere rimanenti formeranno la frase segreta...
            <br />
            (Parole trovate: {foundWords.length} di {data.wordList.length})
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="wordsearch-container">
      {/* Title and Subtitle at full width top */}
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

      {/* Two-column layout: Left Grid & Right Word List aligned at top of grid */}
      <div className="wordsearch-body">
        <div className="wordsearch-grid-wrapper">
          <div 
            className="wordsearch-grid"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
            }}
          >
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

        <div className="wordsearch-words-list">
          <h3 className="word-search-title">Parole da trovare</h3>
          <ul className="words-grid">
            {data.wordList.map((word) => {
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
    </div>
  );
};
