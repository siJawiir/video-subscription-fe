// utils/scroll.ts

/**
 * Scroll ke atas halaman / container
 * @param container window atau HTMLElement opsional
 * @param behavior 'smooth' atau 'auto'
 */
export function scrollToTop(
  container?: Window | HTMLElement,
  behavior: ScrollBehavior = "smooth"
) {
  if (container instanceof Window || !container) {
    window.scrollTo({ top: 0, behavior });
  } else {
    container.scrollTo({ top: 0, behavior });
  }
}

/**
 * Scroll ke elemen berdasarkan id
 * @param id id elemen
 * @param offset jarak dari atas (misal header fixed)
 * @param behavior 'smooth' atau 'auto'
 */
export function scrollToElementById(
  id: string,
  offset = 0,
  behavior: ScrollBehavior = "smooth"
) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior });
}

/**
 * Scroll ke elemen langsung (HTMLElement)
 * @param element HTMLElement
 * @param offset jarak dari atas
 * @param behavior 'smooth' atau 'auto'
 */
export function scrollToElement(
  element: HTMLElement,
  offset = 0,
  behavior: ScrollBehavior = "smooth"
) {
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior });
}

/**
 * Scroll ke elemen di dalam container scrollable
 * @param container HTMLElement scrollable
 * @param element HTMLElement target
 * @param offset jarak dari atas
 * @param behavior 'smooth' atau 'auto'
 */
export function scrollToElementInContainer(
  container: HTMLElement,
  element: HTMLElement,
  offset = 0,
  behavior: ScrollBehavior = "smooth"
) {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const top =
    elementRect.top - containerRect.top + container.scrollTop - offset;

  container.scrollTo({ top, behavior });
}
