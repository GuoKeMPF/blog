export class ShadowSpanOpen extends HTMLElement {
  connectedCallback() {
    const wrapper = document.createElement('span');
    const shadow = this.attachShadow({ mode: 'open' });
    wrapper.classList.add('text');
    const children = this.childNodes ?? '';
    wrapper.replaceChildren(...children);
    shadow.appendChild(wrapper);
  }
  adoptedCallback() {}
  attributeChangedCallback() {}
  disconnectedCallback() {
  }
}
