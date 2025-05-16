import { useState } from "react";
import { useUser } from "../context/UserContext";
import { usePosts } from "../hooks/usePosts";
import { useDeletePost } from "../hooks/useDeletePost";


export default function Posts() {
  const { username } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { posts, isLoading, error, createPost } = usePosts();
  const deletePost = useDeletePost();

  const handleDelete = (id) => {
    if (confirm("Tem certeza que quer deletar este post?")) {
      deletePost.mutate(id);
    }
  };
  const handleCreatePost = () => {
    if (!title.trim() || !content.trim()) {
      alert("Preencha título e conteúdo");
      return;
    }
    createPost.mutate({ username, title, content });
    setTitle("");
    setContent("");
  };

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Erro ao carregar posts</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CodeLeap Posts</h1>

      <div className="mb-6 border p-4 rounded">
        <input
          placeholder="Title"
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="border p-2 w-full mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-black text-white px-4 py-2"
          onClick={handleCreatePost}
        >
          Create Post
        </button>
      </div>

      <div>
        {posts?.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          posts.map(({ id, username: postAuthor, title, content, created_datetime }) => (
            <div key={id} className="border p-4 mb-4 rounded">
              <h2 className="font-bold">{title}</h2>
              <p>{content}</p>
              <p className="text-sm text-gray-500">
                by {username} at {new Date(created_datetime).toLocaleString()}
              </p> 
              {postAuthor === username && (
                <button
                  className="text-red-600 mt-2"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              )}
              

            </div>
          ))
        )}
      </div>
    </div>
  );
}
