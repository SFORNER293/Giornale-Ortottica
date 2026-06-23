import { useState } from 'react';
import { TargetGame } from './components/TargetGame';
import { CrosswordGame } from './components/CrosswordGame';
import { WordSearchGame } from './components/WordSearchGame';
import { SpotDifferencesGame } from './components/SpotDifferencesGame';
import { RebusGame } from './components/RebusGame';
import { JokesAndFacts } from './components/JokesAndFacts';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Award, 
  ExternalLink,
  BookOpen
} from 'lucide-react';

function App() {
  const [page, setPage] = useState<number>(1);
  const [completedGames, setCompletedGames] = useState<{ [key: string]: boolean }>({
    target: false,
    crossword: false,
    wordsearch: false,
    differences: false,
    rebus: false
  });

  const markGameComplete = (gameKey: string) => {
    setCompletedGames(prev => ({
      ...prev,
      [gameKey]: true
    }));
  };

  const getCompletedCount = () => {
    return Object.values(completedGames).filter(Boolean).length;
  };

  const nextPage = () => {
    if (page < 6) setPage(p => p + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(p => p - 1);
  };

  return (
    <div id="root">
      {/* Settimana Enigmistica Trademark Header */}
      <header className="se-header">
        <div className="se-header-top">
          <span>Poste Italiane - Sped. in abb. post.</span>
          <span style={{ color: 'var(--se-red)', fontWeight: 'bold' }}>AIorao.it</span>
        </div>
        
        <h1 className="se-logo">
          La Settimana <span>Enigmistica</span> Ortottica
        </h1>
        
        <div className="se-slogan">
          La rivista di riabilitazione visiva che vanta innumerevoli tentativi di accomodazione!
        </div>
        
        <div className="se-header-bottom">
          <span>Uscita Speciale</span>
          <span style={{ color: 'var(--se-blue)' }}>N. 1 - Anno I</span>
          <span>Prezzo: 1 Esercizio</span>
        </div>
      </header>

      {/* Table of Contents (TOC) / Page Tabs */}
      <nav className="toc-container">
        <button 
          onClick={() => setPage(1)} 
          className={`toc-item ${page === 1 ? 'active' : ''} ${completedGames.target ? 'completed-icon' : ''}`}
        >
          <span>Pag. 1: Il Bersaglio</span>
          {completedGames.target && <Check size={12} />}
        </button>
        <button 
          onClick={() => setPage(2)} 
          className={`toc-item ${page === 2 ? 'active' : ''} ${completedGames.crossword ? 'completed-icon' : ''}`}
        >
          <span>Pag. 2: Cruciverba</span>
          {completedGames.crossword && <Check size={12} />}
        </button>
        <button 
          onClick={() => setPage(3)} 
          className={`toc-item ${page === 3 ? 'active' : ''} ${completedGames.wordsearch ? 'completed-icon' : ''}`}
        >
          <span>Pag. 3: Crucipuzzle</span>
          {completedGames.wordsearch && <Check size={12} />}
        </button>
        <button 
          onClick={() => setPage(4)} 
          className={`toc-item ${page === 4 ? 'active' : ''} ${completedGames.differences ? 'completed-icon' : ''}`}
        >
          <span>Pag. 4: Differenze</span>
          {completedGames.differences && <Check size={12} />}
        </button>
        <button 
          onClick={() => setPage(5)} 
          className={`toc-item ${page === 5 ? 'active' : ''} ${completedGames.rebus ? 'completed-icon' : ''}`}
        >
          <span>Pag. 5: Il Rebus</span>
          {completedGames.rebus && <Check size={12} />}
        </button>
        <button 
          onClick={() => setPage(6)} 
          className={`toc-item ${page === 6 ? 'active' : ''}`}
        >
          <span>Pag. 6: Letture & Humor</span>
        </button>
      </nav>

      {/* Progress Tracker */}
      <div style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: 'var(--paper-dark)',
        border: '1.5px solid var(--border-color)',
        borderRadius: '6px',
        marginBottom: '16px',
        fontFamily: 'var(--font-typewriter)',
        fontSize: '13px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={16} />
          <span>Progressi Giornalino: <strong>{getCompletedCount()} / 5</strong> giochi risolti</span>
        </div>
        {getCompletedCount() === 5 && (
          <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>★ Giornalino Completato! ★</span>
        )}
      </div>

      {/* Main Newspaper Page content */}
      <main className="newspaper-page">
        {page === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <TargetGame 
              onComplete={() => markGameComplete('target')} 
              isCompleted={completedGames.target} 
            />
          </div>
        )}
        
        {page === 2 && (
          <CrosswordGame 
            onComplete={() => markGameComplete('crossword')} 
            isCompleted={completedGames.crossword} 
          />
        )}
        
        {page === 3 && (
          <WordSearchGame 
            onComplete={() => markGameComplete('wordsearch')} 
            isCompleted={completedGames.wordsearch} 
          />
        )}
        
        {page === 4 && (
          <SpotDifferencesGame 
            onComplete={() => markGameComplete('differences')} 
            isCompleted={completedGames.differences} 
          />
        )}
        
        {page === 5 && (
          <RebusGame 
            onComplete={() => markGameComplete('rebus')} 
            isCompleted={completedGames.rebus} 
          />
        )}

        {page === 6 && (
          <JokesAndFacts />
        )}

        {/* Bottom Page Navigation Controls */}
        <div className="page-nav-container">
          <button 
            className="nav-button" 
            onClick={prevPage} 
            disabled={page === 1}
          >
            <ChevronLeft size={16} />
            Indietro
          </button>
          
          <span className="page-number">Pagina {page} di 6</span>
          
          <button 
            className="nav-button" 
            onClick={nextPage} 
            disabled={page === 6}
          >
            Avanti
            <ChevronRight size={16} />
          </button>
        </div>
      </main>

      {/* Back to AIorao website */}
      <footer className="aiorao-link-container">
        <a href="https://aiorao.it" target="_blank" rel="noreferrer" className="aiorao-link">
          <BookOpen size={14} />
          Torna al portale AIorao
          <ExternalLink size={12} />
        </a>
      </footer>
    </div>
  );
}

export default App;
