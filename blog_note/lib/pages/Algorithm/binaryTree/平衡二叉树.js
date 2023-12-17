"use strict";

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
const generation = () => {
  // const v31 = new TreeNode(4)
  const v32 = new TreeNode(5);
  const v33 = new TreeNode(6);
  const v34 = new TreeNode(7);
  const v21 = new TreeNode(2, undefined, v32);
  const v22 = new TreeNode(3, v33, v34);
  const v11 = new TreeNode(1, v21, v22);
  return v11;
};
const bintaryTree = generation();
const process = node => {
  if (!node) {
    return {
      isBalance: true,
      height: 0
    };
  }
  const leftDate = process(node.left);
  const rightDate = process(node.right);
  const height = Math.max(leftDate.height, rightDate.height) + 1;
  const isBalance = leftDate && rightDate && Math.abs(rightDate.height - leftDate.height) < 2;
  return {
    height,
    isBalance
  };
};
const isBalance = node => {
  return process(node).isBalance;
};
const res = isBalance(bintaryTree);
console.log('res', res);