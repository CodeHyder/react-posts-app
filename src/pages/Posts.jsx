import { useState } from "react";
import { useUser } from "../context/UserContext";
import { usePosts } from "../hooks/usePosts";
import Modal from "../components/Modal";
import Header from "../components/Header";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import Button from "../components/Button";

export default function Posts() {
  const { username, logout } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [postIdToEdit, setPostIdToEdit] = useState(null);

  const { posts, isLoading, error, createPost, updatePost, deletePost } = usePosts();

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
        <div className="p-6 mt-6 rounded w-full max-w-[752px] mx-auto border border-gray-500 bg-white rounded-xl">
          <h2 className="text-xl font-bold mb-4">What’s on your mind?</h2>
          <PostForm
            title={title}
            content={content}
            setTitle={setTitle}
            setContent={setContent}
          />
          <div className="flex justify-end">

            <Button
              onClick={handleCreatePost}
              disabled={!title.trim() || !content.trim()}
              className="w-[120px]"
            >
              Create
            </Button>

          </div>
        </div>

        {/* Posts */}
        <PostList
          posts={posts}
          currentUser={username}
          onEditPost={(id) => {
            setPostIdToEdit(id);
            setShowEditModal(true);
          }}
          onDeletePost={(id) => {
            setPostIdToDelete(id);
            setShowDeleteModal(true);
          }}
        />

        {/* Modals */}
        <Modal
          isOpen={showEditModal}
          title="Edit Post"
          onClose={() => setShowEditModal(false)}
          onConfirm={handleupdatePost}
          confirmText="Save"
        >
          <PostForm
            title={editTitle}
            content={editContent}
            setTitle={setEditTitle}
            setContent={setEditContent}
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
