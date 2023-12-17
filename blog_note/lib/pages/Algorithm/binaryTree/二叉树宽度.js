"use strict";

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

//             1
//     2              3
// 4       5       6       7

// 递归序
// 1 2 4 4 4 2 5 5 5 2 1 3 6 6 6 3 7 7 7 3 1
// 1 2 4       5         3 6       7
//       4   2   5     1     6   3   7
//         4       5 2         6       7 3 1

const generation = () => {
  const v31 = new TreeNode(4);
  const v32 = new TreeNode(5);
  const v33 = new TreeNode(6);
  const v34 = new TreeNode(7);
  const v21 = new TreeNode(2, v31, v32);
  const v22 = new TreeNode(3, v33, v34);
  const v11 = new TreeNode(1, v21, v22);
  return v11;
};
const bintaryTree = generation();

// 求广度
const maxSpan = tree => {
  let list = [],
    max = 0;
  if (tree) {
    list.push(tree);
    max = 1;
  }
  while (list.length) {
    list = nextList;
    max = Math.max(max, list.length);
  }
  return max;
};
const span = maxSpan(bintaryTree);
console.log('span', span);