export function isMobileOrTablet() {
  if (typeof navigator === "undefined") return false;
  return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
}
