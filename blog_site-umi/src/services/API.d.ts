declare namespace Texts {
  export type Draft = {
    author: string;
    id: string;
    content: string;
    [propname: string]: any;
  };
  export type Drafts = Draft[];
  export type Text = {
    author: string;
    id: string;
    content: string;
    [propname: string]: any;
  };
  export type Texts = Text[];
}
