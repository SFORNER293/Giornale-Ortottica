import React from 'react';
import { Smile, BookOpen, BrainCircuit } from 'lucide-react';
import type { JokesAndFactsData } from '../data/issuesData';

interface JokesAndFactsProps {
  data: JokesAndFactsData;
}

export const JokesAndFacts: React.FC<JokesAndFactsProps> = ({ data }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2 className="game-title">Spazio Umorismo & Curiosità</h2>
      <p className="game-subtitle">
        Prenditi una pausa tra un enigma e l'altro con le nostre battute a tema e scopri affascinanti segreti sulla macchina visiva umana.
      </p>

      <div className="jokes-page-container">
        {/* Jokes Column */}
        <div className="jokes-column">
          <h3 className="clues-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Smile size={18} />
            <span>Risate in Condivisione</span>
          </h3>
          {data.jokes.map((j, idx) => (
            <div key={idx} className="joke-card">
              <div className="joke-setup">{j.setup}</div>
              <div className="joke-punchline">{j.punchline}</div>
            </div>
          ))}
        </div>

        {/* Trivia Column */}
        <div className="facts-column">
          <h3 className="clues-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', borderColor: 'var(--se-red)', color: 'var(--se-red)' }}>
            <BookOpen size={18} />
            <span>Lo Sapevate Che...</span>
          </h3>
          {data.facts.map((f, idx) => (
            <div key={idx} className="fact-card">
              <div className="fact-title">{f.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-secondary)' }}>{f.content}</div>
            </div>
          ))}

          {/* Educational Call to action */}
          <div className="fact-card" style={{ borderLeftColor: 'var(--se-red)', backgroundColor: 'rgba(194, 32, 38, 0.02)', marginTop: '10px' }}>
            <div className="fact-title" style={{ color: 'var(--se-red)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BrainCircuit size={16} />
              <span>{data.clinicalNote.title}</span>
            </div>
            <div style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--ink-secondary)' }}>
              {data.clinicalNote.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
