module.exports = () => {
  return async function token(ctx, next) {
    ctx.cookies.set('x-csrf-token', ctx.csrf);
    await next();
  };
};
