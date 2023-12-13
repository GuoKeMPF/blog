function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
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
    const v31 = new TreeNode(4)
    const v32 = new TreeNode(5)
    const v33 = new TreeNode(6)
    const v34 = new TreeNode(7)
    const v21 = new TreeNode(2, v31, v32)
    const v22 = new TreeNode(3, v33, v34)
    const v11 = new TreeNode(1, v21, v22)
    return v11
}

const bintaryTree = generation()

// 1 2 4 5 3 6 7
// 递归先序遍历



const doSomeThing = (node) => {
    console.log(node.val);
}
const preOrder = (tree) => {
    doSomeThing(tree)
    if (tree.left) {
        preOrder(tree.left)
    }
    if (tree.right) {
        preOrder(tree.right)
    }
}

// preOrder(bintaryTree)

// 队列先序遍历
const stackPreOrder = (tree) => {
    const list = []
    list.push(tree)
    while (list.length > 0) {
        let node = list.pop()
        doSomeThing(node)
        if (node.right) {
            list.push(node.right)
        }
        if (node.left) {
            list.push(node.left)
        }
    }
}

// stackPreOrder(bintaryTree)


// 中序遍历

const inOrder = (tree) => {
    if (tree.left) {
        inOrder(tree.left)
    }
    doSomeThing(tree)
    if (tree.right) {
        inOrder(tree.right)
    }
}

// inOrder(bintaryTree)



const stackInOrder = (tree) => {
    const list = []
    const buildList = (node) => {
        let root = node
        list.push(node)
        while (root.left) {
            list.push(root.left)
            root = root.left
        }
    }
    buildList(tree)
    while (list.length) {
        let item = list.pop()
        doSomeThing(item)
        if (item.right) {
            buildList(item.right)
        }
    }
}

// stackInOrder(bintaryTree)




// 后序遍历
const postOrder = (tree) => {
    if (tree.left) {
        postOrder(tree.left)
    }
    if (tree.right) {
        postOrder(tree.right)
    }
    doSomeThing(tree)
}

// postOrder(bintaryTree)


const stackPostOrder = (tree) => {
    const list = [], res = []
    list.push(tree)
    while (list.length > 0) {
        let node = list.pop()
        res.push(node)
        if (node.left) {
            list.push(node.left)
        }
        if (node.right) {
            list.push(node.right)
        }
    }
    while (res.length) {
        const item = res.pop();
        doSomeThing(item)
    }
}

// stackPostOrder(bintaryTree)



// 广度优先遍历
// 1 2 3 4 5 6 7
const spanOrder = (tree) => {
    const list = [];

    if (tree) {
        list.push(tree)
    }
    while (list.length) {
        const first = list.shift()
        if (first.left) {
            list.push(first.left)
        }
        if (first.right) {
            list.push(first.right)
        }
        doSomeThing(first)
    }
}

spanOrder(bintaryTree)


