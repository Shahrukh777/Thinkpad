import express from "express";
import {  addNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/noteCtrl.js";

const router = express.Router()

router.get("/", getAllNotes)
router.get("/:id", getNoteById)
router.post("/", addNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router