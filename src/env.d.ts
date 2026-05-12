/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_POSTHOG_ENABLED?: string;
  readonly PUBLIC_POSTHOG_KEY?: string;
  readonly PUBLIC_POSTHOG_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    posthog?: {
      capture?: (eventName: string, properties?: Record<string, unknown>) => void;
      init?: (...args: unknown[]) => void;
    };
    trackSiteEvent?: (eventName: string, properties?: Record<string, unknown>) => void;
    __site_posthog_initialized?: boolean;
    __site_analytics_events_bound?: boolean;
  }
}

export {};
