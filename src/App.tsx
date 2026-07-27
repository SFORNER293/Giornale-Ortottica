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
  BookCheck,
  Lock,
  Unlock,
  Key
} from 'lucide-react';

function App() {
  const [selectedIssueId, setSelectedIssueId] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  // Admin / Editor unlock mode
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('admin') === 'true' || localStorage.getItem('ortottica_admin_mode') === 'true';
  });
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);
  const [lockedNoticeIssue, setLockedNoticeIssue] = useState<WeeklyIssue | null>(null);

  const handlePinSubmit = () => {
    if (adminPinInput === '1234' || adminPinInput.toLowerCase() === 'admin' || adminPinInput.toLowerCase() === 'visionai') {
      setIsAdmin(true);
      localStorage.setItem('ortottica_admin_mode', 'true');
      setShowAdminModal(false);
      setAdminPinInput('');
      setPinError(false);
      if (lockedNoticeIssue) {
        setSelectedIssueId(lockedNoticeIssue.id);
        setLockedNoticeIssue(null);
      }
    } else {
      setPinError(true);
    }
  };

  const toggleAdminMode = () => {
    if (isAdmin) {
      setIsAdmin(false);
      localStorage.removeItem('ortottica_admin_mode');
    } else {
      setShowAdminModal(true);
    }
  };

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
        <div className="issue-selector-header">
          <div className="issue-selector-title">
            <Calendar size={15} />
            <span>Edizioni di Agosto 2026:</span>
          </div>

          {isAdmin ? (
            <button 
              onClick={toggleAdminMode}
              className="admin-badge-btn active"
              title="Modalità Editore Attiva: Tutti i 4 volumi sbloccati. Clicca per tornare alla vista utenti standard."
            >
              <Unlock size={12} />
              <span>Vista Editore (Volumi Sbloccati)</span>
            </button>
          ) : (
            <button 
              onClick={toggleAdminMode}
              className="admin-badge-btn"
              title="Clicca per inserire il PIN editore e sbloccare i volumi in anteprima"
            >
              <Lock size={12} />
              <span>Accedi Editore</span>
            </button>
          )}
        </div>

        <div className="issue-buttons-list">
          {ISSUES_DATA.map((issue) => {
            const isSelected = issue.id === selectedIssueId;
            const completedCount = getCompletedCount(issue.id);
            const isFullySolved = completedCount === 5;
            const isLocked = !issue.isReleased && !isAdmin;

            return (
              <button
                key={issue.id}
                onClick={() => {
                  if (isLocked) {
                    setLockedNoticeIssue(issue);
                    return;
                  }
                  setSelectedIssueId(issue.id);
                  if (page !== 7) setPage(1);
                }}
                className={`issue-select-btn ${isSelected ? 'active' : ''}`}
                style={{
                  borderColor: isSelected ? issue.badgeColor : 'var(--border-color)',
                  backgroundColor: isSelected ? 'var(--paper-bg)' : 'rgba(255,255,255,0.7)',
                  opacity: isLocked ? 0.75 : 1
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="issue-badge" style={{ backgroundColor: isLocked ? '#6b7280' : issue.badgeColor }}>
                    N. {issue.number} {isLocked && '🔒'}
                  </span>
                  <span className="issue-date-text">{issue.dateStr}</span>
                  {isFullySolved && <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>★</span>}
                </div>
                <div className="issue-sub-title">
                  {isLocked ? `In Uscita - ${issue.title}` : issue.title}
                </div>
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
          <span>Pag. 1: Pista Cifrata</span>
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
          <span>Pag. 6: Casi Clinici</span>
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
              issueId={activeIssue.id}
              onComplete={() => markGameComplete('target')} 
              isCompleted={activeCompleted.target} 
            />
          </div>
        )}
        
        {page === 2 && (
          <CrosswordGame 
            data={activeIssue.crosswordData}
            issueId={activeIssue.id}
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
          <JokesAndFacts data={activeIssue.casesAndFactsData} />
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

      {/* Modal quando un utente clicca su un volume bloccato */}
      {lockedNoticeIssue && (
        <div className="admin-modal-overlay" onClick={() => setLockedNoticeIssue(null)}>
          <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', marginBottom: '10px' }}>
              <Lock size={24} />
              <h3 style={{ margin: 0, fontSize: '18px', fontFamily: 'var(--font-serif)' }}>
                Volume N. {lockedNoticeIssue.number} in preparazione
              </h3>
            </div>
            <p style={{ margin: '8px 0', fontSize: '14px', lineHeight: '1.5', color: 'var(--ink-primary)' }}>
              Questo numero non è ancora stato pubblicato per gli utenti!
            </p>
            <div style={{ backgroundColor: 'var(--paper-bg)', padding: '10px', borderRadius: '6px', border: '1px stroke var(--border-color)', margin: '12px 0', fontSize: '13px' }}>
              <div><strong>Titolo:</strong> {lockedNoticeIssue.title}</div>
              <div><strong>Data di Uscita Prevista:</strong> {lockedNoticeIssue.dateStr}</div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--ink-secondary)', fontStyle: 'italic', margin: '0 0 16px 0' }}>
              Sei l'autore del Giornale? Puoi sbloccare subito tutti i volumi per testarli e modificarli prima del lancio ufficiale!
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="nav-button" onClick={() => setLockedNoticeIssue(null)}>Chiudi</button>
              <button 
                className="nav-button active" 
                onClick={() => {
                  setLockedNoticeIssue(null);
                  setShowAdminModal(true);
                }}
              >
                <Key size={14} style={{ marginRight: '4px' }} />
                Sblocca come Editore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Inserimento PIN Admin */}
      {showAdminModal && (
        <div className="admin-modal-overlay" onClick={() => setShowAdminModal(false)}>
          <div className="admin-modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--se-blue)', marginBottom: '10px' }}>
              <Key size={22} />
              <h3 style={{ margin: 0, fontSize: '18px', fontFamily: 'var(--font-serif)' }}>Modalità Editore / Autore</h3>
            </div>
            <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: 'var(--ink-secondary)' }}>
              Inserisci il PIN segreto dell'Editore per sbloccare e modificare in anteprima tutti i 4 volumi:
            </p>
            <input 
              type="password" 
              value={adminPinInput}
              onChange={e => {
                setAdminPinInput(e.target.value);
                setPinError(false);
              }}
              placeholder="Inserisci PIN segreto"
              style={{ width: '100%', padding: '8px 12px', fontSize: '14px', borderRadius: '4px', border: pinError ? '2px solid var(--se-red)' : '1px solid var(--border-color)', marginBottom: '10px', boxSizing: 'border-box' }}
              onKeyDown={e => {
                if (e.key === 'Enter') handlePinSubmit();
              }}
              autoFocus
            />
            {pinError && <div style={{ color: 'var(--se-red)', fontSize: '12px', marginBottom: '10px', fontWeight: 'bold' }}>PIN errato! Inserisci il codice segreto autorizzato.</div>}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="nav-button" onClick={() => setShowAdminModal(false)}>Annulla</button>
              <button className="nav-button active" onClick={handlePinSubmit}>Attiva Modo Editore</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
