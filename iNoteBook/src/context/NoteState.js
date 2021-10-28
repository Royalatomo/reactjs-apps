import React, { useState } from 'react'
import NoteContext from './NoteContext';

function NoteState(props) {

    const apiKey = localStorage.getItem('token')

    const url = "http://localhost:5000"


    const [noteState, setNoteState] = useState([])

    const [showNote, setShowNote] = useState(false)
    const [editNote, setEditNote] = useState({ tag: "", heading: "", content: "" })


    const getNotes = async () => {

        const response = await fetch(url + "/api/notes/fetchall", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': apiKey
            }
        });

        const jsonData = await response.json();

        if (jsonData.success) {
            setNoteState(jsonData.allNotes);
        } else {
            // console.clear()
            setNoteState([])
        }
    }


    return (
        <NoteContext.Provider value={{ noteState, setNoteState, showNote, setShowNote, editNote, setEditNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
