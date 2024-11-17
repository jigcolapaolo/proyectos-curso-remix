interface Post {
    id: number;
    title: string;
    content: string;
    createAt: Date;
    updatedAt: Date;
}

interface NewPost {
    title: string;
    content: string;
}

interface NewPostErrors {
    title: string | boolean;
    content: string | boolean;
}