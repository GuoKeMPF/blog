import * as monaco from 'monaco-editor';
import { useEffect, useRef } from 'react';

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
    <div
      style={{
        width: '100%',
        minHeight: '400px',
      }}
      ref={container}
    ></div>
  );
};
// export default Code;
export default () => {
  return <Code />;
};
