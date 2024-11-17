import path from "path";
import fs from "fs/promises";
import fm from "front-matter";
import { marked } from "marked";
import { fileURLToPath } from "url";
import { NewPost, PostMarkdown, PostMarkdownAttributes } from "./lib/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta de la carpeta posts que contiene los markdown
const postsPath = path.join(__dirname, "..", "posts");

function isValidPostAttributes(attributes: PostMarkdownAttributes): attributes is PostMarkdownAttributes {
    return typeof attributes.title === "string" && attributes.title.trim().length > 0;
}

export const getPosts = async () => {
    const files = await fs.readdir(postsPath);

    return Promise.all(files.map(async (filename) => {
        const file = await fs.readFile(path.join(postsPath, filename), "utf-8");
        // Se leen todos los posts
        const { attributes }: PostMarkdown = fm(file.toString());

        if (!isValidPostAttributes(attributes)) {
            throw new Error(`Invalid post attributes`);
        }

        return {
            // Se quita la extension del archivo para que quede el slug para la ruta
            slug: filename.replace(/\.md$/, ""),
            title: attributes.title
        }
    }))
};

export const getPost = async (slug: string) => {
    const file = await fs.readFile(path.join(postsPath, `${slug}.md`), "utf-8");
    const { attributes, body }: PostMarkdown = fm(file.toString());

    if (!isValidPostAttributes(attributes)) {
        throw new Error(`Invalid post attributes`);
    }

    return { 
        content: marked(body),
        slug: slug,
        title: attributes.title,
    };
}

export const createPosts = async (post: NewPost) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const markdown = `---\ntitle: ${post.title}\n---\n\n${post.content}`;

    await fs.writeFile(path.join(postsPath, `${post.slug}.md`), markdown);

    return getPost(post.slug);

}
