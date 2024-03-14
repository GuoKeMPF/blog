const ShadowDomCardStyle = `
:host{
  display: block;
  border-radius: 4px;
  border: 1px solid #ccc;
}
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  padding: 8px;
  background-color: #e5e5e5;
  border-radius: 4px 4px 0 0;
  h3 {
    flex:1
  }
}

p {
  margin: 0;
  padding: 0 8px;
  color: #333;
  font-size: 14px;
  background-color: #f5f5f5;
}

section {
  padding: 8px;
}

`;

export class ShadowDomCard extends HTMLElement {
  constructor() {
    super();
    console.dir(this);

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    const templateId = this.getAttribute('templateId');
    if (!templateId) {
      throw new Error('templateId 为必填项');
    }
    const templateDom = document.getElementById(templateId);
    console.dir(templateDom);
    if (!templateDom || !templateDom?.content) {
      throw new Error('template 无内容');
    }
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(ShadowDomCardStyle);
    shadowRoot.adoptedStyleSheets = [sheet];
    const childNodes = templateDom.childNodes;
    wrapper.replaceChildren(...childNodes);

    shadowRoot.appendChild(wrapper);
  }
}
