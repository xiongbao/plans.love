import { notFound } from "next/navigation";
import type { PostDetailProps, PostsListProps } from "@/types/PostProps";

// TODO: Add Sentry. Add offset to getPostsList

export async function getPostsList(
  limit: number,
  offset: number,
  latest: boolean,
): Promise<PostsListProps> {
  const query = `
      query PostsList {
        repository(
          name: "${process.env.GITHUB_REPO_NAME}"
          owner: "${process.env.GITHUB_REPO_OWNER}"
          followRenames: true
        ) {
          discussions(
            first: ${limit}
            orderBy: {field: CREATED_AT, direction: DESC}
            categoryId: "${process.env.DISCUSSIONS_CATEGORY_ID}"
          ) {
            edges {
              node {
                title
                url
                updatedAt
                number
                labels(first: 10) {
                  nodes {
                    name
                    color
                  }
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
            totalCount
          }
        }
      }
    `;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });
    if (res.status === 404) notFound();
    if (!res.ok) throw new Error(res.statusText);

    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getPostDetail(id: string): Promise<PostDetailProps> {
  const query = `
      query PostDetail {
        repository(
          name: "${process.env.GITHUB_REPO_NAME}"
          owner: "${process.env.GITHUB_REPO_OWNER}"
          followRenames: true
        ) {
          discussion(number: ${id}) {
            bodyHTML
            publishedAt
            updatedAt
            title
            number
            labels(first: 10) {
              nodes {
                name
                color
              }
            }
          }
        }
      }
    `;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });
    if (res.status === 404) notFound();
    if (!res.ok) throw new Error(res.statusText);

    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
}
