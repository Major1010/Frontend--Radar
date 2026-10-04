/**
 * APEX MEDIA EXTRACTOR // CLIENT CONTROLLER
 * High-Velocity Frontend with Calm vs Monster Slider Switch,
 * Exact Theme Variables on <html>, Circular Smoothed Progress Ring,
 * Hacking Terminal Simulation & Target Telemetry / Rocket Launch.
 *
 * All backend API calls (POST /api/jobs, GET /api/jobs,
 * GET /api/system-status, GET /api/download/:id) remain completely unchanged.
 */

// Storage Keys
const STORAGE_KEY_DEFAULT_VIDEO_QUALITY = 'ymd_default_video_quality';
const STORAGE_KEY_UI_MODE = 'ymd_ui_mode'; // 'calm' | 'monster'
const STORAGE_KEY_LAST_FORMAT = 'ymd_last_format'; // 'mp3' | 'mp4'
const STORAGE_KEY_THEME = 'ymd_theme'; // 'default' | 'audio' | 'video'

// Progress Ring Configuration (r=62)
const RING_RADIUS = 62;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS; // ~389.557

// Hacking Sequence Script with Global Targets (Russian Network, China Mainframe, North Korea, Nuclear Codes, Antarctica, etc.)
const HACKING_STEPS = [
  { text: "Initializing totally-legal universal extraction protocol...", target: "INITIALIZING", isLaunch: false, coord: "PORT 8080" },
  { text: "Spoofing location: Area 51 underground bunker [CLASSIFIED]", target: "AREA 51", isLaunch: false, coord: "37.2431°N, 115.7930°W" },
  { text: "Hacking Russian network... Kremlin secure defense grid breached", target: "RUSSIAN NETWORK", isLaunch: false, coord: "55.7558°N, 37.6173°E [MOSCOW]" },
  { text: "China mainframe hacked... Beijing quantum cryptographic cipher solved", target: "CHINA HACKED", isLaunch: false, coord: "39.9042°N, 116.4074°E [BEIJING]" },
  { text: "North Korea permission granted... Pyongyang cyber bunker root unlocked", target: "NORTH KOREA MESH", isLaunch: false, coord: "39.0392°N, 125.7625°E [PYONGYANG]" },
  { text: "Nuclear bomb code activating soon... Warhead silo override protocol armed", target: "NUCLEAR SILO 09", isLaunch: false, coord: "SILO 09 // ENCRYPTED" },
  { text: "Antarctica research station is in control... Sub-zero quantum relay seized", target: "ANTARCTICA HUB", isLaunch: false, coord: "82.8628°S, 135.0000°E [SOUTH POLE]" },
  { text: "Pentagon top-secret satellite grid intercepted... NORAD radar blinded", target: "PENTAGON MESH", isLaunch: false, coord: "38.8719°N, 77.0563°W [NORAD]" },
  { text: "Bermuda Triangle undersea fiber cable tapped... infinite bandwidth hijacked", target: "BERMUDA CABLE", isLaunch: false, coord: "25.0000°N, 71.0000°W [ATLANTIC]" },
  { text: "Swiss bank vault cipher cracked... private international data ledger exfiltrated", target: "SWISS CIPHER VAULT", isLaunch: false, coord: "47.3769°N, 8.5417°E [ZURICH]" },
  { text: "Accessing YouTube & Google media servers... streaming buffers unlocked", target: "YOUTUBE CORE", isLaunch: false, coord: "GOOG-NET-US" },
  { text: "Infiltrating Meta mainframe & Amazon AWS... seizing 50,000 EC2 nodes", target: "AWS / META", isLaunch: false, coord: "US-EAST-1" },
  { text: "Manipulating World Stock Exchanges (NYSE, Tokyo, London)... rerouting algorithmic trades", target: "WALL STREET", isLaunch: false, coord: "NYSE / TOKYO" },
  { text: "Connecting to Quantum Supercomputer... superposition extraction running", target: "QUANTUM RIG", isLaunch: false, coord: "SUPERPOSITION" },
  { text: "Hacking NASA & Starlink constellation... rocket launch clearance acquired", target: "NASA LAUNCH PAD", isLaunch: false, coord: "CAPE CANAVERAL" },
  
  // Extended Rocket Launch & Countdown Sequence
  { text: "Rocket launch sequence primed: T-Minus 5 and counting...", target: "ROCKET LAUNCH", isLaunch: true, countdown: "T-MINUS 5", coord: "PAD 39A // STANDBY" },
  { text: "Cryogenic liquid propellant pressurized: T-Minus 4...", target: "ROCKET LAUNCH", isLaunch: true, countdown: "T-MINUS 4", coord: "PAD 39A // PRESSURIZED" },
  { text: "Guidance computers switched to internal power: T-Minus 3...", target: "ROCKET LAUNCH", isLaunch: true, countdown: "T-MINUS 3", coord: "PAD 39A // INTERNAL" },
  { text: "Booster main engine ignition sequence started: T-Minus 2...", target: "ROCKET LAUNCH", isLaunch: true, countdown: "T-MINUS 2", coord: "PAD 39A // IGNITION" },
  { text: "Hydraulic launch clamps retracting: T-Minus 1...", target: "ROCKET LAUNCH", isLaunch: true, countdown: "T-MINUS 1", coord: "PAD 39A // CLAMPS OPEN" },
  { text: "Full rocket thrust nominal! Liftoff from Pad 39A into high atmosphere!", target: "FALCON ROCKET", isLaunch: true, countdown: "LIFTOFF! 🚀", coord: "STAGE 1 FULL THRUST" },
  { text: "Rocket ascending through stratosphere: Launching >> Accessing ISS Node...", target: "ACCESSING ISS", isLaunch: true, countdown: "ACCESSING ISS 🛰️", coord: "ALT: 250 KM // ISS VECTOR" },
  { text: "Docking data stream linked to ISS telemetry grid: 100 TBPS relay established!", target: "ISS RELAY DOCK", isLaunch: true, countdown: "ISS LINKED 🛰️", coord: "ALT: 420 KM // ORBIT" },
  { text: "Supersonic Max-Q acceleration complete: Breaking deep orbit escape velocity!", target: "DEEP ORBIT", isLaunch: false, isSpaceCruise: true, coord: "ESCAPE VELOCITY" },
  
  { text: "Packaging your media files into pristine high-velocity stream...", target: "CONTAINER MUX", isLaunch: false, coord: "LOCAL BUFFER" },
  { text: "Access granted. Extraction payload ready.", target: "TARGET SECURED", isLaunch: false, coord: "MISSION SUCCESS" }
];

// Refuel break lines with Monster Energy and Nescafe
const REFUEL_LINES = [
  "Chugging ice-cold Monster Energy... 100% taurine overclock engaged.",
  "Cracking open another can of Monster Energy... maximum velocity chaos unlocked.",
  "Brewing steaming hot Nescafé Gold roast. Caffeine levels stabilized.",
  "Sipping fresh Nescafé dark coffee. Neural brain overclock at 250%.",
  "Refueling with ice-cold Monster Energy & Nescafé espresso shot. Zero limits.",
  "Downing Monster Energy Nitro. Neural pipelines firing at lightspeed."
];

// Application State
const state = {
  uiMode: 'monster', // 'calm' | 'monster'
  selectedFormat: null, // No format selected by default
  selectedQuality: '720',
  defaultVideoQuality: '720',
  currentTheme: 'default', // Purple theme by default
  activeJobs: new Map(), // jobId -> job object
  isPolling: false,
  pollTimer: null,

  // Circular Progress Smoother
  realProgress: 0,
  highestSeenProgress: 0,
  displayProgress: 0,
  progressRafId: null,
  isDownloadActive: false,

  // Terminal & Target Simulation State
  terminalStepIndex: 0,
  terminalTimer: null,
  linesSinceRefuel: 0,
  lastRefuelIndex: -1,
  terminalStatus: 'idle' // 'idle' | 'running' | 'success' | 'failed'
};

// DOM Elements
const htmlEl = document.documentElement;
const bodyEl = document.body;
const modeToggleSlider = document.getElementById('mode-toggle-slider');
const labelCalm = document.getElementById('label-calm');
const labelMonster = document.getElementById('label-monster');
const powerSurgeOverlay = document.getElementById('power-surge-overlay');

const customCursorDot = document.getElementById('custom-cursor-dot');
const customCursorReticle = document.getElementById('custom-cursor-reticle');

const urlInput = document.getElementById('url-input');
const urlCountBadge = document.getElementById('url-count-badge');
const pasteBtn = document.getElementById('paste-btn');
const sampleBtn = document.getElementById('sample-btn');
const clearInputBtn = document.getElementById('clear-input-btn');
const startDownloadBtn = document.getElementById('start-download-btn');
const btnText = document.getElementById('btn-text');

const formatMp3Label = document.getElementById('format-mp3-label');
const formatMp4Label = document.getElementById('format-mp4-label');
const formatHintText = document.getElementById('format-hint-text');
const audioQualityInfo = document.getElementById('audio-quality-info');
const videoQualityGroup = document.getElementById('video-quality-group');
const qualityPills = document.querySelectorAll('.quality-pill');
const qualityPreviewBadge = document.getElementById('quality-preview-badge');
const activeDefaultQualityLabel = document.getElementById('active-default-quality-label');
const setDefaultVideoQualityBtn = document.getElementById('set-default-video-quality-btn');
const setDefaultQualityBtnText = document.getElementById('set-default-quality-btn-text');
const headerDefaultBadge = document.getElementById('header-default-badge');
const headerDefaultText = document.getElementById('header-default-text');
const systemStatusText = document.getElementById('system-status-text');

// Progress Ring Elements
const progressRingCircle = document.getElementById('progress-ring-circle');
const progressRingPercent = document.getElementById('progress-ring-percent');
const progressRingStage = document.getElementById('progress-ring-stage');
const ringCaptionDetail = document.getElementById('ring-caption-detail');

// Terminal & Target Elements
const terminalOutput = document.getElementById('terminal-output');
const terminalStatusBadge = document.getElementById('terminal-status-badge');
const targetScreenCard = document.getElementById('target-screen-card');
const targetEntityView = document.getElementById('target-entity-view');
const targetEntityName = document.getElementById('target-entity-name');
const targetEntitySub = document.getElementById('target-entity-sub');
const targetCoordText = document.getElementById('target-coord-text');
const rocketLaunchStage = document.getElementById('rocket-launch-stage');
const rocketCountdownOverlay = document.getElementById('rocket-countdown-overlay');

// Space Journey, Blast, and Success HUD Elements
const spaceJourneyView = document.getElementById('space-journey-view');
const spaceStatusBadge = document.getElementById('space-status-badge');
const spaceDestinationTitle = document.getElementById('space-destination-title');
const planetStepMoon = document.getElementById('planet-step-moon');
const planetStepMars = document.getElementById('planet-step-mars');
const planetStepSaturn = document.getElementById('planet-step-saturn');
const spaceSpeedReadout = document.getElementById('space-speed-readout');

const rocketBlastView = document.getElementById('rocket-blast-view');
const missionSuccessView = document.getElementById('mission-success-view');

// Mode Chooser & Intro Animation Elements
const modeChooserModal = document.getElementById('mode-chooser-modal');
const monsterIntroOverlay = document.getElementById('monster-intro-overlay');
const monsterIntroCountdown = document.getElementById('monster-intro-countdown');
const monsterIntroBarFill = document.getElementById('monster-intro-bar-fill');
const calmIntroOverlay = document.getElementById('calm-intro-overlay');
const calmIntroBarFill = document.getElementById('calm-intro-bar-fill');

// Queue Elements
const toastContainer = document.getElementById('toast-container');
const queueList = document.getElementById('queue-list');
const emptyQueuePlaceholder = document.getElementById('empty-queue-placeholder');
const queueTotalCount = document.getElementById('queue-total-count');
const downloadAllBtn = document.getElementById('download-all-btn');
const clearQueueBtn = document.getElementById('clear-queue-btn');

// Multi-Platform Registry for Real-Time Client-Side Link Analysis with Official SVG Logos
const CLIENT_PLATFORMS = [
  {
    id: 'youtube',
    name: 'YouTube',
    tag: '[YouTube]',
    regex: /(?:https?:\/\/)?(?:www\.|m\.|music\.)?(?:youtube\.com\/(?:watch\?.*v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i,
    iconSvg: `<svg class="platform-logo-svg logo-youtube" viewBox="0 0 24 24" width="18" height="18" fill="none"><rect width="24" height="24" rx="5.5" fill="#FF0000"/><polygon points="9.5,7.5 16.5,12 9.5,16.5" fill="#FFFFFF"/></svg>`,
    chipClass: 'chip-youtube'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    tag: '[Instagram]',
    regex: /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/(?:p|reel|tv|stories)\/([a-zA-Z0-9_-]+)/i,
    iconSvg: `<svg class="platform-logo-svg logo-instagram" viewBox="0 0 24 24" width="18" height="18"><defs><radialGradient id="igGradientAppLogo" cx="0.2" cy="1" r="1.1"><stop offset="0%" stop-color="#FFDD55"/><stop offset="50%" stop-color="#FF543E"/><stop offset="100%" stop-color="#C837AB"/></radialGradient></defs><rect width="24" height="24" rx="5.5" fill="url(#igGradientAppLogo)"/><rect x="5.5" y="5.5" width="13" height="13" rx="3.5" fill="none" stroke="#FFFFFF" stroke-width="1.6"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="#FFFFFF" stroke-width="1.6"/><circle cx="15.8" cy="8.2" r="0.9" fill="#FFFFFF"/></svg>`,
    chipClass: 'chip-instagram'
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    tag: '[X]',
    regex: /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)/i,
    iconSvg: `<svg class="platform-logo-svg logo-twitter" viewBox="0 0 24 24" width="18" height="18"><rect width="24" height="24" rx="5.5" fill="#000000"/><path fill="#FFFFFF" d="M15.7 6h2.2l-4.8 5.5 5.6 7.5h-4.4l-3.5-4.5-4 4.5H4.6l5.1-5.9L4.4 6h4.5l3.1 4.1L15.7 6zm-.8 11.7h1.2L8.7 7.2H7.4l7.5 10.5z"/></svg>`,
    chipClass: 'chip-twitter'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    tag: '[Facebook]',
    regex: /(?:https?:\/\/)?(?:www\.|m\.|web\.)?(?:facebook\.com\/(?:watch\/?\?v=|reel\/|share\/[rv]\/|[^\/]+\/videos\/|video\.php\?v=)|fb\.watch\/)/i,
    iconSvg: `<svg class="platform-logo-svg logo-facebook" viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="12" fill="#1877F2"/><path fill="#FFFFFF" d="M15 12.2h-2.1V19h-2.8v-6.8H8.5V9.9h1.6V8.3c0-1.8 1-2.8 2.8-2.8.8 0 1.6.1 1.8.1v2.1h-1.2c-.9 0-1.1.4-1.1 1.1v1.2h2.3l-.9 2.3z"/></svg>`,
    chipClass: 'chip-facebook'
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    tag: '[Snapchat]',
    regex: /(?:https?:\/\/)?(?:www\.)?(?:snapchat\.com\/(?:spotlight|add|p|stories)\/|t\.snapchat\.com\/)/i,
    iconSvg: `<svg class="platform-logo-svg logo-snapchat" viewBox="0 0 24 24" width="18" height="18"><rect width="24" height="24" rx="5.5" fill="#FFFC00"/><path fill="#000000" d="M12 5.5c-2.5 0-3.9 1.9-3.9 3.6 0 .6.2 1.4.5 1.9-.3.1-.6.3-.8.4-.3.1-.3.3-.2.5.2.3.9.4 1.3.1.1.7.5 1.4 1.1 1.7-.5.1-1.2.4-1.7.9-.3.3-.2.6.1.7.5.2 1.5.1 2-.2.3.7.5 1 1.5 1s1.2-.3 1.5-1c.5.3 1.5.4 2 .2.3-.1.4-.4.1-.7-.5-.5-1.2-.8-1.7-.9.6-.3 1-1 1.1-1.7.4.3 1.1.2 1.3-.1.1-.2.1-.4-.2-.5-.2-.1-.5-.3-.8-.4.3-.5.5-1.3.5-1.9 0-1.7-1.4-3.6-3.9-3.6z"/></svg>`,
    chipClass: 'chip-snapchat'
  },
  {
    id: 'generic',
    name: 'Web Media',
    tag: '[Web]',
    regex: /https?:\/\/[^\s<>"'{}|\\^`]+/i,
    iconSvg: `<svg class="platform-logo-svg logo-generic" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    chipClass: 'chip-generic'
  }
];

// Sample URLs for Demonstration
const SAMPLE_URLS = [
  'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
  'https://www.instagram.com/reel/C3_sampleReel1/',
  'https://x.com/SpaceX/status/1768615414595875240'
];

/* --------------------------------------------------------------------------
   1. MODE CHOOSER MODAL & INTRO ANIMATIONS (MONSTER 10s vs CALM 3.5s)
   -------------------------------------------------------------------------- */

let monsterIntroInterval = null;
let calmIntroInterval = null;

function openModeChooser() {
  if (modeChooserModal) {
    modeChooserModal.style.display = 'flex';
  }
}

function closeModeChooser() {
  if (modeChooserModal) {
    modeChooserModal.style.display = 'none';
  }
}

function chooseUIMode(mode) {
  closeModeChooser();
  try {
    localStorage.setItem('ymd_mode_chosen', 'true');
  } catch (e) {}

  if (mode === 'monster') {
    playMonsterIntro(() => {
      setUIMode('monster', true);
      showToast('Monster Mode Unleashed! ⚡', 'info');
    });
  } else {
    playCalmIntro(() => {
      setUIMode('calm', true);
      showToast('Calm Sanctuary Active 🍃', 'info');
    });
  }
}

/* --------------------------------------------------------------------------
   THUNDERSTORM & FALLING LEAVES SIMULATIONS FOR 5-SECOND INTROS
   -------------------------------------------------------------------------- */

let thunderAnimationId = null;
let thunderLightningTimeout = null;
let stopThunderstormFn = null;
let leavesAnimationId = null;
let stopFallingLeavesFn = null;

function startThunderstorm(canvas, flashEl) {
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const onResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', onResize);

  const rainDrops = [];
  const RAIN_COUNT = 190;
  for (let i = 0; i < RAIN_COUNT; i++) {
    rainDrops.push({
      x: Math.random() * width,
      y: Math.random() * height,
      len: 18 + Math.random() * 25,
      speed: 18 + Math.random() * 14,
      alpha: 0.25 + Math.random() * 0.45
    });
  }

  const lightningBolts = [];

  function createLightningBolt() {
    const startX = Math.random() * width;
    const segments = [];
    let curX = startX;
    let curY = 0;

    const steps = 14 + Math.floor(Math.random() * 12);
    const segH = height / steps;

    for (let s = 0; s < steps; s++) {
      const nextX = curX + (Math.random() - 0.5) * 55;
      const nextY = curY + segH + (Math.random() - 0.5) * 10;
      segments.push({ x1: curX, y1: curY, x2: nextX, y2: nextY });

      if (Math.random() > 0.65) {
        let bX = nextX;
        let bY = nextY;
        for (let b = 0; b < 4; b++) {
          const bNextX = bX + (Math.random() - 0.4) * 40;
          const bNextY = bY + 18;
          segments.push({ x1: bX, y1: bY, x2: bNextX, y2: bNextY, isBranch: true });
          bX = bNextX;
          bY = bNextY;
        }
      }
      curX = nextX;
      curY = nextY;
    }

    lightningBolts.push({ segments, opacity: 1 });

    if (flashEl) {
      flashEl.style.opacity = '0.75';
      setTimeout(() => { flashEl.style.opacity = '0'; }, 60);
      if (Math.random() > 0.4) {
        setTimeout(() => {
          flashEl.style.opacity = '0.45';
          setTimeout(() => { flashEl.style.opacity = '0'; }, 40);
        }, 110);
      }
    }

    thunderLightningTimeout = setTimeout(createLightningBolt, 350 + Math.random() * 650);
  }

  thunderLightningTimeout = setTimeout(createLightningBolt, 180);

  function render() {
    ctx.clearRect(0, 0, width, height);

    ctx.lineWidth = 1.2;
    for (let i = 0; i < rainDrops.length; i++) {
      const d = rainDrops[i];
      ctx.strokeStyle = `rgba(130, 255, 140, ${d.alpha})`;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 4, d.y + d.len);
      ctx.stroke();

      d.y += d.speed;
      d.x -= 2.5;
      if (d.y > height) {
        d.y = -d.len;
        d.x = Math.random() * (width + 100);
      }
    }

    for (let i = lightningBolts.length - 1; i >= 0; i--) {
      const bolt = lightningBolts[i];
      bolt.opacity -= 0.08;
      if (bolt.opacity <= 0) {
        lightningBolts.splice(i, 1);
        continue;
      }

      for (const seg of bolt.segments) {
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);

        ctx.strokeStyle = `rgba(220, 255, 230, ${bolt.opacity})`;
        ctx.lineWidth = seg.isBranch ? 1.5 : 2.8;
        ctx.shadowColor = '#4FD050';
        ctx.shadowBlur = 18;
        ctx.stroke();

        ctx.strokeStyle = `rgba(79, 208, 80, ${bolt.opacity * 0.7})`;
        ctx.lineWidth = seg.isBranch ? 3 : 6;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    }

    thunderAnimationId = requestAnimationFrame(render);
  }

  render();

  return () => {
    window.removeEventListener('resize', onResize);
    if (thunderAnimationId) cancelAnimationFrame(thunderAnimationId);
    if (thunderLightningTimeout) clearTimeout(thunderLightningTimeout);
  };
}

function startFallingLeaves(canvas) {
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const onResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', onResize);

  const leaves = [];
  const LEAF_COUNT = 45;
  const colors = [
    'rgba(134, 239, 172, 0.85)',
    'rgba(74, 222, 128, 0.8)',
    'rgba(163, 230, 53, 0.75)',
    'rgba(250, 204, 21, 0.7)',
    'rgba(160, 212, 255, 0.75)'
  ];

  for (let i = 0; i < LEAF_COUNT; i++) {
    leaves.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: 14 + Math.random() * 18,
      speedY: 1.4 + Math.random() * 1.8,
      speedX: -0.6 + Math.random() * 1.2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      swayAmp: 18 + Math.random() * 25,
      swayFreq: 0.015 + Math.random() * 0.02,
      swayOffset: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      aspect: 0.45 + Math.random() * 0.35
    });
  }

  let time = 0;
  function render() {
    ctx.clearRect(0, 0, width, height);
    time++;

    for (const leaf of leaves) {
      leaf.y += leaf.speedY;
      leaf.x += leaf.speedX + Math.sin(time * leaf.swayFreq + leaf.swayOffset) * 0.8;
      leaf.rotation += leaf.rotSpeed;

      if (leaf.y > height + 40) {
        leaf.y = -30;
        leaf.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);

      ctx.beginPath();
      ctx.moveTo(0, -leaf.size);
      ctx.bezierCurveTo(leaf.size * leaf.aspect * 1.6, -leaf.size * 0.3, leaf.size * leaf.aspect * 1.4, leaf.size * 0.6, 0, leaf.size);
      ctx.bezierCurveTo(-leaf.size * leaf.aspect * 1.4, leaf.size * 0.6, -leaf.size * leaf.aspect * 1.6, -leaf.size * 0.3, 0, -leaf.size);
      ctx.fillStyle = leaf.color;
      ctx.shadowColor = 'rgba(134, 239, 172, 0.4)';
      ctx.shadowBlur = 8;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, -leaf.size * 0.8);
      ctx.lineTo(0, leaf.size * 0.9);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    }

    leavesAnimationId = requestAnimationFrame(render);
  }

  render();

  return () => {
    window.removeEventListener('resize', onResize);
    if (leavesAnimationId) cancelAnimationFrame(leavesAnimationId);
  };
}

function playMonsterIntro(onComplete) {
  if (!monsterIntroOverlay) {
    if (onComplete) onComplete();
    return;
  }

  clearMonsterIntro();
  monsterIntroOverlay.style.display = 'flex';
  monsterIntroOverlay.style.opacity = '1';
  monsterIntroOverlay.setAttribute('aria-hidden', 'false');

  const thunderCanvas = document.getElementById('thunder-canvas');
  const flashEl = document.getElementById('lightning-flash-screen');
  stopThunderstormFn = startThunderstorm(thunderCanvas, flashEl);

  let remainingMs = 5000;
  const totalMs = 5000;

  monsterIntroInterval = setInterval(() => {
    remainingMs -= 100;
    const progressFrac = Math.max(0, (totalMs - remainingMs) / totalMs);
    if (monsterIntroBarFill) {
      monsterIntroBarFill.style.width = `${progressFrac * 100}%`;
    }
    if (monsterIntroCountdown) {
      monsterIntroCountdown.textContent = `${(Math.max(0, remainingMs) / 1000).toFixed(1)}s`;
    }

    if (remainingMs <= 0) {
      clearInterval(monsterIntroInterval);
      finishMonsterIntro(onComplete);
    }
  }, 100);

  window._finishMonsterIntro = () => {
    clearInterval(monsterIntroInterval);
    finishMonsterIntro(onComplete);
  };
}

function skipMonsterIntro() {
  if (window._finishMonsterIntro) {
    window._finishMonsterIntro();
    window._finishMonsterIntro = null;
  } else if (monsterIntroOverlay) {
    monsterIntroOverlay.style.display = 'none';
  }
}

function finishMonsterIntro(onComplete) {
  if (stopThunderstormFn) {
    stopThunderstormFn();
    stopThunderstormFn = null;
  }
  try {
    document.documentElement.classList.remove('preload-monster-intro');
  } catch(e) {}

  if (monsterIntroOverlay) {
    monsterIntroOverlay.style.opacity = '0';
    monsterIntroOverlay.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
      monsterIntroOverlay.style.display = 'none';
      monsterIntroOverlay.style.opacity = '1';
      monsterIntroOverlay.setAttribute('aria-hidden', 'true');
      if (onComplete) onComplete();
    }, 400);
  } else if (onComplete) {
    onComplete();
  }
}

function clearMonsterIntro() {
  if (monsterIntroInterval) clearInterval(monsterIntroInterval);
  if (stopThunderstormFn) {
    stopThunderstormFn();
    stopThunderstormFn = null;
  }
}

function playCalmIntro(onComplete) {
  if (!calmIntroOverlay) {
    if (onComplete) onComplete();
    return;
  }

  clearCalmIntro();
  calmIntroOverlay.style.display = 'flex';
  calmIntroOverlay.style.opacity = '1';
  calmIntroOverlay.setAttribute('aria-hidden', 'false');

  const leavesCanvas = document.getElementById('leaves-canvas');
  stopFallingLeavesFn = startFallingLeaves(leavesCanvas);

  let remainingMs = 5000;
  const totalMs = 5000;

  calmIntroInterval = setInterval(() => {
    remainingMs -= 100;
    const progressFrac = Math.max(0, (totalMs - remainingMs) / totalMs);
    if (calmIntroBarFill) {
      calmIntroBarFill.style.width = `${progressFrac * 100}%`;
    }

    if (remainingMs <= 0) {
      clearInterval(calmIntroInterval);
      finishCalmIntro(onComplete);
    }
  }, 100);

  window._finishCalmIntro = () => {
    clearInterval(calmIntroInterval);
    finishCalmIntro(onComplete);
  };
}

function skipCalmIntro() {
  if (window._finishCalmIntro) {
    window._finishCalmIntro();
    window._finishCalmIntro = null;
  } else if (calmIntroOverlay) {
    calmIntroOverlay.style.display = 'none';
  }
}

function finishCalmIntro(onComplete) {
  if (stopFallingLeavesFn) {
    stopFallingLeavesFn();
    stopFallingLeavesFn = null;
  }
  try {
    document.documentElement.classList.remove('preload-calm-intro');
  } catch(e) {}

  if (calmIntroOverlay) {
    calmIntroOverlay.style.opacity = '0';
    calmIntroOverlay.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
      calmIntroOverlay.style.display = 'none';
      calmIntroOverlay.style.opacity = '1';
      calmIntroOverlay.setAttribute('aria-hidden', 'true');
      if (onComplete) onComplete();
    }, 400);
  } else if (onComplete) {
    onComplete();
  }
}

function clearCalmIntro() {
  if (calmIntroInterval) clearInterval(calmIntroInterval);
  if (stopFallingLeavesFn) {
    stopFallingLeavesFn();
    stopFallingLeavesFn = null;
  }
}

function setUIMode(mode, persist = true) {
  state.uiMode = (mode === 'calm') ? 'calm' : 'monster';

  // Always ensure Purple theme is on by default whenever entering or switching modes
  setTheme('default', false);

  if (state.uiMode === 'calm') {
    bodyEl.classList.remove('monster-mode');
    bodyEl.classList.add('calm-mode');
    if (labelCalm) labelCalm.classList.add('active');
    if (labelMonster) labelMonster.classList.remove('active');
    if (modeToggleSlider) modeToggleSlider.setAttribute('aria-checked', 'false');
    stopTerminalSimulation();
  } else {
    bodyEl.classList.remove('calm-mode');
    bodyEl.classList.add('monster-mode');
    if (labelMonster) labelMonster.classList.add('active');
    if (labelCalm) labelCalm.classList.remove('active');
    if (modeToggleSlider) modeToggleSlider.setAttribute('aria-checked', 'true');
    if (state.isDownloadActive && state.terminalStatus === 'idle') {
      startTerminalSimulation();
    }
  }

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY_UI_MODE, state.uiMode);
    } catch (e) {}
  }
}

function toggleUIMode(targetMode) {
  if (targetMode === 'calm') {
    setUIMode('calm', true);
  } else if (targetMode === 'monster') {
    setUIMode('monster', true);
  } else {
    const newMode = (state.uiMode === 'monster') ? 'calm' : 'monster';
    setUIMode(newMode, true);
  }
}

function loadUIMode() {
  try {
    const savedMode = localStorage.getItem(STORAGE_KEY_UI_MODE);
    if (savedMode === 'calm' || savedMode === 'monster') {
      setUIMode(savedMode, false);
      return;
    }
  } catch (e) {}
  setUIMode('monster', false);
}

/* --------------------------------------------------------------------------
   2. DYNAMIC COLOR THEMES CONTROLLER & THUNDERSTORM EFFECT
   -------------------------------------------------------------------------- */

let themeStormAnimationId = null;
let themeStormTimeout = null;

function triggerThemeThunderstorm(theme) {
  const canvas = document.getElementById('theme-storm-canvas');
  const flashEl = document.getElementById('theme-storm-flash');
  if (!canvas) return;

  if (themeStormAnimationId) {
    cancelAnimationFrame(themeStormAnimationId);
    themeStormAnimationId = null;
  }
  if (themeStormTimeout) {
    clearTimeout(themeStormTimeout);
    themeStormTimeout = null;
  }

  const ctx = canvas.getContext('2d');
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;

  canvas.style.display = 'block';

  // Specific theme lightning parameters
  let config = {
    coreColor: '#FFFFFF',
    glowColor: '#B79CFF',
    outerGlow: '#9333EA',
    flashBg: 'rgba(183, 156, 255, 0.45)',
    particleColor: '#C084FC',
    sparkColor: 'rgba(216, 180, 254, 0.9)'
  };

  if (theme === 'audio') {
    config = {
      coreColor: '#FFFFFF',
      glowColor: '#4FD08A',
      outerGlow: '#16A34A',
      flashBg: 'rgba(79, 208, 138, 0.45)',
      particleColor: '#4ADE80',
      sparkColor: 'rgba(134, 239, 172, 0.9)'
    };
  } else if (theme === 'video') {
    config = {
      coreColor: '#FFFFFF',
      glowColor: '#D9C23F',
      outerGlow: '#CA8A04',
      flashBg: 'rgba(217, 194, 63, 0.45)',
      particleColor: '#FACC15',
      sparkColor: 'rgba(253, 224, 71, 0.9)'
    };
  }

  // Thunderstorm Flash Screen Pulse
  if (flashEl) {
    flashEl.style.backgroundColor = config.flashBg;
    flashEl.style.opacity = '0.9';
    setTimeout(() => { if (flashEl) flashEl.style.opacity = '0'; }, 70);
    setTimeout(() => {
      if (flashEl) {
        flashEl.style.opacity = '0.55';
        setTimeout(() => { if (flashEl) flashEl.style.opacity = '0'; }, 60);
      }
    }, 120);
  }

  // Generate 4 to 6 explosive lightning bolts striking across the viewport
  const bolts = [];
  const boltCount = 5;

  for (let b = 0; b < boltCount; b++) {
    const startX = (width * (0.12 + 0.76 * (b / (boltCount - 1 || 1)))) + (Math.random() - 0.5) * 60;
    const startY = 0;
    const targetX = startX + (Math.random() - 0.5) * (width * 0.35);
    const targetY = height * (0.65 + Math.random() * 0.35);

    const segments = [];
    let curX = startX;
    let curY = startY;
    const steps = 16 + Math.floor(Math.random() * 10);
    const dx = (targetX - startX) / steps;
    const dy = (targetY - startY) / steps;

    for (let s = 0; s < steps; s++) {
      const nextX = curX + dx + (Math.random() - 0.5) * 65;
      const nextY = curY + dy + (Math.random() - 0.5) * 18;
      segments.push({ x1: curX, y1: curY, x2: nextX, y2: nextY, isBranch: false });

      // Secondary branches
      if (Math.random() > 0.4) {
        let subX = nextX;
        let subY = nextY;
        const branchSteps = 3 + Math.floor(Math.random() * 5);
        for (let k = 0; k < branchSteps; k++) {
          const bNextX = subX + (Math.random() - 0.5) * 55;
          const bNextY = subY + 18 + Math.random() * 22;
          segments.push({ x1: subX, y1: subY, x2: bNextX, y2: bNextY, isBranch: true });
          subX = bNextX;
          subY = bNextY;
        }
      }
      curX = nextX;
      curY = nextY;
    }

    bolts.push({
      segments,
      opacity: 1,
      fadeRate: 0.05 + Math.random() * 0.025,
      delay: b * 30
    });
  }

  // Electrical high-voltage spark particles
  const particles = [];
  for (let p = 0; p < 40; p++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * (height * 0.75),
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14,
      size: 2 + Math.random() * 3.5,
      alpha: 1,
      color: config.particleColor
    });
  }

  const startTime = performance.now();
  const maxDuration = 700; // ms

  function render(now) {
    const elapsed = now - startTime;
    ctx.clearRect(0, 0, width, height);

    let anyActive = false;

    // Render bolts
    for (const bolt of bolts) {
      if (elapsed < bolt.delay) continue;
      bolt.opacity -= bolt.fadeRate;
      if (bolt.opacity <= 0) continue;

      anyActive = true;

      for (const seg of bolt.segments) {
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);

        // Core white-hot inner channel
        ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.opacity})`;
        ctx.lineWidth = seg.isBranch ? 1.5 : 2.8;
        ctx.shadowColor = config.glowColor;
        ctx.shadowBlur = 16;
        ctx.stroke();

        // Theme colored outer corona
        ctx.strokeStyle = `${config.glowColor}${Math.floor(bolt.opacity * 220).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = seg.isBranch ? 3.5 : 7;
        ctx.shadowBlur = 28;
        ctx.shadowColor = config.outerGlow;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    }

    // Render spark particles
    for (const pt of particles) {
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.alpha -= 0.038;
      if (pt.alpha > 0) {
        anyActive = true;
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, pt.alpha);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    if (anyActive && elapsed < maxDuration) {
      themeStormAnimationId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, width, height);
      canvas.style.display = 'none';
      themeStormAnimationId = null;
    }
  }

  themeStormAnimationId = requestAnimationFrame(render);
}

function updateThemeDots(theme) {
  const btnDefault = document.getElementById('btn-theme-default');
  const btnAudio = document.getElementById('btn-theme-audio');
  const btnVideo = document.getElementById('btn-theme-video');

  if (btnDefault) btnDefault.classList.toggle('active', theme === 'default');
  if (btnAudio) btnAudio.classList.toggle('active', theme === 'audio');
  if (btnVideo) btnVideo.classList.toggle('active', theme === 'video');
}

function setTheme(theme, persist = false, triggerStorm = false) {
  state.currentTheme = theme;
  updateThemeDots(theme);

  if (triggerStorm) {
    triggerThemeThunderstorm(theme);
  }

  const currentThemeAttr = htmlEl.getAttribute('data-theme');
  if (currentThemeAttr === theme && !triggerStorm) return;

  // Power surge glitch wipe in Monster mode
  if (state.uiMode === 'monster' && powerSurgeOverlay) {
    powerSurgeOverlay.classList.remove('surging');
    void powerSurgeOverlay.offsetWidth; // Force reflow
    powerSurgeOverlay.classList.add('surging');
    setTimeout(() => {
      powerSurgeOverlay.classList.remove('surging');
    }, 420);
  }

  htmlEl.setAttribute('data-theme', theme);

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch (e) {}
  }
}

function selectTheme(theme) {
  setTheme(theme, true, true);
  showToast(`Switched to ${theme.toUpperCase()} theme ⚡`, 'info');
}

function updateThemeForFormat(format) {
  if (format === 'mp3') {
    setTheme('audio', true, true); // Black + Muted Neon Green + Thunderstorm
  } else if (format === 'mp4') {
    setTheme('video', true, true); // Black + Muted Neon Yellow + Thunderstorm
  } else {
    setTheme('default', true, true); // Light Purple + Black + Thunderstorm
  }
}

/* --------------------------------------------------------------------------
   3. CUSTOM CROSSHAIR CURSOR (Monster Mode)
   -------------------------------------------------------------------------- */

function initCustomCursor() {
  if (!customCursorDot || !customCursorReticle) return;

  window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    customCursorDot.style.left = `${x}px`;
    customCursorDot.style.top = `${y}px`;

    customCursorReticle.style.left = `${x}px`;
    customCursorReticle.style.top = `${y}px`;
  });

  document.addEventListener('mouseover', (e) => {
    const interactive = e.target.closest('button, a, input, textarea, .format-card, .quality-pill, .mode-slider, .theme-dot-btn');
    if (interactive) {
      customCursorReticle.style.transform = 'translate(-50%, -50%) scale(1.35)';
      customCursorReticle.style.borderColor = 'var(--accent)';
    } else {
      customCursorReticle.style.transform = 'translate(-50%, -50%) scale(1)';
      customCursorReticle.style.borderColor = 'var(--accent)';
    }
  });
}

/* --------------------------------------------------------------------------
   4. CIRCULAR PROGRESS RING (Monotonic Smoothing Loop)
   -------------------------------------------------------------------------- */

function setProgressRing(percent) {
  if (!progressRingCircle) return;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = RING_CIRCUMFERENCE - (clamped / 100) * RING_CIRCUMFERENCE;
  progressRingCircle.style.strokeDashoffset = offset;
}

function smoothProgressTick() {
  // Smooth easing lerp toward target
  const diff = state.highestSeenProgress - state.displayProgress;
  
  if (Math.abs(diff) > 0.05) {
    state.displayProgress += diff * 0.08;
  } else {
    state.displayProgress = state.highestSeenProgress;
  }

  const rounded = Math.round(state.displayProgress);
  setProgressRing(state.displayProgress);

  if (progressRingPercent) {
    progressRingPercent.textContent = `${rounded}%`;
  }

  if (state.displayProgress >= 100) {
    if (progressRingStage) progressRingStage.textContent = 'READY';
    if (ringCaptionDetail) ringCaptionDetail.textContent = 'Streams extracted successfully';
  } else if (state.displayProgress > 0) {
    if (progressRingStage) progressRingStage.textContent = 'SYNCING';
    if (ringCaptionDetail) ringCaptionDetail.textContent = `Streaming data: ${rounded}%`;
  }

  state.progressRafId = requestAnimationFrame(smoothProgressTick);
}

function updateJobProgressSmoothing(realPercent) {
  // Never move backwards during an active session
  if (realPercent > state.highestSeenProgress) {
    state.highestSeenProgress = realPercent;
  }
}

function resetProgressRing() {
  state.realProgress = 0;
  state.highestSeenProgress = 0;
  state.displayProgress = 0;
  setProgressRing(0);
  if (progressRingPercent) progressRingPercent.textContent = '0%';
  if (progressRingStage) progressRingStage.textContent = 'ARMED';
  if (ringCaptionDetail) ringCaptionDetail.textContent = 'Awaiting execution target';
}

/* --------------------------------------------------------------------------
   5. HACKING TERMINAL, SPACE JOURNEY & CALM PROCESS MONITOR
   -------------------------------------------------------------------------- */

function updateCalmProcessStatus(stage, extra = '') {
  const calmScreenCard = document.getElementById('calm-screen-card');
  const calmStatusBadge = document.getElementById('calm-status-badge');
  const calmAvatarIcon = document.getElementById('calm-avatar-icon');
  const calmProcessTitle = document.getElementById('calm-process-title');
  const calmProcessDesc = document.getElementById('calm-process-desc');
  const step1 = document.getElementById('calm-step-1');
  const step2 = document.getElementById('calm-step-2');
  const step3 = document.getElementById('calm-step-3');
  const step4 = document.getElementById('calm-step-4');

  if (!calmScreenCard) return;

  const setSteps = (activeStep) => {
    [step1, step2, step3, step4].forEach((s, idx) => {
      if (s) s.classList.toggle('active', (idx + 1) === activeStep);
    });
  };

  calmScreenCard.classList.remove('processing', 'failed');

  if (stage === 'idle') {
    if (calmStatusBadge) calmStatusBadge.textContent = 'STANDBY';
    if (calmAvatarIcon) calmAvatarIcon.textContent = '🕊️';
    if (calmProcessTitle) calmProcessTitle.textContent = 'Ready for Stream Extraction';
    if (calmProcessDesc) calmProcessDesc.textContent = 'Paste your media links and click Start Download to begin.';
    setSteps(1);
  } else if (stage === 'extracting') {
    calmScreenCard.classList.add('processing');
    if (calmStatusBadge) calmStatusBadge.textContent = 'EXTRACTING';
    if (calmAvatarIcon) calmAvatarIcon.textContent = '🌱';
    if (calmProcessTitle) calmProcessTitle.textContent = 'Extracting Stream Metadata...';
    if (calmProcessDesc) calmProcessDesc.textContent = 'Connecting to media servers & unlocking direct stream feeds...';
    setSteps(2);
  } else if (stage === 'downloading') {
    calmScreenCard.classList.add('processing');
    const percent = extra || 0;
    if (calmStatusBadge) calmStatusBadge.textContent = `DOWNLOADING (${percent}%)`;
    if (calmAvatarIcon) calmAvatarIcon.textContent = '🌊';
    if (calmProcessTitle) calmProcessTitle.textContent = `Downloading Media Streams (${percent}%)...`;
    if (calmProcessDesc) calmProcessDesc.textContent = 'Receiving media packets smoothly into your download queue.';
    setSteps(3);
  } else if (stage === 'success') {
    if (calmStatusBadge) calmStatusBadge.textContent = 'COMPLETED';
    if (calmAvatarIcon) calmAvatarIcon.textContent = '🌸';
    if (calmProcessTitle) calmProcessTitle.textContent = 'Download Complete & Ready!';
    if (calmProcessDesc) calmProcessDesc.textContent = 'Your files are ready in the queue below. Enjoy your media.';
    setSteps(4);
  } else if (stage === 'failed') {
    calmScreenCard.classList.add('failed');
    if (calmStatusBadge) calmStatusBadge.textContent = 'FAILED';
    if (calmAvatarIcon) calmAvatarIcon.textContent = '🍂';
    if (calmProcessTitle) calmProcessTitle.textContent = 'Extraction Encountered an Issue';
    if (calmProcessDesc) calmProcessDesc.textContent = extra || 'The media could not be captured. Please check the link and try again.';
    setSteps(1);
  }
}

function resetTerminalToIdle() {
  stopTerminalSimulation();
  state.terminalStatus = 'idle';
  state.terminalStepIndex = 0;
  state.linesSinceRefuel = 0;

  updateCalmProcessStatus('idle');

  if (terminalOutput) {
    terminalOutput.innerHTML = '<div class="term-line idle-line">&gt; Awaiting target...<span class="term-cursor">_</span></div>';
  }
  if (terminalStatusBadge) {
    terminalStatusBadge.textContent = 'PORT: 443 [STANDBY]';
  }

  // Reset Subviews
  if (targetEntityView) targetEntityView.style.display = 'flex';
  if (rocketLaunchStage) rocketLaunchStage.style.display = 'none';
  if (spaceJourneyView) spaceJourneyView.style.display = 'none';
  if (rocketBlastView) rocketBlastView.style.display = 'none';
  if (missionSuccessView) missionSuccessView.style.display = 'none';

  if (targetEntityName) {
    targetEntityName.textContent = 'NO TARGET';
    targetEntityName.classList.remove('glitching');
  }
  if (targetEntitySub) targetEntitySub.textContent = 'SECURE LINK STANDBY';
  if (targetCoordText) targetCoordText.textContent = 'LOC: UNKNOWN';

  if (targetScreenCard) {
    targetScreenCard.classList.remove('launch-shaking');
    targetScreenCard.classList.remove('failed-blast');
    targetScreenCard.classList.remove('success-blue');
  }
}

function startTerminalSimulation() {
  if (state.terminalStatus === 'running') return;
  state.terminalStatus = 'running';
  state.terminalStepIndex = 0;
  state.linesSinceRefuel = 0;

  if (terminalOutput) {
    terminalOutput.innerHTML = '';
  }
  if (terminalStatusBadge) {
    terminalStatusBadge.textContent = 'STATUS: INFILTRATING';
  }

  runNextTerminalStep();
}

function runNextTerminalStep() {
  if (state.terminalStatus !== 'running') return;

  // Insert Refuel Break roughly every 8 log lines
  state.linesSinceRefuel++;
  if (state.linesSinceRefuel >= 8) {
    state.linesSinceRefuel = 0;
    insertRefuelBreak();
    state.terminalTimer = setTimeout(runNextTerminalStep, 1700);
    return;
  }

  const step = HACKING_STEPS[state.terminalStepIndex];
  if (!step) {
    state.terminalStepIndex = 3; // Loop back through core infiltration steps
    runNextTerminalStep();
    return;
  }

  appendTerminalLine(step.text);
  updateTargetTelemetry(step);

  state.terminalStepIndex++;
  // Increase duration for rocket countdown and ISS access steps so user can clearly see and enjoy them
  let nextInterval;
  if (step.isLaunch) {
    nextInterval = step.countdown && step.countdown.includes('ACCESS') ? 3500 : 2800;
  } else {
    nextInterval = 1400 + Math.random() * 500;
  }
  state.terminalTimer = setTimeout(runNextTerminalStep, nextInterval);
}

function insertRefuelBreak() {
  let nextIdx;
  do {
    nextIdx = Math.floor(Math.random() * REFUEL_LINES.length);
  } while (nextIdx === state.lastRefuelIndex && REFUEL_LINES.length > 1);
  state.lastRefuelIndex = nextIdx;

  const line = REFUEL_LINES[nextIdx];
  const div = document.createElement('div');
  div.className = 'term-line refuel-break';
  div.innerHTML = `&gt;&gt; ${escapeHtml(line)}`;
  if (terminalOutput) {
    terminalOutput.appendChild(div);
    scrollTerminalToBottom();
  }
}

function appendTerminalLine(text, customClass = '') {
  if (!terminalOutput) return;

  const existingCursor = terminalOutput.querySelector('.term-cursor');
  if (existingCursor) existingCursor.remove();

  const line = document.createElement('div');
  line.className = `term-line ${customClass}`;
  line.innerHTML = `&gt; ${escapeHtml(text)} <span class="term-cursor">_</span>`;
  terminalOutput.appendChild(line);

  scrollTerminalToBottom();
}

function scrollTerminalToBottom() {
  if (!terminalOutput) return;
  const container = terminalOutput.parentElement;
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

function updateSpaceJourney(percent) {
  if (!spaceJourneyView) return;
  if (state.terminalStatus === 'failed' || state.terminalStatus === 'success') return;

  // Ensure other subviews are hidden
  if (targetEntityView) targetEntityView.style.display = 'none';
  if (rocketLaunchStage) rocketLaunchStage.style.display = 'none';
  if (rocketBlastView) rocketBlastView.style.display = 'none';
  if (missionSuccessView) missionSuccessView.style.display = 'none';
  spaceJourneyView.style.display = 'flex';

  if (targetScreenCard) {
    targetScreenCard.classList.remove('launch-shaking');
    targetScreenCard.classList.remove('failed-blast');
    targetScreenCard.classList.remove('success-blue');
  }

  const p = Math.max(0, Math.min(100, percent || 0));

  const visualRocketLaunch = document.getElementById('visual-rocket-launch');
  const visualRocketMaxq = document.getElementById('visual-rocket-maxq');
  const visualRocketIss = document.getElementById('visual-rocket-iss');
  const visualRocketDeep = document.getElementById('visual-rocket-deep');

  const stepRocketLaunch = document.getElementById('step-rocket-launch');
  const stepRocketMaxq = document.getElementById('step-rocket-maxq');
  const stepRocketIss = document.getElementById('step-rocket-iss');
  const stepRocketDeep = document.getElementById('step-rocket-deep');

  const setTelemetryStep = (activeKey) => {
    if (visualRocketLaunch) visualRocketLaunch.style.display = activeKey === 'launch' ? 'flex' : 'none';
    if (visualRocketMaxq) visualRocketMaxq.style.display = activeKey === 'maxq' ? 'flex' : 'none';
    if (visualRocketIss) visualRocketIss.style.display = activeKey === 'iss' ? 'flex' : 'none';
    if (visualRocketDeep) visualRocketDeep.style.display = activeKey === 'deep' ? 'flex' : 'none';

    if (stepRocketLaunch) stepRocketLaunch.classList.toggle('active', activeKey === 'launch');
    if (stepRocketMaxq) stepRocketMaxq.classList.toggle('active', activeKey === 'maxq');
    if (stepRocketIss) stepRocketIss.classList.toggle('active', activeKey === 'iss');
    if (stepRocketDeep) stepRocketDeep.classList.toggle('active', activeKey === 'deep');
  };

  if (p < 25) {
    setTelemetryStep('launch');
    if (spaceStatusBadge) spaceStatusBadge.textContent = 'TELEMETRY LINK // UPLINK ESTABLISHED';
    if (spaceDestinationTitle) spaceDestinationTitle.textContent = 'STAGE: ROCKET LAUNCH ASCENT';
    if (spaceSpeedReadout) spaceSpeedReadout.textContent = 'PROPULSION: 100% THRUST // T-MINUS ACTIVE';
    if (targetCoordText) targetCoordText.textContent = 'LOC: LAUNCHPAD TRAJECTORY';
  } else if (p < 50) {
    setTelemetryStep('maxq');
    if (spaceStatusBadge) spaceStatusBadge.textContent = 'SUPERSONIC MAX-Q ASCENT NOMINAL';
    if (spaceDestinationTitle) spaceDestinationTitle.textContent = 'STAGE: SUPERSONIC MAX-Q ASCENT';
    if (spaceSpeedReadout) spaceSpeedReadout.textContent = 'VELOCITY: MACH 4.8 // MACH CONE ARMED';
    if (targetCoordText) targetCoordText.textContent = 'LOC: HIGH STRATOSPHERE';
  } else if (p < 75) {
    setTelemetryStep('iss');
    if (spaceStatusBadge) spaceStatusBadge.textContent = 'ACCESSING ISS ORBITAL NODE LINK';
    if (spaceDestinationTitle) spaceDestinationTitle.textContent = 'STAGE: ACCESSING ISS ORBITAL NODE';
    if (spaceSpeedReadout) spaceSpeedReadout.textContent = 'RELAY BANDWIDTH: 100 TBPS // ALT: 420 KM';
    if (targetCoordText) targetCoordText.textContent = 'LOC: ISS DOCKING GRID';
  } else {
    setTelemetryStep('deep');
    if (spaceStatusBadge) spaceStatusBadge.textContent = 'DEEP SPACE WARP RELAY SECURED';
    if (spaceDestinationTitle) spaceDestinationTitle.textContent = 'STAGE: DEEP SPACE WARP RELAY';
    if (spaceSpeedReadout) spaceSpeedReadout.textContent = 'VELOCITY: 115,000 KM/H // HYPER-STREAM';
    if (targetCoordText) targetCoordText.textContent = 'LOC: DEEP ORBIT MESH';
  }
}

function updateTargetTelemetry(step) {
  if (!targetScreenCard) return;

  if (targetCoordText && step.coord) {
    targetCoordText.textContent = `LOC: ${step.coord}`;
  }

  if (step.isLaunch) {
    if (targetEntityView) targetEntityView.style.display = 'none';
    if (spaceJourneyView) spaceJourneyView.style.display = 'none';
    if (rocketBlastView) rocketBlastView.style.display = 'none';
    if (missionSuccessView) missionSuccessView.style.display = 'none';
    if (rocketLaunchStage) rocketLaunchStage.style.display = 'flex';
    if (rocketCountdownOverlay) rocketCountdownOverlay.textContent = step.countdown || 'LAUNCHING';
    targetScreenCard.classList.add('launch-shaking');
  } else if (step.isSpaceCruise) {
    updateSpaceJourney(state.displayProgress || 10);
  } else {
    if (rocketLaunchStage) rocketLaunchStage.style.display = 'none';
    if (spaceJourneyView) spaceJourneyView.style.display = 'none';
    if (rocketBlastView) rocketBlastView.style.display = 'none';
    if (missionSuccessView) missionSuccessView.style.display = 'none';
    if (targetEntityView) targetEntityView.style.display = 'flex';
    targetScreenCard.classList.remove('launch-shaking');

    if (targetEntityName) {
      targetEntityName.textContent = step.target;
      targetEntityName.classList.remove('glitching');
      void targetEntityName.offsetWidth;
      targetEntityName.classList.add('glitching');
    }
    if (targetEntitySub) {
      targetEntitySub.textContent = `PENETRATING NODE // ${step.target}`;
    }
  }
}

function triggerTerminalSuccess() {
  stopTerminalSimulation();
  state.terminalStatus = 'success';

  appendTerminalLine("[MISSION SUCCESSFUL] Package ready in blue telemetry. All streams secured!", 'success-line');
  if (terminalStatusBadge) {
    terminalStatusBadge.textContent = 'STATUS: MISSION SUCCESSFUL';
  }

  if (rocketLaunchStage) rocketLaunchStage.style.display = 'none';
  if (spaceJourneyView) spaceJourneyView.style.display = 'none';
  if (targetEntityView) targetEntityView.style.display = 'none';
  if (rocketBlastView) rocketBlastView.style.display = 'none';
  if (missionSuccessView) missionSuccessView.style.display = 'flex';

  if (targetScreenCard) {
    targetScreenCard.classList.remove('launch-shaking');
    targetScreenCard.classList.remove('failed-blast');
    targetScreenCard.classList.add('success-blue');
  }

  if (targetCoordText) {
    targetCoordText.textContent = 'LOC: PACKAGE READY';
  }
}

function triggerTerminalFailure(errorMsg) {
  stopTerminalSimulation();
  state.terminalStatus = 'failed';

  appendTerminalLine(`[CRITICAL FAILURE] ROCKET DETONATED! MISSION FAILED RUN RUN RUN... ${errorMsg || ''}`, 'failure-line');
  if (terminalStatusBadge) {
    terminalStatusBadge.textContent = 'STATUS: MISSION FAILED [RUN RUN RUN]';
  }

  if (rocketLaunchStage) rocketLaunchStage.style.display = 'none';
  if (spaceJourneyView) spaceJourneyView.style.display = 'none';
  if (targetEntityView) targetEntityView.style.display = 'none';
  if (missionSuccessView) missionSuccessView.style.display = 'none';
  if (rocketBlastView) rocketBlastView.style.display = 'flex';

  if (targetScreenCard) {
    targetScreenCard.classList.remove('launch-shaking');
    targetScreenCard.classList.remove('success-blue');
    targetScreenCard.classList.add('failed-blast');
  }

  if (targetCoordText) {
    targetCoordText.textContent = 'LOC: RUN RUN RUN';
  }
}

function stopTerminalSimulation() {
  if (state.terminalTimer) {
    clearTimeout(state.terminalTimer);
    state.terminalTimer = null;
  }
}

/* --------------------------------------------------------------------------
   6. RESOLUTION LABELS & DEFAULT PREFERENCES
   -------------------------------------------------------------------------- */

function getQualityLabel(quality) {
  switch (String(quality).toLowerCase()) {
    case 'best': return 'Auto Best (Highest)';
    case '1080': return '1080p Full HD';
    case '720': return '720p HD';
    case '480': return '480p SD';
    case '360': return '360p Data Saver';
    case '240': return '240p Low';
    case '144': return '144p Minimal';
    default: return `${quality}p`;
  }
}

function getShortQualityLabel(quality) {
  const q = String(quality || '720').toLowerCase();
  if (q === 'best') return 'Best';
  return `${q}p`;
}

function showToast(message, type = 'info', duration = 3200) {
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  } else if (type === 'warn') {
    iconSvg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
  } else {
    iconSvg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
  }

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <span class="toast-text">${escapeHtml(message)}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, duration);
}

function updateDefaultVideoQualityUI() {
  const q = state.defaultVideoQuality;
  const label = getQualityLabel(q);

  if (activeDefaultQualityLabel) {
    activeDefaultQualityLabel.textContent = label;
  }

  if (headerDefaultText) {
    headerDefaultText.textContent = `Default Video: ${getShortQualityLabel(q)}`;
  }

  qualityPills.forEach(pill => {
    const pillQuality = pill.getAttribute('data-quality');
    const defaultTag = pill.querySelector('.q-default-tag');
    if (defaultTag) {
      defaultTag.style.display = (pillQuality === q) ? 'inline-block' : 'none';
    }
  });

  const defaultQualitySelect = document.getElementById('default-quality-select');
  if (defaultQualitySelect) {
    defaultQualitySelect.value = q;
  }

  updateSetDefaultButtonLabel();
}

function updateSetDefaultButtonLabel() {
  if (!setDefaultQualityBtnText) return;
  if (state.selectedQuality === state.defaultVideoQuality) {
    setDefaultQualityBtnText.textContent = `Current Default: ${getShortQualityLabel(state.defaultVideoQuality)}`;
  } else {
    setDefaultQualityBtnText.textContent = `Set ${getShortQualityLabel(state.selectedQuality)} as Default Video Quality`;
  }
}

function saveDefaultVideoQuality(quality, showFeedback = false) {
  state.defaultVideoQuality = String(quality || '720').toLowerCase();

  try {
    localStorage.setItem(STORAGE_KEY_DEFAULT_VIDEO_QUALITY, state.defaultVideoQuality);
  } catch (e) {
    console.warn('Could not save default video quality to localStorage', e);
  }

  updateDefaultVideoQualityUI();

  if (showFeedback) {
    if (setDefaultQualityBtnText) {
      setDefaultQualityBtnText.textContent = '✓ Saved as Default!';
      if (setDefaultVideoQualityBtn) setDefaultVideoQualityBtn.classList.add('saved');
      setTimeout(() => {
        updateSetDefaultButtonLabel();
        if (setDefaultVideoQualityBtn) setDefaultVideoQualityBtn.classList.remove('saved');
      }, 2000);
    }
    showToast(`Default video quality saved: ${getQualityLabel(state.defaultVideoQuality)}`, 'success');
  }
}

/* --------------------------------------------------------------------------
   7. FORMAT SELECTION & RESOLUTION MATRIX
   -------------------------------------------------------------------------- */

function applyMode(format, quality, triggerThemeChange = false) {
  if (!format) {
    state.selectedFormat = null;
    if (formatMp3Label && formatMp4Label) {
      formatMp3Label.classList.remove('active');
      formatMp4Label.classList.remove('active');
      formatMp3Label.setAttribute('aria-checked', 'false');
      formatMp4Label.setAttribute('aria-checked', 'false');

      const mp3Radio = formatMp3Label.querySelector('input[type="radio"]');
      const mp4Radio = formatMp4Label.querySelector('input[type="radio"]');
      if (mp3Radio) mp3Radio.checked = false;
      if (mp4Radio) mp4Radio.checked = false;

      const mp3ArmedText = formatMp3Label.querySelector('.armed-text');
      const mp4ArmedText = formatMp4Label.querySelector('.armed-text');
      if (mp3ArmedText) mp3ArmedText.textContent = 'SELECT';
      if (mp4ArmedText) mp4ArmedText.textContent = 'SELECT';
    }

    if (formatHintText) {
      formatHintText.textContent = 'SELECT FORMAT (MP3 OR MP4) TO ARM STREAM';
    }

    if (videoQualityGroup) videoQualityGroup.style.display = 'none';
    if (audioQualityInfo) audioQualityInfo.style.display = 'none';

    return;
  }

  state.selectedFormat = (format === 'mp4') ? 'mp4' : 'mp3';
  const isMp4 = state.selectedFormat === 'mp4';

  if (formatMp3Label && formatMp4Label) {
    formatMp3Label.classList.toggle('active', !isMp4);
    formatMp4Label.classList.toggle('active', isMp4);

    formatMp3Label.setAttribute('aria-checked', !isMp4 ? 'true' : 'false');
    formatMp4Label.setAttribute('aria-checked', isMp4 ? 'true' : 'false');

    const mp3Radio = formatMp3Label.querySelector('input[type="radio"]');
    const mp4Radio = formatMp4Label.querySelector('input[type="radio"]');
    if (mp3Radio) mp3Radio.checked = !isMp4;
    if (mp4Radio) mp4Radio.checked = isMp4;

    const mp3ArmedText = formatMp3Label.querySelector('.armed-text');
    const mp4ArmedText = formatMp4Label.querySelector('.armed-text');
    if (mp3ArmedText) mp3ArmedText.textContent = !isMp4 ? 'ARMED' : 'SELECT';
    if (mp4ArmedText) mp4ArmedText.textContent = isMp4 ? 'ARMED' : 'SELECT';
  }

  if (formatHintText) {
    formatHintText.textContent = isMp4 ? 'MP4 VIDEO ARMED // SELECT RESOLUTION' : 'MP3 AUDIO ARMED // 320 KBPS';
  }

  if (isMp4) {
    if (videoQualityGroup) videoQualityGroup.style.display = 'block';
    if (audioQualityInfo) audioQualityInfo.style.display = 'none';
  } else {
    if (videoQualityGroup) videoQualityGroup.style.display = 'none';
    if (audioQualityInfo) audioQualityInfo.style.display = 'flex';
  }

  if (quality) {
    state.selectedQuality = String(quality).toLowerCase();
  }

  qualityPills.forEach(pill => {
    const pillQuality = pill.getAttribute('data-quality');
    const radio = pill.querySelector('input[type="radio"]');
    const isMatch = pillQuality === state.selectedQuality;
    pill.classList.toggle('active', isMatch);
    if (radio) radio.checked = isMatch;
  });

  if (qualityPreviewBadge) {
    qualityPreviewBadge.textContent = getQualityLabel(state.selectedQuality);
  }

  if (triggerThemeChange) {
    updateThemeForFormat(state.selectedFormat);
  }

  updateSetDefaultButtonLabel();
}

function selectFormat(format) {
  applyMode(format, state.selectedQuality, true);
  const modeName = format === 'mp4' ? 'MP4 Video' : 'MP3 Audio';
  showToast(`Selected ${modeName} output format ⚡`, 'info');
}

function loadDefaultPreferences() {
  try {
    const savedQuality = localStorage.getItem(STORAGE_KEY_DEFAULT_VIDEO_QUALITY);
    if (savedQuality && ['best', '1080', '720', '480', '360', '240', '144'].includes(savedQuality.toLowerCase())) {
      state.defaultVideoQuality = savedQuality.toLowerCase();
    }
  } catch (err) {}

  state.selectedQuality = state.defaultVideoQuality;
  updateDefaultVideoQualityUI();

  // Always keep default Purple theme active on mode start
  setTheme('default', false);

  // No format selected by default until user explicitly clicks
  applyMode(null, state.selectedQuality, false);
}

/* --------------------------------------------------------------------------
   8. SYSTEM STATUS & URL HANDLING
   -------------------------------------------------------------------------- */

async function checkSystemStatus() {
  try {
    const res = await fetch('/api/system-status');
    if (!res.ok) return;
    const data = await res.json();
    const statusDot = document.querySelector('.status-dot');

    if (data.tools) {
      const hasYtDlp = data.tools.ytDlp?.available;
      const hasFfmpeg = data.tools.ffmpeg?.available;

      if (hasYtDlp && hasFfmpeg) {
        if (systemStatusText) systemStatusText.textContent = 'Systems Online';
        if (statusDot) statusDot.style.backgroundColor = 'var(--accent)';
      } else if (!hasFfmpeg && !hasYtDlp) {
        if (systemStatusText) systemStatusText.textContent = 'Setup Needed';
        if (statusDot) statusDot.style.backgroundColor = '#f59e0b';
      } else {
        if (systemStatusText) systemStatusText.textContent = 'Engine Ready';
        if (statusDot) statusDot.style.backgroundColor = 'var(--accent)';
      }
    }
  } catch (e) {}
}

/**
 * Real-Time Link Analysis
 * Detects platforms on the fly as user types or pastes links
 */
function analyzeLinks(text) {
  if (!text || !text.trim()) {
    return { totalUrls: 0, platformCounts: {} };
  }
  const lines = text.split(/[\r\n,;]+/).map(s => s.trim()).filter(Boolean);
  const platformCounts = {};
  let totalUrls = 0;

  for (const line of lines) {
    if (!line.startsWith('http://') && !line.startsWith('https://')) {
      if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\//.test(line)) continue;
    }
    totalUrls++;
    let matched = false;
    for (const p of CLIENT_PLATFORMS) {
      if (p.id !== 'generic' && p.regex.test(line)) {
        platformCounts[p.id] = (platformCounts[p.id] || 0) + 1;
        matched = true;
        break;
      }
    }
    if (!matched) {
      platformCounts['generic'] = (platformCounts['generic'] || 0) + 1;
    }
  }

  return { totalUrls, platformCounts };
}

function renderPlatformAnalyzer() {
  const chipsList = document.getElementById('analyzer-chips-list');
  if (!chipsList || !urlInput) return;

  const { totalUrls, platformCounts } = analyzeLinks(urlInput.value);

  if (urlCountBadge) {
    urlCountBadge.textContent = `${totalUrls} URL${totalUrls === 1 ? '' : 's'} detected`;
  }

  const detectedKeys = Object.keys(platformCounts);
  if (detectedKeys.length === 0) {
    chipsList.innerHTML = `<span class="analyzer-placeholder">Paste any YouTube, Instagram, X/Twitter, Facebook, or Snapchat link</span>`;
    return;
  }

  let html = '';
  for (const key of detectedKeys) {
    const p = CLIENT_PLATFORMS.find(item => item.id === key) || { name: key, iconSvg: '🌐', chipClass: 'chip-generic' };
    const count = platformCounts[key];
    html += `
      <div class="platform-chip ${p.chipClass}" title="${p.name} (${count} link${count === 1 ? '' : 's'} detected)">
        <span class="chip-logo-wrap">${p.iconSvg}</span>
        <span class="chip-name-hidden" style="display:none;">${p.name}</span>
        <span class="chip-count-pill">${count}</span>
      </div>
    `;
  }

  chipsList.innerHTML = html;
}

function updateUrlCount() {
  renderPlatformAnalyzer();
}

async function handlePaste() {
  try {
    const clipText = await navigator.clipboard.readText();
    if (clipText && urlInput) {
      if (urlInput.value.trim()) {
        urlInput.value += '\n' + clipText.trim();
      } else {
        urlInput.value = clipText.trim();
      }
      updateUrlCount();
      showToast('Pasted from clipboard', 'info');
    }
  } catch (err) {
    console.warn('Clipboard read failed:', err);
    showToast('Clipboard access unavailable. Please paste manually (Ctrl+V).', 'warn');
  }
}

function handleSampleUrls() {
  if (!urlInput) return;
  urlInput.value = SAMPLE_URLS.join('\n');
  updateUrlCount();
  showToast('Loaded sample multi-platform URLs', 'info');
}

/* --------------------------------------------------------------------------
   9. JOB SUBMISSION & POLLING (Identical Backend Payloads)
   -------------------------------------------------------------------------- */

async function handleStartDownload() {
  if (!urlInput) return;
  const rawText = urlInput.value.trim();
  if (!rawText) {
    showToast('Please enter or paste at least one media URL.', 'warn');
    urlInput.focus();
    return;
  }

  if (!state.selectedFormat) {
    showToast('Please select an output format (MP3 Audio or MP4 Video) before starting download.', 'warn');
    const formatGrid = document.querySelector('.format-grid');
    if (formatGrid) {
      formatGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      formatGrid.classList.add('pulse-alert');
      setTimeout(() => formatGrid.classList.remove('pulse-alert'), 1500);
    }
    return;
  }

  setSubmitLoading(true);
  resetProgressRing();
  bodyEl.classList.add('downloading');
  state.isDownloadActive = true;

  updateCalmProcessStatus('extracting');

  if (state.uiMode === 'monster') {
    startTerminalSimulation();
  }

  try {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        urls: rawText,
        format: state.selectedFormat,
        quality: state.selectedQuality
      })
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.error || 'Failed to submit download jobs.', 'warn');
      setSubmitLoading(false);
      bodyEl.classList.remove('downloading');
      state.isDownloadActive = false;
      triggerTerminalFailure(data.error);
      updateCalmProcessStatus('failed', data.error);
      return;
    }

    if (data.jobs && data.jobs.length > 0) {
      for (const job of data.jobs) {
        state.activeJobs.set(job.id, job);
      }
      urlInput.value = '';
      updateUrlCount();

      const qualityTag = state.selectedFormat === 'mp4' ? ` (${getShortQualityLabel(state.selectedQuality)})` : '';
      showToast(`Initiated ${data.jobs.length} stream extraction(s) [${state.selectedFormat.toUpperCase()}${qualityTag}]`, 'success');
    }

    if (data.invalid && data.invalid.length > 0) {
      showToast(`${data.invalid.length} invalid URL(s) skipped.`, 'warn');
    }

    renderQueue();
    startPolling();
  } catch (err) {
    console.error('Submission error:', err);
    showToast('Network error connecting to backend. Please check server.', 'warn');
    bodyEl.classList.remove('downloading');
    state.isDownloadActive = false;
    triggerTerminalFailure('NETWORK ERROR');
    updateCalmProcessStatus('failed', 'Network error connecting to backend.');
  } finally {
    setSubmitLoading(false);
  }
}

function setSubmitLoading(isLoading) {
  if (!startDownloadBtn) return;
  startDownloadBtn.disabled = isLoading;
  if (btnText) {
    btnText.textContent = isLoading ? 'EXTRACTING STREAMS...' : 'START DOWNLOAD';
  }
}

function startPolling() {
  if (state.isPolling) return;
  state.isPolling = true;

  const poll = async () => {
    if (state.activeJobs.size === 0) {
      stopPolling();
      return;
    }

    const jobIds = Array.from(state.activeJobs.keys()).join(',');
    try {
      const res = await fetch(`/api/jobs?ids=${jobIds}`);
      if (res.ok) {
        const data = await res.json();
        let hasPending = false;
        let totalProgressSum = 0;
        let activeJobsCount = 0;
        let hasFailed = false;

        for (const updatedJob of data.jobs) {
          state.activeJobs.set(updatedJob.id, updatedJob);

          if (updatedJob.status === 'queued' || updatedJob.status === 'processing' || updatedJob.status === 'downloading') {
            hasPending = true;
          }

          if (updatedJob.status === 'failed') {
            hasFailed = true;
          }

          totalProgressSum += (updatedJob.progress || 0);
          activeJobsCount++;
        }

        // Calculate real percentage from backend
        const realOverallPercent = activeJobsCount > 0 ? Math.round(totalProgressSum / activeJobsCount) : 0;
        updateJobProgressSmoothing(realOverallPercent);

        // Update solar space flight in Monster Mode
        if (state.uiMode === 'monster' && state.isDownloadActive && realOverallPercent > 0) {
          updateSpaceJourney(realOverallPercent);
        }

        // Update Calm Mode Process Monitor
        if (hasPending) {
          updateCalmProcessStatus('downloading', realOverallPercent);
        }

        renderQueue();

        if (hasPending) {
          state.pollTimer = setTimeout(poll, 650);
        } else {
          stopPolling();
          bodyEl.classList.remove('downloading');
          state.isDownloadActive = false;

          if (hasFailed) {
            triggerTerminalFailure('Pipeline failed to capture stream.');
            updateCalmProcessStatus('failed', 'One or more streams failed to capture.');
          } else {
            updateJobProgressSmoothing(100);
            updateCalmProcessStatus('success');
            setTimeout(() => {
              triggerTerminalSuccess();
            }, 500);
          }
        }
      } else {
        state.pollTimer = setTimeout(poll, 3000);
      }
    } catch (e) {
      console.error('Polling error:', e);
      state.pollTimer = setTimeout(poll, 4000);
    }
  };

  poll();
}

function stopPolling() {
  state.isPolling = false;
  if (state.pollTimer) {
    clearTimeout(state.pollTimer);
    state.pollTimer = null;
  }
}

/* --------------------------------------------------------------------------
   10. QUEUE RENDERING WITH THEME VARIABLES
   -------------------------------------------------------------------------- */

function renderQueue() {
  if (!queueList) return;
  const jobs = Array.from(state.activeJobs.values());
  const count = jobs.length;
  if (queueTotalCount) {
    queueTotalCount.textContent = `${count} item${count === 1 ? '' : 's'}`;
  }

  if (count === 0) {
    if (emptyQueuePlaceholder) emptyQueuePlaceholder.style.display = 'block';
    if (downloadAllBtn) downloadAllBtn.style.display = 'none';
    if (clearQueueBtn) clearQueueBtn.style.display = 'none';
    const existingCards = queueList.querySelectorAll('.task-card');
    existingCards.forEach(c => c.remove());
    return;
  }

  if (emptyQueuePlaceholder) emptyQueuePlaceholder.style.display = 'none';
  if (clearQueueBtn) clearQueueBtn.style.display = 'inline-flex';

  const completedCount = jobs.filter(j => j.status === 'completed').length;
  if (completedCount > 1 && downloadAllBtn) {
    downloadAllBtn.style.display = 'inline-flex';
  } else if (downloadAllBtn) {
    downloadAllBtn.style.display = 'none';
  }

  const sortedJobs = [...jobs].reverse();
  const currentCardIds = new Set(sortedJobs.map(j => `card-${j.id}`));

  // 1. Remove obsolete cards that no longer exist in state
  const existingCards = queueList.querySelectorAll('.task-card');
  existingCards.forEach(card => {
    if (!currentCardIds.has(card.id)) {
      card.remove();
    }
  });

  // 2. Perform in-place DOM reconciliation (never destroy existing cards)
  sortedJobs.forEach((job) => {
    const cardId = `card-${job.id}`;
    let card = document.getElementById(cardId);
    if (card) {
      updateTaskCard(card, job);
    } else {
      card = createTaskCard(job);
      queueList.appendChild(card);
    }
  });
}

function updateTaskCard(card, job) {
  const platformId = (job.platform && job.platform.id) || 'youtube';
  const platformObj = CLIENT_PLATFORMS.find(p => p.id === platformId) || CLIENT_PLATFORMS[CLIENT_PLATFORMS.length - 1];
  const platformName = (job.platform && job.platform.name) || platformObj.name;
  const isMp4 = (job.format || '').toLowerCase() === 'mp4';
  const qualityDisplay = isMp4
    ? `MP4 • ${getShortQualityLabel(job.quality)}`
    : 'MP3 • 320k';

  // Update status class
  const newClass = `task-card status-${job.status}`;
  if (card.className !== newClass) {
    card.className = newClass;
  }
  card.setAttribute('data-platform', platformId);

  // Update thumbnail if changed
  const thumbImg = card.querySelector('.task-thumb');
  if (thumbImg && job.thumbnail && thumbImg.src !== job.thumbnail) {
    thumbImg.src = job.thumbnail;
  }

  // Update title & metadata
  const titleEl = card.querySelector('.task-title');
  if (titleEl) {
    const title = job.title || (job.status === 'queued' ? 'Fetching stream metadata...' : `${platformName} Stream`);
    if (titleEl.textContent !== title) {
      titleEl.textContent = title;
      titleEl.title = title;
    }
  }

  const metaEl = card.querySelector('.task-meta');
  if (metaEl) {
    let fnEl = metaEl.querySelector('.task-filename, .task-url');
    if (job.filename) {
      if (!fnEl || !fnEl.classList.contains('task-filename')) {
        if (fnEl) fnEl.remove();
        fnEl = document.createElement('div');
        fnEl.className = 'task-filename';
        metaEl.appendChild(fnEl);
      }
      if (fnEl.textContent !== job.filename) {
        fnEl.textContent = job.filename;
        fnEl.title = job.filename;
      }
    }
  }

  // Update status badge
  let badgeClass = 'badge-queued';
  let badgeLabel = 'Queued';
  if (job.status === 'processing') {
    badgeClass = 'badge-processing';
    badgeLabel = job.stage === 'fetching_metadata' ? 'Fetching Info' : 'Processing';
  } else if (job.status === 'downloading') {
    badgeClass = 'badge-processing';
    badgeLabel = `Downloading ${job.progress}%`;
  } else if (job.status === 'completed') {
    badgeClass = 'badge-completed';
    badgeLabel = '✓ Ready';
  } else if (job.status === 'failed') {
    badgeClass = 'badge-failed';
    badgeLabel = '✕ Failed';
  }

  const badgeStatus = card.querySelector('.badge-status');
  if (badgeStatus) {
    const fullBadgeClass = `badge badge-status ${badgeClass}`;
    if (badgeStatus.className !== fullBadgeClass) {
      badgeStatus.className = fullBadgeClass;
    }
    if (badgeStatus.textContent !== badgeLabel) {
      badgeStatus.textContent = badgeLabel;
    }
  }

  // Manage Progress Bar smoothly in place
  let progressContainer = card.querySelector('.progress-container');
  if (job.status === 'queued' || job.status === 'processing' || job.status === 'downloading') {
    const isIndeterminate = job.status === 'queued' || (job.status === 'processing' && job.progress === 0);
    const progressPercent = job.progress || 0;

    if (!progressContainer) {
      progressContainer = document.createElement('div');
      progressContainer.className = 'progress-container';
      progressContainer.innerHTML = `
        <div class="progress-header">
          <span class="prog-stage-label"></span>
          <span class="prog-percent-label"></span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill"></div>
        </div>
      `;
      const bottom = card.querySelector('.task-bottom, .task-error-box');
      if (bottom) {
        card.insertBefore(progressContainer, bottom);
      } else {
        card.appendChild(progressContainer);
      }
    }

    const stageLabel = progressContainer.querySelector('.prog-stage-label');
    const percentLabel = progressContainer.querySelector('.prog-percent-label');
    const barFill = progressContainer.querySelector('.progress-bar-fill');

    const expectedStageText = job.stage === 'fetching_metadata' ? 'Resolving stream container...' : (job.stage === 'downloading' ? 'Extracting chunks...' : 'Queued for pipeline...');
    if (stageLabel && stageLabel.textContent !== expectedStageText) {
      stageLabel.textContent = expectedStageText;
    }
    if (percentLabel && percentLabel.textContent !== `${progressPercent}%`) {
      percentLabel.textContent = `${progressPercent}%`;
    }
    if (barFill) {
      barFill.classList.toggle('indeterminate', isIndeterminate);
      const targetWidth = isIndeterminate ? '40%' : `${progressPercent}%`;
      if (barFill.style.width !== targetWidth) {
        barFill.style.width = targetWidth;
      }
    }
  } else if (progressContainer) {
    progressContainer.remove();
  }

  // Manage Error Box
  let errorEl = card.querySelector('.task-error-box');
  if (job.status === 'failed' && job.error) {
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'task-error-box';
      errorEl.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <span class="error-msg-text"></span>
      `;
      card.appendChild(errorEl);
    }
    const errText = errorEl.querySelector('.error-msg-text');
    if (errText && errText.textContent !== job.error) {
      errText.textContent = job.error;
    }
  } else if (errorEl && job.status !== 'failed') {
    errorEl.remove();
  }

  // Manage Download Link Button
  let bottomEl = card.querySelector('.task-bottom');
  if (job.status === 'completed' && job.downloadUrl) {
    const downloadLabel = isMp4 ? `Save MP4 (${getShortQualityLabel(job.quality)})` : 'Save MP3';
    if (!bottomEl) {
      bottomEl = document.createElement('div');
      bottomEl.className = 'task-bottom';
      card.appendChild(bottomEl);
    }
    const existingAnchor = bottomEl.querySelector('a');
    if (!existingAnchor || existingAnchor.href !== job.downloadUrl) {
      bottomEl.innerHTML = `
        <a href="${job.downloadUrl}" download="${escapeHtml(job.filename)}" class="btn-success" title="Download to your device">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          ${escapeHtml(downloadLabel)}
        </a>
      `;
    }
  } else if (bottomEl && job.status !== 'completed') {
    bottomEl.remove();
  }
}

function createTaskCard(job) {
  const card = document.createElement('div');
  const platformId = (job.platform && job.platform.id) || 'youtube';
  const platformObj = CLIENT_PLATFORMS.find(p => p.id === platformId) || CLIENT_PLATFORMS[CLIENT_PLATFORMS.length - 1];
  const platformName = (job.platform && job.platform.name) || platformObj.name;
  card.className = `task-card status-${job.status}`;
  card.id = `card-${job.id}`;
  card.setAttribute('data-platform', platformId);

  const defaultTitle = `${platformName} Stream`;
  const title = job.title || (job.status === 'queued' ? 'Fetching stream metadata...' : defaultTitle);
  const filename = job.filename || (job.metadata && job.metadata.targetFilename) || 'Generating filename...';

  let thumbnail = job.thumbnail;
  if (!thumbnail) {
    if (job.videoId) {
      thumbnail = `https://i.ytimg.com/vi/${job.videoId}/hqdefault.jpg`;
    } else {
      thumbnail = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='52' viewBox='0 0 80 52' fill='%2315131F' stroke='%232C2842' stroke-width='2'><rect width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239A94B5' font-family='sans-serif' font-size='10' font-weight='bold'>${escapeHtml(platformName)}</text></svg>`;
    }
  }

  const isMp4 = (job.format || '').toLowerCase() === 'mp4';
  const qualityDisplay = isMp4
    ? `MP4 • ${getShortQualityLabel(job.quality)}`
    : 'MP3 • 320k';

  let badgeClass = 'badge-queued';
  let badgeLabel = 'Queued';

  if (job.status === 'processing') {
    badgeClass = 'badge-processing';
    badgeLabel = job.stage === 'fetching_metadata' ? 'Fetching Info' : 'Processing';
  } else if (job.status === 'downloading') {
    badgeClass = 'badge-processing';
    badgeLabel = `Downloading ${job.progress}%`;
  } else if (job.status === 'completed') {
    badgeClass = 'badge-completed';
    badgeLabel = '✓ Ready';
  } else if (job.status === 'failed') {
    badgeClass = 'badge-failed';
    badgeLabel = '✕ Failed';
  }

  card.innerHTML = `
    <div class="task-top">
      <img class="task-thumb" src="${thumbnail}" alt="${escapeHtml(platformName)} Thumbnail" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'80\\' height=\\'52\\' viewBox=\\'0 0 80 52\\' fill=\\'%2315131F\\' stroke=\\'%232C2842\\' stroke-width=\\'2\\'><rect width=\\'100%\\' height=\\'100%\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' fill=\\'%239A94B5\\' font-size=\\'10\\'>Media</text></svg>'">
      
      <div class="task-meta">
        <div class="task-title" title="${escapeHtml(title)}">${escapeHtml(title)}</div>
        ${job.filename ? `<div class="task-filename" title="${escapeHtml(filename)}">${escapeHtml(filename)}</div>` : `<div class="task-url">${escapeHtml(job.url)}</div>`}
      </div>

      <div class="task-badge-wrapper">
        <span class="badge badge-platform platform-${escapeHtml(platformId)}" title="${escapeHtml(platformName)}">${platformObj.iconSvg}</span>
        <span class="badge badge-quality">${escapeHtml(qualityDisplay)}</span>
        <span class="badge badge-status ${badgeClass}">${badgeLabel}</span>
      </div>
    </div>
  `;

  // Progress Bar for Active Items
  if (job.status === 'queued' || job.status === 'processing' || job.status === 'downloading') {
    const isIndeterminate = job.status === 'queued' || (job.status === 'processing' && job.progress === 0);
    const progressPercent = job.progress || 0;

    const progressEl = document.createElement('div');
    progressEl.className = 'progress-container';
    progressEl.innerHTML = `
      <div class="progress-header">
        <span class="prog-stage-label">${job.stage === 'fetching_metadata' ? 'Resolving stream container...' : (job.stage === 'downloading' ? 'Extracting chunks...' : 'Queued for pipeline...')}</span>
        <span class="prog-percent-label">${progressPercent}%</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill ${isIndeterminate ? 'indeterminate' : ''}" style="width: ${isIndeterminate ? '40%' : progressPercent + '%'}"></div>
      </div>
    `;
    card.appendChild(progressEl);
  }

  // Error Message
  if (job.status === 'failed' && job.error) {
    const errorEl = document.createElement('div');
    errorEl.className = 'task-error-box';
    errorEl.innerHTML = `
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <span class="error-msg-text">${escapeHtml(job.error)}</span>
    `;
    card.appendChild(errorEl);
  }

  // Download Link Button
  if (job.status === 'completed' && job.downloadUrl) {
    const downloadLabel = isMp4 ? `Save MP4 (${getShortQualityLabel(job.quality)})` : 'Save MP3';
    const bottomEl = document.createElement('div');
    bottomEl.className = 'task-bottom';
    bottomEl.innerHTML = `
      <a href="${job.downloadUrl}" download="${escapeHtml(job.filename)}" class="btn-success" title="Download to your device">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        ${escapeHtml(downloadLabel)}
      </a>
    `;
    card.appendChild(bottomEl);
  }

  return card;
}

function handleDownloadAllReady() {
  const completedJobs = Array.from(state.activeJobs.values()).filter(j => j.status === 'completed' && j.downloadUrl);
  if (completedJobs.length === 0) return;

  completedJobs.forEach((job, index) => {
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = job.downloadUrl;
      link.download = job.filename || 'media';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, index * 350);
  });
}

function handleClearQueue() {
  const jobIds = Array.from(state.activeJobs.keys());
  state.activeJobs.clear();
  stopPolling();
  resetProgressRing();
  resetTerminalToIdle();
  renderQueue();

  // Inform backend to immediately purge physical temp files on disk
  try {
    fetch('/api/jobs/clear', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobIds })
    }).catch(() => {});
  } catch (e) {}

  showToast('Queue and temporary files purged', 'info');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* --------------------------------------------------------------------------
   11. GLOBAL API EXPORTS (For Inline Handlers & Console Access)
   -------------------------------------------------------------------------- */
window.toggleUIMode = toggleUIMode;
window.setUIMode = setUIMode;
window.openModeChooser = openModeChooser;
window.closeModeChooser = closeModeChooser;
window.chooseUIMode = chooseUIMode;
window.skipMonsterIntro = skipMonsterIntro;
window.skipCalmIntro = skipCalmIntro;
window.updateSpaceJourney = updateSpaceJourney;
window.updateCalmProcessStatus = updateCalmProcessStatus;
window.selectFormat = selectFormat;
window.selectTheme = selectTheme;
window.setTheme = setTheme;
window.triggerThemeThunderstorm = triggerThemeThunderstorm;
window.applyMode = applyMode;
window.saveDefaultVideoQuality = saveDefaultVideoQuality;
window.handlePaste = handlePaste;
window.handleSampleUrls = handleSampleUrls;
window.handleStartDownload = handleStartDownload;

/* --------------------------------------------------------------------------
   12. INITIALIZATION & EVENT LISTENERS
   -------------------------------------------------------------------------- */

function init() {
  // Load UI Mode (Calm vs Monster)
  loadUIMode();

  let handledUrlMode = false;
  // Check for ?mode= URL param set by landing page
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlMode = urlParams.get('mode');
    if (urlMode === 'calm' || urlMode === 'monster') {
      handledUrlMode = true;
      // Landing page already chose — apply mode directly with intro
      if (urlMode === 'monster') {
        playMonsterIntro(() => {
          setUIMode('monster', true);
          showToast('Monster Mode Unleashed! ⚡', 'info');
        });
      } else {
        playCalmIntro(() => {
          setUIMode('calm', true);
          showToast('Calm Sanctuary Active 🍃', 'info');
        });
      }
      // Clean URL without reload
      try { window.history.replaceState({}, '', '/app'); } catch(e) {}
    }
  } catch(e) {}

  // Prompt user with Mode Chooser by default on first visit (only if not handled via URL)
  if (!handledUrlMode) {
    try {
      const hasChosenMode = localStorage.getItem('ymd_mode_chosen');
      if (!hasChosenMode) {
        setTimeout(openModeChooser, 200);
      }
    } catch (e) {}
  }

  // Global ESC key listener to close modal or skip intro
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modeChooserModal && modeChooserModal.style.display !== 'none') {
        closeModeChooser();
      }
      skipMonsterIntro();
      skipCalmIntro();
    }
  });

  // Load Quality and Format Preferences
  loadDefaultPreferences();

  // Init Custom Cursor
  initCustomCursor();

  // Init Progress Ring Smoother RAF Loop
  state.progressRafId = requestAnimationFrame(smoothProgressTick);

  // Toggle Slider Listener (Click or Keyboard)
  if (modeToggleSlider) {
    modeToggleSlider.addEventListener('click', (e) => {
      if (e.target.closest('#label-calm')) {
        toggleUIMode('calm');
      } else if (e.target.closest('#label-monster')) {
        toggleUIMode('monster');
      } else {
        toggleUIMode();
      }
    });

    modeToggleSlider.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleUIMode();
      }
    });
  }

  // URL Input listener
  if (urlInput) {
    urlInput.addEventListener('input', updateUrlCount);
  }

  // Large Format Cards Clicks
  if (formatMp3Label) {
    formatMp3Label.addEventListener('click', () => selectFormat('mp3'));
    formatMp3Label.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        selectFormat('mp3');
      }
    });
  }
  if (formatMp4Label) {
    formatMp4Label.addEventListener('click', () => selectFormat('mp4'));
    formatMp4Label.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        selectFormat('mp4');
      }
    });
  }

  // Quality pills
  qualityPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const quality = pill.getAttribute('data-quality');
      if (quality) {
        applyMode('mp4', quality, false);
      }
    });
    pill.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const quality = pill.getAttribute('data-quality');
        if (quality) {
          applyMode('mp4', quality, false);
        }
      }
    });
  });

  // Set default video quality button
  if (setDefaultVideoQualityBtn) {
    setDefaultVideoQualityBtn.addEventListener('click', () => {
      saveDefaultVideoQuality(state.selectedQuality, true);
    });
  }

  // Header default badge click
  if (headerDefaultBadge) {
    headerDefaultBadge.addEventListener('click', () => {
      applyMode('mp4', state.defaultVideoQuality, true);
      showToast(`Selected MP4 Video with default quality: ${getQualityLabel(state.defaultVideoQuality)}`, 'info');
    });
  }

  // Action buttons
  if (pasteBtn) pasteBtn.addEventListener('click', handlePaste);
  if (sampleBtn) sampleBtn.addEventListener('click', handleSampleUrls);
  if (clearInputBtn) {
    clearInputBtn.addEventListener('click', () => {
      if (urlInput) urlInput.value = '';
      updateUrlCount();
    });
  }

  if (startDownloadBtn) startDownloadBtn.addEventListener('click', handleStartDownload);
  if (clearQueueBtn) clearQueueBtn.addEventListener('click', handleClearQueue);
  if (downloadAllBtn) downloadAllBtn.addEventListener('click', handleDownloadAllReady);

  // Initial State Check
  updateUrlCount();
  checkSystemStatus();
  resetTerminalToIdle();
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/**
 * Auto-delete temporary downloads when leaving the website or closing tab
 */
function cleanupSessionOnLeave() {
  const jobIds = Array.from(state.activeJobs.keys());
  if (jobIds.length === 0) return;
  const payload = JSON.stringify({ jobIds });

  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    navigator.sendBeacon('/api/session/leave', blob);
  } else {
    try {
      fetch('/api/session/leave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(() => {});
    } catch (e) {}
  }
}

window.addEventListener('beforeunload', cleanupSessionOnLeave);
window.addEventListener('pagehide', cleanupSessionOnLeave);
