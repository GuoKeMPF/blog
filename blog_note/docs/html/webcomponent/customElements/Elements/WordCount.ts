
export class WordCount extends HTMLParagraphElement {
  length: number = 0;

  static observedAttributes = ["text"];
  constructor() {
    super();
    console.dir(this)
  }
  connectedCallback() {
    this.updateLength();
  }
  adoptedCallback() {
    this.updateLength();
  }
  attributeChangedCallback() {
    this.updateLength();
  }
  updateLength() {
    const text = this.getAttribute('text') ?? '';
    this.length = text?.length || 0;
    const maxLength: number = this.getAttribute('max') * 1 ?? 0;
    let innerText = text
    if ((maxLength && maxLength > 0) && (this.length > maxLength)) {
      innerText = innerText.slice(0, maxLength) + '...';
    }
    console.log('maxLength', maxLength);
    console.log('length', this.length);
    console.log('innerText', innerText);


    const style = document.createElement("style");
    this.title = `长度${this.length}\r\n${text}`
    style.textContent = `
      p[is="word-count"] {
        color:#666666;
      }
    `;
    const textNode = document.createTextNode(innerText);
    this.replaceChildren(textNode, style);
  }
}
