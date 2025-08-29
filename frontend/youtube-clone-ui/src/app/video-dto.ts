export interface VideoDto{
    id: string;
    title: string;
    description: string;
    tags: Array<string>;
    videoStatus: string;
    thumbnailUrl: string;
    videoUrl: string;
    likeCount: number;
    dislikeCount: number;
    viewCount: number;
}