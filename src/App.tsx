import { useState } from 'react';
import { TargetGame } from './components/TargetGame';
import { CrosswordGame } from './components/CrosswordGame';
import { WordSearchGame } from './components/WordSearchGame';
import { SpotDifferencesGame } from './components/SpotDifferencesGame';
import { RebusGame } from './components/RebusGame';
import { JokesAndFacts } from './components/JokesAndFacts';
import { SolutionsPage } from './components/SolutionsPage';
import { ISSUES_DATA, type WeeklyIssue } from './data/issuesData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Award, 
  ExternalLink,
  BookOpen,
  Calendar,
  Sparkles,
  BookCheck
} from 'lucide-react';

function App() {
  const [selectedIssueId, setSelectedIssueId] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  // Store completion state per issue
  const [completedGamesByIssue, setCompletedGamesByIssue] = useState<{
    [issueId: number]: { [gameKey: string]: boolean };
  }>({
    1: { target: false, crossword: false, wordsearch: false, differences: false, rebus: false },
    2: { target: false, crossword: false, wordsearch: false, differences: false, rebus: false },
    3: { target: false, crossword: false, wordsearch: false, differences: false, rebus: false },
    4: { target: false, crossword: false, wordsearch: false, differences: false, rebus: false }
  });

  const activeIssue: WeeklyIssue = ISSUES_DATA.find(i => i.id === selectedIssueId) || ISSUES_DATA[0];
  const activeCompleted = completedGamesByIssue[selectedIssueId] || {
    target: false, crossword: false, wordsearch: false, differences: false, rebus: false
  };

  const markGameComplete = (gameKey: string) => {
    setCompletedGamesByIssue(prev => ({
      ...prev,
      [selectedIssueId]: {
        ...(prev[selectedIssueId] || {}),
        [gameKey]: true
      }
    }));
  };

  const getCompletedCount = (issueId: number) => {
    const issueState = completedGamesByIssue[issueId] || {};
    return Object.values(issueState).filter(Boolean).length;
  };

  const currentCompletedCount = getCompletedCount(selectedIssueId);

  const nextPage = () => {
    if (page < 7) setPage(p => p + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(p => p - 1);
  };

  return (
    <div id="root">
      {/* Top Edition Selector Bar */}
      <div className="issue-selector-bar">
        <div className="issue-selector-title">
          <Calendar size={15} />
          <span>Edizioni di Agosto 2026:</span>
        </div>
        <div className="issue-buttons-list">
          {ISSUES_DATA.map((issue) => {
            const isSelected = issue.id === selectedIssueId;
            const completedCount = getCompletedCount(issue.id);
            const isFullySolved = completedCount === 5;

            return (
              <button
                key={issue.id}
                onClick={() => {
                  setSelectedIssueId(issue.id);
                  if (page !== 7) setPage(1);
                }}
                className={`issue-select-btn ${isSelected ? 'active' : ''}`}
                style={{
                  borderColor: isSelected ? issue.badgeColor : 'var(--border-color)',
                  backgroundColor: isSelected ? 'var(--paper-bg)' : 'rgba(255,255,255,0.7)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="issue-badge" style={{ backgroundColor: issue.badgeColor }}>
                    N. {issue.number}
                  </span>
                  <span className="issue-date-text">{issue.dateStr}</span>
                  {isFullySolved && <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>★</span>}
                </div>
                <div className="issue-sub-title">{issue.title}</div>
              </button>
            );
          })}
        </div>
      </div>

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
          "{activeIssue.slogan}"
        </div>
        
        <div className="se-header-bottom">
          <span style={{ fontWeight: 'bold', color: activeIssue.badgeColor }}>
            Uscita N. {activeIssue.number} - {activeIssue.dateStr}
          </span>
          <span style={{ color: 'var(--se-blue)' }}>Anno I - Edizione Speciale</span>
          <span>Prezzo: 1 Esercizio Ortottico</span>
        </div>
      </header>

      {/* Table of Contents (TOC) / Page Tabs */}
      <nav className="toc-container">
        <button 
          onClick={() => setPage(1)} 
          className={`toc-item ${page === 1 ? 'active' : ''} ${activeCompleted.target ? 'completed-icon' : ''}`}
        >
          <span>Pag. 1: Il Bersaglio</span>
          {activeCompleted.target && <Check size={12} />}
        </button>
        <button 
          onClick={() => setPage(2)} 
          className={`toc-item ${page === 2 ? 'active' : ''} ${activeCompleted.crossword ? 'completed-icon' : ''}`}
        >
          <span>Pag. 2: Cruciverba</span>
          {activeCompleted.crossword && <Check size={12} />}
        </button>
        <button 
          onClick={() => setPage(3)} 
          className={`toc-item ${page === 3 ? 'active' : ''} ${activeCompleted.wordsearch ? 'completed-icon' : ''}`}
        >
          <span>Pag. 3: Crucipuzzle</span>
          {activeCompleted.wordsearch && <Check size={12} />}
        </button>
        <button 
          onClick={() => setPage(4)} 
          className={`toc-item ${page === 4 ? 'active' : ''} ${activeCompleted.differences ? 'completed-icon' : ''}`}
        >
          <span>Pag. 4: Differenze</span>
          {activeCompleted.differences && <Check size={12} />}
        </button>
        <button 
          onClick={() => setPage(5)} 
          className={`toc-item ${page === 5 ? 'active' : ''} ${activeCompleted.rebus ? 'completed-icon' : ''}`}
        >
          <span>Pag. 5: Il Rebus</span>
          {activeCompleted.rebus && <Check size={12} />}
        </button>
        <button 
          onClick={() => setPage(6)} 
          className={`toc-item ${page === 6 ? 'active' : ''}`}
        >
          <span>Pag. 6: Letture & Humor</span>
        </button>
        <button 
          onClick={() => setPage(7)} 
          className={`toc-item ${page === 7 ? 'active' : ''}`}
          style={{ borderColor: 'var(--se-red)', color: page === 7 ? 'white' : 'var(--se-red)', fontWeight: 'bold' }}
        >
          <BookCheck size={13} />
          <span>Soluzioni Ufficiali</span>
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
          <span>Progressi Uscita N. {activeIssue.number}: <strong>{currentCompletedCount} / 5</strong> giochi risolti</span>
        </div>
        {currentCompletedCount === 5 ? (
          <span style={{ color: 'var(--success-color)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={14} /> ★ Uscita N. {activeIssue.number} Completata! ★
          </span>
        ) : (
          <span style={{ fontSize: '11px', opacity: 0.7 }}>
            Tema: {activeIssue.theme}
          </span>
        )}
      </div>

      {/* Main Newspaper Page content */}
      <main className="newspaper-page">
        {page === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <TargetGame 
              data={activeIssue.targetData}
              onComplete={() => markGameComplete('target')} 
              isCompleted={activeCompleted.target} 
            />
          </div>
        )}
        
        {page === 2 && (
          <CrosswordGame 
            data={activeIssue.crosswordData}
            onComplete={() => markGameComplete('crossword')} 
            isCompleted={activeCompleted.crossword} 
          />
        )}
        
        {page === 3 && (
          <WordSearchGame 
            data={activeIssue.wordSearchData}
            onComplete={() => markGameComplete('wordsearch')} 
            isCompleted={activeCompleted.wordsearch} 
          />
        )}
        
        {page === 4 && (
          <SpotDifferencesGame 
            data={activeIssue.spotDifferencesData}
            onComplete={() => markGameComplete('differences')} 
            isCompleted={activeCompleted.differences} 
          />
        )}
        
        {page === 5 && (
          <RebusGame 
            data={activeIssue.rebusData}
            issueId={activeIssue.id}
            onComplete={() => markGameComplete('rebus')} 
            isCompleted={activeCompleted.rebus} 
          />
        )}

        {page === 6 && (
          <JokesAndFacts data={activeIssue.jokesAndFactsData} />
        )}

        {page === 7 && (
          <SolutionsPage initialIssueId={selectedIssueId} />
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
          
          <span className="page-number">
            {page === 7 ? 'Soluzioni Ufficiali del Mese' : `Uscita N. ${activeIssue.number} — Pagina ${page} di 6`}
          </span>
          
          <button 
            className="nav-button" 
            onClick={nextPage} 
            disabled={page === 7}
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
