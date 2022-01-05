declare namespace User {
  export interface CurrentUser {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}

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
