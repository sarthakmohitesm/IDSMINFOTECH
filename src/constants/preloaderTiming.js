/**
 * Landing splash sequence (shared by App, Preloader, Home):
 * 1) Logo fades in and scales up
 * 2) Brief hold on full splash
 * 3) Panel (with logo) slides up; main site fades in underneath
 */
export const PRELOADER_LOGO_DELAY_MS = 200;
export const PRELOADER_LOGO_ANIM_MS = 1800;
export const PRELOADER_HOLD_MS = 450;
export const PRELOADER_SLIDE_MS = 1450;

export const PRELOADER_REVEAL_CONTENT_AT_MS =
  PRELOADER_LOGO_DELAY_MS + PRELOADER_LOGO_ANIM_MS + PRELOADER_HOLD_MS;

/** When splash translate + site opacity transition finish (same duration: PRELOADER_SLIDE_MS) */
export const PRELOADER_SLIDE_COMPLETE_AT_MS =
  PRELOADER_REVEAL_CONTENT_AT_MS + PRELOADER_SLIDE_MS;

/** Unmount preloader shortly after the slide animation ends */
export const PRELOADER_REMOVE_AT_MS = PRELOADER_SLIDE_COMPLETE_AT_MS + 200;

/** Small buffer after slide/fade so the first hero frame paints cleanly */
export const HERO_VIDEO_POST_SLIDE_MS = 120;

/** Hero `<video>` autoplay delay from initial load (aligned with splash sequence) */
export const PRELOADER_HERO_VIDEO_AT_MS =
  PRELOADER_SLIDE_COMPLETE_AT_MS + HERO_VIDEO_POST_SLIDE_MS;
