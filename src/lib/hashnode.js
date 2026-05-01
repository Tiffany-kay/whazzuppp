const QUERY = `
  query Posts($username: String!) {
    user(username: $username) {
      publications(first: 1) {
        edges {
          node {
            posts(first: 3) {
              edges {
                node {
                  title
                  brief
                  slug
                  coverImage { url }
                  readTimeInMinutes
                  publishedAt
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchHashnodePosts(username) {
  if (!username) return [];
  try {
    const res = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
    });
    const json = await res.json();
    return (
      json?.data?.user?.publications?.edges?.[0]?.node?.posts?.edges?.map(
        (e) => e.node
      ) ?? []
    );
  } catch {
    return [];
  }
}
