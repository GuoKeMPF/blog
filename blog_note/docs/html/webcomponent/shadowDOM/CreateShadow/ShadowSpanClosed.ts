export class ShadowSpanClosed extends HTMLSpanElement {
  constructor() {
    super();
    console.dir(this);
    console.log('connectedCallback');
    console.log(this);
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'closed' });
    const span = document.createElement('span');
    span.classList.add('text');
    span.replaceChildren(this.children);
    shadow.replaceChildren(span);
  }
  adoptedCallback() { }
  attributeChangedCallback() { }
}

export default ShadowSpanClosed;
