import React, { useEffect } from 'react';

import { ShadowDomCard } from './Element';

export const ShadowDomCardDemo = () => {
  const templateId = 'shadow-dom-card';

  useEffect(() => {
    if (!customElements.get('shadow-dom-card')) {
      customElements.define('shadow-dom-card', ShadowDomCard);
    }
  }, []);

  return (
    <>
      <template id={templateId}>
        <main>
          <header>
            <h3>
              <slot name="title" />
            </h3>
            <slot name="buttons"></slot>
          </header>
          <p>
            <slot name="description"></slot>
          </p>
          <section>
            <slot name="content"></slot>
          </section>
        </main>
      </template>
      <shadow-dom-card templateId={templateId}>
        <span slot="title">title</span>
        <ul slot="content">
          <li>content1</li>
          <li>content2</li>
          <li>content3</li>
        </ul>
        <div slot="buttons">
          <button>button1</button>

          <button>button2</button>
        </div>
        <span slot="description">description</span>
      </shadow-dom-card>
    </>
  );
};

export default ShadowDomCardDemo;
