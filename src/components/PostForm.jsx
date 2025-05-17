export default function PostForm({ title, content, setTitle, setContent }) {
  return (
    <>
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
    </>
  );
}
