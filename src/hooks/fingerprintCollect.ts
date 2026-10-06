export interface FingerprintComponents {
  userAgent: string;
  language: string;
  languages: string;
  platform: string;
  colorDepth: number;
  deviceMemory: number | null;
  hardwareConcurrency: number | null;
  screenResolution: string;
  availableScreenResolution: string;
  timezoneOffset: number;
  timezone: string;
  sessionStorage: boolean;
  localStorage: boolean;
  indexedDB: boolean;
  cookieEnabled: boolean;
  doNotTrack: string | null;
  canvas: string;
  webgl: string;
  touchSupport: string;
  maxTouchPoints: number;
  pdfViewerEnabled: boolean | null;
}

export interface FingerprintResult {
  visitorId: string;
  components: FingerprintComponents;
}

function hasStorage(storage: Storage | undefined): boolean {
  if (!storage) return false;
  try {
    const key = '__uth_fp__';
    storage.setItem(key, '1');
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function canvasSignal(): string {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 60;
    const context = canvas.getContext('2d');
    if (!context) return 'unsupported';

    context.textBaseline = 'alphabetic';
    context.fillStyle = '#f60';
    context.fillRect(125, 1, 62, 20);
    context.fillStyle = '#069';
    context.font = '11pt Arial';
    context.fillText('usethishook 👾', 2, 15);
    context.fillStyle = 'rgba(102, 204, 0, 0.7)';
    context.font = '18pt Arial';
    context.fillText('fingerprint', 4, 45);
    return canvas.toDataURL();
  } catch {
    return 'error';
  }
}

function webglSignal(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl');
    if (!gl || !(gl instanceof WebGLRenderingContext)) return 'unsupported';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
      : gl.getParameter(gl.VENDOR);
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER);
    return `${String(vendor)}~${String(renderer)}`;
  } catch {
    return 'error';
  }
}

function touchSignal(): string {
  const maxTouchPoints = navigator.maxTouchPoints ?? 0;
  const touchEvent = 'ontouchstart' in window;
  const touchStart = typeof TouchEvent !== 'undefined';
  return `${maxTouchPoints},${touchEvent},${touchStart}`;
}

/** FNV-1a 32-bit → stable hex visitor id (FingerprintJS-style client hash). */
export function hashComponents(components: FingerprintComponents): string {
  const payload = Object.keys(components)
    .sort((left, right) => left.localeCompare(right))
    .map((key) => `${key}:${String(components[key as keyof FingerprintComponents])}`)
    .join('|');

  let hash = 0x811c9dc5;
  for (const char of payload) {
    hash ^= char.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function collectFingerprintComponents(): FingerprintComponents {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    pdfViewerEnabled?: boolean;
    doNotTrack?: string | null;
    msDoNotTrack?: string | null;
  };
  const screenRef = window.screen;

  return {
    userAgent: nav.userAgent,
    language: nav.language,
    languages: Array.isArray(nav.languages) ? nav.languages.join(',') : nav.language,
    platform: nav.platform,
    colorDepth: screenRef.colorDepth,
    deviceMemory: typeof nav.deviceMemory === 'number' ? nav.deviceMemory : null,
    hardwareConcurrency:
      typeof nav.hardwareConcurrency === 'number' ? nav.hardwareConcurrency : null,
    screenResolution: `${screenRef.width}x${screenRef.height}`,
    availableScreenResolution: `${screenRef.availWidth}x${screenRef.availHeight}`,
    timezoneOffset: new Date().getTimezoneOffset(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? '',
    sessionStorage: hasStorage(window.sessionStorage),
    localStorage: hasStorage(window.localStorage),
    indexedDB: Boolean(window.indexedDB),
    cookieEnabled: nav.cookieEnabled,
    doNotTrack: nav.doNotTrack ?? nav.msDoNotTrack ?? null,
    canvas: canvasSignal(),
    webgl: webglSignal(),
    touchSupport: touchSignal(),
    maxTouchPoints: nav.maxTouchPoints ?? 0,
    pdfViewerEnabled: typeof nav.pdfViewerEnabled === 'boolean' ? nav.pdfViewerEnabled : null,
  };
}

export function collectFingerprint(): FingerprintResult {
  const components = collectFingerprintComponents();
  return { visitorId: hashComponents(components), components };
}
