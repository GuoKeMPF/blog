import * as monaco from 'monaco-editor';
import React, { FC, useEffect, useRef } from 'react';
import useStyles from './index.style';

interface PropsType {
  defaultValue?: string;
  language?: string;
  className?: string;
  readOnly?: boolean;
  theme?: string;
}

const Code: FC<PropsType> = (props: PropsType) => {
  const {
    className = '',
    defaultValue = '',
    language = 'javascript',
    readOnly = false,
    theme = 'vs-dark',
    ...config
  } = props;

  const { styles } = useStyles();

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
export default Code;
