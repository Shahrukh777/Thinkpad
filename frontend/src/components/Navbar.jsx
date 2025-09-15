import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-200 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold font-sans text-green-600 tracking-tight">
            Thinkboard
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn btn-primary border-none text-black hover:bg-green-700/90 bg-green-600 rounded-full">
              Create New Note
              <PlusIcon className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
