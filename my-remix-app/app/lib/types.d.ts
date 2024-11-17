interface Post {
    id: number;
    slug: string;
    title: string;
    content: string;
}

interface NewPost {
    title: string;
    slug: string;
    content: string;
}

interface NewPostErrors { [key: string]: boolean }

export type PostMarkdownAttributes = { title: string };

export type PostMarkdown = {
    attributes: PostMarkdownAttributes;
    body: string;
}