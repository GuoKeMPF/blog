import { Editor, TinyMCE } from 'tinymce';

declare const tinymce: TinyMCE;

import * as Commands from './api/Commands';
import * as Icon from './ui/Icon';
import * as Buttons from './ui/Buttons';


const setup = (editor: Editor, url: string): void => {
  Icon.register(editor);
  Commands.register(editor);
  Buttons.register(editor);
  return;
};

export default (): void => {
  tinymce.PluginManager.add('html', setup);
};
