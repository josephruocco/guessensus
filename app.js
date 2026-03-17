const STORAGE_KEYS = {
  stats: "guessensus-stats",
  played: "guessensus-played",
  queue: "guessensus-queue",
  pool: "guessensus-answer-pool",
};

const CATEGORY_STYLES = {
  Dinosaurs: { emoji: "🦖", accent: "#bc5a3c", accentDeep: "#7f2e19" },
  Pasta: { emoji: "🍝", accent: "#c8952c", accentDeep: "#87590d" },
  "Stock Photos": { emoji: "📸", accent: "#496f96", accentDeep: "#22415f" },
  "Wikipedia Articles": { emoji: "📚", accent: "#5d6d56", accentDeep: "#33402e" },
  "Old Book Covers": { emoji: "📕", accent: "#87504d", accentDeep: "#4d2927" },
};

const ITEMS = [
  {
    id: "dino-1",
    category: "Dinosaurs",
    name: "Micropachycephalosaurus",
    visualHint: "Obscure dinosaur",
    description: "No title, no taxonomy. Just the picture.",
    prompt: "What would most people call this at first glance?",
    consensus: [
      { label: "tiny t-rex", share: 41, aliases: ["tiny trex", "tiny t rex", "baby trex", "mini trex", "little trex", "small trex"] },
      { label: "spiky lizard", share: 24, aliases: ["spiky dinosaur", "spike lizard", "spiked lizard", "spiky guy"] },
      { label: "baby dinosaur", share: 21, aliases: ["baby dino", "little dinosaur", "small dinosaur", "tiny dinosaur"] },
      { label: "raptor thing", share: 14, aliases: ["raptor", "small raptor", "raptor dinosaur"] },
    ],
  },
  {
    id: "dino-2",
    category: "Dinosaurs",
    name: "Kosmoceratops",
    visualHint: "Obscure dinosaur",
    description: "No title, no taxonomy. Just the picture.",
    prompt: "What crowd label wins here?",
    consensus: [
      { label: "weird triceratops", share: 46, aliases: ["triceratops", "weird trike", "fancy triceratops", "horned triceratops"] },
      { label: "spiky face one", share: 23, aliases: ["spiky face", "spike face dinosaur", "face spikes"] },
      { label: "boss dinosaur", share: 17, aliases: ["king dinosaur", "main dinosaur", "big boss dinosaur"] },
      { label: "horned lizard", share: 14, aliases: ["horned dinosaur", "horn lizard", "horn face dinosaur"] },
    ],
  },
  {
    id: "pasta-1",
    category: "Pasta",
    name: "Radiatori",
    visualHint: "Obscure pasta shape",
    description: "No package, no name. Just the shape.",
    prompt: "What would the average person call this pasta?",
    consensus: [
      { label: "little noodles", share: 37, aliases: ["tiny noodles", "small noodles", "little pasta", "mini noodles"] },
      { label: "mini lasagna bits", share: 25, aliases: ["lasagna bits", "tiny lasagna", "mini lasagna", "little lasagna pieces"] },
      { label: "spiral pasta", share: 22, aliases: ["spiral noodles", "spirals", "twisty pasta"] },
      { label: "tiny shells", share: 16, aliases: ["small shells", "mini shells", "shell pasta"] },
    ],
  },
  {
    id: "pasta-2",
    category: "Pasta",
    name: "Campanelle",
    visualHint: "Obscure pasta shape",
    description: "No package, no name. Just the shape.",
    prompt: "Which label gets the most instinctive votes?",
    consensus: [
      { label: "flower pasta", share: 34, aliases: ["flower noodles", "petal pasta", "rose pasta"] },
      { label: "fancy shells", share: 28, aliases: ["shell pasta", "frilly shells", "cute shells"] },
      { label: "curly noodles", share: 21, aliases: ["curly pasta", "wavy noodles", "curled pasta"] },
      { label: "bowtie pasta", share: 17, aliases: ["bow ties", "bowtie noodles", "farfalle"] },
    ],
  },
  {
    id: "stock-1",
    category: "Stock Photos",
    name: "Handshake Over Salad",
    visualHint: "Mystery stock photo",
    description: "A staged image with no caption.",
    prompt: "What would most people think this image is trying to say?",
    consensus: [
      { label: "teamwork", share: 42, aliases: ["collaboration", "team building", "working together"] },
      { label: "healthy business lunch", share: 19, aliases: ["office lunch", "healthy office lunch", "business lunch"] },
      { label: "startup meeting", share: 23, aliases: ["startup lunch", "office meeting", "work meeting"] },
      { label: "office people pretending", share: 16, aliases: ["fake office photo", "corporate pretending", "fake teamwork"] },
    ],
  },
  {
    id: "stock-2",
    category: "Stock Photos",
    name: "Laptop on Beach Blanket",
    visualHint: "Mystery stock photo",
    description: "A staged image with no caption.",
    prompt: "What does the crowd call the vibe of this photo?",
    consensus: [
      { label: "work from anywhere", share: 44, aliases: ["remote work", "working remotely", "beach work", "work on vacation"] },
      { label: "fake productivity", share: 21, aliases: ["pretend productivity", "fake remote work", "staged work"] },
      { label: "digital nomad ad", share: 20, aliases: ["digital nomad", "nomad ad", "remote work ad"] },
      { label: "vacation email", share: 15, aliases: ["checking email on vacation", "vacation work", "holiday email"] },
    ],
  },
  {
    id: "wiki-1",
    category: "Wikipedia Articles",
    name: "List of unusual deaths",
    visualHint: "Mystery article preview",
    description: "You get a visual preview, not the real title.",
    prompt: "What would most people assume this article is?",
    consensus: [
      { label: "morbid trivia page", share: 39, aliases: ["morbid facts", "death trivia", "dark trivia page"] },
      { label: "dark internet rabbit hole", share: 26, aliases: ["internet rabbit hole", "dark rabbit hole", "weird internet page"] },
      { label: "fake wikipedia page", share: 18, aliases: ["fake wiki page", "made up wikipedia page", "satire wikipedia"] },
      { label: "history facts list", share: 17, aliases: ["history list", "historical facts list", "history trivia"] },
    ],
  },
  {
    id: "wiki-2",
    category: "Wikipedia Articles",
    name: "Dancing mania",
    visualHint: "Mystery article preview",
    description: "You get a visual preview, not the real title.",
    prompt: "What would most people guess this article covers?",
    consensus: [
      { label: "historical panic event", share: 33, aliases: ["history panic", "mass panic event", "historical event"] },
      { label: "disco history", share: 25, aliases: ["dance history", "history of dancing", "disco article"] },
      { label: "medical condition", share: 24, aliases: ["disease", "syndrome", "illness"] },
      { label: "internet joke page", share: 18, aliases: ["joke wikipedia page", "meme page", "fake joke page"] },
    ],
  },
  {
    id: "book-1",
    category: "Old Book Covers",
    name: "The Metal Monster",
    visualHint: "Mystery book cover",
    description: "Cover only. No title shown yet.",
    prompt: "What would people think this book is called?",
    consensus: [
      { label: "robot invasion", share: 35, aliases: ["robot book", "robots attack", "robot war"] },
      { label: "giant monster book", share: 28, aliases: ["monster book", "big monster book", "giant robot monster"] },
      { label: "old sci-fi novel", share: 23, aliases: ["vintage sci fi", "old science fiction", "retro sci fi"] },
      { label: "space war story", share: 14, aliases: ["space war", "space battle book", "war in space"] },
    ],
  },
  {
    id: "book-2",
    category: "Old Book Covers",
    name: "The Moon Pool",
    visualHint: "Mystery book cover",
    description: "Cover only. No title shown yet.",
    prompt: "What fake title would win the room?",
    consensus: [
      { label: "the secret lagoon", share: 30, aliases: ["secret lagoon", "hidden lagoon", "mystery lagoon"] },
      { label: "the lost island", share: 27, aliases: ["lost island", "island of mystery", "hidden island"] },
      { label: "the haunted pool", share: 23, aliases: ["haunted pool", "ghost pool", "cursed pool"] },
      { label: "the moon temple", share: 20, aliases: ["moon temple", "temple of the moon", "moon shrine"] },
    ],
  },
];

const SEED_LABELS = {
  Dinosaurs: ["tiny t-rex", "raptor thing", "long-neck", "spiky lizard", "triceratops-ish", "bird lizard"],
  Pasta: ["flower pasta", "tiny shells", "spiral pasta", "little noodles", "tube pasta", "fancy bowties"],
  "Stock Photos": ["teamwork", "fake productivity", "corporate ad", "wellness content", "awkward meeting", "startup energy"],
  "Wikipedia Articles": ["internet joke page", "history rabbit hole", "fake wikipedia page", "niche fandom article", "morbid trivia", "academic thing"],
  "Old Book Covers": ["old sci-fi novel", "haunted mansion book", "weird children’s story", "occult paperback", "lost world adventure", "robot invasion"],
};

const state = {
  dailyItem: null,
  selectedGuess: null,
  seedBundle: [],
  seedSelections: {},
  assetManifest: {},
  pool: loadJson(STORAGE_KEYS.pool, {}),
  stats: loadJson(STORAGE_KEYS.stats, { score: 0, correct: 0, streak: 0 }),
  played: loadJson(STORAGE_KEYS.played, {}),
  queue: loadJson(STORAGE_KEYS.queue, []),
};

function loadJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function hashString(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickDailyItem() {
  const todayKey = getTodayKey();
  return ITEMS[hashString(todayKey) % ITEMS.length];
}

function createSeedBundle() {
  const todayKey = `${getTodayKey()}-bundle`;
  const picked = new Set();
  const bundle = [];

  while (bundle.length < 3) {
    const index = (hashString(`${todayKey}-${bundle.length}-${Math.random()}`) + bundle.length) % ITEMS.length;
    const item = ITEMS[index];
    if (!picked.has(item.id)) {
      picked.add(item.id);
      bundle.push(item);
    }
  }

  return bundle;
}

function renderCategories() {
  return null;
}

function renderDailyRound() {
  const item = state.dailyItem;
  const style = CATEGORY_STYLES[item.category];
  const image = document.getElementById("artifact-image");
  const input = document.getElementById("guess-input");
  const datePill = document.getElementById("today-date");
  const asset = state.assetManifest[item.id];

  document.getElementById("artifact-category").textContent = item.visualHint;
  document.getElementById("artifact-name").textContent = "Guessensus";
  document.getElementById("artifact-description").textContent =
    "One weird thing per day. Your job is to predict what most people would call it first.";
  document.getElementById("daily-prompt").textContent = item.prompt;
  document.getElementById("next-drop-note").textContent = "A new thing shows up after midnight on this device.";
  datePill.textContent = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  image.src = resolveItemImage(item, style);
  image.alt = `${item.category} picture round`;
  renderAssetMeta(asset);
  renderPoolStatus();
  input.value = "";
}

function renderAssetMeta(asset) {
  const meta = document.getElementById("asset-meta");
  const attribution = document.getElementById("asset-attribution");
  const sourceLink = document.getElementById("asset-source-link");

  if (!asset || !asset.image) {
    meta.classList.add("hidden");
    attribution.textContent = "";
    sourceLink.removeAttribute("href");
    return;
  }

  attribution.textContent = `${asset.attribution} License: ${asset.license}.`;
  sourceLink.href = asset.sourceUrl;
  meta.classList.add("hidden");
}

function revealAssetMeta() {
  const meta = document.getElementById("asset-meta");
  const attribution = document.getElementById("asset-attribution");

  if (attribution.textContent) {
    meta.classList.remove("hidden");
  }
}

function renderStats() {
  const score = document.getElementById("score-total");
  const correct = document.getElementById("correct-total");
  const streak = document.getElementById("streak-total");

  if (!score || !correct || !streak) {
    return;
  }

  score.textContent = state.stats.score;
  correct.textContent = state.stats.correct;
  streak.textContent = state.stats.streak;
}

function submitGuess() {
  const todayKey = getTodayKey();
  const input = document.getElementById("guess-input");
  const typedGuess = input.value.trim();

  if (!typedGuess) {
    showResult("Type an answer first.");
    return;
  }

  if (state.played[todayKey]) {
    showResult("Today is already locked. Come back tomorrow for a fresh round.");
    return;
  }

  state.selectedGuess = typedGuess;

  const [winner, second] = state.dailyItem.consensus;
  const match = matchConsensusOption(typedGuess, state.dailyItem.consensus);
  let points = 0;
  let message = "";

  if (match?.label === winner.label) {
    points = 100;
    state.stats.correct += 1;
    state.stats.streak += 1;
    message = `Bullseye. The top crowd answer was <strong>${winner.label}</strong> with ${winner.share}% of votes. Your answer matched it.`;
  } else if (match?.label === second.label) {
    points = 40;
    state.stats.streak = 0;
    message = `Close. The room went with <strong>${winner.label}</strong> at ${winner.share}%. Your answer grouped with <strong>${second.label}</strong> at ${second.share}%.`;
  } else {
    state.stats.streak = 0;
    message = `Miss. The crowd leader was <strong>${winner.label}</strong> at ${winner.share}%.`;
  }

  state.stats.score += points;
  state.played[todayKey] = {
    guess: state.selectedGuess,
    itemId: state.dailyItem.id,
    points,
  };

  saveJson(STORAGE_KEYS.stats, state.stats);
  saveJson(STORAGE_KEYS.played, state.played);
  renderStats();
  revealAssetMeta();
  showResult(`${message} You earned <b>${points}</b> points.`);
}

function showResult(message) {
  const box = document.getElementById("result-box");
  box.innerHTML = message;
  box.classList.remove("hidden");
}

function togglePoolPanel(forceOpen) {
  const panel = document.getElementById("pool-panel");
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : panel.classList.contains("hidden");
  panel.classList.toggle("hidden", !shouldOpen);

  if (shouldOpen) {
    document.getElementById("pool-input").focus();
  }
}

function renderPoolStatus() {
  const entries = state.pool[state.dailyItem.id] || [];
  const status = document.getElementById("pool-status");
  status.textContent =
    entries.length === 0
      ? "No saved pool answers for this item yet."
      : `${entries.length} saved pool answer${entries.length === 1 ? "" : "s"} on this browser.`;
}

function savePoolAnswer() {
  const input = document.getElementById("pool-input");
  const typed = input.value.trim();

  if (!typed) {
    document.getElementById("pool-status").textContent = "Type an answer before saving to the pool.";
    return;
  }

  const itemId = state.dailyItem.id;
  const existing = state.pool[itemId] || [];

  existing.unshift({
    answer: typed,
    normalized: normalizeGuess(typed),
    createdAt: new Date().toISOString(),
  });

  state.pool[itemId] = existing;
  saveJson(STORAGE_KEYS.pool, state.pool);
  input.value = "";
  renderPoolStatus();
}

function normalizeGuess(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ");
}

function matchConsensusOption(guess, options) {
  const normalizedGuess = normalizeGuess(guess);

  for (const option of options) {
    const candidates = [option.label, ...(option.aliases || [])].map(normalizeGuess);
    if (candidates.includes(normalizedGuess)) {
      return option;
    }
  }

  return null;
}

function renderSeedBundle() {
  return null;
}

function updateQueuePill() {
  return null;
}

function saveBundle() {
  const missing = state.seedBundle.some((item) => !state.seedSelections[item.id]);
  if (missing) {
    showResult("Finish all three hidden labels before saving the bundle.");
    return;
  }

  const createdAt = new Date();
  const eligibleAt = new Date(createdAt);
  eligibleAt.setDate(createdAt.getDate() + 3);

  state.queue.unshift({
    bundleId: `bundle-${Date.now()}`,
    createdAt: createdAt.toISOString(),
    eligibleAt: eligibleAt.toISOString(),
    items: state.seedBundle.map((item) => ({
      itemId: item.id,
      pickedLabel: state.seedSelections[item.id],
    })),
  });

  saveJson(STORAGE_KEYS.queue, state.queue);
  updateQueuePill();
  showResult("Bundle saved. It enters the hidden pool and only becomes eligible after a delay.");

  state.seedSelections = {};
  state.seedBundle = createSeedBundle();
  renderSeedBundle();
}

function rerollBundle() {
  state.seedSelections = {};
  state.seedBundle = createSeedBundle();
  renderSeedBundle();
}

function bindEvents() {
  document.getElementById("submit-guess").addEventListener("click", submitGuess);
  document.getElementById("reset-guess").addEventListener("click", () => {
    state.selectedGuess = null;
    document.getElementById("guess-input").value = "";
    showResult("Selection cleared.");
  });
  document.getElementById("guess-form").addEventListener("submit", (event) => {
    event.preventDefault();
    submitGuess();
  });
  document.getElementById("pool-link").addEventListener("click", () => {
    togglePoolPanel();
  });
  document.getElementById("close-pool").addEventListener("click", () => {
    togglePoolPanel(false);
  });
  document.getElementById("pool-form").addEventListener("submit", (event) => {
    event.preventDefault();
    savePoolAnswer();
  });
}

function init() {
  bootstrap();
}

async function bootstrap() {
  state.assetManifest = await loadAssetManifest();
  state.dailyItem = pickDailyItem();
  state.seedBundle = createSeedBundle();

  renderCategories();
  renderDailyRound();
  renderSeedBundle();
  renderStats();
  updateQueuePill();
  bindEvents();

  const playedToday = state.played[getTodayKey()];
  if (playedToday) {
    revealAssetMeta();
    showResult("Today’s round is already scored on this browser. The daily item stays visible for reference.");
  }
}

async function loadAssetManifest() {
  if (window.GUESSENSUS_ASSET_MANIFEST) {
    return Object.fromEntries(
      (window.GUESSENSUS_ASSET_MANIFEST.assets || [])
        .filter((asset) => asset.id)
        .map((asset) => [asset.id, asset]),
    );
  }

  try {
    const response = await fetch("./assets/manifest.json");
    if (!response.ok) {
      return {};
    }

    const data = await response.json();
    return Object.fromEntries(
      (data.assets || [])
        .filter((asset) => asset.id)
        .map((asset) => [asset.id, asset]),
    );
  } catch {
    return {};
  }
}

function resolveItemImage(item, style) {
  const asset = state.assetManifest[item.id];
  if (asset && asset.image) {
    return asset.image;
  }

  return buildIllustration(item, style);
}

function buildIllustration(item, style) {
  const art = {
    "dino-1": `
      <circle cx="530" cy="92" r="54" fill="rgba(255,255,255,0.28)" />
      <ellipse cx="300" cy="245" rx="138" ry="88" fill="#6a8a58" />
      <circle cx="418" cy="178" r="46" fill="#6a8a58" />
      <circle cx="432" cy="154" r="18" fill="#eadfbd" />
      <rect x="248" y="315" width="26" height="95" rx="12" fill="#4f643f" />
      <rect x="330" y="315" width="26" height="95" rx="12" fill="#4f643f" />
      <polygon points="162,246 68,184 118,280" fill="#6a8a58" />
      <path d="M258 152 C290 126, 332 126, 360 152" stroke="#eadfbd" stroke-width="16" fill="none" stroke-linecap="round"/>
      <circle cx="444" cy="148" r="6" fill="#1d1a16" />
    `,
    "dino-2": `
      <circle cx="96" cy="92" r="56" fill="rgba(255,255,255,0.24)" />
      <ellipse cx="296" cy="258" rx="146" ry="96" fill="#627b61" />
      <circle cx="438" cy="216" r="56" fill="#627b61" />
      <polygon points="472,192 542,176 480,238" fill="#eadfbd" />
      <path d="M402 158 L424 112 L444 162 Z" fill="#eadfbd" />
      <path d="M434 150 L468 100 L476 164 Z" fill="#eadfbd" />
      <path d="M372 168 L388 118 L410 172 Z" fill="#eadfbd" />
      <circle cx="458" cy="206" r="6" fill="#1d1a16" />
      <rect x="244" y="334" width="26" height="86" rx="12" fill="#495c49" />
      <rect x="334" y="334" width="26" height="86" rx="12" fill="#495c49" />
    `,
    "pasta-1": `
      <rect x="120" y="96" width="100" height="220" rx="18" fill="#edc46d" />
      <rect x="250" y="128" width="100" height="188" rx="18" fill="#e5b85a" />
      <rect x="380" y="96" width="100" height="220" rx="18" fill="#edc46d" />
      <path d="M120 132 H220 M120 178 H220 M120 224 H220 M120 270 H220" stroke="#c58d2c" stroke-width="12"/>
      <path d="M250 164 H350 M250 210 H350 M250 256 H350" stroke="#b57714" stroke-width="12"/>
      <path d="M380 132 H480 M380 178 H480 M380 224 H480 M380 270 H480" stroke="#c58d2c" stroke-width="12"/>
    `,
    "pasta-2": `
      <path d="M196 158 C132 238, 188 332, 258 348 C310 360, 368 320, 370 262 C372 206, 328 152, 272 146 C244 142, 218 144, 196 158 Z" fill="#e9be61"/>
      <path d="M248 142 C208 194, 236 308, 298 334" stroke="#c28a24" stroke-width="16" fill="none" stroke-linecap="round"/>
      <path d="M178 184 C210 154, 254 138, 296 142" stroke="#f4d58b" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M188 320 C232 352, 292 360, 342 330" stroke="#f4d58b" stroke-width="12" fill="none" stroke-linecap="round"/>
    `,
    "stock-1": `
      <rect x="0" y="260" width="640" height="188" fill="#d8c6a4" />
      <circle cx="198" cy="152" r="42" fill="#f0d5bc" />
      <circle cx="424" cy="152" r="42" fill="#e7c0a8" />
      <rect x="162" y="194" width="74" height="124" rx="16" fill="#6d869f" />
      <rect x="388" y="194" width="74" height="124" rx="16" fill="#8a7762" />
      <path d="M236 246 C278 230, 314 230, 356 246" stroke="#d2b18d" stroke-width="18" fill="none" stroke-linecap="round"/>
      <ellipse cx="320" cy="330" rx="112" ry="42" fill="#8db068" />
      <ellipse cx="320" cy="338" rx="88" ry="24" fill="#d64f36" />
    `,
    "stock-2": `
      <rect x="0" y="0" width="640" height="210" fill="#88cde8" />
      <rect x="0" y="210" width="640" height="238" fill="#ead39f" />
      <polygon points="96,126 188,86 278,126 188,166" fill="#f2f0df" />
      <rect x="230" y="190" width="182" height="114" rx="12" fill="#8a9ba8" />
      <rect x="248" y="208" width="146" height="78" rx="8" fill="#c2d1dd" />
      <circle cx="476" cy="112" r="30" fill="#fff5bf" />
    `,
    "wiki-1": `
      <rect x="94" y="54" width="454" height="330" rx="22" fill="#f7f1e3" />
      <rect x="126" y="94" width="206" height="18" rx="9" fill="#1d1a16" opacity="0.9" />
      <rect x="126" y="130" width="322" height="12" rx="6" fill="#93877a" />
      <rect x="126" y="154" width="286" height="12" rx="6" fill="#b7aa99" />
      <rect x="126" y="198" width="118" height="132" rx="10" fill="#cfb796" />
      <rect x="266" y="198" width="238" height="10" rx="5" fill="#b7aa99" />
      <rect x="266" y="224" width="218" height="10" rx="5" fill="#b7aa99" />
      <rect x="266" y="250" width="224" height="10" rx="5" fill="#b7aa99" />
      <rect x="266" y="276" width="188" height="10" rx="5" fill="#b7aa99" />
      <rect x="266" y="302" width="210" height="10" rx="5" fill="#b7aa99" />
    `,
    "wiki-2": `
      <rect x="94" y="54" width="454" height="330" rx="22" fill="#f7f1e3" />
      <rect x="126" y="94" width="184" height="18" rx="9" fill="#1d1a16" opacity="0.9" />
      <circle cx="194" cy="236" r="62" fill="#d2b16c" />
      <circle cx="194" cy="236" r="18" fill="#a96e31" />
      <path d="M194 174 L206 214 L248 214 L214 238 L226 280 L194 254 L162 280 L174 238 L140 214 L182 214 Z" fill="#8e5830" opacity="0.72" />
      <rect x="290" y="198" width="190" height="10" rx="5" fill="#b7aa99" />
      <rect x="290" y="224" width="170" height="10" rx="5" fill="#b7aa99" />
      <rect x="290" y="250" width="198" height="10" rx="5" fill="#b7aa99" />
      <rect x="290" y="276" width="176" height="10" rx="5" fill="#b7aa99" />
    `,
    "book-1": `
      <rect x="146" y="28" width="348" height="392" rx="18" fill="#2a2a38" />
      <rect x="176" y="66" width="288" height="42" rx="12" fill="#d5a744" />
      <rect x="214" y="136" width="218" height="176" rx="18" fill="#7b2f2e" />
      <circle cx="266" cy="228" r="42" fill="#d7d0c5" opacity="0.28" />
      <rect x="318" y="182" width="58" height="92" rx="10" fill="#b7b7c0" />
      <rect x="240" y="314" width="160" height="16" rx="8" fill="#d5a744" />
    `,
    "book-2": `
      <rect x="146" y="28" width="348" height="392" rx="18" fill="#21384f" />
      <circle cx="320" cy="142" r="56" fill="#dce7f0" />
      <ellipse cx="320" cy="278" rx="118" ry="54" fill="#3b607e" />
      <ellipse cx="320" cy="286" rx="84" ry="22" fill="#a5d2d7" />
      <rect x="212" y="344" width="220" height="18" rx="9" fill="#e4ca8f" />
    `,
  };

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 448" role="img" aria-label="${item.name}">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${style.accent}" />
          <stop offset="100%" stop-color="${style.accentDeep}" />
        </linearGradient>
      </defs>
      <rect width="640" height="448" fill="url(#bg)" />
      <rect x="20" y="20" width="600" height="408" rx="28" fill="rgba(255,250,241,0.14)" stroke="rgba(255,250,241,0.22)" />
      ${art[item.id]}
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

init();
