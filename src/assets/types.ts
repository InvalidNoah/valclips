interface VideoData {
    id: string;
    title: string;
    author_name: string;
    author_url: string;
    html: string;
    thumbnail_url: string;
    thumbnail_width: number;
    thumbnail_height: number;
}

interface Clip {
    approved: boolean;
    author: string;
    video_id: string;
    video_title: string;
    views: number;
    likes: number;
    timestamp: any;
}
