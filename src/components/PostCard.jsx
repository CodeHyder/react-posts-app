import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";

export default function PostCard({ post, currentUser, onEdit, onDelete }) {
  const { id, username, title, content, created_datetime } = post;

  return (
    <div className="rounded-xl w-full max-w-[752px] mx-auto bg-white overflow-hidden">
      <div className="h-[70px] bg-[#7695EC] px-4 py-3 flex justify-between items-center text-white font-bold text-base">
        <h3 className="text-[22px]">{title}</h3>
        {currentUser === username && (
          <div className="flex gap-3">
            <button onClick={() => onDelete(id)} className="hover:opacity-80">
              <img src={deleteIcon} alt="Delete" className="w-[31.2px] h-[30px] cursor-pointer" />
            </button>
            <button onClick={() => onEdit(id)} className="hover:opacity-80">
              <img src={editIcon} alt="Edit" className="w-[31.2px] h-[30px] cursor-pointer" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 border border-gray-500 rounded-bl-xl rounded-br-xl">
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span className="text-[#777] font-roboto text-[18px] font-bold">@{username}</span>
          <span>{new Date(created_datetime).toLocaleString()}</span>
        </div>
        <p className="text-sm text-[18px] whitespace-normal break-words">{content}</p>
      </div>
    </div>
  );
}
