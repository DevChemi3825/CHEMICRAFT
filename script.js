const quizHistory = [];

const soundPromptModal = document.getElementById("sound-prompt-modal");
const soundPromptToggleBtn = document.getElementById("sound-prompt-toggle");
const soundPromptDismissBtn = document.getElementById("sound-prompt-dismiss");

const periodicLayout = [
  ["H", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "He"],
  [
    "Li",
    "Be",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "B",
    "C",
    "N",
    "O",
    "F",
    "Ne",
  ],
  [
    "Na",
    "Mg",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Al",
    "Si",
    "P",
    "S",
    "Cl",
    "Ar",
  ],
  [
    "K",
    "Ca",
    "Sc",
    "Ti",
    "V",
    "Cr",
    "Mn",
    "Fe",
    "Co",
    "Ni",
    "Cu",
    "Zn",
    "Ga",
    "Ge",
    "As",
    "Se",
    "Br",
    "Kr",
  ],
  [
    "Rb",
    "Sr",
    "Y",
    "Zr",
    "Nb",
    "Mo",
    "Tc",
    "Ru",
    "Rh",
    "Pd",
    "Ag",
    "Cd",
    "In",
    "Sn",
    "Sb",
    "Te",
    "I",
    "Xe",
  ],
  [
    "Cs",
    "Ba",
    "",
    "Hf",
    "Ta",
    "W",
    "Re",
    "Os",
    "Ir",
    "Pt",
    "Au",
    "Hg",
    "Tl",
    "Pb",
    "Bi",
    "Po",
    "At",
    "Rn",
  ],
  [
    "Fr",
    "Ra",
    "",
    "Rf",
    "Db",
    "Sg",
    "Bh",
    "Hs",
    "Mt",
    "Ds",
    "Rg",
    "Cn",
    "Nh",
    "Fl",
    "Mc",
    "Lv",
    "Ts",
    "Og",
  ],
];

const lanthanides = [
  "La",
  "Ce",
  "Pr",
  "Nd",
  "Pm",
  "Sm",
  "Eu",
  "Gd",
  "Tb",
  "Dy",
  "Ho",
  "Er",
  "Tm",
  "Yb",
  "Lu",
];

const actinides = [
  "Ac",
  "Th",
  "Pa",
  "U",
  "Np",
  "Pu",
  "Am",
  "Cm",
  "Bk",
  "Cf",
  "Es",
  "Fm",
  "Md",
  "No",
  "Lr",
];

const periodicTable = document.getElementById("periodic-table");
const discoveredContainer = document.getElementById("discovered-elements");
const mixingArea = document.getElementById("mixing-area");
const resultArea = document.getElementById("result-area");
const renderedSet = new Set();
const faviconLink = document.getElementById("favicon-link");

let quizScore = parseInt(localStorage.getItem("quizScore")) || 0;
let quizMistakes = parseInt(localStorage.getItem("quizMistakes")) || 0;

const vaultData = {
  H2: {
    name: "Hydrogen Gas",
    formula: "H₂",
    emoji: "🎈",
    use: "Common fuel and reducing agent.",
    trivia: "Most abundant element in the universe.",
    type: "Gas",
  },
  CO: {
    name: "Carbon Monoxide",
    formula: "CO",
    emoji: "😵",
    use: "Used in metallurgy and as a fuel.",
    trivia: "Toxic gas produced from incomplete combustion.",
    type: "Gas",
  },
  CH4: {
    name: "Methane",
    formula: "CH₄",
    emoji: "🔥",
    use: "Main component of natural gas.",
    trivia: "Potent greenhouse gas.",
    type: "Gas",
  },
  NaOH: {
    name: "Sodium Hydroxide",
    formula: "NaOH",
    emoji: "🧪",
    use: "Used in soaps and drain cleaners.",
    trivia: "Also called caustic soda.",
    type: "Base",
  },
  HCl: {
    name: "Hydrochloric Acid",
    formula: "HCl",
    emoji: "🌫️",
    use: "Used in chemical labs and digestion.",
    trivia: "Found in stomach acid.",
    type: "Acid",
  },
  C2H5OH: {
    name: "Ethanol",
    formula: "C₂H₅OH",
    emoji: "🍷",
    use: "In beverages and as a fuel.",
    trivia: "Type of alcohol found in wine.",
    type: "Alcohol",
  },
  NO2: {
    name: "Nitrogen Dioxide",
    formula: "NO₂",
    emoji: "🧨",
    use: "Used in industrial processes.",
    trivia: "Major air pollutant.",
    type: "Gas",
  },
  Cl2: {
    name: "Chlorine Gas",
    formula: "Cl₂",
    emoji: "🧪",
    use: "Used for disinfecting water.",
    trivia: "Toxic greenish-yellow gas.",
    type: "Halogen",
  },
  N2: {
    name: "Nitrogen Gas",
    formula: "N₂",
    emoji: "💨",
    use: "Used in fertilizers and inert atmospheres.",
    trivia: "Makes up 78% of air.",
    type: "Gas",
  },
  O2: {
    name: "Oxygen Gas",
    formula: "O₂",
    emoji: "🌬️",
    use: "Supports combustion and respiration.",
    trivia: "Essential for life.",
    type: "Gas",
  },
  H2S: {
    name: "Hydrogen Sulfide",
    formula: "H₂S",
    emoji: "💨",
    use: "Used in chemical manufacturing.",
    trivia: "Smells like rotten eggs.",
    type: "Gas",
  },
  H2O: {
    name: "Water",
    formula: "H₂O",
    use: "Essential for life and industry.",
    trivia: "Expands when frozen — that's why ice floats!",
    emoji: "💧",
    type: "Molecule",
  },
  NaCl: {
    name: "Salt",
    formula: "NaCl",
    use: "Seasoning and food preservation.",
    trivia: "Used as currency in Roman times.",
    emoji: "🧂",
    type: "Ionic Compound",
  },
  SiO2: {
    name: "Silicon Dioxide",
    formula: "SiO₂",
    use: "Used in glass, concrete, and semiconductors.",
    trivia:
      "Also known as quartz — it's one of the most abundant minerals in Earth's crust.",
    emoji: "🏖️",
    type: "Mineral",
  },
  AgCl: {
    name: "Silver Chloride",
    formula: "AgCl",
    use: "Used in photography and electrochemistry.",
    trivia: "Turns violet on exposure to light.",
    emoji: "📸",
    type: "Salt",
  },
  Al2O3: {
    name: "Aluminum Oxide",
    formula: "Al₂O₃",
    use: "Used in abrasives and ceramics.",
    trivia: "Forms a protective layer on aluminum surfaces.",
    emoji: "🔩",
    type: "Oxide",
  },
  As2O3: {
    name: "Arsenic Trioxide",
    formula: "As₂O₃",
    use: "Used historically in pesticides.",
    trivia: "Extremely toxic and a known poison.",
    emoji: "💀",
    type: "Toxic Compound",
  },
  BaCl2: {
    name: "Barium Chloride",
    formula: "BaCl₂",
    use: "Used in fireworks to create green flames.",
    trivia: "Toxic if ingested.",
    emoji: "🎆",
    type: "Salt",
  },
  BeO: {
    name: "Beryllium Oxide",
    formula: "BeO",
    use: "Used in electronics and ceramics.",
    trivia: "Has high thermal conductivity.",
    emoji: "🧱",
    type: "Oxide",
  },
  BF3: {
    name: "Boron Trifluoride",
    formula: "BF₃",
    use: "Used as a catalyst in organic synthesis.",
    trivia: "Reacts violently with water.",
    emoji: "🔬",
    type: "Inorganic",
  },
  C2H6N2O: {
    name: "Nitroguanidine",
    formula: "C₂H₆N₂O",
    use: "Used in explosives and propellants.",
    trivia: "Stable under normal conditions but explosive.",
    emoji: "💣",
    type: "Explosive",
  },
  CH3CH2NO2: {
    name: "Nitromethane",
    formula: "CH₃CH₂NO₂",
    use: "Used as a fuel in drag racing.",
    trivia: "A volatile and energetic liquid.",
    emoji: "🚀",
    type: "Fuel",
  },
  CH3Cl: {
    name: "Methyl Chloride",
    formula: "CH₃Cl",
    use: "Used in silicone production.",
    trivia: "A colorless, flammable gas.",
    emoji: "🌬️",
    type: "Organic",
  },
  CH5NO: {
    name: "Glycine",
    formula: "CH₅NO",
    use: "An amino acid used in proteins.",
    trivia: "The simplest amino acid found in the human body.",
    emoji: "🧠",
    type: "Organic",
  },
  CN: {
    name: "Cyanide Ion",
    formula: "CN",
    use: "Used in gold mining and organic synthesis.",
    trivia: "Extremely toxic to all aerobic organisms.",
    emoji: "☠️",
    type: "Ion",
  },
  CS2: {
    name: "Carbon Disulfide",
    formula: "CS₂",
    use: "Used in rayon and cellophane production.",
    trivia: "Highly flammable and toxic.",
    emoji: "🧪",
    type: "Solvent",
  },
  CuO: {
    name: "Copper(II) Oxide",
    formula: "CuO",
    use: "Used in pigments and batteries.",
    trivia: "A black solid used in ceramics.",
    emoji: "🔋",
    type: "Oxide",
  },
  CuS: {
    name: "Copper Sulfide",
    formula: "CuS",
    use: "Used in solar cells and semiconductors.",
    trivia: "Occurs naturally as covellite mineral.",
    emoji: "⚙️",
    type: "Mineral",
  },
  EsF3: {
    name: "Einsteinium Fluoride",
    formula: "EsF₃",
    use: "Studied in radioactive research.",
    trivia: "Synthesized in extremely small amounts.",
    emoji: "🧪",
    type: "Radioactive",
  },
  Fe2O3: {
    name: "Iron(III) Oxide",
    formula: "Fe₂O₃",
    use: "Used as pigment and in polishing.",
    trivia: "Commonly known as rust.",
    emoji: "🧱",
    type: "Oxide",
  },
  FmO3: {
    name: "Fermium Trioxide",
    formula: "FmO₃",
    use: "Purely research purposes in nuclear chemistry.",
    trivia: "Extremely rare and radioactive.",
    emoji: "🌌",
    type: "Radioactive",
  },
  HBr: {
    name: "Hydrobromic Acid",
    formula: "HBr",
    use: "Used in industrial chemistry.",
    trivia: "A strong acid with pungent fumes.",
    emoji: "🌪️",
    type: "Acid",
  },
  HNO3: {
    name: "Nitric Acid",
    formula: "HNO₃",
    use: "Used in fertilizers and explosives.",
    trivia: "Corrosive and a strong oxidizer.",
    emoji: "☣️",
    type: "Acid",
  },
  H2Se: {
    name: "Hydrogen Selenide",
    formula: "H₂Se",
    use: "Used in chemical vapor deposition.",
    trivia: "Very toxic and smells like decaying radishes.",
    emoji: "🌫️",
    type: "Gas",
  },
  H2S: {
    name: "Hydrogen Sulfide",
    formula: "H₂S",
    use: "Found in volcanic gases and sewers.",
    trivia: "Smells like rotten eggs and is toxic.",
    emoji: "💨",
    type: "Gas",
  },
  HgCl2: {
    name: "Mercury(II) Chloride",
    formula: "HgCl₂",
    use: "Used in disinfectants and research.",
    trivia: "Highly toxic mercury salt.",
    emoji: "☠️",
    type: "Salt",
  },
  KCl: {
    name: "Potassium Chloride",
    formula: "KCl",
    use: "Used in fertilizers and salt substitutes.",
    trivia: "Supplies potassium to the body.",
    emoji: "🧂",
    type: "Salt",
  },
  KOH: {
    name: "Potassium Hydroxide",
    formula: "KOH",
    use: "Used in making soap and batteries.",
    trivia: "Also called caustic potash.",
    emoji: "🧪",
    type: "Base",
  },
  LiF: {
    name: "Lithium Fluoride",
    formula: "LiF",
    use: "Used in optics and metallurgy.",
    trivia: "Transparent to ultraviolet light.",
    emoji: "🔋",
    type: "Salt",
  },
  LiOH: {
    name: "Lithium Hydroxide",
    formula: "LiOH",
    use: "Used in batteries and air purification.",
    trivia: "Removes CO₂ from spacecraft air.",
    emoji: "🔋",
    type: "Base",
  },
  MnO4: {
    name: "Permanganate",
    formula: "MnO₄",
    use: "Used as an oxidizer and disinfectant.",
    trivia: "Bright purple in solution.",
    emoji: "🧪",
    type: "Ion",
  },
  NaHCO3: {
    name: "Sodium Bicarbonate",
    formula: "NaHCO₃",
    use: "Used in baking and cleaning.",
    trivia: "Also known as baking soda.",
    emoji: "🧁",
    type: "Salt",
  },
  NH4: {
    name: "Ammonium",
    formula: "NH₄",
    use: "A common ion in fertilizers.",
    trivia: "Combines with anions to form stable salts.",
    emoji: "⚗️",
    type: "Ion",
  },
  NH4NO3: {
    name: "Ammonium Nitrate",
    formula: "NH₄NO₃",
    use: "Used in fertilizers and explosives.",
    trivia: "Can detonate under extreme heat.",
    emoji: "💥",
    type: "Salt",
  },
  NiO: {
    name: "Nickel Oxide",
    formula: "NiO",
    use: "Used in ceramics and batteries.",
    trivia: "Forms green to black powder.",
    emoji: "⚙️",
    type: "Oxide",
  },
  PbO: {
    name: "Lead(II) Oxide",
    formula: "PbO",
    use: "Used in glass and ceramics.",
    trivia: "Toxic lead compound with multiple uses.",
    emoji: "🧪",
    type: "Oxide",
  },
  SbCl3: {
    name: "Antimony Chloride",
    formula: "SbCl₃",
    use: "Used in flame retardants and catalysts.",
    trivia: "Hydrolyzes in moist air.",
    emoji: "🧪",
    type: "Salt",
  },
  SnF2: {
    name: "Stannous Fluoride",
    formula: "SnF₂",
    use: "Used in toothpaste.",
    trivia: "Helps reduce cavities and tooth sensitivity.",
    emoji: "🦷",
    type: "Salt",
  },
  SO3: {
    name: "Sulfur Trioxide",
    formula: "SO₃",
    use: "Used to make sulfuric acid.",
    trivia: "Highly reactive with water.",
    emoji: "☁",
    type: "Acid Anhydride",
  },
  TiO2: {
    name: "Titanium Dioxide",
    formula: "TiO₂",
    use: "Used in paints and sunscreens.",
    trivia: "Bright white pigment with UV protection.",
    emoji: "🎨",
    type: "Oxide",
  },
  ZnO: {
    name: "Zinc Oxide",
    formula: "ZnO",
    use: "Used in creams and rubber production.",
    trivia: "Provides UV protection in sunscreens.",
    emoji: "🌞",
    type: "Oxide",
  },
  ZnS: {
    name: "Zinc Sulfide",
    formula: "ZnS",
    use: "Used in luminescent materials.",
    trivia: "Glows under UV light.",
    emoji: "💡",
    type: "Salt",
  },
  CO2: {
    name: "Carbon Dioxide",
    formula: "CO₂",
    use: "In fizzy drinks and respiration.",
    trivia: "Exhaled by humans and inhaled by plants.",
    emoji: "🍃",
    type: "Gas",
  },
  NH3: {
    name: "Ammonia",
    formula: "NH₃",
    use: "Used in fertilizers and cleaning products.",
    trivia: "Has a sharp smell often found in cat pee.",
    emoji: "💨",
    type: "Base",
  },
  H2SO4: {
    name: "Sulfuric Acid",
    formula: "H₂SO₄",
    use: "Used in batteries and fertilizers.",
    trivia: "Highly corrosive and reactive with water.",
    emoji: "🧫",
    type: "Acid",
  },
  CH3COOH: {
    name: "Acetic Acid",
    formula: "CH₃COOH",
    use: "Main acid in vinegar; used in food and lab chemistry.",
    trivia: "Acetic acid gives vinegar its sour smell and taste.",
    emoji: "🍯",
    type: "Organic Acid",
  },
  Br2: {
    name: "Bromine",
    formula: "Br₂",
    use: "Used in flame retardants and some medicines.",
    trivia: "Only nonmetal that is liquid at room temp.",
    emoji: "🧪",
    type: "Elemental Molecule",
  },
  I2: {
    name: "Iodine",
    formula: "I₂",
    use: "Used in antiseptics and thyroid treatments.",
    trivia: "Turns purple when vaporized.",
    emoji: "🧴",
    type: "Elemental Molecule",
  },
  HF: {
    name: "Hydrofluoric Acid",
    formula: "HF",
    use: "Used to etch glass and metals.",
    trivia: "Can penetrate skin and is extremely toxic.",
    emoji: "🧪",
    type: "Acid",
  },
  UO2: {
    name: "Uranium Dioxide",
    formula: "UO₂",
    use: "Used as nuclear reactor fuel.",
    trivia: "Slightly radioactive and forms black crystals.",
    emoji: "☢️",
    type: "Radioactive Oxide",
  },
  ThO2: {
    name: "Thorium Dioxide",
    formula: "ThO₂",
    use: "Used in gas mantles and nuclear fuel.",
    trivia: "Has a very high melting point (~3300°C).",
    emoji: "☢️",
    type: "Radioactive Oxide",
  },
  RaCl2: {
    name: "Radium Chloride",
    formula: "RaCl₂",
    use: "Historic use in glow-in-the-dark paint.",
    trivia: "Discovered by Marie Curie; highly radioactive.",
    emoji: "⚛️",
    type: "Radioactive Salt",
  },
  RnF: {
    name: "Radon Fluoride",
    formula: "RnF",
    use: "Hypothetical; extremely unstable.",
    trivia: "Radon is a noble gas and rarely bonds.",
    emoji: "🌫️",
    type: "Gas",
  },
  PuO3: {
    name: "Plutonium Trioxide",
    formula: "PuO₃",
    use: "Used in nuclear reprocessing.",
    trivia: "Highly reactive and toxic.",
    emoji: "☣️",
    type: "Radioactive Oxide",
  },
  AmO3: {
    name: "Americium Trioxide",
    formula: "AmO₃",
    use: "Used in smoke detectors (as Am²⁴¹).",
    trivia: "Discovered during Manhattan Project.",
    emoji: "☢️",
    type: "Radioactive Oxide",
  },
  NpF6: {
    name: "Neptunium Hexafluoride",
    formula: "NpF₆",
    use: "Used in nuclear fuel processing.",
    trivia: "One of few neptunium compounds that sublimes.",
    emoji: "💥",
    type: "Radioactive Salt",
  },
  CmCl3: {
    name: "Curium Chloride",
    formula: "CmCl₃",
    use: "Used in scientific research only.",
    trivia: "Curium glows purple in the dark!",
    emoji: "⚗️",
    type: "Radioactive Salt",
  },
  BkO3: {
    name: "Berkelium Trioxide",
    formula: "BkO₃",
    use: "Highly unstable; studied for nuclear chemistry.",
    trivia: "Named after Berkeley, California.",
    emoji: "☠️",
    type: "Radioactive Oxide",
  },
  CfCl3: {
    name: "Californium Chloride",
    formula: "CfCl₃",
    use: "Used as neutron source in nuclear reactors.",
    trivia: "One gram can emit 170 million neutrons per minute.",
    emoji: "☢️",
    type: "Radioactive Salt",
  },
  CH4N2O: {
    name: "Urea",
    formula: "CH₄N₂O",
    use: "Used in fertilizers and skincare products.",
    trivia:
      "The first organic compound ever synthesized from inorganic material.",
    emoji: "💊",
    type: "Organic Compound",
  },
  C2H4O2: {
    name: "Acetic Acid",
    formula: "C₂H₄O₂",
    use: "Found in vinegar, used in food and chemistry.",
    trivia: "Naturally produced during fermentation.",
    emoji: "🍯",
    type: "Organic Acid",
  },
  MgCl2: {
    name: "Magnesium Chloride",
    formula: "MgCl₂",
    use: "Used in supplements and road de-icing.",
    trivia: "Can be harvested from seawater.",
    emoji: "💪",
    type: "Salt",
  },
  NaBr: {
    name: "Sodium Bromide",
    formula: "NaBr",
    use: "Used as sedative in the early 1900s.",
    trivia: "Sometimes used in hot tubs to generate bromine.",
    emoji: "🧴",
    type: "Salt",
  },
  LiOH: {
    name: "Lithium Hydroxide",
    formula: "LiOH",
    use: "Used in batteries and CO₂ scrubbers.",
    trivia: "Removes carbon dioxide in spacecrafts.",
    emoji: "🔋",
    type: "Base",
  },
  KOH: {
    name: "Potassium Hydroxide",
    formula: "KOH",
    use: "Used in soap and biodiesel production.",
    trivia: "Also called caustic potash.",
    emoji: "🧼",
    type: "Base",
  },
  AlCl3: {
    name: "Aluminum Chloride",
    formula: "AlCl₃",
    use: "Used in antiperspirants and as a catalyst.",
    trivia: "Reacts violently with water!",
    emoji: "🧲",
    type: "Salt",
  },
  BH3: {
    name: "Borane",
    formula: "BH₃",
    use: "Used in organic synthesis and rocket fuel.",
    trivia: "A highly unstable molecule with unusual bonding.",
    emoji: "⚗️",
    type: "Molecule",
  },
  NH4Cl: {
    name: "Ammonium Chloride",
    formula: "NH₄Cl",
    use: "Used in cough medicine and fertilizers.",
    trivia: "Fizzes when mixed with baking soda.",
    emoji: "🧪",
    type: "Salt",
  },
  ZnS: {
    name: "Zinc Sulfide",
    formula: "ZnS",
    use: "Used in glow-in-the-dark materials.",
    trivia: "Can glow green or blue under UV light.",
    emoji: "💡",
    type: "Salt",
  },
};

const compoundRecipes = {
  "H+H+O": { symbol: "H2O", result: "💧 Water (H₂O)" },
  "Na+Cl": { symbol: "NaCl", result: "🧂 Salt (NaCl)" },
  "C+O": { symbol: "CO", result: "😵 Carbon Monoxide (CO)" },
  "C+O+O": { symbol: "CO2", result: "🍃 Carbon Dioxide (CO₂)" },
  "C+H+H+H+H": { symbol: "CH4", result: "🔥 Methane (CH₄)" },
  "N+H+H+H": { symbol: "NH3", result: "💨 Ammonia (NH₃)" },
  "Na+O+H": { symbol: "NaOH", result: "🧪 Sodium Hydroxide (NaOH)" },
  "H+Cl": { symbol: "HCl", result: "🌫️ Hydrochloric Acid (HCl)" },
  "H+S+O+O+O+O": { symbol: "H2SO4", result: "🧫 Sulfuric Acid (H₂SO₄)" },
  "C+H+H+O+H": { symbol: "C2H5OH", result: "🍷 Ethanol (C₂H₅OH)" },
  "N+O+O": { symbol: "NO2", result: "🧨 Nitrogen Dioxide (NO₂)" },
  "K+Cl": { symbol: "KCl", result: "🧂 Potassium Chloride (KCl)" },
  "Ca+C+O+O+O": { symbol: "CaCO3", result: "🏗️ Calcium Carbonate (CaCO₃)" },
  "Mg+O": { symbol: "MgO", result: "✨ Magnesium Oxide (MgO)" },
  "Fe+O+O+O": { symbol: "Fe2O3", result: "🧱 Rust (Fe₂O₃)" },
  "Al+O+O+O": { symbol: "Al2O3", result: "🔩 Aluminum Oxide (Al₂O₃)" },
  "H+N+O+O+O": { symbol: "HNO3", result: "☣️ Nitric Acid (HNO₃)" },
  "Ca+O+H+H": { symbol: "Ca(OH)2", result: "🧼 Calcium Hydroxide (Ca(OH)₂)" },
  "Na+H+CO3": { symbol: "NaHCO3", result: "🧁 Baking Soda (NaHCO₃)" },
  "H+C+N": { symbol: "HCN", result: "💀 Hydrogen Cyanide (HCN)" },
  "Si+O+O": { symbol: "SiO2", result: "🏖️ Silicon Dioxide (SiO₂)" },
  "Cu+S": { symbol: "CuS", result: "⚙️ Copper Sulfide (CuS)" },
  "Ag+Cl": { symbol: "AgCl", result: "📸 Silver Chloride (AgCl)" },
  "Pb+O": { symbol: "PbO", result: "🧪 Lead(II) Oxide (PbO)" },
  "Zn+O": { symbol: "ZnO", result: "🌞 Zinc Oxide (ZnO)" },
  "Ba+Cl+Cl": { symbol: "BaCl2", result: "🎆 Barium Chloride (BaCl₂)" },
  "Li+F": { symbol: "LiF", result: "🔋 Lithium Fluoride (LiF)" },
  "Be+O": { symbol: "BeO", result: "🧱 Beryllium Oxide (BeO)" },
  "B+F+F+F": { symbol: "BF3", result: "🔬 Boron Trifluoride (BF₃)" },
  "C+S+S": { symbol: "CS2", result: "🧪 Carbon Disulfide (CS₂)" },
  "C+H+H+H+H+Cl": { symbol: "CH3Cl", result: "🌬️ Methyl Chloride (CH₃Cl)" },
  "C+H+H+O+O": { symbol: "CH3COOH", result: "🍶 Acetic Acid (CH₃COOH)" },
  "N+H+H+H+H": { symbol: "NH4", result: "⚗️ Ammonium (NH₄⁺)" },
  "N+H+H+H+H+O+O+O": {
    symbol: "NH4NO3",
    result: "💥 Ammonium Nitrate (NH₄NO₃)",
  },
  "S+O+O+O": { symbol: "SO3", result: "☁️ Sulfur Trioxide (SO₃)" },
  "H+H+S": { symbol: "H2S", result: "💨 Hydrogen Sulfide (H₂S)" },
  "C+N": { symbol: "CN", result: "☠️ Cyanide Ion (CN⁻)" },
  "Ti+O+O": { symbol: "TiO2", result: "🎨 Titanium Dioxide (TiO₂)" },
  "Cl+Cl": { symbol: "Cl2", result: "🧪 Chlorine Gas (Cl₂)" },
  "H+H": { symbol: "H2", result: "🎈 Hydrogen Gas (H₂)" },
  "O+O": { symbol: "O2", result: "🌬️ Oxygen Gas (O₂)" },
  "N+N": { symbol: "N2", result: "💨 Nitrogen Gas (N₂)" },
  "F+F": { symbol: "F2", result: "🌫️ Fluorine Gas (F₂)" },
  "Br+Br": { symbol: "Br2", result: "🧪 Bromine Gas (Br₂)" },
  "I+I": { symbol: "I2", result: "🧴 Iodine (I₂)" },
  "H+Br": { symbol: "HBr", result: "🌪️ Hydrobromic Acid (HBr)" },
  "H+F": { symbol: "HF", result: "🧪 Hydrofluoric Acid (HF)" },
  "C+H+H+N+O": { symbol: "CH4N2O", result: "💊 Urea (CH₄N₂O)" },
  "C+H+H+H+H+O+O": { symbol: "C2H4O2", result: "🍯 Acetic Acid (C₂H₄O₂)" },
  "Ca+S": { symbol: "CaS", result: "🧂 Calcium Sulfide (CaS)" },
  "Mg+Cl+Cl": { symbol: "MgCl2", result: "💪 Magnesium Chloride (MgCl₂)" },
  "Na+Br": { symbol: "NaBr", result: "🧴 Sodium Bromide (NaBr)" },
  "Li+O+H": { symbol: "LiOH", result: "🔋 Lithium Hydroxide (LiOH)" },
  "K+O+H": { symbol: "KOH", result: "🧪 Potassium Hydroxide (KOH)" },
  "Al+Cl+Cl+Cl": { symbol: "AlCl3", result: "🧲 Aluminum Chloride (AlCl₃)" },
  "B+H+H+H": { symbol: "BH3", result: "⚗️ Borane (BH₃)" },
  "N+H+H+H+Cl": { symbol: "NH4Cl", result: "🧪 Ammonium Chloride (NH₄Cl)" },
  "Zn+S": { symbol: "ZnS", result: "💡 Zinc Sulfide (ZnS)" },
  "C+H+H+H+H+N+O": { symbol: "CH5NO", result: "🧠 Glycine (C₂H₅NO₂)" },
  "C+H+H+O+N+N": { symbol: "C2H6N2O", result: "💣 Nitroguanidine (C₂H₆N₄O₂)" },
  "Cu+O": { symbol: "CuO", result: "🔩 Copper(II) Oxide (CuO)" },
  "Hg+Cl+Cl": { symbol: "HgCl2", result: "☠️ Mercury(II) Chloride (HgCl₂)" },
  "Ni+O": { symbol: "NiO", result: "⚙️ Nickel Oxide (NiO)" },
  "Sn+F+F": { symbol: "SnF2", result: "🦷 Stannous Fluoride (SnF₂)" },
  "C+H+H+H+H+O+O+N": {
    symbol: "CH3CH2NO2",
    result: "🚀 Nitromethane (CH₃CH₂NO₂)",
  },
  "Mn+O+O+O+O": { symbol: "MnO4", result: "🧪 Permanganate (MnO₄⁻)" },
  "Cr+O+O+O": { symbol: "CrO3", result: "🧪 Chromium Trioxide (CrO₃)" },
  "As+O+O+O": { symbol: "As2O3", result: "💀 Arsenic Trioxide (As₂O₃)" },
  "Sb+Cl+Cl+Cl": { symbol: "SbCl3", result: "🧪 Antimony Chloride (SbCl₃)" },
  "Se+H+H": { symbol: "H2Se", result: "🌫️ Hydrogen Selenide (H₂Se)" },
  "U+O+O": { symbol: "UO2", result: "☢️ Uranium Dioxide (UO₂)" },
  "Th+O+O": { symbol: "ThO2", result: "☢️ Thorium Dioxide (ThO₂)" },
  "Ra+Cl+Cl": { symbol: "RaCl2", result: "⚛️ Radium Chloride (RaCl₂)" },
  "Rn+F": { symbol: "RnF", result: "🌫️ Radon Fluoride (RnF)" },
  "Pu+O+O+O": { symbol: "PuO3", result: "☣️ Plutonium Trioxide (PuO₃)" },
  "Am+O+O+O": { symbol: "AmO3", result: "☢️ Americium Trioxide (AmO₃)" },
  "Np+F+F+F+F+F+F": {
    symbol: "NpF6",
    result: "💥 Neptunium Hexafluoride (NpF₆)",
  },
  "Cm+Cl+Cl+Cl": { symbol: "CmCl3", result: "⚗️ Curium Chloride (CmCl₃)" },
  "Bk+O+O+O": { symbol: "BkO3", result: "☠️ Berkelium Trioxide (BkO₃)" },
  "Cf+Cl+Cl+Cl": { symbol: "CfCl3", result: "☢️ Californium Chloride (CfCl₃)" },
  "Es+F+F+F": { symbol: "EsF3", result: "🧪 Einsteinium Fluoride (EsF₃)" },
  "Fm+O+O+O": { symbol: "FmO3", result: "🌌 Fermium Trioxide (FmO₃)" },
};

let discoveredVault = [];

const elements = [
  {
    symbol: "H",
    name: "Hydrogen",
    atomicNumber: 1,
    atomicMass: 1.008,
    category: "nonmetal",
    phase: "gas",
  },
  {
    symbol: "He",
    name: "Helium",
    atomicNumber: 2,
    atomicMass: 4.0026,
    category: "noble-gas",
    phase: "gas",
  },
  {
    symbol: "Li",
    name: "Lithium",
    atomicNumber: 3,
    atomicMass: 6.94,
    category: "alkali-metal",
    phase: "solid",
  },
  {
    symbol: "Be",
    name: "Beryllium",
    atomicNumber: 4,
    atomicMass: 9.0122,
    category: "alkaline-earth-metal",
    phase: "solid",
  },
  {
    symbol: "B",
    name: "Boron",
    atomicNumber: 5,
    atomicMass: 10.81,
    category: "metalloid",
    phase: "solid",
  },
  {
    symbol: "C",
    name: "Carbon",
    atomicNumber: 6,
    atomicMass: 12.011,
    category: "nonmetal",
    phase: "solid",
  },
  {
    symbol: "N",
    name: "Nitrogen",
    atomicNumber: 7,
    atomicMass: 14.007,
    category: "nonmetal",
    phase: "gas",
  },
  {
    symbol: "O",
    name: "Oxygen",
    atomicNumber: 8,
    atomicMass: 15.999,
    category: "nonmetal",
    phase: "gas",
  },
  {
    symbol: "F",
    name: "Fluorine",
    atomicNumber: 9,
    atomicMass: 18.998,
    category: "halogen",
    phase: "gas",
  },
  {
    symbol: "Ne",
    name: "Neon",
    atomicNumber: 10,
    atomicMass: 20.18,
    category: "noble-gas",
    phase: "gas",
  },
  {
    symbol: "Na",
    name: "Sodium",
    atomicNumber: 11,
    atomicMass: 22.99,
    category: "alkali-metal",
    phase: "solid",
  },
  {
    symbol: "Mg",
    name: "Magnesium",
    atomicNumber: 12,
    atomicMass: 24.305,
    category: "alkaline-earth-metal",
    phase: "solid",
  },
  {
    symbol: "Al",
    name: "Aluminum",
    atomicNumber: 13,
    atomicMass: 26.982,
    category: "post-transition-metal",
    phase: "solid",
  },
  {
    symbol: "Si",
    name: "Silicon",
    atomicNumber: 14,
    atomicMass: 28.085,
    category: "metalloid",
    phase: "solid",
  },
  {
    symbol: "P",
    name: "Phosphorus",
    atomicNumber: 15,
    atomicMass: 30.974,
    category: "nonmetal",
    phase: "solid",
  },
  {
    symbol: "S",
    name: "Sulfur",
    atomicNumber: 16,
    atomicMass: 32.06,
    category: "nonmetal",
    phase: "solid",
  },
  {
    symbol: "Cl",
    name: "Chlorine",
    atomicNumber: 17,
    atomicMass: 35.45,
    category: "halogen",
    phase: "gas",
  },
  {
    symbol: "Ar",
    name: "Argon",
    atomicNumber: 18,
    atomicMass: 39.948,
    category: "noble-gas",
    phase: "gas",
  },
  {
    symbol: "K",
    name: "Potassium",
    atomicNumber: 19,
    atomicMass: 39.098,
    category: "alkali-metal",
    phase: "solid",
  },
  {
    symbol: "Ca",
    name: "Calcium",
    atomicNumber: 20,
    atomicMass: 40.078,
    category: "alkaline-earth-metal",
    phase: "solid",
  },
  {
    symbol: "Sc",
    name: "Scandium",
    atomicNumber: 21,
    atomicMass: 44.956,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Ti",
    name: "Titanium",
    atomicNumber: 22,
    atomicMass: 47.867,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "V",
    name: "Vanadium",
    atomicNumber: 23,
    atomicMass: 50.942,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Cr",
    name: "Chromium",
    atomicNumber: 24,
    atomicMass: 51.996,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Mn",
    name: "Manganese",
    atomicNumber: 25,
    atomicMass: 54.938,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Fe",
    name: "Iron",
    atomicNumber: 26,
    atomicMass: 55.845,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Co",
    name: "Cobalt",
    atomicNumber: 27,
    atomicMass: 58.933,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Ni",
    name: "Nickel",
    atomicNumber: 28,
    atomicMass: 58.693,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Cu",
    name: "Copper",
    atomicNumber: 29,
    atomicMass: 63.546,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Zn",
    name: "Zinc",
    atomicNumber: 30,
    atomicMass: 65.38,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Ga",
    name: "Gallium",
    atomicNumber: 31,
    atomicMass: 69.723,
    category: "post-transition-metal",
    phase: "solid",
  },
  {
    symbol: "Ge",
    name: "Germanium",
    atomicNumber: 32,
    atomicMass: 72.63,
    category: "metalloid",
    phase: "solid",
  },
  {
    symbol: "As",
    name: "Arsenic",
    atomicNumber: 33,
    atomicMass: 74.922,
    category: "metalloid",
    phase: "solid",
  },
  {
    symbol: "Se",
    name: "Selenium",
    atomicNumber: 34,
    atomicMass: 78.971,
    category: "nonmetal",
    phase: "solid",
  },
  {
    symbol: "Br",
    name: "Bromine",
    atomicNumber: 35,
    atomicMass: 79.904,
    category: "halogen",
    phase: "liquid",
  },
  {
    symbol: "Kr",
    name: "Krypton",
    atomicNumber: 36,
    atomicMass: 83.798,
    category: "noble-gas",
    phase: "gas",
  },
  {
    symbol: "Rb",
    name: "Rubidium",
    atomicNumber: 37,
    atomicMass: 85.468,
    category: "alkali-metal",
    phase: "solid",
  },
  {
    symbol: "Sr",
    name: "Strontium",
    atomicNumber: 38,
    atomicMass: 87.62,
    category: "alkaline-earth-metal",
    phase: "solid",
  },
  {
    symbol: "Y",
    name: "Yttrium",
    atomicNumber: 39,
    atomicMass: 88.906,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Zr",
    name: "Zirconium",
    atomicNumber: 40,
    atomicMass: 91.224,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Nb",
    name: "Niobium",
    atomicNumber: 41,
    atomicMass: 92.906,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Mo",
    name: "Molybdenum",
    atomicNumber: 42,
    atomicMass: 95.95,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Tc",
    name: "Technetium",
    atomicNumber: 43,
    atomicMass: 98,
    category: "transition-metal",
    phase: "artificial",
  },
  {
    symbol: "Ru",
    name: "Ruthenium",
    atomicNumber: 44,
    atomicMass: 101.07,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Rh",
    name: "Rhodium",
    atomicNumber: 45,
    atomicMass: 102.91,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Pd",
    name: "Palladium",
    atomicNumber: 46,
    atomicMass: 106.42,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Ag",
    name: "Silver",
    atomicNumber: 47,
    atomicMass: 107.87,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Cd",
    name: "Cadmium",
    atomicNumber: 48,
    atomicMass: 112.41,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "In",
    name: "Indium",
    atomicNumber: 49,
    atomicMass: 114.82,
    category: "post-transition-metal",
    phase: "solid",
  },
  {
    symbol: "Sn",
    name: "Tin",
    atomicNumber: 50,
    atomicMass: 118.71,
    category: "post-transition-metal",
    phase: "solid",
  },
  {
    symbol: "Sb",
    name: "Antimony",
    atomicNumber: 51,
    atomicMass: 121.76,
    category: "metalloid",
    phase: "solid",
  },
  {
    symbol: "Te",
    name: "Tellurium",
    atomicNumber: 52,
    atomicMass: 127.6,
    category: "metalloid",
    phase: "solid",
  },
  {
    symbol: "I",
    name: "Iodine",
    atomicNumber: 53,
    atomicMass: 126.9,
    category: "halogen",
    phase: "solid",
  },
  {
    symbol: "Xe",
    name: "Xenon",
    atomicNumber: 54,
    atomicMass: 131.29,
    category: "noble-gas",
    phase: "gas",
  },
  {
    symbol: "Cs",
    name: "Cesium",
    atomicNumber: 55,
    atomicMass: 132.91,
    category: "alkali-metal",
    phase: "solid",
  },
  {
    symbol: "Ba",
    name: "Barium",
    atomicNumber: 56,
    atomicMass: 137.33,
    category: "alkaline-earth-metal",
    phase: "solid",
  },
  {
    symbol: "La",
    name: "Lanthanum",
    atomicNumber: 57,
    atomicMass: 138.91,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Ce",
    name: "Cerium",
    atomicNumber: 58,
    atomicMass: 140.12,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Pr",
    name: "Praseodymium",
    atomicNumber: 59,
    atomicMass: 140.91,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Nd",
    name: "Neodymium",
    atomicNumber: 60,
    atomicMass: 144.24,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Pm",
    name: "Promethium",
    atomicNumber: 61,
    atomicMass: 145,
    category: "lanthanide",
    phase: "artificial",
  },
  {
    symbol: "Sm",
    name: "Samarium",
    atomicNumber: 62,
    atomicMass: 150.36,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Eu",
    name: "Europium",
    atomicNumber: 63,
    atomicMass: 151.96,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Gd",
    name: "Gadolinium",
    atomicNumber: 64,
    atomicMass: 157.25,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Tb",
    name: "Terbium",
    atomicNumber: 65,
    atomicMass: 158.93,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Dy",
    name: "Dysprosium",
    atomicNumber: 66,
    atomicMass: 162.5,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Ho",
    name: "Holmium",
    atomicNumber: 67,
    atomicMass: 164.93,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Er",
    name: "Erbium",
    atomicNumber: 68,
    atomicMass: 167.26,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Tm",
    name: "Thulium",
    atomicNumber: 69,
    atomicMass: 168.93,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Yb",
    name: "Ytterbium",
    atomicNumber: 70,
    atomicMass: 173.05,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Lu",
    name: "Lutetium",
    atomicNumber: 71,
    atomicMass: 174.97,
    category: "lanthanide",
    phase: "solid",
  },
  {
    symbol: "Hf",
    name: "Hafnium",
    atomicNumber: 72,
    atomicMass: 178.49,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Ta",
    name: "Tantalum",
    atomicNumber: 73,
    atomicMass: 180.95,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "W",
    name: "Tungsten",
    atomicNumber: 74,
    atomicMass: 183.84,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Re",
    name: "Rhenium",
    atomicNumber: 75,
    atomicMass: 186.21,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Os",
    name: "Osmium",
    atomicNumber: 76,
    atomicMass: 190.23,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Ir",
    name: "Iridium",
    atomicNumber: 77,
    atomicMass: 192.22,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Pt",
    name: "Platinum",
    atomicNumber: 78,
    atomicMass: 195.08,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Au",
    name: "Gold",
    atomicNumber: 79,
    atomicMass: 196.97,
    category: "transition-metal",
    phase: "solid",
  },
  {
    symbol: "Hg",
    name: "Mercury",
    atomicNumber: 80,
    atomicMass: 200.59,
    category: "transition-metal",
    phase: "liquid",
  },
  {
    symbol: "Tl",
    name: "Thallium",
    atomicNumber: 81,
    atomicMass: 204.38,
    category: "post-transition-metal",
    phase: "solid",
  },
  {
    symbol: "Pb",
    name: "Lead",
    atomicNumber: 82,
    atomicMass: 207.2,
    category: "post-transition-metal",
    phase: "solid",
  },
  {
    symbol: "Bi",
    name: "Bismuth",
    atomicNumber: 83,
    atomicMass: 208.98,
    category: "post-transition-metal",
    phase: "solid",
  },
  {
    symbol: "Po",
    name: "Polonium",
    atomicNumber: 84,
    atomicMass: 209,
    category: "metalloid",
    phase: "solid",
  },
  {
    symbol: "At",
    name: "Astatine",
    atomicNumber: 85,
    atomicMass: 210,
    category: "halogen",
    phase: "solid",
  },
  {
    symbol: "Rn",
    name: "Radon",
    atomicNumber: 86,
    atomicMass: 222,
    category: "noble-gas",
    phase: "gas",
  },
  {
    symbol: "Fr",
    name: "Francium",
    atomicNumber: 87,
    atomicMass: 223,
    category: "alkali-metal",
    phase: "solid",
  },
  {
    symbol: "Ra",
    name: "Radium",
    atomicNumber: 88,
    atomicMass: 226,
    category: "alkaline-earth-metal",
    phase: "solid",
  },
  {
    symbol: "Ac",
    name: "Actinium",
    atomicNumber: 89,
    atomicMass: 227,
    category: "actinide",
    phase: "solid",
  },
  {
    symbol: "Th",
    name: "Thorium",
    atomicNumber: 90,
    atomicMass: 232.04,
    category: "actinide",
    phase: "solid",
  },
  {
    symbol: "Pa",
    name: "Protactinium",
    atomicNumber: 91,
    atomicMass: 231.04,
    category: "actinide",
    phase: "solid",
  },
  {
    symbol: "U",
    name: "Uranium",
    atomicNumber: 92,
    atomicMass: 238.03,
    category: "actinide",
    phase: "solid",
  },
  {
    symbol: "Np",
    name: "Neptunium",
    atomicNumber: 93,
    atomicMass: 237,
    category: "actinide",
    phase: "artificial",
  },
  {
    symbol: "Pu",
    name: "Plutonium",
    atomicNumber: 94,
    atomicMass: 244,
    category: "actinide",
    phase: "artificial",
  },
  {
    symbol: "Am",
    name: "Americium",
    atomicNumber: 95,
    atomicMass: 243,
    category: "actinide",
    phase: "artificial",
  },
  {
    symbol: "Cm",
    name: "Curium",
    atomicNumber: 96,
    atomicMass: 247,
    category: "actinide",
    phase: "artificial",
  },
  {
    symbol: "Bk",
    name: "Berkelium",
    atomicNumber: 97,
    atomicMass: 247,
    category: "actinide",
    phase: "artificial",
  },
  {
    symbol: "Cf",
    name: "Californium",
    atomicNumber: 98,
    atomicMass: 251,
    category: "actinide",
    phase: "artificial",
  },
  {
    symbol: "Es",
    name: "Einsteinium",
    atomicNumber: 99,
    atomicMass: 252,
    category: "actinide",
    phase: "artificial",
  },
  {
    symbol: "Fm",
    name: "Fermium",
    atomicNumber: 100,
    atomicMass: 257,
    category: "actinide",
    phase: "artificial",
  },
  {
    symbol: "Md",
    name: "Mendelevium",
    atomicNumber: 101,
    atomicMass: 258,
    category: "actinide",
    phase: "artificial",
  },
  {
    symbol: "No",
    name: "Nobelium",
    atomicNumber: 102,
    atomicMass: 259,
    category: "actinide",
    phase: "artificial",
  },
  {
    symbol: "Lr",
    name: "Lawrencium",
    atomicNumber: 103,
    atomicMass: 262,
    category: "actinide",
    phase: "artificial",
  },
  {
    symbol: "Rf",
    name: "Rutherfordium",
    atomicNumber: 104,
    atomicMass: 267,
    category: "transition-metal",
    phase: "artificial",
  },
  {
    symbol: "Db",
    name: "Dubnium",
    atomicNumber: 105,
    atomicMass: 270,
    category: "transition-metal",
    phase: "artificial",
  },
  {
    symbol: "Sg",
    name: "Seaborgium",
    atomicNumber: 106,
    atomicMass: 271,
    category: "transition-metal",
    phase: "artificial",
  },
  {
    symbol: "Bh",
    name: "Bohrium",
    atomicNumber: 107,
    atomicMass: 270,
    category: "transition-metal",
    phase: "artificial",
  },
  {
    symbol: "Hs",
    name: "Hassium",
    atomicNumber: 108,
    atomicMass: 277,
    category: "transition-metal",
    phase: "artificial",
  },
  {
    symbol: "Mt",
    name: "Meitnerium",
    atomicNumber: 109,
    atomicMass: 278,
    category: "unknown",
    phase: "artificial",
  },
  {
    symbol: "Ds",
    name: "Darmstadtium",
    atomicNumber: 110,
    atomicMass: 281,
    category: "unknown",
    phase: "artificial",
  },
  {
    symbol: "Rg",
    name: "Roentgenium",
    atomicNumber: 111,
    atomicMass: 282,
    category: "unknown",
    phase: "artificial",
  },
  {
    symbol: "Cn",
    name: "Copernicium",
    atomicNumber: 112,
    atomicMass: 285,
    category: "transition-metal",
    phase: "artificial",
  },
  {
    symbol: "Nh",
    name: "Nihonium",
    atomicNumber: 113,
    atomicMass: 286,
    category: "unknown",
    phase: "artificial",
  },
  {
    symbol: "Fl",
    name: "Flerovium",
    atomicNumber: 114,
    atomicMass: 289,
    category: "post-transition-metal",
    phase: "artificial",
  },
  {
    symbol: "Mc",
    name: "Moscovium",
    atomicNumber: 115,
    atomicMass: 290,
    category: "unknown",
    phase: "artificial",
  },
  {
    symbol: "Lv",
    name: "Livermorium",
    atomicNumber: 116,
    atomicMass: 293,
    category: "post-transition-metal",
    phase: "artificial",
  },
  {
    symbol: "Ts",
    name: "Tennessine",
    atomicNumber: 117,
    atomicMass: 294,
    category: "halogen",
    phase: "artificial",
  },
  {
    symbol: "Og",
    name: "Oganesson",
    atomicNumber: 118,
    atomicMass: 294,
    category: "noble-gas",
    phase: "artificial",
  },
];

const defaultDiscovered = [""];
let unlockQueue = [
  "He",
  "Li",
  "Be",
  "B",
  "C",
  "N",
  "O",
  "F",
  "Ne",
  "Na",
  "Mg",
  "Al",
  "Si",
  "P",
  "S",
  "Cl",
  "Ar",
  "K",
  "Ca",
  "Sc",
  "Ti",
  "V",
  "Cr",
  "Mn",
  "Fe",
  "Co",
  "Ni",
  "Cu",
  "Zn",
  "Ga",
  "Ge",
  "As",
  "Se",
  "Br",
  "Kr",
  "Rb",
  "Sr",
  "Y",
  "Zr",
  "Nb",
  "Mo",
  "Tc",
  "Ru",
  "Rh",
  "Pd",
  "Ag",
  "Cd",
  "In",
  "Sn",
  "Sb",
  "Te",
  "I",
  "Xe",
  "Cs",
  "Ba",
  "La",
  "Ce",
  "Pr",
  "Nd",
  "Pm",
  "Sm",
  "Eu",
  "Gd",
  "Tb",
  "Dy",
  "Ho",
  "Er",
  "Tm",
  "Yb",
  "Lu",
  "Hf",
  "Ta",
  "W",
  "Re",
  "Os",
  "Ir",
  "Pt",
  "Au",
  "Hg",
  "Tl",
  "Pb",
  "Bi",
  "Po",
  "At",
  "Rn",
  "Fr",
  "Ra",
  "Ac",
  "Th",
  "Pa",
  "U",
  "Np",
  "Pu",
  "Am",
  "Cm",
  "Bk",
  "Cf",
  "Es",
  "Fm",
  "Md",
  "No",
  "Lr",
  "Rf",
  "Db",
  "Sg",
  "Bh",
  "Hs",
  "Mt",
  "Ds",
  "Rg",
  "Cn",
  "Nh",
  "Fl",
  "Mc",
  "Lv",
  "Ts",
  "Og",
];

let discovered = [];
let mixed = [];
let currentLanguage = "en";

function setLanguage(lang) {
  currentLanguage = lang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

document.querySelectorAll("[data-i18n]").forEach((element) => {
  const key = element.getAttribute("data-i18n");
  if (translations[lang] && translations[lang][key]) {
    element.innerHTML = translations[lang][key];
  }
});


  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.getAttribute("data-i18n-title");
    if (translations[lang] && translations[lang][key]) {
      element.title = translations[lang][key];
    }
  });

  updateDynamicText();
}

function updateDynamicText() {
  document.getElementById("flaskii-bubble").textContent =
    translations[currentLanguage].flaskii_hi;

  const startQuizBtn = document.getElementById("start-quiz-btn");
  if (startQuizBtn) {
    if (quizFinished) {
      startQuizBtn.textContent = translations[currentLanguage].quiz_completed;
    } else if (startQuizBtn.disabled) {
      startQuizBtn.textContent = translations[currentLanguage].quiz_in_progress;
    } else {
      startQuizBtn.textContent =
        translations[currentLanguage].start_quiz_button;
    }
  }

  const resumeQuizBtn = document.getElementById("resume-quiz-btn");
  if (resumeQuizBtn) {
    if (quizFinished) {
      resumeQuizBtn.textContent =
        translations[currentLanguage].quiz_finished_message;
    } else {
      resumeQuizBtn.textContent =
        translations[currentLanguage].resume_quiz_button;
    }
  }

  const popupCategoryElement = document.getElementById("popup-category");
  if (popupCategoryElement && currentQuizElement) {
    popupCategoryElement.textContent = `${
      translations[currentLanguage].category
    } ${formatCategory(currentQuizElement.category)}`;
  }

  const mixingAreaPlaceholder = document.querySelector("#mixing-area p");
  if (mixingAreaPlaceholder) {
    mixingAreaPlaceholder.textContent =
      translations[currentLanguage].mixing_area_placeholder;
  }

  const resultAreaPlaceholder = document.querySelector("#result-area p");
  if (resultAreaPlaceholder) {
    resultAreaPlaceholder.textContent =
      translations[currentLanguage].combination_results_placeholder;
  }

  updateProgressBar();

  const vaultList = document.getElementById("vault-list");
  if (
    vaultList &&
    discoveredVault.length === 0 &&
    vaultList.textContent.includes("No compounds found")
  ) {
    vaultList.innerHTML = `<p style='text-align: center; margin-top: 20px;'>${translations[currentLanguage].no_compounds_found}</p>`;
  }

  const puzzleInfo = document.getElementById("puzzle-info");
  if (puzzleInfo) {
    puzzleInfo.textContent = translations[currentLanguage].puzzle_info;
  }

  const puzzleResult = document.getElementById("puzzle-result");
  if (puzzleResult) {
    puzzleResult.textContent = "";
  }

  const tableQuizQuestion = document.getElementById("table-quiz-question");
  if (tableQuizQuestion) {
    tableQuizQuestion.textContent =
      translations[currentLanguage].table_quiz_question;
  }

  const tableQuizElementDisplay = document.getElementById("table-quiz-element");
  if (
    tableQuizElementDisplay &&
    tableQuizElementDisplay.textContent === "Discover elements first!"
  ) {
    tableQuizElementDisplay.textContent =
      translations[currentLanguage].table_quiz_discover_first;
  }

  const winMessage = document.querySelector("#win-screen p");
  if (winMessage) {
    winMessage.innerHTML = translations[currentLanguage].win_message;
  }

  const puzzleBlockerTitle = document.querySelector("#puzzle-blocker h2");
  if (puzzleBlockerTitle) {
    puzzleBlockerTitle.textContent =
      translations[currentLanguage].puzzle_blocker_title;
  }
  const puzzleBlockerMessage1 = document.querySelector(
    "#puzzle-blocker p:nth-of-type(1)"
  );
  if (puzzleBlockerMessage1) {
    puzzleBlockerMessage1.textContent =
      translations[currentLanguage].puzzle_blocker_message_1;
  }
  const puzzleBlockerMessage2 = document.querySelector(
    "#puzzle-blocker p:nth-of-type(2)"
  );
  if (puzzleBlockerMessage2) {
    puzzleBlockerMessage2.textContent =
      translations[currentLanguage].puzzle_blocker_message_2;
  }

  const allQuizQuestionsTitle = document.querySelector(
    "#question-review-modal h2"
  );
  if (allQuizQuestionsTitle) {
    allQuizQuestionsTitle.textContent =
      translations[currentLanguage].all_quiz_questions_title;
  }

  const questionInfo = document.getElementById("question-info");
  if (questionInfo && questionInfo.textContent.includes("Select a question")) {
    questionInfo.innerHTML = `<p>${translations[currentLanguage].select_question_info}</p>`;
  }

  const tableQuizOptionsButtons = document.querySelectorAll(
    "#table-quiz-options button"
  );
  tableQuizOptionsButtons.forEach((btn) => {
    const originalText = btn.dataset.originalText;
    if (originalText && categoryNames[originalText]) {
      btn.textContent =
        translations[currentLanguage][originalText.replace(/-/g, "_")];
    }
  });
}

function createElementDiv(el) {
  const div = document.createElement("div");
  div.className = `pt-element ${el.category || ""}`;
  div.setAttribute("data-phase", el.phase || "unknown");

  div.innerHTML = `
    <div class="pt-number">${el.atomicNumber}</div>
    <div class="pt-symbol">${el.symbol}</div>
    <div class="pt-name">${el.name}</div>
    <div class="pt-mass">${el.atomicMass}</div>
  `;
  div.dataset.symbol = el.symbol;
  div.title = `${el.name} (${el.symbol})\n${translations[currentLanguage].atomic_number} ${el.atomicNumber}\n${translations[currentLanguage].mass} ${el.atomicMass}`;

  div.addEventListener("click", () => {
    if (!discovered.includes(el.symbol)) {
      discovered.push(el.symbol);
      renderDiscovered();
    }
  });

  div.setAttribute("draggable", true);
  div.dataset.symbol = el.symbol;

  div.addEventListener("click", () => {
    addToMix(el.symbol);
  });

  div.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", el.symbol);
  });

  return div;
}

const evaluationBtn = document.getElementById("evaluation-btn");
const contactUsModal = document.getElementById("contact-us-modal");
const closeContactUsModalBtn = document.getElementById(
  "close-contact-us-modal"
);
const contactForm = document.getElementById("contact-form");
const contactFormStatus = document.getElementById("contact-form-status");

if (evaluationBtn) {
  evaluationBtn.textContent =
    translations[currentLanguage].contact_us_button || "✉️ Contact Us!";
  evaluationBtn.removeAttribute("href");
  evaluationBtn.removeAttribute("target");
  evaluationBtn.removeAttribute("title");
  evaluationBtn.setAttribute("data-i18n", "contact_us_button");
  evaluationBtn.setAttribute("data-i18n-title", "");

  evaluationBtn.addEventListener("click", () => {
    contactUsModal.classList.remove("hidden");
    const modalContent = contactUsModal.querySelector(".modal-content");
    modalContent.classList.remove("modal-arise");
    void modalContent.offsetWidth;
    modalContent.classList.add("modal-arise");

    const sfx = document.getElementById("ui-popup-sfx");
    if (sfx && !sfx.muted) {
      sfx.currentTime = 0;
      sfx.play();
    }
    contactFormStatus.classList.add("hidden");
    contactForm.reset();
  });
}

closeContactUsModalBtn.addEventListener("click", () => {
  const modalContent = contactUsModal.querySelector(".modal-content");
  modalContent.classList.remove("modal-arise");
  modalContent.classList.add("modal-exit");

  setTimeout(() => {
    contactUsModal.classList.add("hidden");
    modalContent.classList.remove("modal-exit");
  }, 300);
});

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const message = document.getElementById("contact-message").value;

  contactFormStatus.textContent = translations[currentLanguage].contact_sending;
  contactFormStatus.style.color = "#facc15";
  contactFormStatus.classList.remove("hidden");
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const formspreeEndpoint = "https://formspree.io/f/xanbdkkg";
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
      }),
    });

    if (response.ok) {
      contactFormStatus.textContent =
        translations[currentLanguage].contact_success;
      contactFormStatus.style.color = "#10b981";
      contactForm.reset();
    } else {
      contactFormStatus.textContent =
        translations[currentLanguage].contact_error;
      contactFormStatus.style.color = "#ef4444";
      console.error("Formspree error:", await response.json());
    }
  } catch (error) {
    console.error("Error sending message:", error);
    contactFormStatus.textContent = translations[currentLanguage].contact_error;
    contactFormStatus.style.color = "#ef4444";
  }
});

function createElementCard(symbol) {
  const div = document.createElement("div");

  if (symbol && symbol !== "") {
    const el = elements.find((e) => e.symbol === symbol.replace("*", ""));
    if (el) {
      const isDiscovered = discovered.includes(el.symbol);
      const fakeElementBox = createElementDiv(el);
      const elementBoxHTML = fakeElementBox.innerHTML;

      div.className = `pt-element ${el.category || ""} ${
        isDiscovered ? "discovered" : "undiscovered"
      }`;
      div.setAttribute("data-symbol", el.symbol);
      div.setAttribute("draggable", isDiscovered);

      div.innerHTML = `
        <div class="card-flip">
          <div class="card-inner ${isDiscovered ? "flipped" : ""}">
            <div class="card-front"><div class="pt-symbol">?</div></div>
            <div class="card-back ${el.category || ""}">${elementBoxHTML}</div>
          </div>
        </div>
      `;

      div.title = isDiscovered
        ? `${el.name} (${el.symbol})\n${translations[currentLanguage].atomic_number} ${el.atomicNumber}\n${translations[currentLanguage].mass} ${el.atomicMass}`
        : "???";

      if (isDiscovered) {
        div.addEventListener("click", () => {
          showElementPopup(el);
          addToMix(el.symbol);
        });

        div.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", el.symbol);
        });
      } else {
        div.style.pointerEvents = "none";
      }
    }
  } else {
    div.className = "empty-cell";
  }

  return div;
}

function addToMix(symbol) {
  mixed.push(symbol);
  renderMixingArea();
  saveGameProgress();
}

function renderDiscovered() {
  discovered.forEach((sym) => {
    if (document.querySelector(`.pt-element[data-symbol="${sym}"]`)) return;

    const el = elements.find((e) => e.symbol === sym);
    if (el) {
      const card = createElementDiv(el);
      card.classList.add("flip");
      discoveredContainer.appendChild(card);
    }
  });
}

function updateProgressBar() {
  const totalElements = elements.length;
  const unlocked = discovered.length;
  const percent = (unlocked / totalElements) * 100;

  const bar = document.getElementById("progress-bar");
  const text = document.getElementById("progress-text");
  const container = document.getElementById("progress-container");

  bar.style.width = `${percent}%`;
  text.textContent = `${unlocked} / ${totalElements} ${
    translations[currentLanguage].elements_text || "Elements"
  }`;

  if (unlocked >= totalElements) {
    container.classList.add("hidden");
  } else {
    container.classList.remove("hidden");
  }

  if ([25, 50, 75, 100].includes(Math.floor(percent))) {
    bar.classList.add("glow-burst");
    setTimeout(() => bar.classList.remove("glow-burst"), 1000);
  }
}

function renderPeriodicTable() {
  const grid = document.getElementById("periodic-full-grid");
  grid.innerHTML = "";

  const topLeft = document.createElement("div");
  topLeft.className = "periodic-label";
  grid.appendChild(topLeft);

  for (let g = 1; g <= 18; g++) {
    const label = document.createElement("div");
    label.className = "periodic-label";
    label.textContent = g;
    grid.appendChild(label);
  }

  periodicLayout.forEach((row, rowIndex) => {
    const periodLabel = document.createElement("div");
    periodLabel.className = "periodic-label";
    periodLabel.textContent = rowIndex + 1;
    grid.appendChild(periodLabel);

    row.forEach((symbol) => {
      const div = document.createElement("div");

      if (symbol && symbol !== "") {
        const el = elements.find((e) => e.symbol === symbol.replace("*", ""));
        if (el) {
          const isDiscovered = discovered.includes(el.symbol);
          const fakeElementBox = createElementDiv(el);
          const elementBoxHTML = fakeElementBox.innerHTML;

          div.className = `pt-element ${el.category || ""} ${
            isDiscovered ? "discovered" : "undiscovered"
          }`;
          div.setAttribute("data-symbol", el.symbol);
          div.setAttribute("draggable", isDiscovered);

          div.innerHTML = `
            <div class="card-flip">
              <div class="card-inner ${isDiscovered ? "flipped" : ""}">
                <div class="card-front"><div class="pt-symbol">?</div></div>
                <div class="card-back ${
                  el.category || ""
                }">${elementBoxHTML}</div>
              </div>
            </div>
          `;

          div.title = isDiscovered
            ? `${el.name} (${el.symbol})\n${translations[currentLanguage].atomic_number} ${el.atomicNumber}\n${translations[currentLanguage].mass} ${el.atomicMass}`
            : "???";

          if (isDiscovered) {
            div.addEventListener("click", () => {
              showElementPopup(el);
              addToMix(el.symbol);
            });

            div.addEventListener("dragstart", (e) => {
              e.dataTransfer.setData("text/plain", el.symbol);
            });
          } else {
            div.style.pointerEvents = "none";
          }
        }
      } else {
        div.className = "empty-cell";
      }

      grid.appendChild(div);
    });
  });

  updateProgressBar();
  renderLanthanides();
  renderActinides();
}

function renderLanthanides() {
  const lanthanidesRow = document.getElementById("lanthanides-row");
  lanthanidesRow.innerHTML = "";

  for (let i = 0; i < 2; i++) {
    const spacer = document.createElement("div");
    spacer.className = "empty-cell";
    lanthanidesRow.appendChild(spacer);
  }

  lanthanides.forEach((symbol) => {
    const div = createElementCard(symbol);
    lanthanidesRow.appendChild(div);
  });
}

function renderActinides() {
  const actinidesRow = document.getElementById("actinides-row");
  actinidesRow.innerHTML = "";

  for (let i = 0; i < 2; i++) {
    const spacer = document.createElement("div");
    spacer.className = "empty-cell";
    actinidesRow.appendChild(spacer);
  }

  actinides.forEach((symbol) => {
    const div = createElementCard(symbol);
    actinidesRow.appendChild(div);
  });
}

function addBlockRow(label, row) {
  const title = document.createElement("div");
  title.className = "block-label";
  title.textContent = label;
  title.style.gridColumn = "span 18";
  periodicTable.appendChild(title);

  row.forEach((symbol) => {
    const div = document.createElement("div");
    if (symbol && symbol !== "") {
      const el = elements.find((e) => e.symbol === symbol);
      if (el) {
        const isDiscovered = discovered.includes(el.symbol);
        const fakeElementBox = createElementDiv(el);
        const elementBoxHTML = fakeElementBox.innerHTML;

        div.className = `pt-element ${el.category || ""} ${
          isDiscovered ? "discovered" : "undiscovered"
        }`;
        div.setAttribute("data-symbol", el.symbol);

        div.innerHTML = `
          <div class="card-flip">
            <div class="card-inner ${isDiscovered ? "flipped" : ""}">
              <div class="card-front">
                <div class="pt-symbol">?</div>
              </div>
              <div class="card-back ${el.category || ""}">
                ${elementBoxHTML}
              </div>
            </div>
          </div>
        `;

        div.title = isDiscovered
          ? `${el.name} (${el.symbol})\n${translations[currentLanguage].atomic_number} ${el.atomicNumber}\n${translations[currentLanguage].mass} ${el.atomicMass}`
          : "???";

        if (isDiscovered) {
          div.addEventListener("click", () => {
            showElementPopup(el);
            addToMix(el.symbol);
          });

          div.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", el.symbol);
          });
        } else {
          div.style.pointerEvents = "none";
        }
      }
    } else {
      div.className = "empty-cell";
    }

    periodicTable.appendChild(div);
  });
}

function renderMixingArea() {
  mixingArea.innerHTML = "";
  mixingArea.classList.remove("empty");

  if (mixed.length === 0) {
    mixingArea.classList.add("empty");
    mixingArea.innerHTML = `<p>${translations[currentLanguage].mixing_area_placeholder}</p>`;
    return;
  }

  mixed.forEach((symbol, index) => {
    const el = elements.find((e) => e.symbol === symbol);
    if (el) {
      const elementDiv = createElementDiv(el);

      // Create remove button
      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.textContent = "×";
      removeBtn.title = "Remove element";
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering addToMix on parent click
        mixed.splice(index, 1);
        renderMixingArea();
        saveGameProgress();
      });

      elementDiv.style.position = "relative";
      elementDiv.appendChild(removeBtn);

      mixingArea.appendChild(elementDiv);
    }
  });
}

const resetProgressBtn = document.getElementById("reset-progress-btn");
const resetProgressModal = document.getElementById("reset-progress-modal");
const confirmResetProgressBtn = document.getElementById(
  "confirm-reset-progress"
);
const cancelResetProgressBtn = document.getElementById("cancel-reset-progress");

resetProgressBtn.addEventListener("click", () => {
  resetProgressModal.classList.remove("hidden");
});

cancelResetProgressBtn.addEventListener("click", () => {
  resetProgressModal.classList.add("hidden");
});

confirmResetProgressBtn.addEventListener("click", () => {
  resetProgressModal.classList.add("hidden");
  restartGame(); // This function resets all progress and UI
});

function speak(text, lang = "en") {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);

    // Pick language
    utterance.lang = lang === "id" ? "id-ID" : "en-US";

    // Flaskii personality
    utterance.pitch = 1.4; // playful, higher pitch
    utterance.rate = 1.15; // slightly faster
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
  } else {
    console.log("Speech not supported in this browser.");
  }
}

function checkCombination() {
  const sortedCombo = mixed.slice().sort().join("+");
  const exactCombo = mixed.join("+");

  let recipe = compoundRecipes[sortedCombo] || compoundRecipes[exactCombo];
  let result = "";
  if (recipe) {
    result = recipe.result;

    if (!discoveredVault.includes(recipe.symbol)) {
      discoveredVault.push(recipe.symbol);
      saveGameProgress();
    }

    resultArea.innerHTML = `
    <div id="bounce-result" class="combo-success">
      <h2>${result}</h2>
    </div>
  `;

    const bounceEl = document.getElementById("bounce-result");
    bounceEl.classList.remove("bounce-result");
    void bounceEl.offsetWidth;
    bounceEl.classList.add("bounce-result");

    animateCombination();
    updateVaultUI();
    playSuccessSound();

    // 👇 Speak in current language
    if (currentLanguage === "id") {
      speak(`${mixed.join(" ditambah ")} menjadi ${result}`, "id");
    } else {
      speak(`${mixed.join(" plus ")} makes ${result}`, "en");
    }

    flaskiiReact("😍", translations[currentLanguage].flaskii_happy_discovered);
  } else {
    resultArea.innerHTML = `<p>${translations[currentLanguage].no_combination}</p>`;
    playFailSound();

    // 👇 Fail message
    if (currentLanguage === "id") {
      speak(`Maaf, ${mixed.join(" dan ")} tidak bisa digabungkan`, "id");
    } else {
      speak(`Sorry, ${mixed.join(" and ")} cannot be combined`, "en");
    }

    flaskiiReact("😭", translations[currentLanguage].flaskii_sad_try_else);
  }

  mixed = [];
  renderMixingArea();
  saveGameProgress();
}

function animateCombination() {
  const mixingAreaRect = mixingArea.getBoundingClientRect();
  const particlesCount = 30;

  for (let i = 0; i < particlesCount; i++) {
    const particle = document.createElement("div");
    particle.className =
      "particle particle-" + (Math.floor(Math.random() * 3) + 1);

    particle.style.left = `${Math.random() * mixingAreaRect.width}px`;
    particle.style.top = `${Math.random() * mixingAreaRect.height}px`;

    mixingArea.appendChild(particle);

    particle.addEventListener("animationend", () => {
      particle.remove();
    });
  }

  mixingArea.classList.add("combine-animation");
  setTimeout(() => {
    mixingArea.classList.remove("combine-animation");
  }, 1000);
}

mixingArea.addEventListener("dragover", (e) => e.preventDefault());

mixingArea.addEventListener("drop", (e) => {
  const symbol = e.dataTransfer.getData("text/plain");
  if (symbol) addToMix(symbol);
});

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  const allPTElements = document.querySelectorAll(".pt-element");

  allPTElements.forEach((div) => {
    const symbol = div.dataset.symbol?.toLowerCase();
    const element = elements.find((e) => e.symbol.toLowerCase() === symbol);
    const name = element?.name.toLowerCase();

    const isDiscovered = discovered.includes(element?.symbol);

    div.classList.remove("highlight", "shake");

    if (!query) return;

    const match = symbol.startsWith(query) || name?.startsWith(query);

    if (match) {
      if (isDiscovered) {
        div.classList.add("highlight");
        div.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        div.classList.add("shake");
        setTimeout(() => div.classList.remove("shake"), 600);
      }
    }
  });
});

document.getElementById("mix-btn").addEventListener("click", () => {
  if (mixed.length < 2) return;
  checkCombination();
});

const themeToggleBtn = document.getElementById("toggle-theme");

const resetBtn = document.getElementById("reset-btn");
const modal = document.getElementById("reset-modal");
const confirmBtn = document.getElementById("confirm-reset");
const cancelBtn = document.getElementById("cancel-reset");

resetBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

confirmBtn.addEventListener("click", () => {
  mixed = [];
  renderMixingArea();
  resultArea.innerHTML = `<p>${translations[currentLanguage].combination_results_placeholder}</p>`;
  modal.classList.add("hidden");
  saveGameProgress();
});

const flaskii = document.getElementById("flaskii");
const flaskiiFace = document.getElementById("flaskii-face");
const flaskiiBubble = document.getElementById("flaskii-bubble");

const flaskiiLines = [
  "flaskii_mix_magic",
  "flaskii_flaskinated",
  "flaskii_bubbly",
  "flaskii_try_new",
  "flaskii_carbon",
  "flaskii_clicked",
];

const flaskiiHappyLines = [
  "flaskii_happy_discovered",
  "flaskii_happy_unlocked",
  "flaskii_happy_genius",
];

const flaskiiSadLines = [
  "flaskii_sad_failed",
  "flaskii_sad_try_else",
  "flaskii_sad_believe",
];

flaskii.addEventListener("click", () => {
  const lineKey = flaskiiLines[Math.floor(Math.random() * flaskiiLines.length)];
  flaskiiBubble.textContent = translations[currentLanguage][lineKey];
  flaskiiReact("🧪");
});

function flaskiiReact(face, textKey) {
  flaskiiFace.textContent = face || "🧪";
  if (textKey) flaskiiBubble.textContent = textKey;
  else flaskiiBubble.textContent = translations[currentLanguage].flaskii_hi;

  flaskii.classList.add("reacting");
  setTimeout(() => flaskii.classList.remove("reacting"), 800);
}

const bgMusic = document.getElementById("bg-music");
const successSfx = document.getElementById("success");
const failSfx = document.getElementById("fail");
const soundToggle = document.getElementById("sound-toggle");
const filterSfx = document.getElementById("filter-sfx");
let soundOn = true;

function playSuccessSound() {
  if (soundOn) successSfx.play();
}
function playFailSound() {
  if (soundOn) failSfx.play();
}

// MultipleFiles/script.js

// ... (existing code) ...

// Add this function to show the sound prompt modal
function showSoundPrompt() {
  soundPromptModal.classList.remove("hidden");
  const modalContent = soundPromptModal.querySelector(".modal-content");
  modalContent.classList.remove("modal-arise");
  void modalContent.offsetWidth; // Trigger reflow
  modalContent.classList.add("modal-arise");
}

soundPromptToggleBtn.addEventListener("click", () => {
  soundOn = true;
  soundToggle.textContent = "🔊";
  bgMusic.volume = 0.4;
  bgMusic.loop = true; // Ensure bgMusic loops when turned on via prompt
  bgMusic
    .play()
    .catch((e) => console.error("Error playing background music:", e));

  // Also ensure intro-sound is stopped if it was playing
  const introSound = document.getElementById("intro-sound");
  if (introSound) {
    introSound.pause();
    introSound.currentTime = 0;
  }

  soundPromptModal.classList.add("hidden");
  localStorage.setItem("chemicraft_soundPreference", "on"); // Save preference
});

soundPromptDismissBtn.addEventListener("click", () => {
  soundOn = false;
  soundToggle.textContent = "🔇";
  bgMusic.volume = 0;
  bgMusic.pause(); // Ensure it's paused if dismissed
  soundPromptModal.classList.add("hidden");
  localStorage.setItem("chemicraft_soundPreference", "off"); // Save preference
});

// ... (rest of your existing code) ...

soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.textContent = soundOn ? "🔊" : "🔇";
  bgMusic.volume = soundOn ? 0.4 : 0;
  if (soundOn && bgMusic.paused) bgMusic.play();
});

// MultipleFiles/script.js

document.addEventListener("DOMContentLoaded", () => {
  loadGameProgress();
  setLanguage(currentLanguage);
  renderPeriodicTable();
  renderDiscovered();
  renderLanthanides();
  renderActinides();
  updateVaultUI();
  updateProgressBar();

  if (quizFinished) {
    const resumeBtn = document.getElementById("resume-quiz-btn");
    resumeBtn.textContent = translations[currentLanguage].quiz_finished_message;
    resumeBtn.classList.remove("hidden");
    document.getElementById("start-quiz-btn").disabled = true;
    document.getElementById("start-quiz-btn").textContent =
      translations[currentLanguage].quiz_completed;
  } else if (unlockQueue.length < elements.length) {
    document.getElementById("resume-quiz-btn").classList.remove("hidden");
    document.getElementById("start-quiz-btn").disabled = true;
    document.getElementById("start-quiz-btn").textContent =
      translations[currentLanguage].quiz_in_progress;
  }

  // Sound preference logic
  const soundPreference = localStorage.getItem("chemicraft_soundPreference");
  if (soundPreference === "on") {
    soundOn = true;
    soundToggle.textContent = "🔊";
    bgMusic.volume = 0.4;
    // Only try to play bgMusic if it's not already playing (e.g., from intro screen)
    if (bgMusic.paused) {
      bgMusic
        .play()
        .catch((e) => console.error("Error playing background music:", e));
    }
  } else if (soundPreference === "off") {
    soundOn = false;
    soundToggle.textContent = "🔇";
    bgMusic.volume = 0;
    bgMusic.pause();
  } else {
    // If no preference, show the prompt after a short delay
    setTimeout(showSoundPrompt, 1000);
  }

  // Ensure intro-sound is managed correctly on initial load
  const introSound = document.getElementById("intro-sound");
  if (introSound) {
    // If no sound preference is set, or if sound is on, play intro sound
    if (soundPreference === null || soundPreference === "on") {
      introSound.volume = soundOn ? 0.4 : 0; // Set volume based on soundOn
      introSound.loop = true; // Ensure it loops
      introSound
        .play()
        .catch((e) => console.error("Error playing intro music:", e));
    } else {
      // If sound is explicitly off, ensure intro sound is paused and muted
      introSound.volume = 0;
      introSound.pause();
    }
  }
});
// ... (rest of your existing code) ...

function getEmojiFromResult(resultString) {
  const match = resultString.match(/^(.*?)\s/);
  return match ? match[1] : "✨";
}

renderDiscovered();
document.addEventListener("DOMContentLoaded", () => {
  renderPeriodicTable();
  renderLanthanides();
  renderActinides();
});

function showElementPopup(el) {
  document.getElementById("popup-symbol").textContent = el.symbol;
  document.getElementById("popup-name").textContent = el.name;
  document.getElementById(
    "popup-atomic"
  ).textContent = `${translations[currentLanguage].atomic_number} ${el.atomicNumber}`;
  document.getElementById(
    "popup-mass"
  ).textContent = `${translations[currentLanguage].mass} ${el.atomicMass}`;
  document.getElementById("popup-category").textContent = `${
    translations[currentLanguage].category
  } ${formatCategory(el.category)}`;

  document.getElementById("element-popup").classList.remove("hidden");
}

function hideElementPopup() {
  document.getElementById("element-popup").classList.add("hidden");
}

function formatCategory(cat) {
  const categoryKey = cat.replace(/-/g, "_");
  return (
    translations[currentLanguage][categoryKey] ||
    cat.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  );
}

const quizPopup = document.getElementById("quiz-popup");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");

const quizData = {
  H: {
    question: {
      en: "What is the most abundant element in the universe?",
      id: "Apa elemen paling melimpah di alam semesta?",
    },
    options: [
      { en: "Oxygen", id: "Oksigen" },
      { en: "Hydrogen", id: "Hidrogen" },
      { en: "Carbon", id: "Karbon" },
      { en: "Helium", id: "Helium" },
    ],
    answer: { en: "Hydrogen", id: "Hidrogen" },
  },
  He: {
    question: {
      en: "What is the symbol for Helium?",
      id: "Apa simbol untuk Helium?",
    },
    options: [
      { en: "H", id: "H" },
      { en: "He", id: "He" },
      { en: "Li", id: "Li" },
      { en: "Ne", id: "Ne" },
    ],
    answer: { en: "He", id: "He" },
  },
  Li: {
    question: {
      en: "Which element has 3 protons?",
      id: "Elemen mana yang memiliki 3 proton?",
    },
    options: [
      { en: "Be", id: "Be" },
      { en: "He", id: "He" },
      { en: "Li", id: "Li" },
      { en: "B", id: "B" },
    ],
    answer: { en: "Li", id: "Li" },
  },
  Be: {
    question: {
      en: "Beryllium belongs to which group?",
      id: "Berilium termasuk dalam kelompok mana?",
    },
    options: [
      { en: "Alkali Metal", id: "Logam Alkali" },
      { en: "Nonmetal", id: "Nonlogam" },
      { en: "Alkaline Earth Metal", id: "Logam Alkali Tanah" },
      { en: "Noble Gas", id: "Gas Mulia" },
    ],
    answer: { en: "Alkaline Earth Metal", id: "Logam Alkali Tanah" },
  },
  B: {
    question: {
      en: "Which element is a metalloid?",
      id: "Elemen mana yang merupakan metaloid?",
    },
    options: [
      { en: "Carbon", id: "Karbon" },
      { en: "Boron", id: "Boron" },
      { en: "Aluminum", id: "Aluminium" },
      { en: "Silicon", id: "Silikon" },
    ],
    answer: { en: "Boron", id: "Boron" },
  },
  C: {
    question: {
      en: "Which element is the basis for organic life?",
      id: "Elemen mana yang menjadi dasar kehidupan organik?",
    },
    options: [
      { en: "Carbon", id: "Karbon" },
      { en: "Hydrogen", id: "Hidrogen" },
      { en: "Oxygen", id: "Oksigen" },
      { en: "Nitrogen", id: "Nitrogen" },
    ],
    answer: { en: "Carbon", id: "Karbon" },
  },
  N: {
    question: {
      en: "Which gas makes up about 78% of Earth's atmosphere?",
      id: "Gas mana yang membentuk sekitar 78% atmosfer Bumi?",
    },
    options: [
      { en: "Oxygen", id: "Oksigen" },
      { en: "Carbon Dioxide", id: "Karbon Dioksida" },
      { en: "Nitrogen", id: "Nitrogen" },
      { en: "Hydrogen", id: "Hidrogen" },
    ],
    answer: { en: "Nitrogen", id: "Nitrogen" },
  },
  O: {
    question: {
      en: "Which element is essential for respiration?",
      id: "Elemen mana yang penting untuk pernapasan?",
    },
    options: [
      { en: "Oxygen", id: "Oksigen" },
      { en: "Nitrogen", id: "Nitrogen" },
      { en: "Hydrogen", id: "Hidrogen" },
      { en: "Helium", id: "Helium" },
    ],
    answer: { en: "Oxygen", id: "Oksigen" },
  },
  F: {
    question: {
      en: "Which halogen is commonly found in toothpaste?",
      id: "Halogen mana yang umum ditemukan dalam pasta gigi?",
    },
    options: [
      { en: "Chlorine", id: "Klorin" },
      { en: "Bromine", id: "Bromin" },
      { en: "Iodine", id: "Iodin" },
      { en: "Fluorine", id: "Fluorin" },
    ],
    answer: { en: "Fluorine", id: "Fluorin" },
  },
  Ne: {
    question: {
      en: "Which noble gas glows red-orange in signs?",
      id: "Gas mulia mana yang bersinar merah-oranye pada tanda?",
    },
    options: [
      { en: "Argon", id: "Argon" },
      { en: "Krypton", id: "Kripton" },
      { en: "Neon", id: "Neon" },
      { en: "Xenon", id: "Xenon" },
    ],
    answer: { en: "Neon", id: "Neon" },
  },
  Na: {
    question: {
      en: "Which element reacts violently with water?",
      id: "Elemen mana yang bereaksi keras dengan air?",
    },
    options: [
      { en: "Sodium", id: "Natrium" },
      { en: "Calcium", id: "Kalsium" },
      { en: "Iron", id: "Besi" },
      { en: "Zinc", id: "Seng" },
    ],
    answer: { en: "Sodium", id: "Natrium" },
  },
  Mg: {
    question: {
      en: "Which element is essential in chlorophyll?",
      id: "Elemen mana yang penting dalam klorofil?",
    },
    options: [
      { en: "Magnesium", id: "Magnesium" },
      { en: "Manganese", id: "Mangan" },
      { en: "Calcium", id: "Kalsium" },
      { en: "Iron", id: "Besi" },
    ],
    answer: { en: "Magnesium", id: "Magnesium" },
  },
  Al: {
    question: {
      en: "Which lightweight metal is used in aircraft?",
      id: "Logam ringan mana yang digunakan dalam pesawat terbang?",
    },
    options: [
      { en: "Copper", id: "Tembaga" },
      { en: "Aluminum", id: "Aluminium" },
      { en: "Iron", id: "Besi" },
      { en: "Zinc", id: "Seng" },
    ],
    answer: { en: "Aluminum", id: "Aluminium" },
  },
  Si: {
    question: {
      en: "Which element is a key component of computer chips?",
      id: "Elemen mana yang merupakan komponen kunci chip komputer?",
    },
    options: [
      { en: "Silicon", id: "Silikon" },
      { en: "Selenium", id: "Selenium" },
      { en: "Silver", id: "Perak" },
      { en: "Phosphorus", id: "Fosfor" },
    ],
    answer: { en: "Silicon", id: "Silikon" },
  },
  P: {
    question: {
      en: "Which element is found in bones and DNA?",
      id: "Elemen mana yang ditemukan dalam tulang dan DNA?",
    },
    options: [
      { en: "Phosphorus", id: "Fosfor" },
      { en: "Potassium", id: "Kalium" },
      { en: "Fluorine", id: "Fluorin" },
      { en: "Iron", id: "Besi" },
    ],
    answer: { en: "Phosphorus", id: "Fosfor" },
  },
  S: {
    question: {
      en: "Which element smells like rotten eggs?",
      id: "Elemen mana yang berbau seperti telur busuk?",
    },
    options: [
      { en: "Sulfur", id: "Belerang" },
      { en: "Chlorine", id: "Klorin" },
      { en: "Oxygen", id: "Oksigen" },
      { en: "Bromine", id: "Bromin" },
    ],
    answer: { en: "Sulfur", id: "Belerang" },
  },
  Cl: {
    question: {
      en: "Which halogen is used to disinfect swimming pools?",
      id: "Halogen mana yang digunakan untuk mendisinfeksi kolam renang?",
    },
    options: [
      { en: "Iodine", id: "Iodin" },
      { en: "Chlorine", id: "Klorin" },
      { en: "Fluorine", id: "Fluorin" },
      { en: "Bromine", id: "Bromin" },
    ],
    answer: { en: "Chlorine", id: "Klorin" },
  },
  Ar: {
    question: {
      en: "Which noble gas is the third most common in air?",
      id: "Gas mulia mana yang paling umum ketiga di udara?",
    },
    options: [
      { en: "Neon", id: "Neon" },
      { en: "Xenon", id: "Xenon" },
      { en: "Argon", id: "Argon" },
      { en: "Helium", id: "Helium" },
    ],
    answer: { en: "Argon", id: "Argon" },
  },
  K: {
    question: {
      en: "Which element is essential for nerve function?",
      id: "Elemen mana yang penting untuk fungsi saraf?",
    },
    options: [
      { en: "Calcium", id: "Kalsium" },
      { en: "Potassium", id: "Kalium" },
      { en: "Sodium", id: "Natrium" },
      { en: "Magnesium", id: "Magnesium" },
    ],
    answer: { en: "Potassium", id: "Kalium" },
  },
  Ca: {
    question: {
      en: "Which element builds strong bones and teeth?",
      id: "Elemen mana yang membangun tulang dan gigi yang kuat?",
    },
    options: [
      { en: "Iron", id: "Besi" },
      { en: "Calcium", id: "Kalsium" },
      { en: "Phosphorus", id: "Fosfor" },
      { en: "Zinc", id: "Seng" },
    ],
    answer: { en: "Calcium", id: "Kalsium" },
  },
  Sc: {
    question: {
      en: "Which rare transition metal is used in aerospace alloys?",
      id: "Logam transisi langka mana yang digunakan dalam paduan kedirgantaraan?",
    },
    options: [
      { en: "Scandium", id: "Skandium" },
      { en: "Titanium", id: "Titanium" },
      { en: "Zirconium", id: "Zirkonium" },
      { en: "Yttrium", id: "Itrium" },
    ],
    answer: { en: "Scandium", id: "Skandium" },
  },
  Ti: {
    question: {
      en: "Which metal is known for being both strong and lightweight?",
      id: "Logam mana yang dikenal kuat dan ringan?",
    },
    options: [
      { en: "Iron", id: "Besi" },
      { en: "Titanium", id: "Titanium" },
      { en: "Zinc", id: "Seng" },
      { en: "Aluminum", id: "Aluminium" },
    ],
    answer: { en: "Titanium", id: "Titanium" },
  },
  V: {
    question: {
      en: "Which metal is used to strengthen steel?",
      id: "Logam mana yang digunakan untuk memperkuat baja?",
    },
    options: [
      { en: "Vanadium", id: "Vanadium" },
      { en: "Chromium", id: "Kromium" },
      { en: "Copper", id: "Tembaga" },
      { en: "Nickel", id: "Nikel" },
    ],
    answer: { en: "Vanadium", id: "Vanadium" },
  },
  Cr: {
    question: {
      en: "Which element gives stainless steel its shine?",
      id: "Elemen mana yang memberikan kilau pada baja tahan karat?",
    },
    options: [
      { en: "Iron", id: "Besi" },
      { en: "Chromium", id: "Kromium" },
      { en: "Carbon", id: "Karbon" },
      { en: "Nickel", id: "Nikel" },
    ],
    answer: { en: "Chromium", id: "Kromium" },
  },
  Mn: {
    question: {
      en: "Which metal is important for steel and has the symbol Mn?",
      id: "Logam mana yang penting untuk baja dan memiliki simbol Mn?",
    },
    options: [
      { en: "Manganese", id: "Mangan" },
      { en: "Magnesium", id: "Magnesium" },
      { en: "Mercury", id: "Raksa" },
      { en: "Molybdenum", id: "Molibdenum" },
    ],
    answer: { en: "Manganese", id: "Mangan" },
  },
  Fe: {
    question: {
      en: "Which element is the main component of steel?",
      id: "Elemen mana yang merupakan komponen utama baja?",
    },
    options: [
      { en: "Iron", id: "Besi" },
      { en: "Copper", id: "Tembaga" },
      { en: "Nickel", id: "Nikel" },
      { en: "Zinc", id: "Seng" },
    ],
    answer: { en: "Iron", id: "Besi" },
  },
  Co: {
    question: {
      en: "Which element is used in blue glass and has the symbol Co?",
      id: "Elemen mana yang digunakan dalam kaca biru dan memiliki simbol Co?",
    },
    options: [
      { en: "Cobalt", id: "Kobalt" },
      { en: "Copper", id: "Tembaga" },
      { en: "Calcium", id: "Kalsium" },
      { en: "Carbon", id: "Karbon" },
    ],
    answer: { en: "Cobalt", id: "Kobalt" },
  },
  Ni: {
    question: {
      en: "Which metal is commonly used to make coins?",
      id: "Logam mana yang umum digunakan untuk membuat koin?",
    },
    options: [
      { en: "Nickel", id: "Nikel" },
      { en: "Silver", id: "Perak" },
      { en: "Zinc", id: "Seng" },
      { en: "Platinum", id: "Platinum" },
    ],
    answer: { en: "Nickel", id: "Nikel" },
  },
  Cu: {
    question: {
      en: "Which metal is known for its reddish color and electrical conductivity?",
      id: "Logam mana yang dikenal karena warna kemerahan dan konduktivitas listriknya?",
    },
    options: [
      { en: "Iron", id: "Besi" },
      { en: "Copper", id: "Tembaga" },
      { en: "Zinc", id: "Seng" },
      { en: "Silver", id: "Perak" },
    ],
    answer: { en: "Copper", id: "Tembaga" },
  },
  Zn: {
    question: {
      en: "Which metal is used to galvanize steel?",
      id: "Logam mana yang digunakan untuk menggalvanisasi baja?",
    },
    options: [
      { en: "Tin", id: "Timah" },
      { en: "Zinc", id: "Seng" },
      { en: "Iron", id: "Besi" },
      { en: "Lead", id: "Timbal" },
    ],
    answer: { en: "Zinc", id: "Seng" },
  },
  Ga: {
    question: {
      en: "Which metal melts in your hand and is used in electronics?",
      id: "Logam mana yang meleleh di tanganmu dan digunakan dalam elektronik?",
    },
    options: [
      { en: "Mercury", id: "Raksa" },
      { en: "Gallium", id: "Galium" },
      { en: "Aluminum", id: "Aluminium" },
      { en: "Indium", id: "Indium" },
    ],
    answer: { en: "Gallium", id: "Galium" },
  },
  Ge: {
    question: {
      en: "Which metalloid is used in semiconductors and has the symbol Ge?",
      id: "Metaloid mana yang digunakan dalam semikonduktor dan memiliki simbol Ge?",
    },
    options: [
      { en: "Silicon", id: "Silikon" },
      { en: "Germanium", id: "Germanium" },
      { en: "Gallium", id: "Galium" },
      { en: "Tin", id: "Timah" },
    ],
    answer: { en: "Germanium", id: "Germanium" },
  },
  As: {
    question: {
      en: "Which toxic element has the symbol As?",
      id: "Elemen beracun mana yang memiliki simbol As?",
    },
    options: [
      { en: "Arsenic", id: "Arsenik" },
      { en: "Antimony", id: "Antimon" },
      { en: "Aluminum", id: "Aluminium" },
      { en: "Actinium", id: "Aktinium" },
    ],
    answer: { en: "Arsenic", id: "Arsenik" },
  },
  Se: {
    question: {
      en: "Which element is essential in small amounts and used in photocopiers?",
      id: "Elemen mana yang penting dalam jumlah kecil dan digunakan dalam mesin fotokopi?",
    },
    options: [
      { en: "Selenium", id: "Selenium" },
      { en: "Sulfur", id: "Belerang" },
      { en: "Silicon", id: "Silikon" },
      { en: "Silver", id: "Perak" },
    ],
    answer: { en: "Selenium", id: "Selenium" },
  },
  Br: {
    question: {
      en: "Which reddish-brown liquid element is a halogen?",
      id: "Elemen cair berwarna merah-coklat mana yang merupakan halogen?",
    },
    options: [
      { en: "Bromine", id: "Bromin" },
      { en: "Iodine", id: "Iodin" },
      { en: "Chlorine", id: "Klorin" },
      { en: "Fluorine", id: "Fluorin" },
    ],
    answer: { en: "Bromine", id: "Bromin" },
  },
  Kr: {
    question: {
      en: "Which noble gas is used in photography and lighting?",
      id: "Gas mulia mana yang digunakan dalam fotografi dan pencahayaan?",
    },
    options: [
      { en: "Krypton", id: "Kripton" },
      { en: "Neon", id: "Neon" },
      { en: "Xenon", id: "Xenon" },
      { en: "Argon", id: "Argon" },
    ],
    answer: { en: "Krypton", id: "Kripton" },
  },
  Rb: {
    question: {
      en: "Which highly reactive metal has the symbol Rb?",
      id: "Logam reaktif tinggi mana yang memiliki simbol Rb?",
    },
    options: [
      { en: "Rubidium", id: "Rubidium" },
      { en: "Radium", id: "Radium" },
      { en: "Rhenium", id: "Renim" },
      { en: "Rhodium", id: "Rodium" },
    ],
    answer: { en: "Rubidium", id: "Rubidium" },
  },
  Sr: {
    question: {
      en: "Which element is used in fireworks to produce red color?",
      id: "Elemen mana yang digunakan dalam kembang api untuk menghasilkan warna merah?",
    },
    options: [
      { en: "Strontium", id: "Stronsium" },
      { en: "Sulfur", id: "Belerang" },
      { en: "Selenium", id: "Selenium" },
      { en: "Samarium", id: "Samarium" },
    ],
    answer: { en: "Strontium", id: "Stronsium" },
  },
  Y: {
    question: {
      en: "Which element is named after a Swedish village and used in LEDs?",
      id: "Elemen mana yang dinamai desa Swedia dan digunakan dalam LED?",
    },
    options: [
      { en: "Yttrium", id: "Itrium" },
      { en: "Ytterbium", id: "Iterbium" },
      { en: "Yttrinite", id: "Ittrinit" },
      { en: "Yllem", id: "Ilem" },
    ],
    answer: { en: "Yttrium", id: "Itrium" },
  },
  Zr: {
    question: {
      en: "Which metal is resistant to corrosion and used in nuclear reactors?",
      id: "Logam mana yang tahan korosi dan digunakan dalam reaktor nuklir?",
    },
    options: [
      { en: "Zirconium", id: "Zirkonium" },
      { en: "Zinc", id: "Seng" },
      { en: "Zircon", id: "Zirkon" },
      { en: "Zebraium", id: "Zebraium" },
    ],
    answer: { en: "Zirconium", id: "Zirkonium" },
  },
  Nb: {
    question: {
      en: "Which transition metal has the symbol Nb and is used in superconductors?",
      id: "Logam transisi mana yang memiliki simbol Nb dan digunakan dalam superkonduktor?",
    },
    options: [
      { en: "Niobium", id: "Niobium" },
      { en: "Neodymium", id: "Neodimium" },
      { en: "Nickel", id: "Nikel" },
      { en: "Nobelium", id: "Nobelium" },
    ],
    answer: { en: "Niobium", id: "Niobium" },
  },
  Mo: {
    question: {
      en: "Which element is used to make high-strength steel and has the symbol Mo?",
      id: "Elemen mana yang digunakan untuk membuat baja berkekuatan tinggi dan memiliki simbol Mo?",
    },
    options: [
      { en: "Molybdenum", id: "Molibdenum" },
      { en: "Magnesium", id: "Magnesium" },
      { en: "Mercury", id: "Raksa" },
      { en: "Manganese", id: "Mangan" },
    ],
    answer: { en: "Molybdenum", id: "Molibdenum" },
  },
  Tc: {
    question: {
      en: "Which radioactive element has the symbol Tc?",
      id: "Elemen radioaktif mana yang memiliki simbol Tc?",
    },
    options: [
      { en: "Technetium", id: "Teknesium" },
      { en: "Tellurium", id: "Telurium" },
      { en: "Thorium", id: "Torium" },
      { en: "Tantalum", id: "Tantalum" },
    ],
    answer: { en: "Technetium", id: "Teknesium" },
  },
  Ru: {
    question: {
      en: "Which rare metal has the symbol Ru and is used in electronics?",
      id: "Logam langka mana yang memiliki simbol Ru dan digunakan dalam elektronik?",
    },
    options: [
      { en: "Ruthenium", id: "Rutenium" },
      { en: "Rhodium", id: "Rodium" },
      { en: "Rubidium", id: "Rubidium" },
      { en: "Radium", id: "Radium" },
    ],
    answer: { en: "Ruthenium", id: "Rutenium" },
  },
  Rh: {
    question: {
      en: "Which element is used in catalytic converters and has the symbol Rh?",
      id: "Elemen mana yang digunakan dalam konverter katalitik dan memiliki simbol Rh?",
    },
    options: [
      { en: "Rhodium", id: "Rodium" },
      { en: "Rhenium", id: "Renim" },
      { en: "Rubidium", id: "Rubidium" },
      { en: "Radon", id: "Radon" },
    ],
    answer: { en: "Rhodium", id: "Rodium" },
  },
  Pd: {
    question: {
      en: "Which precious metal is used in jewelry and electronics?",
      id: "Logam mulia mana yang digunakan dalam perhiasan dan elektronik?",
    },
    options: [
      { en: "Platinum", id: "Platinum" },
      { en: "Palladium", id: "Paladium" },
      { en: "Gold", id: "Emas" },
      { en: "Silver", id: "Perak" },
    ],
    answer: { en: "Palladium", id: "Paladium" },
  },
  Ag: {
    question: {
      en: "Which element is known as the best conductor of electricity?",
      id: "Elemen mana yang dikenal sebagai konduktor listrik terbaik?",
    },
    options: [
      { en: "Copper", id: "Tembaga" },
      { en: "Gold", id: "Emas" },
      { en: "Silver", id: "Perak" },
      { en: "Aluminum", id: "Aluminium" },
    ],
    answer: { en: "Silver", id: "Perak" },
  },
  Cd: {
    question: {
      en: "Which toxic element is used in batteries and has the symbol Cd?",
      id: "Elemen beracun mana yang digunakan dalam baterai dan memiliki simbol Cd?",
    },
    options: [
      { en: "Cadmium", id: "Kadmium" },
      { en: "Calcium", id: "Kalsium" },
      { en: "Cobalt", id: "Kobalt" },
      { en: "Cesium", id: "Sesium" },
    ],
    answer: { en: "Cadmium", id: "Kadmium" },
  },
  In: {
    question: {
      en: "Which soft metal is used in touchscreens and has the symbol In?",
      id: "Logam lunak mana yang digunakan dalam layar sentuh dan memiliki simbol In?",
    },
    options: [
      { en: "Indium", id: "Indium" },
      { en: "Iodine", id: "Iodin" },
      { en: "Iron", id: "Besi" },
      { en: "Iridium", id: "Iridium" },
    ],
    answer: { en: "Indium", id: "Indium" },
  },
  Sn: {
    question: {
      en: "Which element is used in solder and has the symbol Sn?",
      id: "Elemen mana yang digunakan dalam solder dan memiliki simbol Sn?",
    },
    options: [
      { en: "Tin", id: "Timah" },
      { en: "Lead", id: "Timbal" },
      { en: "Zinc", id: "Seng" },
      { en: "Silver", id: "Perak" },
    ],
    answer: { en: "Tin", id: "Timah" },
  },
  Sb: {
    question: {
      en: "Which metalloid has the symbol Sb and is used in flame retardants?",
      id: "Metaloid mana yang memiliki simbol Sb dan digunakan dalam penghambat api?",
    },
    options: [
      { en: "Antimony", id: "Antimon" },
      { en: "Arsenic", id: "Arsenik" },
      { en: "Aluminum", id: "Aluminium" },
      { en: "Actinium", id: "Aktinium" },
    ],
    answer: { en: "Antimony", id: "Antimon" },
  },
  Te: {
    question: {
      en: "Which brittle metalloid is used in solar panels and has the symbol Te?",
      id: "Metaloid rapuh mana yang digunakan dalam panel surya dan memiliki simbol Te?",
    },
    options: [
      { en: "Tellurium", id: "Telurium" },
      { en: "Tantalum", id: "Tantalum" },
      { en: "Thulium", id: "Tulium" },
      { en: "Terbium", id: "Terbium" },
    ],
    answer: { en: "Tellurium", id: "Telurium" },
  },
  I: {
    question: {
      en: "Which halogen is essential for thyroid function?",
      id: "Halogen mana yang penting untuk fungsi tiroid?",
    },
    options: [
      { en: "Chlorine", id: "Klorin" },
      { en: "Fluorine", id: "Fluorin" },
      { en: "Bromine", id: "Bromin" },
      { en: "Iodine", id: "Iodin" },
    ],
    answer: { en: "Iodine", id: "Iodin" },
  },
  Xe: {
    question: {
      en: "Which noble gas is used in bright camera flashes?",
      id: "Gas mulia mana yang digunakan dalam lampu kilat kamera yang terang?",
    },
    options: [
      { en: "Neon", id: "Neon" },
      { en: "Xenon", id: "Xenon" },
      { en: "Krypton", id: "Kripton" },
      { en: "Argon", id: "Argon" },
    ],
    answer: { en: "Xenon", id: "Xenon" },
  },
  Cs: {
    question: {
      en: "Which soft metal is used in atomic clocks?",
      id: "Logam lunak mana yang digunakan dalam jam atom?",
    },
    options: [
      { en: "Calcium", id: "Kalsium" },
      { en: "Cesium", id: "Sesium" },
      { en: "Cobalt", id: "Kobalt" },
      { en: "Chromium", id: "Kromium" },
    ],
    answer: { en: "Cesium", id: "Sesium" },
  },
  Ba: {
    question: {
      en: "Which element is used in medical X-ray imaging?",
      id: "Elemen mana yang digunakan dalam pencitraan sinar-X medis?",
    },
    options: [
      { en: "Barium", id: "Barium" },
      { en: "Bismuth", id: "Bismut" },
      { en: "Boron", id: "Boron" },
      { en: "Berkelium", id: "Berkelium" },
    ],
    answer: { en: "Barium", id: "Barium" },
  },
  La: {
    question: {
      en: "Which element starts the lanthanide series?",
      id: "Elemen mana yang memulai seri lantanida?",
    },
    options: [
      { en: "Lanthanum", id: "Lantanum" },
      { en: "Lutetium", id: "Lutetium" },
      { en: "Lawrencium", id: "Lawrensium" },
      { en: "Lithium", id: "Litium" },
    ],
    answer: { en: "Lanthanum", id: "Lantanum" },
  },
  Ce: {
    question: {
      en: "Which element is used in lighter flints?",
      id: "Elemen mana yang digunakan dalam batu korek api?",
    },
    options: [
      { en: "Cerium", id: "Serium" },
      { en: "Calcium", id: "Kalsium" },
      { en: "Cesium", id: "Sesium" },
      { en: "Copper", id: "Tembaga" },
    ],
    answer: { en: "Cerium", id: "Serium" },
  },
  Pr: {
    question: {
      en: "Which greenish lanthanide has the symbol Pr?",
      id: "Lantanida kehijauan mana yang memiliki simbol Pr?",
    },
    options: [
      { en: "Praseodymium", id: "Praseodimium" },
      { en: "Promethium", id: "Prometium" },
      { en: "Polonium", id: "Polonium" },
      { en: "Platinum", id: "Platinum" },
    ],
    answer: { en: "Praseodymium", id: "Praseodimium" },
  },
  Nd: {
    question: {
      en: "Which element is used in powerful magnets?",
      id: "Elemen mana yang digunakan dalam magnet kuat?",
    },
    options: [
      { en: "Neodymium", id: "Neodimium" },
      { en: "Nickel", id: "Nikel" },
      { en: "Niobium", id: "Niobium" },
      { en: "Nitrogen", id: "Nitrogen" },
    ],
    answer: { en: "Neodymium", id: "Neodimium" },
  },
  Pm: {
    question: {
      en: "Which radioactive lanthanide has the symbol Pm?",
      id: "Lantanida radioaktif mana yang memiliki simbol Pm?",
    },
    options: [
      { en: "Promethium", id: "Prometium" },
      { en: "Polonium", id: "Polonium" },
      { en: "Protactinium", id: "Protaktinium" },
      { en: "Phosphorus", id: "Fosfor" },
    ],
    answer: { en: "Promethium", id: "Prometium" },
  },
  Sm: {
    question: {
      en: "Which lanthanide is used in magnets and has the symbol Sm?",
      id: "Lantanida mana yang digunakan dalam magnet dan memiliki simbol Sm?",
    },
    options: [
      { en: "Samarium", id: "Samarium" },
      { en: "Scandium", id: "Skandium" },
      { en: "Selenium", id: "Selenium" },
      { en: "Sulfur", id: "Belerang" },
    ],
    answer: { en: "Samarium", id: "Samarium" },
  },
  Eu: {
    question: {
      en: "Which element is used in red TV phosphors and glows in the dark?",
      id: "Elemen mana yang digunakan dalam fosfor TV merah dan bersinar dalam gelap?",
    },
    options: [
      { en: "Europium", id: "Europium" },
      { en: "Erbium", id: "Erbium" },
      { en: "Einsteinium", id: "Einsteinium" },
      { en: "Ethium", id: "Etium" },
    ],
    answer: { en: "Europium", id: "Europium" },
  },
  Gd: {
    question: {
      en: "Which element is used in MRI contrast agents?",
      id: "Elemen mana yang digunakan dalam agen kontras MRI?",
    },
    options: [
      { en: "Gadolinium", id: "Gadolinium" },
      { en: "Gallium", id: "Galium" },
      { en: "Germanium", id: "Germanium" },
      { en: "Gold", id: "Emas" },
    ],
    answer: { en: "Gadolinium", id: "Gadolinium" },
  },
  Tb: {
    question: {
      en: "Which lanthanide is named after a Swedish village and has symbol Tb?",
      id: "Lantanida mana yang dinamai desa Swedia dan memiliki simbol Tb?",
    },
    options: [
      { en: "Terbium", id: "Terbium" },
      { en: "Tellurium", id: "Telurium" },
      { en: "Technetium", id: "Teknesium" },
      { en: "Thulium", id: "Tulium" },
    ],
    answer: { en: "Terbium", id: "Terbium" },
  },
  Dy: {
    question: {
      en: "Which element is used in hard disks and nuclear reactors?",
      id: "Elemen mana yang digunakan dalam hard disk dan reaktor nuklir?",
    },
    options: [
      { en: "Dysprosium", id: "Disprosium" },
      { en: "Dubnium", id: "Dubnium" },
      { en: "Darmstadtium", id: "Darmstadtium" },
      { en: "Deuterium", id: "Deuterium" },
    ],
    answer: { en: "Dysprosium", id: "Disprosium" },
  },
  Ho: {
    question: {
      en: "Which element has the symbol Ho and is used in lasers?",
      id: "Elemen mana yang memiliki simbol Ho dan digunakan dalam laser?",
    },
    options: [
      { en: "Holmium", id: "Holmium" },
      { en: "Hafnium", id: "Hafnium" },
      { en: "Helium", id: "Helium" },
      { en: "Hydrogen", id: "Hidrogen" },
    ],
    answer: { en: "Holmium", id: "Holmium" },
  },
  Er: {
    question: {
      en: "Which pink-colored lanthanide is used in fiber optics?",
      id: "Lantanida berwarna merah muda mana yang digunakan dalam serat optik?",
    },
    options: [
      { en: "Erbium", id: "Erbium" },
      { en: "Einsteinium", id: "Einsteinium" },
      { en: "Europium", id: "Europium" },
      { en: "Ethium", id: "Etium" },
    ],
    answer: { en: "Erbium", id: "Erbium" },
  },
  Tm: {
    question: {
      en: "Which element is used in portable X-ray machines?",
      id: "Elemen mana yang digunakan dalam mesin sinar-X portabel?",
    },
    options: [
      { en: "Thulium", id: "Tulium" },
      { en: "Tantalum", id: "Tantalum" },
      { en: "Technetium", id: "Teknesium" },
      { en: "Thorium", id: "Torium" },
    ],
    answer: { en: "Thulium", id: "Tulium" },
  },
  Yb: {
    question: {
      en: "Which soft, silvery metal has the symbol Yb?",
      id: "Logam lunak berwarna keperakan mana yang memiliki simbol Yb?",
    },
    options: [
      { en: "Ytterbium", id: "Iterbium" },
      { en: "Yttrium", id: "Itrium" },
      { en: "Yttrinite", id: "Ittrinit" },
      { en: "Yodoium", id: "Iodium" },
    ],
    answer: { en: "Ytterbium", id: "Iterbium" },
  },
  Lu: {
    question: {
      en: "Which element ends the lanthanide series?",
      id: "Elemen mana yang mengakhiri seri lantanida?",
    },
    options: [
      { en: "Lutetium", id: "Lutetium" },
      { en: "Lawrencium", id: "Lawrensium" },
      { en: "Lanthanum", id: "Lantanum" },
      { en: "Lithium", id: "Litium" },
    ],
    answer: { en: "Lutetium", id: "Lutetium" },
  },
  Hf: {
    question: {
      en: "Which element is used in nuclear control rods and has the symbol Hf?",
      id: "Elemen mana yang digunakan dalam batang kendali nuklir dan memiliki simbol Hf?",
    },
    options: [
      { en: "Hafnium", id: "Hafnium" },
      { en: "Holmium", id: "Holmium" },
      { en: "Helium", id: "Helium" },
      { en: "Hydrogen", id: "Hidrogen" },
    ],
    answer: { en: "Hafnium", id: "Hafnium" },
  },
  Ta: {
    question: {
      en: "Which metal is used in phone capacitors?",
      id: "Logam mana yang digunakan dalam kapasitor telepon?",
    },
    options: [
      { en: "Tantalum", id: "Tantalum" },
      { en: "Titanium", id: "Titanium" },
      { en: "Tin", id: "Timah" },
      { en: "Tellurium", id: "Telurium" },
    ],
    answer: { en: "Tantalum", id: "Tantalum" },
  },
  W: {
    question: {
      en: "Which element has the highest melting point and symbol W?",
      id: "Elemen mana yang memiliki titik leleh tertinggi dan simbol W?",
    },
    options: [
      { en: "Tungsten", id: "Tungsten" },
      { en: "Tellurium", id: "Telurium" },
      { en: "Titanium", id: "Titanium" },
      { en: "Tantalum", id: "Tantalum" },
    ],
    answer: { en: "Tungsten", id: "Tungsten" },
  },
  Re: {
    question: {
      en: "Which rare metal is used in jet engines and has the symbol Re?",
      id: "Logam langka mana yang digunakan dalam mesin jet dan memiliki simbol Re?",
    },
    options: [
      { en: "Rhenium", id: "Renim" },
      { en: "Radon", id: "Radon" },
      { en: "Ruthenium", id: "Rutenium" },
      { en: "Rubidium", id: "Rubidium" },
    ],
    answer: { en: "Rhenium", id: "Renim" },
  },
  Os: {
    question: {
      en: "Which element is the densest naturally occurring one?",
      id: "Elemen mana yang paling padat secara alami?",
    },
    options: [
      { en: "Osmium", id: "Osmium" },
      { en: "Iron", id: "Besi" },
      { en: "Gold", id: "Emas" },
      { en: "Uranium", id: "Uranium" },
    ],
    answer: { en: "Osmium", id: "Osmium" },
  },
  Ir: {
    question: {
      en: "Which element is highly corrosion-resistant and has the symbol Ir?",
      id: "Elemen mana yang sangat tahan korosi dan memiliki simbol Ir?",
    },
    options: [
      { en: "Iridium", id: "Iridium" },
      { en: "Iodine", id: "Iodin" },
      { en: "Iron", id: "Besi" },
      { en: "Indium", id: "Indium" },
    ],
    answer: { en: "Iridium", id: "Iridium" },
  },
  Pt: {
    question: {
      en: "Which precious metal is often used in jewelry and catalytic converters?",
      id: "Logam mulia mana yang sering digunakan dalam perhiasan dan konverter katalitik?",
    },
    options: [
      { en: "Platinum", id: "Platinum" },
      { en: "Palladium", id: "Paladium" },
      { en: "Silver", id: "Perak" },
      { en: "Gold", id: "Emas" },
    ],
    answer: { en: "Platinum", id: "Platinum" },
  },
  Au: {
    question: {
      en: "Which metal has the highest electrical conductivity after silver?",
      id: "Logam mana yang memiliki konduktivitas listrik tertinggi setelah perak?",
    },
    options: [
      { en: "Gold", id: "Emas" },
      { en: "Copper", id: "Tembaga" },
      { en: "Platinum", id: "Platinum" },
      { en: "Nickel", id: "Nikel" },
    ],
    answer: { en: "Gold", id: "Emas" },
  },
  Hg: {
    question: {
      en: "Which liquid metal is toxic and used in old thermometers?",
      id: "Logam cair mana yang beracun dan digunakan dalam termometer lama?",
    },
    options: [
      { en: "Mercury", id: "Raksa" },
      { en: "Magnesium", id: "Magnesium" },
      { en: "Molybdenum", id: "Molibdenum" },
      { en: "Manganese", id: "Mangan" },
    ],
    answer: { en: "Mercury", id: "Raksa" },
  },
  Tl: {
    question: {
      en: "Which toxic metal has the symbol Tl and was used in rat poison?",
      id: "Logam beracun mana yang memiliki simbol Tl dan digunakan dalam racun tikus?",
    },
    options: [
      { en: "Thallium", id: "Talium" },
      { en: "Tin", id: "Timah" },
      { en: "Tellurium", id: "Telurium" },
      { en: "Tantalum", id: "Tantalum" },
    ],
    answer: { en: "Thallium", id: "Talium" },
  },
  Pb: {
    question: {
      en: "Which heavy metal was once used in paints and gasoline?",
      id: "Logam berat mana yang pernah digunakan dalam cat dan bensin?",
    },
    options: [
      { en: "Lead", id: "Timbal" },
      { en: "Platinum", id: "Platinum" },
      { en: "Palladium", id: "Paladium" },
      { en: "Lithium", id: "Litium" },
    ],
    answer: { en: "Lead", id: "Timbal" },
  },
  Bi: {
    question: {
      en: "Which metal is considered the heaviest non-toxic element?",
      id: "Logam mana yang dianggap sebagai elemen non-beracun terberat?",
    },
    options: [
      { en: "Bismuth", id: "Bismut" },
      { en: "Boron", id: "Boron" },
      { en: "Barium", id: "Barium" },
      { en: "Berkelium", id: "Berkelium" },
    ],
    answer: { en: "Bismuth", id: "Bismut" },
  },
  Po: {
    question: {
      en: "Which highly radioactive element was discovered by Marie Curie?",
      id: "Elemen radioaktif tinggi mana yang ditemukan oleh Marie Curie?",
    },
    options: [
      { en: "Polonium", id: "Polonium" },
      { en: "Protactinium", id: "Protaktinium" },
      { en: "Promethium", id: "Prometium" },
      { en: "Plutonium", id: "Plutonium" },
    ],
    answer: { en: "Polonium", id: "Polonium" },
  },
  At: {
    question: {
      en: "Which rare halogen is radioactive and has the symbol At?",
      id: "Halogen langka mana yang radioaktif dan memiliki simbol At?",
    },
    options: [
      { en: "Astatine", id: "Astatin" },
      { en: "Actinium", id: "Aktinium" },
      { en: "Arsenic", id: "Arsenik" },
      { en: "Americium", id: "Amerisium" },
    ],
    answer: { en: "Astatine", id: "Astatin" },
  },
  Rn: {
    question: {
      en: "Which radioactive noble gas can accumulate in basements?",
      id: "Gas mulia radioaktif mana yang dapat menumpuk di ruang bawah tanah?",
    },
    options: [
      { en: "Radon", id: "Radon" },
      { en: "Rhodium", id: "Rodium" },
      { en: "Rhenium", id: "Renim" },
      { en: "Radium", id: "Radium" },
    ],
    answer: { en: "Radon", id: "Radon" },
  },
  Fr: {
    question: {
      en: "Which alkali metal is extremely rare and radioactive?",
      id: "Logam alkali mana yang sangat langka dan radioaktif?",
    },
    options: [
      { en: "Francium", id: "Fransium" },
      { en: "Fermium", id: "Fermium" },
      { en: "Fluorine", id: "Fluorin" },
      { en: "Flerovium", id: "Flerovium" },
    ],
    answer: { en: "Francium", id: "Fransium" },
  },
  Ra: {
    question: {
      en: "Which element glows in the dark and was once used in watches?",
      id: "Elemen mana yang bersinar dalam gelap dan pernah digunakan dalam jam tangan?",
    },
    options: [
      { en: "Radium", id: "Radium" },
      { en: "Rhenium", id: "Renim" },
      { en: "Rubidium", id: "Rubidium" },
      { en: "Rutherfordium", id: "Ruterfordium" },
    ],
    answer: { en: "Radium", id: "Radium" },
  },
  Ac: {
    question: {
      en: "Which element starts the actinide series?",
      id: "Elemen mana yang memulai seri aktinida?",
    },
    options: [
      { en: "Actinium", id: "Aktinium" },
      { en: "Americium", id: "Amerisium" },
      { en: "Arsenic", id: "Arsenik" },
      { en: "Astatine", id: "Astatin" },
    ],
    answer: { en: "Actinium", id: "Aktinium" },
  },
  Th: {
    question: {
      en: "Which radioactive element is used in camping lanterns?",
      id: "Elemen radioaktif mana yang digunakan dalam lentera kemah?",
    },
    options: [
      { en: "Thorium", id: "Torium" },
      { en: "Technetium", id: "Teknesium" },
      { en: "Tellurium", id: "Telurium" },
      { en: "Tin", id: "Timah" },
    ],
    answer: { en: "Thorium", id: "Torium" },
  },
  Pa: {
    question: {
      en: "Which element has the symbol Pa and is used in nuclear research?",
      id: "Elemen mana yang memiliki simbol Pa dan digunakan dalam penelitian nuklir?",
    },
    options: [
      { en: "Protactinium", id: "Protaktinium" },
      { en: "Polonium", id: "Polonium" },
      { en: "Plutonium", id: "Plutonium" },
      { en: "Phosphorus", id: "Fosfor" },
    ],
    answer: { en: "Protactinium", id: "Protaktinium" },
  },
  U: {
    question: {
      en: "Which element is used as fuel in nuclear reactors?",
      id: "Elemen mana yang digunakan sebagai bahan bakar dalam reaktor nuklir?",
    },
    options: [
      { en: "Uranium", id: "Uranium" },
      { en: "Ununium", id: "Ununium" },
      { en: "Uranite", id: "Uranit" },
      { en: "Ultrium", id: "Ultrium" },
    ],
    answer: { en: "Uranium", id: "Uranium" },
  },
  Np: {
    question: {
      en: "Which element follows Uranium in the periodic table?",
      id: "Elemen mana yang mengikuti Uranium dalam tabel periodik?",
    },
    options: [
      { en: "Neptunium", id: "Neptunium" },
      { en: "Nickel", id: "Nikel" },
      { en: "Nobelium", id: "Nobelium" },
      { en: "Niobium", id: "Niobium" },
    ],
    answer: { en: "Neptunium", id: "Neptunium" },
  },
  Pu: {
    question: {
      en: "Which radioactive element is used in nuclear weapons?",
      id: "Elemen radioaktif mana yang digunakan dalam senjata nuklir?",
    },
    options: [
      { en: "Plutonium", id: "Plutonium" },
      { en: "Polonium", id: "Polonium" },
      { en: "Promethium", id: "Prometium" },
      { en: "Protactinium", id: "Protaktinium" },
    ],
    answer: { en: "Plutonium", id: "Plutonium" },
  },
  Am: {
    question: {
      en: "Which synthetic element is used in smoke detectors?",
      id: "Elemen sintetis mana yang digunakan dalam detektor asap?",
    },
    options: [
      { en: "Americium", id: "Amerisium" },
      { en: "Arsenic", id: "Arsenik" },
      { en: "Astatine", id: "Astatin" },
      { en: "Aluminum", id: "Aluminium" },
    ],
    answer: { en: "Americium", id: "Amerisium" },
  },
  Cm: {
    question: {
      en: "Which element is named after Marie and Pierre Curie?",
      id: "Elemen mana yang dinamai Marie dan Pierre Curie?",
    },
    options: [
      { en: "Curium", id: "Kurium" },
      { en: "Californium", id: "Kalifornium" },
      { en: "Cesium", id: "Sesium" },
      { en: "Cobalt", id: "Kobalt" },
    ],
    answer: { en: "Curium", id: "Kurium" },
  },
  Bk: {
    question: {
      en: "Which element is named after a US city in California?",
      id: "Elemen mana yang dinamai kota AS di California?",
    },
    options: [
      { en: "Berkelium", id: "Berkelium" },
      { en: "Bismuth", id: "Bismut" },
      { en: "Boron", id: "Boron" },
      { en: "Bromine", id: "Bromin" },
    ],
    answer: { en: "Berkelium", id: "Berkelium" },
  },
  Cf: {
    question: {
      en: "Which radioactive metal has the symbol Cf?",
      id: "Logam radioaktif mana yang memiliki simbol Cf?",
    },
    options: [
      { en: "Californium", id: "Kalifornium" },
      { en: "Carbon", id: "Karbon" },
      { en: "Cerium", id: "Serium" },
      { en: "Chlorine", id: "Klorin" },
    ],
    answer: { en: "Californium", id: "Kalifornium" },
  },
  Es: {
    question: {
      en: "Which element is named after Albert Einstein?",
      id: "Elemen mana yang dinamai Albert Einstein?",
    },
    options: [
      { en: "Einsteinium", id: "Einsteinium" },
      { en: "Erbium", id: "Erbium" },
      { en: "Europium", id: "Europium" },
      { en: "Ethium", id: "Etium" },
    ],
    answer: { en: "Einsteinium", id: "Einsteinium" },
  },
  Fm: {
    question: {
      en: "Which radioactive element is named after Enrico Fermi?",
      id: "Elemen radioaktif mana yang dinamai Enrico Fermi?",
    },
    options: [
      { en: "Fermium", id: "Fermium" },
      { en: "Francium", id: "Fransium" },
      { en: "Fluorine", id: "Fluorin" },
      { en: "Flerovium", id: "Flerovium" },
    ],
    answer: { en: "Fermium", id: "Fermium" },
  },
  Md: {
    question: {
      en: "Which element is named after Dmitri Mendeleev?",
      id: "Elemen mana yang dinamai Dmitri Mendeleev?",
    },
    options: [
      { en: "Mendelevium", id: "Mendelevium" },
      { en: "Magnesium", id: "Magnesium" },
      { en: "Manganese", id: "Mangan" },
      { en: "Meitnerium", id: "Meitnerium" },
    ],
    answer: { en: "Mendelevium", id: "Mendelevium" },
  },
  No: {
    question: {
      en: "Which element is named after Alfred Nobel?",
      id: "Elemen mana yang dinamai Alfred Nobel?",
    },
    options: [
      { en: "Nobelium", id: "Nobelium" },
      { en: "Neptunium", id: "Neptunium" },
      { en: "Nickel", id: "Nikel" },
      { en: "Nitrogen", id: "Nitrogen" },
    ],
    answer: { en: "Nobelium", id: "Nobelium" },
  },
  Lr: {
    question: {
      en: "Which element completes the actinide series?",
      id: "Elemen mana yang melengkapi seri aktinida?",
    },
    options: [
      { en: "Lawrencium", id: "Lawrensium" },
      { en: "Lutetium", id: "Lutetium" },
      { en: "Lanthanum", id: "Lantanum" },
      { en: "Lithium", id: "Litium" },
    ],
    answer: { en: "Lawrencium", id: "Lawrensium" },
  },
  Rf: {
    question: {
      en: "Which element starts the transactinide series?",
      id: "Elemen mana yang memulai seri transaktinida?",
    },
    options: [
      { en: "Rutherfordium", id: "Ruterfordium" },
      { en: "Radium", id: "Radium" },
      { en: "Roentgenium", id: "Roentgenium" },
      { en: "Rubidium", id: "Rubidium" },
    ],
    answer: { en: "Rutherfordium", id: "Ruterfordium" },
  },
  Db: {
    question: {
      en: "Which element has the symbol Db and is named after a Russian town?",
      id: "Elemen mana yang memiliki simbol Db dan dinamai kota Rusia?",
    },
    options: [
      { en: "Dubnium", id: "Dubnium" },
      { en: "Dysprosium", id: "Disprosium" },
      { en: "Darmstadtium", id: "Darmstadtium" },
      { en: "Dubrinium", id: "Dubrinium" },
    ],
    answer: { en: "Dubnium", id: "Dubnium" },
  },
  Sg: {
    question: {
      en: "Which element is named after a famous nuclear physicist Glenn Seaborg?",
      id: "Elemen mana yang dinamai fisikawan nuklir terkenal Glenn Seaborg?",
    },
    options: [
      { en: "Seaborgium", id: "Seaborgium" },
      { en: "Scandium", id: "Skandium" },
      { en: "Silicon", id: "Silikon" },
      { en: "Strontium", id: "Stronsium" },
    ],
    answer: { en: "Seaborgium", id: "Seaborgium" },
  },
  Bh: {
    question: {
      en: "Which element has the symbol Bh?",
      id: "Elemen mana yang memiliki simbol Bh?",
    },
    options: [
      { en: "Bohrium", id: "Bohrium" },
      { en: "Barium", id: "Barium" },
      { en: "Beryllium", id: "Berilium" },
      { en: "Bromium", id: "Bromium" },
    ],
    answer: { en: "Bohrium", id: "Bohrium" },
  },
  Hs: {
    question: {
      en: "Which synthetic element has the symbol Hs?",
      id: "Elemen sintetis mana yang memiliki simbol Hs?",
    },
    options: [
      { en: "Hassium", id: "Hasium" },
      { en: "Holmium", id: "Holmium" },
      { en: "Hafnium", id: "Hafnium" },
      { en: "Helium", id: "Helium" },
    ],
    answer: { en: "Hassium", id: "Hasium" },
  },
  Mt: {
    question: {
      en: "Which element is named after physicist Lise Meitner?",
      id: "Elemen mana yang dinamai fisikawan Lise Meitner?",
    },
    options: [
      { en: "Meitnerium", id: "Meitnerium" },
      { en: "Mendelevium", id: "Mendelevium" },
      { en: "Magnesium", id: "Magnesium" },
      { en: "Moscovium", id: "Moscovium" },
    ],
    answer: { en: "Meitnerium", id: "Meitnerium" },
  },
  Ds: {
    question: {
      en: "Which element is named after the German city Darmstadt?",
      id: "Elemen mana yang dinamai kota Darmstadt di Jerman?",
    },
    options: [
      { en: "Darmstadtium", id: "Darmstadtium" },
      { en: "Dubnium", id: "Dubnium" },
      { en: "Dysprosium", id: "Disprosium" },
      { en: "Dysdrasium", id: "Disdrasium" },
    ],
    answer: { en: "Darmstadtium", id: "Darmstadtium" },
  },
  Rg: {
    question: {
      en: "Which element has the symbol Rg?",
      id: "Elemen mana yang memiliki simbol Rg?",
    },
    options: [
      { en: "Roentgenium", id: "Roentgenium" },
      { en: "Radium", id: "Radium" },
      { en: "Rhenium", id: "Renim" },
      { en: "Rhodium", id: "Rodium" },
    ],
    answer: { en: "Roentgenium", id: "Roentgenium" },
  },
  Cn: {
    question: {
      en: "Which synthetic element has the symbol Cn?",
      id: "Elemen sintetis mana yang memiliki simbol Cn?",
    },
    options: [
      { en: "Copernicium", id: "Kopernisium" },
      { en: "Calcium", id: "Kalsium" },
      { en: "Carbon", id: "Karbon" },
      { en: "Cerium", id: "Serium" },
    ],
    answer: { en: "Copernicium", id: "Kopernisium" },
  },
  Nh: {
    question: {
      en: "Which element with the symbol Nh is named after Japan?",
      id: "Elemen mana dengan simbol Nh yang dinamai Jepang?",
    },
    options: [
      { en: "Nihonium", id: "Nihonium" },
      { en: "Neptunium", id: "Neptunium" },
      { en: "Neon", id: "Neon" },
      { en: "Neodymium", id: "Neodimium" },
    ],
    answer: { en: "Nihonium", id: "Nihonium" },
  },
  Fl: {
    question: {
      en: "Which element is named after the Joint Institute for Nuclear Research in Dubna and the US state?",
      id: "Elemen mana yang dinamai Joint Institute for Nuclear Research di Dubna dan negara bagian AS?",
    },
    options: [
      { en: "Flerovium", id: "Flerovium" },
      { en: "Francium", id: "Fransium" },
      { en: "Fluorine", id: "Fluorin" },
      { en: "Fermium", id: "Fermium" },
    ],
    answer: { en: "Flerovium", id: "Flerovium" },
  },
  Mc: {
    question: {
      en: "Which element is named after Moscow, the capital of Russia?",
      id: "Elemen mana yang dinamai Moskow, ibu kota Rusia?",
    },
    options: [
      { en: "Moscovium", id: "Moscovium" },
      { en: "Magnesium", id: "Magnesium" },
      { en: "Manganese", id: "Mangan" },
      { en: "Mercury", id: "Raksa" },
    ],
    answer: { en: "Moscovium", id: "Moscovium" },
  },
  Lv: {
    question: {
      en: "Which element has the symbol Lv?",
      id: "Elemen mana yang memiliki simbol Lv?",
    },
    options: [
      { en: "Livermorium", id: "Livermorium" },
      { en: "Lanthanum", id: "Lantanum" },
      { en: "Lutetium", id: "Lutetium" },
      { en: "Lawrencium", id: "Lawrensium" },
    ],
    answer: { en: "Livermorium", id: "Livermorium" },
  },
  Ts: {
    question: {
      en: "Which element is named after the US state Tennessee?",
      id: "Elemen mana yang dinamai negara bagian AS Tennessee?",
    },
    options: [
      { en: "Tennessine", id: "Tennessine" },
      { en: "Tellurium", id: "Telurium" },
      { en: "Terbium", id: "Terbium" },
      { en: "Thorium", id: "Torium" },
    ],
    answer: { en: "Tennessine", id: "Tennessine" },
  },
  Og: {
    question: {
      en: "Which element is currently the last on the periodic table?",
      id: "Elemen mana yang saat ini terakhir di tabel periodik?",
    },
    options: [
      { en: "Oganesson", id: "Oganesson" },
      { en: "Osmium", id: "Osmium" },
      { en: "Oxygen", id: "Oksigen" },
      { en: "Ordonium", id: "Ordonium" },
    ],
    answer: { en: "Oganesson", id: "Oganesson" },
  },
};

function showNextQuiz() {
  if (unlockQueue.length === 0) return;

  const nextElement = unlockQueue[0];
  const quiz = quizData[nextElement];

  if (!quiz) return;

  quizQuestion.textContent = quiz.question[currentLanguage];
  quizOptions.innerHTML = "";

  quiz.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt[currentLanguage];

    btn.addEventListener("click", () => {
      const isCorrect = opt[currentLanguage] === quiz.answer[currentLanguage];

      quizHistory.push({
        question: quiz.question.en,
        selectedAnswer: opt.en,
        correctAnswer: quiz.answer.en,
        isCorrect: isCorrect,
      });
      saveGameProgress();

      if (isCorrect) {
        unlockQueue.shift();
        discovered.push(nextElement);
        updateProgressBar();
        renderPeriodicTable();
        saveGameProgress();

        if (faviconLink) {
          faviconLink.classList.remove("favicon-animate");
          void faviconLink.offsetWidth;
          faviconLink.classList.add("favicon-animate");
        }

        setTimeout(() => {
          const cell = document.querySelector(
            `[data-symbol="${nextElement}"] .card-inner`
          );
          if (cell) cell.classList.add("flipped");
        }, 100);

        quizOptions.classList.add("hidden");
        document.getElementById(
          "quiz-result-text"
        ).textContent = `${translations[currentLanguage].quiz_correct} ${quiz.answer[currentLanguage]}`;
        document.getElementById("quiz-result").classList.remove("hidden");

        quizPopup.dataset.justUnlocked = nextElement;

        btn.style.borderColor = "#22c55e";
        btn.style.background = "linear-gradient(to right, #4ade80, #22c55e)";
      } else {
        btn.style.borderColor = "#ef4444";
        btn.style.background = "linear-gradient(to right, #fca5a5, #ef4444)";
        document.getElementById("quiz-result-text").textContent =
          translations[currentLanguage].quiz_try_again;
        document.getElementById("quiz-result-text").style.color = "white";

        btn.classList.add("shake");
        setTimeout(() => btn.classList.remove("shake"), 500);
      }
    });

    quizOptions.appendChild(btn);
  });

  quizPopup.classList.remove("hidden");

  const content = quizPopup.querySelector(".modal-content");
  content.classList.remove("modal-arise");
  void content.offsetWidth;
  content.classList.add("modal-arise");
}

const startQuizBtn = document.getElementById("start-quiz-btn");

startQuizBtn.addEventListener("click", () => {
  const quizStartSound = document.getElementById("quiz-start-sfx");
  if (quizStartSound && !quizStartSound.muted) {
    quizStartSound.currentTime = 0;
    quizStartSound.play();
  }

  if (!discovered.includes("H")) {
    discovered.push("H");
  }

  renderPeriodicTable();
  renderDiscovered();
  showNextQuiz();
  startQuizBtn.disabled = true;
  startQuizBtn.textContent = translations[currentLanguage].quiz_started;
  saveGameProgress();
});

document.getElementById("next-quiz-btn").addEventListener("click", () => {
  document.getElementById("quiz-result").classList.add("hidden");
  document.getElementById("quiz-options").classList.remove("hidden");

  showNextQuiz();
});

document.getElementById("close-quiz-btn").addEventListener("click", () => {
  document.getElementById("quiz-popup").classList.add("hidden");
  saveGameProgress();
});

document.getElementById("close-quiz-btn").addEventListener("click", () => {
  document.getElementById("quiz-popup").classList.add("hidden");
  document.getElementById("resume-quiz-btn").classList.remove("hidden");
});

function resetQuizUI() {
  document.querySelectorAll(".pt-element.correct-flash").forEach((el) => {
    el.classList.remove("correct-flash");
  });

  document.querySelectorAll(".quiz-options button").forEach((btn) => {
    btn.classList.remove("correct", "incorrect");
  });

  const feedback = document.querySelector(".quiz-feedback");
  if (feedback) feedback.textContent = "";

  const success = document.querySelector(".quiz-success");
  if (success) success.classList.add("hidden");
}

document.getElementById("resume-quiz-btn").addEventListener("click", () => {
  if (quizFinished) {
    openQuestionReviewModal();
    return;
  }

  resetQuizUI();
  showNextQuiz();
  document.getElementById("resume-quiz-btn").classList.add("hidden");
});

const startBtn = document.getElementById("start-quiz-btn");

startBtn.addEventListener("click", () => {
  if (!discovered.includes("H")) {
    discovered.push("H");
  }
  renderPeriodicTable();
  renderDiscovered();
  showNextQuiz();
  startBtn.disabled = true;
  startBtn.textContent = translations[currentLanguage].quiz_in_progress;
  saveGameProgress();
});

document.getElementById("enter-btn").addEventListener("click", () => {
  const introSound = document.getElementById("intro-sound");
  if (introSound) {
    introSound.pause();
    introSound.currentTime = 0;
  }

  // Start background music if sound is enabled
  if (soundOn) {
    bgMusic.volume = 0.4;
    bgMusic.loop = true; // Ensure bgMusic loops
    bgMusic
      .play()
      .catch((e) => console.error("Error playing background music:", e));
  }

  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("readme").style.display = "flex";
});

document.getElementById("close-readme").addEventListener("click", () => {
  document.getElementById("readme").style.display = "none";

  const quizBtn = document.getElementById("start-quiz-btn");
  if (quizBtn) {
    quizBtn.classList.add("highlight-bounce");
  }
});

const readme = document.getElementById("readme");
readme.classList.add("show");

const wowSound = new Audio("wow.mp3");

function showCompoundPopup(name, formula) {
  const popup = document.createElement("div");
  popup.className = "compound-popup";
  popup.innerHTML = `<h2>${name}</h2><p>${formula}</p>`;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 3000);
}

const vaultBtn = document.getElementById("vault-btn");
const vaultModal = document.getElementById("vault-modal");
const vaultClose = document.getElementById("vault-close");
const vaultList = document.getElementById("vault-list");

vaultBtn.addEventListener("click", () => {
  vaultModal.classList.remove("hidden");

  const modalContent = vaultModal.querySelector(".modal-content");
  modalContent.classList.remove("modal-arise");
  void modalContent.offsetWidth;
  modalContent.classList.add("modal-arise");

  const sfx = document.getElementById("ui-popup-sfx");
  if (sfx && !sfx.muted) {
    sfx.currentTime = 0;
    sfx.play();
  }

  updateVaultUI();
});

vaultClose.addEventListener("click", () => {
  const modalContent = vaultModal.querySelector(".modal-content");

  modalContent.classList.remove("modal-arise");
  modalContent.classList.add("modal-exit");

  setTimeout(() => {
    vaultModal.classList.add("hidden");
    modalContent.classList.remove("modal-exit");
  }, 300);
});

document
  .getElementById("vault-search")
  .addEventListener("input", updateVaultUI);
document
  .getElementById("vault-filter")
  .addEventListener("change", updateVaultUI);

function updateVaultUI() {
  const search = document.getElementById("vault-search").value.toLowerCase();
  const filterType = document.getElementById("vault-filter").value;
  const sortBy = document.getElementById("vault-sort").value;

  let filtered = discoveredVault.filter((symbol) => {
    const data = vaultData[symbol];
    if (!data) return false;

    const matchesSearch =
      data.name.toLowerCase().includes(search) ||
      data.formula.toLowerCase().includes(search);

    const matchesFilter = filterType === "" || data.type === filterType;

    return matchesSearch && matchesFilter;
  });

  if (sortBy === "name") {
    filtered.sort((a, b) => vaultData[a].name.localeCompare(vaultData[b].name));
  } else if (sortBy === "symbol") {
    filtered.sort((a, b) =>
      vaultData[a].formula.localeCompare(vaultData[b].formula)
    );
  }

  vaultList.innerHTML = "";
  if (filtered.length === 0) {
    vaultList.innerHTML = `<p style='text-align: center; margin-top: 20px;'>${translations[currentLanguage].no_compounds_found}</p>`;
  } else {
    filtered.forEach((symbol) => {
      const data = vaultData[symbol];
      const card = document.createElement("div");
      card.className = "vault-card";
      card.innerHTML = `
        <h3>${data.emoji} ${data.name}</h3>
        <p><strong>${
          translations[currentLanguage].sort_formula_option.split(":")[0]
        }:</strong> ${data.formula}</p>
        <p><strong>${
          translations[currentLanguage].use_label || "Use"
        }:</strong> ${data.use}</p>
        <p><strong>${
          translations[currentLanguage].trivia_label || "Trivia"
        }:</strong> ${data.trivia}</p>
        <p><strong>${translations[currentLanguage].category}:</strong> ${
        data.type
      }</p>
      `;
      vaultList.appendChild(card);
    });
  }
}

document
  .getElementById("vault-search")
  .addEventListener("input", updateVaultUI);
document
  .getElementById("vault-filter")
  .addEventListener("change", updateVaultUI);
document.getElementById("vault-sort").addEventListener("change", updateVaultUI);

document.getElementById("vault-clear").addEventListener("click", () => {
  document.getElementById("vault-search").value = "";
  document.getElementById("vault-filter").value = "";
  document.getElementById("vault-sort").value = "default";
  updateVaultUI();
});

const hintBtn = document.getElementById("hint-btn");
const hintArea = document.getElementById("hint-area");

hintBtn.addEventListener("click", giveHint);

function giveHint() {
  const undiscovered = Object.values(compoundRecipes).filter(
    (c) => !discoveredVault.includes(c.symbol)
  );

  if (undiscovered.length === 0) {
    hintArea.innerHTML = translations[currentLanguage].hint_all_discovered;
    hintArea.classList.add("show");
    return;
  }

  const random = undiscovered[Math.floor(Math.random() * undiscovered.length)];
  const recipeKey = Object.keys(compoundRecipes).find(
    (key) => compoundRecipes[key].symbol === random.symbol
  );
  const recipeKeyElements = recipeKey.split("+");

  const hintText = translations[currentLanguage].hint_elements_count.replace(
    "{count}",
    recipeKeyElements.length
  );
  const elementsList = recipeKeyElements.map((e) => e[0] + "…").join(", ");
  const tryCombiningText = translations[
    currentLanguage
  ].hint_try_combining.replace("{elements}", elementsList);

  hintArea.innerHTML = `${hintText}<br>${tryCombiningText}`;
  hintArea.classList.add("show");
}

document.addEventListener("DOMContentLoaded", () => {
  const hintBtn = document.getElementById("hint-btn");
  if (!hintBtn) return;

  let lastActivityTime = Date.now();

  ["click", "mousemove", "keydown", "touchstart"].forEach((event) => {
    window.addEventListener(event, () => {
      lastActivityTime = Date.now();
      hintBtn.classList.remove("bounce");
    });
  });

  setInterval(() => {
    const now = Date.now();
    const inactiveFor = now - lastActivityTime;

    if (inactiveFor > 60000) {
      hintBtn.classList.add("bounce");
    }
  }, 10000);
});

setTimeout(() => {
  document.getElementById("flaskii").classList.add("reacting");
}, 90000);

const tableQuizBtn = document.getElementById("start-table-quiz-btn");
const tableQuizPopup = document.getElementById("table-quiz-popup");
const tableQuizElement = document.getElementById("table-quiz-element");
const tableQuizOptions = document.getElementById("table-quiz-options");
const tableQuizResult = document.getElementById("table-quiz-result");
const nextTableQuizBtn = document.getElementById("next-table-quiz");
const closeTableQuizBtn = document.getElementById("close-table-quiz");
closeTableQuizBtn.addEventListener("click", () => {
  tableQuizPopup.classList.add("hidden");

  const content = tableQuizPopup.querySelector(".modal-content");
  if (content) {
    content.classList.remove("wipe-in-left-to-right");
  }
});

const categoryNames = {
  "alkali-metal": "alkali_metal",
  "alkaline-earth-metal": "alkaline_earth",
  "transition-metal": "transition_metal",
  "post-transition-metal": "post_transition",
  metalloid: "metalloid",
  nonmetal: "nonmetal",
  halogen: "halogen",
  "noble-gas": "noble_gas",
  lanthanide: "lanthanide",
  actinide: "actinide",
  unknown: "unknown",
};

let currentQuizElement = null;

function startTableQuiz() {
  const elementPool = elements.filter((el) => discovered.includes(el.symbol));
  if (elementPool.length === 0) {
    tableQuizElement.textContent =
      translations[currentLanguage].table_quiz_discover_first;
    tableQuizOptions.innerHTML = "";
    tableQuizResult.textContent = "";
    return;
  }
  const randomElement =
    elementPool[Math.floor(Math.random() * elementPool.length)];
  currentQuizElement = randomElement;

  tableQuizElement.textContent = `${randomElement.symbol} - ${randomElement.name}`;
  tableQuizResult.textContent = "";
  tableQuizOptions.innerHTML = "";

  const allCategories = Object.keys(categoryNames);
  let choices = new Set();
  choices.add(randomElement.category);

  while (choices.size < 4) {
    const randomCategory =
      allCategories[Math.floor(Math.random() * allCategories.length)];
    choices.add(randomCategory);
  }

  const shuffledChoices = Array.from(choices).sort(() => 0.5 - Math.random());
  shuffledChoices.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = translations[currentLanguage][categoryNames[cat]];
    btn.dataset.originalText = cat;
    btn.onclick = () => {
      const isCorrect = cat === randomElement.category;

      tableQuizResult.textContent = isCorrect
        ? translations[currentLanguage].table_quiz_correct
        : `${translations[currentLanguage].table_quiz_incorrect} ${
            translations[currentLanguage][categoryNames[randomElement.category]]
          }`;
      tableQuizResult.style.color = isCorrect ? "#22c55e" : "#ef4444";

      btn.style.borderColor = isCorrect ? "#22c55e" : "#ef4444";
      btn.style.background = isCorrect
        ? "linear-gradient(to right, #4ade80, #22c55e)"
        : "linear-gradient(to right, #fca5a5, #ef4444)";

      if (!isCorrect) {
        btn.classList.add("shake");
        setTimeout(() => btn.classList.remove("shake"), 500);
      }

      Array.from(tableQuizOptions.children).forEach(
        (button) => (button.disabled = true)
      );
    };

    tableQuizOptions.appendChild(btn);
  });
  tableQuizPopup.classList.remove("hidden");

  const content = tableQuizPopup.querySelector(".modal-content");
  if (content) {
    content.classList.remove("wipe-in-left-to-right");
    void content.offsetWidth;
    content.classList.add("wipe-in-left-to-right");
  }

  const wipeSFX = document.getElementById("table-quiz-wipe-sfx");
  if (wipeSFX && !wipeSFX.muted) {
    wipeSFX.currentTime = 0;
    wipeSFX.play();
  }
}

tableQuizBtn.addEventListener("click", startTableQuiz);
nextTableQuizBtn.addEventListener("click", startTableQuiz);
closeTableQuizBtn.addEventListener("click", () => {
  tableQuizPopup.classList.add("hidden");
});
let quizFinished = false;

function updateProgressBar() {
  const totalElements = elements.length;
  const unlocked = discovered.length;
  const percent = Math.floor((unlocked / totalElements) * 100);

  document.getElementById("progress-bar").style.width = `${percent}%`;
  document.getElementById(
    "progress-text"
  ).textContent = `${unlocked} / ${totalElements} ${
    translations[currentLanguage].elements_text || "Elements"
  }`;

  if (unlocked >= totalElements && !quizFinished) {
    quizFinished = true;
    showWinScreen();
    const resumeBtn = document.getElementById("resume-quiz-btn");
    resumeBtn.textContent = translations[currentLanguage].quiz_finished_message;
    resumeBtn.classList.remove("hidden");
    saveGameProgress();
  }
}

function showWinScreen() {
  const screen = document.getElementById("win-screen");
  screen.classList.remove("hidden");
}

function restartGame() {
  discovered = ["H"];
  mixed = [];
  discoveredVault = [];
  unlockQueue = [
    "He",
    "Li",
    "Be",
    "B",
    "C",
    "N",
    "O",
    "F",
    "Ne",
    "Na",
    "Mg",
    "Al",
    "Si",
    "P",
    "S",
    "Cl",
    "Ar",
    "K",
    "Ca",
    "Sc",
    "Ti",
    "V",
    "Cr",
    "Mn",
    "Fe",
    "Co",
    "Ni",
    "Cu",
    "Zn",
    "Ga",
    "Ge",
    "As",
    "Se",
    "Br",
    "Kr",
    "Rb",
    "Sr",
    "Y",
    "Zr",
    "Nb",
    "Mo",
    "Tc",
    "Ru",
    "Rh",
    "Pd",
    "Ag",
    "Cd",
    "In",
    "Sn",
    "Sb",
    "Te",
    "I",
    "Xe",
    "Cs",
    "Ba",
    "La",
    "Ce",
    "Pr",
    "Nd",
    "Pm",
    "Sm",
    "Eu",
    "Gd",
    "Tb",
    "Dy",
    "Ho",
    "Er",
    "Tm",
    "Yb",
    "Lu",
    "Hf",
    "Ta",
    "W",
    "Re",
    "Os",
    "Ir",
    "Pt",
    "Au",
    "Hg",
    "Tl",
    "Pb",
    "Bi",
    "Po",
    "At",
    "Rn",
    "Fr",
    "Ra",
    "Ac",
    "Th",
    "Pa",
    "U",
    "Np",
    "Pu",
    "Am",
    "Cm",
    "Bk",
    "Cf",
    "Es",
    "Fm",
    "Md",
    "No",
    "Lr",
    "Rf",
    "Db",
    "Sg",
    "Bh",
    "Hs",
    "Mt",
    "Ds",
    "Rg",
    "Cn",
    "Nh",
    "Fl",
    "Mc",
    "Lv",
    "Ts",
    "Og",
  ];
  quizHistory.length = 0;
  quizFinished = false;

  localStorage.clear();
  saveGameProgress();

  renderDiscovered();
  const screen = document.getElementById("win-screen");
  screen.classList.add("hidden");
  renderPeriodicTable();
  renderLanthanides();
  renderActinides();
  updateProgressBar();
  document.getElementById("start-quiz-btn").disabled = false;
  document.getElementById("start-quiz-btn").textContent =
    translations[currentLanguage].start_quiz_button;
  document.getElementById("resume-quiz-btn").classList.add("hidden");
}

function devUnlockAll() {
  discovered = elements.map((e) => e.symbol);

  elements.forEach((el) => {
    const quiz = quizData[el.symbol];
    if (quiz) {
      quizHistory.push({
        question: quiz.question.en,
        selectedAnswer: quiz.answer.en,
        correctAnswer: quiz.answer.en,
        isCorrect: true,
      });
    }
  });

  for (const compoundSymbol in vaultData) {
    if (!discoveredVault.includes(compoundSymbol)) {
      discoveredVault.push(compoundSymbol);
    }
  }

  renderPeriodicTable();
  renderLanthanides();
  renderActinides();
  updateProgressBar();
  saveGameProgress();

  console.log("✅ All elements unlocked and quiz history populated for dev.");
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === "U") {
    document.getElementById("dev-unlock").classList.remove("hidden");
  }
});

function filterByPhase(phase) {
  if (filterSfx) filterSfx.play();

  const allTiles = document.querySelectorAll(".pt-element");

  allTiles.forEach((tile) => {
    const symbol = tile.dataset.symbol;
    const element = elements.find((e) => e.symbol === symbol);
    if (!element) return;

    const match =
      element.phase && element.phase.toLowerCase() === phase.toLowerCase();

    if (match) {
      tile.classList.add("highlight-phase");
      tile.classList.remove("dimmed-phase");
    } else {
      tile.classList.remove("highlight-phase");
      tile.classList.add("dimmed-phase");
    }
  });
}

function clearPhaseFilter() {
  if (filterSfx) filterSfx.play();

  document.querySelectorAll(".pt-element").forEach((tile) => {
    tile.classList.remove("highlight-phase", "dimmed-phase");
  });
}

function renderPuzzleBank() {
  const bank = document.getElementById("puzzle-bank");
  bank.innerHTML = "";

  const shuffled = [...elements];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  shuffled.forEach((el) => {
    const tile = document.createElement("div");
    tile.className = "puzzle-tile";
    tile.draggable = true;
    tile.dataset.symbol = el.symbol;
    tile.innerHTML = `
      <div class="pt-symbol">${el.symbol}</div>
      <div class="pt-number">${el.atomicNumber}</div>
    `;
    tile.addEventListener("dragstart", function (e) {
      const dragGhost = tile.cloneNode(true);
      dragGhost.style.position = "absolute";
      dragGhost.style.top = "-9999px";
      document.body.appendChild(dragGhost);

      e.dataTransfer.setData("text/plain", el.symbol);
      e.dataTransfer.setDragImage(dragGhost, 30, 30);
    });

    bank.appendChild(tile);
  });
}

function renderPuzzleGrid() {
  const grid = document.getElementById("puzzle-grid");
  grid.innerHTML = "";

  periodicLayout.forEach((row, rowIndex) => {
    row.forEach((symbol, colIndex) => {
      const cell = document.createElement("div");
      cell.className = "puzzle-cell";
      if (symbol && symbol !== "") {
        cell.dataset.correctSymbol = symbol.replace("*", "");
        cell.ondragover = (e) => e.preventDefault();
        cell.ondrop = onDrop;
        cell.innerHTML = "";
      } else {
        cell.classList.add("empty-cell");
      }
      grid.appendChild(cell);
    });
  });
}

function onDragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.symbol);
}

function onDrop(e) {
  e.preventDefault();
  const droppedSymbol = e.dataTransfer.getData("text/plain");
  const cell = e.target.closest(".puzzle-cell");

  if (cell && !cell.querySelector(".puzzle-tile")) {
    const tile = document.querySelector(
      `.puzzle-tile[data-symbol="${droppedSymbol}"]`
    );

    if (tile) {
      tile.draggable = false;
      tile.classList.add("placed");
      cell.appendChild(tile);
    }
  }
}

function checkPuzzleAnswers() {
  const cells = document.querySelectorAll(".puzzle-cell");
  let mistakes = 0;

  cells.forEach((cell) => {
    const placed = cell.querySelector(".puzzle-tile");
    const correct = cell.dataset.correctSymbol;

    if (!placed || placed.dataset.symbol !== correct) {
      cell.classList.add("shake");
      mistakes++;
    } else {
      cell.classList.remove("shake");
    }
  });

  const result = document.getElementById("puzzle-result");
  result.textContent =
    mistakes === 0
      ? translations[currentLanguage].puzzle_perfect
      : `${translations[currentLanguage].puzzle_misplaced_prefix} ${mistakes} ${translations[currentLanguage].puzzle_misplaced_suffix}`;
}

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("start-puzzle-btn").addEventListener("click", () => {
    const unlocked = discovered.length;

    if (unlocked < elements.length) {
      showBlockedPuzzlePopup();
    } else {
      const puzzleModal = document.getElementById("puzzle-modal");
      const content = puzzleModal.querySelector(".modal-content");

      puzzleModal.classList.remove("hidden");

      if (content) {
        content.classList.remove("wipe-in-left-to-right");
        void content.offsetWidth;
        content.classList.add("wipe-in-left-to-right");
      }

      const wipeSFX = document.getElementById("table-quiz-wipe-sfx");
      if (wipeSFX && !wipeSFX.muted) {
        wipeSFX.currentTime = 0;
        wipeSFX.play();
      }

      renderPuzzleGrid();
      renderPuzzleBank();
      document.getElementById("puzzle-result").textContent = "";
    }
  });

  document.getElementById("puzzle-close").onclick = () => {
    document.getElementById("puzzle-modal").classList.add("hidden");
  };

  document.getElementById("puzzle-submit").onclick = checkPuzzleAnswers;

  document.getElementById("puzzle-reset").onclick = () => {
    renderPuzzleGrid();
    renderPuzzleBank();
    document.getElementById("puzzle-result").textContent = "";
  };
});

function tryStartPuzzle() {
  const allUnlocked = discovered.length === elements.length;
  if (!allUnlocked) {
    showBlockedPuzzlePopup();
    return;
  }

  document.getElementById("puzzle-modal").classList.remove("hidden");
  renderPuzzleGrid();
  renderPuzzleBank();
}

function showBlockedPuzzlePopup() {
  const blockerSound = document.getElementById("locked-popup-sfx");
  if (blockerSound) {
    blockerSound.currentTime = 0;
    blockerSound.play();
  }

  const blocker = document.getElementById("puzzle-blocker");
  if (blocker) {
    blocker.classList.remove("hidden");
  } else {
    alert(translations[currentLanguage].puzzle_blocker_message_1);
  }
}

function openQuestionReviewModal() {
  const buttonsContainer = document.getElementById("question-buttons");
  const infoContainer = document.getElementById("question-info");

  buttonsContainer.innerHTML = "";
  infoContainer.innerHTML = `<p>${translations[currentLanguage].select_question_info}</p>`;

  document
    .querySelectorAll(".qa-grid button")
    .forEach((btn) => btn.classList.remove("active"));

  Object.keys(quizData).forEach((symbol, index) => {
    const entry = quizData[symbol];
    const btn = document.createElement("button");
    btn.textContent = `Q${index + 1}`;
    btn.dataset.questionSymbol = symbol;

    const answeredEntry = quizHistory.find(
      (hist) => hist.question === entry.question.en
    );

    if (answeredEntry) {
      btn.classList.add("answered");
      if (answeredEntry.isCorrect) {
        btn.classList.add("correct-answered");
      } else {
        btn.classList.add("incorrect-answered");
      }
    }

    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".qa-grid button")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      let infoHtml = `<h3>${translations[currentLanguage].question_label} ${
        index + 1
      } (${symbol})</h3>`;
      infoHtml += `<p><strong>${translations[currentLanguage].question_label}:</strong> ${entry.question[currentLanguage]}</p>`;

      if (answeredEntry) {
        infoHtml += `<p><strong>${translations[currentLanguage].your_answer_label}:</strong> ${answeredEntry.selectedAnswer}</p>`;
        infoHtml += `<p><strong>${translations[currentLanguage].correct_answer_label}:</strong> ${answeredEntry.correctAnswer}</p>`;
        infoHtml += `<p><strong>${
          translations[currentLanguage].result_label
        }:</strong> <span class="${
          answeredEntry.isCorrect ? "correct-result" : "incorrect-result"
        }">${
          answeredEntry.isCorrect
            ? translations[currentLanguage].correct_result
            : translations[currentLanguage].incorrect_result
        }</span></p>`;
      } else {
        infoHtml += `<p><strong>${translations[currentLanguage].correct_answer_label}:</strong> ${entry.answer[currentLanguage]}</p>`;
        infoHtml += `<p>${
          translations[currentLanguage].not_answered_yet || "Not answered yet."
        }</p>`;
      }

      infoContainer.innerHTML = infoHtml;
      infoContainer.classList.remove("zoom-review");
      void infoContainer.offsetWidth;
      infoContainer.classList.add("zoom-review");
    });
    buttonsContainer.appendChild(btn);
  });

  const modal = document.getElementById("question-review-modal");
  const content = modal.querySelector(".modal-content");

  modal.classList.remove("hidden");

  content.classList.remove("modal-arise");
  void content.offsetWidth;
  content.classList.add("modal-arise");

  const sfx = document.getElementById("ui-popup-sfx");
  if (sfx && !sfx.muted) {
    sfx.currentTime = 0;
    sfx.play();
  }

  infoContainer.innerHTML = `<p>${translations[currentLanguage].reviewing_all_quiz_questions}</p>`;
  document.getElementById("question-review-modal").classList.remove("hidden");
}

function closeQuestionReview() {
  const modal = document.getElementById("question-review-modal");
  const content = modal.querySelector(".modal-content");

  content.classList.remove("modal-arise");
  content.classList.add("modal-exit");

  setTimeout(() => {
    modal.classList.add("hidden");
    content.classList.remove("modal-exit");
  }, 300);
}

function closeWinScreen() {
  document.getElementById("win-screen").classList.add("hidden");
}

function dismissAlert() {
  const alert = document.getElementById("dev-alert");
  if (alert) alert.remove();
}

function closePuzzleBlocker() {
  const blocker = document.getElementById("puzzle-blocker");
  if (blocker) {
    blocker.classList.add("hidden");
  }
}

function saveGameProgress() {
  try {
    localStorage.setItem("chemicraft_discovered", JSON.stringify(discovered));
    localStorage.setItem(
      "chemicraft_discoveredVault",
      JSON.stringify(discoveredVault)
    );
    localStorage.setItem("chemicraft_unlockQueue", JSON.stringify(unlockQueue));
    localStorage.setItem("chemicraft_quizHistory", JSON.stringify(quizHistory));
    localStorage.setItem(
      "chemicraft_quizFinished",
      JSON.stringify(quizFinished)
    );
    localStorage.setItem("chemicraft_currentLanguage", currentLanguage);
    console.log("Game progress saved to Local Storage.");
  } catch (e) {
    console.error("Error saving game progress:", e);
    alert(
      "Could not save game progress. Your browser's storage might be full or disabled."
    );
  }
}

function loadGameProgress() {
  try {
    const savedDiscovered = localStorage.getItem("chemicraft_discovered");
    const savedDiscoveredVault = localStorage.getItem(
      "chemicraft_discoveredVault"
    );
    const savedUnlockQueue = localStorage.getItem("chemicraft_unlockQueue");
    const savedQuizHistory = localStorage.getItem("chemicraft_quizHistory");
    const savedQuizFinished = localStorage.getItem("chemicraft_quizFinished");
    const savedLanguage = localStorage.getItem("chemicraft_currentLanguage");

    if (savedDiscovered) {
      discovered = JSON.parse(savedDiscovered);
    } else {
      discovered = ["H"];
    }

    if (savedDiscoveredVault) {
      discoveredVault = JSON.parse(savedDiscoveredVault);
    }

    if (savedUnlockQueue) {
      unlockQueue = JSON.parse(savedUnlockQueue);
    }

    if (savedQuizHistory) {
      quizHistory.length = 0;
      const parsedHistory = JSON.parse(savedQuizHistory);
      parsedHistory.forEach((item) => quizHistory.push(item));
    } else {
      quizHistory.length = 0;
    }

    if (savedQuizFinished) {
      quizFinished = JSON.parse(savedQuizFinished);
    }

    if (savedLanguage && translations[savedLanguage]) {
      currentLanguage = savedLanguage;
    } else {
      currentLanguage = "en";
    }

    console.log("Game progress loaded from Local Storage.");
  } catch (e) {
    console.error("Error loading game progress:", e);
    alert("Could not load game progress. Starting a new game.");
    localStorage.clear();
    discovered = ["H"];
    mixed = [];
    discoveredVault = [];
    unlockQueue = [
      "He",
      "Li",
      "Be",
      "B",
      "C",
      "N",
      "O",
      "F",
      "Ne",
      "Na",
      "Mg",
      "Al",
      "Si",
      "P",
      "S",
      "Cl",
      "Ar",
      "K",
      "Ca",
      "Sc",
      "Ti",
      "V",
      "Cr",
      "Mn",
      "Fe",
      "Co",
      "Ni",
      "Cu",
      "Zn",
      "Ga",
      "Ge",
      "As",
      "Se",
      "Br",
      "Kr",
      "Rb",
      "Sr",
      "Y",
      "Zr",
      "Nb",
      "Mo",
      "Tc",
      "Ru",
      "Rh",
      "Pd",
      "Ag",
      "Cd",
      "In",
      "Sn",
      "Sb",
      "Te",
      "I",
      "Xe",
      "Cs",
      "Ba",
      "La",
      "Ce",
      "Pr",
      "Nd",
      "Pm",
      "Sm",
      "Eu",
      "Gd",
      "Tb",
      "Dy",
      "Ho",
      "Er",
      "Tm",
      "Yb",
      "Lu",
      "Hf",
      "Ta",
      "W",
      "Re",
      "Os",
      "Ir",
      "Pt",
      "Au",
      "Hg",
      "Tl",
      "Pb",
      "Bi",
      "Po",
      "At",
      "Rn",
      "Fr",
      "Ra",
      "Ac",
      "Th",
      "Pa",
      "U",
      "Np",
      "Pu",
      "Am",
      "Cm",
      "Bk",
      "Cf",
      "Es",
      "Fm",
      "Md",
      "No",
      "Lr",
      "Rf",
      "Db",
      "Sg",
      "Bh",
      "Hs",
      "Mt",
      "Ds",
      "Rg",
      "Cn",
      "Nh",
      "Fl",
      "Mc",
      "Lv",
      "Ts",
      "Og",
    ];
    quizHistory.length = 0;
    quizFinished = false;
    currentLanguage = "en";
  }
}

document.querySelectorAll(".language-selector button").forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  loadGameProgress();
  setLanguage(currentLanguage);
  renderPeriodicTable();
  renderDiscovered();
  renderLanthanides();
  renderActinides();
  updateVaultUI();
  updateProgressBar();

  if (quizFinished) {
    const resumeBtn = document.getElementById("resume-quiz-btn");
    resumeBtn.textContent = translations[currentLanguage].quiz_finished_message;
    resumeBtn.classList.remove("hidden");
    document.getElementById("start-quiz-btn").disabled = true;
    document.getElementById("start-quiz-btn").textContent =
      translations[currentLanguage].quiz_completed;
  } else if (unlockQueue.length < elements.length) {
    document.getElementById("resume-quiz-btn").classList.remove("hidden");
    document.getElementById("start-quiz-btn").disabled = true;
    document.getElementById("start-quiz-btn").textContent =
      translations[currentLanguage].quiz_in_progress;
  }
});

window.addEventListener("beforeunload", saveGameProgress);

document.addEventListener("DOMContentLoaded", () => {
  const customCursor = document.getElementById("custom-cursor");
  if (customCursor) {
    document.addEventListener("mousemove", (e) => {
      customCursor.style.left = e.clientX + "px";
      customCursor.style.top = e.clientY + "px";
    });

    document.addEventListener("mousedown", () => {
      document.body.classList.add("clicking");
    });

    document.addEventListener("mouseup", () => {
      document.body.classList.remove("clicking");
    });
  }
});

// Developer Profiles Modal
const devProfilesModal = document.getElementById("dev-profiles-modal");
const openDevProfilesBtn = document.getElementById("open-dev-profiles");
const closeDevProfilesBtn = document.getElementById("close-dev-profiles");

openDevProfilesBtn.addEventListener("click", () => {
  devProfilesModal.classList.remove("hidden");
});

closeDevProfilesBtn.addEventListener("click", () => {
  devProfilesModal.classList.add("hidden");
});

