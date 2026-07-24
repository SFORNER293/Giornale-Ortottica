export interface TargetNode {
  word: string;
  r: number;
  angle: number;
}

export interface TargetData {
  correctChain: string[];
  nodes: TargetNode[];
  transitions: { [key: string]: string };
  startWord: string;
  endWord: string;
  subtitle: string;
}

export interface CrosswordClue {
  number: number;
  direction: 'across' | 'down';
  word: string;
  clue: string;
  row: number;
  col: number;
}

export interface CrosswordData {
  clues: CrosswordClue[];
  gridSize: number;
}

export interface WordPlacement {
  word: string;
  coords: [number, number][];
}

export interface WordSearchData {
  wordList: string[];
  placements: WordPlacement[];
  secretPhrase: string;
  secretPhraseDisplay: string;
  gridSize: number;
}

export interface Difference {
  id: number;
  x: number;
  y: number;
  radius: number;
  description: string;
}

export interface SpotDifferencesData {
  title: string;
  subtitle: string;
  differences: Difference[];
  sceneType: 'studio_fissazione' | 'studio_strabismo' | 'cabinet_sinottoforo' | 'laboratorio_oftalmico';
}

export interface RebusItem {
  id: 'a' | 'b' | 'c';
  title: string;
  diagram: string;
  expected: string;
  solutionFormatted: string;
  hint: string;
  graphicDescription: string;
}

export interface RebusData {
  items: RebusItem[];
}

export interface ClinicalCase {
  id: string;
  title: string;
  patientInfo: string;
  history: string;
  examination: string;
  question: string;
  solution: string;
}

export interface ClinicalDeepDive {
  title: string;
  category: string;
  content: string;
}

export interface CasesAndFactsData {
  clinicalCases: ClinicalCase[];
  deepDives: ClinicalDeepDive[];
  clinicalNote: {
    title: string;
    content: string;
  };
}

export interface WeeklyIssue {
  id: number;
  number: number;
  dateStr: string;
  title: string;
  theme: string;
  slogan: string;
  badgeColor: string;
  targetData: TargetData;
  crosswordData: CrosswordData;
  wordSearchData: WordSearchData;
  spotDifferencesData: SpotDifferencesData;
  rebusData: RebusData;
  casesAndFactsData: CasesAndFactsData;
}

export const ISSUES_DATA: WeeklyIssue[] = [
  // ==========================================
  // SETTIMANA 1 (N. 1 - Lunedì 3 Agosto 2026)
  // Tema: Fissazione, Saccadi & Oculomotricità
  // ==========================================
  {
    id: 1,
    number: 1,
    dateStr: "Lunedì 3 Agosto 2026",
    title: "Fissazione & Oculomotricità",
    theme: "Saccadi, Inseguimenti, Fovea & Ambliopia",
    slogan: "La rivista di riabilitazione visiva che vanta innumerevoli tentativi di accomodazione!",
    badgeColor: "#0b457e",
    targetData: {
      subtitle: "Procedi dal primo termine esterno (OTTOTIPO) fino al centro (VISIONALE) collegando esclusivamente concetti clinici ed anatomici dell'oculomotricità!",
      startWord: "Ottotipo",
      endWord: "Visionale",
      correctChain: [
        "Ottotipo", "Acuità", "Fovea", "Saccadi", "Inseguimento", "Fissazione", "Ambliopia", "Occlusione", "Ortottica", "Visionale"
      ],
      transitions: {
        "Ottotipo-Acuità": "Misurazione clinica (l'ottotipo misura l'acutezza visiva in decimi)",
        "Acuità-Fovea": "Anatomia retinica (l'acuità nitida 10/10 è data dalla massima concentrazione di coni in fovea)",
        "Fovea-Saccadi": "Fisiologia oculomotoria (le saccadi orientano rapidamente la fovea sul bersaglio)",
        "Saccadi-Inseguimento": "Sistemi motori oculari (i due principali sistemi di tracciamento dello sguardo)",
        "Inseguimento-Fissazione": "Stabilità visiva (l'inseguimento guidato si conclude col mantenimento della fissazione)",
        "Fissazione-Ambliopia": "Fisiopatologia (la mancanza di fissazione stabile o la soppressione origina l'ambliopia)",
        "Ambliopia-Occlusione": "Terapia clinica (l'occlusione dell'occhio dominante è il trattamento primario dell'occhio pigro)",
        "Occlusione-Ortottica": "Prassi professionale (l'ortottista pianifica e monitora il bendaggio occlusivo)",
        "Ortottica-Visionale": "Finalità riabilitativa (l'ortottica mira al ripristino dell'efficienza visiva globale)"
      },
      nodes: [
        { word: "Ottotipo", r: 200, angle: 0 },
        { word: "Acuità", r: 200, angle: 72 },
        { word: "Fovea", r: 200, angle: 144 },
        { word: "Pupilla", r: 200, angle: 216 },
        { word: "Cristallino", r: 200, angle: 288 },
        { word: "Saccadi", r: 155, angle: 36 },
        { word: "Inseguimento", r: 155, angle: 108 },
        { word: "Fissazione", r: 155, angle: 180 },
        { word: "Retina", r: 155, angle: 252 },
        { word: "Nervo", r: 155, angle: 324 },
        { word: "Ambliopia", r: 115, angle: 0 },
        { word: "Occlusione", r: 115, angle: 90 },
        { word: "Macula", r: 115, angle: 180 },
        { word: "Ottica", r: 115, angle: 270 },
        { word: "Ortottica", r: 75, angle: 45 },
        { word: "Bastoncini", r: 75, angle: 160 },
        { word: "Visus", r: 75, angle: 280 },
        { word: "Visionale", r: 0, angle: 0 }
      ]
    },
    crosswordData: {
      gridSize: 15,
      clues: [
        // Orizzontali
        { number: 1, direction: 'across', word: 'ORTOTTICA', clue: 'Scienza e professione sanitaria della riabilitazione visiva.', row: 0, col: 0 },
        { number: 4, direction: 'across', word: 'BUIO', clue: 'Assenza di luce che causa la midriasi pupillare.', row: 2, col: 8 },
        { number: 5, direction: 'across', word: 'TESTI', clue: 'Tabelle e prove di lettura impiegate nelle visite ortottiche.', row: 4, col: 4 },
        { number: 6, direction: 'across', word: 'PRISMA', clue: 'Lente a cuneo usata per deviare il fascio luminoso.', row: 6, col: 0 },
        { number: 7, direction: 'across', word: 'ACUTA', clue: 'Qualità della visione foveale distinta (10/10).', row: 8, col: 8 },
        { number: 8, direction: 'across', word: 'SACCADI', clue: 'Movimenti oculari balistici veloci per spostare la fissazione.', row: 10, col: 0 },
        { number: 9, direction: 'across', word: 'FOVEA', clue: 'Depressione centrale della retina ad altissima acuità.', row: 12, col: 0 },
        { number: 10, direction: 'across', word: 'PEV', clue: 'Potenziali Evocati Visivi per lo studio della via ottica.', row: 12, col: 6 },
        { number: 11, direction: 'across', word: 'LUCE', clue: 'Stimolo luminoso primario percepito dalla retina.', row: 14, col: 0 },
        { number: 12, direction: 'across', word: 'ERG', clue: 'Elettroretinogramma per registrare la risposta retinica.', row: 14, col: 6 },
        { number: 13, direction: 'across', word: 'VISUS', clue: 'Il valore di acuità visiva espresso in decimi.', row: 14, col: 10 },

        // Verticali
        { number: 1, direction: 'down', word: 'OTTOTIPO', clue: 'Tabellone con lettere o simboli per misurare la vista.', row: 0, col: 0 },
        { number: 2, direction: 'down', word: 'TRATTAMENTO', clue: 'Percorso terapeutico di esercizio e rieducazione visiva.', row: 0, col: 4 },
        { number: 3, direction: 'down', word: 'AMBLIOPIA', clue: 'Deficit visivo monolaterale comunemente detto occhio pigro.', row: 0, col: 8 },
        { number: 14, direction: 'down', word: 'FIXAZIONE', clue: 'Mantenimento stabile dello sguardo sull oggetto mirato.', row: 0, col: 13 },
        { number: 15, direction: 'down', word: 'INSEGUIMENTO', clue: 'Movimento oculare lento continuo di tracciamento.', row: 2, col: 14 },
        { number: 16, direction: 'down', word: 'BASTONCELLI', clue: 'Fotorecettori retinici per la visione crepuscolare.', row: 4, col: 11 },
        { number: 17, direction: 'down', word: 'RETINA', clue: 'Membrana nervosa fotosensibile del bulbo oculare.', row: 6, col: 6 },
        { number: 18, direction: 'down', word: 'PUPILLA', clue: 'Foro centrale dell iride che varia diametro con la luce.', row: 8, col: 12 },
        { number: 19, direction: 'down', word: 'OCCHIO', clue: 'L organo sensoriale primario dell apparato visivo.', row: 9, col: 9 },
        { number: 9, direction: 'down', word: 'CONI', clue: 'Fotorecettori della fovea per i colori e la visione diurna.', row: 10, col: 2 },
        { number: 10, direction: 'down', word: 'DOPPIA', clue: 'Dicesi della percezione duplice o diplopia.', row: 10, col: 5 }
      ]
    },
    wordSearchData: {
      gridSize: 12,
      wordList: ["STRABISMO", "AMBLIOPIA", "VISIONE", "SACCADI", "RETINA", "FOVEA", "PRISMA", "LENTE", "CORNEA", "OCCHIO", "MIRA"],
      placements: [
        { word: "STRABISMO", coords: [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8]] },
        { word: "AMBLIOPIA", coords: [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8]] },
        { word: "VISIONE", coords: [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]] },
        { word: "SACCADI", coords: [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6]] },
        { word: "RETINA", coords: [[11,0],[11,1],[11,2],[11,3],[11,4],[11,5]] },
        { word: "FOVEA", coords: [[0,11],[1,11],[2,11],[3,11],[4,11]] },
        { word: "PRISMA", coords: [[5,10],[6,10],[7,10],[8,10],[9,10],[10,10]] },
        { word: "LENTE", coords: [[1,9],[2,9],[3,9],[4,9],[5,9]] },
        { word: "CORNEA", coords: [[6,8],[7,8],[8,8],[9,8],[10,8],[11,8]] },
        { word: "OCCHIO", coords: [[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]] },
        { word: "MIRA", coords: [[4,4],[4,5],[4,6],[4,7]] }
      ],
      secretPhrase: "LAVISTAEUNDONOPREZIOSOEDEIMPORTANTEPRENDERSENECURAOGNIGIORNOCONAIORAO",
      secretPhraseDisplay: "LA VISTA È UN DONO PREZIOSO ED È IMPORTANTE PRENDERSENE CURA OGNI GIORNO CON AIORAO"
    },
    spotDifferencesData: {
      title: "Trova le Differenze: Studio di Fissazione",
      subtitle: "Ci sono 7 differenze tra i due disegni dello studio ortottico. Clicca sui particolari diversi!",
      sceneType: 'studio_fissazione',
      differences: [
        { id: 1, x: 90, y: 75, radius: 22, description: "Orientamento della lettera E sull'ottotipo" },
        { id: 2, x: 270, y: 120, radius: 22, description: "Colore del logo Vision AI sullo schermo" },
        { id: 3, x: 330, y: 155, radius: 18, description: "Colore del prisma sul tavolo" },
        { id: 4, x: 40, y: 205, radius: 20, description: "Foglia superiore della pianta in vaso" },
        { id: 5, x: 280, y: 35, radius: 22, description: "Sole dietro la nuvola fuori dalla finestra" },
        { id: 6, x: 160, y: 250, radius: 22, description: "Gamba centrale dello sgabello" },
        { id: 7, x: 180, y: 52, radius: 18, description: "Colore dell'iride nel quadro dell'occhio" }
      ]
    },
    rebusData: {
      items: [
        { id: 'a', title: "REBUS A", diagram: "1' 6   5", expected: "LOCCHIOPIGRO", solutionFormatted: "L'OCCHIO PIGRO", hint: "Lettera L' + Disegno dell'Occhio + Lettere P I + Disegno della Gru (U=O)", graphicDescription: "L' + [Disegno Occhio] + P I + [Disegno Gru (U=O)]" },
        { id: 'b', title: "REBUS B", diagram: "4   2   6", expected: "MIRALARETINA", solutionFormatted: "MIRA LA RETINA", hint: "Disegno del Bersaglio/Mira + Lettere L A + Rete da tennis (E=I) + N A", graphicDescription: "[Disegno Mira/Bersaglio] + L A + [Disegno Rete (E=I)] + N A" },
        { id: 'c', title: "REBUS C", diagram: "2   9", expected: "LASTEREOPSI", solutionFormatted: "LA STEREOPSI", hint: "Lettere L A + Disegno dello Stereo Vintage + Lettere P S I", graphicDescription: "L A + [Disegno Stereo Hi-Fi] + P S I" }
      ]
    },
    casesAndFactsData: {
      clinicalCases: [
        {
          id: "case-1",
          title: "Caso Clinico #1: Ambliopia Anisometropica Pediatrica",
          patientInfo: "Paziente: Bambino di 4 anni e mezzo.",
          history: "Anamnesi: Riscontrato all'esame dello screening visivo prescolare con riduzione dell'acuità visiva monolaterale a sinistra (OS: 2/10; OD: 10/10).",
          examination: "Esame Ortottico: Rifrazione in ciclopegia: OD +1.00D sf; OS +4.75D sf -1.00D cil ax 90°. Cover test evidenzia microtropia dell'occhio sinistro con soppressione foveale e fissazione parafoveale instabile.",
          question: "Domanda Clinica: Qual è la diagnosi precisa e il protocollo di riabilitazione ortottica consigliato?",
          solution: "Diagnosi: Ambliopia Anisometropica Severa dell'occhio sinistro secondaria a ipermetropia elevata. Gestione Terapeutica: 1) Prescrizione immediata e continuativa della correzione ottica totale; 2) Terapia occlusiva dell'occhio dominante (OD) per 4-6 ore al giorno durante compiti visivi ravvicinati; 3) Esercizi ortottici dedicati alla stabilità di fissazione foveale e movimenti saccadici guidati con Vision AI."
        }
      ],
      deepDives: [
        {
          title: "La Fovea e il Controllo Saccadico",
          category: "Fisiologia Oculomotoria",
          content: "La fovea centrale presenta un diametro di circa 1.5 mm ma concentra quasi la metà delle fibre del nervo ottico dedicate al dettaglio visivo. Le saccadi consentono lo spostamento balistico del centro foveale sul bersaglio a velocità fino a 900°/s. Durante la saccade, il fenomeno della soppressione saccadica blocca temporaneamente l'input retinico percettivo per evitare la sensazione di sfocatura."
        },
        {
          title: "Periodo Plastico e Terapia Occlusiva",
          category: "Ortottica Clinica",
          content: "La neuroplasticità visiva raggiunge il massimo sviluppo nei primi 7-8 anni di vita. La diagnosi precoce dell'ambliopia permette il completo recupero funzionale dell'occhio deprivato attraverso il dosaggio personalizzato dell'occlusione e la stimolazione visuo-motoria adattiva."
        }
      ],
      clinicalNote: {
        title: "Vision AI & Rieducazione Foveale",
        content: "I moduli di tracciamento saccadico di Vision AI combinano esercizi visuo-motori a contrasto controllato per promuovere il recupero dell'acuità foveale durante la terapia occlusiva."
      }
    }
  },

  // ==========================================
  // SETTIMANA 2 (N. 2 - Lunedì 10 Agosto 2026)
  // Tema: Strabismo & Deviazioni Oculari
  // ==========================================
  {
    id: 2,
    number: 2,
    dateStr: "Lunedì 10 Agosto 2026",
    title: "Strabismo & Deviazioni",
    theme: "Cover Test, Esotropia, Exotropia & Prismi",
    slogan: "Perché allineare lo sguardo è un'arte che richiede la giusta diottria prismatica!",
    badgeColor: "#c22026",
    targetData: {
      subtitle: "Collega i termini clinici partendo dall'OCCLUSORE per raggiungere lo STRABISMO attraverso passaggi teorici di diagnosi e terapia ortottica!",
      startWord: "Occlusore",
      endWord: "Strabismo",
      correctChain: [
        "Occlusore", "Cover Test", "Tropia", "Esotropia", "Angolo Kappa", "Hess-Lancaster", "Paralisi", "Stecca Prismi", "Diottrie", "Strabismo"
      ],
      transitions: {
        "Occlusore-Cover Test": "Strumento diagnostico (l'occlusore manuale si usa durante l'esecuzione del Cover Test)",
        "Cover Test-Tropia": "Esito diagnostico (il Cover-Uncover evidenzia la deviazione oculare manifesta o tropia)",
        "Tropia-Esotropia": "Classificazione (l'esotropia è la tropia convergente manifesta più frequente in età pediatrica)",
        "Esotropia-Angolo Kappa": "Diagnosi differenziale (l'angolo Kappa distingue una vera esotropia da uno pseudo-strabismo)",
        "Angolo Kappa-Hess-Lancaster": "Esame instrumental (lo Schermo di Hess mappa le deviazioni e le ipofunzioni muscolari)",
        "Hess-Lancaster-Paralisi": "Quadri clinici (lo schermo evidenzia i deficit dei muscoli nelle paralisi oculomotorie)",
        "Paralisi-Stecca Prismi": "Quantificazione (la deviazione paralitica o restrittiva viene misurata con la stecca dei prismi)",
        "Stecca Prismi-Diottrie": "Unità di misura (il potere di deviazione del prisma si misura in diottrie prismatiche Δ)",
        "Diottrie-Strabismo": "Valutazione chirurgico-ortottica (la misura dell'angolo in diottrie guida la terapia dello strabismo)"
      },
      nodes: [
        { word: "Occlusore", r: 200, angle: 0 },
        { word: "Cover Test", r: 200, angle: 72 },
        { word: "Tropia", r: 200, angle: 144 },
        { word: "Bagolini", r: 200, angle: 216 },
        { word: "Ortoforia", r: 200, angle: 288 },
        { word: "Esotropia", r: 155, angle: 36 },
        { word: "Angolo Kappa", r: 155, angle: 108 },
        { word: "Hess-Lancaster", r: 155, angle: 180 },
        { word: "Exotropia", r: 155, angle: 252 },
        { word: "Diplopia", r: 155, angle: 324 },
        { word: "Paralisi", r: 115, angle: 0 },
        { word: "Stecca Prismi", r: 115, angle: 90 },
        { word: "Foria", r: 115, angle: 180 },
        { word: "Deviazione", r: 115, angle: 270 },
        { word: "Diottrie", r: 75, angle: 45 },
        { word: "Nistagmo", r: 75, angle: 160 },
        { word: "Retto", r: 75, angle: 280 },
        { word: "Strabismo", r: 0, angle: 0 }
      ]
    },
    crosswordData: {
      gridSize: 15,
      clues: [
        // Orizzontali
        { number: 1, direction: 'across', word: 'ESOTROPIA', clue: 'Deviazione oculare manifesta verso l interno (convergente).', row: 0, col: 0 },
        { number: 4, direction: 'across', word: 'COVER', clue: 'Test fondamentale eseguito con occlusore per rilevare lo strabismo.', row: 2, col: 8 },
        { number: 5, direction: 'across', word: 'KAPPA', clue: 'L angolo formato tra l asse visivo e l asse pupillare dell occhio.', row: 4, col: 4 },
        { number: 6, direction: 'across', word: 'STECCA', clue: 'Righello di prismi graduati per misurare la deviazione strabica.', row: 6, col: 0 },
        { number: 7, direction: 'across', word: 'HESS', clue: 'Schermo diagnostico svizzero usato per le paresi oculomotorie.', row: 8, col: 8 },
        { number: 8, direction: 'across', word: 'EXOTROPIA', clue: 'Deviazione oculare manifesta verso l esterno (divergente).', row: 10, col: 0 },
        { number: 9, direction: 'across', word: 'FORIA', clue: 'Deviazione oculare latente che emerge interrompendo la fusione.', row: 12, col: 0 },
        { number: 10, direction: 'across', word: 'TORSIONE', clue: 'Deviazione ciclotropica di rotazione attorno all asse visivo.', row: 12, col: 7 },
        { number: 11, direction: 'across', word: 'MICROTROPIA', clue: 'Piccola deviazione strabica manifesta inferiore a 5 diottrie.', row: 14, col: 0 },

        // Verticali
        { number: 1, direction: 'down', word: 'ELEVAZIONE', clue: 'Movimento oculare verso l alto controllato dal retto superiore.', row: 0, col: 0 },
        { number: 2, direction: 'down', word: 'ORTOFORIA', clue: 'Il perfetto allineamento degli assi visivi senza deviazioni.', row: 0, col: 4 },
        { number: 3, direction: 'down', word: 'PARALISI', clue: 'Deficit motorio di un muscolo extraoculare d origine nervosa.', row: 0, col: 8 },
        { number: 14, direction: 'down', word: 'OCCLUSORE', clue: 'Strumento a paletta per la copertura nell esecuzione del cover test.', row: 0, col: 13 },
        { number: 15, direction: 'down', word: 'DEVIATOMETRO', clue: 'Apparecchio graduato per la misurazione dell angolo di deviazione.', row: 2, col: 14 },
        { number: 16, direction: 'down', word: 'HYPERTROPIA', clue: 'Deviazione manifesta di un occhio verso l alto rispetto all altro.', row: 4, col: 11 },
        { number: 17, direction: 'down', word: 'SACCADE', clue: 'Movimento oculare rapido di fissazione diretto verso la mira.', row: 6, col: 6 },
        { number: 18, direction: 'down', word: 'CONVERGENZA', clue: 'Movimento simultaneo convergente degli occhi verso l interno.', row: 3, col: 2 },
        { number: 19, direction: 'down', word: 'DIVERGENZA', clue: 'Movimento simultaneo divergente degli occhi verso l esterno.', row: 5, col: 10 }
      ]
    },
    wordSearchData: {
      gridSize: 12,
      wordList: ["COVER", "TEST", "ESOTROPIA", "EXOTROPIA", "KAPPA", "HESS", "BAGOLINI", "ORTOFORIA", "DIPLOPIA", "PRISMA", "STECCA"],
      placements: [
        { word: "ESOTROPIA", coords: [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8]] },
        { word: "EXOTROPIA", coords: [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8]] },
        { word: "ORTOFORIA", coords: [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8]] },
        { word: "BAGOLINI", coords: [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7]] },
        { word: "DIPLOPIA", coords: [[10,0],[10,1],[10,2],[10,3],[10,4],[10,5],[10,6],[10,7]] },
        { word: "COVER", coords: [[0,11],[1,11],[2,11],[3,11],[4,11]] },
        { word: "STECCA", coords: [[5,10],[6,10],[7,10],[8,10],[9,10],[10,10]] },
        { word: "KAPPA", coords: [[1,9],[2,9],[3,9],[4,9],[5,9]] },
        { word: "PRISMA", coords: [[6,8],[7,8],[8,8],[9,8],[10,8],[11,8]] },
        { word: "TEST", coords: [[1,2],[1,3],[1,4],[1,5]] },
        { word: "HESS", coords: [[4,4],[4,5],[4,6],[4,7]] }
      ],
      secretPhrase: "ILCOVERTESTEIPRISMISONOGLISTRUMENTICHIAVENELLAVALUTAZIONEDELLOSTRABISMO",
      secretPhraseDisplay: "IL COVER TEST E I PRISMI SONO GLI STRUMENTI CHIAVE NELLA VALUTAZIONE DELLO STRABISMO"
    },
    spotDifferencesData: {
      title: "Trova le Differenze: Ambito Strabologia & Prismi",
      subtitle: "Scova le 7 anomalie tra il disegno A e B nello studio dedicato alla diagnosi dello strabismo!",
      sceneType: 'studio_strabismo',
      differences: [
        { id: 1, x: 80, y: 70, radius: 24, description: "Disegno dello Schermo di Hess (griglia rossa vs verde)" },
        { id: 2, x: 260, y: 120, radius: 20, description: "Numerazione della stecca dei prismi sul tavolo" },
        { id: 3, x: 320, y: 155, radius: 18, description: "Orientamento della lente a vetro striato di Bagolini" },
        { id: 4, x: 50, y: 200, radius: 20, description: "Filtro rosso di occlusione inserito nella montatura di prova" },
        { id: 5, x: 280, y: 40, radius: 22, description: "Posizione dello sguardo della mascotte (esotropia vs centrato)" },
        { id: 6, x: 160, y: 245, radius: 22, description: "Luce della torcia di fissazione tascabile (accesa vs spenta)" },
        { id: 7, x: 185, y: 55, radius: 18, description: "Simbolo dell'angolo Kappa sul tabellone a parete" }
      ]
    },
    rebusData: {
      items: [
        { id: 'a', title: "REBUS A", diagram: "5   4", expected: "COVERTEST", solutionFormatted: "COVER TEST", hint: "Lettera C + Disegno Uovo (OVO V=V) + Lettere E R + Disegno Testa (A=T)", graphicDescription: "C + [Disegno Uovo (V=V)] + E R + [Disegno Testa (A=T)]" },
        { id: 'b', title: "REBUS B", diagram: "9", expected: "ESOTROPIA", solutionFormatted: "ESOTROPIA", hint: "Lettera E + Disegno del Sole (LE=O) + Lettere T R + Disegno Tabellone (OPIA)", graphicDescription: "E + [Disegno Sole (LE=O)] + T R + [Disegno Ottotipo/OPIA]" },
        { id: 'c', title: "REBUS C", diagram: "6   5", expected: "ANGOLOKAPPA", solutionFormatted: "ANGOLO KAPPA", hint: "Disegno di un Angolo + Lettere K A P P A", graphicDescription: "[Disegno Angolo] + K A P P A" }
      ]
    },
    casesAndFactsData: {
      clinicalCases: [
        {
          id: "case-2",
          title: "Caso Clinico #2: Paresi dell'Abducente (VI CN) e Diplopia Acuta",
          patientInfo: "Paziente: Uomo di 38 anni.",
          history: "Anamnesi: Riferisce insorgenza acuta di diplopia orizzontale binoculare avvertita principalmente durante la visione verso destra a seguito di trauma.",
          examination: "Esame Ortottico: Cover test evidenzia esotropia dell'occhio destro in posizione primaria (+18Δ) che aumenta significativamente nella destroversione. Lo Schermo di Hess-Lancaster mostra marcata ipofunzione del muscolo Retto Laterale destro e iperfunzione del Retto Mediale sinistro.",
          question: "Domanda Clinica: Qual è la diagnosi e la strategia di compensazione prismatica immediata?",
          solution: "Diagnosi: Paresi del VI nervo cranico (abducente) dell'occhio destro. Trattamento Ortottico: 1) Applicazione immediata di un Prisma di Fresnel a base esterna sull'occhio destro per neutralizzare la diplopia e ripristinare la visione binoculare singola in posizione primaria; 2) Esercizi di stretching e stimolazione oculomotoria per prevenire la contrattura secondaria del retto mediale antagonista."
        }
      ],
      deepDives: [
        {
          title: "Cover-Uncover vs Alternate Cover Test",
          category: "Semiotica Ortottica",
          content: "Il Cover-Uncover Test identifica le deviazioni manifeste (tropie) osservando il movimento di fissazione dell'occhio scoperto. L'Alternate Cover Test interrompe completamente la fusione sensoriale tra i due occhi, svelando le deviazioni latenti (forie) mantenute dalla convergenza fusionale."
        },
        {
          title: "Schermo di Hess-Lancaster e Paralisi",
          category: "Diagnostica Strabologica",
          content: "Attraverso l'uso di occhiali con filtri complementari rosso/verde, lo schermo di Hess permette di isolare e mappare graficamente la funzione di ciascuno dei 6 muscoli extraoculari per ogni occhio, distinguendo ipofunzioni paretiche da iperfunzioni secondarie."
        }
      ],
      clinicalNote: {
        title: "Strabismo & Diagnostica con Vision AI",
        content: "Vision AI integra moduli computazionali per analizzare le deviazioni oculari e la dinamica dei movimenti coniugati e disgiunti."
      }
    }
  },

  // ==========================================
  // SETTIMANA 3 (N. 3 - Lunedì 17 Agosto 2026)
  // Tema: Il Sinottoforo & Visione Binoculare
  // ==========================================
  {
    id: 3,
    number: 3,
    dateStr: "Lunedì 17 Agosto 2026",
    title: "Il Sinottoforo & Visione Binoculare",
    theme: "I 3 Gradi di Worth: Percezione, Fusione e Stereopsi",
    slogan: "Dalla percezione simultanea alla fusione 3D: il magico mondo del Sinottoforo!",
    badgeColor: "#16a34a",
    targetData: {
      subtitle: "Procedi dal SINOTTOFORO fino al centro (BINOCULARITÀ) percorrendo la teoria dei 3 Gradi di Worth e della fusione sensoriale!",
      startWord: "Sinottoforo",
      endWord: "Binocularità",
      correctChain: [
        "Sinottoforo", "Mire", "Worth", "Percezione", "Fusione", "Stereopsi", "Soppressione", "Angolo Oggettivo", "Corrispondenza", "Binocularità"
      ],
      transitions: {
        "Sinottoforo-Mire": "Struttura dello strumento (il sinottoforo impiega diapositive trasparenti illuminate chiamate mire)",
        "Mire-Worth": "Classificazione percettiva (le mire sono strutturate secondo i 3 Gradi della visione binoculare di Worth)",
        "Worth-Percezione": "1° Grado di Worth (Percezione Simultanea: capacità di percepire due immagini differenti, es. Leone/Gabbia)",
        "Percezione-Fusione": "2° Grado di Worth (Fusione Sensoriale: unione corticale di due immagini simili con dettagli integrativi)",
        "Fusione-Stereopsi": "3° Grado di Worth (Stereopsi: percezione della profondità 3D grazie alla disparità retinica)",
        "Stereopsi-Soppressione": "Fisiopatologia sensoriale (se la fusione fallisce, il cervello attiva la soppressione di un'immagine)",
        "Soppressione-Angolo Oggettivo": "Diagnostica al sinottoforo (l'angolo oggettivo neutralizza la deviazione sbloccando la soppressione)",
        "Angolo Oggettivo-Corrispondenza": "Corrispondenza retinica (la relazione tra angolo oggettivo e soggettivo misura la NRC vs CRA)",
        "Corrispondenza-Binocularità": "Finalità clinica (una corretta corrispondenza retinica fisiologica garantisce la binocularità)"
      },
      nodes: [
        { word: "Sinottoforo", r: 200, angle: 0 },
        { word: "Mire", r: 200, angle: 72 },
        { word: "Worth", r: 200, angle: 144 },
        { word: "Leone", r: 200, angle: 216 },
        { word: "Gabbia", r: 200, angle: 288 },
        { word: "Percezione", r: 155, angle: 36 },
        { word: "Fusione", r: 155, angle: 108 },
        { word: "Stereopsi", r: 155, angle: 180 },
        { word: "Flashing", r: 155, angle: 252 },
        { word: "Ampiezza", r: 155, angle: 324 },
        { word: "Soppressione", r: 115, angle: 0 },
        { word: "Angolo Oggettivo", r: 115, angle: 90 },
        { word: "Disparità", r: 115, angle: 180 },
        { word: "Soggettivo", r: 115, angle: 270 },
        { word: "Corrispondenza", r: 75, angle: 45 },
        { word: "Braccio", r: 75, angle: 160 },
        { word: "Oculari", r: 75, angle: 280 },
        { word: "Binocularità", r: 0, angle: 0 }
      ]
    },
    crosswordData: {
      gridSize: 15,
      clues: [
        // Orizzontali
        { number: 1, direction: 'across', word: 'SINOTTOFORO', clue: 'Lo strumento principe per la diagnosi e terapia della visione binoculare.', row: 0, col: 0 },
        { number: 4, direction: 'across', word: 'WORTH', clue: 'Lo scienziato che ha codificato i 3 gradi della visione binoculare.', row: 2, col: 8 },
        { number: 5, direction: 'across', word: 'FUSIONE', clue: 'Secondo grado di Worth: unione mentale di due immagini simili.', row: 4, col: 4 },
        { number: 6, direction: 'across', word: 'STEREOPSI', clue: 'Terzo grado di Worth: percezione della profondità tridimensionale 3D.', row: 6, col: 7 },
        { number: 7, direction: 'across', word: 'OGGETTIVO', clue: 'L angolo reale di deviazione azzerato dal movimento dell occhio.', row: 8, col: 6 },
        { number: 8, direction: 'across', word: 'PERCEZIONE', clue: 'Primo grado di Worth: la percezione simultanea (es. Leone nella Gabbia).', row: 10, col: 0 },
        { number: 9, direction: 'across', word: 'MIRE', clue: 'Diapositive trasparenti illuminate inserite nei bracci del sinottoforo.', row: 12, col: 0 },
        { number: 10, direction: 'across', word: 'LEONE', clue: 'Figura tipica della prima diapositiva del test di Worth.', row: 12, col: 6 },
        { number: 11, direction: 'across', word: 'GABBIA', clue: 'Figura contenitrice per testare la percezione simultanea.', row: 14, col: 0 },

        // Verticali
        { number: 1, direction: 'down', word: 'SOGGETTIVO', clue: 'L angolo in cui il paziente sovrappone le due immagini al sinottoforo.', row: 0, col: 0 },
        { number: 2, direction: 'down', word: 'SOPPRESSIONE', clue: 'Meccanismo corticale che cancella l immagine dell occhio deviato.', row: 0, col: 4 },
        { number: 3, direction: 'down', word: 'ANOMALA', clue: 'Corrispondenza retinica in cui la fovea si associa a un punto extrafoveale.', row: 0, col: 8 },
        { number: 14, direction: 'down', word: 'AMPIEZZA', clue: 'Escursione di fusione misurata in convergenza e divergenza.', row: 0, col: 13 },
        { number: 15, direction: 'down', word: 'DISPARITA', clue: 'Differenza retinica trasversale minima per attivare la stereopsi.', row: 2, col: 14 },
        { number: 16, direction: 'down', word: 'FLASHING', clue: 'Tecnica di stimolazione luminosa alternata delle mire al sinottoforo.', row: 6, col: 6 }
      ]
    },
    wordSearchData: {
      gridSize: 12,
      wordList: ["SINOTTOFORO", "WORTH", "FUSIONE", "STEREOPSI", "PERCEZIONE", "OGGETTIVO", "SOGGETTIVO", "SOPPRESSIONE", "MIRE", "LEONE", "GABBIA"],
      placements: [
        { word: "SINOTTOFORO", coords: [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9]] },
        { word: "PERCEZIONE", coords: [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9]] },
        { word: "SOPPRESSIONE", coords: [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10]] },
        { word: "STEREOPSI", coords: [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8]] },
        { word: "OGGETTIVO", coords: [[10,0],[10,1],[10,2],[10,3],[10,4],[10,5],[10,6],[10,7],[10,8]] },
        { word: "FUSIONE", coords: [[0,11],[1,11],[2,11],[3,11],[4,11],[5,11],[6,11]] },
        { word: "SOGGETTIVO", coords: [[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10]] },
        { word: "WORTH", coords: [[1,9],[2,9],[3,9],[4,9],[5,9]] },
        { word: "LEONE", coords: [[6,8],[7,8],[8,8],[9,8],[10,8]] },
        { word: "GABBIA", coords: [[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]] },
        { word: "MIRE", coords: [[4,4],[4,5],[4,6],[4,7]] }
      ],
      secretPhrase: "ITREGRADIDIWORTHPERMETTONODIVALUTARELAVISIONEBINOCULAREALSINOTTOFORO",
      secretPhraseDisplay: "I TRE GRADI DI WORTH PERMETTONO DI VALUTARE LA VISIONE BINOCULARE AL SINOTTOFORO"
    },
    spotDifferencesData: {
      title: "Trova le Differenze: Cabinet del Sinottoforo",
      subtitle: "Nel laboratorio di visione binoculare ci sono 7 difformità visive tra il modello A e B!",
      sceneType: 'cabinet_sinottoforo',
      differences: [
        { id: 1, x: 85, y: 75, radius: 24, description: "Immagine della diapositiva sul braccio (Leone dentro vs fuori la gabbia)" },
        { id: 2, x: 255, y: 115, radius: 20, description: "Manopola della scala graduata dell'angolo oggettivo (0° vs +10°)" },
        { id: 3, x: 325, y: 150, radius: 18, description: "Spia luminosa del pulsante Flashing (accisa verde vs spenta)" },
        { id: 4, x: 45, y: 205, radius: 20, description: "Ghiere degli oculari del sinottoforo (colore blu vs nero)" },
        { id: 5, x: 275, y: 45, radius: 22, description: "Inclinazione dello specchio interno del braccio articolato" },
        { id: 6, x: 165, y: 240, radius: 22, description: "Mappa dei 3 Gradi di Worth appesa al muro" },
        { id: 7, x: 180, y: 60, radius: 18, description: "Disegno del coniglio sulla diapositiva di fusione (con coda vs senza)" }
      ]
    },
    rebusData: {
      items: [
        { id: 'a', title: "REBUS A", diagram: "11", expected: "SINOTTOFORO", solutionFormatted: "SINOTTOFORO", hint: "Lettere S I + Disegno del Numero Nove (V=TT) + Lettera O + Disegno del Foro", graphicDescription: "S I + [Disegno Nove (V=TT)] + O + [Disegno Foro/Galleria]" },
        { id: 'b', title: "REBUS B", diagram: "7", expected: "FUSIONE", solutionFormatted: "FUSIONE", hint: "Lettera F + Disegno del Fuso (O=I) + Lettere O N E", graphicDescription: "F + [Disegno Fuso (O=I)] + O N E" },
        { id: 'c', title: "REBUS C", diagram: "6   7", expected: "RETINAANOMALA", solutionFormatted: "RETINA ANOMALA", hint: "Disegno della Rete (E=I) + N A + Disegno dell'Anatra (TRA=MALA)", graphicDescription: "[Disegno Rete (E=I)] + N A + [Disegno Anatra (TRA=MALA)]" }
      ]
    },
    casesAndFactsData: {
      clinicalCases: [
        {
          id: "case-3",
          title: "Caso Clinico #3: Insufficienza di Convergenza e Astenopia",
          patientInfo: "Paziente: Ragazza di 14 anni.",
          history: "Anamnesi: Lamenta cefalea frontale pomeridiana, diplopia sfocata intermittente e stanchezza durante lo studio vicino.",
          examination: "Esame Ortottico: Al sinottoforo l'angolo oggettivo da lontano è di 0°. L'ampiezza di fusione in convergenza è ridotta a soli +8Δ (valore normale > +30Δ). Punto Prossimo di Convergenza (PPC) allontanato a 18 cm con tendenza all'exoforia.",
          question: "Domanda Clinica: Qual è la diagnosi e il protocollo di rieducazione fusionale al sinottoforo?",
          solution: "Diagnosi: Insufficienza di Convergenza (IC) sintomatica. Trattamento Ortottico: 1) Esercizi al sinottoforo con mire di 2° grado (Fusione) mediante stimolazione graduale con il movimento convergente dei bracci; 2) Esercizi di flashing per potenziare la riserva fusionale positiva; 3) Esercizi al Punto Prossimo di Convergenza (PPC) da casa."
        }
      ],
      deepDives: [
        {
          title: "I 3 Gradi della Visione Binoculare di Worth",
          category: "Fisiologia Binoculare",
          content: "Claud Worth ha definito la gerarchia della visione binoculare: 1° Grado = Percezione Simultanea (capacità di percepire due immagini differenti, es. Leone/Gabbia); 2° Grado = Fusione Sensoriale (integrazione di due immagini simili con dettagli complementari); 3° Grado = Stereopsi (percezione della tridimensionalità 3D basata sulla disparità retinica)."
        },
        {
          title: "Corrispondenza Retinica Anomala (CRA)",
          category: "Adattamento Sensoriale",
          content: "Nello strabismo precoce insorto in età pediatrica, per evitare la diplopia il cervello sviluppa la CRA: la fovea dell'occhio fissatore si associa funzionalmente ad un punto retinico extrafoveale dell'occhio deviato, creando un nuovo angolo di anomalia."
        }
      ],
      clinicalNote: {
        title: "Vision AI & Valutazione Binoculare",
        content: "I moduli di simulazione binoculare di Vision AI aiutano a monitorare e allenare i punti di fusione e stereopsi direttamente a schermo."
      }
    }
  },

  // ==========================================
  // SETTIMANA 4 (N. 4 - Lunedì 24 Agosto 2026)
  // Tema: Anatomia, Ottica & Oftalmologia
  // ==========================================
  {
    id: 4,
    number: 4,
    dateStr: "Lunedì 24 Agosto 2026",
    title: "Anatomia, Ottica & Oftalmologia",
    theme: "Cornea, Cristallino, Vizi di Rifrazione e Campo Visivo",
    slogan: "Dalla rifrazione alla retina: esplora le meraviglie ottiche dell'occhio humano!",
    badgeColor: "#7c3aed",
    targetData: {
      subtitle: "Collega i concetti ottici ed anatomici partendo dalla CORNEA ed arrivando all'OFTALMOLOGIA integrata!",
      startWord: "Cornea",
      endWord: "Oftalmologia",
      correctChain: [
        "Cornea", "Rifrazione", "Cristallino", "Accomodazione", "Retina", "Macula", "Foveola", "Ametropia", "Perimetria", "Oftalmologia"
      ],
      transitions: {
        "Cornea-Rifrazione": "Ottica oculare (la cornea trasparente costituisce la prima e principale superficie di rifrazione dell'occhio)",
        "Rifrazione-Cristallino": "Mezzi diottrici (dopo la cornea, i raggi rifratti attraversano la seconda lente naturale, il cristallino)",
        "Cristallino-Accomodazione": "Fisiologia di messa a fuoco (il cristallino varia la propria curvatura per permettere l'accomodazione)",
        "Accomodazione-Retina": "Focalizzazione dell'immagine (l'accomodazione nitida proietta i raggi direttamente sulla superficie retinica)",
        "Retina-Macula": "Anatomia retinica (la macula lutea costituisce la regione retinica posteriore adibita alla visione distinta)",
        "Macula-Foveola": "Centro retinico (la foveola è il centro esatto della fovea maculare con la massima densità di coni)",
        "Foveola-Ametropia": "Vizi di rifrazione (le ametropie come miopia o ipermetropia spostano il fuoco lontano dalla foveola)",
        "Ametropia-Perimetria": "Esami instrumental (la perimetria computerizzata di Humphrey mappa la sensibilità dei punti retinici)",
        "Perimetria-Oftalmologia": "Diagnostica integrata (la perimetria ed i dati di rifrazione completano la diagnosi oftalmologica)"
      },
      nodes: [
        { word: "Cornea", r: 200, angle: 0 },
        { word: "Rifrazione", r: 200, angle: 72 },
        { word: "Cristallino", r: 200, angle: 144 },
        { word: "Miopia", r: 200, angle: 216 },
        { word: "Ipermetropia", r: 200, angle: 288 },
        { word: "Accomodazione", r: 155, angle: 36 },
        { word: "Retina", r: 155, angle: 108 },
        { word: "Macula", r: 155, angle: 180 },
        { word: "Astigmatismo", r: 155, angle: 252 },
        { word: "Tonometro", r: 155, angle: 324 },
        { word: "Foveola", r: 115, angle: 0 },
        { word: "Ametropia", r: 115, angle: 90 },
        { word: "Vitreo", r: 115, angle: 180 },
        { word: "Presbiopia", r: 115, angle: 270 },
        { word: "Perimetria", r: 75, angle: 45 },
        { word: "Sclera", r: 75, angle: 160 },
        { word: "Humphrey", r: 75, angle: 280 },
        { word: "Oftalmologia", r: 0, angle: 0 }
      ]
    },
    crosswordData: {
      gridSize: 15,
      clues: [
        // Orizzontali
        { number: 1, direction: 'across', word: 'CORNEA', clue: 'Prima lente trasparente ed avascolare della superficie oculare.', row: 0, col: 0 },
        { number: 4, direction: 'across', word: 'MIOPIA', clue: 'Difetto di rifrazione con fuoco posizionato davanti alla retina.', row: 2, col: 8 },
        { number: 5, direction: 'across', word: 'CRISTALLINO', clue: 'Lente intraoculare trasparente che varia potere per l accomodazione.', row: 4, col: 4 },
        { number: 6, direction: 'across', word: 'RETINA', clue: 'Membrana fotosensibile posteriore su cui si formano le immagini.', row: 6, col: 0 },
        { number: 7, direction: 'across', word: 'MACULA', clue: 'Area centrale retinica adibita alla visione nitida dei dettagli.', row: 8, col: 8 },
        { number: 8, direction: 'across', word: 'PERIMETRIA', clue: 'Esame strumentale per la mappa del campo visivo.', row: 10, col: 0 },
        { number: 9, direction: 'across', word: 'FOVEOLA', clue: 'Centro assoluto della fovea privo di vasi ad acuità massima.', row: 12, col: 0 },
        { number: 10, direction: 'across', word: 'SCLERA', clue: 'Guscio bianco opaco esterno di protezione del bulbo.', row: 12, col: 8 },
        { number: 11, direction: 'across', word: 'IRIDE', clue: 'Diaframma muscolare colorato dell occhio con la pupilla.', row: 14, col: 0 },
        { number: 12, direction: 'across', word: 'SCOTOMA', clue: 'Area di deficit o cecità all interno del campo visivo.', row: 14, col: 8 },

        // Verticali
        { number: 1, direction: 'down', word: 'IPERMETROPIA', clue: 'Difetto di rifrazione in cui le immagini vanno a fuoco dietro la retina.', row: 0, col: 0 },
        { number: 2, direction: 'down', word: 'ASTIGMATISMO', clue: 'Ametropia dovuta a curvatura asimmetrica dei meridiani corneali.', row: 0, col: 4 },
        { number: 3, direction: 'down', word: 'PRESBIOPIA', clue: 'Calo fisiologico dell accomodazione che insorge dopo i 40 anni.', row: 0, col: 8 },
        { number: 14, direction: 'down', word: 'FOROTTERO', clue: 'Strumento ottico a batterie di lenti per determinare la rifrazione.', row: 0, col: 13 },
        { number: 15, direction: 'down', word: 'VITREO', clue: 'Gel trasparente gelatinoso che riempie il cavo posteriore.', row: 2, col: 14 },
        { number: 16, direction: 'down', word: 'HUMPHREY', clue: 'Perimetro computerizzato standard di riferimento.', row: 6, col: 6 }
      ]
    },
    wordSearchData: {
      gridSize: 12,
      wordList: ["CORNEA", "CRISTALLINO", "RETINA", "MIOPIA", "IPERMETROPIA", "ASTIGMATISMO", "PRESBIOPIA", "FOVEA", "MACULA", "VITREO", "PERIMETRIA"],
      placements: [
        { word: "CRISTALLINO", coords: [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],[2,10]] },
        { word: "ASTIGMATISMO", coords: [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],[4,11]] },
        { word: "IPERMETROPIA", coords: [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10]] },
        { word: "PERIMETRIA", coords: [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],[8,9]] },
        { word: "PRESBIOPIA", coords: [[10,0],[10,1],[10,2],[10,3],[10,4],[10,5],[10,6],[10,7],[10,8],[10,9]] },
        { word: "CORNEA", coords: [[0,11],[1,11],[2,11],[3,11],[4,11],[5,11]] },
        { word: "RETINA", coords: [[1,10],[2,10],[3,10],[4,10],[5,10],[6,10]] },
        { word: "FOVEA", coords: [[1,9],[2,9],[3,9],[4,9],[5,9]] },
        { word: "MACULA", coords: [[6,8],[7,8],[8,8],[9,8],[10,8],[11,8]] },
        { word: "VITREO", coords: [[1,2],[1,3],[1,4],[1,5],[1,6]] },
        { word: "MIOPIA", coords: [[4,4],[4,5],[4,6],[4,7],[4,8],[4,9]] }
      ],
      secretPhrase: "LASALUTEOCULARECOMPRENDELANATOMIALOTTICAEALAPREVENZIONEOPHTHALMOLOGICA",
      secretPhraseDisplay: "LA SALUTE OCULARE COMPRENDE L ANATOMIA L OTTICA E LA PREVENZIONE OPHTHALMOLOGICA"
    },
    spotDifferencesData: {
      title: "Trova le Differenze: Laboratorio Ottico & Rifrazione",
      subtitle: "Tra i due disegni dello studio di rifrazione oftalmica si nascondono 7 differenze!",
      sceneType: 'laboratorio_oftalmico',
      differences: [
        { id: 1, x: 85, y: 70, radius: 24, description: "Cilindro crociato sul forottero (asse a 90° vs 180°)" },
        { id: 2, x: 265, y: 125, radius: 20, description: "Filtro cobalto blu sulla lampada a fessura (acceso vs spento)" },
        { id: 3, x: 330, y: 155, radius: 18, description: "Cono del tonometro di Goldmann montato sulla lampada" },
        { id: 4, x: 40, y: 200, radius: 20, description: "Mappa di topografia corneale a schermo (mappa calda vs fredda)" },
        { id: 5, x: 285, y: 35, radius: 22, description: "Prima riga della tabella di Snellen ('E' dritta vs sottosopra)" },
        { id: 6, x: 160, y: 250, radius: 22, description: "Filtro rosso-verde inserito nella montatura di prova" },
        { id: 7, x: 175, y: 55, radius: 18, description: "Colore del cristallino nello schema anatomico del bulbo" }
      ]
    },
    rebusData: {
      items: [
        { id: 'a', title: "REBUS A", diagram: "11", expected: "CRISTALLINO", solutionFormatted: "CRISTALLINO", hint: "Lettera C + Disegno Cresta (E=I) + Lettere S T + Disegno Gallo (O=I) + N O", graphicDescription: "C + [Disegno Cresta (E=I)] + S T + [Disegno Gallo (O=I)] + N O" },
        { id: 'b', title: "REBUS B", diagram: "5   6", expected: "CAMPOVISIVO", solutionFormatted: "CAMPO VISIVO", hint: "Disegno del Campo Verde + Lettere V I + Disegno del Viso (SO=VO)", graphicDescription: "[Disegno Campo Verde] + V I + [Disegno Viso (SO=VO)]" },
        { id: 'c', title: "REBUS C", diagram: "10", expected: "RIFRAZIONE", solutionFormatted: "RIFRAZIONE", hint: "Lettere R I + Disegno del Raggio Luminoso + Lettere A Z I O N E", graphicDescription: "R I + [Disegno Raggio Luminoso] + A Z I O N E" }
      ]
    },
    casesAndFactsData: {
      clinicalCases: [
        {
          id: "case-4",
          title: "Caso Clinico #4: Astigmatismo Misto Composito e Astenopia Digitale",
          patientInfo: "Paziente: Studente universitario di 21 anni.",
          history: "Anamnesi: Visione sfocata sia da lontano che durante la lettura da vicino, associata a colpi di sole e bagliori attorno ai segnali stradali notturni.",
          examination: "Esame Ortottico e Refrattivo: Autorefrattometria in ciclopegia: OD -2.25D sf -1.50D cil ax 90°; OS -2.00D sf -1.75D cil ax 85°. La topografia corneale evidenzia astigmatismo regolare secondo regola. La perimetria computerizzata di Humphrey risulta nei limiti della norma.",
          question: "Domanda Clinica: Qual è la diagnosi ametropica e la soluzione oftalmica per ridurre la fatica visiva?",
          solution: "Diagnosi: Miopia associata ad Astigmatismo Misto Composito Secondo Regola. Soluzione Ortottico-Ottica: 1) Prescrizione di lenti oftalmiche sfero-cilindriche negative ad alto indice con trattamento antiriflesso e filtro per la luce blu; 2) Esercizi ortottici di flessibilità accomodativa (stampa di flipper) per prevenire lo spasmo accomodativo durante lo studio prolungato."
        }
      ],
      deepDives: [
        {
          title: "Ottica della Cornea e del Cristallino",
          category: "Ottica Fisiologica",
          content: "La cornea costituisce la prima superficie di rifrazione con un potere di circa +43 diottrie. Il cristallino fornisce le rimanenti +20 diottrie ed è la sola lente dell'occhio in grado di modificare la propria curvatura grazie alla contrazione del muscolo ciliare (accomodazione)."
        },
        {
          title: "Perimetria Computerizzata di Humphrey",
          category: "Diagnostica del Campo Visivo",
          content: "La perimetria quantitativa mappa la sensibilità differenziale della retina (in decibel dB) identificando precocemente eventuali scotomi, ampiezze periferiche e difetti fascicolari del nervo ottico."
        }
      ],
      clinicalNote: {
        title: "Vision AI & Oftalmologia Integrata",
        content: "Vision AI supporta l'ortottista nel tracciare i dati refrattivi, oculomotori e perimetrici per un piano riabilitativo personalizzato."
      }
    }
  }
];
