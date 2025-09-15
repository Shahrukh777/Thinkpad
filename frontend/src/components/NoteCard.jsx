import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const NoteCard = ({ note }) => {
  return (
    <Link
      to={`note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-2 border-solid border-green-500"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="card-content text-base-content/80 line-clamp-3">
          {note.content}
        </p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {" "}
            {new Date(note.createdAt).toLocaleDateString()}{" "}
          </span>
          <div className="flex items-center items-middle gap-1 ">
            <PenSquareIcon size={20} />
            <button className=" btn btn-ghost btn-xs text-error ">
                <Trash2Icon size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
