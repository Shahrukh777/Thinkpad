import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimitedUI";
import axios from "axios";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import api from "../../../backend/src/config/axios";


const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`${api}/notes`);
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          console.log(error);
          setIsRateLimited(true);
        } else {
          toast.error("Error fetching notes.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimited />}

      <div className=" max-w-7xl mx-auto p-4 mt-6 ">
        {loading && (
          <p className="text-center mt-4 text-3xl">Loading notes...</p>
        )}
        {notes.length === 0 && <NotesNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
