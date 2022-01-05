/**
 * xs	<576px 响应式栅格，可为栅格数或一个包含其他属性的对象
 * sm	≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象
 * md	≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象
 * lg	≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象
 * xl	≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
 * xxl ≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象
 */
export const formLayout = (xs = 24, sm = 24, md = 22, lg = 20, xl = 18, xxl = 16) => ({
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
});

export const formColums = (xs = 1, sm = 1, md = 2, lg = 3, xl = 4, xxl = 6) => ({
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
});

