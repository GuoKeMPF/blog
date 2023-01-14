
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



//             1
//     2              3
//         5       6       7

const generation2 = () => {
    // const v31 = new TreeNode(4);
    const v32 = new TreeNode(5);
    const v33 = new TreeNode(6);
    const v34 = new TreeNode(7);
    const v21 = new TreeNode(2, undefined, v32);
    const v22 = new TreeNode(3, v33, v34);
    const v11 = new TreeNode(1, v21, v22);
    return v11;
};

const bintaryTree2 = generation2();


const isCT = (tree) => {
    if (!tree) {
        return true
    }
    let queue = [], res = true, startleaf = false;
    queue.push(tree)

    while(queue.length){
        
        let nextQueue = []
        queue.forEach(node => {
            if (!node.left && node.right) {
                res = false
                return res
            }
            if (startleaf && (node.right || node.left) ) {
                res = false
                return res
            }
            if (!node.left) {
                startleaf = true
            }
            if (node.left) {
                nextQueue.push(node.left)
            }
            if (node.right) {
                nextQueue.push(node.right)
            }
        });

        queue = nextQueue

    }
    return res
}


const ct1 = isCT(bintaryTree1)

console.log('ct1', ct1);




const ct2 = isCT(bintaryTree2)

console.log('ct2', ct2);