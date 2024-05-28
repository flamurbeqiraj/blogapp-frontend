export interface BlogCommentCreate {
    blogCommentId: number;
    blogId: number;
    content: string;
    parentBlogCommentId?: number | null;
}

export interface BlogCommentView {
    parentBlogCommentId: number | null;
    blogCommentId: number;
    blogId: number;
    content: string;
    username: string;
    publishDate: Date | null;
    updateDate: Date | null;
    isEditable: boolean;
    deleteConfirm: boolean;
    isReplying: boolean;
    comments: BlogCommentView[]
}

export interface BlogComment {
    blogCommentId: number;
    blogId: number;
    content: string;
    username: string;
    applicationUserId: number;
    publishDate: Date;
    updateDate: Date;
    parentBlogCommentId?: number;
}