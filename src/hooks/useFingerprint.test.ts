import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { hashComponents, type FingerprintComponents } from './fingerprintCollect';
import { useFingerprint } from './useFingerprint';

function sampleComponents(overrides: Partial<FingerprintComponents> = {}): FingerprintComponents {
  return {
    userAgent: 'test-agent',
    language: 'en-US',
    languages: 'en-US,en',
    platform: 'Linux',
    colorDepth: 24,
    deviceMemory: 8,
    hardwareConcurrency: 4,
    screenResolution: '1920x1080',
    availableScreenResolution: '1920x1040',
    timezoneOffset: -120,
    timezone: 'Europe/Berlin',
    sessionStorage: true,
    localStorage: true,
    indexedDB: true,
    cookieEnabled: true,
    doNotTrack: null,
    canvas: 'canvas-data',
    webgl: 'vendor~renderer',
    touchSupport: '0,false,true',
    maxTouchPoints: 0,
    pdfViewerEnabled: true,
    ...overrides,
  };
}

describe('hashComponents', () => {
  it('returns a stable hex visitor id for the same components', () => {
    const first = hashComponents(sampleComponents());
    const second = hashComponents(sampleComponents());
    expect(first).toMatch(/^[0-9a-f]{8}$/);
    expect(first).toBe(second);
  });

  it('changes when a signal changes', () => {
    const base = hashComponents(sampleComponents());
    const changed = hashComponents(sampleComponents({ userAgent: 'other-agent' }));
    expect(changed).not.toBe(base);
  });
});

describe('useFingerprint', () => {
  it('identifies the visitor after mount', async () => {
    const { result } = renderHook(() => useFingerprint());

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(result.current.visitorId).toMatch(/^[0-9a-f]{8}$/);
    expect(result.current.components?.userAgent).toBeTruthy();
    expect(result.current.error).toBeNull();
  });

  it('skips automatic identification when enabled is false', async () => {
    const { result } = renderHook(() => useFingerprint({ enabled: false }));

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(result.current.visitorId).toBeNull();
    expect(result.current.components).toBeNull();
  });

  it('refresh regenerates the visitor id on demand', async () => {
    const { result } = renderHook(() => useFingerprint({ enabled: false }));

    let visitorId: string | null = null;
    await act(async () => {
      visitorId = await result.current.refresh();
    });

    expect(visitorId).toMatch(/^[0-9a-f]{8}$/);
    expect(result.current.visitorId).toBe(visitorId);
    expect(result.current.isPending).toBe(false);
  });

  it('still resolves when canvas creation fails', async () => {
    const createElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      if (tagName === 'canvas') throw new Error('canvas blocked');
      return createElement(tagName);
    });

    const { result } = renderHook(() => useFingerprint({ enabled: false }));

    await act(async () => {
      await result.current.refresh();
    });

    expect(result.current.error).toBeNull();
    expect(result.current.visitorId).toMatch(/^[0-9a-f]{8}$/);
    expect(result.current.components?.canvas).toBe('error');
    expect(result.current.components?.webgl).toBe('error');

    vi.mocked(document.createElement).mockRestore();
  });

  it('sets error when signal collection throws', async () => {
    vi.spyOn(Intl, 'DateTimeFormat').mockImplementation(() => {
      throw new Error('intl unavailable');
    });

    const { result } = renderHook(() => useFingerprint({ enabled: false }));

    await act(async () => {
      await result.current.refresh();
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('intl unavailable');
    expect(result.current.visitorId).toBeNull();
    expect(result.current.isPending).toBe(false);

    vi.mocked(Intl.DateTimeFormat).mockRestore();
  });
});
