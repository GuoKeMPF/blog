import { Editor } from 'tinymce';
const open = (editor: Editor): void => {
  editor.windowManager.open({
    title: 'Html',
    size: 'large',
    body: {
      type: 'panel',
      items: [
        {
          type: 'textarea',
          name: 'html'
        }
      ]
    },
    buttons: [
      {
        type: 'cancel',
        name: 'cancel',
        text: 'Cancel'
      },
      {
        type: 'submit',
        name: 'save',
        text: 'Save',
        primary: true
      }
    ],
    initialData: {
      html: ''
    },
    onSubmit: (api) => {
      const data = api.getData();
      editor.insertContent(data.html);
      api.close();
    }
  });
};

export {
  open
};
