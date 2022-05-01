import { Editor } from 'tinymce';

const register = (editor: Editor): void => {

  const onAction = () => editor.execCommand('htmlEditor');

  editor.ui.registry.addButton('html', {
    icon: 'html',
    tooltip: 'Html',
    text:'Html',
    onAction
  });

  editor.ui.registry.addMenuItem('html', {
    icon: 'html',
    text:'Html',
    onAction
  });


};

export {
  register
};
