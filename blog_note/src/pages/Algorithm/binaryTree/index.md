---
toc: menu
title: 二叉树
---

# 二叉树

二叉树（binary tree）是指树中节点的度不大于 2 的有序树，它是一种最简单且最重要的树。二叉树的递归定义为：二叉树是一棵空树，或者是一棵由一个根节点和两棵互不相交的，分别称作根的左子树和右子树组成的非空树；左子树和右子树又同样都是二叉树

二叉树是递归定义的，其节点有左右子树之分，逻辑上二叉树有五种基本形态：

1. 空二叉树
2. 只有一个根节点的二叉树
   <code src="./oneNode.tsx" inline  title="只有一个根节点的二叉树" ></code>
3. 只有左子树
   <code src="./left.tsx" inline  title="只有左子树" ></code>
4. 只有右子树
   <code src="./right.tsx" inline  title="只有右子树" ></code>
5. 完全二叉树
   <code src="./complete.tsx" inline  title="完全二叉树" ></code>

```
                    1
            2              3
        4       5       6       7
```

**递归序**

先看根节点本身，再看左节点，再看右节点，再返回根节点，判断子节点也算一次查找

1 2 4 4 4 2 5 5 5 2 1 3 6 6 6 3 7 7 7 3 1

先序遍历
先遍历节点本身，再遍历左节点，再遍历右节点
1 2 4 5 3 6 7

中序遍历
先遍历左节点，再遍历节点本身，再遍历右节点
4 2 5 1 6 3 7

后序遍历
先遍历左节点，再遍历右节点，再遍历节点本身
4 5 2 6 7 3 1

|          |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |     |                            |
| :------: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :------------------------: |
|  递归序  |  1  |  2  |  4  |  4  |  4  |  2  |  5  |  5  |  5  |  2  |  1  |  3  |  6  |  6  |  6  |  3  |  7  |  7  |  7  |  3  |  1  |                            |
| 先序遍历 |  1  |  2  |  4  |     |     |     |  5  |     |     |     |     |  3  |  6  |     |     |     |  7  |     |     |     |     | 取递归序中第一次出现的位置 |
| 中序遍历 |     |     |     |  4  |     |  2  |     |  5  |     |     |  1  |     |     |  6  |     |  3  |     |  7  |     |     |     | 取递归序中第二次出现的位置 |
| 后序遍历 |     |     |     |     |  4  |     |     |     |  5  |  2  |     |     |     |     |  6  |     |     |     |  7  |  3  |  1  | 取递归序中第三次出现的位置 |

```js
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
//         4       5           6       7 3 1

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

// 1 2 4 5 3 6 7
// 递归先序遍历

const doSomeThing = node => {
  console.log(node.val);
};
const preOrder = tree => {
  doSomeThing(tree);
  if (tree.left) {
    preOrder(tree.left);
  }
  if (tree.right) {
    preOrder(tree.right);
  }
};

// preOrder(bintaryTree)

// 队列先序遍历
const stackPreOrder = tree => {
  const list = [];
  list.push(tree);
  while (list.length > 0) {
    let node = list.pop();
    doSomeThing(node);
    if (node.right) {
      list.push(node.right);
    }
    if (node.left) {
      list.push(node.left);
    }
  }
};

// stackPreOrder(bintaryTree)

// 中序遍历

const inOrder = tree => {
  if (tree.left) {
    inOrder(tree.left);
  }
  doSomeThing(tree);
  if (tree.right) {
    inOrder(tree.right);
  }
};

// inOrder(bintaryTree)

const stackInOrder = tree => {
  const list = [];
  const buildList = node => {
    let root = node;
    list.push(node);
    while (root.left) {
      list.push(root.left);
      root = root.left;
    }
  };
  buildList(tree);
  while (list.length) {
    let item = list.pop();
    doSomeThing(item);
    if (item.right) {
      buildList(item.right);
    }
  }
};

// stackInOrder(bintaryTree)

// 后序遍历
const postOrder = tree => {
  if (tree.left) {
    postOrder(tree.left);
  }
  if (tree.right) {
    postOrder(tree.right);
  }
  doSomeThing(tree);
};

// postOrder(bintaryTree)

const stackPostOrder = tree => {
  const list = [],
    res = [];
  list.push(tree);
  while (list.length > 0) {
    let node = list.pop();
    res.push(node);
    if (node.left) {
      list.push(node.left);
    }
    if (node.right) {
      list.push(node.right);
    }
  }
  while (res.length) {
    const item = res.pop();
    doSomeThing(item);
  }
};

// stackPostOrder(bintaryTree)
```


## 搜索二叉树
对于每一棵子树左节点比他小，右节点比他大

判断方法：中序遍历，升序排列。                                                         
````
                  5
          3              7
      2       4       6       8
 1
````




```js
function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

//             1
//     2              3
// 4       5       6       7

const generation1 = () => {
    const v31 = new TreeNode(4);
    const v32 = new TreeNode(5);
    const v33 = new TreeNode(6);
    const v34 = new TreeNode(7);
    const v21 = new TreeNode(2, v31, v32);
    const v22 = new TreeNode(3, v33, v34);
    const v11 = new TreeNode(1, v21, v22);
    return v11;
};

const bintaryTree1 = generation1();


//                   5
//           3              7
//       2       4       6       8
//  1

const generation2 = () => {
    const v41 = new TreeNode(1);
    const v31 = new TreeNode(2,v41);
    const v32 = new TreeNode(4);
    const v33 = new TreeNode(6);
    const v34 = new TreeNode(8);
    const v21 = new TreeNode(3, v31, v32);
    const v22 = new TreeNode(7, v33, v34);
    const v11 = new TreeNode(5, v21, v22);
    return v11;
};

const bintaryTree2 = generation2();




const isST = (tree) => {
    let preValue = Number.MIN_VALUE;
    let res = true
    const list = [];
    const buildList = node => {
        let root = node;
        list.push(node);
        while (root.left) {
            list.push(root.left);
            root = root.left;
        }
    };
    buildList(tree);
    while (list.length) {
        let item = list.pop();
        if (preValue >= item.val) {
            res = false
            return res
        }
        preValue = item.val
        if (item.right) {
            buildList(item.right);
        }
    }
    return res
}


console.log(isST(bintaryTree1));
console.log(isST(bintaryTree2));
```

## 完全二叉树

每一层是满的，或者最后一层不满也是从左向右依次变满，则称该二叉树为完全二叉树。

判断方法：

1. 二叉树按宽度遍历，遇到第一个有右树没有左树，则直接不是完全二叉树
2. 在第一个条件不违规的情况下，在遇到第一个左右两个子树不双全的情况下，后续的节点必须都是叶节点（既没有左节点也没有右节点）。

```
                  5
          3              7
      2       4       6       8
```

或者

```
                  5
          3              7
      2       4
```

## 满二叉树

最大深度 $l$ 和节点数 $N$ 满足 $ N = 2^{l} - 1 $ 则称该二叉树为满二叉树

判断方法：判断节点和层数的关系

```js
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

//             1
//     2              3
// 4       5       6       7

const generation = () => {
    const v31 = new TreeNode(4)
    const v32 = new TreeNode(5)
    const v33 = new TreeNode(6)
    const v34 = new TreeNode(7)
    const v21 = new TreeNode(2, undefined, v32)
    const v22 = new TreeNode(3, v33, v34)
    const v11 = new TreeNode(1, v21, v22)
    return v11
}
const bintaryTree = generation()
const process = (node) => {
    if (node === null) {
        return {
            nodes: 0,
            height: 0
        }
    }
    const rightDate = process(node.right)
    const leftDate = process(node.left);
    const height = Math.max(rightDate.height, leftDate.height) + 1;
    const nodes = rightDate.nodes + leftDate.nodes + 1
    return {
        height,
        nodes
    }
}

const isF = (node) => {
    const res = process(node)
    const {height, nodes} = res;

    return nodes === Math.pow(2, height) - 1
}

console.log(isF(bintaryTree));

```


## 平衡二叉树

对于任何一个子树来说，左树的高度和右树的高度差不超过1。

判断条件：
1. 左树平衡
2. 右树平衡
3. 左树高度右树高度差值小于等于1

```js

const process = (node) => {

    if (!node) {
        return {
            isBalance: true,
            height: 0
        }
    }


    const leftDate = process(node.left)
    const rightDate = process(node.right)

    const height = Math.max(leftDate.height, rightDate.height) + 1



    const isBalance = leftDate && rightDate && Math.abs(rightDate.height - leftDate.height) < 2

    return {
        height,
        isBalance
    }

}


const isBalance = (node) => {
    return process(node).isBalance
}


const res = isBalance(bintaryTree)

console.log('res', res);
```