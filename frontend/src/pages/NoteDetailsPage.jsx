import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { url } from "./HomePage";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";

const NoteDetailsPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url}/notes/${id}`);
        setNote(res.data);
        console.log(note);
      } catch (error) {
        console.log("Error fetching notes ", error);
        toast.error("Failed to fetch notes", {
          position: "bottom-left",
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  console.log(note);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center ">
        <LoaderIcon className=" animate-spin size-10" />
      </div>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete the note ?")) return;
    try {
      await axios.delete(`${url}/notes/${id}`);
      toast.success("Note deleted.");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note", error);
      toast.error("Couldn't delete note");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Add a title or content.");
      return;
    }
    setSaving(true);

    try {
      await axios.put(`${url}/notes/${id}`, note);
      toast.success("Note updated successfully.");
    } catch (error) {
      console.log("Error updating note", error);
      toast.error("Could not update the note.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className=" min-h-screen bg-base-200 ">
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex items-center justify-between mb-6 ">
          <Link to={"/"} className="btn btn-ghost">
            <ArrowLeftIcon size={20} />
            Back to Notes
          </Link>
          <button
            onClick={handleDelete}
            className=" btn btn-error btn-outline border-2 "
          >
            Delete Note
          </button>
        </div>

        <div className="card bg-base-100 ">
          <div className="card-body">
            <div className="form-control mb-4">
              <label className="label ">
                <span className="label-text">Title:</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={note?.title || ""}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>

            <div className="form-control mt-8">
              <label className="label ">
                <span className="label-text">Details:</span>
              </label>
              <textarea
                type="text"
                className="textarea textarea-bordered h-40"
                value={note?.content || ""}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>

            <div className="card-actions justify-end">
              <button
                className=" btn btn-primary "
                disabled={loading}
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
