export class ShadowCssDeclaratively extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('templateId') || '';
    const template = document.getElementById(id);

    const wrapper = document.createElement('span');
    const shadow = this.attachShadow({ mode: 'open' });
    wrapper.classList.add('text');
    const templateContent = template.content;
    const children = this.childNodes ?? ''

    shadow.appendChild(templateContent.cloneNode(true));

    wrapper.replaceChildren(...children);
    shadow.replaceChildren(templateContent.cloneNode(true), wrapper);
  }
  adoptedCallback() { }
  attributeChangedCallback() { }
  disconnectedCallback() { }
}
