interface User {
    id: number;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
}

interface Post {
    id: string;
    userId: string;
    content: string;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
}

interface Kudo {
    id: string;
    userId: string;
    postId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Comment {
    id: string;
    userId: string;
    postId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CommentWithExtras = Comment & { user: User };
export type KudoWithExtras = Kudo & { user: User };

export type PostWithExtras = Post & {
    comments: CommentWithExtras[];
    kudos: KudoWithExtras[];
    user: User;
};
