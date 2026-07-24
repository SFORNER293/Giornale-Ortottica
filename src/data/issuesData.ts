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
        // Orizzontali (11)
        { number: 1, direction: 'across', word: 'ORTOTTICA', clue: 'Scienza e professione sanitaria della riabilitazione visiva.', row: 0, col: 0 },
        { number: 4, direction: 'across', word: 'BUIO', clue: 'Assenza di luce che causa la midriasi pupillare.', row: 2, col: 8 },
        { number: 5, direction: 'across', word: 'TESTI', clue: 'Tabelle e prove di lettura impiegate nelle visite ortottiche.', row: 4, col: 4 },
        { number: 6, direction: 'across', word: 'PRISMA', clue: 'Lente a cuneo usata per deviare il fascio luminoso.', row: 6, col: 8 },
        { number: 7, direction: 'across', word: 'ACUTA', clue: 'Qualità della visione foveale distinta (10/10).', row: 8, col: 8 },
        { number: 8, direction: 'across', word: 'SACCADI', clue: 'Movimenti oculari balistici veloci per spostare la fissazione.', row: 9, col: 0 },
        { number: 9, direction: 'across', word: 'FOVEA', clue: 'Depressione centrale della retina ad altissima acuità.', row: 11, col: 0 },
        { number: 10, direction: 'across', word: 'PEV', clue: 'Potenziali Evocati Visivi per lo studio della via ottica.', row: 11, col: 7 },
        { number: 11, direction: 'across', word: 'LUCE', clue: 'Stimolo elettromagnetico primario percepito dalla retina.', row: 13, col: 0 },
        { number: 12, direction: 'across', word: 'ERG', clue: 'Elettroretinogramma per registrare la risposta retinica.', row: 13, col: 6 },
        { number: 13, direction: 'across', word: 'VISUS', clue: 'Il valore di acuità visiva espresso in decimi.', row: 14, col: 8 },

        // Verticali (11) Total = 22 Clues!
        { number: 1, direction: 'down', word: 'OTTOTIPO', clue: 'Tabellone con lettere o simboli per misurare la vista.', row: 0, col: 0 },
        { number: 2, direction: 'down', word: 'TRATTAMENTO', clue: 'Percorso terapeutico di esercizio e rieducazione visiva.', row: 0, col: 4 },
        { number: 3, direction: 'down', word: 'AMBLIOPIA', clue: 'Deficit visivo monolaterale comunemente detto occhio pigro.', row: 0, col: 8 },
        { number: 9, direction: 'down', word: 'CONI', clue: 'Fotorecettori della fovea per colori e visione diurna.', row: 9, col: 2 },
        { number: 10, direction: 'down', word: 'DOPPIA', clue: 'Dicesi della percezione duplice o diplopia.', row: 9, col: 5 },
        { number: 14, direction: 'down', word: 'FIXAZIONE', clue: 'Mantenimento stabile dello sguardo sull oggetto mirato.', row: 0, col: 12 },
        { number: 15, direction: 'down', word: 'INSEGUIMENTO', clue: 'Movimento oculare lento continuo di inseguimento (smooth pursuit).', row: 2, col: 14 },
        { number: 16, direction: 'down', word: 'BASTONCELLI', clue: 'Fotorecettori retinici per la visione crepuscolare e notturna.', row: 4, col: 10 },
        { number: 17, direction: 'down', word: 'RETINA', clue: 'Membrana nervosa fotosensibile del bulbo oculare.', row: 6, col: 6 },
        { number: 18, direction: 'down', word: 'PUPILLA', clue: 'Foro centrale dell iride che varia diametro con la luce.', row: 8, col: 12 },
        { number: 19, direction: 'down', word: 'OCCHIO', clue: 'L organo sensoriale primario dell apparato visivo.', row: 9, col: 9 }
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
        "Angolo Kappa-Hess-Lancaster": "Esame strumentale (lo Schermo di Hess mappa le deviazioni e le ipofunzioni muscolari)",
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
        // Orizzontali (11)
        { number: 1, direction: 'across', word: 'ESOTROPIA', clue: 'Deviazione oculare manifesta verso l interno (convergente).', row: 0, col: 0 },
        { number: 4, direction: 'across', word: 'COVER', clue: 'Test fondamentale eseguito con occlusore per rilevare lo strabismo.', row: 2, col: 8 },
        { number: 5, direction: 'across', word: 'KAPPA', clue: 'L angolo formato tra l asse visivo e l asse pupillare dell occhio.', row: 4, col: 4 },
        { number: 6, direction: 'across', word: 'STECCA', clue: 'Righello di prismi graduati per misurare la deviazione strabica.', row: 6, col: 8 },
        { number: 7, direction: 'across', word: 'HESS', clue: 'Schermo diagnostico svizzero usato per le paresi oculomotorie.', row: 8, col: 8 },
        { number: 8, direction: 'across', word: 'EXOTROPIA', clue: 'Deviazione oculare manifesta verso l esterno (divergente).', row: 9, col: 0 },
        { number: 9, direction: 'across', word: 'FORIA', clue: 'Deviazione oculare latente che emerge interrompendo la fusione.', row: 11, col: 0 },
        { number: 10, direction: 'across', word: 'TORSIONE', clue: 'Deviazione ciclotropica di rotazione attorno all asse visivo.', row: 11, col: 7 },
        { number: 11, direction: 'across', word: 'MICROTROPIA', clue: 'Piccola deviazione strabica manifesta inferiore a 5 diottrie.', row: 13, col: 0 },
        { number: 12, direction: 'across', word: 'ALTEZZA', clue: 'Disparità o deviazione verticale misurata al deviatometro.', row: 13, col: 8 },
        { number: 13, direction: 'across', word: 'BAGOLINI', clue: 'Vetri striati usati per testare la soppressione sensoriale.', row: 14, col: 7 },

        // Verticali (11) Total = 22 Clues!
        { number: 1, direction: 'down', word: 'ELEVAZIONE', clue: 'Movimento oculare verso l alto controllato dal retto superiore.', row: 0, col: 0 },
        { number: 2, direction: 'down', word: 'ORTOFORIA', clue: 'Il perfetto allineamento degli assi visivi senza deviazioni.', row: 0, col: 4 },
        { number: 3, direction: 'down', word: 'PARALISI', clue: 'Deficit motorio di un muscolo extraoculare d origine nervosa.', row: 0, col: 8 },
        { number: 9, direction: 'down', word: 'PRISMI', clue: 'Dispositivi ottici a cuneo usati per neutralizzare la deviazione.', row: 9, col: 2 },
        { number: 10, direction: 'down', word: 'DIPLOPIA', clue: 'Percezione sdoppiata dell immagine nello strabismo insorto.', row: 9, col: 5 },
        { number: 14, direction: 'down', word: 'OCCLUSORE', clue: 'Strumento a paletta per la copertura nell esecuzione del cover test.', row: 0, col: 12 },
        { number: 15, direction: 'down', word: 'DEVIATOMETRO', clue: 'Apparecchio graduato per la misurazione dell angolo di deviazione.', row: 2, col: 14 },
        { number: 16, direction: 'down', word: 'HYPERTROPIA', clue: 'Deviazione manifesta di un occhio verso l alto rispetto all altro.', row: 4, col: 10 },
        { number: 17, direction: 'down', word: 'SACCADE', clue: 'Movimento oculare rapido di fissazione diretto verso la mira.', row: 6, col: 6 },
        { number: 18, direction: 'down', word: 'CONVERGENZA', clue: 'Movimento simultaneo convergente degli occhi verso l interno.', row: 3, col: 2 },
        { number: 19, direction: 'down', word: 'DIVERGENZA', clue: 'Movimento simultaneo divergente degli occhi verso l esterno.', row: 5, col: 0 }
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
        // Orizzontali (11)
        { number: 1, direction: 'across', word: 'SINOTTOFORO', clue: 'Lo strumento principe per la diagnosi e terapia della visione binoculare.', row: 0, col: 0 },
        { number: 4, direction: 'across', word: 'WORTH', clue: 'Lo scienziato che ha codificato i 3 gradi della visione binoculare.', row: 2, col: 8 },
        { number: 5, direction: 'across', word: 'FUSIONE', clue: 'Secondo grado di Worth: unione mentale di due immagini simili.', row: 4, col: 4 },
        { number: 6, direction: 'across', word: 'STEREOPSI', clue: 'Terzo grado di Worth: percezione della profondità tridimensionale 3D.', row: 6, col: 7 },
        { number: 7, direction: 'across', word: 'OGGETTIVO', clue: 'L angolo reale di deviazione azzerato dal movimento dell occhio.', row: 8, col: 6 },
        { number: 8, direction: 'across', word: 'PERCEZIONE', clue: 'Primo grado di Worth: la percezione simultanea (es. Leone nella Gabbia).', row: 9, col: 0 },
        { number: 9, direction: 'across', word: 'MIRE', clue: 'Diapositive trasparenti illuminate inserite nei bracci del sinottoforo.', row: 11, col: 0 },
        { number: 10, direction: 'across', word: 'LEONE', clue: 'Figura tipica della prima diapositiva del test di Worth.', row: 11, col: 6 },
        { number: 11, direction: 'across', word: 'GABBIA', clue: 'Figura contenitrice per testare la percezione simultanea.', row: 13, col: 0 },
        { number: 12, direction: 'across', word: 'FISSIONE', clue: 'Scissione percettiva dell immagine nei test fusionali.', row: 13, col: 7 },
        { number: 13, direction: 'across', word: 'ANOMALIA', clue: 'Deviazione della corrispondenza retinica (CRA/ARC).', row: 14, col: 7 },

        // Verticali (11) Total = 22 Clues!
        { number: 1, direction: 'down', word: 'SOGGETTIVO', clue: 'L angolo in cui il paziente sovrappone le due immagini al sinottoforo.', row: 0, col: 0 },
        { number: 2, direction: 'down', word: 'SOPPRESSIONE', clue: 'Meccanismo corticale che cancella l immagine dell occhio deviato.', row: 0, col: 4 },
        { number: 3, direction: 'down', word: 'ANOMALA', clue: 'Corrispondenza retinica in cui la fovea si associa a un punto extrafoveale.', row: 0, col: 8 },
        { number: 9, direction: 'down', word: 'DIOTTRIE', clue: 'Unità di misura dei bracci graduati del sinottoforo.', row: 9, col: 2 },
        { number: 10, direction: 'down', word: 'FLASHING', clue: 'Tecnica di stimolazione luminosa alternata delle mire al sinottoforo.', row: 9, col: 5 },
        { number: 14, direction: 'down', word: 'AMPIEZZA', clue: 'Escursione di fusione misurata in convergenza e divergenza.', row: 0, col: 12 },
        { number: 15, direction: 'down', word: 'DISPARITA', clue: 'Differenza retinica trasversale minima per attivare la stereopsi.', row: 2, col: 14 },
        { number: 16, direction: 'down', word: 'SUPPRESSION', clue: 'Inibizione del segnale foveale dell occhio deviato.', row: 4, col: 10 },
        { number: 17, direction: 'down', word: 'ARCOCROMATICO', clue: 'Riflesso o braccio articolato del sinottoforo.', row: 2, col: 2 },
        { number: 18, direction: 'down', word: 'CORRISPONDENZA', clue: 'Associazione punto-punto tra le due aree retiniche.', row: 0, col: 14 },
        { number: 19, direction: 'down', word: 'OCULARI', clue: 'Lenti di osservazione poste all estremità dei bracci.', row: 8, col: 12 }
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
        "Ametropia-Perimetria": "Esami strumentali (la perimetria computerizzata di Humphrey mappa la sensibilità dei punti retinici)",
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
        // Orizzontali (11)
        { number: 1, direction: 'across', word: 'CORNEA', clue: 'Prima lente trasparente ed avascolare della superficie oculare.', row: 0, col: 0 },
        { number: 4, direction: 'across', word: 'MIOPIA', clue: 'Difetto di rifrazione con fuoco posizionato davanti alla retina.', row: 2, col: 8 },
        { number: 5, direction: 'across', word: 'CRISTALLINO', clue: 'Lente intraoculare trasparente che varia potere per l accomodazione.', row: 4, col: 4 },
        { number: 6, direction: 'across', word: 'RETINA', clue: 'Membrana fotosensibile posteriore su cui si formano le immagini.', row: 6, col: 8 },
        { number: 7, direction: 'across', word: 'MACULA', clue: 'Area centrale retinica adibita alla visione nitida dei dettagli.', row: 8, col: 8 },
        { number: 8, direction: 'across', word: 'PERIMETRIA', clue: 'Esame strumentale per la mappa del campo visivo.', row: 9, col: 0 },
        { number: 9, direction: 'across', word: 'FOVEOLA', clue: 'Centro assoluto della fovea privo di vasi ad acuità massima.', row: 11, col: 0 },
        { number: 10, direction: 'across', word: 'SCLERA', clue: 'Guscio bianco opaco esterno di protezione del bulbo.', row: 11, col: 8 },
        { number: 11, direction: 'across', word: 'IRIDE', clue: 'Diaframma muscolare colorato dell occhio con la pupilla.', row: 13, col: 0 },
        { number: 12, direction: 'across', word: 'HUMPHREY', clue: 'Perimetro computerizzato standard di riferimento.', row: 13, col: 6 },
        { number: 13, direction: 'across', word: 'SCOTOMA', clue: 'Area di deficit o cecità all interno del campo visivo.', row: 14, col: 8 },

        // Verticali (11) Total = 22 Clues!
        { number: 1, direction: 'down', word: 'IPERMETROPIA', clue: 'Difetto di rifrazione in cui le immagini vanno a fuoco dietro la retina.', row: 0, col: 0 },
        { number: 2, direction: 'down', word: 'ASTIGMATISMO', clue: 'Ametropia dovuta a curvatura asimmetrica dei meridiani corneali.', row: 0, col: 4 },
        { number: 3, direction: 'down', word: 'PRESBIOPIA', clue: 'Calo fisiologico dell accomodazione che insorge dopo i 40 anni.', row: 0, col: 8 },
        { number: 9, direction: 'down', word: 'TONOMETRO', clue: 'Strumento per la misurazione della pressione intraoculare IOP.', row: 9, col: 2 },
        { number: 10, direction: 'down', word: 'VITREO', clue: 'Gel trasparente gelatinoso che riempie il cavo posteriore.', row: 9, col: 5 },
        { number: 14, direction: 'down', word: 'FOROTTERO', clue: 'Strumento ottico a batterie di lenti per determinare la rifrazione.', row: 0, col: 12 },
        { number: 15, direction: 'down', word: 'ACCOMODAZIONE', clue: 'Meccanismo dinamico di variazione del potere del cristallino.', row: 1, col: 14 },
        { number: 16, direction: 'down', word: 'BUSTA', clue: 'Capsula lenticolare trasparente che racchiude il cristallino.', row: 4, col: 10 },
        { number: 17, direction: 'down', word: 'FESSURA', clue: 'Lampada a fessura per l esame al biomicroscopio.', row: 6, col: 6 },
        { number: 18, direction: 'down', word: 'DIOTTRIE', clue: 'Unità di misura del potere di rifrazione delle lenti ottiche.', row: 3, col: 2 },
        { number: 19, direction: 'down', word: 'CONI', clue: 'Fotorecettori cromatici ad alta risoluzione della macula.', row: 9, col: 9 }
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
