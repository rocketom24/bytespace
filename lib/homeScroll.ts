// Navbar's logo lives outside <ScrollTrack> (see app/layout.tsx), so a plain
// prop/context can't reach it. ScrollTrack registers its own "scroll back to
// the Home slide" function here; Navbar calls it when already on "/" so the
// logo does something even though Next's Link treats same-route clicks as a
// no-op.
let scrollToStart: (() => void) | null = null;

export function setHomeScrollToStart(fn: (() => void) | null) {
  scrollToStart = fn;
}

export function scrollHomeToStart() {
  scrollToStart?.();
}
