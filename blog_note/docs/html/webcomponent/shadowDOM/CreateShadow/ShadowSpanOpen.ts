export class ShadowSpanOpen extends HTMLSpanElement {
  constructor() {
    super();
    console.dir(this);
    console.log('connectedCallback');
    console.log(this);
  }
  connectedCallback() {
    console.log('connectedCallback');
    console.log(this);


    const shadow = this.attachShadow({ mode: 'open' });
    const span = document.createElement('span');
    span.classList.add('text');
    span.replaceChildren(this.children);
    shadow.replaceChildren(span);
  }
  adoptedCallback() { }
  attributeChangedCallback() { }
}

export default ShadowSpanOpen;
