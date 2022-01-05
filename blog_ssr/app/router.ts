import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;
  // web page
  router.get(/^\//, controller.home.index);
};
