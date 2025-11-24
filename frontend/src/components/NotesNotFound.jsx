import { NotebookIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-16 max-w-md mx-auto text-center ">
      <div className=" bg-primary/10 rounded-3xl p-8 ">
        <NotebookIcon className=" size-10 text-primary " />
      </div>
      <h3 className=" text-base-content/70 "> No notes yet. </h3>
      <p>Organise your thoughts.</p>
      <Link to={"/create"} className="btn btn-primary">
        Create your first note.
      </Link>
    </div>
  );
};

export default NotesNotFound;
