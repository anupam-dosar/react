import { createContext, useContext, useMemo, useState } from "react";
import { createRandomPost } from "./functions";

const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() => Array.from({ length: 30 }, () => createRandomPost()));
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  const providerValue = useMemo(() => {
    return {
      posts: searchedPosts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
      searchQuery: searchQuery,
      setSearchQuery: setSearchQuery,
    };
  }, [searchedPosts, searchQuery]);

  return <PostContext.Provider value={providerValue}>{children}</PostContext.Provider>;
}

function usePosts() {
  const context = useContext(PostContext);
  return context;
}

export { PostProvider, usePosts };
