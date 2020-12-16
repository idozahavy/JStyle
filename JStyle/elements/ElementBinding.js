// import JStyleClass from "../class/JStyleClass.js";

/**
 *
 * @param {Element} element
 * @param {JStyleClass} jstyleClass
 */
export function bindElementStyle(element, jstyleClass) {
  if (!element.classList.contains(jstyleClass.className)) {
    element.classList.add(jstyleClass.className);
  }
}

/**
 *
 * @param {Element} element
 * @param {JStyleClass} jstyleClass
 */
export function unbindElementStyle(element, jstyleClass) {
  element.classList.remove(jstyleClass.className);
}
