import "egg";

declare module "egg" {}

declare global {
  namespace NodeJS {
    interface Global {
      host: string;
      href: string;
      _cookies: string;
      _navigatorLang: string;
    }
  }
}
declare interface Window {}
