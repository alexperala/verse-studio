export interface BlogPost {
  slug: string;
  href: string;
  title: string;
  summary: string;
  badge: string;
  publishedLabel: string;
  relatedVideoTitle?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "funny-couple-how-it-was-made",
    href: "/blog-funny-couple-how-it-was-made",
    title: "Verse Vids Ep. 3 – Funny Couple: Behind the Scenes",
    summary:
      "A breakdown of the workflow, tools, and creative constraints behind Verse Studio's AI-assisted Funny Couple video.",
    badge: "Behind the Scenes",
    publishedLabel: "Latest post",
    relatedVideoTitle: "Funny Couple",
  },
];

export const latestBlogPost = blogPosts[0] ?? null;
