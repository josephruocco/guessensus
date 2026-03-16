const STORAGE_KEYS = {
  stats: "guessensus-stats",
  played: "guessensus-played",
  queue: "guessensus-queue",
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
    description: "Tiny dome-headed dinosaur with a name that feels fake.",
    prompt: "What would most people call this at first glance?",
    consensus: [
      { label: "tiny t-rex", share: 41 },
      { label: "spiky lizard", share: 24 },
      { label: "baby dinosaur", share: 21 },
      { label: "raptor thing", share: 14 },
    ],
  },
  {
    id: "dino-2",
    category: "Dinosaurs",
    name: "Kosmoceratops",
    description: "Horn-framed ceratopsian that looks excessively decorated.",
    prompt: "What crowd label wins here?",
    consensus: [
      { label: "weird triceratops", share: 46 },
      { label: "spiky face one", share: 23 },
      { label: "boss dinosaur", share: 17 },
      { label: "horned lizard", share: 14 },
    ],
  },
  {
    id: "pasta-1",
    category: "Pasta",
    name: "Radiatori",
    description: "Small ruffled pasta that looks like machine parts.",
    prompt: "What would the average person call this pasta?",
    consensus: [
      { label: "little noodles", share: 37 },
      { label: "mini lasagna bits", share: 25 },
      { label: "spiral pasta", share: 22 },
      { label: "tiny shells", share: 16 },
    ],
  },
  {
    id: "pasta-2",
    category: "Pasta",
    name: "Campanelle",
    description: "Bell-shaped curls with frilled edges.",
    prompt: "Which label gets the most instinctive votes?",
    consensus: [
      { label: "flower pasta", share: 34 },
      { label: "fancy shells", share: 28 },
      { label: "curly noodles", share: 21 },
      { label: "bowtie pasta", share: 17 },
    ],
  },
  {
    id: "stock-1",
    category: "Stock Photos",
    name: "Handshake Over Salad",
    description: "Two office workers smiling while sealing some unclear deal next to a bowl of greens.",
    prompt: "What would most people think this image is trying to say?",
    consensus: [
      { label: "teamwork", share: 42 },
      { label: "healthy business lunch", share: 19 },
      { label: "startup meeting", share: 23 },
      { label: "office people pretending", share: 16 },
    ],
  },
  {
    id: "stock-2",
    category: "Stock Photos",
    name: "Laptop on Beach Blanket",
    description: "A staged remote-work fantasy with perfect sand and zero glare.",
    prompt: "What does the crowd call the vibe of this photo?",
    consensus: [
      { label: "work from anywhere", share: 44 },
      { label: "fake productivity", share: 21 },
      { label: "digital nomad ad", share: 20 },
      { label: "vacation email", share: 15 },
    ],
  },
  {
    id: "wiki-1",
    category: "Wikipedia Articles",
    name: "List of unusual deaths",
    description: "A real article title that sounds like a bit.",
    prompt: "What would most people assume this article is?",
    consensus: [
      { label: "morbid trivia page", share: 39 },
      { label: "dark internet rabbit hole", share: 26 },
      { label: "fake wikipedia page", share: 18 },
      { label: "history facts list", share: 17 },
    ],
  },
  {
    id: "wiki-2",
    category: "Wikipedia Articles",
    name: "Dancing mania",
    description: "A title with almost no context and too much confidence.",
    prompt: "What would most people guess this article covers?",
    consensus: [
      { label: "historical panic event", share: 33 },
      { label: "disco history", share: 25 },
      { label: "medical condition", share: 24 },
      { label: "internet joke page", share: 18 },
    ],
  },
  {
    id: "book-1",
    category: "Old Book Covers",
    name: "The Metal Monster",
    description: "Pulp-era cover with impossible machinery and maximum threat.",
    prompt: "What would people think this book is called?",
    consensus: [
      { label: "robot invasion", share: 35 },
      { label: "giant monster book", share: 28 },
      { label: "old sci-fi novel", share: 23 },
      { label: "space war story", share: 14 },
    ],
  },
  {
    id: "book-2",
    category: "Old Book Covers",
    name: "The Moon Pool",
    description: "Dreamy adventure cover with glowing water and ominous scale.",
    prompt: "What fake title would win the room?",
    consensus: [
      { label: "the secret lagoon", share: 30 },
      { label: "the lost island", share: 27 },
      { label: "the haunted pool", share: 23 },
      { label: "the moon temple", share: 20 },
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
  const list = document.getElementById("category-list");
  list.innerHTML = "";
  [...new Set(ITEMS.map((item) => item.category))].forEach((category) => {
    const li = document.createElement("li");
    li.textContent = category;
    list.appendChild(li);
  });
}

function renderDailyRound() {
  const item = state.dailyItem;
  const style = CATEGORY_STYLES[item.category];
  const visual = document.getElementById("artifact-visual");
  const form = document.getElementById("guess-form");
  const datePill = document.getElementById("today-date");

  document.getElementById("daily-title").textContent = "Guess the popular wrong answer";
  document.getElementById("artifact-category").textContent = item.category;
  document.getElementById("artifact-name").textContent = item.name;
  document.getElementById("artifact-description").textContent = item.description;
  document.getElementById("daily-prompt").textContent = item.prompt;
  datePill.textContent = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  visual.textContent = style.emoji;
  visual.style.background = `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.72), transparent 20%), linear-gradient(135deg, ${style.accent}, ${style.accentDeep})`;

  form.innerHTML = "";
  item.consensus.forEach((option, index) => {
    const id = `guess-${index}`;
    const wrapper = document.createElement("div");
    wrapper.className = "option-card";
    wrapper.innerHTML = `
      <input type="radio" name="daily-guess" id="${id}" value="${option.label}">
      <label for="${id}">
        <span class="option-title">${option.label}</span>
        <span class="option-meta">Likely crowd answer</span>
      </label>
    `;
    form.appendChild(wrapper);
  });

  form.addEventListener("change", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      state.selectedGuess = target.value;
    }
  });
}

function renderStats() {
  document.getElementById("score-total").textContent = state.stats.score;
  document.getElementById("correct-total").textContent = state.stats.correct;
  document.getElementById("streak-total").textContent = state.stats.streak;
}

function submitGuess() {
  const todayKey = getTodayKey();
  if (!state.selectedGuess) {
    showResult("Pick one option first.");
    return;
  }

  if (state.played[todayKey]) {
    showResult("Today is already locked. Come back tomorrow for a fresh round.");
    return;
  }

  const [winner, second] = state.dailyItem.consensus;
  let points = 0;
  let message = "";

  if (state.selectedGuess === winner.label) {
    points = 100;
    state.stats.correct += 1;
    state.stats.streak += 1;
    message = `Bullseye. The top crowd answer was <strong>${winner.label}</strong> with ${winner.share}% of votes.`;
  } else if (state.selectedGuess === second.label) {
    points = 40;
    state.stats.streak = 0;
    message = `Close. The room went with <strong>${winner.label}</strong> at ${winner.share}%. Your pick landed second at ${second.share}%.`;
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
  showResult(`${message} You earned <b>${points}</b> points.`);
}

function showResult(message) {
  const box = document.getElementById("result-box");
  box.innerHTML = message;
  box.classList.remove("hidden");
}

function renderSeedBundle() {
  const container = document.getElementById("seed-grid");
  container.innerHTML = "";

  state.seedBundle.forEach((item) => {
    const labels = SEED_LABELS[item.category];
    const card = document.createElement("article");
    card.className = "seed-card";
    card.innerHTML = `
      <div class="seed-card-header">
        <div>
          <span class="section-kicker">${item.category}</span>
          <h3>${item.name}</h3>
        </div>
        <span>${CATEGORY_STYLES[item.category].emoji}</span>
      </div>
      <p>${item.description}</p>
      <div class="chip-grid" data-item-id="${item.id}"></div>
    `;

    const chipGrid = card.querySelector(".chip-grid");
    labels.forEach((label) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chip";
      button.textContent = label;
      button.addEventListener("click", () => {
        state.seedSelections[item.id] = label;
        renderSeedBundle();
      });
      if (state.seedSelections[item.id] === label) {
        button.classList.add("is-selected");
      }
      chipGrid.appendChild(button);
    });

    container.appendChild(card);
  });
}

function updateQueuePill() {
  document.getElementById("queue-pill").textContent = `${state.queue.length} queued bundles`;
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
    document.querySelectorAll('input[name="daily-guess"]').forEach((input) => {
      input.checked = false;
    });
    showResult("Selection cleared.");
  });
  document.getElementById("save-bundle").addEventListener("click", saveBundle);
  document.getElementById("reroll-bundle").addEventListener("click", rerollBundle);
}

function init() {
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
    showResult("Today’s round is already scored on this browser. The daily item stays visible for reference.");
  }
}

init();
