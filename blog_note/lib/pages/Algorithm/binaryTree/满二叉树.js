"use strict";

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

//             1
//     2              3
// 4       5       6       7

const generation = () => {
  const v31 = new TreeNode(4);
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
  if (node === null) {
    return {
      nodes: 0,
      height: 0
    };
  }
  const rightDate = process(node.right);
  const leftDate = process(node.left);
  const height = Math.max(rightDate.height, leftDate.height) + 1;
  const nodes = rightDate.nodes + leftDate.nodes + 1;
  return {
    height,
    nodes
  };
};
const isF = node => {
  const res = process(node);
  const height = res.height,
    nodes = res.nodes;
  return nodes === Math.pow(2, height) - 1;
};
console.log(isF(bintaryTree));
const isF1 = tree => {
  if (tree === null) {
    return true;
  }
  let list = [];
  list.push(tree);
  while (list.length) {
    let nextList = [];
    let cur = list.length;
    for (let i = 0; i < cur; i++) {
      const node = list[i];
      if (node.left) {
        nextList.push(node.left);
      }
      if (node.right) {
        nextList.push(node.right);
      }
    }
    if (nextList.length < cur * 2 && nextList.length > 0) {
      return false;
    }
    list = [].concat(nextList);
  }
  return true;
};
console.log(isF1(bintaryTree));