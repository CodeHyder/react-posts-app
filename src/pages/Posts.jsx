import { useState } from "react";
import { useUser } from "../context/UserContext";
import { usePosts } from "../hooks/usePosts";
import { useDeletePost } from "../hooks/useDeletePost";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";

export default function Posts() {
  const { username } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postIdToDelete, setPostIdToDelete] = useState(null); // ID do post em análise para deletar
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { posts, isLoading, error, createPost } = usePosts();
  const deletePost = useDeletePost();

  const handleCreatePost = () => {
    if (!title.trim() || !content.trim()) {
      alert("Preencha título e conteúdo");
      return;
    }
    createPost.mutate({ username, title, content });
    setTitle("");
    setContent("");
  };

  const handleConfirmDelete = () => {
    if (postIdToDelete) {
      deletePost.mutate(postIdToDelete);
      setPostIdToDelete(null);
      setShowDeleteModal(false);
    }
  };

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Erro ao carregar posts</p>;

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-[800px] bg-white flex flex-col items-center">

        {/* Header */}
        <div className="bg-[#7695EC] h-[80px] w-full flex items-center px-6 text-white text-2xl font-bold">
          CodeLeap Network
        </div>

        {/* Form */}
        <div className="p-6 mt-6 rounded w-[752px] border border-gray-500 bg-white rounded-xl">
          <h2 className="text-xl font-bold mb-4">What’s on your mind?</h2>

          <label className="block text-base font-normal mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-400 px-3 py-2 rounded mb-4 text-sm"
            placeholder="Hello world"
          />

          <label className="block text-base font-normal mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-400 px-3 py-2 rounded mb-4 text-sm resize-none h-[80px]"
            placeholder="Content here"
          />

          <div className="flex justify-end">
            <button
              onClick={handleCreatePost}
              disabled={!title.trim() || !content.trim()}
              className={`px-6 py-2 rounded text-white text-sm font-semibold ${!title.trim() || !content.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#7695EC] hover:bg-[#5b77c5]"
              }`}
            >
              Create
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="mt-6 space-y-6">
          {posts?.map(({ id, username: postAuthor, title, content, created_datetime }) => (
            <div key={id} className="rounded-xl w-[752px] bg-white overflow-hidden">
              <div className="h-[70px] bg-[#7695EC] px-4 py-3 flex justify-between items-center text-white font-bold text-base">
                <h3 className="text-[22px]">{title}</h3>
                {postAuthor === username && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setPostIdToDelete(id);
                        setShowDeleteModal(true);
                      }}
                      className="hover:opacity-80"
                    >
                      <img src={deleteIcon} alt="Delete" className="w-[31.2px] h-[30px] cursor-pointer" />
                    </button>
                    <button className="hover:opacity-80">
                      <img src={editIcon} alt="Edit" className="w-[31.2px] h-[30px] cursor-pointer" />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4 border border-gray-500 rounded-bl-xl rounded-br-xl">
                <div className="flex justify-between text-sm text-gray-500 mb-3">
                  <span className="text-[#777] font-roboto text-[18px] font-bold">@{postAuthor}</span>
                  <span>{new Date(created_datetime).toLocaleString()}</span>
                </div>
                <p className="text-sm text-[18px] whitespace-normal break-words">{content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-[rgba(119,119,119,0.80)] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[400px]">
              <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this item?</h2>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-white border border-gray-500 rounded text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
