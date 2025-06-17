import express from "express"
import { CustomRequest } from "../models/CustomRequest";
import { UserWithoutPassword } from "../models/user";
import { addNote, deleteNote, getNotes, updateNote } from "../libs/notes";
import { BasicResponse } from "../models/response";
import { Note } from "../models/notes";

export async function getNotesForUser(req: CustomRequest, res: express.Response<BasicResponse>) {
    
    const user: UserWithoutPassword = { email: req.user! }
    
    if (!user.email) {
        res.json({
            status: 400,
            message: "auth error",
            error: false,
            data: [],
        })      
        return;
    }

    //Fetch Notes
    const userNotes = await getNotes(user);

    res.json({
        status: 200,
        message: "User Notes Fetched",
        error: false,
        data: userNotes,
    })

}

export async function deleteNoteForUser(req: CustomRequest, res: express.Response<BasicResponse>) {
    const id = req.params.id;
    if (!id) {
        res.json({
            status: 200,
            message: "Please send all parameter.",
            error: false,
            data: [],
        })
        return;
    }

    // Delete a Note
    const deletedNotes = await deleteNote(id);

    if (deletedNotes) {
        res.json({
            status: 200,
            message: "Note deleted",
            error: false,
            data: [],
        })
        return;
    }
    res.json({
        status: 400,
        message: "Note id Mismatch or  deletion problem.",
        error: true,
        data: [],
    })

}


export async function updateNoteForUser(req: CustomRequest, res: express.Response<BasicResponse>) {
    const { title, body } = req.body;
    const id = req.params.id;

    if (!id || !title || !body) {
        res.json({
            status: 200,
            message: "Please send all parameter.",
            error: false,
            data: [],
        })
        return;
    }
    const user: UserWithoutPassword = { email: req.user?.toString() ?? "" }
    if (!user.email) {
        res.json({
            status: 400,
            message: "auth error",
            error: false,
            data: [],
        })      
        return;
    }

    const newNote: Note = {
        title, 
        body, 
        id, 
        email: user.email
    }

    //Update a note
    const updateNote_s = await updateNote(newNote, id);

    if (updateNote_s) {
        res.json({
            status: 200,
            message: "Note updated",
            error: false,
            data: [],
        })
        return;
    }
    res.json({
        status: 400,
        message: "Note id Mismatch or update problem.",
        error: true,
        data: [],
    })

}

export async function addNoteForUser(req: CustomRequest, res: express.Response<BasicResponse>) {
    const { title, body } = req.body;
    if (!title || !body) {
        res.json({
            status: 200,
            message: "Please send all parameter.",
            error: false,
            data: [],
        })
        return;
    }

    const user: UserWithoutPassword = { email: req.user!}
    if (!user.email) {
        res.json({
            status: 400,
            message: "auth error",
            error: false,
            data: [],
        })      
        return;
    }

    const newNote: Note = {
        title, 
        body,
        email: user.email
    }

    // Add a note
    const added_note = await addNote(newNote);

    if (added_note) {
        res.json({
            status: 200,
            message: "Note Added",
            error: false,
            data: [],
        })
        return;
    }
    res.json({
        status: 400,
        message: "Note id Mismatch or problem while adding.",
        error: true,
        data: [],
    })

}