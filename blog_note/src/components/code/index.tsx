import React, { useEffect, useRef } from 'react';
import styles from './index.less';
import * as monaco from 'monaco-editor';

import { isBrowser, dynamic } from 'umi';

interface PropsType {
  defaultValue?: string;
  language?: string;
  className?: string;
  readOnly?: boolean;
  theme?: string;
}

const Code = (props: PropsType) => {
  const {
    className = '',
    defaultValue = '',
    language = 'javascript',
    readOnly = false,
    theme = 'vs-dark',
    ...config
  } = props;
  const container = useRef(null);
  useEffect(() => {
    const node = container.current;
    let editor: any;
    const initSize = () => {
      if (editor) {
        editor.layout();
      }
    };
    if (node) {
      const econfig: any = {
        language,
        theme,
        ...config,
      };
      if (readOnly) {
        econfig.value = defaultValue;
      }
      editor = monaco.editor.create(node, {
        ...econfig,
      });
      if (!readOnly) {
        editor.setValue(defaultValue);
      }
      window.addEventListener('resize', initSize);
    }

    return () => {
      window.removeEventListener('resize', initSize);
      editor.dispose();
    };
  }, []);
  return (
    <div className={`${styles.container} ${className}`} ref={container}></div>
  );
};
// export default Code;
export default () => {
  if (isBrowser()) return <Code />;
  return <p>组件动态加载中...</p>;
};
