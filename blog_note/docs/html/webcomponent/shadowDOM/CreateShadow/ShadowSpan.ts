export class ShadowSpan extends HTMLSpanElement {
  constructor() {
    super();
    console.dir(this);
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const span = document.createElement('span');
    span.classList.add('text');
    span.replaceChildren(this.children);
    shadow.replaceChildren(span);
  }
  adoptedCallback() {}
  attributeChangedCallback() {}
}

export default ShadowSpan;
