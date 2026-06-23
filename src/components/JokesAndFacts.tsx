import React from 'react';
import { Smile, BookOpen, BrainCircuit } from 'lucide-react';

export const JokesAndFacts: React.FC = () => {
  const JOKES = [
    {
      setup: "Un oculista e un ortottista si incontrano al bar prima del turno di lavoro.",
      punchline: "L'oculista saluta: 'Ci vediamo più tardi!'. L'ortottista risponde sorridendo: 'Speriamo in modo binoculare!'"
    },
    {
      setup: "Perché i pesci rossi hanno gli occhi così distanti e rivolti verso l'esterno?",
      punchline: "Perché altrimenti non riuscirebbero a incrociare lo sguardo e a farsi l'occhiolino!"
    },
    {
      setup: "Dottore, dottore! Aiuto, vedo tutto doppio da stamattina!",
      punchline: "L'ortottista risponde: 'Si accomodi pure sulla sedia davanti a lei.' - 'Quale delle due, dottore?'"
    },
    {
      setup: "Cosa dice un occhio all'altro occhio mentre camminano per strada?",
      punchline: "'Guarda, ti dico una cosa in confidenza... tra noi due c'è qualcosa che naso!'"
    },
    {
      setup: "Un paziente strabico va a fare la visita e dice preoccupato: 'Dottore, a volte mi sento così escluso e diverso...'",
      punchline: "L'ortottista lo rassicura: 'Non si preoccupi affatto, noi qui guardiamo le cose da molti punti di vista!'"
    }
  ];

  const FACTS = [
    {
      title: "La Fovea Centrale",
      content: "La fovea è una piccolissima depressione sulla retina di appena 1.5 millimetri. Nonostante le dimensioni ridotte, contiene circa la metà di tutte le fibre del nervo ottico dedicate alla visione dettagliata. È grazie a questa area che leggiamo ed eseguiamo i compiti visivi più fini."
    },
    {
      title: "Il Potere delle Saccadi",
      content: "Le saccadi sono i movimenti oculari rapidi che ci permettono di spostare lo sguardo. Sono i movimenti più veloci che il corpo umano possa compiere, raggiungendo velocità fino a 900 gradi al secondo. Durante la lettura, facciamo circa 3-4 saccadi al secondo, durante le quali il cervello spegne momentaneamente la percezione visiva per evitare sfocature."
    },
    {
      title: "L'Ambliopia (Occhio Pigro)",
      content: "Se nei primi anni di vita il cervello non riceve un'immagine nitida da uno dei due occhi (a causa di strabismo o difetti refrattivi differenti), tende ad escluderlo. Questo fenomeno si chiama ambliopia. Può essere curato efficacemente quasi solo durante il periodo plastico dello sviluppo visivo (fino a 7-8 anni)."
    },
    {
      title: "La Visione Tridimensionale",
      content: "La stereopsi è la nostra capacità di percepire la profondità tridimensionale. Avviene nel cervello che unisce le due immagini leggermente diverse (disparità binoculare) catturate dai singoli occhi. Senza la coordinazione oculomotoria gestita dall'ortottista, il cervello farebbe fatica a fondere le immagini in 3D!"
    }
  ];

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
          {JOKES.map((j, idx) => (
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
          {FACTS.map((f, idx) => (
            <div key={idx} className="fact-card">
              <div className="fact-title">{f.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-secondary)' }}>{f.content}</div>
            </div>
          ))}

          {/* Educational Call to action */}
          <div className="fact-card" style={{ borderLeftColor: 'var(--se-red)', backgroundColor: 'rgba(194, 32, 38, 0.02)', marginTop: '10px' }}>
            <div className="fact-title" style={{ color: 'var(--se-red)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BrainCircuit size={16} />
              <span>Vision AI & Rieducazione</span>
            </div>
            <div style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--ink-secondary)' }}>
              Gli esercizi presenti in questo giornalino come saccadi e inseguimenti visivi sono ispirati ai veri protocolli clinici di ortottica per migliorare l'efficienza visiva e la coordinazione oculare.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
