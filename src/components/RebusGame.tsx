import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { RebusData, RebusItem } from '../data/issuesData';

interface RebusGameProps {
  data: RebusData;
  issueId: number;
  onComplete: () => void;
  isCompleted: boolean;
}

export const RebusGame: React.FC<RebusGameProps> = ({ data, issueId, onComplete, isCompleted }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({ a: "", b: "", c: "" });
  const [solved, setSolved] = useState<{ [key: string]: boolean }>({ a: false, b: false, c: false });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({ a: null, b: null, c: null });

  useEffect(() => {
    setAnswers({ a: "", b: "", c: "" });
    setSolved({ a: false, b: false, c: false });
    setErrors({ a: null, b: null, c: null });
  }, [data, issueId]);

  useEffect(() => {
    if (solved.a && solved.b && solved.c && !isCompleted) {
      onComplete();
    }
  }, [solved, isCompleted, onComplete]);

  const handleVerify = (rebusKey: 'a' | 'b' | 'c', expected: string, hint: string) => {
    const rawVal = answers[rebusKey] || "";
    const cleanAnswer = rawVal.replace(/[^A-Z]/gi, '').toUpperCase();
    
    if (cleanAnswer === expected) {
      setSolved(prev => ({ ...prev, [rebusKey]: true }));
      setErrors(prev => ({ ...prev, [rebusKey]: null }));
    } else {
      setErrors(prev => ({ ...prev, [rebusKey]: `Sbagliato! ${hint}` }));
      setTimeout(() => {
        setErrors(prev => ({ ...prev, [rebusKey]: null }));
      }, 4000);
    }
  };

  const handleReveal = (rebusKey: 'a' | 'b' | 'c', solutionText: string) => {
    setAnswers(prev => ({ ...prev, [rebusKey]: solutionText }));
    setSolved(prev => ({ ...prev, [rebusKey]: true }));
    setErrors(prev => ({ ...prev, [rebusKey]: null }));
  };

  const handleRevealAll = () => {
    const newAnswers: { [key: string]: string } = {};
    data.items.forEach(item => {
      newAnswers[item.id] = item.solutionFormatted;
    });
    setAnswers(newAnswers);
    setSolved({ a: true, b: true, c: true });
    onComplete();
  };

  // Render true visual enigmistica rebus drawings for all 4 issues
  const renderRebusSvg = (item: RebusItem) => {
    if (issueId === 1) {
      if (item.id === 'a') { // L'OCCHIO PIGRO
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <line x1="220" y1="10" x2="220" y2="150" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
            <g transform="translate(10, 0)">
              <text x="30" y="85" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">L'</text>
              {/* Occhio */}
              <g transform="translate(70, 35)">
                <path d="M 10 45 Q 60 10 110 45 Q 60 80 10 45 Z" fill="white" stroke="#374151" strokeWidth="2.5" />
                <circle cx="60" cy="45" r="18" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
                <circle cx="60" cy="45" r="7" fill="black" />
              </g>
            </g>
            <g transform="translate(210, 0)">
              <text x="15" y="85" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">P I</text>
              {/* Gru Edile dettagliata a traliccio */}
              <g transform="translate(75, 10)">
                {/* Base zavorra */}
                <rect x="45" y="125" width="40" height="12" fill="#374151" rx="2" />
                
                {/* Torre a traliccio */}
                <rect x="58" y="30" width="14" height="95" fill="none" stroke="#2563eb" strokeWidth="2" />
                <line x1="58" y1="30" x2="72" y2="49" stroke="#2563eb" strokeWidth="1.2" />
                <line x1="72" y1="30" x2="58" y2="49" stroke="#2563eb" strokeWidth="1.2" />
                <line x1="58" y1="49" x2="72" y2="68" stroke="#2563eb" strokeWidth="1.2" />
                <line x1="72" y1="49" x2="58" y2="68" stroke="#2563eb" strokeWidth="1.2" />
                <line x1="58" y1="68" x2="72" y2="87" stroke="#2563eb" strokeWidth="1.2" />
                <line x1="72" y1="68" x2="58" y2="87" stroke="#2563eb" strokeWidth="1.2" />
                <line x1="58" y1="87" x2="72" y2="106" stroke="#2563eb" strokeWidth="1.2" />
                <line x1="72" y1="87" x2="58" y2="106" stroke="#2563eb" strokeWidth="1.2" />

                {/* Cabina guida gialla */}
                <rect x="53" y="22" width="24" height="14" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" rx="2" />
                <circle cx="69" cy="29" r="3" fill="#1f2937" />

                {/* Braccio a traliccio e Tiranti */}
                <line x1="15" y1="20" x2="160" y2="20" stroke="#2563eb" strokeWidth="2.5" />
                <line x1="15" y1="26" x2="160" y2="26" stroke="#2563eb" strokeWidth="1.5" />
                <line x1="65" y1="8" x2="65" y2="20" stroke="#2563eb" strokeWidth="2" />
                <line x1="65" y1="8" x2="25" y2="20" stroke="#2563eb" strokeWidth="1.5" />
                <line x1="65" y1="8" x2="140" y2="20" stroke="#2563eb" strokeWidth="1.5" />

                {/* Contrappeso */}
                <rect x="20" y="22" width="22" height="12" fill="#4b5563" stroke="#1f2937" strokeWidth="1" rx="1" />

                {/* Carrello e Cavo con Gancio rosso */}
                <rect x="125" y="24" width="10" height="6" fill="#1f2937" />
                <line x1="130" y1="30" x2="130" y2="70" stroke="#374151" strokeWidth="1.5" />
                <path d="M 130 70 Q 130 80 125 80 Q 120 80 121 74" stroke="#dc2626" strokeWidth="2.2" fill="none" />

                {/* Badge U = O */}
                <rect x="95" y="0" width="55" height="18" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" rx="3" />
                <text x="122.5" y="13" fill="var(--se-red)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">U = O</text>
              </g>
            </g>
          </svg>
        );
      }
      if (item.id === 'b') { // MIRA LA RETINA
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <line x1="170" y1="10" x2="170" y2="150" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Bersaglio (Mira) */}
            <g transform="translate(10, 20)">
              <circle cx="70" cy="60" r="38" fill="none" stroke="#374151" strokeWidth="2" />
              <circle cx="70" cy="60" r="24" fill="none" stroke="#374151" strokeWidth="1.5" />
              <circle cx="70" cy="60" r="10" fill="#ef4444" />
              <line x1="70" y1="15" x2="70" y2="105" stroke="#374151" strokeWidth="1.5" />
              <line x1="25" y1="60" x2="115" y2="60" stroke="#374151" strokeWidth="1.5" />
            </g>
            {/* L A + DUE RETI (RETI) + N A */}
            <g transform="translate(180, 20)">
              <text x="10" y="70" fill="var(--se-red)" fontSize="28" fontFamily="var(--font-serif)" fontWeight="bold">L A</text>
              
              {/* Rete 1 */}
              <g transform="translate(60, 35)">
                <rect x="0" y="0" width="65" height="48" fill="#f8fafc" stroke="#2563eb" strokeWidth="2" rx="3" />
                <path d="M 0 0 L 48 48 M 18 0 L 65 47 M 36 0 L 65 29 M 65 0 L 17 48 M 47 0 L 0 47 M 28 0 L 0 28" stroke="#94a3b8" strokeWidth="1.2" />
                <line x1="-4" y1="-5" x2="-4" y2="58" stroke="#374151" strokeWidth="2.5" />
                <line x1="69" y1="-5" x2="69" y2="58" stroke="#374151" strokeWidth="2.5" />
              </g>

              {/* Rete 2 */}
              <g transform="translate(145, 35)">
                <rect x="0" y="0" width="65" height="48" fill="#f8fafc" stroke="#2563eb" strokeWidth="2" rx="3" />
                <path d="M 0 0 L 48 48 M 18 0 L 65 47 M 36 0 L 65 29 M 65 0 L 17 48 M 47 0 L 0 47 M 28 0 L 0 28" stroke="#94a3b8" strokeWidth="1.2" />
                <line x1="-4" y1="-5" x2="-4" y2="58" stroke="#374151" strokeWidth="2.5" />
                <line x1="69" y1="-5" x2="69" y2="58" stroke="#374151" strokeWidth="2.5" />
              </g>

              <text x="235" y="70" fill="var(--se-red)" fontSize="28" fontFamily="var(--font-serif)" fontWeight="bold">N A</text>
            </g>
          </svg>
        );
      }
      // Rebus C: LA STEREOPSI
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Spartito musicale (Pentagramma) con la nota LA */}
          <g transform="translate(15, 25)">
            <rect x="0" y="0" width="115" height="95" fill="white" stroke="#374151" strokeWidth="2" rx="4" />
            
            {/* 5 Linee del pentagramma */}
            <line x1="10" y1="22" x2="105" y2="22" stroke="#475569" strokeWidth="1.2" />
            <line x1="10" y1="34" x2="105" y2="34" stroke="#475569" strokeWidth="1.2" />
            <line x1="10" y1="46" x2="105" y2="46" stroke="#475569" strokeWidth="1.2" />
            <line x1="10" y1="58" x2="105" y2="58" stroke="#475569" strokeWidth="1.2" />
            <line x1="10" y1="70" x2="105" y2="70" stroke="#475569" strokeWidth="1.2" />

            {/* Chiave di Sol (Violino) */}
            <text x="14" y="68" fill="#1e293b" fontSize="42" fontFamily="serif">𝄞</text>

            {/* Nota LA nel 2° spazio (tra y=46 e y=58 -> y=52) */}
            <g transform="translate(75, 52)">
              <ellipse cx="0" cy="0" rx="6.5" ry="4.5" fill="#dc2626" transform="rotate(-20 0 0)" />
              <line x1="5.5" y1="0" x2="5.5" y2="-28" stroke="#dc2626" strokeWidth="2" />
            </g>
          </g>

          {/* Stereo Hi-Fi */}
          <g transform="translate(145, 25)">
            <rect x="20" y="20" width="190" height="85" fill="#fcfcfc" stroke="#374151" strokeWidth="3" rx="6" />
            <circle cx="55" cy="62" r="25" fill="#e5e7eb" stroke="#374151" strokeWidth="1.8" />
            <circle cx="55" cy="62" r="11" fill="#1f2937" />
            <circle cx="175" cy="62" r="25" fill="#e5e7eb" stroke="#374151" strokeWidth="1.8" />
            <circle cx="175" cy="62" r="11" fill="#1f2937" />
            <rect x="100" y="35" width="30" height="15" fill="#d1d5db" rx="1.5" />
          </g>

          <text x="385" y="90" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">P S I</text>
        </svg>
      );
    }

    if (issueId === 2) {
      if (item.id === 'a') { // OCCHIALI
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Due Occhi */}
            <g transform="translate(15, 25)">
              {/* Occhio 1 */}
              <g>
                <path d="M 10 50 Q 52 18 95 50 Q 52 82 10 50 Z" fill="white" stroke="#374151" strokeWidth="2.5" />
                <circle cx="52" cy="50" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                <circle cx="52" cy="50" r="7" fill="black" />
              </g>
              {/* Occhio 2 */}
              <g transform="translate(95, 0)">
                <path d="M 10 50 Q 52 18 95 50 Q 52 82 10 50 Z" fill="white" stroke="#374151" strokeWidth="2.5" />
                <circle cx="52" cy="50" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                <circle cx="52" cy="50" r="7" fill="black" />
              </g>
            </g>

            <text x="220" y="90" fill="var(--se-red)" fontSize="34" fontFamily="var(--font-serif)" fontWeight="bold">+</text>

            {/* Farfalla con due frecce che indicano le ALI */}
            <g transform="translate(260, 20)">
              {/* Farfalla */}
              <path d="M 70 55 Q 20 10 10 50 Q 25 85 70 65 Z" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
              <path d="M 80 55 Q 130 10 140 50 Q 125 85 80 65 Z" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
              <ellipse cx="75" cy="58" rx="6" ry="25" fill="#1e293b" />
              <circle cx="75" cy="30" r="6" fill="#1e293b" />
              <path d="M 73 26 Q 60 12 55 10 M 77 26 Q 90 12 95 10" stroke="#1e293b" strokeWidth="2" fill="none" />

              {/* Freccia 1 (indica Ala Sinistra) */}
              <line x1="-5" y1="15" x2="35" y2="40" stroke="#dc2626" strokeWidth="3" />
              <polygon points="35,40 23,34 27,45" fill="#dc2626" />

              {/* Freccia 2 (indica Ala Destra) */}
              <line x1="155" y1="15" x2="115" y2="40" stroke="#dc2626" strokeWidth="3" />
              <polygon points="115,40 123,45 127,34" fill="#dc2626" />
            </g>
          </svg>
        );
      }
      if (item.id === 'b') { // LA MIRA
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <text x="50" y="95" fill="var(--se-red)" fontSize="42" fontFamily="var(--font-serif)" fontWeight="bold">L A</text>

            {/* Bersaglio / Mira */}
            <g transform="translate(190, 15)">
              <circle cx="75" cy="65" r="50" fill="none" stroke="#374151" strokeWidth="3" />
              <circle cx="75" cy="65" r="34" fill="none" stroke="#374151" strokeWidth="2" />
              <circle cx="75" cy="65" r="18" fill="#ef4444" />
              <circle cx="75" cy="65" r="6" fill="white" />
              <line x1="75" y1="5" x2="75" y2="125" stroke="#374151" strokeWidth="2" />
              <line x1="15" y1="65" x2="135" y2="65" stroke="#374151" strokeWidth="2" />
            </g>
          </svg>
        );
      }
      // ANGOLO KAPPA
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Disegno dell'Angolo */}
          <g transform="translate(40, 25)">
            <rect x="0" y="0" width="130" height="100" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" rx="4" />
            <path d="M 20 85 L 110 85 L 85 20" stroke="#0284c7" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 50 85 A 30 30 0 0 0 42 61" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 2" />
            <text x="65" y="75" fill="#ef4444" fontSize="14" fontWeight="bold">α</text>
          </g>

          <text x="210" y="90" fill="var(--se-red)" fontSize="34" fontFamily="var(--font-serif)" fontWeight="bold">K A P P A</text>
        </svg>
      );
    }

    if (issueId === 3) {
      if (item.id === 'a') { // SINOTTOFORO
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <text x="40" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">S I</text>
            {/* Numero 9 (NOVE V=TT) */}
            <g transform="translate(100, 30)">
              <text x="35" y="70" fill="#1e293b" fontSize="55" fontFamily="var(--font-serif)" fontWeight="bold">9</text>
              <text x="35" y="5" fill="var(--se-red)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">V = TT</text>
            </g>
            <text x="180" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">O</text>
            {/* Disegno Foro / Galleria */}
            <g transform="translate(240, 35)">
              <ellipse cx="60" cy="50" rx="45" ry="35" fill="#334155" stroke="#1e293b" strokeWidth="2" />
              <ellipse cx="60" cy="50" rx="25" ry="18" fill="#0f172a" />
            </g>
          </svg>
        );
      }
      if (item.id === 'b') { // FUSIONE
        return (
          <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <text x="50" y="90" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">F</text>
            {/* Fuso (FUSO O=I) */}
            <g transform="translate(90, 30)">
              <ellipse cx="40" cy="50" rx="14" ry="40" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" />
              <line x1="40" y1="0" x2="40" y2="100" stroke="#334155" strokeWidth="2" />
              <text x="40" y="5" fill="var(--se-red)" fontSize="15" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">O = I</text>
            </g>
            <text x="180" y="90" fill="var(--se-red)" fontSize="32" fontFamily="var(--font-serif)" fontWeight="bold">O N E</text>
          </svg>
        );
      }
      // RETINA ANOMALA
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Due Rete (RETI) */}
          <g transform="translate(15, 30)">
            {/* Rete 1 */}
            <rect x="10" y="20" width="60" height="45" fill="none" stroke="#374151" strokeWidth="2" />
            <path d="M 10 20 L 40 65 M 35 20 L 65 65 M 60 20 L 30 65" stroke="#9ca3af" strokeWidth="1" />
            {/* Rete 2 */}
            <rect x="80" y="20" width="60" height="45" fill="none" stroke="#374151" strokeWidth="2" />
            <path d="M 80 20 L 110 65 M 105 20 L 135 65 M 130 20 L 100 65" stroke="#9ca3af" strokeWidth="1" />
          </g>
          <text x="165" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">N A</text>
          {/* Anatra (ANATRA TRA=MALA) */}
          <g transform="translate(240, 30)">
            <ellipse cx="45" cy="60" rx="30" ry="20" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
            <circle cx="65" cy="40" r="14" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
            <path d="M 77 40 L 90 43 L 77 48 Z" fill="#f97316" />
            <text x="50" y="10" fill="var(--se-red)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">TRA = MALA</text>
          </g>
        </svg>
      );
    }

    // Issue 4
    if (item.id === 'a') { // CRISTALLINO
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <text x="40" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">C</text>
          {/* Cresta (E=I) */}
          <g transform="translate(75, 30)">
            <path d="M 20 60 Q 30 20 40 40 Q 50 10 60 40 Q 70 20 80 60 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            <text x="50" y="5" fill="var(--se-red)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">E = I</text>
          </g>
          <text x="175" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">S T</text>
          {/* Gallo (O=I) */}
          <g transform="translate(240, 25)">
            <ellipse cx="40" cy="55" rx="25" ry="20" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <circle cx="58" cy="35" r="12" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <path d="M 68 35 L 78 38 L 68 42 Z" fill="#f97316" />
            <text x="40" y="5" fill="var(--se-red)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">O = I</text>
          </g>
          <text x="340" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">N O</text>
        </svg>
      );
    }
    if (item.id === 'b') { // CAMPO VISIVO
      return (
        <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Campo Verde */}
          <g transform="translate(40, 30)">
            <rect x="20" y="20" width="100" height="60" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" rx="4" />
            <line x1="20" y1="80" x2="120" y2="80" stroke="#15803d" strokeWidth="3" />
          </g>
          <text x="175" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">V I</text>
          {/* Viso (SO=VO) */}
          <g transform="translate(250, 30)">
            <circle cx="45" cy="45" r="30" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
            <circle cx="35" cy="40" r="4" fill="#431407" />
            <circle cx="55" cy="40" r="4" fill="#431407" />
            <path d="M 35 60 Q 45 68 55 60" stroke="#431407" strokeWidth="2" fill="none" />
            <text x="45" y="5" fill="var(--se-red)" fontSize="14" fontFamily="var(--font-mono)" fontWeight="bold" textAnchor="middle">SO = VO</text>
          </g>
        </svg>
      );
    }
    // RIFRAZIONE
    return (
      <svg viewBox="0 0 500 160" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <text x="50" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">R I</text>
        {/* Raggio luminoso */}
        <g transform="translate(110, 30)">
          <path d="M 10 20 L 60 50 L 110 80" stroke="#ef4444" strokeWidth="4" fill="none" />
          <polygon points="100,70 115,82 95,85" fill="#ef4444" />
        </g>
        <text x="240" y="90" fill="var(--se-red)" fontSize="30" fontFamily="var(--font-serif)" fontWeight="bold">A Z I O N E</text>
      </svg>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      <h2 className="game-title">Trittico di Rebus</h2>
      <p className="game-subtitle">
        Tre rebus d'autore illustrati! Decifra le immagini, le chiavi ed i valori di sostituzione per trovare la soluzione ortottica.
      </p>

      {isCompleted && (
        <div className="feedback-modal" style={{ position: 'relative', top: 0, transform: 'none', margin: '0 auto 10px auto' }}>
          <CheckCircle size={18} />
          <span>Trittico di Rebus risolto! Hai completato la pagina con successo!</span>
        </div>
      )}

      {data.items.map((item: RebusItem) => {
        const isItemSolved = solved[item.id];
        const error = errors[item.id];
        const answerVal = answers[item.id] || "";

        return (
          <div key={item.id} style={{
            border: '1.5px solid var(--border-color)',
            padding: '20px',
            borderRadius: '6px',
            backgroundColor: 'var(--paper-bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px dashed var(--border-color)',
              paddingBottom: '8px',
              fontFamily: 'var(--font-typewriter)',
              fontSize: '15px',
              fontWeight: 'bold',
              color: 'var(--se-blue)'
            }}>
              <span>{item.title}</span>
              <span>Diagramma: {item.diagram}</span>
            </div>

            {error && (
              <div style={{
                backgroundColor: '#fee2e2',
                border: '1px solid #fca5a5',
                color: '#991b1b',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '13px',
                fontFamily: 'var(--font-typewriter)',
                width: '100%',
                textAlign: 'center'
              }}>
                <AlertCircle size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                <span>{error}</span>
              </div>
            )}

            <div className="rebus-svg-wrapper">
              {renderRebusSvg(item)}
            </div>

            <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px' }}>
              <input
                type="text"
                value={answerVal}
                onChange={(e) => setAnswers(prev => ({ ...prev, [item.id]: e.target.value }))}
                placeholder={isItemSolved ? "Risolto!" : "Scrivi la soluzione..."}
                className="rebus-input"
                disabled={isItemSolved}
                style={{
                  borderColor: isItemSolved ? 'var(--success-color)' : 'var(--border-color)',
                  color: isItemSolved ? 'var(--success-color)' : 'black',
                  fontWeight: isItemSolved ? 'bold' : 'normal'
                }}
              />
              {!isItemSolved ? (
                <button
                  onClick={() => handleVerify(item.id, item.expected, item.hint)}
                  className="rebus-button"
                >
                  Verifica
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--success-color)', fontWeight: 'bold', fontSize: '13px' }}>
                  <CheckCircle size={16} style={{ marginRight: '4px' }} /> Risolto
                </div>
              )}
              {!isItemSolved && (
                <button
                  onClick={() => handleReveal(item.id, item.solutionFormatted)}
                  className="nav-button"
                  style={{ padding: '6px', fontSize: '11px', borderStyle: 'dashed' }}
                >
                  Aiuto
                </button>
              )}
            </div>
          </div>
        );
      })}

      {!isCompleted && (
        <button
          className="nav-button"
          onClick={handleRevealAll}
          style={{ width: '100%', justifyContent: 'center', borderStyle: 'dashed', marginTop: '10px' }}
        >
          Rivela Soluzione Completa del Trittico
        </button>
      )}
    </div>
  );
};
