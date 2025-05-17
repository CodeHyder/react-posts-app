import PostCard from "./PostCard";

export default function PostList({ posts, currentUser, onEditPost, onDeletePost }) {
  return (
    <div className="mt-6 space-y-6">
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUser={currentUser}
          onEdit={() => onEditPost(post.id)}
          onDelete={() => onDeletePost(post.id)}
        />
      ))}
    </div>
  );
}
