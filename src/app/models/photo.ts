export interface Photo {
    photoId: number;
    applicationUserId: number;
    imageUrl: string;
    publicId: string;
    description: string;
    publishDate: Date;
    updateDate: Date;
    deleteConfirm: boolean;
}