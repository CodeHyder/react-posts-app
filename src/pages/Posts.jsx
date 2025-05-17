import { useState } from "react";
import { useUser } from "../context/UserContext";
import { usePosts } from "../hooks/usePosts";
import { useDeletePost } from "../hooks/useDeletePost";
import PostCard from "../components/PostCard";
import Modal from "../components/Modal";
import Header from "../components/Header";

export default function Posts() {
  const { username } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [postIdToEdit, setPostIdToEdit] = useState(null);

  const { posts, isLoading, error, createPost, updatePost } = usePosts();
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

  const handleupdatePost = () => {
    if (postIdToEdit) {
      const originalPost = posts.find((post) => post.id === postIdToEdit);
      if (!originalPost) return;

      const titleToSend = editTitle.trim() === "" ? originalPost.title : editTitle;
      const contentToSend = editContent.trim() === "" ? originalPost.content : editContent;

      updatePost.mutate({
        id: postIdToEdit,
        title: titleToSend,
        content: contentToSend,
      });

      setPostIdToEdit(null);
      setShowEditModal(false);
      setEditTitle("");
      setEditContent("");
    }
  }

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Erro ao carregar posts</p>;

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-[800px] bg-white flex flex-col items-center">
 
        <Header />

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
          {posts?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={username}
              onEdit={(id) => {
                setPostIdToEdit(id);
                setShowEditModal(true);
              }}
              onDelete={(id) => {
                setPostIdToDelete(id);
                setShowDeleteModal(true);
              }}
            />
          ))}
        </div>

        {/* Modals */}
        <Modal
          isOpen={showEditModal}
          title="Edit Post"
          onClose={() => setShowEditModal(false)}
          onConfirm={handleupdatePost}
          confirmText="Save"
        >
          <label className="block text-base font-normal mb-1">Title</label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full border border-gray-400 px-3 py-2 rounded mb-4 text-sm"
            placeholder="Hello world"
          />

          <label className="block text-base font-normal mb-1">Content</label>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full border border-gray-400 px-3 py-2 rounded mb-4 text-sm resize-none h-[80px]"
            placeholder="Content here"
          />
        </Modal>

        <Modal
          isOpen={showDeleteModal}
          title="Are you sure you want to delete this item?"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          confirmText="Delete"
          confirmColor="red"
        />


      </div>
    </div>
  );
}
