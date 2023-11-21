import { Context } from 'egg';
export declare const isMobile: (ctx: Context) => boolean;
export declare const parseCookie: (ctx: Context) => {};
export declare const parseNavLang: (ctx: Context) => any;
export declare const success: ({ ctx, res, msg }: {
    ctx: any;
    res?: null | undefined;
    msg?: string | undefined;
}) => void;
