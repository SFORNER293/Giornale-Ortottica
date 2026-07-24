import React, { useState } from 'react';
import { Stethoscope, BookOpen, BrainCircuit, CheckCircle2, HelpCircle } from 'lucide-react';
import type { CasesAndFactsData } from '../data/issuesData';

interface JokesAndFactsProps {
  data: CasesAndFactsData;
}

export const JokesAndFacts: React.FC<JokesAndFactsProps> = ({ data }) => {
  const [showSolutions, setShowSolutions] = useState<{ [key: string]: boolean }>({});

  const toggleSolution = (id: string) => {
    setShowSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 className="game-title">Casi Clinici & Approfondimenti Ortottici</h2>
      <p className="game-subtitle">
        Spazio professionale di ragionamento clinico: analizza i casi dello studio ortottico e scopri le pillole di diagnostica e terapia riabilitativa.
      </p>

      <div className="jokes-page-container">
        {/* Clinical Cases Column */}
        <div className="jokes-column">
          <h3 className="clues-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--se-blue)', borderColor: 'var(--se-blue)' }}>
            <Stethoscope size={18} />
            <span>Caso Clinico del Mese</span>
          </h3>

          {data.clinicalCases.map((c) => {
            const isSolved = showSolutions[c.id];
            return (
              <div key={c.id} className="joke-card" style={{ backgroundColor: 'white', border: '1.5px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 'bold', color: 'var(--se-blue)' }}>
                  {c.title}
                </div>
                
                <div style={{ fontSize: '13px', fontFamily: 'var(--font-sans)', color: 'var(--ink-primary)', lineHeight: '1.5' }}>
                  <strong>Quadri del Paziente:</strong> {c.patientInfo}
                </div>

                <div style={{ fontSize: '13px', fontFamily: 'var(--font-sans)', color: 'var(--ink-secondary)', lineHeight: '1.5', backgroundColor: 'var(--paper-dark)', padding: '10px', borderRadius: '4px' }}>
                  <div><strong>Anamnesi:</strong> {c.history}</div>
                  <div style={{ marginTop: '6px' }}><strong>Esame Ortottico:</strong> {c.examination}</div>
                </div>

                <div style={{ fontSize: '13px', fontFamily: 'var(--font-sans)', fontWeight: 'bold', color: 'var(--se-red)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <HelpCircle size={15} />
                  <span>{c.question}</span>
                </div>

                <button
                  onClick={() => toggleSolution(c.id)}
                  className="nav-button"
                  style={{ alignSelf: 'flex-start', padding: '6px 12px', fontSize: '12px' }}
                >
                  {isSolved ? "Nascondi Risoluzione Clinica" : "Mostra Soluzione Clinica & Terapia"}
                </button>

                {isSolved && (
                  <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px', borderRadius: '4px', marginTop: '6px', fontSize: '13px', lineHeight: '1.5', color: '#166534' }}>
                    <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <CheckCircle2 size={15} />
                      <span>Inquadramento Diagnostic & Protocollo Ortottico:</span>
                    </div>
                    {c.solution}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Deep Dives Column */}
        <div className="facts-column">
          <h3 className="clues-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderColor: 'var(--se-red)', color: 'var(--se-red)' }}>
            <BookOpen size={18} />
            <span>Pillole di Diagnostica & Ortottica</span>
          </h3>

          {data.deepDives.map((d, idx) => (
            <div key={idx} className="fact-card">
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 'bold', color: 'var(--se-red)', textTransform: 'uppercase', marginBottom: '2px' }}>
                {d.category}
              </div>
              <div className="fact-title">{d.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-secondary)', lineHeight: '1.5' }}>{d.content}</div>
            </div>
          ))}

          {/* Clinical note footer */}
          <div className="fact-card" style={{ borderLeftColor: 'var(--se-blue)', backgroundColor: 'rgba(11, 69, 126, 0.03)', marginTop: '10px' }}>
            <div className="fact-title" style={{ color: 'var(--se-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BrainCircuit size={16} />
              <span>{data.clinicalNote.title}</span>
            </div>
            <div style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--ink-secondary)', lineHeight: '1.5' }}>
              {data.clinicalNote.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
