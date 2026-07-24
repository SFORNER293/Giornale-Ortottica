import React, { useState } from 'react';
import { ISSUES_DATA, type WeeklyIssue } from '../data/issuesData';
import { BookCheck, CheckCircle2, Award, Sparkles, HelpCircle } from 'lucide-react';
import { renderSceneContentHelper } from './SpotDifferencesGame';

interface SolutionsPageProps {
  initialIssueId?: number;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ initialIssueId = 1 }) => {
  const [activeIssueId, setActiveIssueId] = useState<number>(initialIssueId);

  const activeIssue: WeeklyIssue = ISSUES_DATA.find(i => i.id === activeIssueId) || ISSUES_DATA[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--paper-dark)', border: '1px solid var(--border-color)', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontFamily: 'var(--font-typewriter)', marginBottom: '8px' }}>
          <BookCheck size={16} color="var(--se-red)" />
          <span>Fascicolo Ufficiale delle Soluzioni — Mese di Agosto 2026</span>
        </div>
        <h2 className="game-title">Le Soluzioni del Mese</h2>
        <p className="game-subtitle">
          Consulta le risposte esatte ed i passaggi analitici delle 4 uscite settimanali. Utile per la verifica clinica dell'ortottista o per il controllo a fine percorso!
        </p>
      </div>

      {/* Issue Selector Tabs inside Solutions */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {ISSUES_DATA.map(issue => {
          const isActive = issue.id === activeIssueId;
          return (
            <button
              key={issue.id}
              onClick={() => setActiveIssueId(issue.id)}
              className={`toc-item ${isActive ? 'active' : ''}`}
              style={{
                backgroundColor: isActive ? issue.badgeColor : 'var(--paper-dark)',
                borderColor: isActive ? issue.badgeColor : 'var(--border-color)',
                color: isActive ? 'white' : 'var(--ink-primary)',
                fontWeight: 'bold'
              }}
            >
              <span>Uscita N. {issue.number} ({issue.dateStr.split(' ')[1]} {issue.dateStr.split(' ')[2]})</span>
            </button>
          );
        })}
      </div>

      {/* Solutions Container */}
      <div style={{
        border: '2px solid var(--border-color)',
        borderRadius: '6px',
        backgroundColor: 'white',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: 'var(--shadow-paper)'
      }}>
        {/* Header for selected issue */}
        <div style={{ borderBottom: '2px double var(--border-color)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ backgroundColor: activeIssue.badgeColor, color: 'white', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '3px' }}>
              SOLUZIONI USCITA N. {activeIssue.number}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-secondary)' }}>
              {activeIssue.dateStr}
            </span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--se-blue)', margin: '8px 0 4px 0' }}>
            {activeIssue.title}
          </h3>
          <div style={{ fontFamily: 'var(--font-typewriter)', fontSize: '13px', fontStyle: 'italic', color: 'var(--ink-secondary)' }}>
            Tema clinico: {activeIssue.theme}
          </div>
        </div>

        {/* 1. SOLUZIONE LA PISTA CIFRATA */}
        <div style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '16px', backgroundColor: 'var(--paper-bg)' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--se-red)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--se-red)" />
            <span>1. Soluzione: La Pista Cifrata ({activeIssue.id === 1 ? "L'Occhio Foveale" : activeIssue.id === 2 ? "Montatura di Prova e Prismi" : activeIssue.id === 3 ? "Il Sinottoforo" : "Forottero ed Ottotipo"})</span>
          </h4>
          <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 'bold', color: 'var(--se-blue)', marginBottom: '10px', backgroundColor: 'white', padding: '8px 12px', borderRadius: '4px', border: '1px stroke #e2e8f0' }}>
            Sequenza Punti: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13 → 14 → 15 → 16 → 17 → 18 → 19 → 20
          </div>
          <div style={{ fontSize: '12px', fontFamily: 'var(--font-sans)', color: 'var(--ink-secondary)', backgroundColor: 'white', padding: '10px', borderRadius: '4px', border: '1px stroke #e2e8f0' }}>
            <strong>Illustrazione Ortottica Svelata:</strong>
            <div style={{ marginTop: '4px', lineHeight: '1.5', fontStyle: 'italic' }}>
              {activeIssue.id === 1 && "Disegno anatomico del bulbo oculare con fovea centrale ad alta acuità e vie di fissazione."}
              {activeIssue.id === 2 && "Montatura di prova ortottica graduata con alloggiamento per lenti e stecca dei prismi."}
              {activeIssue.id === 3 && "Schema dello strumento a bracci snodati per la valutazione dei 3 Gradi di Worth."}
              {activeIssue.id === 4 && "Apparecchio di rifrazione oftalmica abbinato al tabellone dell'ottotipo di Snellen."}
            </div>
          </div>
        </div>

        {/* 2. SOLUZIONE PAROLE CROCIATE */}
        <div style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '16px', backgroundColor: 'var(--paper-bg)' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--se-blue)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} />
            <span>2. Soluzione: Parole Crociate (Elenco Termini)</span>
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
            <div>
              <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', color: 'var(--se-blue)', display: 'block', marginBottom: '6px' }}>ORIZZONTALI:</strong>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', fontFamily: 'var(--font-sans)', lineHeight: '1.6' }}>
                {activeIssue.crosswordData.clues.filter(c => c.direction === 'across').map(c => (
                  <li key={`${c.number}-across`}>
                    <strong>{c.number}. {c.word}</strong> — <span style={{ opacity: 0.85 }}>{c.clue}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', color: 'var(--se-red)', display: 'block', marginBottom: '6px' }}>VERTICALI:</strong>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', fontFamily: 'var(--font-sans)', lineHeight: '1.6' }}>
                {activeIssue.crosswordData.clues.filter(c => c.direction === 'down').map(c => (
                  <li key={`${c.number}-down`}>
                    <strong>{c.number}. {c.word}</strong> — <span style={{ opacity: 0.85 }}>{c.clue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3. SOLUZIONE CRUCIPUZZLE & FRASE SEGRETA */}
        <div style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '16px', backgroundColor: 'var(--paper-bg)' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--success-color)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} />
            <span>3. Soluzione: Crucipuzzle & Frase Risolutiva</span>
          </h4>
          <div style={{ marginBottom: '10px', fontSize: '12px' }}>
            <strong>Parole Trovate nel Tabellone:</strong> {activeIssue.wordSearchData.wordList.join(', ')}
          </div>
          <div style={{ backgroundColor: '#f0fdf4', border: '1.5px dashed var(--success-color)', padding: '12px', borderRadius: '4px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '12px', color: 'var(--success-color)', fontWeight: 'bold', textTransform: 'uppercase' }}>
              ★ Frase Segreta Risolutiva ★
            </div>
            <div style={{ fontFamily: 'var(--font-typewriter)', fontSize: '15px', fontWeight: 'bold', color: '#166534', marginTop: '4px' }}>
              "{activeIssue.wordSearchData.secretPhraseDisplay}"
            </div>
          </div>
        </div>

        {/* 4. SOLUZIONE DIFFERENZE (VISUAL DRAWINGS WITH RED TARGET CIRCLES) */}
        <div style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '16px', backgroundColor: 'var(--paper-bg)' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: '#b45309', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} />
            <span>4. Soluzione Visiva: Le 7 Differenze nello Studio</span>
          </h4>
          
          <div className="differences-view" style={{ marginBottom: '16px' }}>
            <div className="difference-frame">
              <div className="difference-frame-title">DISEGNO A (SOLUZIONE)</div>
              <div className="difference-svg-wrapper">
                <svg viewBox="0 0 400 300" className="difference-svg">
                  {renderSceneContentHelper(activeIssue.spotDifferencesData.sceneType, false)}
                  {activeIssue.spotDifferencesData.differences.map(diff => (
                    <circle
                      key={`sol-a-${diff.id}`}
                      cx={diff.x}
                      cy={diff.y}
                      r={diff.radius}
                      stroke="#ef4444"
                      strokeWidth="2.8"
                      fill="rgba(239, 68, 68, 0.1)"
                      strokeDasharray="4 2"
                    />
                  ))}
                </svg>
              </div>
            </div>

            <div className="difference-frame">
              <div className="difference-frame-title">DISEGNO B (SOLUZIONE)</div>
              <div className="difference-svg-wrapper">
                <svg viewBox="0 0 400 300" className="difference-svg">
                  {renderSceneContentHelper(activeIssue.spotDifferencesData.sceneType, true)}
                  {activeIssue.spotDifferencesData.differences.map(diff => (
                    <circle
                      key={`sol-b-${diff.id}`}
                      cx={diff.x}
                      cy={diff.y}
                      r={diff.radius}
                      stroke="#ef4444"
                      strokeWidth="2.8"
                      fill="rgba(239, 68, 68, 0.1)"
                      strokeDasharray="4 2"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '4px', border: '1px stroke #cbd5e1' }}>
            <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', color: 'var(--se-blue)', display: 'block', marginBottom: '6px' }}>
              ELENCO DETTAGLIATO DEI 7 PARTICOLARI DIVERSI:
            </strong>
            <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', fontFamily: 'var(--font-sans)', lineHeight: '1.6' }}>
              {activeIssue.spotDifferencesData.differences.map(diff => (
                <li key={diff.id}>
                  <strong>Particolare {diff.id}:</strong> {diff.description}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* 5. SOLUZIONE TRITTICO DI REBUS */}
        <div style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '16px', backgroundColor: 'var(--paper-bg)' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--se-red)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={18} />
            <span>5. Soluzione: Trittico di Rebus d'Autore</span>
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {activeIssue.rebusData.items.map(item => (
              <div key={item.id} style={{ backgroundColor: 'white', border: '1px stroke #cbd5e1', padding: '10px', borderRadius: '4px' }}>
                <div style={{ fontFamily: 'var(--font-typewriter)', fontSize: '12px', fontWeight: 'bold', color: 'var(--se-blue)' }}>
                  {item.title} (Diagramma: {item.diagram})
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 'bold', color: 'var(--se-red)', margin: '4px 0' }}>
                  {item.solutionFormatted}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-secondary)', fontStyle: 'italic' }}>
                  {item.hint}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
