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
}

export interface RebusData {
  items: RebusItem[];
}

export interface Joke {
  setup: string;
  punchline: string;
}

export interface Fact {
  title: string;
  content: string;
}

export interface JokesAndFactsData {
  jokes: Joke[];
  facts: Fact[];
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
  jokesAndFactsData: JokesAndFactsData;
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
      subtitle: "Crea la catena ortottica corretta. Clicca sulle parole procedendo dall'esterno (AIorao) al centro (Visione) sfruttando anagrammi, cambi di lettera (+/-) o associazioni!",
      startWord: "AIorao",
      endWord: "Visione",
      correctChain: [
        "AIorao", "Sito", "Dito", "Doti", "Dati", "Dita", "Vita", "Vista", "Visto", "Viso", "Occhio", "Ortottica", "Visione"
      ],
      transitions: {
        "AIorao-Sito": "Associazione (AIorao è un portale ortottico)",
        "Sito-Dito": "Cambio di lettera (S → D)",
        "Dito-Doti": "Anagramma (D-I-T-O → D-O-T-I)",
        "Doti-Dati": "Cambio di lettera (O → A)",
        "Dati-Dita": "Anagramma (D-A-T-I → D-I-T-A)",
        "Dita-Vita": "Cambio di lettera (D → V)",
        "Vita-Vista": "Aggiunta di lettera (V-I-T-A + S = V-I-S-T-A)",
        "Vista-Visto": "Cambio di lettera (A → O)",
        "Visto-Viso": "Sottrazione di lettera (V-I-S-T-O meno T)",
        "Viso-Occhio": "Associazione (l'organo visivo si trova nel viso)",
        "Occhio-Ortottica": "Associazione (la scienza di riabilitazione della visione)",
        "Ortottica-Visione": "Associazione (il fine clinico dell'ortottica è la visione binoculare)"
      },
      nodes: [
        { word: "AIorao", r: 200, angle: 0 },
        { word: "Sito", r: 200, angle: 72 },
        { word: "Dito", r: 200, angle: 144 },
        { word: "Miopia", r: 200, angle: 216 },
        { word: "Lente", r: 200, angle: 288 },
        { word: "Doti", r: 155, angle: 36 },
        { word: "Dati", r: 155, angle: 108 },
        { word: "Dita", r: 155, angle: 180 },
        { word: "Prisma", r: 155, angle: 252 },
        { word: "Cervello", r: 155, angle: 324 },
        { word: "Vita", r: 115, angle: 0 },
        { word: "Vista", r: 115, angle: 90 },
        { word: "Visto", r: 115, angle: 180 },
        { word: "Ottotipo", r: 115, angle: 270 },
        { word: "Viso", r: 75, angle: 45 },
        { word: "Occhio", r: 75, angle: 135 },
        { word: "Ortottica", r: 75, angle: 225 },
        { word: "Saccade", r: 75, angle: 315 },
        { word: "Visione", r: 0, angle: 0 }
      ]
    },
    crosswordData: {
      gridSize: 15,
      clues: [
        { number: 1, direction: 'across', word: 'ORTOTTICA', clue: 'La scienza e professione sanitaria che si occupa di riabilitazione visiva.', row: 0, col: 0 },
        { number: 4, direction: 'across', word: 'BUIO', clue: "L'assenza di luce che dilata la pupilla.", row: 2, col: 8 },
        { number: 5, direction: 'across', word: 'TESTI', clue: 'Prove o letture utilizzate durante le visite ortottiche.', row: 4, col: 4 },
        { number: 6, direction: 'across', word: 'PRISMA', clue: 'Lente speciale usata per misurare ed esercitare la deviazione oculare.', row: 6, col: 8 },
        { number: 7, direction: 'across', word: 'ACUTA', clue: 'Così è la vista normale, definita anche nitida o visus 10/10.', row: 8, col: 8 },
        { number: 8, direction: 'across', word: 'SACCADI', clue: 'I rapidi movimenti oculari di fissazione (verticali o orizzontali).', row: 9, col: 0 },
        { number: 1, direction: 'down', word: 'OTTOTIPO', clue: 'Tabellone con lettere o simboli per misurare l’acutezza visiva.', row: 0, col: 0 },
        { number: 2, direction: 'down', word: 'TRATTAMENTO', clue: 'Il percorso terapeutico di esercizi per correggere un deficit visivo.', row: 0, col: 4 },
        { number: 3, direction: 'down', word: 'AMBLIOPIA', clue: "Deficit visivo monolaterale comunemente chiamato 'occhio pigro'.", row: 0, col: 8 },
        { number: 9, direction: 'down', word: 'CONI', clue: 'I fotorecettori retinici per la visione diurna e dei colori.', row: 9, col: 2 },
        { number: 10, direction: 'down', word: 'DOPPIA', clue: 'Dicesi della visione duplicata, ovvero la diplopia.', row: 9, col: 5 }
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
        { id: 'a', title: "REBUS A", diagram: "1' 6   5", expected: "LOCCHIOPIGRO", solutionFormatted: "L'OCCHIO PIGRO", hint: "Cerca il nome dell'organo visivo e della gru di sollevamento." },
        { id: 'b', title: "REBUS B", diagram: "4   2   6", expected: "MIRALARETINA", solutionFormatted: "MIRA LA RETINA", hint: "Identifica il bersaglio rosso (mira) e la rete da tennis." },
        { id: 'c', title: "REBUS C", diagram: "2   9", expected: "LASTEREOPSI", solutionFormatted: "LA STEREOPSI", hint: "Quel dispositivo musicale vintage è uno stereo!" }
      ]
    },
    jokesAndFactsData: {
      jokes: [
        { setup: "Un oculista e un ortottista si incontrano al bar prima del turno.", punchline: "L'oculista saluta: 'Ci vediamo più tardi!'. L'ortottista risponde: 'Speriamo in modo binoculare!'" },
        { setup: "Perché i pesci rossi hanno gli occhi così distanti?", punchline: "Perché altrimenti non riuscirebbero a incrociare lo sguardo e a farsi l'occhiolino!" },
        { setup: "Dottore, aiuto! Vedo tutto doppio da stamattina!", punchline: "L'ortottista: 'Si accomodi pure sulla sedia davanti a lei.' - 'Quale delle due, dottore?'" },
        { setup: "Cosa dice un occhio all'altro occhio mentre camminano?", punchline: "'Guarda, ti dico una cosa in confidenza... tra noi due c'è qualcosa che naso!'" },
        { setup: "Un paziente strabico va a fare la visita e dice: 'Dottore, a volte mi sento così diverso...'", punchline: "L'ortottista lo rassicura: 'Non si preoccupi, noi qui guardiamo le cose da molti punti di vista!'" }
      ],
      facts: [
        { title: "La Fovea Centrale", content: "La fovea è una piccolissima depressione sulla retina di appena 1.5 millimetri. Contiene circa la metà di tutte le fibre del nervo ottico dedicate alla visione dettagliata e ai compiti visivi più fini." },
        { title: "Il Potere delle Saccadi", content: "Le saccadi raggiungono velocità fino a 900 gradi al secondo. Durante la lettura compiamo circa 3-4 saccadi al secondo, durante le quali il cervello sopprime momentaneamente la percezione visiva per evitare sfocature." },
        { title: "L'Ambliopia (Occhio Pigro)", content: "Se nei primi anni di vita il cervello non riceve un'immagine nitida da uno dei due occhi, tende ad escluderlo. Si cura con la terapia occlusiva e l'allenamento ortottico entro il periodo plastico (fino a 7-8 anni)." },
        { title: "La Visione Tridimensionale", content: "La stereopsi permette la percezione della profondità 3D grazie alla fusione corticale delle due immagini leggermente disparate catturate dai singoli occhi." }
      ],
      clinicalNote: {
        title: "Vision AI & Oculomotricità",
        content: "Gli esercizi di inseguimento e saccadi su Vision AI simulano i protocolli clinici ortottici per rieducare i movimenti oculari e la stabilità foveale."
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
      subtitle: "Compila il bersaglio partendo da COVER e arrivando al centro su STRABISMO attraverso cambi di lettera, anagrammi o definizioni clinicamente collegate!",
      startWord: "Cover",
      endWord: "Strabismo",
      correctChain: [
        "Cover", "Covo", "Cavo", "Cappo", "Kappa", "Mappa", "Marca", "Mira", "Prisma", "Deviazione", "Strabismo"
      ],
      transitions: {
        "Cover-Covo": "Cambio di lettera (E → O)",
        "Covo-Cavo": "Cambio di lettera (O → A)",
        "Cavo-Cappo": "Cambio lettere (V → PP)",
        "Cappo-Kappa": "Assonanza fonetica / Angolo Kappa tra asse visivo e pupillare",
        "Kappa-Mappa": "Cambio di lettera (K → M)",
        "Mappa-Marca": "Cambio di lettera (P → R)",
        "Marca-Mira": "Assonanza semantica / Mira di fissazione ortottica",
        "Mira-Prisma": "Associazione (la mira viene osservata attraverso il prisma)",
        "Prisma-Deviazione": "Associazione (il prisma devia il fascio di luce in diottrie)",
        "Deviazione-Strabismo": "Associazione (la deviazione oculare manifesta definisce lo strabismo)"
      },
      nodes: [
        { word: "Cover", r: 200, angle: 0 },
        { word: "Covo", r: 200, angle: 72 },
        { word: "Cavo", r: 200, angle: 144 },
        { word: "Nistagmo", r: 200, angle: 216 },
        { word: "Fovea", r: 200, angle: 288 },
        { word: "Cappo", r: 155, angle: 36 },
        { word: "Kappa", r: 155, angle: 108 },
        { word: "Mappa", r: 155, angle: 180 },
        { word: "Tropia", r: 155, angle: 252 },
        { word: "Foria", r: 155, angle: 324 },
        { word: "Marca", r: 115, angle: 0 },
        { word: "Mira", r: 115, angle: 90 },
        { word: "Hess", r: 115, angle: 180 },
        { word: "Bagolini", r: 115, angle: 270 },
        { word: "Prisma", r: 75, angle: 45 },
        { word: "Deviazione", r: 75, angle: 160 },
        { word: "Occlusore", r: 75, angle: 280 },
        { word: "Strabismo", r: 0, angle: 0 }
      ]
    },
    crosswordData: {
      gridSize: 15,
      clues: [
        { number: 1, direction: 'across', word: 'ESOTROPIA', clue: 'Deviazione oculare manifesta verso l interno (convergente).', row: 0, col: 0 },
        { number: 4, direction: 'across', word: 'COVER', clue: 'Test fondamentale che si esegue con un occlusore per rilevare strabismo.', row: 2, col: 8 },
        { number: 5, direction: 'across', word: 'KAPPA', clue: 'L angolo formato tra l asse visivo e l asse pupillare dell occhio.', row: 4, col: 4 },
        { number: 6, direction: 'across', word: 'STECCA', clue: 'Righello di prismi graduati per misurare la deviazione strabica.', row: 6, col: 8 },
        { number: 7, direction: 'across', word: 'HESS', clue: 'Schermo diagnostico svizzero usato per le paresi oculomotorie.', row: 8, col: 8 },
        { number: 8, direction: 'across', word: 'EXOTROPIA', clue: 'Deviazione oculare manifesta verso l esterno (divergente).', row: 9, col: 0 },
        { number: 1, direction: 'down', word: 'ELEVAZIONE', clue: 'Movimento oculare verso l alto controllato dal retto superiore.', row: 0, col: 0 },
        { number: 2, direction: 'down', word: 'ORTOFORIA', clue: 'Il perfetto allineamento degli assi visivi senza deviazioni.', row: 0, col: 4 },
        { number: 3, direction: 'down', word: 'PARALISI', clue: 'Deficit motorio di un muscolo extraoculare d origine nervosa.', row: 0, col: 8 },
        { number: 9, direction: 'down', word: 'PRISMI', clue: 'Dispositivi ottici a cuneo usati per neutralizzare la deviazione.', row: 9, col: 2 },
        { number: 10, direction: 'down', word: 'FORIA', clue: 'Deviazione oculare latente che emerge solo interrompendo la fusione.', row: 9, col: 5 }
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
        { id: 'a', title: "REBUS A", diagram: "5   4", expected: "COVERTEST", solutionFormatted: "COVER TEST", hint: "C O V E [R] + T E S T : il principale esame dell'ortottista." },
        { id: 'b', title: "REBUS B", diagram: "9", expected: "ESOTROPIA", solutionFormatted: "ESOTROPIA", hint: "E S O + T R O P I A : la deviazione convergente dell'occhio." },
        { id: 'c', title: "REBUS C", diagram: "6   5", expected: "ANGOLOKAPPA", solutionFormatted: "ANGOLO KAPPA", hint: "A N G O L O + K A P P A : misura la differenza tra asse visivo e pupillare." }
      ]
    },
    jokesAndFactsData: {
      jokes: [
        { setup: "Un occhio esotropico dice a un occhio exotropico: 'Che fai stasera?'", punchline: "Risposta: 'Io esco verso l'esterno, tu invece rientri subito a casa!'" },
        { setup: "Come si saluta un paio di prismi di Fresnel?", punchline: "'Ci si vede in diottrie sgranate!'" },
        { setup: "Perché l'occlusore ha vinto il premio per il miglior attore?", punchline: "Perché sa fare una copertura perfetta durante il Cover Test!" },
        { setup: "Un bambino fa il cover test e chiede: 'Dottore, perché mi coprite un occhio?'", punchline: "L'ortottista risponde: 'Perché con l'altro ti stiamo preparando una sorpresa!' " },
        { setup: "Cosa fa una stecca di prismi al mare?", punchline: "Prende il sole ad angoli di deviazione graduati!" }
      ],
      facts: [
        { title: "Il Cover Test (Copri-Scopri)", content: "È l'esame cardine in ortottica. Il Cover-Uncover rileva lo strabismo manifesto (tropia), mentre l'Alternate Cover Test interrompe la fusione per evidenziare le deviazioni latenti (forie)." },
        { title: "L'Angolo Kappa (α / κ)", content: "È l'angolo formato tra l'asse visivo e l'asse pupillare. Un angolo Kappa positivo molto ampio può simulare una finta exotropia (pseudo-strabismo)." },
        { title: "Lo Schermo di Hess-Lancaster", content: "Utilizza occhiali con filtri rosso-verdi per mappare le paralisi oculomotorie e quantificare l'ipofunzione o iperfunzione dei 6 muscoli extraoculari." },
        { title: "I Prismi di Fresnel", content: "Sono sottili pellicole plastiche flessibili a micro-prismi che vengono applicate direttamente sulla lente degli occhiali per compensare temporaneamente diplopie improvvise." }
      ],
      clinicalNote: {
        title: "Strabismo & Diagnostica con Vision AI",
        content: "Vision AI analizza i dati di risposta ai test di fissazione offrendo indicazioni oggettive sui pattern di deviazione oculomotoria."
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
      subtitle: "Unisciti al viaggio della visione binoculare! Da WORTH scopri la strada per giungere al SINOTTOFORO con anagrammi, cambi e concetti di fusione visiva!",
      startWord: "Worth",
      endWord: "Sinottoforo",
      correctChain: [
        "Worth", "Porta", "Parte", "Parete", "Fusa", "Fusione", "Fusionale", "Fissione", "Soffione", "Soppressione", "Sinottoforo"
      ],
      transitions: {
        "Worth-Porta": "Assonanza semantica / Gradi di Worth come porte della visione binoculare",
        "Porta-Parte": "Anagramma (P-O-R-T-A → P-A-R-T-E)",
        "Parte-Parete": "Aggiunta di lettera (P-A-R-T-E + E = P-A-R-E-T-E)",
        "Parete-Fusa": "Assonanza semantica / Immagini fuso-percettive",
        "Fusa-Fusione": "Associazione (Fusione binoculare: 2° grado di Worth)",
        "Fusione-Fusionale": "Estensione lessicale (Ampiezza fusionale al sinottoforo)",
        "Fusionale-Fissione": "Gioco di parole ottico-fisico (scissione delle immagini)",
        "Fissione-Soffione": "Anagramma / cambio lettere",
        "Soffione-Soppressione": "Associazione (inibizione corticale di un'immagine al sinottoforo)",
        "Soppressione-Sinottoforo": "Associazione (il sinottoforo diagnostica la soppressione e ampiezza di fusione)"
      },
      nodes: [
        { word: "Worth", r: 200, angle: 0 },
        { word: "Porta", r: 200, angle: 72 },
        { word: "Parte", r: 200, angle: 144 },
        { word: "Leone", r: 200, angle: 216 },
        { word: "Gabbia", r: 200, angle: 288 },
        { word: "Parete", r: 155, angle: 36 },
        { word: "Fusa", r: 155, angle: 108 },
        { word: "Fusione", r: 155, angle: 180 },
        { word: "Stereo", r: 155, angle: 252 },
        { word: "Disparità", r: 155, angle: 324 },
        { word: "Fusionale", r: 115, angle: 0 },
        { word: "Fissione", r: 115, angle: 90 },
        { word: "Flashing", r: 115, angle: 180 },
        { word: "Braccio", r: 115, angle: 270 },
        { word: "Soffione", r: 75, angle: 45 },
        { word: "Soppressione", r: 75, angle: 160 },
        { word: "Arcocromatico", r: 75, angle: 280 },
        { word: "Sinottoforo", r: 0, angle: 0 }
      ]
    },
    crosswordData: {
      gridSize: 15,
      clues: [
        { number: 1, direction: 'across', word: 'SINOTTOFORO', clue: 'Lo strumento principe per la diagnosi e terapia della visione binoculare.', row: 0, col: 0 },
        { number: 4, direction: 'across', word: 'WORTH', clue: 'Lo scienziato che ha codificato i 3 gradi della visione binoculare.', row: 2, col: 8 },
        { number: 5, direction: 'across', word: 'FUSIONE', clue: 'Secondo grado di Worth: unione mentale di due immagini simili.', row: 4, col: 4 },
        { number: 6, direction: 'across', word: 'STEREOPSI', clue: 'Terzo grado di Worth: percezione della profondità tridimensionale 3D.', row: 6, col: 7 },
        { number: 7, direction: 'across', word: 'OGGETTIVO', clue: 'L angolo reale di deviazione azzerato dal movimento dell occhio.', row: 8, col: 6 },
        { number: 8, direction: 'across', word: 'PERCEZIONE', clue: 'Primo grado di Worth: la percezione simultanea (es. Leone nella Gabbia).', row: 9, col: 0 },
        { number: 1, direction: 'down', word: 'SOGGETTIVO', clue: 'L angolo in cui il paziente sovrappone le due immagini al sinottoforo.', row: 0, col: 0 },
        { number: 2, direction: 'down', word: 'SOPPRESSIONE', clue: 'Meccanismo corticale che cancella l immagine dell occhio deviato.', row: 0, col: 4 },
        { number: 3, direction: 'down', word: 'ANOMALA', clue: 'Corrispondenza retinica in cui la fovea si associa a un punto extrafoveale.', row: 0, col: 8 },
        { number: 9, direction: 'down', word: 'DIOTTRIE', clue: 'Unità di misura dei bracci graduati del sinottoforo.', row: 9, col: 2 },
        { number: 10, direction: 'down', word: 'FLASHING', clue: 'Tecnica di stimolazione luminosa alternata delle mire al sinottoforo.', row: 9, col: 5 }
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
        { id: 'a', title: "REBUS A", diagram: "11", expected: "SINOTTOFORO", solutionFormatted: "SINOTTOFORO", hint: "S I N O T T O + F O R O : lo strumento con bracci articolati e oculari." },
        { id: 'b', title: "REBUS B", diagram: "7", expected: "FUSIONE", solutionFormatted: "FUSIONE", hint: "F U S I O N E : unire mentalmente due immagini percepite dai due occhi." },
        { id: 'c', title: "REBUS C", diagram: "6   7", expected: "RETINAANOMALA", solutionFormatted: "RETINA ANOMALA", hint: "R E T I N A + A N O M A L A : la corrispondenza retinica non normale (CRA)." }
      ]
    },
    jokesAndFactsData: {
      jokes: [
        { setup: "Un leone disegnato su una diapositiva del sinottoforo sbotta:", punchline: "'Sono 20 minuti che cerco di entrare in questa gabbia, ma l'ortottista ha aperto il braccio di 15 diottrie!'" },
        { setup: "Cosa dice il primo grado di Worth al terzo grado?", punchline: "'Tu ti credi profondo solo perché vedi tutto in 3D!'" },
        { setup: "Perché il sinottoforo è il miglior mediatore di coppia al mondo?", punchline: "Perché riesce sempre a trovare l'angolo di fusione perfetto!" },
        { setup: "Un occhio soppresso dice all'altro:", punchline: "'Ehi, accendi la luce del flashing altrimenti mi addormento di nuovo!'" },
        { setup: "Cosa fa una diapositiva con il coniglio quando il paziente ha l'angolo oggettivo a zero?", punchline: "Trova finalmente la sua coda!" }
      ],
      facts: [
        { title: "I 3 Gradi di Worth", content: "Codificati da Claud Worth: 1° Grado = Percezione Simultanea (figure differenti, es. leone e gabbia); 2° Grado = Fusione (figure simili con dettagli integrativi); 3° Grado = Stereopsi (profondità 3D)." },
        { title: "Angolo Oggettivo vs Soggettivo", content: "L'angolo oggettivo è la reale deviazione anatomica neutralizzata al sinottoforo. L'angolo soggettivo è quello in cui il paziente sovrappone le immagini. La loro differenza definisce l'angolo di anomalia." },
        { title: "La Corrispondenza Retinica Anomala (CRA)", content: "Nello strabismo precoce, il cervello adatta la mappa sensoriale: la fovea dell'occhio sano fa coppia con un punto extrafoveale dell'occhio deviato per evitare la diplopia." },
        { title: "Il Flashing Terapeutico", content: "La stimolazione luminosa alternata o simultanea delle mire del sinottoforo viene usata in ortottica per sbloccare la soppressione e stimolare l'ampiezza di fusione." }
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
      subtitle: "Trova il percorso anatomico-ottico! Parti dalla LENTE e arriva al centro su OCCHIO usando cambi di lettera, anagrammi e strutture oculari!",
      startWord: "Lente",
      endWord: "Occhio",
      correctChain: [
        "Lente", "Lento", "Vento", "Venetia", "Retina", "Fovea", "Foveola", "Macula", "Cristallino", "Cornea", "Occhio"
      ],
      transitions: {
        "Lente-Lento": "Cambio di lettera (E → O)",
        "Lento-Vento": "Cambio di lettera (L → V)",
        "Vento-Venetia": "Estensione lessicale",
        "Venetia-Retina": "Anagramma / assonanza semantica (tessuto retinico)",
        "Retina-Fovea": "Associazione (la fovea è il centro ad alta acuità della retina)",
        "Fovea-Foveola": "Estensione anatomica (foveola: punto centrale di massima risoluzione)",
        "Foveola-Macula": "Associazione (la macula lutea contiene la fovea e foveola)",
        "Macula-Cristallino": "Associazione (mezzi diottrici e strutture focalizzanti dell'occhio)",
        "Cristallino-Cornea": "Associazione (i due principali elementi di rifrazione corneale/lenticolare)",
        "Cornea-Occhio": "Associazione (la cornea è la finestra trasparente frontale dell'occhio)"
      },
      nodes: [
        { word: "Lente", r: 200, angle: 0 },
        { word: "Lento", r: 200, angle: 72 },
        { word: "Vento", r: 200, angle: 144 },
        { word: "Miopia", r: 200, angle: 216 },
        { word: "Ottotipo", r: 200, angle: 288 },
        { word: "Venetia", r: 155, angle: 36 },
        { word: "Retina", r: 155, angle: 108 },
        { word: "Fovea", r: 155, angle: 180 },
        { word: "Humphrey", r: 155, angle: 252 },
        { word: "Tonometro", r: 155, angle: 324 },
        { word: "Foveola", r: 115, angle: 0 },
        { word: "Macula", r: 115, angle: 90 },
        { word: "Vitreo", r: 115, angle: 180 },
        { word: "Presbiopia", r: 115, angle: 270 },
        { word: "Cristallino", r: 75, angle: 45 },
        { word: "Cornea", r: 75, angle: 160 },
        { word: "Sclera", r: 75, angle: 280 },
        { word: "Occhio", r: 0, angle: 0 }
      ]
    },
    crosswordData: {
      gridSize: 15,
      clues: [
        { number: 1, direction: 'across', word: 'CORNEA', clue: 'La prima lente trasparente ed avascolare della superficie oculare.', row: 0, col: 0 },
        { number: 4, direction: 'across', word: 'MIOPIA', clue: 'Difetto di rifrazione per cui i raggi vanno a fuoco davanti alla retina.', row: 2, col: 8 },
        { number: 5, direction: 'across', word: 'CRISTALLINO', clue: 'La lente intraoculare che varia raggio per l accomodazione visiva.', row: 4, col: 4 },
        { number: 6, direction: 'across', word: 'RETINA', clue: 'Tessuto nervoso fotosensibile su cui si formano le immagini capovolte.', row: 6, col: 8 },
        { number: 7, direction: 'across', word: 'MACULA', clue: 'Area centrale della retina responsabile della visione distinta dei dettagli.', row: 8, col: 8 },
        { number: 8, direction: 'across', word: 'PERIMETRIA', clue: 'L esame strumentale per la mappa quantitativa del campo visivo.', row: 9, col: 0 },
        { number: 1, direction: 'down', word: 'IPERMETROPIA', clue: 'Difetto di rifrazione in cui le immagini vanno a fuoco dietro la retina.', row: 0, col: 0 },
        { number: 2, direction: 'down', word: 'ASTIGMATISMO', clue: 'Ametropia legata ad una differente curvatura dei meridiani corneali.', row: 0, col: 4 },
        { number: 3, direction: 'down', word: 'PRESBIOPIA', clue: 'Fisiologico calo dell accomodazione da vicino che insorge dopo i 40 anni.', row: 0, col: 8 },
        { number: 9, direction: 'down', word: 'TONOMETRO', clue: 'Strumento impiegato per misurare la pressione intraoculare (IOP).', row: 9, col: 2 },
        { number: 10, direction: 'down', word: 'VITREO', clue: 'Il gel trasparente che riempie il cavo posteriore del bulbo oculare.', row: 9, col: 5 }
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
        { id: 'a', title: "REBUS A", diagram: "11", expected: "CRISTALLINO", solutionFormatted: "CRISTALLINO", hint: "C R I S T A L L I N O : la lente naturale trasparente dell'occhio." },
        { id: 'b', title: "REBUS B", diagram: "5   6", expected: "CAMPOVISIVO", solutionFormatted: "CAMPO VISIVO", hint: "C A M P O + V I S I V O : lo spazio che gli occhi riescono ad abbracciare." },
        { id: 'c', title: "REBUS C", diagram: "10", expected: "RIFRAZIONE", solutionFormatted: "RIFRAZIONE", hint: "R I F R A Z I O N E : il percorso e la deviazione dei raggi di luce nell'occhio." }
      ]
    },
    jokesAndFactsData: {
      jokes: [
        { setup: "Perché la miopia non si stanca mai di camminare?", punchline: "Perché guarda sempre avanti... ma vede nitido solo da vicino!" },
        { setup: "Un raggio di luce entra nella cornea e dice al cristallino:", punchline: "'Preparati, adesso tocca a te fare un po' di accomodazione!'" },
        { setup: "Cosa dice l'astigmatismo al cilindro crociato?", punchline: "'Girati pure di 90 gradi, tanto per me cambia tutto l'asse!'" },
        { setup: "Un paziente presbite cerca le chiavi di casa da un'ora:", punchline: "L'ortottista gli dice: 'Guardi che le ha sul naso... e pure gli occhiali da lettura!'" },
        { setup: "Cosa fa il tonometro al parco?", punchline: "Misura la pressione... ma solo in millimetri di mercurio!" }
      ],
      facts: [
        { title: "Cornea e Cristallino", content: "La cornea fornisce circa i 2/3 del potere rifrattivo totale dell'occhio (~43 diottrie). Il cristallino fornisce le rimanenti ~20 diottrie ed è in grado di modificare la sua forma per l'accomodazione." },
        { title: "Miopia vs Ipermetropia", content: "Nella miopia il bulbo è troppo lungo (o la cornea troppo curva) e i raggi vanno a fuoco davanti alla retina. Nell'ipermetropia il bulbo è corto e le immagini vanno a fuoco idealmente dietro la retina." },
        { title: "La Perimetria Computerizzata", content: "Strumenti come il perimetro di Humphrey misurano la sensibilità retinica e rilevano eventuali scotomi o difetti del campo visivo centrale e periferico." },
        { title: "La Tonometria Oculare", content: "Misura la pressione intraoculare (IOP). Valori normali variano tra 10 e 21 mmHg. È fondamentale per la prevenzione del glaucoma e la salute del nervo ottico." }
      ],
      clinicalNote: {
        title: "Vision AI & Oftalmologia Integrata",
        content: "Vision AI supporta l'ortottista nel tracciare i dati refrattivi, oculomotori e perimetrici per un piano riabilitativo personalizzato."
      }
    }
  }
];
