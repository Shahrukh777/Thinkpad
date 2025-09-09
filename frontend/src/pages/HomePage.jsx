import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimited from "../components/RateLimitedUI";
import axios from "axios"



const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = "http://localhost:3000/api/notes"

  useEffect(() => {
    const fetchNotes = async () =>{
      try {

        const res = await axios.get(url)

        console.log(res.data)

      } catch (error) {
        console.log("Error in fetching notes : " , error)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen ">
      <Navbar />
      {isRateLimited && <RateLimited />}
    </div>
  );
};

export default HomePage;
