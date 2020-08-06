import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { useGetPostCommentsQuery } from '../../generated/graphql';
import { Reply } from './comments/Reply';
import { TreeNode, findNodeInParentArray, compareNodes } from '../../assets/tree';
import { CommentType } from './types/comment.type';

const CommentsContainer = styled.div`
    margin-top: 15px;
    margin-bottom: 30px;

    h3 {
        font-size: 17px;
        font-weight: 600;
        color: ${(props) => props.theme.gray800};
    }

    ul {
        margin-top: 15px;

        li {
            list-style: none;

            h5 {
                font-size: 15px;
                font-weight: 500;
                color: ${(props) => props.theme.gray800};
            }
            span {
                font-weight: 500;
                font-size: 14px;
                color: ${(props) => props.theme.gray400};
            }
            p {
                margin-top: 7px;
                word-break: break-word;
                font-weight: 500;
                color: ${(props) => props.theme.gray500};
            }
        }
    }
`;

type AppProps = {
    postId: number;
    isAuth: boolean;
};

export function PostComments({ isAuth, postId }: AppProps): JSX.Element | null {
    const { data, loading } = useGetPostCommentsQuery({
        variables: {
            postId: postId,
        },
    });

    if (!data || loading || typeof data.getPostComments === 'undefined') return null;

    const renderComments = (data: CommentType[]): JSX.Element[] => {
        const comments: Array<ReactElement<CommentType>> = [];
        let tree: Array<TreeNode> = [];
        let treeNode: TreeNode;

        data.forEach((comment: CommentType) => {
            treeNode = new TreeNode(comment);
            if (!comment.replyId) tree.push(treeNode);
            else {
                const parentNode = findNodeInParentArray(comment.replyId, tree);
                if (parentNode) parentNode.addChild(treeNode);
                else {
                    throw new Error('Reply has no parent, please contact the developer.');
                }
            }
        });

        tree = tree.sort(compareNodes);
        const recurseComments = (node: TreeNode) => {
            const {
                value: { postId, id },
            } = node;
            if (node.value.replyId) {
                const parentAuthor = node.getParentNode();
                comments.push(
                    <Reply
                        isAuth={isAuth}
                        postId={postId}
                        replyId={id}
                        parentAuthor={parentAuthor!.value.author.username}
                        typeReply
                        commentData={node.value}
                        key={node.value.id}
                    />
                );
            } else {
                comments.push(
                    <Reply
                        isAuth={isAuth}
                        postId={postId}
                        replyId={id}
                        commentData={node.value}
                        key={id}
                    />
                );
            }
            if (node.children.length > 0) {
                node.children.forEach((child: TreeNode) => recurseComments(child));
            }
        };

        tree.forEach((node: TreeNode) => recurseComments(node));
        return comments;
    };

    const commentLen = data.getPostComments.length;
    const pluralComment = commentLen !== 1 ? 'Comments' : 'Comment';
    return (
        <CommentsContainer>
            <h3>
                {commentLen} {pluralComment}
            </h3>
            <ul>
                <li>{renderComments(data.getPostComments)}</li>
            </ul>
        </CommentsContainer>
    );
}
