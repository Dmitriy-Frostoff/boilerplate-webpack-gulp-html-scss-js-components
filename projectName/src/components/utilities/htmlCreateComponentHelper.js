export function htmlCreateComponentHelper(stringWithHTML) {
  const template = document.createElement('template');
  template.innerHTML = stringWithHTML;
  return template.content;
}