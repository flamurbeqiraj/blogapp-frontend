export interface BlogCreate {
    blogId: number;
    title: string;
    content: string;
    photoId?: number;
}

export interface BlogPaging {
    page: number;
    pagesSize: number;
}

export interface Blog {
    blogId: number;
    title: string;
    content: string;
    applcationUserId: number;
    username: string;
    publishDate: Date;
    updateDate: Date;
    deleteConfirm: boolean;
    photoId?: number;
}

export interface PagedResoults<T> {
    items: Array<T>;
    totalCount: number;
}