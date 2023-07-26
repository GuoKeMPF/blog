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

//             1
//     2              3
// 4       5       6       7

// 采用中序遍历，记住节点层数以及位置
// 4   2   5    1     6   3   7

const header = 'H',
  leftChart = '>',
  rightChart = '<';
const space = '\t\t';
const inOrder = (tree, index, position) => {
  let res = [],
    left = [],
    right = [];
  if (!tree) {
    return;
  }
  if (tree.left) {
    left = inOrder(tree.left, index + 1, leftChart);
  }
  res.push({
    value: tree.val,
    index,
    position
  });
  if (tree.right) {
    right = inOrder(tree.right, index + 1, rightChart);
  }
  return [].concat(right, res, left);
};
const order = inOrder(bintaryTree, 0, header);
console.log(order);
const display = item => {
  let value = item.value,
    position = item.position,
    index = item.index;
  let str = '';
  while (index) {
    str += space;
    index -= 1;
  }
  str += position + value + position;
  console.log(str);
};
// 看的时候需要顺时针旋转 90°
// 				<7<
// 		<3<
// 				>6>
// H1H
// 				<5<
// 		>2>
// 				>4>
order.forEach(item => {
  display(item);
});