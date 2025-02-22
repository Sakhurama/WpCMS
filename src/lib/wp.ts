const domain = import.meta.env.WP_DOMAIN;
const apiUrl = `${domain}/wp-json/wp/v2`;

export const getPageInfo = async (slug: string) => {
    const response = await fetch(`${apiUrl}/pages?slug=${slug}`);

    // Desestructuración para obtener las respuestas de la API
    const [data] = await response.json();
    const { title: { rendered: title }, content: { rendered: content }, guid: { rendered: prueba}} = data; // El nombre que va a tomar es el ultimo valor que le paso

    return { title, content, prueba };
};


export const getLatestPostInfo = async ({perPage = 10} : {perPage?: number} = {}) => {
    const response = await fetch(`${apiUrl}/posts?per_page=${perPage}&order=desc&_embed`);
    const data = await response.json();

    const posts = data.map((post: any) => {
        const title = post.title.rendered;
        const excerpt = post.excerpt.rendered;
        const content = post.content.rendered;
        const date = post.date;
        const slug = post.slug;
        const featuredImage = post._embedded['wp:featuredmedia'][0].source_url;

        return { title, excerpt, content,date, slug, featuredImage };
    });

    return posts;
};

export const getPostInfo = async (slug: string) => {
    const response = await fetch(`${apiUrl}/posts?slug=${slug}&_embed`);


    const [data] = await response.json();
    const title = data.title.rendered;
    const content = data.content.rendered;
    const bannerImage = data._embedded['wp:featuredmedia'][0].source_url;

    return { title, content, bannerImage };
};