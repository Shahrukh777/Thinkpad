import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import api from "../../../backend/src/config/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, isLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || content.trim() === "") {
      toast.error("All fields are required", {
        position: "bottom-left",
        duration: 2000,
      });
      return;
    }

    isLoading(true);

    try {
      await axios.post(`${api}/notes`, {
        title,
        content,
      });
      toast.success("Note Created.", {
        position: "bottom-left",
        duration: 2000,
      });
      navigate("/");
    } catch (error) {
      if(error.response.status === 429){
        toast.error("Slow Down buddy. You're creating notes too fast.", {
        position: "bottom-left",
        duration: 8000,
      });
      }
      console.error("Error:", error);
      toast.error("Counldn't create Note", {
        position: "bottom-left",
        duration: 2000,
      });
    } finally {
      isLoading(false);
    }
  };

  return (
    <div className=" min-h-screen bg-base-200 ">
      <div className=" container mx-auto px-4 py-8 ">
        <div className=" max-w-2xl mx-auto ">
          <Link to={"/"} className="btn btn-ghost mb-6 rounded-full ">
            <ArrowLeftIcon size={20} /> Back
          </Link>
          <div className="card bg-base-200 ">
            <div className=" card-body">
              <h2 className=" card-title text-2xl mb-4">Create new note</h2>
              <form onSubmit={handleSubmit}>
                <div className=" form-control mb-4">
                  <label className="label">
                    <span className=" label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className=" form-control mb-4">
                  <label className="label">
                    <span className=" label-text">Content</span>
                  </label>
                  <input
                    type="text"
                    className=" textarea textarea-bordered h-32 "
                    placeholder="Write the content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    className=" btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
