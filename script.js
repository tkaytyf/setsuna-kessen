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
  ROBLOX_URL: "#",   // Play stays Coming soon until tkay sends a real game URL
  DISCORD_URL: "https://discord.gg/GZBsWsKGDt",
};

/* Asset root: "" on the homepage, "../" on element pages (set via <html data-base>). */
const BASE = document.documentElement.getAttribute("data-base") || "";
const asset = (path) => BASE + path;

const WALLPAPER_FILES = {
  "tovin-rusk": "assets/wallpapers/00-tovin-rusk-wallpaper.jpg",
  "kaelith-rue": "assets/wallpapers/01-kaelith-rue-wallpaper.jpg",
  "tamsin-orel": "assets/wallpapers/02-tamsin-orel-wallpaper.jpg",
  "sael-orin": "assets/wallpapers/10-sael-orin-wallpaper.jpg",
  "nedi-rime": "assets/wallpapers/14-nedi-rime-wallpaper.jpg",
  "sirae-holt": "assets/wallpapers/22-sirae-holt-wallpaper.jpg",
  "jastel-vohl": "assets/wallpapers/26-jastel-vohl-wallpaper.jpg",
  "mirelle-voss": "assets/wallpapers/51-mirelle-voss-wallpaper.jpg",
  "kade-burel": "assets/wallpapers/52-kade-burel-wallpaper.jpg",
  "thalen-mire": "assets/wallpapers/53-thalen-mire-wallpaper.jpg",
  "senni-drowl": "assets/wallpapers/54-senni-drowl-wallpaper.jpg",
  "wessa-dorn": "assets/wallpapers/55-wessa-dorn-wallpaper.jpg",
  "rokai-bell": "assets/wallpapers/56-rokai-bell-wallpaper.jpg",
  "leta-shun": "assets/wallpapers/57-leta-shun-wallpaper.jpg",
  "cadric-lowe": "assets/wallpapers/58-cadric-lowe-wallpaper.jpg",
  "pelin-nivir": "assets/wallpapers/59-pelin-nivir-wallpaper.jpg",
  "serin-aule": "assets/wallpapers/60-serin-aule-wallpaper.jpg",
  "pixa-noll": "assets/wallpapers/69-pixa-noll-wallpaper.jpg",
  "tesen-wynn": "assets/wallpapers/79-tesen-wynn-wallpaper.jpg",
  "kald-eschen": "assets/wallpapers/93-kald-eschen-wallpaper.jpg"
};

function setWallpaperBtn(slug, name) {
  const a = $("#fmWallpaper");
  if (!a) return;
  const rel = (typeof WALLPAPER_FILES !== "undefined" && WALLPAPER_FILES[slug]) || "";
  if (!rel) { a.hidden = true; a.removeAttribute("href"); return; }
  a.hidden = false;
  a.href = asset(rel);
  a.setAttribute("download", `setsuna-kessen-${rel.split("/").pop()}`);
  a.textContent = "Download wallpaper";
  a.setAttribute("aria-label", `Download wallpaper for ${name || slug}`);
}



/* ---------------- FIGHTER ROSTER (roster cards) ----------------
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


const STARTER_ART = {
  "tovin-rusk": { src: asset("assets/fighters/starter/00-tovin-rusk.webp"), lg: asset("assets/fighters/starter/00-tovin-rusk-lg.webp") },
};

/* ---------------- FIGHTER KITS (ability panel in the fighter popup) ----------------
   Locked format: exactly 4 moves + 1 Awakening. No passive.
   FIGHTER_KITS_SOURCE is the Game Director's full 101-kit list
   (/workspace/site-copy/fighter-kits-all.json), pasted verbatim.
   Kits are matched to roster cards by NAME (case-insensitive).
   Varek Ashe is official #101 and has no roster card yet; preview via
   index.html#fighter=varek-ashe. Tovin Rusk is the starter and is not in
   this list — his values come only from the coded move data.
   Coded damage, range, and cooldowns from fighter-moves.json win when
   a kit is in the current build. Optional `icon` on a move overrides
   the stand-in ability icon (default: the fighter's element icon). */
const FIGHTER_KITS_SOURCE = [
  {
    "name": "Kaelith Rue",
    "number": 1,
    "element": "Wind",
    "role": "Rushdown",
    "lore": "He first packed a lane of air on the open training stones of Academy Plaza.",
    "moves": [
      {
        "key": "1",
        "name": "Gale Vent",
        "desc": "Dashes a short lane of packed air from the bracers. Matte gust, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Wake Pop",
        "desc": "Pops the packed wake into a tight burst. Stronger if used at the end of Gale Vent.",
        "cooldown": 11
      },
      {
        "key": "3",
        "name": "Vent Sweep",
        "desc": "A low vented kick that knocks down grounded foes and clips dashes along the wake.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Bracer Rush",
        "desc": "A short armored step-in that can cancel into Gale Vent.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Open Bracers",
      "desc": "The wake stays packed, Gale Vent can be recast, and Wake Pop becomes a wider burst.",
      "key": "G"
    }
  },
  {
    "name": "Tamsin Orel",
    "number": 2,
    "element": "Wind",
    "role": "Ranged (zoner)",
    "lore": "She practiced silent needles from the high walkways of Skyline Ward, pinning a lane before anyone heard the shot.",
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
    "name": "Voren Shai",
    "number": 3,
    "element": "Wind",
    "role": "Tank",
    "lore": "He drills still-air walls on the windy courts of Academy Hill until a crossing stops cold.",
    "moves": [
      {
        "key": "1",
        "name": "Still Wall",
        "desc": "Raises the still-air shield and hardens moving wind into a short frontal wall.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Calm Dome",
        "desc": "Plants a calm-air dome. Body-blocks anyone who tries to cross it.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Cross Check",
        "desc": "Shoulders anyone who touches the wall or dome a step back.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Wall Plant",
        "desc": "Plants the shield as cover. He can recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Held Still",
      "desc": "The wall stays up, the dome widens, and Cross Check knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Lysa Koro",
    "number": 4,
    "element": "Wind",
    "role": "Trickster",
    "lore": "Her scarf trails catch the cross-winds on the high walkways of Skyline Ward.",
    "moves": [
      {
        "key": "1",
        "name": "Scarf Trail",
        "desc": "Leaves a rushing scarf afterimage that holds her silhouette. Matte air, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Side Gust",
        "desc": "The afterimage explodes into a sideways gust and she slips off-angle. If no trail is out, a close gust that leaves one.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Decoy Rush",
        "desc": "Sends the afterimage forward as a fake tell. Recast swaps her to its place.",
        "cooldown": 9
      },
      {
        "key": "4",
        "name": "Trail Bait",
        "desc": "The next hit on an afterimage auto-swaps her and knocks the attacker a step sideways. Visible tell on the scarf.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Split Trails",
      "desc": "Two afterimages stay out, Decoy Rush costs no cooldown, and Side Gust knocks down if they swung at a trail.",
      "key": "G"
    }
  },
  {
    "name": "Iden Vael",
    "number": 5,
    "element": "Wind",
    "role": "Support",
    "lore": "She learned the chime fans in the infirmary courts on Academy Hill, turning a stumble into a clean step.",
    "moves": [
      {
        "key": "1",
        "name": "Chime Fans",
        "desc": "Changes the room's airflow in a short circle. Allies \u2014 or Iden, in a duel \u2014 recover a little stamina and move cleaner.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Inhale Stagger",
        "desc": "Inhales a teammate's stagger \u2014 or her own \u2014 and cancels one hitstun.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Exhale Lift",
        "desc": "Exhales the taken stagger as a clean speed lift for a few steps.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Fan Shift",
        "desc": "Relocates the airflow circle a short distance, or plants one if none is out.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Turned Air",
      "desc": "The circle widens, Inhale Stagger can be used twice, and the speed lift lasts the window.",
      "key": "G"
    }
  },
  {
    "name": "Ruyo Tanek",
    "number": 6,
    "element": "Wind",
    "role": "Rushdown",
    "lore": "He spins those greaves along the open pier boards at Gold Harbor when the wind comes in off the bay.",
    "moves": [
      {
        "key": "1",
        "name": "Cyclone Kick",
        "desc": "A sliding kick that spins up the greaves. Matte wind, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Rising Spiral",
        "desc": "A rising kick that flings the opponent out. Stronger if used after Cyclone Kick.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Slide Chain",
        "desc": "Chains a second sliding kick along the same line. Knocks down grounded foes.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Spin In",
        "desc": "A short armored step-in that can cancel into Cyclone Kick.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Full Spiral",
      "desc": "Greaves stay spun up, Cyclone Kick can be recast, and Rising Spiral becomes a wider fling.",
      "key": "G"
    }
  },
  {
    "name": "Elane Sough",
    "number": 7,
    "element": "Wind",
    "role": "Ranged (zoner)",
    "lore": "She throws cutting sheets from the high courts of Skyline Ward, where the wind already wants a lane.",
    "moves": [
      {
        "key": "1",
        "name": "Cutting Sheet",
        "desc": "Throws a midrange cutting sheet of air from the fans. Matte edge, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Wide Slash",
        "desc": "A wider fan slash that covers a short cone and knocks a short step back.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Focused Edge",
        "desc": "Snaps a focused edge through a gap. Deals more if a sheet already tagged the target.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Fan Hop",
        "desc": "A short hop back that can cancel into Cutting Sheet.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Twin Fans",
      "desc": "Sheets fly faster, Wide Slash lingers as a brief lane, and Focused Edge becomes a longer cut.",
      "key": "G"
    }
  },
  {
    "name": "Harth Quen",
    "number": 8,
    "element": "Wind",
    "role": "Tank",
    "lore": "He learned to dump ballast in the narrow stone streets of the Old Quarter, where a launch has nowhere to go.",
    "moves": [
      {
        "key": "1",
        "name": "Dump Ballast",
        "desc": "Dumps heavy air as ballast, becoming hard to launch for a short window.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Rebound Shove",
        "desc": "The next hit on him shoves the attacker back on the rebound.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Bellows Pulse",
        "desc": "Pulses a tight burst of heavy air that knocks a short step back.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Ballast Plant",
        "desc": "Plants a heavy-air patch that slows launches and dashes inside it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Full Ballast",
      "desc": "Ballast stays on, rebounds knock down, and Bellows Pulse can be used twice in the window.",
      "key": "G"
    }
  },
  {
    "name": "Pexa Lirn",
    "number": 9,
    "element": "Wind",
    "role": "Trickster",
    "lore": "She pockets whirlvents in the crowd-gaps of Lantern Market and leaves a chase on a new street.",
    "moves": [
      {
        "key": "1",
        "name": "Whirlvent",
        "desc": "Tosses a pocket whirlvent that holds a faint gust-mark. Matte air, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Mid-Step",
        "desc": "Relocates a dash mid-step to a whirlvent, or plants one at the dash's end if none is out.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "New Angle",
        "desc": "A poke from the vent's facing. Deals more if they just swung at her old line.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Gust Swap",
        "desc": "The next hit near a whirlvent auto-relocates her and leaves a brief gust at the old spot. Visible tell on the vent.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Open Pockets",
      "desc": "Two vents stay out, Mid-Step costs no cooldown, and New Angle knocks down if they whiffed her old line.",
      "key": "G"
    }
  },
  {
    "name": "Sael Orin",
    "number": 10,
    "element": "Wind",
    "role": "Support",
    "lore": "He plants his breathing banner on the practice terraces of Academy Hill, where first-years learn to keep their feet.",
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
    "name": "Caelis Venn",
    "number": 11,
    "element": "Ice",
    "role": "Ranged (zoner)",
    "lore": "She looses frost shafts from the high balconies of Skyline Ward, where a lane of ice can hang in the open air.",
    "moves": [
      {
        "key": "1",
        "name": "Frost Shaft",
        "desc": "Looses a midrange solid, glass-like arrow that locks a frost mark on the first fighter it hits. Matte ice, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Lane Lock",
        "desc": "Plants a frost shaft in a lane. Anyone who crosses it is briefly slowed.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Brittle Burst",
        "desc": "Detonates every frost shaft and mark in a tight, brittle burst.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Shaft Hop",
        "desc": "A short hop back that can cancel into Frost Shaft.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Full Crystal",
      "desc": "Shafts fly faster, marks linger, and Brittle Burst becomes a wider shatter.",
      "key": "G"
    }
  },
  {
    "name": "Korun Hale",
    "number": 12,
    "element": "Ice",
    "role": "Rushdown",
    "lore": "He freezes a rail along the winter dock boards at Gold Harbor and rides it into a shoulder.",
    "moves": [
      {
        "key": "1",
        "name": "Skate Rail",
        "desc": "A short skate along a frozen path. Recast while the path lasts to skate again. Matte ice, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Shoulder Wall",
        "desc": "A close shoulder that raises a short ice wall behind the foe if used at the end of a Skate Rail.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Rail Sweep",
        "desc": "A low skate-kick along the path that knocks down grounded foes and clips dashes.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Ice Close",
        "desc": "A short armored skate-in that can cancel into Shoulder Wall.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Held Rail",
      "desc": "The path stays out, Skate Rail can be recast freely, and Shoulder Wall becomes a wider crash.",
      "key": "G"
    }
  },
  {
    "name": "Maelis Thorne",
    "number": 13,
    "element": "Ice",
    "role": "Tank",
    "lore": "She stacks ice slabs in the stone lanes of the Old Quarter and walks them forward like a door.",
    "moves": [
      {
        "key": "1",
        "name": "Ice Stack",
        "desc": "Stacks a short ice barricade that blocks the front.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Siege Door",
        "desc": "Shoulders the stacked slabs forward like a siege door, shoving the lane.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Add Slab",
        "desc": "Adds a slab, thickening the barricade and pulsing a short knockback if it was chipped.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Stack Plant",
        "desc": "Plants the barricade as cover. She can recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Full Barricade",
      "desc": "The stack becomes a short wall across the lane, slowly advances, and cannot be broken for the window.",
      "key": "G"
    }
  },
  {
    "name": "Nedi Rime",
    "number": 14,
    "element": "Ice",
    "role": "Trickster",
    "lore": "She throws ice mirrors in the stall glass of Lantern Market and swaps the moment a swing commits.",
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
    "name": "Oren Vask",
    "number": 15,
    "element": "Ice",
    "role": "Support",
    "lore": "He keeps a frost lantern in the clinic rooms on Academy Hill, where a slower swing can save a round.",
    "moves": [
      {
        "key": "1",
        "name": "Frost Lantern",
        "desc": "Holds a short frost circle that slowly steadies wounds for allies \u2014 or Oren, in a duel \u2014 and slows enemy swings inside it.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Soft Hurtbox",
        "desc": "Chills a teammate's hurtbox \u2014 or his own \u2014 so hits land softer for a few beats.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Slow Swing",
        "desc": "A focused chill that slows the next enemy swing aimed at the circled fighter.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Lantern Place",
        "desc": "Relocates the frost circle a short distance, or plants one if none is out.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Held Frost",
      "desc": "The circle widens, hits land softer for the window, and enemy swings inside stay slow.",
      "key": "G"
    }
  },
  {
    "name": "Brin Solace",
    "number": 16,
    "element": "Ice",
    "role": "Rushdown (grappler)",
    "lore": "She learned that freeze-and-yank in the sparring rings of Academy Plaza, where a held point decides the exchange.",
    "moves": [
      {
        "key": "1",
        "name": "Needle Stab",
        "desc": "A close dagger stab that freezes the contact point if it hits. Visible tell; a parry breaks the freeze. Matte ice, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Yank Off",
        "desc": "Yanks a frozen contact and pulls the opponent off-balance. A weaker close shove if nobody is frozen.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Dagger String",
        "desc": "A short rush string of thin daggers. The last hit can plant a freeze.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Stab In",
        "desc": "A short armored step-in that can cancel into Needle Stab.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Frozen Grip",
      "desc": "Freezes linger, yanks land faster, and Yank Off becomes a knockdown at the end of the window.",
      "key": "G"
    }
  },
  {
    "name": "Fiala Nesh",
    "number": 17,
    "element": "Ice",
    "role": "Ranged (zoner)",
    "lore": "She rails hail from the tower walks of Skyline Ward and mines the stairs below.",
    "moves": [
      {
        "key": "1",
        "name": "Hail Rail",
        "desc": "Fires a midrange rail of hail from the longarm. Matte ice, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Dash Mine",
        "desc": "A charged shot that leaves an ice mine. It pops if someone dashes through it.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Mine Pop",
        "desc": "Detonates every ice mine in a tight burst.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Rail Hop",
        "desc": "A short hop back that can cancel into Hail Rail.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Held Hail",
      "desc": "Rails fire faster, mines stay armed, and Mine Pop becomes a wider burst.",
      "key": "G"
    }
  },
  {
    "name": "Durn Keval",
    "number": 18,
    "element": "Ice",
    "role": "Tank",
    "lore": "He holds the narrow gates of the Old Quarter and lets the pavise answer anyone who mashes the door.",
    "moves": [
      {
        "key": "1",
        "name": "Rime Pavise",
        "desc": "Raises a rime pavise that blocks the front and sheds ice thorns when struck.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Thorn Shed",
        "desc": "Pulses the thorns in a tight ring. Stronger if the pavise just blocked a hit.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Cold Spike",
        "desc": "A short counter-spike through the pavise. Bonus knockdown if they just mashed the shield.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Rime Plant",
        "desc": "Plants the pavise as cover and shoulders anyone who crosses it. He can recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Full Rime",
      "desc": "The pavise stays up, thorns linger on the ground, and Cold Spike can be used twice in the window.",
      "key": "G"
    }
  },
  {
    "name": "Sive Alren",
    "number": 19,
    "element": "Ice",
    "role": "Trickster",
    "lore": "She hides a slide in the stall-mist of Lantern Market and finishes the exchange on a different stone.",
    "moves": [
      {
        "key": "1",
        "name": "Ground Mist",
        "desc": "Lays a knee-high ground mist in a short line. Matte fog, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Fog Step",
        "desc": "A short slide hidden inside the mist; reappears at a new angle. If no mist is out, a close slide that leaves some.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Mist Poke",
        "desc": "A poke from the new angle. Deals more if they just swung at her old spot.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Fog Bait",
        "desc": "The next hit into the mist auto-slides her and briefly blinds the attacker. Visible tell on the fog.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Deep Mist",
      "desc": "The mist stays out and widens, Fog Step costs no cooldown, and Mist Poke knocks down if they whiffed.",
      "key": "G"
    }
  },
  {
    "name": "Quin Arae",
    "number": 20,
    "element": "Ice",
    "role": "Support",
    "lore": "She seals and thaws the courtyard stones of Academy Plaza, teaching first-years how to keep their feet.",
    "moves": [
      {
        "key": "1",
        "name": "Seal Staff",
        "desc": "Seals the floor in a short circle. Allies \u2014 or Quin, in a duel \u2014 cannot be launched while standing in it.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Freeze Footing",
        "desc": "Freezes a teammate's footing \u2014 or her own \u2014 so the next launch fails.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Thaw Floor",
        "desc": "Thaws the floor under foes in a short patch, slicking dashes and footing.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Staff Plant",
        "desc": "Relocates the sealed circle, or plants one if none is out, and leaves a brief mend at the old spot.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Sealed Ground",
      "desc": "The circle widens, launches fail for the window, and Thaw Floor spreads under the whole circle.",
      "key": "G"
    }
  },
  {
    "name": "Rheden Vaur",
    "number": 21,
    "element": "Flame",
    "role": "Rushdown",
    "lore": "He learned that last-hit pop on the brick kiln yards behind the Old Quarter.",
    "moves": [
      {
        "key": "1",
        "name": "Heat Knuckle",
        "desc": "A close punch that flashes on contact and leaves a delayed burn pop on the last hit of a string. Matte heat, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Delayed Pop",
        "desc": "Detonates lingering burn pops on the target in a tight burst.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Flash String",
        "desc": "A short armored punch rush. The last hit always plants a burn pop.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Knuckle Step",
        "desc": "A short step-in that can cancel into Heat Knuckle.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Hot Contact",
      "desc": "Punch strings plant pops faster, Delayed Pop becomes a wider burst, and the last hit knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Sirae Holt",
    "number": 22,
    "element": "Flame",
    "role": "Ranged (zoner)",
    "lore": "She looses ember bolts on the open tiles of Academy Plaza, then detonates every mark still stuck.",
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
    "name": "Bokan Dreve",
    "number": 23,
    "element": "Flame",
    "role": "Tank",
    "lore": "He stands the foundry doors at Gold Harbor, where slag cools in the open air.",
    "moves": [
      {
        "key": "1",
        "name": "Slag Tower",
        "desc": "Raises the slag shield that blocks the front and radiates a warning heat haze. Anyone who stays too close takes light chip.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Haze Walk",
        "desc": "Walks the shield forward. The haze chips and shoves a short step.",
        "cooldown": 11
      },
      {
        "key": "3",
        "name": "Warning Pulse",
        "desc": "Pulses the haze once in a tight ring. Stronger if the shield just blocked a hit.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Tower Plant",
        "desc": "Plants the shield as cover. The haze lingers in a short cone; he can recall it.",
        "cooldown": 12
      }
    ],
    "awakening": {
      "name": "Held Haze",
      "desc": "The shield stays up, the haze widens, and Haze Walk can be used twice in the window.",
      "key": "G"
    }
  },
  {
    "name": "Nyrra Phel",
    "number": 24,
    "element": "Flame",
    "role": "Trickster",
    "lore": "She lays false trails between the stall aisles of Lantern Market and waits for a chase.",
    "moves": [
      {
        "key": "1",
        "name": "Cinder Step",
        "desc": "A short step that leaves a trail of fake footprints. Matte cinder, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "False Rush",
        "desc": "Sends the footprints rushing forward as a fake tell. Recast blinks her to the end of the trail.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Ignite Prints",
        "desc": "Ignites every footprint still on the ground in a tight, delayed burst.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Behind Print",
        "desc": "A slash from the far end of the trail. If no trail is out, a close slash that leaves one.",
        "cooldown": 7
      }
    ],
    "awakening": {
      "name": "Burned Path",
      "desc": "Two trails stay out, False Rush costs no cooldown, and Ignite Prints knocks down if they stepped on a print.",
      "key": "G"
    }
  },
  {
    "name": "Alden Mar",
    "number": 25,
    "element": "Flame",
    "role": "Support",
    "lore": "He keeps the clinic hearths lit on Academy Hill and carries that warmth lantern into a duel.",
    "moves": [
      {
        "key": "1",
        "name": "Warmth Lantern",
        "desc": "Holds a short warmth circle that steadies a teammate's footing \u2014 or Alden's, in a duel \u2014 and dries ice and frost.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Overheat Swing",
        "desc": "Overheats a teammate's next swing \u2014 or his own \u2014 so it briefly chips a held guard, then cools them down. A well-timed parry still beats it.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Dry Frost",
        "desc": "A focused wash of warmth that strips ice slow and cuts incoming ice damage for a beat.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Lantern Toss",
        "desc": "Tosses the lantern a short distance; the circle relocates, then can be recalled.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Open Hearth",
      "desc": "The circle widens, Overheat Swing lasts the window, and ice attacks in the warmth fall short.",
      "key": "G"
    }
  },
  {
    "name": "Jastel Vohl",
    "number": 26,
    "element": "Flame",
    "role": "Rushdown",
    "lore": "He swings the lit chain along the dock boards at Gold Harbor, pulling a fight in on a visible hook.",
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
    "name": "Calyx Wren",
    "number": 27,
    "element": "Flame",
    "role": "Ranged (zoner)",
    "lore": "She practiced mortar timing off the rain-chains and roof ledges of Skyline Ward.",
    "moves": [
      {
        "key": "1",
        "name": "Signal Flare",
        "desc": "Looses a midrange flare that sticks to the ground and explodes when crossed. Matte flare, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Delayed Arc",
        "desc": "A higher arcing flare that takes a beat longer to arm, then explodes in a wider ring.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Cross Burst",
        "desc": "Detonates every armed flare at once in a tight, matte burst.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Mortar Hop",
        "desc": "A short hop back that can cancel into Signal Flare.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Full Signal",
      "desc": "Flares arm faster, two can stay out, and Cross Burst becomes a wider ring.",
      "key": "G"
    }
  },
  {
    "name": "Groth Senn",
    "number": 28,
    "element": "Flame",
    "role": "Tank",
    "lore": "He slams slag into the cracked courtyards of the Old Quarter and waits for footing to fail.",
    "moves": [
      {
        "key": "1",
        "name": "Rim Slam",
        "desc": "Slams the molten-rim pauldron into the ground, leaving a cooling slag pool as difficult terrain.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Slag Pool",
        "desc": "Widens the pool and slows dashes and footing inside it.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Shoulder Rim",
        "desc": "A short armored shoulder. Knocks down if the foe is standing in slag.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Pool Plant",
        "desc": "Plants the pauldron in the pool as cover and shoulders anyone who crosses it. He can recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Cooling Field",
      "desc": "The pool stays out and widens, dashes inside fail, and Shoulder Rim can be used twice in the window.",
      "key": "G"
    }
  },
  {
    "name": "Veyla Rusk",
    "number": 29,
    "element": "Flame",
    "role": "Trickster",
    "lore": "She bottles stall-smoke in Lantern Market and uses it to leave a fight on a different aisle than she entered.",
    "moves": [
      {
        "key": "1",
        "name": "Smoke Oil",
        "desc": "Tosses a smoke-oil vial that becomes a brief matte screen. No glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Heat Shimmer",
        "desc": "Vanishes in the screen and reappears at the far edge.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Edge Tag",
        "desc": "A slash from the far edge of the smoke. Deals more if they just swung into the screen.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Screen Drop",
        "desc": "Drops a lingering oil screen that hides her dash tell and briefly blinds anyone who dashes through it.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Thick Smoke",
      "desc": "Two screens stay out, Heat Shimmer can be used twice, and Edge Tag knocks down if they whiffed in the smoke.",
      "key": "G"
    }
  },
  {
    "name": "Ioen Safra",
    "number": 30,
    "element": "Flame",
    "role": "Support",
    "lore": "She walks the censer along the Academy Plaza colonnade before first-year drills begin.",
    "moves": [
      {
        "key": "1",
        "name": "Cinder Mark",
        "desc": "Marks a teammate \u2014 or Ioen, in a duel \u2014 with the censer for a short burst of move speed.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Hot Fuse",
        "desc": "Lights a short fuse on the marked fighter's next ability so it lands with a tighter, hotter burst.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Speed Drift",
        "desc": "A short haste puff around the marked fighter that also steadies their footing for one knockback.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Censer Sweep",
        "desc": "Sweeps the censer in a close cone that chips and can re-apply the mark.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Lit Procession",
      "desc": "Marks last the window, speed stays up, and Hot Fuse applies to every slot move they use.",
      "key": "G"
    }
  },
  {
    "name": "Zaeren Tyne",
    "number": 31,
    "element": "Lightning",
    "role": "Rushdown",
    "lore": "He first stitched a jolt across the sparring tiles of Academy Plaza and kept the string going from the far side.",
    "moves": [
      {
        "key": "1",
        "name": "Spark Stitch",
        "desc": "A close jolt from the gloves that stitches on contact. Matte spark, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Contact Blink",
        "desc": "Blinks a body-length on a stitched target and continues from the new angle. A short self-blink if nobody is stitched.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Stitch String",
        "desc": "A tight punch string. The last hit always stitches.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Jolt In",
        "desc": "A short armored step-in that can cancel into Spark Stitch.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Live Thread",
      "desc": "Stitches linger, Contact Blink can be used twice, and the last hit knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Lumer Tashe",
    "number": 32,
    "element": "Lightning",
    "role": "Ranged (zoner)",
    "lore": "She draws straight rails off the roof lines of Skyline Ward, where a bent shot has nowhere to hide.",
    "moves": [
      {
        "key": "1",
        "name": "Rail Arc",
        "desc": "Charges a visible straight line, then fires a midrange bolt that cannot bend. Matte arc, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Held Line",
        "desc": "Holds the charge longer for more range and a short knockback. Still cannot bend.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Line Cut",
        "desc": "A close rod-bash along the last charged line. Deals more if the bolt just tagged them.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Rod Hop",
        "desc": "A short hop back that can cancel into Rail Arc.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Straight Rail",
      "desc": "Bolts fire faster, the charged line lingers as a brief hazard, and Line Cut becomes a longer punish.",
      "key": "G"
    }
  },
  {
    "name": "Brannox Hile",
    "number": 33,
    "element": "Lightning",
    "role": "Tank",
    "lore": "He stores dock-crane charge in a workshop off Gold Harbor and dumps it the same way in a duel.",
    "moves": [
      {
        "key": "1",
        "name": "Capacitor Guard",
        "desc": "Raises a capacitor pavise that blocks the front and stores hits.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Dump Charge",
        "desc": "Dumps stored hits as a short-range shock. Stronger if the pavise just ate a string.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Eat String",
        "desc": "The next string on the pavise is stored at a higher rate and slightly drains the attacker's stamina.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Guard Plant",
        "desc": "Plants the pavise as cover. He can recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Full Capacitor",
      "desc": "The pavise stays up, stored charge does not fade, and Dump Charge can be used twice in the window.",
      "key": "G"
    }
  },
  {
    "name": "Kiri Vaunt",
    "number": 34,
    "element": "Lightning",
    "role": "Trickster",
    "lore": "She plants static decoys in the tight aisles of Lantern Market and swaps the moment a hand reaches in.",
    "moves": [
      {
        "key": "1",
        "name": "Static Image",
        "desc": "Leaves a charged afterimage that holds her silhouette. Matte static, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Touch Pop",
        "desc": "The afterimage pops if touched, or she can pop it, in a tight burst, and she can swap to its place.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Image Swap",
        "desc": "Swaps with the afterimage. If none is out, a close dash that leaves one.",
        "cooldown": 9
      },
      {
        "key": "4",
        "name": "Charged Bait",
        "desc": "The next hit on an afterimage auto-swaps her and stuns the attacker for a beat. Visible tell on the static.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Live Images",
      "desc": "Two afterimages stay out, Image Swap costs no cooldown, and pops leave lingering static that slows dashes.",
      "key": "G"
    }
  },
  {
    "name": "Aven Rilo",
    "number": 35,
    "element": "Lightning",
    "role": "Support",
    "lore": "He keeps time in the infirmary halls on Academy Hill, shaving a breath off a recovery without rushing it.",
    "moves": [
      {
        "key": "1",
        "name": "Tempo Tick",
        "desc": "Ticks the metronome in a short circle. Allies \u2014 or Aven, in a duel \u2014 get a breath shaved off their next cooldown.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Tempo Dash",
        "desc": "Speeds a teammate's next dash \u2014 or his own \u2014 then safely bleeds the static off.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Bleed Static",
        "desc": "Clears lingering shock or slow from the circled fighter and refunds a little stamina.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Tick Shift",
        "desc": "Relocates the tempo circle, or plants one if none is out.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Shared Tempo",
      "desc": "The circle widens, cooldown shaves last the window, and Tempo Dash can be used twice.",
      "key": "G"
    }
  },
  {
    "name": "Toren Glede",
    "number": 36,
    "element": "Lightning",
    "role": "Rushdown",
    "lore": "He stutter-steps the length of the pier at Gold Harbor, three bursts and a shoulder at the end of each.",
    "moves": [
      {
        "key": "1",
        "name": "Heel Spark",
        "desc": "A short stutter-step burst that ends in a shoulder check. Matte spark, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Second Burst",
        "desc": "Recasts a second burst if the first connected or just ended. A weaker close shoulder if not.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Third Check",
        "desc": "A third, heavier shoulder. Knocks down if used at the end of Second Burst.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Stutter In",
        "desc": "A short armored stutter-step that can cancel into Heel Spark.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Triple Burst",
      "desc": "All three bursts stay available, shoulders land faster, and Third Check becomes a wider crash.",
      "key": "G"
    }
  },
  {
    "name": "Syla Perrin",
    "number": 37,
    "element": "Lightning",
    "role": "Ranged (zoner)",
    "lore": "She learned late forks on the stacked roofs of Skyline Ward, covering a dash she could already see coming.",
    "moves": [
      {
        "key": "1",
        "name": "Fork Shot",
        "desc": "Fires a midrange bolt that branches once late, covering a dodge. Matte spark, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Late Split",
        "desc": "A heavier shot that splits later and wider, knocking a short step back on the first hit.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Cover Branch",
        "desc": "Recasts a late branch off a flying shot, or fires a short split cone if none is out.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Cannon Hop",
        "desc": "A short hop back that can cancel into Fork Shot.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Double Fork",
      "desc": "Shots fly faster, the late branch can split once more, and Late Split becomes a wider fork.",
      "key": "G"
    }
  },
  {
    "name": "Orvan Kess",
    "number": 38,
    "element": "Lightning",
    "role": "Tank",
    "lore": "He grounds runners in the stone yards of the Old Quarter, where a stopped dash has no side street left.",
    "moves": [
      {
        "key": "1",
        "name": "Grounding Maul",
        "desc": "A close maul slam that nails the foe to the floor for a beat if it hits.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Shock Anchor",
        "desc": "Slams a shock-anchor into the ground. The next jump or dash over it stops cold.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Nail Down",
        "desc": "A heavier slam. Knocks down if they were just nailed or stopped on the anchor.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Anchor Plant",
        "desc": "Plants the maul as a standing anchor and shoulders anyone who crosses it. He can recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Full Ground",
      "desc": "The anchor stays out, dashes and jumps over it fail, and Nail Down can be used twice in the window.",
      "key": "G"
    }
  },
  {
    "name": "Nixa Fel",
    "number": 39,
    "element": "Lightning",
    "role": "Trickster",
    "lore": "She strings tripwires between the stall frames of Lantern Market and kites a chase into its own step.",
    "moves": [
      {
        "key": "1",
        "name": "Tripwire",
        "desc": "Lays an almost-invisible spark line on the ground. Matte spark, no glow. A faint tell marks the ends.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Wire Kite",
        "desc": "A short dash along or through her own wires without triggering them.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Cross Stun",
        "desc": "Anyone who crosses a wire is stunned for a beat. Recast to arm a pulse if they are already on a line.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Line Drop",
        "desc": "Drops a second lingering wire at a right angle, forming a small trap.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Live Wires",
      "desc": "Two wires stay out, Wire Kite can be used twice, and Cross Stun knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Elaris Moen",
    "number": 40,
    "element": "Lightning",
    "role": "Support",
    "lore": "She drapes the veil in the recovery rooms on Academy Hill, shortening a stun before it can settle.",
    "moves": [
      {
        "key": "1",
        "name": "Static Veil",
        "desc": "Drapes a short veil that shortens stun time on allies \u2014 or Elaris, in a duel.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Ground Ally",
        "desc": "Grounds a teammate \u2014 or herself \u2014 so they cannot be shocked or frozen for a short window.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Short Stun",
        "desc": "Instantly cuts one stun or freeze on the veiled fighter.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Veil Shift",
        "desc": "Relocates the veil, or plants one if none is out.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Held Veil",
      "desc": "The veil widens, stun and freeze fail for the window, and Ground Ally can be used twice.",
      "key": "G"
    }
  },
  {
    "name": "Raddik Kolg",
    "number": 41,
    "element": "Earth",
    "role": "Tank",
    "lore": "He grows a half-wall in the stone lanes of the Old Quarter and shoulders anyone who tries the top.",
    "moves": [
      {
        "key": "1",
        "name": "Stone Pauldron",
        "desc": "Grows the pauldron into a short half-wall that blocks the front.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Short Rampart",
        "desc": "Raises a short rampart and slowly closes the walkable gap.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Shoulder Off",
        "desc": "Shoulders anyone on or against the rampart off it. A close shoulder if none is up.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Rampart Plant",
        "desc": "Plants the rampart as cover. He can recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Half Wall",
      "desc": "The rampart stays up and widens into a half-wall, and Shoulder Off knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Ryn Kaer",
    "number": 42,
    "element": "Earth",
    "role": "Rushdown",
    "lore": "He learned that leap-and-ridge on the sparring stones of Academy Plaza, landing hard enough to ride the floor.",
    "moves": [
      {
        "key": "1",
        "name": "Pile Driver",
        "desc": "A short leap that slams the gauntlets and spikes the floor on landing. Matte stone, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Shock Ridge",
        "desc": "Rides the resulting shock-ridge into a second hit. A close slam if no ridge is out.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Floor Spike",
        "desc": "A low slam that knocks down grounded foes and clips dashes on the ridge.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Slam In",
        "desc": "A short armored leap-in that can cancel into Pile Driver.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Driven Floor",
      "desc": "The ridge stays out, Pile Driver can be recast, and Shock Ridge becomes a wider second hit.",
      "key": "G"
    }
  },
  {
    "name": "Selka Morb",
    "number": 43,
    "element": "Earth",
    "role": "Ranged (zoner)",
    "lore": "She packs clay on the work lots behind Gold Harbor and times the pillars to a runner's step.",
    "moves": [
      {
        "key": "1",
        "name": "Packed Clay",
        "desc": "Lobs a midrange packed clay shot from the sling-staff. Matte clay, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Delay Stone",
        "desc": "A delaying stone that arms on a beat, then erupts into a stumbling pillar.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Pillar Erupt",
        "desc": "Erupts every armed stone into pillars at once.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Sling Hop",
        "desc": "A short hop back that can cancel into Packed Clay.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Full Sling",
      "desc": "Stones fly farther, two can stay armed, and Pillar Erupt becomes a wider row.",
      "key": "G"
    }
  },
  {
    "name": "Remm Arroyo",
    "number": 44,
    "element": "Earth",
    "role": "Trickster",
    "lore": "He loosens tiles in the back aisles of Lantern Market, where a dash has to trust the floor.",
    "moves": [
      {
        "key": "1",
        "name": "Sink Trap",
        "desc": "Softens a tile into a sink-trap. A dash across it drops into a brief dip. Matte silt, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Dip Tag",
        "desc": "A poke in the dip. Deals more if they just dropped into a trap.",
        "cooldown": 7
      },
      {
        "key": "3",
        "name": "Soft Tile",
        "desc": "Loosens a second tile a short step away, or relocates an existing trap.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Dash Drop",
        "desc": "The next enemy dash near a trap auto-drops them and briefly snags footing. Visible tell on the loosened tile.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Open Floor",
      "desc": "Two traps stay out, dips last longer, and Dip Tag knocks down if they fell in.",
      "key": "G"
    }
  },
  {
    "name": "Hala Marn",
    "number": 45,
    "element": "Earth",
    "role": "Support",
    "lore": "She plants lodestone charms on the practice terraces of Academy Hill, teaching a teammate when to stay down and when to jump.",
    "moves": [
      {
        "key": "1",
        "name": "Lodestone",
        "desc": "Plants a lodestone charm that steadies ally footing \u2014 or Hala's, in a duel \u2014 in a short circle.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Lock Ground",
        "desc": "Locks a teammate \u2014 or herself \u2014 to the ground so the next launch fails.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Release Jump",
        "desc": "Releases the lock into a short jump or air-dash refund.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Charm Place",
        "desc": "Relocates the lodestone, or plants one if none is out.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Held Stone",
      "desc": "The circle widens, launches fail for the window, and Release Jump can be used twice.",
      "key": "G"
    }
  },
  {
    "name": "Torva Ghlen",
    "number": 46,
    "element": "Earth",
    "role": "Tank",
    "lore": "She rolls a stone door through the tight gates of the Old Quarter and pinches a chase against the wall.",
    "moves": [
      {
        "key": "1",
        "name": "Stone Door",
        "desc": "Pushes a circular stone slab as cover that blocks the front.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Lane Ram",
        "desc": "Rolls the door across the lane, shoving anyone in the path.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Wall Pinch",
        "desc": "Pinches a foe between the door and a wall or the edge. A close shove if the door is not out.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Door Plant",
        "desc": "Plants the door as standing cover. She can recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Rolling Slab",
      "desc": "The door stays out, Lane Ram can be used twice, and Wall Pinch knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Isken Reln",
    "number": 47,
    "element": "Earth",
    "role": "Rushdown",
    "lore": "He feints and extends on the open tiles of Academy Plaza, where a longer fist can catch a fading guard.",
    "moves": [
      {
        "key": "1",
        "name": "Knuckle Stone",
        "desc": "A close punch. Recast to lengthen the next punch's reach for one hit. Matte stone, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Heavy Feint",
        "desc": "A heavy feint with a visible tell, then a delayed punch. Can cancel into the lengthened reach.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Through Guard",
        "desc": "Extends a stone fist that chips a held guard for a beat. A well-timed parry still beats it. Weaker if they are not guarding.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Fist In",
        "desc": "A short armored step-in that can cancel into Knuckle Stone.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Long Knuckle",
      "desc": "The reach stays lengthened, Through Guard lands faster, and the last punch knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Belha Coru",
    "number": 48,
    "element": "Earth",
    "role": "Ranged (zoner)",
    "lore": "She marks floors from the high walks of Skyline Ward and lets the bump arrive a beat later.",
    "moves": [
      {
        "key": "1",
        "name": "Seismic Tap",
        "desc": "Taps the ground and a delayed bump rises at a midrange mark. Matte tremor, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Mark Bump",
        "desc": "Places a visible mark. The next Seismic Tap lands on the mark and knocks up.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Floor Knock",
        "desc": "A heavier delayed bump. Knocks up higher if they are standing on a mark.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Mallet Hop",
        "desc": "A short hop back that can cancel into Seismic Tap.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Deep Tremor",
      "desc": "Taps land faster, marks linger, and Floor Knock becomes a wider bump.",
      "key": "G"
    }
  },
  {
    "name": "Codi Vetch",
    "number": 49,
    "element": "Earth",
    "role": "Trickster",
    "lore": "She stacks decoy cairns among the stall goods of Lantern Market and drops them on a committed swing.",
    "moves": [
      {
        "key": "1",
        "name": "Decoy Cairn",
        "desc": "Stacks a decoy cairn that reads as her silhouette.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Duck Stack",
        "desc": "Ducks behind the cairn, or plants one and ducks if none is out.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Collapse Stack",
        "desc": "Collapses the cairn onto a foe. Deals more if they just whiffed a swing at it.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Cairn Bait",
        "desc": "The next hit on a cairn auto-collapses it and knocks the attacker down for a beat. Visible tell on the stones.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Twin Cairns",
      "desc": "Two cairns stay out, Duck Stack costs no cooldown, and Collapse Stack knocks down if they whiffed.",
      "key": "G"
    }
  },
  {
    "name": "Esren Talc",
    "number": 50,
    "element": "Earth",
    "role": "Support",
    "lore": "He packs clay in the clinic yards on Academy Hill, sealing a crack in cover the same way he seals a wound.",
    "moves": [
      {
        "key": "1",
        "name": "Packing Clay",
        "desc": "Seals wounds in a short circle. Allies \u2014 or Esren, in a duel \u2014 slowly recover health, and cracked cover in the circle is rebuilt.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Harden Box",
        "desc": "Briefly hardens a teammate's hurtbox \u2014 or his own \u2014 so hits land softer for a few beats.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Seal Crack",
        "desc": "Rebuilds a nearby piece of broken cover, or plants a short clay berm if none is there.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Clay Place",
        "desc": "Relocates the circle, or plants one if none is out.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Packed Field",
      "desc": "The circle widens, cover stays rebuilt, and Harden Box lasts the window.",
      "key": "G"
    }
  },
  {
    "name": "Mirelle Voss",
    "number": 51,
    "element": "Water",
    "role": "Ranged (zoner)",
    "lore": "She practiced her aim on the rain-chains and tower cisterns of Skyline Ward.",
    "moves": [
      {
        "key": "1",
        "name": "Heavy Drop",
        "desc": "Looses a midrange droplet that soaks the first fighter it hits. Matte water, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Tide Draw",
        "desc": "A heavier charged droplet that soaks twice and knocks a short step back.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Far Knock",
        "desc": "A close bow-bash. Knocks much farther if the target is soaked, and consumes the soak.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Drop Back",
        "desc": "A short hop back that leaves a lingering droplet on the ground as a soak mine.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Full Draw",
      "desc": "Bolts fire faster, soak lingers, and Far Knock becomes a wider matte blast.",
      "key": "G"
    }
  },
  {
    "name": "Kade Burel",
    "number": 52,
    "element": "Water",
    "role": "Rushdown",
    "lore": "He learned to fight by racing the wet dock boards at Gold Harbor when the tide came in.",
    "moves": [
      {
        "key": "1",
        "name": "Jet Step",
        "desc": "A short low slide that leaves a wet path. Recast while the path lasts to slide again. Matte jet, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Crest Break",
        "desc": "A close pressurized uppercut. Pops the foe if used at the end of a Jet Step.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Jet Sweep",
        "desc": "A low kick along the wet path that knocks down grounded foes and clips dashes.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Crash In",
        "desc": "A short armored step-in that can cancel into Crest Break.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Spring Tide",
      "desc": "For the window, the path stays out, Jet Step can be recast freely, and Crest Break becomes a wider crash.",
      "key": "G"
    }
  },
  {
    "name": "Thalen Mire",
    "number": 53,
    "element": "Water",
    "role": "Tank",
    "lore": "He maps the flooded stone lanes around the Old Quarter shrine and carries that held-pool weight into a duel.",
    "moves": [
      {
        "key": "1",
        "name": "Weight Cloak",
        "desc": "Thickens the cloak into a shield that blocks the front and soaks hits by bleeding their momentum into the fabric.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Slam Weight",
        "desc": "Slams the stored weight out in a tight burst. Stronger if the cloak just soaked hits.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Sink Hit",
        "desc": "The next hit on the cloak pulls the attacker a step closer.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Drape Plant",
        "desc": "Plants the weighted cloak as cover and shoulders anyone who crosses it. He can recall it.",
        "cooldown": 10
      }
    ],
    "awakening": {
      "name": "Full Weight",
      "desc": "The cloak stays thickened, soaked hits add more slam, and Slam Weight can be used twice in the window.",
      "key": "G"
    }
  },
  {
    "name": "Senni Drowl",
    "number": 54,
    "element": "Water",
    "role": "Trickster",
    "lore": "She disappears in the stall steam and spilled wash-water of Lantern Market.",
    "moves": [
      {
        "key": "1",
        "name": "Mirror Puddle",
        "desc": "Tosses a shallow mirror-puddle that holds a faint silhouette. Matte water, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Puddle Step",
        "desc": "Steps into a puddle and exits from another at a new angle, with her facing inverted. If only one is out, she leaves a second at her old spot.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Angle Cut",
        "desc": "A short slash from the farthest puddle's facing. If no puddle is out, a close slash that leaves one.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Invert Bait",
        "desc": "The next hit on a puddle auto-steps her out at a new angle and inverts the attacker's facing for a beat. Visible tell on the water.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "All Angles",
      "desc": "Two puddles stay active, Puddle Step costs no cooldown, and exits leave a lingering slick that slows dashes.",
      "key": "G"
    }
  },
  {
    "name": "Wessa Dorn",
    "number": 55,
    "element": "Water",
    "role": "Support",
    "lore": "She tends the courtyard cisterns on Academy Hill and carries that clean-water ewer into a fight.",
    "moves": [
      {
        "key": "1",
        "name": "Clean Rinse",
        "desc": "Pours a short clean-water wash that rinses burn, shock, or slow from a teammate, or from Wessa in a duel.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Cool Burn",
        "desc": "A focused pour that cools burns faster and briefly cuts incoming flame damage.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Slick Floor",
        "desc": "Leaves a short slick behind the rinsed ally (or herself) that slows dashes and footing.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Ewer Toss",
        "desc": "Tosses the ewer a short distance and rinses whoever it lands on, then can be recalled.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Clear Water",
      "desc": "Rinses last the window, slicks spread wider, and flame attacks in the slick fall short.",
      "key": "G"
    }
  },
  {
    "name": "Rokai Bell",
    "number": 56,
    "element": "Water",
    "role": "Rushdown (grappler)",
    "lore": "A mooring hand at Gold Harbor who turned a tide-chain into a fighter's line.",
    "moves": [
      {
        "key": "1",
        "name": "Tide Clasp",
        "desc": "A close-to-mid chain that snags an ankle and holds if it connects. Visible swing; a parry breaks it.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Yank Through",
        "desc": "Yanks a snagged foe in and crashes through them. A weaker close shove if nobody is snagged.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Ankle Sweep",
        "desc": "A low chain swing that knocks down grounded foes and clips dashes.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Clasp Rush",
        "desc": "A short armored step-in that can cancel into Tide Clasp.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Crashing Tide",
      "desc": "The chain stays out, yanks land faster, and Yank Through becomes a wider crash at the end of the window.",
      "key": "G"
    }
  },
  {
    "name": "Leta Shun",
    "number": 57,
    "element": "Water",
    "role": "Ranged (zoner)",
    "lore": "An Academy Plaza student who trained her packed-water harpoon on the open fountain square.",
    "moves": [
      {
        "key": "1",
        "name": "Packed Spear",
        "desc": "Throws a midrange harpoon of packed water. Recast once while it flies to bend it onto a new line. Matte water, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Wide Splash",
        "desc": "Bursts the spear into a wide matte splash, in flight or stuck in a target.",
        "cooldown": 11
      },
      {
        "key": "3",
        "name": "Spear Pin",
        "desc": "A heavier throw that pins briefly if it hits, then can still be burst.",
        "cooldown": 9
      },
      {
        "key": "4",
        "name": "Draw Back",
        "desc": "A short hop back that can cancel into Packed Spear.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Full Cast",
      "desc": "Spears fly faster, the mid-flight redirect can be used twice, and Wide Splash becomes a broader ring.",
      "key": "G"
    }
  },
  {
    "name": "Cadric Lowe",
    "number": 58,
    "element": "Water",
    "role": "Tank",
    "lore": "He stands the Gold Harbor sluice gates when storms hit the pier.",
    "moves": [
      {
        "key": "1",
        "name": "Sluice Gate",
        "desc": "Raises a short frontal sluice-gate that blocks the front and absorbs a few hits.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Dump Wave",
        "desc": "Drops the gate and dumps a wave that shoves the lane back. Knocks down if they were on wet ground.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Undertow",
        "desc": "Anyone who hits the gate is briefly pulled a step closer.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Flood Plant",
        "desc": "Plants the gate as cover and soaks the ground in front of it. He can recall it.",
        "cooldown": 10
      }
    ],
    "awakening": {
      "name": "Open Sluice",
      "desc": "The gate stays up, the ground stays flooded, and Dump Wave can be used twice in the window.",
      "key": "G"
    }
  },
  {
    "name": "Pelin Nivir",
    "number": 59,
    "element": "Water",
    "role": "Trickster",
    "lore": "He runs the rooftop gutters and bridge rails of Skyline Ward, and rarely starts a fight on the same roof he finishes it.",
    "moves": [
      {
        "key": "1",
        "name": "Bubble Decoy",
        "desc": "Throws a walking bubble-decoy that offsets to one side and copies his movement for a few seconds.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Hidden Dash",
        "desc": "Hides a short dash inside a burst of bubbles. The decoy can dash first; he can follow or stay.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Side Poke",
        "desc": "A slash from his real position, from the side. Deals more if they just swung at a decoy.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Pop Blind",
        "desc": "Pops a decoy, or a tight bubble burst, into a brief blind in a small radius. Matte spray, no glow.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Full Burst",
      "desc": "Two decoys stay out, Hidden Dash can be used twice, and Side Poke knocks down if they whiffed on a decoy.",
      "key": "G"
    }
  },
  {
    "name": "Serin Aule",
    "number": 60,
    "element": "Water",
    "role": "Support",
    "lore": "She plants her rain standard by the Academy Plaza fountain, where first-years learn to stand their ground.",
    "moves": [
      {
        "key": "1",
        "name": "Rain Standard",
        "desc": "Plants a soft rain circle where allies (or Serin, in a duel) slowly recover health and stamina.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Soft Shift",
        "desc": "Relocates the standard a short distance, or steadies a teammate's footing \u2014 or her own \u2014 and cancels one knockback if no standard is out.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Douse Flame",
        "desc": "Fire attacks in the circle lose damage and range for a beat.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Standard Shift",
        "desc": "Relocates to the standard and leaves a brief heal puddle at the old spot.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Held Rain",
      "desc": "The circle widens, recovery speeds up, and fire attacks in the rain fall short for the window.",
      "key": "G"
    }
  },
  {
    "name": "Velin Korr",
    "number": 61,
    "element": "Shadow",
    "role": "Rushdown",
    "lore": "He closes from the blind corners of the Old Quarter and saves the cut for the way out.",
    "moves": [
      {
        "key": "1",
        "name": "Umbral Close",
        "desc": "Closes from a blind angle with the short blade. Matte shade, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Exit Cut",
        "desc": "Cuts on the exit, not the entry. Deals more if Umbral Close just landed.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Lengthen Blade",
        "desc": "The blade lengthens in the dark of a swing, adding a short reach to the next cut.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Blind In",
        "desc": "A short armored step-in that can cancel into Umbral Close.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Dark Swing",
      "desc": "The blade stays lengthened, Exit Cut lands faster, and the last cut knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Naev Ruhl",
    "number": 62,
    "element": "Shadow",
    "role": "Ranged (zoner)",
    "lore": "She looses silent tethers from the high walks of Skyline Ward and yanks a runner into a darker tile.",
    "moves": [
      {
        "key": "1",
        "name": "Shade Tether",
        "desc": "Looses a midrange silent tether that pins the first fighter it hits. Matte shade, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Yank Tile",
        "desc": "Yanks a tethered foe toward a darker tile, or toward Naev if no tile is marked.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Dark Tile",
        "desc": "Marks a darker tile on the ground. The next yank lands there.",
        "cooldown": 9
      },
      {
        "key": "4",
        "name": "Tether Hop",
        "desc": "A short hop back that can cancel into Shade Tether.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Full Tether",
      "desc": "Tethers fly faster, the pin lingers, and Yank Tile knocks down at the end of the window.",
      "key": "G"
    }
  },
  {
    "name": "Morven Gath",
    "number": 63,
    "element": "Shadow",
    "role": "Tank",
    "lore": "He soaks a burst in the cloak on the night docks at Gold Harbor and drops the weight when the lane is full.",
    "moves": [
      {
        "key": "1",
        "name": "Shade Cloak",
        "desc": "Thickens the cloak into a wall that blocks the front and soaks a burst into the fabric.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Drop Weight",
        "desc": "Drops the soaked weight as a knockdown. Stronger if the cloak just soaked a burst.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Soak Burst",
        "desc": "The next burst or heavy on the cloak is soaked and stored at a higher rate.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Cloak Plant",
        "desc": "Plants the thickened cloak as cover and shoulders anyone who crosses it. He can recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Heavy Shade",
      "desc": "The cloak stays thickened, soaked bursts add more drop, and Drop Weight can be used twice in the window.",
      "key": "G"
    }
  },
  {
    "name": "Kessia Vyn",
    "number": 64,
    "element": "Shadow",
    "role": "Trickster",
    "lore": "She peels silhouettes in the aisles of Lantern Market and swaps the moment a swing is about to land.",
    "moves": [
      {
        "key": "1",
        "name": "Peel Silhouette",
        "desc": "Peels away a silhouette that walks three steps alone. Matte shade, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Early Swap",
        "desc": "Swaps with the silhouette just as it is about to be hit, or recast to swap now.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Three Steps",
        "desc": "Sends the silhouette three steps forward as a fake walk. If none is out, peels one and walks it.",
        "cooldown": 9
      },
      {
        "key": "4",
        "name": "Peel Bait",
        "desc": "The next hit about to land on a silhouette auto-swaps her and leaves the attacker swinging at air. Visible tell on the peel.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Twin Peels",
      "desc": "Two silhouettes stay out, Early Swap costs no cooldown, and a swap knocks the attacker a step off.",
      "key": "G"
    }
  },
  {
    "name": "Dael Suth",
    "number": 65,
    "element": "Shadow",
    "role": "Support",
    "lore": "He dims startup tells in the quiet halls on Academy Hill, giving a teammate one breath that is harder to read.",
    "moves": [
      {
        "key": "1",
        "name": "Shade Lantern",
        "desc": "Holds a short dim circle that hides ally tells \u2014 or Dael's, in a duel \u2014 for a breath.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Hide Tell",
        "desc": "Dims a teammate's startup frames \u2014 or his own \u2014 so their next move is harder to read.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Soft Startup",
        "desc": "Shortens the circled fighter's next startup by a breath and hides the dash tell.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Shade Place",
        "desc": "Relocates the circle, or plants one if none is out.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Held Dim",
      "desc": "The circle widens, startup tells stay hidden, and Hide Tell can be used twice.",
      "key": "G"
    }
  },
  {
    "name": "Rael Dask",
    "number": 66,
    "element": "Shadow",
    "role": "Rushdown",
    "lore": "He takes two gaps across the tiles of Academy Plaza and is already leaving when the after-cut lands.",
    "moves": [
      {
        "key": "1",
        "name": "Step Knife",
        "desc": "A quick gap-in with a step-knife. Leaves a dark after-cut on the path. Matte shade, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Second Gap",
        "desc": "A second quick gap-in. Deals more if an after-cut is still on the path.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Way Out",
        "desc": "A cut on the way out, then he is already leaving. No long linger.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "After Cut",
        "desc": "Detonates a lingering after-cut in a tight slash, or plants one with a short step if none is out.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Twin Gaps",
      "desc": "After-cuts linger, Second Gap can be used freely, and Way Out knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Ysol Fane",
    "number": 67,
    "element": "Shadow",
    "role": "Ranged (zoner)",
    "lore": "She sets quiet discs along the roof lanes of Skyline Ward and waits for a dash to arm them.",
    "moves": [
      {
        "key": "1",
        "name": "Shade Disc",
        "desc": "Fires a midrange disc of shade that lingers on the ground. Matte shade, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Dash Detonate",
        "desc": "Arms lingering discs to detonate if the opponent dashes through them.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Disc Burst",
        "desc": "Detonates every lingering disc at once in a tight burst.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Longarm Hop",
        "desc": "A short hop back that can cancel into Shade Disc.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Held Discs",
      "desc": "Discs linger longer, stay armed, and Disc Burst becomes a wider ring.",
      "key": "G"
    }
  },
  {
    "name": "Bruk Selt",
    "number": 68,
    "element": "Shadow",
    "role": "Tank",
    "lore": "He erases midrange shots on the night pier at Gold Harbor and answers before the shooter can recover.",
    "moves": [
      {
        "key": "1",
        "name": "Shade Pavise",
        "desc": "Raises a shade-pavise that blocks the front and erases an incoming projectile that hits it. Matte shade, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Vanish Shot",
        "desc": "Makes a midrange shot vanish on contact with the pavise, then opens a short punish window.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Short Punish",
        "desc": "A short punish step after a vanished shot or a block. Knocks down if a shot just vanished.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Erase Plant",
        "desc": "Plants the pavise as cover that still erases one projectile. He can recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Full Erase",
      "desc": "The pavise stays up, projectiles that touch it vanish, and Short Punish can be used twice in the window.",
      "key": "G"
    }
  },
  {
    "name": "Pixa Noll",
    "number": 69,
    "element": "Shadow",
    "role": "Trickster",
    "lore": "She snuffs lantern light in the side aisles of Lantern Market and reappears crouched behind the chase.",
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
    "name": "Hestira Qan",
    "number": 70,
    "element": "Shadow",
    "role": "Support",
    "lore": "She rings the hush-bell across Academy Plaza so a teammate's next approach arrives without a dash tell.",
    "moves": [
      {
        "key": "1",
        "name": "Hush Bell",
        "desc": "Rings a short hush circle that shortens the sound of allied footsteps \u2014 or Hestira's, in a duel.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Quiet Approach",
        "desc": "Lets a teammate's next approach \u2014 or her own \u2014 arrive without a dash tell.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Soft Foot",
        "desc": "Shortens footsteps in the circle and refunds a little dash stamina.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Hush Place",
        "desc": "Relocates the circle, or plants one if none is out.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Held Hush",
      "desc": "The circle widens, dash tells stay hidden, and Quiet Approach can be used twice.",
      "key": "G"
    }
  },
  {
    "name": "Lior Stell",
    "number": 71,
    "element": "Light",
    "role": "Rushdown",
    "lore": "He opens with that first-swing flash on the sparring tiles of Academy Plaza, then converts the stumble into a rush.",
    "moves": [
      {
        "key": "1",
        "name": "Flare Edge",
        "desc": "A first swing that flashes and flinches the foe for a beat. Matte flare, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Stumble Rush",
        "desc": "Converts the flinch into a short rush string. Weaker if they did not flinch.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Blind Beat",
        "desc": "A wider first-swing flash in a short cone that flinches anyone looking at it.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Edge In",
        "desc": "A short armored step-in that can cancel into Flare Edge.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Open Flare",
      "desc": "The first swing always flinches, Stumble Rush lands faster, and Blind Beat knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Solaen Mirth",
    "number": 72,
    "element": "Light",
    "role": "Ranged (zoner)",
    "lore": "He draws grooves in the open air off Skyline Ward and looses the beam only when the line is true.",
    "moves": [
      {
        "key": "1",
        "name": "Lens Beam",
        "desc": "Charges a visible groove in the air, then looses a tight midrange beam down it. Matte light, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Held Groove",
        "desc": "Holds the groove longer so the beam travels farther and knocks a short step back.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Groove Cut",
        "desc": "A close bow-bash along the last groove. Deals more if the beam just tagged them.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Lens Hop",
        "desc": "A short hop back that can cancel into Lens Beam.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Full Lens",
      "desc": "Beams fire faster, the groove lingers as a brief lane, and Groove Cut becomes a longer punish.",
      "key": "G"
    }
  },
  {
    "name": "Helior Bann",
    "number": 73,
    "element": "Light",
    "role": "Tank",
    "lore": "He holds the pavise in the stone gates of the Old Quarter, where a close block can buy the step-in.",
    "moves": [
      {
        "key": "1",
        "name": "Radiance Guard",
        "desc": "Raises a radiance pavise that blocks the front and flares on a successful block. Matte flare, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Block Blind",
        "desc": "The block itself blinds at close range for a beat, then he can step in.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Guard Step",
        "desc": "A short punish step after a block or blind. Knocks down if they just flinched.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Radiance Plant",
        "desc": "Plants the pavise as cover. He can recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Held Flare",
      "desc": "The pavise stays up, blocks always blind at close range, and Guard Step can be used twice in the window.",
      "key": "G"
    }
  },
  {
    "name": "Cira Pell",
    "number": 74,
    "element": "Light",
    "role": "Trickster",
    "lore": "She leaves bright stand-ins in the stall light of Lantern Market and slips out at a right angle.",
    "moves": [
      {
        "key": "1",
        "name": "Afterglow",
        "desc": "Leaves a bright silhouette stand-in. Matte flare, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Right Angle",
        "desc": "Slips out at a right angle from the stand-in. If none is out, a close slip that leaves one.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Stand-In Cut",
        "desc": "A slash from her real position. Deals more if they just swung at the silhouette.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Silhouette Bait",
        "desc": "The next hit on a stand-in auto-slips her out and flinches the attacker. Visible tell on the silhouette.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Twin Afterglow",
      "desc": "Two stand-ins stay out, Right Angle costs no cooldown, and Stand-In Cut knocks down if they whiffed.",
      "key": "G"
    }
  },
  {
    "name": "Elya Prae",
    "number": 75,
    "element": "Light",
    "role": "Support",
    "lore": "She keeps the clarion lantern in the recovery halls on Academy Hill, snapping a teammate out of a blind before it can settle.",
    "moves": [
      {
        "key": "1",
        "name": "Clarion Lantern",
        "desc": "Holds a short clarion circle that clears panic, darkness, and blinds for allies \u2014 or Elya, in a duel.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Snap Clear",
        "desc": "Snaps a teammate \u2014 or herself \u2014 out of a blind or slow.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Short Recover",
        "desc": "Shortens the circled fighter's next recover window by a beat.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Clarion Place",
        "desc": "Relocates the circle, or plants one if none is out.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Clear Dawn",
      "desc": "The circle widens, blinds and darkness fail for the window, and Short Recover can be used twice.",
      "key": "G"
    }
  },
  {
    "name": "Rafi Tollen",
    "number": 76,
    "element": "Light",
    "role": "Rushdown",
    "lore": "He dashes the length of the pier at Gold Harbor, hiding the tell for a frame and cutting on the flash.",
    "moves": [
      {
        "key": "1",
        "name": "Sun Thread",
        "desc": "A short dash that flashes at the end. Matte flare, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Late Cut",
        "desc": "The cut lands at the end of the dash. Deals more if Sun Thread just flashed.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Bright Frame",
        "desc": "A longer dash that hides its tell for a frame, then flashes. Costs a little stamina.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Thread In",
        "desc": "A short armored step-in that can cancel into Sun Thread.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Open Thread",
      "desc": "Dashes flash faster, Bright Frame can be used twice, and Late Cut knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Vianne Solc",
    "number": 77,
    "element": "Light",
    "role": "Ranged (zoner)",
    "lore": "She splits beams off the high courts of Skyline Ward, fanning a shot the moment it is blocked.",
    "moves": [
      {
        "key": "1",
        "name": "Prism Shot",
        "desc": "Looses a midrange beam from the prism staff. Matte light, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Block Fan",
        "desc": "If the first hit is blocked, the beam splits into a short cone. Recast to force the fan.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Split Cone",
        "desc": "A wider fan. Deals more if they just blocked the first shot.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Prism Hop",
        "desc": "A short hop back that can cancel into Prism Shot.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Full Prism",
      "desc": "Shots fly faster, the fan always splits, and Split Cone becomes a broader ring.",
      "key": "G"
    }
  },
  {
    "name": "Gorren Pike",
    "number": 78,
    "element": "Light",
    "role": "Tank",
    "lore": "He plants a bright-rim wall in the gates of the Old Quarter, stopping midrange shots before they can cross the lane.",
    "moves": [
      {
        "key": "1",
        "name": "Bright Rim",
        "desc": "Raises the bright-rim tower shield that blocks the front. Matte light, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Rim Wall",
        "desc": "Plants a lingering bright-rim wall that projectiles cannot cross for a short time.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Wall Shoulder",
        "desc": "Shoulders anyone who crosses or stands on the wall. A close shoulder if none is out.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Rim Plant",
        "desc": "Plants the shield as cover and leaves a short rim-wall segment. He can recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Held Rim",
      "desc": "The wall stays out, projectiles cannot cross it, and Wall Shoulder knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Tesen Wynn",
    "number": 79,
    "element": "Light",
    "role": "Trickster",
    "lore": "He flicks flare-coins across the side courts of Academy Plaza and hits during the flinch of the look.",
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
    "name": "Irin Daun",
    "number": 80,
    "element": "Light",
    "role": "Support",
    "lore": "She rings the dawn-bell in the recovery courts on Academy Hill, giving a teammate one beat back from hitstun.",
    "moves": [
      {
        "key": "1",
        "name": "Dawn Bell",
        "desc": "Rings a short window where allies \u2014 or Irin, in a duel \u2014 break out of hitstun a beat early.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Early Break",
        "desc": "Instantly breaks one hitstun on a teammate \u2014 or herself \u2014 inside the window.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Recover Ring",
        "desc": "Extends the recover window by a breath and refunds a little stamina.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Bell Place",
        "desc": "Relocates the ring, or plants one if none is out.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Held Dawn",
      "desc": "The window lasts the Setsuna, hitstun breaks stay early, and Early Break can be used twice.",
      "key": "G"
    }
  },
  {
    "name": "Kaedron Ilv",
    "number": 81,
    "element": "Metal",
    "role": "Rushdown",
    "lore": "He clicks the edges out on the sparring tiles of Academy Plaza, finishing a string without ever shifting his feet.",
    "moves": [
      {
        "key": "1",
        "name": "Edge Click",
        "desc": "Clicks the edge-bracers out mid-string and converts the last punch into a cut. Matte metal, no glow.",
        "cooldown": 7
      },
      {
        "key": "2",
        "name": "Cutting Finish",
        "desc": "A stance-still cutting finisher. Stronger if Edge Click just landed.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Click String",
        "desc": "A tight punch string. The last hit can cancel into Edge Click.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Bracer In",
        "desc": "A short armored step-in that can cancel into Edge Click.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Live Edges",
      "desc": "Bracers stay out, every last hit cuts, and Cutting Finish knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Sera Lind",
    "number": 82,
    "element": "Metal",
    "role": "Ranged (zoner)",
    "lore": "She tags runners from the high rails of Skyline Ward and lets the second slug correct once.",
    "moves": [
      {
        "key": "1",
        "name": "Silent Slug",
        "desc": "Fires a midrange silent slug from the rail-arc. Matte metal, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Tracer Tag",
        "desc": "Tags the first fighter it hits. The next Silent Slug home-corrects once toward the tag.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Corrected Shot",
        "desc": "A heavier slug that always home-corrects once if a tag is out, and knocks a short step back.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Arc Hop",
        "desc": "A short hop back that can cancel into Silent Slug.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Tight Rail",
      "desc": "Slugs fire faster, the tag lingers, and Corrected Shot can correct twice.",
      "key": "G"
    }
  },
  {
    "name": "Bolgir Hess",
    "number": 83,
    "element": "Metal",
    "role": "Tank",
    "lore": "He locks a plate bunker in the narrow gates of the Old Quarter, then unhinges it when the lane is full.",
    "moves": [
      {
        "key": "1",
        "name": "Plate Bunker",
        "desc": "Locks interlocking plates into a bunker that blocks the front and makes him hard to launch.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Unhinge Shove",
        "desc": "Unhinges the bunker into a shove that pushes the lane back.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Lock Down",
        "desc": "Hardens the bunker for a beat and pulses a short knockback if it was hit.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Bunker Plant",
        "desc": "Plants the bunker as cover. He can recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Full Bunker",
      "desc": "The bunker stays locked, launches fail, and Unhinge Shove can be used twice in the window.",
      "key": "G"
    }
  },
  {
    "name": "Tiv Arlo",
    "number": 84,
    "element": "Metal",
    "role": "Trickster",
    "lore": "She tosses plates between the stall frames of Lantern Market and snaps to them the moment a chase commits.",
    "moves": [
      {
        "key": "1",
        "name": "Toss Plate",
        "desc": "Throws a metal plate that holds a faint mark. Matte metal, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Magnet Step",
        "desc": "Snaps to the plate with her soles. If no plate is out, a short step that leaves one.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Commit Blink",
        "desc": "Recast blinks her to the plate when they commit. Deals a short slash on arrival.",
        "cooldown": 9
      },
      {
        "key": "4",
        "name": "Plate Bait",
        "desc": "The next hit near a plate auto-snaps her to it and knocks the attacker a step off. Visible tell on the plate.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Twin Plates",
      "desc": "Two plates stay out, Magnet Step costs no cooldown, and Commit Blink knocks down if they whiffed.",
      "key": "G"
    }
  },
  {
    "name": "Mael Ives",
    "number": 85,
    "element": "Metal",
    "role": "Support",
    "lore": "He retunes gear in the workshop bays on Academy Hill, shaving a beat off a cooldown without rushing the fight.",
    "moves": [
      {
        "key": "1",
        "name": "Field Kit",
        "desc": "Retunes ally gear in a short circle. Allies \u2014 or Mael, in a duel \u2014 get a beat shaved off their next cooldown.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Harden Block",
        "desc": "Hardens a teammate's next block \u2014 or his own \u2014 so it holds longer and drains less stamina.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Retune Gear",
        "desc": "Clears a jam, burn, or slow on the circled fighter and refunds a little stamina.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Kit Place",
        "desc": "Relocates the kit circle, or plants one if none is out.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Live Kit",
      "desc": "The circle widens, cooldown shaves last the window, and Harden Block lasts the window.",
      "key": "G"
    }
  },
  {
    "name": "Droven Kalei",
    "number": 86,
    "element": "Metal",
    "role": "Rushdown",
    "lore": "He times the third extension on the open pier at Gold Harbor, catching a dash that thought it was already out.",
    "moves": [
      {
        "key": "1",
        "name": "Short Baton",
        "desc": "Two short baton hits at close range. Matte metal, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Third Extend",
        "desc": "Extends the baton on a long poke. Breaks a fading dash if used as the third hit.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Long Poke",
        "desc": "A midrange extended poke. Deals more if Short Baton just landed.",
        "cooldown": 8
      },
      {
        "key": "4",
        "name": "Baton In",
        "desc": "A short armored step-in that can cancel into Short Baton.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Full Extend",
      "desc": "The baton stays extended, Third Extend lands faster, and Long Poke knocks down on a faded dash.",
      "key": "G"
    }
  },
  {
    "name": "Yare Vint",
    "number": 87,
    "element": "Metal",
    "role": "Ranged (zoner)",
    "lore": "She banks discs off the tower corners of Skyline Ward and catches a runner on the way back.",
    "moves": [
      {
        "key": "1",
        "name": "Bank Disc",
        "desc": "Looses a midrange disc that ricochets once off terrain. Matte metal, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Rebound Catch",
        "desc": "A heavier disc aimed to catch a runner on the rebound, knocking a short step back.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Cover Bank",
        "desc": "Banks a disc around cover along a marked bounce. If no wall is near, a straight midrange disc.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Disc Hop",
        "desc": "A short hop back that can cancel into Bank Disc.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Live Rebound",
      "desc": "Discs fly faster, can ricochet twice, and Rebound Catch becomes a wider bounce.",
      "key": "G"
    }
  },
  {
    "name": "Harvek Dunn",
    "number": 88,
    "element": "Metal",
    "role": "Tank",
    "lore": "He snaps into a fixture in the stone lanes of the Old Quarter, where a shove has to bounce or break.",
    "moves": [
      {
        "key": "1",
        "name": "Snap Anchor",
        "desc": "Snaps boots and shield together as an anchor, becoming a fixture in the lane.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Fixture Bounce",
        "desc": "Anyone who shoves or hits him while anchored bounces back. Recast to pulse the bounce.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Fixture Guard",
        "desc": "Hardens the anchor for a beat and makes him hard to launch.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Anchor Hold",
        "desc": "Plants the snapped shield as cover while he stays anchored. He can unsnap and recall it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Locked Fixture",
      "desc": "The anchor stays snapped, shoves bounce into a knockdown, and Fixture Bounce can be used twice in the window.",
      "key": "G"
    }
  },
  {
    "name": "Fen Qoru",
    "number": 89,
    "element": "Metal",
    "role": "Trickster",
    "lore": "He sends noisy plates down one aisle of Lantern Market and arrives from the quiet side.",
    "moves": [
      {
        "key": "1",
        "name": "Decoy Drone",
        "desc": "Sends a fist-sized, faceless plate-drone one way. It is noisy on purpose. Matte metal, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Quiet Slide",
        "desc": "Slides in from the quiet side while the drone holds attention.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Quiet Cut",
        "desc": "A slash from his real position. Deals more if they just swung at the drone.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Drone Bait",
        "desc": "The next hit on a drone auto-slides him in and flinches the attacker for a beat. Visible tell on the plate.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Twin Drones",
      "desc": "Two drones stay out, Quiet Slide can be used twice, and Quiet Cut knocks down if they whiffed on a drone.",
      "key": "G"
    }
  },
  {
    "name": "Ancel Rhom",
    "number": 90,
    "element": "Metal",
    "role": "Support",
    "lore": "He rings the fork in the workshop halls on Academy Hill, cooling a jam and tightening the next shot.",
    "moves": [
      {
        "key": "1",
        "name": "Tuning Fork",
        "desc": "Rings a short circle that steadies ally aim \u2014 or Ancel's, in a duel \u2014 and cools overheat.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Cool Overheat",
        "desc": "Clears a jam or burn on the circled fighter and cuts incoming flame damage for a beat.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Tight Path",
        "desc": "Gives their next shot \u2014 or Ancel's \u2014 a tighter, straighter path and a short range bump.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Fork Place",
        "desc": "Relocates the circle, or plants one if none is out.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Clear Tone",
      "desc": "The circle widens, aim stays steady, and Cool Overheat lasts the window.",
      "key": "G"
    }
  },
  {
    "name": "Mavira Mossel",
    "number": 91,
    "element": "Nature",
    "role": "Rushdown (grappler)",
    "lore": "She hooks and yanks in the sparring rings of Academy Plaza, where a held sleeve decides the exchange.",
    "moves": [
      {
        "key": "1",
        "name": "Thorn Hook",
        "desc": "A close hook from the gauntlets that snags a sleeve or ankle if it connects. Visible grab; a parry breaks it. Matte thorn, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Rising Knee",
        "desc": "Yanks a snagged foe in and hits a rising knee. A weaker close knee if nobody is snagged.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Hook Sweep",
        "desc": "A low hook that knocks down grounded foes and clips dashes.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Hook In",
        "desc": "A short armored step-in that can cancel into Thorn Hook.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Tight Thorns",
      "desc": "Hooks stay on, yanks land faster, and Rising Knee becomes a knockdown at the end of the window.",
      "key": "G"
    }
  },
  {
    "name": "Silea Varn",
    "number": 92,
    "element": "Nature",
    "role": "Ranged (zoner)",
    "lore": "She looses seed-shot from the high gardens of Skyline Ward and lets the snare arrive a beat late.",
    "moves": [
      {
        "key": "1",
        "name": "Seed Shot",
        "desc": "Looses a midrange seed-shot from the cane bow. Matte seed, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Late Snare",
        "desc": "The seed sprouts into a brief snare a beat after impact, or arms a seed already on the target.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Sprout Burst",
        "desc": "Bursts every sprouted snare in a tight ring.",
        "cooldown": 11
      },
      {
        "key": "4",
        "name": "Cane Hop",
        "desc": "A short hop back that can cancel into Seed Shot.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Live Cane",
      "desc": "Shots fly faster, snares linger, and Sprout Burst becomes a wider ring.",
      "key": "G"
    }
  },
  {
    "name": "Kald Eschen",
    "number": 93,
    "element": "Nature",
    "role": "Tank",
    "lore": "He holds a living pavise in the stone lanes of the Old Quarter and slowly closes the walkable gap.",
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
    "name": "Tavi Nelum",
    "number": 94,
    "element": "Nature",
    "role": "Trickster",
    "lore": "She drops pollen in the stall gaps of Lantern Market and tags from a crouch the moment the aisle blurs.",
    "moves": [
      {
        "key": "1",
        "name": "Pollen Burst",
        "desc": "A short cone of pollen that blurs vision for a beat. Matte pollen, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Puff Vanish",
        "desc": "Vanishes in a pollen puff and reappears at a crouched side-angle.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Side Tag",
        "desc": "A crouched tag from the side. Deals more if they just flinched in the pollen.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Blur Cone",
        "desc": "Drops a lingering pollen patch that hides her dash tell and blurs anyone who dashes through it.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Thick Pollen",
      "desc": "The cone widens, Puff Vanish can be used twice, and Side Tag knocks down if they flinched.",
      "key": "G"
    }
  },
  {
    "name": "Yiris Felg",
    "number": 95,
    "element": "Nature",
    "role": "Support",
    "lore": "She plants the salve-lantern in the clinic gardens on Academy Hill, thinning a status before it can settle.",
    "moves": [
      {
        "key": "1",
        "name": "Salve Lantern",
        "desc": "Plants a grove-circle where allies \u2014 or Yiris, in a duel \u2014 slowly recover health and harmful status is thinned.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Strip Status",
        "desc": "Strips a harmful status from the circled fighter and briefly cuts incoming poison or burn.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Grove Mend",
        "desc": "A focused mend pulse inside the circle. Recovery stays slow, so an even duel still sits in the 18\u201325s window.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Grove Shift",
        "desc": "Relocates the circle and leaves a brief mend at the old spot.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Open Grove",
      "desc": "The circle widens, recovery speeds up a little, and status cannot apply inside for the window.",
      "key": "G"
    }
  },
  {
    "name": "Roxen Veld",
    "number": 96,
    "element": "Nature",
    "role": "Rushdown (grappler)",
    "lore": "He snaps the vine in the narrow lanes of the Old Quarter, where a snag from just outside midrange closes the street.",
    "moves": [
      {
        "key": "1",
        "name": "Vine Snap",
        "desc": "Snaps the whip-vine from just outside midrange and snags if it connects. Visible swing; a parry breaks it.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Slam String",
        "desc": "Slams a snagged foe in and runs a short punch string. A weaker close string if nobody is snagged.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Belt Sweep",
        "desc": "A low vine sweep that knocks down grounded foes and clips dashes.",
        "cooldown": 7
      },
      {
        "key": "4",
        "name": "Snap In",
        "desc": "A short armored step-in that can cancel into Vine Snap.",
        "cooldown": 9
      }
    ],
    "awakening": {
      "name": "Live Vine",
      "desc": "The vine stays out, snags land faster, and Slam String becomes a wider crash at the end of the window.",
      "key": "G"
    }
  },
  {
    "name": "Ysra Belen",
    "number": 97,
    "element": "Nature",
    "role": "Ranged (zoner)",
    "lore": "She looses numbing thorns from the high walks of Skyline Ward and times the heavier shot to a slowed dash.",
    "moves": [
      {
        "key": "1",
        "name": "Numbing Thorn",
        "desc": "Looses a midrange numbing thorn from the dart-cane. Slows the target's next dash. Matte thorn, no glow.",
        "cooldown": 6
      },
      {
        "key": "2",
        "name": "Follow Shot",
        "desc": "A heavier follow-up shot. Deals more if the target is still numbed.",
        "cooldown": 9
      },
      {
        "key": "3",
        "name": "Dash Slow",
        "desc": "A wider thorn that arms a short patch; anyone who dashes through it is numbed.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Dart Hop",
        "desc": "A short hop back that can cancel into Numbing Thorn.",
        "cooldown": 8
      }
    ],
    "awakening": {
      "name": "Deep Numb",
      "desc": "Thorns fly faster, numbness lingers, and Follow Shot knocks a longer step back.",
      "key": "G"
    }
  },
  {
    "name": "Wolden Krag",
    "number": 98,
    "element": "Nature",
    "role": "Tank",
    "lore": "He anchors in the garden courts of Academy Hill and lets the zone answer anyone who swings in.",
    "moves": [
      {
        "key": "1",
        "name": "Root Anchor",
        "desc": "Nails himself to the floor with a root-anchor, becoming immovable, and spikes a short zone around him.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Zone Spike",
        "desc": "Pulses the root zone. Punishes anyone who is swinging into it.",
        "cooldown": 12
      },
      {
        "key": "3",
        "name": "Root Hold",
        "desc": "Hardens the anchor for a beat and knocks back anyone in the zone.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Root Zone",
        "desc": "Widens the spiked zone and plants it even if he un-anchors. He can re-anchor to it.",
        "cooldown": 11
      }
    ],
    "awakening": {
      "name": "Full Root",
      "desc": "The anchor stays in, the zone widens, and Zone Spike knocks down.",
      "key": "G"
    }
  },
  {
    "name": "Cassa Rhind",
    "number": 99,
    "element": "Nature",
    "role": "Trickster",
    "lore": "She snaps blooms under committed swings in Lantern Market and steps out behind the petals.",
    "moves": [
      {
        "key": "1",
        "name": "Snap Bloom",
        "desc": "Drops a snap-bloom that pops into a brief petaled screen. Matte petals, no glow.",
        "cooldown": 8
      },
      {
        "key": "2",
        "name": "Behind Petals",
        "desc": "Reappears behind the petals. If no bloom is out, a close drop that leaves one.",
        "cooldown": 10
      },
      {
        "key": "3",
        "name": "Whiff Bloom",
        "desc": "Drops a bloom under a committed swing. Deals a short burst if they just whiffed.",
        "cooldown": 9
      },
      {
        "key": "4",
        "name": "Petal Bait",
        "desc": "The next hit into the petals auto-moves her behind them and flinches the attacker. Visible tell on the bloom.",
        "cooldown": 13
      }
    ],
    "awakening": {
      "name": "Twin Blooms",
      "desc": "Two blooms stay out, Behind Petals costs no cooldown, and Whiff Bloom knocks down if they missed.",
      "key": "G"
    }
  },
  {
    "name": "Ophira Wend",
    "number": 100,
    "element": "Nature",
    "role": "Support",
    "lore": "She holds the censer by the Academy Plaza gardens, mending allies and ticking only the ones who step in to fight.",
    "moves": [
      {
        "key": "1",
        "name": "Pollen Censer",
        "desc": "Holds a mixed circle: allies \u2014 or Ophira, in a duel \u2014 slowly mend, and opponents inside take a light tick.",
        "cooldown": 12
      },
      {
        "key": "2",
        "name": "Shut Off",
        "desc": "Shuts the tick off before it can hurt a teammate, or recasts to turn it back on.",
        "cooldown": 8
      },
      {
        "key": "3",
        "name": "Close Tick",
        "desc": "Pulses a slightly stronger tick on opponents in the circle only.",
        "cooldown": 10
      },
      {
        "key": "4",
        "name": "Censer Place",
        "desc": "Relocates the circle, or plants one if none is out.",
        "cooldown": 14
      }
    ],
    "awakening": {
      "name": "Mixed Grove",
      "desc": "The circle widens, mending speeds up a little, and the tick no longer needs to be shut off around allies.",
      "key": "G"
    }
  },
  {
    "name": "Varek Ashe",
    "number": 101,
    "element": "Flame",
    "role": "Ranged (zoner)",
    "lore": "He learned his compact crimson pitches on the ash lots behind Gold Harbor.",
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
  }
];

const kitSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const FIGHTER_KITS = Object.fromEntries(FIGHTER_KITS_SOURCE.map((k) => [kitSlug(k.name), k]));
const kitAbilities = (k, el) => (typeof kitAbilitiesV13 === "function" ? kitAbilitiesV13(k, el) : [
  ...k.moves.map((m, i) => ({ key: m.key, slot: `Move ${["I", "II", "III", "IV"][i]}`, name: m.name, desc: m.desc, cd: m.cooldown, icon: m.icon || el })),
  { key: k.awakening.key || "G", slot: "Awakening", name: k.awakening.name, desc: k.awakening.desc, icon: k.awakening.icon || el },
]);
const KIT_SLOTS = [["1", "Move I"], ["2", "Move II"], ["3", "Move III"], ["4", "Move IV"], ["G", "Awakening"]];
const fallbackKit = (el) => KIT_SLOTS.map(([key, slot]) => ({ key, slot, name: "Kit coming soon", desc: "Ability details will be added when this fighter's kit is designed.", icon: el, ph: true }));

/* other content */
const MODES = [
  { name: "Ranked Duels", tab: "Ranked Duels", players: "1v1 · Coming soon",
    title: "One versus one.",
    text: "Pure skill matchups on a ranked ladder. Just you, your kit, and the next instant.",
    src: "assets/modes/ranked-duels.webp" },
  { name: "Squad Clash", tab: "Squad Clash", players: "3v3 · Best of 3 · Coming soon",
    title: "Three minds, one opening.",
    text: "Queue with a squad or get matched with two others. Best of three rounds, where combining Awakenings will win the round.",
    src: "assets/modes/squad-clash.webp" },
  { name: "Legion War", tab: "Legion War", players: "5v5 · Best of 3 · Coming soon",
    title: "Ten fighters. One field.",
    text: "A bigger arena and a full team, best of three. Hold the line, break the backline, and win the clutch moment together.",
    src: "assets/modes/legion-war.webp" },
  { name: "Aurel Bay Free-for-All", tab: "Aurel Bay<br>Free-for-All", players: "Open-city FFA · Coming soon",
    title: "The city never sleeps.",
    text: "Fight anyone you find in the streets of Aurel Bay, about 20 players per server, and queue for 1v1, 3v3 or 5v5 from inside the city.",
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
    desc: "One hundred fighters across ten elements. Kits are on every fighter page. Coded fighters show values from the current build; the rest are labeled Planned kit, not yet in game.",
    img: "assets/news/roster-maelis.webp", pos: "center", link: "#fighters" },
  { cat: "Dev update", date: "Nov 2026", title: "Four modes, coming soon",
    desc: "Ranked Duels, Squad Clash, Legion War, and the Aurel Bay free-for-all. Ranked 1v1, 3v3 and 5v5, plus an open-city free-for-all in Aurel Bay. Every mode is coming soon.",
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
  $$("[data-roblox]").forEach((a) => {
    const url = CONFIG.ROBLOX_URL;
    const ready = url && url !== "#";
    if (ready) { a.href = url; a.removeAttribute("aria-disabled"); a.removeAttribute("role"); a.target = "_blank"; a.rel = "noopener"; return; }
    a.removeAttribute("href");
    a.setAttribute("role", "button");
    a.removeAttribute("target");
    a.removeAttribute("rel");
    a.setAttribute("aria-disabled", "true");
    const label = a.querySelector("span") || a;
    if (!/coming soon/i.test(label.textContent)) label.textContent = "Coming soon";
    a.addEventListener("click", (e) => e.preventDefault());
  });
  $$("[data-discord]").forEach((a) => {
    const url = CONFIG.DISCORD_URL;
    const ready = url && url !== "#";
    if (!ready) { a.href = "#"; a.setAttribute("aria-disabled", "true"); return; }
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.removeAttribute("aria-disabled");
  });
  const year = $("#year"); if (year) year.textContent = new Date().getFullYear();
}

/* featured news */
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
    `<button type="button" class="rs-chip${k === "all" ? " active" : ""}" data-el="${k}" aria-pressed="${k === "all"}">${k === "all" ? "" : `<span class="el-dot" data-el="${k}"></span>${elIcon(k, 20)}`}${label}<small>${c}</small></button>`).join("");
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
      info.innerHTML = `<p class="ab-meta"><span>${a.slot}</span><span class="ab-keycap">Key ${a.key}</span>${a.cd ? `<span class="ab-cd">${a.cd}s cooldown</span>` : a.slot === "Awakening" && !a.ph ? `<span class="ab-cd">At 100% meter</span>` : ""}${a.damage ? `<span class="ab-cd">${a.damage} damage</span>` : ""}${a.range ? `<span class="ab-cd">range ${a.range}</span>` : ""}${a.duration ? `<span class="ab-cd">${a.duration}s duration</span>` : ""}</p>
        <h4 class="${a.ph ? "is-ph" : ""}">${a.name}</h4><p class="ab-desc">${a.desc || ""}</p>${typeof moveExtras === "function" ? moveExtras(a) : ""}`;
    };
    $$(".ab-btn", row).forEach((b) => { const k = +b.dataset.k; b.addEventListener("click", () => pick(k)); b.addEventListener("mouseenter", () => pick(k)); b.addEventListener("focus", () => pick(k)); });
    const coded = hasKit && typeof FIGHTER_MOVES !== "undefined" && FIGHTER_MOVES[kitSlug(($("#fmName") || {}).textContent || "")];
    $("#fmKitNote").textContent = !hasKit ? "Kit not listed for this fighter yet." : (coded ? "Values from current build, may change after playtests." : "Planned kit, not yet in game.");
    pick(0);
  };
  const show = (i) => {
    const f = ROSTER[i]; cur = i;
    $("#fighterModal").classList.remove("kit-only", "kit-with-art");
    if (kitSlug(f.name)) history.replaceState(null, "", `#fighter=${kitSlug(f.name)}`);
    const img = $("#fmImg"); img.src = f.lg; img.alt = `${f.name} fighter card`; setWallpaperBtn(kitSlug(f.name), f.name);
    $("#fmName").textContent = f.name;
    $("#fmEl").innerHTML = `${elIcon(f.el, 26)}${cap(f.el)} element`;
    $("#fmNum").textContent = `Fighter ${String(f.n).padStart(3, "0")} of ${ROSTER.length}`;
    const kit = FIGHTER_KITS[kitSlug(f.name)];
    setRole(kit && kit.role);
    renderKit(kit ? kitAbilities(kit, f.el) : fallbackKit(f.el), !!kit);
  };
  const showKitOnly = (slug) => {
    let k = FIGHTER_KITS[slug];
    if (!k && typeof FIGHTER_MOVES !== "undefined" && FIGHTER_MOVES[slug]) {
      const mv = FIGHTER_MOVES[slug];
      k = mergeKitWithMoves({
        name: mv.name,
        element: mv.element,
        role: mv.role,
        resonance: mv.resonance,
        moves: (mv.moves || []).map((m) => ({ key: m.key, name: m.name, desc: m.desc || "", cooldown: m.cooldown })),
        awakening: { key: (mv.awakening || {}).key || "G", name: (mv.awakening || {}).name, desc: (mv.awakening || {}).desc || "" },
      });
    }
    if (!k) return false;
    const fi = ROSTER.findIndex((f) => kitSlug(f.name) === slug); if (fi >= 0) { show(fi); return true; }
    const art = typeof STARTER_ART !== "undefined" && STARTER_ART[slug];
    const img = $("#fmImg");
    const modal = $("#fighterModal");
    if (art) {
      modal.classList.add("kit-only", "kit-with-art");
      img.src = art.lg; img.alt = `${k.name} fighter card`;
    } else {
      modal.classList.add("kit-only");
      modal.classList.remove("kit-with-art");
      img.removeAttribute("src"); img.alt = "";
    }
    $("#fmName").textContent = k.name;
    const el = k.element ? k.element.toLowerCase() : null;
    $("#fmEl").innerHTML = el ? `${elIcon(el, 26)}${cap(el)} element` : "No element listed";
    $("#fmNum").textContent = art ? "Starter · kit preview" : (k.number ? `Fighter ${String(k.number).padStart(3, "0")} · kit preview` : "Kit preview · no roster card yet");
    setRole(k.role);
    renderKit(kitAbilities(k, el || "light"), true);
    setWallpaperBtn(slug, k.name);
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
    if (tag) { if (!ok) tag.textContent = tag.dataset.miss || "Art coming soon"; else if (okLabel) tag.textContent = okLabel; }
  };
  img.addEventListener("load", () => sync(true));
  img.addEventListener("error", () => sync(false));
  if (img.complete) sync(img.naturalWidth > 0);
}

function renderModes() {
  $("#modeTabs").innerHTML = MODES.map((m, i) => `
    <button class="mode-tab" role="tab" data-i="${i}" aria-selected="false">
      <span class="thumb art-missing"><span class="art-fallback" aria-hidden="true">Art coming soon</span><img src="${m.src}" alt=""></span>
      <span class="mode-tab-copy"><span class="mode-tab-name">${m.tab}</span><span class="mode-soon">Coming soon</span></span>
    </button>`).join("");
  $$(".mode-tab").forEach((t) => {
    bindArt(t.querySelector("img"), t.querySelector(".thumb"));
    t.addEventListener("click", () => selectMode(+t.dataset.i));
  });
  selectMode(0);
  $("#featureList").innerHTML = FEATURES.map(([t, d], i) => `
    <li class="reveal" style="--d:${(i % 3) * 0.07}s"><span class="fi"><span>0${i + 1}</span></span><strong>${t}</strong><span class="feat-planned">Planned</span><p>${d}</p></li>`).join("");
}

let mIdx = 0;
function selectMode(i) {
  mIdx = i; const m = MODES[i];
  $$(".mode-tab").forEach((t, k) => {
    t.classList.toggle("active", k === i);
    t.setAttribute("aria-selected", String(k === i));
  });
  $("#modeArt").innerHTML = `<div class="art-fallback" aria-hidden="true">Art coming soon</div><img class="art-in" src="${m.src}" alt="${m.name}">`;
  bindArt($("#modeArt img"), $("#modeStage")); const _mt = $("#modeArtTag"); if (_mt) _mt.hidden = true;
  $("#modeCaption").innerHTML = `<div class="fade"><span class="players">${m.players}</span><h3>${m.title}</h3><p class="desc"><strong>${m.name}.</strong> ${m.text}</p></div>`;
  const st = $("#modeStage"); st.classList.remove("swap"); void st.offsetWidth; st.classList.add("swap");
}

/* ---------------- Codes ---------------- */
const ICO_GEM = `<svg class="rw-ico rw-gem" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path fill="#0AC8B9" d="M8 1.6 14.2 6.4 8 14.4 1.8 6.4z"/><path fill="#087F78" d="M8 1.6 11.4 6.4H4.6z"/><path fill="#0A5E5A" d="M4.6 6.4h6.8L8 14.4z" opacity=".55"/></svg>`;
const ICO_TITLE = `<svg class="rw-ico rw-title" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path fill="none" stroke="#FFFFFF" stroke-width="1.3" d="M2.2 4.2h11.6v8.2L8 11.2 2.2 12.4z"/><path fill="none" stroke="#FFFFFF" stroke-width="1.3" d="M3.6 6.4h8.8M3.6 8.6h6.2"/></svg>`;
const ICO_SCARF = `<svg class="rw-ico rw-scarf" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path fill="none" stroke="#FFFFFF" stroke-width="1.35" stroke-linecap="round" d="M3.2 5c2.2-2.2 6.2-2 6.4.8.2 1.8-1.8 2.2-1.8 4.2 0 1.5 1.3 2.4 2.8 2.2"/><path fill="none" stroke="#FFFFFF" stroke-width="1.35" stroke-linecap="round" d="M8.4 5.6c1.3-1.1 3.6-.8 4.4.8"/></svg>`;
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
  }

/* ---------------- Nav / chrome ---------------- */
let menuScrollY = 0;
function placeNav() {
  const nav = $("#mainnav"), bar = $("#topbar");
  if (!nav || !bar) return;
  const right = bar.querySelector(".topbar-right");
  const mobile = window.matchMedia("(max-width: 960px)").matches;
  if (mobile) {
    if (nav.parentElement !== document.body) document.body.appendChild(nav);
  } else if (nav.parentElement !== bar) {
    bar.insertBefore(nav, right || null);
  }
}
function openMenu() {
  const nav = $("#mainnav"), burger = $("#burger");
  if (!nav || !burger) return;
  placeNav();
  menuScrollY = window.scrollY;
  nav.classList.add("open");
  burger.setAttribute("aria-expanded", "true");
  burger.setAttribute("aria-label", "Close menu");
  document.documentElement.classList.add("menu-open");
  document.body.classList.add("menu-open");
  document.body.style.top = "";
}
function closeMenu() {
  const nav = $("#mainnav"), burger = $("#burger");
  if (nav) nav.classList.remove("open");
  if (burger) {
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
  }
  document.documentElement.classList.remove("menu-open");
  document.body.classList.remove("menu-open");
  document.body.style.top = "";
  document.body.style.overflow = "";
  window.scrollTo(0, menuScrollY || 0);
}
function initNav() {
  const nav = $("#mainnav"), burger = $("#burger");
  if (!nav || !burger) return;
  placeNav();
  addEventListener("resize", placeNav);
  if (!$("#navClose")) {
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.id = "navClose";
    closeBtn.className = "nav-close";
    closeBtn.setAttribute("aria-label", "Close menu");
    closeBtn.innerHTML = "×";
    closeBtn.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); closeMenu(); });
    nav.prepend(closeBtn);
  }
  burger.addEventListener("click", () => { if (nav.classList.contains("open")) closeMenu(); else openMenu(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  $$("a", nav).forEach((a) => a.addEventListener("click", closeMenu));
  $$(".dd-toggle").forEach((t) => t.addEventListener("click", () => { const o = t.parentElement.classList.toggle("open"); t.setAttribute("aria-expanded", o); }));
  const links = $$(".mainnav > a[href^='#']:not([data-open-patch])");
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
  ["news", "story", "fighters", "quiz", "compare", "howtoplay", "modes", "arenas", "map", "codes", "wallpapers", "roadmap", "devlog", "community"].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
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
  bindComingSoonDiscord();
  if ($("#newsRail")) renderNews();
  if ($("#rosterGrid")) renderRoster();
  if ($("#elementGrid")) renderElementPage();
  renderElementSwatches();
  renderElementMatchups();
  if ($("#codesList")) renderCodes();
  if ($("#modeTabs")) renderModes();
  initQuiz(); initCompare(); initMap();
  initPromoVideo();
  initNav(); initMore(); initModals(); initReveal(); initParallax(); initParticles(); initCounters();
});


/* ---------- v13: official move numbers, quiz, compare, map, community ---------- */
const FIGHTER_MOVES_SOURCE = {"source":"Setsuna Kessen M1 scripts (real in-game numbers, pre-playtest)","fighters":[{"id":"Tovin","name":"Tovin Rusk","resonance":"Shardmail","role":"All-rounder / midrange","moves":[{"key":"1","name":"Plate Throw","kind":"projectile","cooldown":6,"damage":70,"range":45},{"key":"2","name":"Shell Up","kind":"shield","cooldown":10,"damage":0,"range":0,"duration":3,"recast":{"name":"Shell Shatter","damage":90}},{"key":"3","name":"Rib Spike","kind":"melee","cooldown":8,"damage":95,"range":5},{"key":"4","name":"Scatter Step","kind":"dash","cooldown":9,"damage":0,"range":24}],"awakening":{"key":"G","name":"Kiln Break","kind":"detonate","cooldown":0,"damage":140,"range":16,"duration":9}},{"id":"Jastel","name":"Jastel Vohl","resonance":"","role":"Rushdown","moves":[{"key":"1","name":"Hook Chain","kind":"melee","cooldown":8,"damage":50,"range":14},{"key":"2","name":"Last Link","kind":"detonate","cooldown":12,"damage":0,"range":0},{"key":"3","name":"Sweep Weight","kind":"melee","cooldown":7,"damage":75,"range":6},{"key":"4","name":"Chain Rush","kind":"dash","cooldown":9,"damage":0,"range":10}],"awakening":{"key":"G","name":"Burning Circuit","kind":"buff","cooldown":0,"damage":0,"range":0,"duration":9,"finisher":{"name":"Circuit Ring","damage":110}}},{"id":"Kald","name":"Kald Eschen","resonance":"","role":"Tank","moves":[{"key":"1","name":"Living Pavise","kind":"shield","cooldown":8,"damage":0,"range":0,"duration":4},{"key":"2","name":"Close the Lane","kind":"melee","cooldown":12,"damage":60,"range":8},{"key":"3","name":"Regrowth","kind":"buff","cooldown":14,"damage":0,"range":0},{"key":"4","name":"Root Plant","kind":"zone","cooldown":10,"damage":0,"range":4,"duration":8,"recast":{"name":"Recall Pavise","damage":0}}],"awakening":{"key":"G","name":"Full Canopy","kind":"shield","cooldown":0,"damage":0,"range":0,"duration":9}},{"id":"Nedi","name":"Nedi Rime","resonance":"","role":"Trickster","moves":[{"key":"1","name":"Throw Mirror","kind":"zone","cooldown":8,"damage":0,"range":12,"duration":10},{"key":"2","name":"Shatter Swap","kind":"teleport","cooldown":10,"damage":0,"range":45},{"key":"3","name":"Opposite Cut","kind":"melee","cooldown":7,"damage":80,"range":7},{"key":"4","name":"Bait Shatter","kind":"buff","cooldown":13,"damage":0,"range":0}],"awakening":{"key":"G","name":"Broken Reflection","kind":"buff","cooldown":0,"damage":0,"range":0,"duration":9}},{"id":"Pixa","name":"Pixa Noll","resonance":"","role":"Trickster","moves":[{"key":"1","name":"Pocket Dark","kind":"zone","cooldown":9,"damage":0,"range":8,"duration":3},{"key":"2","name":"Crouch Step","kind":"teleport","cooldown":10,"damage":0,"range":25},{"key":"3","name":"Low Cut","kind":"melee","cooldown":6,"damage":70,"range":6},{"key":"4","name":"Snuff Field","kind":"zone","cooldown":14,"damage":0,"range":0,"duration":6}],"awakening":{"key":"G","name":"Total Snuff","kind":"zone","cooldown":0,"damage":0,"range":0,"duration":9}},{"id":"Sael","name":"Sael Orin","resonance":"","role":"Support","moves":[{"key":"1","name":"Still Banner","kind":"zone","cooldown":12,"damage":0,"range":0,"duration":8},{"key":"2","name":"Soft Landing","kind":"buff","cooldown":8,"damage":0,"range":30},{"key":"3","name":"Low Ceiling","kind":"zone","cooldown":10,"damage":0,"range":0,"duration":5},{"key":"4","name":"Banner Shift","kind":"teleport","cooldown":14,"damage":0,"range":60}],"awakening":{"key":"G","name":"Held Ground","kind":"zone","cooldown":0,"damage":0,"range":0,"duration":9}},{"id":"Sirae","name":"Sirae Holt","resonance":"","role":"Ranged (zoner)","moves":[{"key":"1","name":"Ember Bolt","kind":"projectile","cooldown":6,"damage":60,"range":45},{"key":"2","name":"Coil Shot","kind":"projectile","cooldown":9,"damage":85,"range":45},{"key":"3","name":"Ember Bloom","kind":"detonate","cooldown":11,"damage":0,"range":0},{"key":"4","name":"Ember Drop","kind":"dash","cooldown":8,"damage":0,"range":10}],"awakening":{"key":"G","name":"Full Coil","kind":"buff","cooldown":0,"damage":0,"range":0,"duration":9}},{"id":"Tamsin","name":"Tamsin Orel","resonance":"","role":"Ranged (zoner)","moves":[{"key":"1","name":"Silent Needles","kind":"projectile","cooldown":6,"damage":25,"range":50},{"key":"2","name":"Lane Pin","kind":"zone","cooldown":10,"damage":0,"range":14,"duration":6},{"key":"3","name":"Pressure Break","kind":"detonate","cooldown":12,"damage":0,"range":0},{"key":"4","name":"Draft Cut","kind":"dash","cooldown":8,"damage":0,"range":12}],"awakening":{"key":"G","name":"Held Breath","kind":"buff","cooldown":0,"damage":0,"range":0,"duration":9}},{"id":"Tesen","name":"Tesen Wynn","resonance":"","role":"Trickster","moves":[{"key":"1","name":"Flare Coin","kind":"projectile","cooldown":7,"damage":20,"range":22},{"key":"2","name":"Look-Away","kind":"dash","cooldown":6,"damage":60,"range":12},{"key":"3","name":"False Tell","kind":"projectile","cooldown":10,"damage":0,"range":20,"recast":{"name":"False Tell Blink","damage":0}},{"key":"4","name":"Glint Guard","kind":"buff","cooldown":12,"damage":0,"range":0}],"awakening":{"key":"G","name":"All Eyes","kind":"buff","cooldown":0,"damage":0,"range":0,"duration":9}},{"id":"Varek","name":"Varek Ashe","resonance":"","role":"Ranged (zoner)","moves":[{"key":"1","name":"Cinder Pitch","kind":"projectile","cooldown":6,"damage":70,"range":45},{"key":"2","name":"Ash Wall","kind":"zone","cooldown":12,"damage":0,"range":8,"duration":5},{"key":"3","name":"Searing Fan","kind":"melee","cooldown":8,"damage":80,"range":10},{"key":"4","name":"Ember Rise","kind":"dash","cooldown":10,"damage":0,"range":12}],"awakening":{"key":"G","name":"Ashwake","kind":"buff","cooldown":0,"damage":0,"range":0,"duration":9,"finisher":{"name":"Ashwake Burst","damage":140}}}]};
const ELEMENT_MATCHUPS = {"rule":"Soft counter: +5% damage dealt to a fighter whose element you beat. No effect on cooldowns, health, or meter. Starting balance for Luau Scripter, not locked. Light and Shadow are mutual counters: each deals +5% to the other, so both appear in each other's beats and weakTo on purpose.","mutualCounters":[["Light","Shadow"]],"matchups":{"Flame":{"beats":["Nature","Ice"],"weakTo":["Water","Earth"]},"Water":{"beats":["Flame","Earth"],"weakTo":["Ice","Lightning"]},"Ice":{"beats":["Water","Wind"],"weakTo":["Flame","Metal"]},"Lightning":{"beats":["Water","Metal"],"weakTo":["Earth","Nature"]},"Wind":{"beats":["Nature","Shadow"],"weakTo":["Ice","Light"]},"Earth":{"beats":["Lightning","Flame"],"weakTo":["Water","Nature"]},"Metal":{"beats":["Ice","Light"],"weakTo":["Lightning","Shadow"]},"Nature":{"beats":["Earth","Lightning"],"weakTo":["Flame","Wind"]},"Light":{"beats":["Shadow","Wind"],"weakTo":["Metal","Shadow"]},"Shadow":{"beats":["Light","Metal"],"weakTo":["Wind","Light"]}},"why":{"Flame>Nature":"burns through vines","Flame>Ice":"melts it","Water>Flame":"douses it","Water>Earth":"erodes stone","Ice>Water":"freezes it solid","Ice>Wind":"frost stills the air","Lightning>Water":"conducts through it","Lightning>Metal":"arcs through armor","Wind>Nature":"scatters seeds and leaves","Wind>Shadow":"clears smoke cover","Earth>Lightning":"grounds the charge","Earth>Flame":"smothers it","Metal>Ice":"shatters it","Metal>Light":"polished plate reflects it","Nature>Earth":"roots crack stone","Nature>Lightning":"wood does not conduct","Light>Shadow":"lights up hiding spots","Light>Wind":"glare reads fast feints","Shadow>Light":"swallows it","Shadow>Metal":"slips through armor gaps","Light<>Shadow":"mutual counters: light reveals hiding spots, shadow swallows it"}};
const AUREL_BAY_MAP = {"city":"Aurel Bay","note":"Layout for the interactive site map. Positions are percentages of the map image (x from left, y from top). Status: 'building' = in progress, 'planned' = coming later. Only Academy Plaza is being built first. The Duel Arena in Academy Plaza is the arena being built; the Training Arena is planned on Academy Hill.","palette":{"navy":"#141C2D","slate":"#19191C","gold":"#C8AA6E","road":"#2D2D32"},"districts":[{"id":"academy-plaza","name":"Academy Plaza","x":50,"y":38,"status":"building","blurb":"The heart of Aurel Bay. The academy gates are the safe spawn, rooftops ring two open squares, and the tournament stage sits in the plaza.","features":["Safe spawn at the academy gates","Mode queue spots","Tournament stage","Fountain hangout (no fighting)"],"mood":"dusk (ClockTime 18), slate stone, navy banners, matte gold trim","lore":"The old plaza clock tower is stuck on 4:07. Studio build: matte stone tower, cream clock face with dark hands set to 4:07, no lights. A newer street clock nearby runs 7 seconds behind (planned).","arena":"Duel Arena (1v1 Ranked, 120x120 studs) beside the tournament stage"},{"id":"academy-hill","name":"Academy Hill","x":50,"y":14,"status":"planned","blurb":"The academy campus on the hill behind the plaza, with training grounds and the courtyard.","features":["Training grounds","Academy courtyard (safe zone)"],"mood":"clear morning, clean stone, gold-trimmed academy walls","lore":"Vesperreach Academy was founded here after the freeze to train the people who woke with a Resonance. First-years learn to stand their ground by the fountain below the gates.","arena":"Training Arena (practice vs dummies, 120x120 studs), planned"},{"id":"harbor","name":"Gold Harbor","x":22,"y":78,"status":"planned","blurb":"Docks and cargo cranes on the bay. Tight lanes and stacked containers for close fights.","features":["Container maze","Pier lookout"],"mood":"dawn fog (higher Atmosphere density), wet docks, rust and navy containers","lore":"The harbor master's clock still reads 4:07. Dockworkers swear the tide came in seven seconds late that day and has kept that pace ever since.","arena":"Squad Arena (3v3, about 200x200 studs) in the container yard, with cover lanes for team fights"},{"id":"market","name":"Lantern Market","x":78,"y":62,"status":"planned","blurb":"Narrow streets of stalls and warm street lamps. Shops and cosmetics vendors live here.","features":["Shop stalls","Rooftop chase routes"],"mood":"night, warm matte lantern glow (low LightEmission), narrow streets","lore":"Every old lantern clock in the market stopped at 4:07. Vendors leave them hanging as charms, and the newest stalls set their clocks seven seconds behind on purpose.","arena":"No arena. It's a safe zone for shops and cosmetics vendors."},{"id":"skyline","name":"Skyline Ward","x":80,"y":24,"status":"planned","blurb":"Tall towers and rooftop bridges for vertical, dash-heavy fights.","features":["Rooftop bridges","Highest lookout in the city"],"mood":"noon, open sky, wind across the rooftops","lore":"The towers went up after the freeze, built tall so the academy could watch the whole bay. From the highest bridge you can see every stopped clock in the city at once.","arena":"Legion Arena (Legion War 5v5, about 260x260 studs) across linked rooftops, built for vertical dash fights"},{"id":"old-quarter","name":"Old Quarter","x":20,"y":34,"status":"planned","blurb":"Stone streets and a ruined shrine where live-event rifts open.","features":["Rift event zone","Shrine ruins"],"mood":"overcast and rainy, mossy stone, rifts in matte violet-black","lore":"This is where the seven seconds never fully ended. The rifts are time stutters.","arena":"No fixed arena. Live-event rift fights open here."}],"arenas":[{"name":"Training Arena","size":"120x120 studs","mode":"Practice vs dummies","status":"planned","district":"academy-hill","districtName":"Academy Hill"},{"name":"Duel Arena","size":"120x120 studs","mode":"Ranked Duels 1v1","status":"building","district":"academy-plaza","districtName":"Academy Plaza"},{"name":"Squad Arena","size":"about 200x200 studs","mode":"3v3","status":"planned","district":"harbor","districtName":"Gold Harbor"},{"name":"Legion Arena","size":"about 260x260 studs","mode":"Legion War 5v5","status":"planned","district":"skyline","districtName":"Skyline Ward"}]};
const FIGHTER_MOVES = Object.fromEntries((FIGHTER_MOVES_SOURCE.fighters || []).map((f) => [kitSlug(f.name), f]));

const ELEMENT_COLORS = {
  flame: { main: "rgb(200, 70, 40)", accent: "rgb(230, 160, 60)" },
  water: { main: "rgb(40, 110, 170)", accent: "rgb(150, 200, 220)" },
  ice: { main: "rgb(150, 200, 225)", accent: "rgb(235, 245, 250)" },
  wind: { main: "rgb(170, 200, 180)", accent: "rgb(235, 240, 230)" },
  earth: { main: "rgb(120, 90, 60)", accent: "rgb(170, 150, 110)" },
  lightning: { main: "rgb(230, 200, 80)", accent: "rgb(140, 120, 200)" },
  metal: { main: "rgb(140, 145, 155)", accent: "rgb(200, 170, 110)" },
  nature: { main: "rgb(80, 140, 70)", accent: "rgb(170, 200, 90)" },
  light: { main: "rgb(235, 215, 160)", accent: "rgb(255, 245, 220)" },
  shadow: { main: "rgb(45, 35, 60)", accent: "rgb(120, 60, 110)" },
};

function mergeKitWithMoves(kit) {
  const mv = FIGHTER_MOVES[kitSlug(kit.name)];
  if (!mv) return kit;
  const byKey = Object.fromEntries((mv.moves || []).map((m) => [String(m.key), m]));
  const moves = (kit.moves || []).map((m) => {
    const n = byKey[String(m.key)] || {};
    const out = { ...m };
    ["cooldown", "damage", "range", "duration", "kind", "recast"].forEach((k) => { if (n[k] != null) out[k] = n[k]; });
    return out;
  });
  const awn = mv.awakening || {};
  const awakening = { ...(kit.awakening || {}) };
  ["name", "key", "cooldown", "damage", "range", "duration", "kind", "finisher"].forEach((k) => {
    if (k === "name" && awakening.name) return;
    if (awn[k] != null) awakening[k] = awn[k];
  });
  return { ...kit, role: kit.role || mv.role, resonance: kit.resonance || mv.resonance, moves, awakening, fromBuild: true };
}

function allCodedKits() {
  const names = new Set([
    ...FIGHTER_KITS_SOURCE.map((k) => k.name),
    ...((FIGHTER_MOVES_SOURCE.fighters || []).map((f) => f.name)),
  ]);
  return [...names].map((name) => {
    const base = FIGHTER_KITS[kitSlug(name)] || { name, moves: (FIGHTER_MOVES[kitSlug(name)] || {}).moves || [], awakening: (FIGHTER_MOVES[kitSlug(name)] || {}).awakening || { name: "Awakening", key: "G" } };
    if (!FIGHTER_KITS[kitSlug(name)] && FIGHTER_MOVES[kitSlug(name)]) {
      const mv = FIGHTER_MOVES[kitSlug(name)];
      return mergeKitWithMoves({ name: mv.name, element: mv.element, role: mv.role, resonance: mv.resonance, moves: (mv.moves || []).map((m) => ({ key: m.key, name: m.name, desc: m.desc || "", cooldown: m.cooldown })), awakening: { key: (mv.awakening || {}).key || "G", name: (mv.awakening || {}).name, desc: (mv.awakening || {}).desc || "" } });
    }
    return mergeKitWithMoves(base);
  }).sort((a, b) => a.name.localeCompare(b.name));
}

function moveStatLine(m) {
  const bits = [];
  if (m.cd || m.cooldown) bits.push(`${m.cd || m.cooldown}s cooldown`);
  if (m.damage) bits.push(`${m.damage} damage`);
  if (m.range) bits.push(`range ${m.range}`);
  if (m.duration) bits.push(`${m.duration}s duration`);
  return bits.join(" · ");
}

function moveExtras(m) {
  let html = "";
  if (m.recast && m.recast.name) html += `<p class="ab-extra">Recast: ${m.recast.name}${m.recast.damage ? ` · ${m.recast.damage} damage` : ""}</p>`;
  if (m.finisher && m.finisher.name) html += `<p class="ab-extra">Finisher: ${m.finisher.name}${m.finisher.damage ? ` · ${m.finisher.damage} damage` : ""}</p>`;
  return html;
}

/* Patch kit lookup to prefer build numbers */
const FIGHTER_KITS_MERGED = Object.fromEntries(Object.entries(FIGHTER_KITS).map(([slug, k]) => [slug, mergeKitWithMoves(k)]));
Object.keys(FIGHTER_KITS_MERGED).forEach((slug) => { FIGHTER_KITS[slug] = FIGHTER_KITS_MERGED[slug]; });

function kitAbilitiesV13(k, el) {
  const kit = k.fromBuild ? k : mergeKitWithMoves(k);
  return [
    ...kit.moves.map((m, i) => ({
      key: m.key, slot: `Move ${["I", "II", "III", "IV"][i]}`, name: m.name, desc: m.desc || "",
      cd: m.cooldown, damage: m.damage, range: m.range, duration: m.duration,
      recast: m.recast, kind: m.kind, icon: m.icon || el, fromBuild: !!kit.fromBuild,
    })),
    {
      key: kit.awakening.key || "G", slot: "Awakening", name: kit.awakening.name, desc: kit.awakening.desc || "",
      cd: kit.awakening.cooldown, damage: kit.awakening.damage, range: kit.awakening.range,
      duration: kit.awakening.duration, finisher: kit.awakening.finisher, kind: kit.awakening.kind,
      icon: kit.awakening.icon || el, fromBuild: !!kit.fromBuild,
    },
  ];
}

/* ---------- Quiz (official 5 questions) ---------- */
const QUIZ = [
  { q: "A fight starts. You...", opts: [
    { t: "Rush in swinging", els: ["flame", "lightning"] },
    { t: "Read them first, then punish", els: ["ice", "shadow"] },
    { t: "Keep moving and poke", els: ["wind", "water"] },
    { t: "Stand your ground", els: ["earth", "metal"] },
    { t: "Back up your team", els: ["light", "nature"] },
  ]},
  { q: "Pick a place in Aurel Bay:", opts: [
    { t: "The forge district at night", els: ["flame", "metal"] },
    { t: "The harbor in a storm", els: ["water", "lightning"] },
    { t: "Rooftops at dawn", els: ["wind", "light"] },
    { t: "The old academy gardens", els: ["nature", "earth"] },
    { t: "The frozen canal / back alleys", els: ["ice", "shadow"] },
  ]},
  { q: "Your win style:", opts: [
    { t: "One huge Awakening finish", els: ["flame", "light"] },
    { t: "Combos nobody can escape", els: ["lightning", "shadow"] },
    { t: "They never even touched me", els: ["wind", "ice"] },
    { t: "I outlasted them", els: ["earth", "nature"] },
    { t: "I controlled the whole arena", els: ["water", "metal"] },
  ]},
  { q: "Friends call you...", opts: [
    { t: "Loud", els: ["flame", "lightning"] },
    { t: "Calm", els: ["water", "ice"] },
    { t: "Free", els: ["wind", "nature"] },
    { t: "Solid", els: ["earth", "metal"] },
    { t: "Mysterious", els: ["shadow", "light"] },
  ]},
  { q: "Pick a weapon vibe:", opts: [
    { t: "Fists", els: ["flame", "earth"] },
    { t: "Blade", els: ["metal", "wind"] },
    { t: "Bow/beam", els: ["light", "lightning"] },
    { t: "Staff/whip", els: ["water", "nature"] },
    { t: "Daggers", els: ["shadow", "ice"] },
  ]},
];

const QUIZ_FIGHTER = {
  wind: "tamsin-orel", ice: "nedi-rime", flame: "sirae-holt", lightning: "zaeren-tyne",
  earth: "raddik-kolg", water: "mirelle-voss", shadow: "pixa-noll", light: "tesen-wynn",
  metal: "kaedron-ilv", nature: "kald-eschen",
};

function elementVibe(el) {
  const lore = (typeof ELEMENT_LORE !== "undefined" && ELEMENT_LORE[el]) || "";
  const cut = lore.split(/(?<=\.)\s/)[0];
  return cut || lore;
}

function initQuiz() {
  const root = $("#quizApp"); if (!root) return;
  const progress = $("#quizProgress");
  const qBox = $("#quizQuestion");
  const result = $("#quizResult");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let step = 0;
  const picks = [];

  const scoreEl = () => {
    const tallies = {};
    picks.forEach((i, qi) => (QUIZ[qi].opts[i].els || []).forEach((el) => { tallies[el] = (tallies[el] || 0) + 1; }));
    const max = Math.max(0, ...Object.values(tallies));
    const tied = Object.keys(tallies).filter((k) => tallies[k] === max);
    if (tied.length === 1) return tied[0];
    for (let qi = 0; qi < picks.length; qi++) {
      const hit = (QUIZ[qi].opts[picks[qi]].els || []).find((el) => tied.includes(el));
      if (hit) return hit;
    }
    return tied[0] || "flame";
  };

  const showQuestion = () => {
    result.hidden = true; qBox.hidden = false;
    const item = QUIZ[step];
    progress.textContent = `Question ${step + 1} of ${QUIZ.length}`;
    qBox.innerHTML = `<legend>${item.q}</legend><div class="quiz-opts">${item.opts.map((o, i) =>
      `<button type="button" class="quiz-opt" data-i="${i}">${o.t}</button>`).join("")}</div>
      <div class="quiz-nav">${step > 0 ? `<button type="button" class="btn btn-gold" id="quizBack">Back</button>` : ""}</div>`;
    $$(".quiz-opt", qBox).forEach((b) => b.addEventListener("click", () => {
      picks[step] = +b.dataset.i; picks.length = step + 1;
      if (step + 1 < QUIZ.length) { step += 1; showQuestion(); }
      else showResult(scoreEl(), true);
    }));
    const back = $("#quizBack", qBox);
    if (back) back.addEventListener("click", () => { step = Math.max(0, step - 1); showQuestion(); });
  };

  const fighterFor = (el) => {
    const slug = QUIZ_FIGHTER[el];
    return ROSTER.find((f) => f.slug === slug || kitSlug(f.name) === slug) || ROSTER.find((f) => f.el === el);
  };

  const showResult = (el, setHash) => {
    qBox.hidden = true; result.hidden = false;
    progress.textContent = "Your element";
    const f = fighterFor(el);
    const href = asset(`elements/${el}.html`);
    const share = `${location.origin}${location.pathname}${location.search}#quiz=${el}`;
    result.innerHTML = `
      <div class="quiz-result-copy">
        <figure class="quiz-banner art-frame"><img src="${asset(`assets/elements/${el}-banner.webp`)}" alt="${cap(el)} element banner" width="1600" height="580"></figure>
        <h3>${cap(el)}</h3>
        <p class="quiz-vibe">${elementVibe(el)}</p>
        <div class="quiz-actions">
          <button type="button" class="btn btn-gold" id="quizShare">Copy link</button>
          <a class="btn btn-gold" href="${href}">Open the ${cap(el)} element page</a>
          <button type="button" class="btn btn-gold" id="quizRetry">Take it again</button>
        </div>
      </div>
      ${f ? `<div>${fighterCardHTML(f, ROSTER.indexOf(f))}</div>` : ""}`;
    const shareBtn = $("#quizShare", result);
    if (shareBtn) shareBtn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(share); }
      catch { const ta = Object.assign(document.createElement("textarea"), { value: share }); document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); }
      shareBtn.textContent = "Copied!";
      setTimeout(() => { shareBtn.textContent = "Copy link"; }, 1800);
      toast("Copied a link to this result");
    });
    const retry = $("#quizRetry", result);
    if (retry) retry.addEventListener("click", () => {
      step = 0; picks.length = 0;
      history.replaceState(null, "", location.pathname + location.search);
      showQuestion();
    });
    const card = result.querySelector(".rs-card");
    if (card && $("#fighterModal")) {
      card.addEventListener("click", () => {
        /* bindFighterGrid already handles clicks if card is in a bound grid; this result card is outside, so open via hash */
        location.hash = `fighter=${kitSlug(f.name)}`;
      });
    }
    if (setHash) history.replaceState(null, "", `${location.pathname}${location.search}#quiz=${el}`);
  };

  const fromHash = () => {
    const m = location.hash.match(/^#quiz=([a-z]+)$/);
    if (m && ELEMENTS.includes(m[1])) showResult(m[1], false);
  };
  showQuestion();
  fromHash();
  addEventListener("hashchange", () => { if (/^#quiz=/.test(location.hash)) fromHash(); });
}

function initCompare() {
  const grid = $("#cmpGrid"); if (!grid) return;
  const aSel = $("#cmpA"), bSel = $("#cmpB");
  const kits = allCodedKits();
  const optHtml = kits.map((k) => `<option value="${kitSlug(k.name)}">${k.name}${k.element ? ` · ${k.element}` : ""}${k.fromBuild ? "" : " · Planned"}</option>`).join("");
  aSel.innerHTML = optHtml; bSel.innerHTML = optHtml;
  const defA = kitSlug(kits[0] && kits[0].name);
  const defB = kitSlug((kits.find((k) => k.name === "Sirae Holt") || kits[1] || kits[0]).name);
  aSel.value = defA; bSel.value = defB;

  const portrait = (kit) => ROSTER.find((f) => kitSlug(f.name) === kitSlug(kit.name));

  const col = (kit) => {
    if (!kit) return `<article class="cmp-col"><p>Select a fighter.</p></article>`;
    const f = portrait(kit);
    const extra = typeof STARTER_ART !== "undefined" && STARTER_ART[kitSlug(kit.name)];
    const abil = kitAbilitiesV13(kit, (kit.element || (f && f.el) || "light").toLowerCase());
    const elLabel = kit.element ? kit.element : (f ? cap(f.el) : "No element listed");
    const artSrc = f ? f.src : (extra && extra.src);
    const art = artSrc ? `<figure class="cmp-art art-frame"><img src="${artSrc}" alt="${kit.name} fighter card" width="480" height="640"></figure>` : `<p class="cmp-meta">No roster card yet</p>`;
    const planned = !kit.fromBuild;
    return `<article class="cmp-col">${art}<h3>${kit.name}</h3>
      <p class="cmp-meta">${elLabel}${kit.role ? ` · ${kit.role}` : ""}${kit.resonance ? ` · ${kit.resonance}` : ""}</p>
      ${planned ? `<p class="cmp-note">Planned kit, not yet in game.</p>` : ""}
      ${abil.map((m) => `<div class="cmp-move"><b>${m.slot} · ${m.name} <span class="cmp-stats">Key ${m.key}</span></b>
        ${m.desc ? `<p>${m.desc}</p>` : ""}
        ${moveStatLine(m) ? `<p class="cmp-stats">${moveStatLine(m)}</p>` : ""}${moveExtras(m)}</div>`).join("")}
    </article>`;
  };

  const render = () => {
    const A = kits.find((k) => kitSlug(k.name) === aSel.value);
    const B = kits.find((k) => kitSlug(k.name) === bSel.value);
    grid.innerHTML = col(A) + col(B);
  };
  aSel.addEventListener("change", render);
  bSel.addEventListener("change", render);
  render();
}

function statusLabel(s) { return s === "building" ? "Building now" : "Planned"; }

function mapEsc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* Strip World Builder / Studio notes so district panels stay player-facing.
   Only removes jargon; does not invent copy. */
function tidyPlayerCopy(s) {
  s = String(s);
  s = s.replace(/\s+/g, " ");
  s = s.replace(/\s+([,.;:])/g, "$1");
  s = s.replace(/,(?:,|\s)*/g, ", ");
  s = s.replace(/\(\s+/g, "(");
  s = s.replace(/\s+\)/g, ")");
  s = s.replace(/,\s*\)/g, ")");
  s = s.replace(/\(\s*,/g, "(");
  s = s.replace(/\(\s*\)/g, "");
  s = s.replace(/\)\s+(?=[A-Za-z])/g, "), ");
  s = s.replace(/\s+\./g, ".");
  s = s.replace(/\.\s*\./g, ".");
  s = s.replace(/^\s*,\s*/g, "");
  s = s.replace(/\s*,\s*$/g, "");
  s = s.replace(/\s{2,}/g, " ");
  return s.trim();
}

function playerFacingCopy(text, kind) {
  if (text == null || text === "") return "";
  let s = String(text);

  // Whole Studio / internal-build sentences
  s = s.replace(/\bStudio build:\s*[^.]*\./gi, "");
  s = s.replace(/\bStudio\b[^.]*\./gi, "");

  // Stud sizes first, so mixed parens like (1v1 Ranked, 120x120 studs) keep the mode
  s = s.replace(/(?:,\s*)?(?:about\s+)?\d+\s*x\s*\d+\s*studs\b/gi, "");

  // Technical-only parentheticals and (planned) asides — not mixed mode parens
  s = s.replace(/\([^)]*\b(ClockTime|Atmosphere|LightEmission|Material)\b[^)]*\)/gi, "");
  s = s.replace(/\(\s*planned\s*\)/gi, "");

  // Drop the studio finish word "matte" (kept phrases stay player-facing)
  s = s.replace(/\bmatte\b/gi, "");

  if (kind === "mood") {
    // Drop finish-only leftover clauses such as "gold trim"; keep stone, banners, docks, etc.
    const onlyFinish = /^(?:gold\s+)?trim$/i;
    s = s.split(",").map((part) => part.trim()).filter((part) => part && !onlyFinish.test(part)).join(", ");
  }

  if (kind === "size") {
    if (/\bstuds?\b/i.test(s) || !tidyPlayerCopy(s)) return "";
  }

  return tidyPlayerCopy(s);
}


function initMap() {
  const stage = $("#abMapStage"); if (!stage) return;
  const fallback = $("#abMapFallback");
  const pins = $("#abMapPins");
  const panel = $("#abMapPanel");
  const list = $("#abDistricts");
  const arenas = $("#abArenas");
  const data = AUREL_BAY_MAP;
  stage.hidden = false;
  if (fallback) fallback.hidden = true;

  const select = (id) => {
    const z = data.districts.find((d) => d.id === id) || data.districts[0];
    $$(".ab-pin", pins).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.id === z.id)));
    $$("#abDistricts button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.id === z.id)));
    const bits = [
      `<span class="ab-status">${mapEsc(statusLabel(z.status))}</span>`,
      `<h3 id="district-${mapEsc(z.id)}">${mapEsc(z.name)}</h3>`,
      `<p>${mapEsc(z.blurb)}</p>`
    ];
    const mood = playerFacingCopy(z.mood, "mood");
    const lore = playerFacingCopy(z.lore, "lore");
    const arena = playerFacingCopy(z.arena, "arena");
    if (mood) bits.push(`<p class="ab-mood"><span class="ab-k">Mood</span>${mapEsc(mood)}</p>`);
    if (lore) bits.push(`<p class="ab-lore"><span class="ab-k">Lore</span>${mapEsc(lore)}</p>`);
    if (arena) bits.push(`<p class="ab-arena"><span class="ab-k">Arena</span>${mapEsc(arena)}</p>`);
    if (z.features && z.features.length) {
      bits.push(`<ul>${z.features.map((f) => `<li>${mapEsc(f)}</li>`).join("")}</ul>`);
    }
    panel.innerHTML = bits.join("\n      ");
    panel.hidden = false;
  };

  pins.innerHTML = data.districts.map((z) => {
    const above = z.id === "harbor" ? " ab-pin--label-above" : "";
    const building = z.status === "building" ? " is-building" : "";
    return `<button type="button" class="ab-pin${building}${above}" style="left:${z.x}%;top:${z.y}%" data-id="${mapEsc(z.id)}" aria-label="${mapEsc(z.name)}, ${mapEsc(statusLabel(z.status))}" aria-pressed="false"><span class="ab-pin-diamond" aria-hidden="true"></span><span class="ab-pin-label">${mapEsc(z.name)}</span></button>`;
  }).join("");
  list.innerHTML = data.districts.map((z) =>
    `<li><button type="button" data-id="${mapEsc(z.id)}" aria-pressed="false">${mapEsc(z.name)} · ${mapEsc(statusLabel(z.status))}</button></li>`
  ).join("");
  pins.addEventListener("click", (e) => { const b = e.target.closest(".ab-pin"); if (b) select(b.dataset.id); });
  list.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) select(b.dataset.id); });
  arenas.innerHTML = (data.arenas || []).map((a) => {
    const district = a.districtName || "";
    const size = playerFacingCopy(a.size, "size");
    return `<li><b>${mapEsc(a.name)}</b><span class="ab-status">${mapEsc(statusLabel(a.status))}</span>${district ? `<span class="ab-arena-district">${mapEsc(district)}</span>` : ""}<span>${mapEsc(a.mode)}</span>${size ? `<span>${mapEsc(size)}</span>` : ""}</li>`;
  }).join("");
  select("academy-plaza");
}


function playerFacingMatchupRule(rule) {
  let s = String(rule || "");
  s = s.replace(/\s*Starting balance for Luau Scripter, not locked\.\s*/gi, " ");
  s = s.replace(/\bweakTo\b/g, "Weak to");
  return tidyPlayerCopy(s);
}

function renderElementMatchups() {
  const page = document.querySelector("body.element-page[data-element]");
  if (!page) return;
  const raw = page.getAttribute("data-element") || "";
  const name = raw.charAt(0).toUpperCase() + raw.slice(1);
  const data = ELEMENT_MATCHUPS;
  const m = data && data.matchups && data.matchups[name];
  if (!m) return;
  const why = data.why || {};
  const whyFor = (a, b) => why[a + ">" + b] || "";
  const item = (attacker, defender, labelEl) => {
    const w = whyFor(attacker, defender);
    const href = asset("elements/" + labelEl.toLowerCase() + ".html");
    return `<li><a href="${href}">${mapEsc(labelEl)}</a>${w ? " — " + mapEsc(w) : ""}</li>`;
  };
  const beats = (m.beats || []).map((b) => item(name, b, b)).join("");
  const weak = (m.weakTo || []).map((b) => item(b, name, b)).join("");
  const section = document.createElement("section");
  section.className = "el-matchups";
  section.setAttribute("aria-labelledby", "elMatchupsTitle");
  section.innerHTML = `<h2 id="elMatchupsTitle">Matchups</h2>
    <p class="el-matchups-rule">${mapEsc(playerFacingMatchupRule(data.rule || ""))}</p>
    <div class="el-matchups-cols">
      <div><h3>Beats</h3><ul>${beats}</ul></div>
      <div><h3>Weak to</h3><ul>${weak}</ul></div>
    </div>`;
  const grid = document.getElementById("elementGrid");
  if (grid && grid.parentNode) grid.after(section);
  else {
    const wrap = document.querySelector(".el-hero .wrap") || document.querySelector(".el-hero");
    if (wrap) wrap.appendChild(section);
  }
}

function renderElementSwatches() {
  const el = document.body.dataset.element;
  const box = $("#elSwatches");
  if (!el || !box || !ELEMENT_COLORS[el]) return;
  box.innerHTML = `
    <span class="el-swatch" data-el="${el}" data-tone="main"><img class="el-badge-img" src="${asset("assets/ui/badges/" + el + "-64.png")}" alt="" width="24" height="24"> Main</span>
    <span class="el-swatch" data-el="${el}" data-tone="accent"><img class="el-badge-img" src="${asset("assets/ui/badges/" + el + "-64.png")}" alt="" width="24" height="24"> Accent</span>`;
}

function bindComingSoonDiscord() {
  const url = CONFIG.DISCORD_URL;
  const ready = url && url !== "#";
  $$("[data-discord]").forEach((a) => {
    if (ready) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.removeAttribute("aria-disabled");
      return;
    }
    a.href = "#";
    a.setAttribute("aria-disabled", "true");
    a.addEventListener("click", (e) => e.preventDefault());
  });
}

