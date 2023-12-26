function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const generation = () => {
    // const v31 = new TreeNode(4)
    const v32 = new TreeNode(5)
    const v33 = new TreeNode(6)
    const v34 = new TreeNode(7)
    const v21 = new TreeNode(2, undefined, v32)
    const v22 = new TreeNode(3, v33, v34)
    const v11 = new TreeNode(1, v21, v22)
    return v11
}

const bintaryTree = generation()


const serial  = (node) =>{
    let n = [];
    if(node == null){
        return [null]
    }
    n.push(node.val)

    n = n.concat(serial(node.left))
    n = n.concat(serial(node.right))

    return n
}

const s = serial(bintaryTree)

console.log(s);

/**
 * 
 * @param {array} list 
 * @returns 
 */
const deserial = (list) => {
    const node = list.shift()

    if (node == null) {
        return null
    }
    const left = deserial(list) || undefined
    const right = deserial(list) || undefined
    const t = new TreeNode(node, left, right);
    return t
}

const t = deserial(s)

console.log(t);