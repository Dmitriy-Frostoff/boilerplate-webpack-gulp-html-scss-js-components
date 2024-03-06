/**
 * Create the template with HTML to nest it to the bundle
 *
 * @param {string} stringWithHTML - string containing HTML from another index.js component
 * @returns {HTMLElement} - returns the template with HTML inside
 */

export default function htmlCreateComponentHelper(stringWithHTML) {
  /** @param {HTMLElement} template */
  const template = document.createElement('template');
  template.innerHTML = stringWithHTML;
  return template.content;
}
