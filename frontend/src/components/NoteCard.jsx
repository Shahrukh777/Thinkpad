import axios from "axios";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import api from "../../../backend/src/config/axios";

const NoteCard = ({ note, setNotes }) => {
  const handleDetele = async (e, id) => {
    e.preventDefault();

    if (
      !window.confirm(
        "Are you sure you wante to delete the node. This action cannot be undone."
      )
    )
      return;

    try {
      await axios.delete(`${api}/notes/${id}`);
      toast.success("Note deleted successfully.", {
        position: "bottom-left",
        duration: 3000,
      });

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Couldn't delete the Note.", {
        position: "bottom-left",
        duration: 4000,
      });
    }
    return;
  };

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
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center items-middle gap-1 ">
            <button className=" btn btn-ghost btn-s ">
              <PenSquareIcon size={20} />
            </button>
            <button
              className=" btn btn-ghost btn-s text-error "
              onClick={(e) => handleDetele(e, note._id)}
            >
              <Trash2Icon size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
