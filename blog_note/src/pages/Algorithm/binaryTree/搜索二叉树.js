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
    const v31 = new TreeNode(2, v41);
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



const process = (node) => {

    if (!node) {
        return null
    }

    const leftDate = process(node.left);
    const rightDate = process(node.right);


    let cur = min = max = node.val, isSearch = true

    if (leftDate) {
        min = Math.min(leftDate.min, cur)
        max = Math.max(leftDate.max, cur)
        if (!(leftDate.isSearch && leftDate.max < cur)) {
            isSearch = false
        }

    }

    if (rightDate) {
        min = Math.min(rightDate.min, cur)
        max = Math.max(rightDate.max, cur)

        if (!(rightDate.isSearch && rightDate.min > cur)) {
            isSearch = false
        }
    }




    return {
        min,
        max,
        isSearch
    }



}
const isST1 = (node) => {
    if (!node) {
        return true
    }
    return process(node).isSearch
}




console.log(isST1(bintaryTree1));
console.log(isST1(bintaryTree2));