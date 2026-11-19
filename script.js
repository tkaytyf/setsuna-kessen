/* ==========================================================================
   Setsuna Kessen (刹那決戦) — v2 site script
   --------------------------------------------------------------------------
   >>> EDIT HERE: the game name and the two outbound links live in CONFIG.
   Everything marked data-game-name / data-game-split / data-roblox /
   data-discord in index.html updates from these values automatically.
   ========================================================================== */
const CONFIG = {
  GAME_NAME: "Setsuna Kessen", // 刹那決戦 — "the decisive battle decided in an instant"
  GAME_NAME_JP: "刹那決戦",
  ROBLOX_URL: "#",   // TODO: real Roblox game URL, e.g. https://www.roblox.com/games/XXXXXXXX
  DISCORD_URL: "#",  // TODO: real Discord invite, e.g. https://discord.gg/XXXXXX
};

/* Asset root: "" on the homepage, "../" on element pages (set via <html data-base>). */
const BASE = document.documentElement.getAttribute("data-base") || "";
const asset = (path) => BASE + path;


/* ---------------- FIGHTER ROSTER (real concept-art cards) ----------------
   Generated from /workspace/fighters/<element>/<num>-<name>.jpg.
   Each entry: [number, element, file slug]. Display names come from the slug
   ("41-raddik-kolg" -> "Raddik Kolg"); images live in assets/fighters/<element>/
   as <num>-<slug>.webp (480x640 grid tile) and <num>-<slug>-lg.webp (864x1152). */
const ELEMENTS = ["wind", "ice", "flame", "lightning", "earth", "water", "shadow", "light", "metal", "nature"];
const ROSTER_RAW = [
  [1, "wind", "kaelith-rue"],
  [2, "wind", "tamsin-orel"],
  [3, "wind", "voren-shai"],
  [4, "wind", "lysa-koro"],
  [5, "wind", "iden-vael"],
  [6, "wind", "ruyo-tanek"],
  [7, "wind", "elane-sough"],
  [8, "wind", "harth-quen"],
  [9, "wind", "pexa-lirn"],
  [10, "wind", "sael-orin"],
  [11, "ice", "caelis-venn"],
  [12, "ice", "korun-hale"],
  [13, "ice", "maelis-thorne"],
  [14, "ice", "nedi-rime"],
  [15, "ice", "oren-vask"],
  [16, "ice", "brin-solace"],
  [17, "ice", "fiala-nesh"],
  [18, "ice", "durn-keval"],
  [19, "ice", "sive-alren"],
  [20, "ice", "quin-arae"],
  [21, "flame", "rheden-vaur"],
  [22, "flame", "sirae-holt"],
  [23, "flame", "bokan-dreve"],
  [24, "flame", "nyrra-phel"],
  [25, "flame", "alden-mar"],
  [26, "flame", "jastel-vohl"],
  [27, "flame", "calyx-wren"],
  [28, "flame", "groth-senn"],
  [29, "flame", "veyla-rusk"],
  [30, "flame", "ioen-safra"],
  [31, "lightning", "zaeren-tyne"],
  [32, "lightning", "lumer-tashe"],
  [33, "lightning", "brannox-hile"],
  [34, "lightning", "kiri-vaunt"],
  [35, "lightning", "aven-rilo"],
  [36, "lightning", "toren-glede"],
  [37, "lightning", "syla-perrin"],
  [38, "lightning", "orvan-kess"],
  [39, "lightning", "nixa-fel"],
  [40, "lightning", "elaris-moen"],
  [41, "earth", "raddik-kolg"],
  [42, "earth", "ryn-kaer"],
  [43, "earth", "selka-morb"],
  [44, "earth", "remm-arroyo"],
  [45, "earth", "hala-marn"],
  [46, "earth", "torva-ghlen"],
  [47, "earth", "isken-reln"],
  [48, "earth", "belha-coru"],
  [49, "earth", "codi-vetch"],
  [50, "earth", "esren-talc"],
  [51, "water", "mirelle-voss"],
  [52, "water", "kade-burel"],
  [53, "water", "thalen-mire"],
  [54, "water", "senni-drowl"],
  [55, "water", "wessa-dorn"],
  [56, "water", "rokai-bell"],
  [57, "water", "leta-shun"],
  [58, "water", "cadric-lowe"],
  [59, "water", "pelin-nivir"],
  [60, "water", "serin-aule"],
  [61, "shadow", "velin-korr"],
  [62, "shadow", "naev-ruhl"],
  [63, "shadow", "morven-gath"],
  [64, "shadow", "kessia-vyn"],
  [65, "shadow", "dael-suth"],
  [66, "shadow", "rael-dask"],
  [67, "shadow", "ysol-fane"],
  [68, "shadow", "bruk-selt"],
  [69, "shadow", "pixa-noll"],
  [70, "shadow", "hestira-qan"],
  [71, "light", "lior-stell"],
  [72, "light", "solaen-mirth"],
  [73, "light", "helior-bann"],
  [74, "light", "cira-pell"],
  [75, "light", "elya-prae"],
  [76, "light", "rafi-tollen"],
  [77, "light", "vianne-solc"],
  [78, "light", "gorren-pike"],
  [79, "light", "tesen-wynn"],
  [80, "light", "irin-daun"],
  [81, "metal", "kaedron-ilv"],
  [82, "metal", "sera-lind"],
  [83, "metal", "bolgir-hess"],
  [84, "metal", "tiv-arlo"],
  [85, "metal", "mael-ives"],
  [86, "metal", "droven-kalei"],
  [87, "metal", "yare-vint"],
  [88, "metal", "harvek-dunn"],
  [89, "metal", "fen-qoru"],
  [90, "metal", "ancel-rhom"],
  [91, "nature", "mavira-mossel"],
  [92, "nature", "silea-varn"],
  [93, "nature", "kald-eschen"],
  [94, "nature", "tavi-nelum"],
  [95, "nature", "yiris-felg"],
  [96, "nature", "roxen-veld"],
  [97, "nature", "ysra-belen"],
  [98, "nature", "wolden-krag"],
  [99, "nature", "cassa-rhind"],
  [100, "nature", "ophira-wend"]
];
const ROSTER = ROSTER_RAW.map(([n, el, slug]) => {
  const name = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const file = `${String(n).padStart(2, "0")}-${slug}`;
  return { n, el, slug, name, src: asset(`assets/fighters/${el}/${file}.webp`), lg: asset(`assets/fighters/${el}/${file}-lg.webp`) };
});


/* ---------------- FIGHTER KITS (ability panel in the fighter popup) ----------------
   Locked format: exactly 4 moves + 1 Awakening. No passive.
   FIGHTER_KITS_SOURCE keeps the exact shape of /workspace/site-copy/fighter-kits.json
   (wave 1, pasted verbatim). To add a wave: append its objects to this array.
   Kits are matched to roster cards by NAME (case-insensitive). Unmatched entries are
   ignored by the grid but can be previewed with index.html#fighter=<name-slug>.
   Notes: "Varek Ashe" (wave 1) has no roster card yet (possible #101, undecided).
   "Tovin Rusk" comes from GDD v0.1 and also has no card. Optional `icon` on a move
   overrides the stand-in ability icon (default: the fighter's element icon). */
const FIGHTER_KITS_SOURCE = [
  {
    "name": "Tamsin Orel",
    "number": 2,
    "element": "Wind",
    "role": "Ranged (zoner)",
    "moves": [
      {
        "key": "1",
        "name": "Silent Needles",
        "desc": "A midrange line of quiet air needles that leave faint pressure marks on hit.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Lane Pin",
        "desc": "Plants a silent pressure stake in a lane. Anyone who crosses it is briefly snared.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Pressure Break",
        "desc": "Releases every mark and stake at once in a compact burst.",
        "cooldown": 12
      },
      {
        "key": "4",
        "name": "Draft Cut",
        "desc": "A short sidestep along packed air that can cancel into Silent Needles.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Held Breath",
      "desc": "For the window, needles fire faster and Pressure Break detonates in a wider cone.",
      "key": "G"
    }
  },
  {
    "name": "Sael Orin",
    "number": 10,
    "element": "Wind",
    "role": "Support",
    "moves": [
      {
        "key": "1",
        "name": "Still Banner",
        "desc": "Plants a quiet zone where allies (or Sael, in a duel) slowly recover health and stamina.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Soft Landing",
        "desc": "A short gust that steadies a teammate's footing, or his own, and cancels one knockback.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Low Ceiling",
        "desc": "Air in the zone grows heavy. Opponents inside lose jump height and air-dash distance.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Banner Shift",
        "desc": "Relocates to the banner and leaves a brief heal circle at the old spot.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Held Ground",
      "desc": "The zone widens, recovery speeds up, and foes inside cannot jump for the window.",
      "key": "G"
    }
  },
  {
    "name": "Nedi Rime",
    "number": 14,
    "element": "Ice",
    "role": "Trickster",
    "moves": [
      {
        "key": "1",
        "name": "Throw Mirror",
        "desc": "Tosses a thin ice mirror that holds her silhouette.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Shatter Swap",
        "desc": "Shatters a mirror and trades places with it, leaving a brief frost burst at the old spot.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Opposite Cut",
        "desc": "A short slash from the farthest mirror's facing. If no mirror is out, a close slash that leaves one.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Bait Shatter",
        "desc": "The next hit on a mirror auto-swaps her and stuns the attacker for a beat. Visible tell on the glass.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Broken Reflection",
      "desc": "Two mirrors stay active, swaps cost no cooldown, and shatters leave lingering frost that slows dashes.",
      "key": "G"
    }
  },
  {
    "name": "Sirae Holt",
    "number": 22,
    "element": "Flame",
    "role": "Ranged (zoner)",
    "moves": [
      {
        "key": "1",
        "name": "Ember Bolt",
        "desc": "Looses a midrange ember that sticks to the first fighter it hits.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Coil Shot",
        "desc": "A heavier charged bolt that sticks two embers and knocks a short step back.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Ember Bloom",
        "desc": "Detonates every ember on the target in a tight, matte burst.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Ember Drop",
        "desc": "A short hop back that leaves a lingering ember on the ground as a mine.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Full Coil",
      "desc": "Bolts fire faster, stuck embers tick, and Ember Bloom becomes a wider detonating ring.",
      "key": "G"
    }
  },
  {
    "name": "Jastel Vohl",
    "number": 26,
    "element": "Flame",
    "role": "Rushdown",
    "moves": [
      {
        "key": "1",
        "name": "Hook Chain",
        "desc": "A close-to-mid whip that snags and pulls the opponent in if it connects.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Last Link",
        "desc": "Explodes the last chain link in a tight burst. Stronger if they were just pulled.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Sweep Weight",
        "desc": "A low burning swing that knocks down grounded foes and clips dashes.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Chain Rush",
        "desc": "A short armored step-in that can cancel into Hook Chain.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Burning Circuit",
      "desc": "The chain stays out, pulls land faster, and Last Link detonates in a wider ring at the end of the window.",
      "key": "G"
    }
  },
  {
    "name": "Pixa Noll",
    "number": 69,
    "element": "Shadow",
    "role": "Trickster",
    "moves": [
      {
        "key": "1",
        "name": "Pocket Dark",
        "desc": "Snuffs a small circle of light, briefly blinding anyone inside. Matte gloom, no glow.",
        "cooldown": 9
      },
      {
        "key": "2",
        "name": "Crouch Step",
        "desc": "Vanishes in the dark and reappears crouched behind the nearest foe in range.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Low Cut",
        "desc": "A crouched slash with a bit of armor. Bonus knockdown if used just after Crouch Step.",
        "cooldown": 6
      },
      {
        "key": "4",
        "name": "Snuff Field",
        "desc": "Drops a lingering dark patch that hides her dash tell and slows turns inside it.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Total Snuff",
      "desc": "The dark circle follows her, Crouch Step can be used twice, and Low Cut knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Tesen Wynn",
    "number": 79,
    "element": "Light",
    "role": "Trickster",
    "moves": [
      {
        "key": "1",
        "name": "Flare Coin",
        "desc": "Flicks a bright decoy that flinches anyone looking at it for a beat. Matte flare, no neon.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Look-Away",
        "desc": "A short dash-slash that deals more if the foe just flinched at a coin.",
        "cooldown": 6
      },
      {
        "key": "3",
        "name": "False Tell",
        "desc": "Throws two coins in diverging arcs. Recast blinks him to the real one.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Glint Guard",
        "desc": "A brief bright counter window. If a hit lands in it, the attacker flinches as if they looked at a coin.",
        "cooldown": 12
      }
    ],
    "awakening": {
      "name": "All Eyes",
      "desc": "Coins linger, every M1 can flick a decoy, and Look-Away becomes a longer punish dash.",
      "key": "G"
    }
  },
  {
    "name": "Kald Eschen",
    "number": 93,
    "element": "Nature",
    "role": "Tank",
    "moves": [
      {
        "key": "1",
        "name": "Living Pavise",
        "desc": "Raises a woven-branch shield that blocks the front and slowly grows wider.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Close the Lane",
        "desc": "Shoves the pavise forward, pushing foes and shrinking the walkable gap.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Regrowth",
        "desc": "The shield instantly repairs and pulses a short knockback if it was chipped.",
        "cooldown": 14
      },
      {
        "key": "4",
        "name": "Root Plant",
        "desc": "Plants the pavise as cover and shoulders anyone who crosses it. He can recall it.",
        "cooldown": 10
      }
    ],
    "awakening": {
      "name": "Full Canopy",
      "desc": "The shield becomes a short wall across the lane, slowly advances, and cannot be broken for the window.",
      "key": "G"
    }
  },
  {
    "name": "Varek Ashe",
    "number": null,
    "element": "Flame",
    "role": "Ranged (zoner)",
    "moves": [
      {
        "key": "1",
        "name": "Cinder Pitch",
        "desc": "A midrange matte-crimson fireball with a modest arc.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Ash Wall",
        "desc": "Raises a short firewall that blocks a lane and chips anyone who dashes through it.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Searing Fan",
        "desc": "A short close-range cone of matte crimson fire.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Ember Rise",
        "desc": "A brief upward lift that lets him fire one shot from the air, then drops him. Costs stamina.",
        "cooldown": 10
      }
    ],
    "awakening": {
      "name": "Ashwake",
      "desc": "For the window, every Cinder Pitch leaves a brief Ash Wall segment, and he finishes with a wide matte burst after a short hover.",
      "key": "G"
    }
  },
  {
    "name": "Tovin Rusk",
    "number": null,
    "element": null,
    "role": "All-rounder / midrange",
    "source": "GDD v0.1 (Starter roster). Not one of the 100 cards; preview at index.html#fighter=tovin-rusk",
    "moves": [
      {
        "key": "1",
        "name": "Plate Throw",
        "desc": "A midrange ceramic disc with a modest arc.",
        "icon": "earth"
      },
      {
        "key": "2",
        "name": "Shell Up",
        "desc": "A frontal shield that can be shattered into a cone.",
        "icon": "metal"
      },
      {
        "key": "3",
        "name": "Rib Spike",
        "desc": "Close uppercut that breaks armor.",
        "icon": "earth"
      },
      {
        "key": "4",
        "name": "Scatter Step",
        "desc": "A dash that leaves a damaging shard trail.",
        "icon": "wind"
      }
    ],
    "awakening": {
      "name": "Kiln Break",
      "desc": "Detonates remaining plates for a wide burst and a short full-armor window.",
      "key": "G",
      "icon": "flame"
    }
  }
];
const kitSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const FIGHTER_KITS = Object.fromEntries(FIGHTER_KITS_SOURCE.map((k) => [kitSlug(k.name), k]));
const kitAbilities = (k, el) => [
  ...k.moves.map((m, i) => ({ key: m.key, slot: `Move ${["I", "II", "III", "IV"][i]}`, name: m.name, desc: m.desc, cd: m.cooldown, icon: m.icon || el })),
  { key: k.awakening.key || "G", slot: "Awakening", name: k.awakening.name, desc: k.awakening.desc, icon: k.awakening.icon || el },
];
const KIT_SLOTS = [["1", "Move I"], ["2", "Move II"], ["3", "Move III"], ["4", "Move IV"], ["G", "Awakening"]];
const placeholderKit = (el) => KIT_SLOTS.map(([key, slot]) => ({ key, slot, name: "Placeholder: kit coming soon", desc: "Ability details will be added when this fighter's kit is designed.", icon: el, ph: true }));

/* ---------------- PLACEHOLDER CONTENT ----------------
   Everything below is invented placeholder content. Replace with real data. */
const FIGHTERS = [
  { name: "Kaien", role: "Blade Duelist", hue: 22, deco: "blade",
    desc: "A wandering swordsman whose cuts arrive before the sound.",
    stats: { ATK: 86, SPD: 78, DEF: 48 },
    abilities: [
      ["Q", "Crescent Draw", "Instant iaido slash that staggers on hit."],
      ["E", "Afterimage Step", "Dash through enemies, leaving a decoy behind."],
      ["R", "Thousand Petal Edge", "Ultimate: a storm of cuts across the arena."] ] },
  { name: "Ryn Vale", role: "Storm Brawler", hue: 205, deco: "bolt",
    desc: "Channels lightning through her fists. Fast, loud, relentless.",
    stats: { ATK: 74, SPD: 92, DEF: 40 },
    abilities: [
      ["Q", "Static Jab", "Rapid three-hit combo that builds charge."],
      ["E", "Thunder Hop", "Teleport-dash to a marked target."],
      ["R", "Skybreaker", "Ultimate: calls down a lightning pillar."] ] },
  { name: "Gorran", role: "Iron Vanguard", hue: 30, deco: "shield",
    desc: "An unbreakable wall who turns every block into a counter.",
    stats: { ATK: 62, SPD: 38, DEF: 96 },
    abilities: [
      ["Q", "Bulwark", "Raise a guard that reflects projectiles."],
      ["E", "Quake Slam", "Ground pound that knocks enemies airborne."],
      ["R", "Mountain Stance", "Ultimate: become immovable and armored."] ] },
  { name: "Seren", role: "Shadow Assassin", hue: 275, deco: "moon",
    desc: "Strikes from the dark and vanishes before you can react.",
    stats: { ATK: 90, SPD: 88, DEF: 30 },
    abilities: [
      ["Q", "Umbral Kunai", "Throw a blade that marks its target."],
      ["E", "Veil", "Turn invisible for three seconds."],
      ["R", "Eclipse Execution", "Ultimate: teleport-strike every marked foe."] ] },
  { name: "Hoshi", role: "Spirit Caster", hue: 160, deco: "orbs",
    desc: "Commands orbiting spirit orbs to heal allies or burn rivals.",
    stats: { ATK: 70, SPD: 60, DEF: 58 },
    abilities: [
      ["Q", "Spirit Orb", "Launch a homing orb of spirit energy."],
      ["E", "Lantern Ward", "Place a ward that heals nearby allies."],
      ["R", "Hundred Lanterns", "Ultimate: orbs rain down over a wide area."] ] },
  { name: "Blaze Oni", role: "Inferno Berserker", hue: 12, deco: "flame",
    desc: "The longer the fight goes, the hotter — and deadlier — he gets.",
    stats: { ATK: 94, SPD: 64, DEF: 52 },
    abilities: [
      ["Q", "Ember Fist", "Burning punch that leaves a damage-over-time."],
      ["E", "Rage Meter", "Convert damage taken into attack power."],
      ["R", "Oni Awakening", "Ultimate: transform for boosted stats."] ] },
];

const MODES = [
  { name: "Ranked Duels", tab: "Ranked Duels", players: "1v1 · Online",
    title: "One versus one.",
    text: "Climb the ladder in pure skill matchups. Online 1v1 — just you, your kit, and the next instant.",
    src: "assets/modes/ranked-duels.webp" },
  { name: "Squad Clash", tab: "Squad Clash", players: "3v3 · Best of 3 · Online",
    title: "Three minds, one opening.",
    text: "Queue with a squad or get matched with two others. A best-of-three online clash — combine Awakenings and take the round together.",
    src: "assets/modes/squad-clash.webp" },
  { name: "Legion War", tab: "Legion War", players: "5v5 · Best of 3 · Online",
    title: "Ten fighters. One field.",
    text: "A larger arena, a full team, and a best-of-three war online. Hold the line, crash the backline, and win the clutch moment as a unit.",
    src: "assets/modes/legion-war.webp" },
  { name: "Aurel Bay Free-for-All", tab: "Aurel Bay<br>Free-for-All", players: "Open-world FFA · Online",
    title: "The city never sleeps.",
    text: "Drop into the streets of Aurel Bay and fight anyone you find. An open-city free-for-all — queue for 1v1, 3v3, or 5v5 from inside the hub when you're ready.",
    src: "assets/modes/aurel-bay.webp" },
];

const FEATURES = [
  ["Combo-driven combat", "Chain light, heavy and ability inputs into fluid, readable combos."],
  ["Awakening system", "Fill your meter mid-fight to unlock a stronger form."],
  ["Skill-based ranking", "Seasonal ladders with fair matchmaking and rewards."],
  ["Cosmetics & auras", "Earn skins, emotes and aura trails — no pay-to-win stats."],
  ["Cross-platform", "Play on PC, mobile, console and tablet with tuned controls."],
  ["Training grounds", "Frame data, dummy settings and combo practice built in."],
];

const UPDATES = [
  { ver: "v1.3", title: "Storm Season", date: "Placeholder date · Week 3", latest: true,
    added: ["New fighter: Ryn Vale (Storm Brawler)", "Battle Royale map: Shattered Peaks", "Seasonal ranked rewards"],
    changed: ["Combo drop window extended by 2 frames", "Faster matchmaking in Squad Clash"],
    fixed: ["Ultimate camera clipping through walls", "Mobile dash button sometimes unresponsive"] },
  { ver: "v1.2", title: "Raid Trials", date: "Placeholder date · Week 2",
    added: ["Raid Trials co-op mode", "Boss: The Hollow Shogun", "Raid-exclusive titles"],
    changed: ["Gorran Bulwark duration 3s → 2.5s", "Seren Veil cooldown increased"],
    fixed: ["Reward chest duplication bug", "Rare crash when leaving a party"] },
  { ver: "v1.0", title: "Launch", date: "Placeholder date · Week 1",
    added: ["Five launch fighters", "Ranked Duels & Squad Clash", "Training grounds"],
    changed: ["Final balance pass from beta feedback"],
    fixed: ["Beta stability fixes"] },
];

const CODES = [
  { code: "SETSUNA", reward: "200 gems", status: "launch" },
  { code: "FIRSTBLOOD", reward: "300 gems + 'First Blood' title", status: "launch" },
  { code: "AURELBAY", reward: "100 gems + Aurel Bay scarf", status: "launch" },
];

/* Featured news — current project updates */
const NEWS = [
  { cat: "Dev update", date: "Nov 2026", title: "The official site is live",
    desc: "Setsuna Kessen has a home on the web. Browse the roster, read the modes, and grab the launch codes — more updates land here first.",
    img: "assets/news/site-live.webp", pos: "center 38%" },
  { cat: "Dev update", date: "Nov 2026", title: "Roster reveal: 100 fighters",
    desc: "One hundred fighters across ten elements. Wave 1 kits are up now; the rest stay labeled until their kits land.",
    img: "assets/news/roster-maelis.webp", pos: "center", link: "#fighters" },
  { cat: "Dev update", date: "Nov 2026", title: "Four modes, locked in",
    desc: "Ranked Duels, Squad Clash, Legion War, and the Aurel Bay free-for-all. Online 1v1, 3v3, and 5v5, plus an open-city fight.",
    img: "assets/modes/ranked-duels.webp", pos: "center 46%", link: "#modes" },
  { cat: "Dev update", date: "Nov 2026", title: "Launch codes are ready",
    desc: "SETSUNA, FIRSTBLOOD, and AURELBAY grant gems and cosmetics, redeemable at launch. Redeem all three to unlock your first skin.",
    img: "assets/rewards-hero.webp", pos: "center 45%", link: "#codes" },
];

/* ---------------- v7 layered hero intro ----------------
   Runs before first paint: hide the hero pieces, preload the layers, then play
   plate -> fighters slide in -> title. Skipped entirely for reduced motion. */
(function heroIntro() {
  if (!document.querySelector(".masthead")) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;
  const root = document.documentElement;
  root.classList.add("hero-pending");
  const srcs = ["assets/hero-plate.jpg", "assets/hero-fighter-left.webp", "assets/hero-fighter-right.webp"];
  let done = false;
  const go = () => { if (done) return; done = true; root.classList.remove("hero-pending"); void root.offsetWidth; root.classList.add("hero-go"); };
  Promise.all(srcs.map((src) => new Promise((res) => { const i = new Image(); i.onload = i.onerror = res; i.src = src; })))
    .then(() => requestAnimationFrame(() => requestAnimationFrame(go)));
  setTimeout(go, 2500); // never leave the hero hidden
})();

/* ---------------- Helpers ---------------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

function applyConfig() {
  $$("[data-game-name]").forEach((el) => (el.textContent = CONFIG.GAME_NAME));
  $$("[data-game-split]").forEach((el) => (el.innerHTML = CONFIG.GAME_NAME.split(" ").join("<br>")));
  if (!document.body.dataset.element) document.title = `${CONFIG.GAME_NAME} — Anime Fighting on Roblox`;
  $$("[data-roblox]").forEach((a) => (a.href = CONFIG.ROBLOX_URL));
  $$("[data-discord]").forEach((a) => (a.href = CONFIG.DISCORD_URL));
  const year = $("#year"); if (year) year.textContent = new Date().getFullYear();
}

/* Original abstract fighter art (placeholder) */
function fighterArt(f, i, opts = {}) {
  const c = `hsl(${f.hue} 90% 60%)`, c2 = `hsl(${f.hue} 70% 22%)`, id = `fg${opts.uid || ""}${i}`;
  const decos = {
    blade: `<line x1="40" y1="560" x2="370" y2="40" stroke="${c}" stroke-width="4" stroke-linecap="round"/><line x1="40" y1="560" x2="370" y2="40" stroke="${c}" stroke-width="18" opacity=".18"/>`,
    bolt: `<path d="M270 20 210 200h46l-70 200 130-250h-50l46-130z" fill="${c}" opacity=".9"/>`,
    shield: `<circle cx="200" cy="300" r="185" fill="none" stroke="${c}" stroke-width="3" opacity=".6"/><circle cx="200" cy="300" r="150" fill="none" stroke="${c}" stroke-width="1.5" stroke-dasharray="8 12" opacity=".7"/>`,
    moon: `<circle cx="300" cy="120" r="80" fill="${c}" opacity=".85" mask="url(#${id}m)"/>`,
    orbs: [0, 1, 2, 3, 4].map((k) => { const a = (k / 5) * Math.PI * 2; return `<circle cx="${200 + Math.cos(a) * 165}" cy="${260 + Math.sin(a) * 130}" r="${12 + (k % 2) * 7}" fill="${c}"/>`; }).join(""),
    flame: `<path d="M200 0c45 65 100 100 66 190 44-22 56-66 44-100 56 66 56 180-22 236H112C46 270 56 180 112 124c0 44 22 66 44 78-22-90 12-146 44-202z" fill="${c}" opacity=".45"/>`,
  };
  const bgRect = opts.transparent ? "" : `<rect width="400" height="600" fill="${opts.bg || "#0b0b0f"}"/><rect width="400" height="600" fill="url(#${id}a)"/>`;
  return `<svg viewBox="${opts.viewBox || "0 0 400 600"}" preserveAspectRatio="${opts.par || "xMidYMid meet"}" aria-hidden="true" class="${opts.cls || ""}">
    <defs>
      <radialGradient id="${id}a" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="${c}" stop-opacity=".6"/><stop offset=".6" stop-color="${c2}" stop-opacity=".35"/><stop offset="1" stop-color="#0b0b0f" stop-opacity="0"/></radialGradient>
      <radialGradient id="${id}t" cx="50%" cy="45%" r="50%"><stop offset="0" stop-color="${c}" stop-opacity=".45"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
      <mask id="${id}m"><rect width="400" height="600" fill="#fff"/><circle cx="330" cy="100" r="74" fill="#000"/></mask>
      <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22222a"/><stop offset="1" stop-color="#060608"/></linearGradient>
    </defs>
    ${bgRect}
    ${opts.transparent ? `<ellipse cx="200" cy="300" rx="170" ry="230" fill="url(#${id}t)"/>` : ""}
    ${decos[f.deco] || ""}
    <use href="#fighter-shape" fill="url(#${id}b)" style="filter:none"/>
  </svg>`;
}

/* Original abstract scene art for news cards / modes (placeholder) */
function sceneArt(hue, glyph, kind = "news", uid = "") {
  const c = `hsl(${hue} 85% 58%)`, d = `hsl(${hue} 60% 12%)`, id = `sc${kind}${uid}`;
  const peaks = Array.from({ length: 7 }, (_, k) => `${k * 70},${200 - ((k * 37 + hue) % 60) - 30}`).join(" ");
  const extra = {
    news: `<text x="300" y="150" font-family="Yuji Boku" font-weight="400" font-size="140" fill="none" stroke="${c}" stroke-opacity=".7" text-anchor="middle">${glyph}</text>`,
    duel: `<line x1="80" y1="200" x2="320" y2="20" stroke="${c}" stroke-width="5"/><line x1="320" y1="200" x2="80" y2="20" stroke="#fff" stroke-width="3" opacity=".8"/><circle cx="200" cy="110" r="22" fill="#fff" opacity=".9"/>`,
    squad: [0, 1, 2].map((k) => `<circle cx="${130 + k * 70}" cy="${110 + (k % 2) * 14}" r="26" fill="none" stroke="${c}" stroke-width="4"/>`).join("") + `<path d="M60 170h280" stroke="#fff" stroke-width="2" opacity=".5"/>`,
    royale: `<circle cx="200" cy="115" r="90" fill="none" stroke="${c}" stroke-width="3" stroke-dasharray="10 8"/><circle cx="200" cy="115" r="50" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/><circle cx="200" cy="115" r="10" fill="${c}"/>`,
    raid: `<path d="M120 190 200 30l80 160z" fill="none" stroke="${c}" stroke-width="4"/><circle cx="200" cy="120" r="14" fill="#fff"/><path d="M60 200h280" stroke="${c}" stroke-width="2"/>`,
  }[kind] || "";
  return `<svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><radialGradient id="${id}g" cx="65%" cy="40%" r="70%"><stop offset="0" stop-color="${c}" stop-opacity=".75"/><stop offset="1" stop-color="${d}" stop-opacity="1"/></radialGradient></defs>
    <rect width="400" height="225" fill="${d}"/><rect width="400" height="225" fill="url(#${id}g)"/>
    <g opacity=".22">${Array.from({ length: 14 }, (_, k) => `<line x1="${k * 34 - 60}" y1="225" x2="${k * 34 + 60}" y2="0" stroke="#fff" stroke-width=".6"/>`).join("")}</g>
    ${extra}
    <polygon points="0,225 ${peaks} 420,180 400,225" fill="#07070a" opacity=".85"/>
  </svg>`;
}

/* ---------------- Featured news ---------------- */
function renderNews() {
  $("#newsRail").innerHTML = NEWS.map((n, i) => `
    <button type="button" class="news-card reveal" style="--d:${(i % 3) * 0.08}s"${n.link ? ` data-link="${n.link}"` : ""}>
      <div class="news-img"><img src="${n.img}" alt="" width="640" height="360" loading="lazy" decoding="async" style="object-position:${n.pos || "center"}">${n.link ? `<span class="news-corner">→</span>` : ""}</div>
      <div class="news-meta"><span class="cat">${n.cat}</span><span class="sep"></span><span class="date">${n.date}</span></div>
      <h3 class="news-title">${n.title}</h3>
      <p class="news-desc">${n.desc}</p>
    </button>`).join("");
  $$("#newsRail [data-link]").forEach((b) => b.addEventListener("click", () => document.querySelector(b.dataset.link).scrollIntoView({ behavior: "smooth" })));
  rail($("#newsRail"), $("#newsPrev"), $("#newsNext"), $("#newsProgress"));
}

function rail(el, prev, next, bar) {
  const step = () => (el.firstElementChild?.offsetWidth || 300) + parseFloat(getComputedStyle(el).columnGap || 20);
  prev.addEventListener("click", () => el.scrollBy({ left: -step() }));
  next.addEventListener("click", () => el.scrollBy({ left: step() }));
  const upd = () => {
    const max = el.scrollWidth - el.clientWidth, vis = el.clientWidth / el.scrollWidth;
    bar.style.width = `${vis * 100}%`;
    bar.style.left = `${max > 0 ? (el.scrollLeft / max) * (1 - vis) * 100 : 0}%`;
    prev.disabled = el.scrollLeft <= 2; next.disabled = el.scrollLeft >= max - 2;
  };
  el.addEventListener("scroll", upd, { passive: true }); addEventListener("resize", upd); upd();
}

/* ---------------- Fighter roster grid (v8) ---------------- */
const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1);
/* element icon (assets/icons/<element>.webp, from /workspace/brand/icons) */
const elIcon = (el, size) => `<img class="el-ico" src="${asset(`assets/icons/${el}.webp`)}" alt="" width="${size}" height="${size}" loading="lazy" decoding="async">`;
const ROSTER_PREVIEW = 18; // 3 rows on desktop; "Show all" reveals the rest
const rosterState = { el: "all", q: "", shown: ROSTER, expanded: false };
function renderRoster() {
  const grid = $("#rosterGrid"), chips = $("#rosterChips"), input = $("#rosterSearch");
  if (!grid || !chips) return;
  const counts = ELEMENTS.reduce((o, e) => ((o[e] = ROSTER.filter((f) => f.el === e).length), o), {});
  chips.innerHTML = [["all", "All", ROSTER.length], ...ELEMENTS.map((e) => [e, cap(e), counts[e]])].map(([k, label, c]) =>
    `<button type="button" class="rs-chip${k === "all" ? " active" : ""}" data-el="${k}" aria-pressed="${k === "all"}">${k === "all" ? "" : elIcon(k, 20)}${label}<small>${c}</small></button>`).join("");
  grid.innerHTML = ROSTER.map((f, i) => fighterCardHTML(f, i)).join("");
  const cards = $$(".rs-card", grid);
  const apply = () => {
    const q = rosterState.q.trim().toLowerCase();
    const shown = [];
    const collapse = rosterState.el === "all" && !q && !rosterState.expanded;
    cards.forEach((c) => {
      const ok = (rosterState.el === "all" || c.dataset.el === rosterState.el) && (!q || c.dataset.name.includes(q));
      if (ok) shown.push(ROSTER[+c.dataset.i]);
      c.hidden = !ok || (collapse && shown.length > ROSTER_PREVIEW);
    });
    rosterState.shown = shown;
    const elTxt = rosterState.el === "all" ? "" : ` ${cap(rosterState.el)}`;
    const visible = collapse ? Math.min(ROSTER_PREVIEW, shown.length) : shown.length;
    $("#rosterCount").textContent = collapse ? `Showing ${visible} of ${shown.length} fighters` : `Showing ${shown.length}${elTxt} fighter${shown.length === 1 ? "" : "s"}${q ? ` matching “${rosterState.q.trim()}”` : ""}`;
    const more = $("#rosterMore");
    more.hidden = !(rosterState.el === "all" && !q);
    more.textContent = rosterState.expanded ? "Show fewer fighters" : `Show all ${ROSTER.length} fighters`;
    more.setAttribute("aria-expanded", !!rosterState.expanded);
    $("#rosterEmpty").hidden = shown.length > 0;
    const elLink = $("#rosterElLink");
    if (elLink) {
      if (rosterState.el === "all") { elLink.hidden = true; elLink.innerHTML = ""; }
      else {
        const name = cap(rosterState.el);
        elLink.hidden = false;
        elLink.innerHTML = `<a href="${asset(`elements/${rosterState.el}.html`)}">Open the ${name} element page <span aria-hidden="true">→</span></a>`;
      }
    }
  };
  chips.addEventListener("click", (e) => {
    const b = e.target.closest(".rs-chip"); if (!b) return;
    rosterState.el = b.dataset.el;
    $$(".rs-chip", chips).forEach((x) => { const on = x === b; x.classList.toggle("active", on); x.setAttribute("aria-pressed", on); });
    apply();
  });
  input.addEventListener("input", () => { rosterState.q = input.value; apply(); });
  $("#rosterMore").addEventListener("click", () => {
    rosterState.expanded = !rosterState.expanded; apply();
    if (!rosterState.expanded) $("#rosterCount").scrollIntoView({ behavior: "smooth", block: "center" });
  });
  $("#rosterReset").addEventListener("click", () => { input.value = ""; rosterState.q = ""; $(".rs-chip[data-el='all']", chips).click(); });
  apply();
  bindFighterGrid(grid);
}

const ELEMENT_LORE = {
  wind: "Wind Resonances open a thin corridor of air and step through it. In a Kessen, that stolen space is enough to vanish from a slash — or arrive already striking.",
  ice: "Ice holds a breath of the world still. Wardens of this line freeze a step, a blade, a second, then spend that pause before it thaws.",
  flame: "Flame answers heat with a sharper heat. Students are taught to spend it in one clean burst, a kiln-bright instant, never a wildfire they cannot take back.",
  lightning: "Lightning does not wait for the count. It crosses the arena in the gap between eye and thought, and the fighter who wakes to it must learn to aim what cannot be recalled.",
  earth: "Earth Resonances borrow the city's weight. A planted foot becomes a wall; a raised street becomes a weapon; the ground itself agrees, briefly, to take a side.",
  water: "Water yields, then returns the force it was given. In Aurel Bay it is the art of redirection: a tide that looks soft until it breaks the stance that pushed it.",
  shadow: "Shadow is the Resonance of the unlit edge. It hides a step, a hand, a whole fighter in the seam between lamp and alley, then spends that dark on a single decisive cut.",
  light: "Light does not only reveal; it decides what may be seen. Bearers of this line flare a path, a mark, a blind instant — and move while the world is still blinking.",
  metal: "Metal Resonances harden what they touch. A coat becomes plate, a coin becomes a blade, and the fighter learns to choose, in one instant, what must not break.",
  nature: "Nature answers the living city. Roots, leaf, and sap remember the streets as a forest once, and in a Kessen they return just long enough to bind, to bloom, or to bleed green through stone.",
};

function fighterCardHTML(f, i) {
  return `<button type="button" class="rs-card" data-i="${i}" data-el="${f.el}" data-name="${f.name.toLowerCase()}" aria-label="${f.name}, ${cap(f.el)} element. Open card">
      <span class="rs-art"><img src="${f.src}" alt="" width="480" height="640" loading="lazy" decoding="async"><span class="rs-badge" title="${cap(f.el)}">${elIcon(f.el, 30)}</span></span>
      <span class="rs-meta"><span class="rs-name">${f.name}</span><span class="rs-el">${cap(f.el)}</span></span>
    </button>`;
}

function bindFighterGrid(grid) {
  if (!grid || !$("#fighterModal")) return;
  const openModal = modal("#fighterModal");
  let cur = 0;
  const setRole = (r) => { const t = $("#fmRole"); t.hidden = !r; t.textContent = r || ""; };
  const renderKit = (abil, hasKit) => {
    const row = $("#fmKit"), info = $("#fmAbility");
    row.innerHTML = abil.map((a, k) => `<button type="button" class="ab-btn${a.slot === "Awakening" ? " ab-awk" : ""}" role="tab" aria-selected="${k === 0}" data-k="${k}" aria-label="${a.slot}: ${a.name}">
        <img src="${asset(`assets/icons/${a.icon || "light"}.webp`)}" alt="" width="44" height="44"><span class="ab-key">${a.key}</span></button>`).join("");
    const pick = (k) => {
      const a = abil[k];
      $$(".ab-btn", row).forEach((b, j) => { b.classList.toggle("active", j === k); b.setAttribute("aria-selected", j === k); });
      info.innerHTML = `<p class="ab-meta"><span>${a.slot}</span><span class="ab-keycap">Key ${a.key}</span>${a.cd ? `<span class="ab-cd">${a.cd}s cooldown</span>` : a.slot === "Awakening" && !a.ph ? `<span class="ab-cd">At 100% meter</span>` : ""}</p>
        <h4 class="${a.ph ? "is-ph" : ""}">${a.name}</h4><p class="ab-desc">${a.desc}</p>`;
    };
    $$(".ab-btn", row).forEach((b) => { const k = +b.dataset.k; b.addEventListener("click", () => pick(k)); b.addEventListener("mouseenter", () => pick(k)); b.addEventListener("focus", () => pick(k)); });
    $("#fmKitNote").textContent = hasKit ? "" : "Placeholder abilities — this fighter's kit is not designed yet.";
    pick(0);
  };
  const show = (i) => {
    const f = ROSTER[i]; cur = i;
    $("#fighterModal").classList.remove("kit-only");
    const img = $("#fmImg"); img.src = f.lg; img.alt = `${f.name} concept art card`;
    $("#fmName").textContent = f.name;
    $("#fmEl").innerHTML = `${elIcon(f.el, 26)}${cap(f.el)} element`;
    $("#fmNum").textContent = `Fighter ${String(f.n).padStart(3, "0")} of ${ROSTER.length}`;
    const kit = FIGHTER_KITS[kitSlug(f.name)];
    setRole(kit && kit.role);
    renderKit(kit ? kitAbilities(kit, f.el) : placeholderKit(f.el), !!kit);
  };
  const showKitOnly = (slug) => {
    const k = FIGHTER_KITS[slug]; if (!k) return false;
    const fi = ROSTER.findIndex((f) => kitSlug(f.name) === slug); if (fi >= 0) { show(fi); return true; }
    $("#fighterModal").classList.add("kit-only");
    const img = $("#fmImg"); img.removeAttribute("src"); img.alt = "";
    $("#fmName").textContent = k.name;
    const el = k.element ? k.element.toLowerCase() : null;
    $("#fmEl").innerHTML = el ? `${elIcon(el, 26)}${cap(el)} element` : "No element listed";
    $("#fmNum").textContent = "Kit preview · no roster card yet";
    setRole(k.role);
    renderKit(kitAbilities(k, el || "light"), true);
    return true;
  };
  const fromHash = () => { const m = location.hash.match(/^#fighter=([a-z-]+)$/); if (m && showKitOnly(m[1])) openModal(); };
  addEventListener("hashchange", fromHash); setTimeout(fromHash, 0);
  const step = (d) => { const list = rosterState.shown.length ? rosterState.shown : ROSTER; const k = list.indexOf(ROSTER[cur]); show(ROSTER.indexOf(list[(k + d + list.length) % list.length])); };
  grid.addEventListener("click", (e) => { const c = e.target.closest(".rs-card"); if (!c) return; show(+c.dataset.i); openModal(); });
  const prev = $("#fmPrev"), next = $("#fmNext");
  if (prev) prev.addEventListener("click", () => step(-1));
  if (next) next.addEventListener("click", () => step(1));
  addEventListener("keydown", (e) => {
    if (!$("#fighterModal").classList.contains("open")) return;
    if (e.key === "ArrowLeft") step(-1); else if (e.key === "ArrowRight") step(1);
  });
}

function renderElementPage() {
  const el = document.body.dataset.element;
  const grid = $("#elementGrid");
  if (!el || !grid) return;
  const fighters = ROSTER.filter((f) => f.el === el);
  rosterState.el = el;
  rosterState.shown = fighters;
  rosterState.expanded = true;
  grid.innerHTML = fighters.map((f) => fighterCardHTML(f, ROSTER.indexOf(f))).join("");
  bindFighterGrid(grid);
}

/* ---------------- Modes ---------------- */
function bindArt(img, root, tag, okLabel) {
  if (!img || !root) return;
  const sync = (ok) => {
    img.classList.toggle("is-on", ok);
    root.classList.toggle("art-missing", !ok);
    if (tag) tag.textContent = ok ? (okLabel || tag.dataset.ok || "Concept art") : (tag.dataset.miss || "Art coming soon");
  };
  img.addEventListener("load", () => sync(true));
  img.addEventListener("error", () => sync(false));
  if (img.complete) sync(img.naturalWidth > 0);
}

function renderModes() {
  $("#modeTabs").innerHTML = MODES.map((m, i) => `
    <button class="mode-tab" role="tab" data-i="${i}" aria-selected="false">
      <span class="thumb art-missing"><span class="art-fallback" aria-hidden="true">Art coming soon</span><img src="${m.src}" alt=""></span>
      <span class="mode-tab-name">${m.tab}</span>
    </button>`).join("");
  $$(".mode-tab").forEach((t) => {
    bindArt(t.querySelector("img"), t.querySelector(".thumb"));
    t.addEventListener("click", () => selectMode(+t.dataset.i));
  });
  selectMode(0);
  $("#featureList").innerHTML = FEATURES.map(([t, d], i) => `
    <li class="reveal" style="--d:${(i % 3) * 0.07}s"><span class="fi"><span>0${i + 1}</span></span><strong>${t}</strong><p>${d}</p></li>`).join("");
}

let mIdx = 0;
function selectMode(i) {
  mIdx = i; const m = MODES[i];
  $$(".mode-tab").forEach((t, k) => {
    t.classList.toggle("active", k === i);
    t.setAttribute("aria-selected", String(k === i));
  });
  $("#modeArt").innerHTML = `<div class="art-fallback" aria-hidden="true">Art coming soon</div><img class="art-in" src="${m.src}" alt="${m.name}">`;
  bindArt($("#modeArt img"), $("#modeStage"), $("#modeArtTag"), "Concept art");
  $("#modeCaption").innerHTML = `<div class="fade"><span class="players">${m.players}</span><h3>${m.title}</h3><p class="desc"><strong>${m.name}.</strong> ${m.text}</p></div>`;
  const st = $("#modeStage"); st.classList.remove("swap"); void st.offsetWidth; st.classList.add("swap");
}

/* ---------------- Codes ---------------- */
const ICO_GEM = `<svg class="rw-ico rw-gem" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path fill="#0AC8B9" d="M8 1.6 14.2 6.4 8 14.4 1.8 6.4z"/><path fill="#087F78" d="M8 1.6 11.4 6.4H4.6z"/><path fill="#0A5E5A" d="M4.6 6.4h6.8L8 14.4z" opacity=".55"/></svg>`;
const ICO_TITLE = `<svg class="rw-ico rw-title" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path fill="none" stroke="#C8AA6E" stroke-width="1.3" d="M2.2 4.2h11.6v8.2L8 11.2 2.2 12.4z"/><path fill="none" stroke="#C8AA6E" stroke-width="1.3" d="M3.6 6.4h8.8M3.6 8.6h6.2"/></svg>`;
const ICO_SCARF = `<svg class="rw-ico rw-scarf" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path fill="none" stroke="#C8AA6E" stroke-width="1.35" stroke-linecap="round" d="M3.2 5c2.2-2.2 6.2-2 6.4.8.2 1.8-1.8 2.2-1.8 4.2 0 1.5 1.3 2.4 2.8 2.2"/><path fill="none" stroke="#C8AA6E" stroke-width="1.35" stroke-linecap="round" d="M8.4 5.6c1.3-1.1 3.6-.8 4.4.8"/></svg>`;
function rewardLine(reward) {
  return reward.split(/\s*\+\s*/).map((part) => {
    const ico = /gem/i.test(part) ? ICO_GEM : /title/i.test(part) ? ICO_TITLE : /scarf/i.test(part) ? ICO_SCARF : "";
    return `<span class="code-part">${ico}<span>${part}</span></span>`;
  }).join(`<span class="code-plus" aria-hidden="true">+</span>`);
}
function renderCodes() {
  const list = $("#codesList"); if (!list) return;
  const label = { new: "New", active: "Active", expired: "Expired", launch: "Redeemable at launch" };
  list.innerHTML = CODES.map((c, i) => `
    <article class="code-card reveal ${c.status === "expired" ? "expired" : ""}" style="--d:${i * 0.05}s">
      <div class="code-card-inner">
        <div class="code-top">
          <span class="code-val">${c.code}</span>
          <button class="copy-btn" data-code="${c.code}" ${c.status === "expired" ? "disabled" : ""} aria-label="Copy code ${c.code}">
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 8V4H4v12h4" fill="none" stroke="currentColor" stroke-width="2"/></svg>
            <span>${c.status === "expired" ? "Expired" : "Copy"}</span>
          </button>
        </div>
        <div class="code-reward">${rewardLine(c.reward)}</div>
        <span class="code-status ${c.status === "expired" ? "exp" : c.status}">${label[c.status]}</span>
      </div>
    </article>`).join("");
  $$(".copy-btn:not(:disabled)").forEach((b) => b.addEventListener("click", () => copyCode(b)));
  bindArt($("#rewardsArt img"), $("#rewardsArt"), $("#rewardsArtTag"));
}
async function copyCode(btn) {
  const code = btn.dataset.code;
  try { await navigator.clipboard.writeText(code); }
  catch { const ta = Object.assign(document.createElement("textarea"), { value: code }); document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); }
  btn.classList.add("copied"); btn.querySelector("span").textContent = "Copied!";
  setTimeout(() => { btn.classList.remove("copied"); btn.querySelector("span").textContent = "Copy"; }, 1800);
  toast(`Copied <code>${code}</code> — redeem it at launch from the Codes menu`);
}
let toastT;
function toast(html) { const t = $("#toast"); t.innerHTML = `<span class="ph-dot"></span>${html}`; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2400); }

/* ---------------- Modals ---------------- */
function modal(id) {
  const m = $(id);
  const open = () => { m.classList.add("open"); m.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; $(".modal-close", m).focus(); };
  const close = () => {
    m.classList.remove("open");
    m.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    const vid = m.querySelector("video");
    if (vid) { vid.pause(); }
  };
  $$("[data-close]", m).forEach((el) => el.addEventListener("click", close));
  addEventListener("keydown", (e) => e.key === "Escape" && close());
  return open;
}
function initModals() {
  if ($("#trailerModal")) {
    const openTrailer = modal("#trailerModal");
    $$("[data-open-trailer]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); closeMenu(); openTrailer(); }));
  }
  if (!$("#patchModal")) return;
  const openPatch = modal("#patchModal");
  const show = (i) => {
    const u = UPDATES[i];
    const hues = [215, 40, 200];
    const glyphs = ["嵐", "襲", "始"];
    const group = (label, items, c) => `<div class="patch-group" style="--c:${c}"><h4><i></i>${label}</h4><ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul></div>`;
    $("#patchArticle").innerHTML = `
      <div class="article-hero">${sceneArt(hues[i] ?? 215, glyphs[i] ?? "", "news", "m" + i)}<span class="ph-tag">Placeholder patch notes</span></div>
      <div class="article-inner">
        <div class="news-meta"><span class="cat">Patch Notes</span><span class="sep"></span><span class="date">${u.date}</span></div>
        <h3>${u.ver} — ${u.title}</h3>
        <div class="patch-tabs">${UPDATES.map((x, k) => `<button data-k="${k}" class="${k === i ? "active" : ""}">${x.ver}</button>`).join("")}</div>
        ${group("Added", u.added, "#2f9e5b")}${group("Changed", u.changed, "#c9a35c")}${group("Fixed", u.fixed, "var(--accent)")}
      </div>`;
    $$(".patch-tabs button").forEach((b) => b.addEventListener("click", () => { show(+b.dataset.k); $("#patchArticle").scrollTop = 0; }));
  };
  $$("[data-open-patch]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); closeMenu(); show(+b.dataset.openPatch); openPatch(); }));
}

/* ---------------- Nav / chrome ---------------- */
function closeMenu() { $("#mainnav").classList.remove("open"); $("#burger").setAttribute("aria-expanded", false); document.body.style.overflow = ""; }
function initNav() {
  const nav = $("#mainnav"), burger = $("#burger");
  if (!nav || !burger) return;
  burger.addEventListener("click", () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); document.body.style.overflow = o ? "hidden" : ""; });
  $$("a", nav).forEach((a) => a.addEventListener("click", closeMenu));
  $$(".dd-toggle").forEach((t) => t.addEventListener("click", () => { const o = t.parentElement.classList.toggle("open"); t.setAttribute("aria-expanded", o); }));
  const links = $$(".mainnav > a[href^='#']:not([data-open-patch])");
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
  ["news", "story", "fighters", "howtoplay", "modes", "arenas", "codes", "wallpapers", "roadmap", "community"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  const phClose = $(".ph-banner-close"); if (phClose) phClose.addEventListener("click", () => document.body.classList.add("banner-hidden"));
  const promoClose = $("#promoClose"); if (promoClose) promoClose.addEventListener("click", () => $("#promoBar").classList.add("hide"));
}
function initMore() {
  $$("[data-more]").forEach((b) => b.addEventListener("click", () => {
    const box = document.getElementById(b.getAttribute("aria-controls")), open = box.hidden;
    box.hidden = !open; b.setAttribute("aria-expanded", open); b.textContent = open ? "Read less" : "Read more";
  }));
}
function initReveal() {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = $$(".reveal");
  if (reduce) { items.forEach((el) => el.classList.add("in")); return; }
  $$("section").forEach((sec) => {
    $$(".reveal", sec).forEach((el, i) => {
      if (!el.style.getPropertyValue("--d")) el.style.setProperty("--d", `${Math.min(i * 0.07, 0.42)}s`);
    });
  });
  $$(".masthead .reveal").forEach((el, i) => el.style.setProperty("--d", `${0.12 + i * 0.12}s`));
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    io.unobserve(e.target);
  }), { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  items.forEach((el) => io.observe(el));
}
function initParallax() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const els = $$("[data-parallax]");
  if (!els.length) return;
  const mobile = matchMedia("(max-width: 700px)").matches;
  let tick = false;
  const upd = () => {
    els.forEach((el) => {
      const sec = el.closest("section") || el;
      const r = sec.getBoundingClientRect();
      const factor = parseFloat(el.dataset.parallax) * (mobile ? 0.4 : 1);
      const y = -r.top * factor;
      let base = "";
      if (el.classList.contains("mh-figure-l")) base = "scaleX(-1) ";
      else if (el.classList.contains("mh-kanji")) base = "translate(-50%,-50%) ";
      else if (el.classList.contains("mh-video-stage")) base = "translate(-50%,-54%) ";
      el.style.transform = `${base}translate3d(0, ${y.toFixed(1)}px, 0)`;
    });
    tick = false;
  };
  addEventListener("scroll", () => { if (!tick) { requestAnimationFrame(upd); tick = true; } }, { passive: true });
  upd();
}
function initParticles() {
  const host = $("#mhParticles"); if (!host) return;
  const n = innerWidth < 600 ? 16 : 34;
  for (let i = 0; i < n; i++) { const p = document.createElement("i"); p.style.left = `${Math.random() * 100}%`; p.style.animationDuration = `${7 + Math.random() * 9}s`; p.style.animationDelay = `${-Math.random() * 16}s`; host.appendChild(p); }
}

function initCinematicVideo(sel, stageSel) {
  const v = $(sel); if (!v) return;
  const stage = (stageSel && $(stageSel)) || v.closest("[data-video-stage]") || v.parentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    v.pause();
    v.removeAttribute("autoplay");
    if (stage) stage.classList.add("reduced-motion");
    return;
  }
  v.muted = true;
  v.defaultMuted = true;
  v.setAttribute("playsinline", "");
  v.setAttribute("autoplay", "");
  const play = () => { v.classList.add("is-on"); v.play().catch(() => {}); };
  if (v.readyState >= 2) play();
  else v.addEventListener("canplay", play, { once: true });
}
function initPromoVideo() {
  initCinematicVideo("#promoVideo", "#promoStage");
  initCinematicVideo("#heroVideo", "#heroVideoStage");
}
function initCounters() {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; const el = e.target, target = +el.dataset.count, t0 = performance.now();
    const fmt = (v, done) => (v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v + (done && target >= 100 ? "+" : ""));
    const tick = (t) => { const k = Math.min(1, (t - t0) / 1500); el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - k, 3))), k === 1); if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick); io.unobserve(el);
  }), { threshold: 0.6 });
  $$("[data-count]").forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  if ($("#newsRail")) renderNews();
  if ($("#rosterGrid")) renderRoster();
  if ($("#elementGrid")) renderElementPage();
  if ($("#codesList")) renderCodes();
  if ($("#modeTabs")) renderModes();
  initPromoVideo();
  initNav(); initMore(); initModals(); initReveal(); initParallax(); initParticles(); initCounters();
});
