import { CommentType } from '../components/post-view/types/comment.type';

export const compareNodes = (a: TreeNode, b: TreeNode) => {
    const commentA: CommentType = a.value;
    const commentB: CommentType = b.value;

    let comparison = 0;
    if (commentA.createdAt > commentB.createdAt) comparison = -1;
    else comparison = 1;
    return comparison;
};

// This is only used for Comments.
export class TreeNode {
    value: CommentType;

    children: Array<TreeNode>;

    parent: TreeNode | null;

    constructor(value: CommentType) {
        this.value = value;
        this.children = [];
        this.parent = null;
    }

    setParentNode(node: TreeNode | null) {
        this.parent = node;
    }

    getParentNode() {
        return this.parent;
    }

    addChild(node: TreeNode | null) {
        if (node) {
            node.setParentNode(this);
            this.children[this.children.length] = node;
            this.children = this.children.sort(compareNodes);
        }
    }

    getChildren() {
        return this.children;
    }

    removeChildren() {
        this.children = [];
    }
}

export const findNode = (needle: number, haystack: TreeNode): TreeNode | null => {
    if (haystack.value.id === needle) return haystack;

    if (haystack.children.length > 0) {
        let result: TreeNode | null = null;
        for (let i = 0; i < haystack.children.length && result === null; i += 1) {
            result = findNode(needle, haystack.children[i]);
        }
        return result;
    }
    return null;
};

export const findNodeInParentArray = (
    needle: number,
    haystack: Array<TreeNode>
): TreeNode | null => {
    let result: TreeNode | null = null;
    for (let i = 0; i < haystack.length; i += 1) {
        result = findNode(needle, haystack[i]);
        if (result) break;
    }
    return result;
};
