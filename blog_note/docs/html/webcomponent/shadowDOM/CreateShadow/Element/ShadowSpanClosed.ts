export class ShadowSpanClosed extends HTMLElement {
  connectedCallback() {
    const wrapper = document.createElement('span');
    const shadow = this.attachShadow({ mode: 'closed' });
    wrapper.classList.add('text');
    const children = this.childNodes ?? '';
    wrapper.replaceChildren(...children);
    shadow.appendChild(wrapper);
  }
  adoptedCallback() {}
  attributeChangedCallback() {}
  disconnectedCallback() {}
}
