export class ShadowCssProgrammatically extends HTMLElement {
  connectedCallback() {
    const wrapper = document.createElement('span');
    const shadow = this.attachShadow({ mode: 'open' });
    wrapper.classList.add('text');
    const children = this.childNodes ?? '';
    const sheet = new CSSStyleSheet();
    sheet.replaceSync('span { color: red; border: 2px dotted black;}');
    shadow.adoptedStyleSheets = [sheet];
    wrapper.replaceChildren(...children);
    shadow.appendChild(wrapper);
  }
  adoptedCallback() {}
  attributeChangedCallback() {}
  disconnectedCallback() {}
}
