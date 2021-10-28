import React, { useContext } from 'react'
import "../css/Note.css"
import NoteContext from '../context/NoteContext';

function Note(props) {

    const { showNote, setShowNote, getNotes, setEditNote } = useContext(NoteContext);

    let close = false

    const { note } = props

    const apiKey = localStorage.getItem('token')

    const url = "http://localhost:5000"

    const deleteNote = async () => {

        let id = note._id

        const response = await fetch(url + "/api/notes/rmnote", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': apiKey
            },

            body: JSON.stringify({ noteid: id })
        });

        const jsonData = await response.json();
        getNotes()
        return jsonData
    }


    const openEditBox = (e) => {

        if (!close) {
            setShowNote(!showNote)
            setEditNote({ noteId: note._id, tag: note.tags, heading: note.title, content: note.content })
        }
    }

    return (
        <>
            <div className="row col-md-3 my-3 mx-2">
                <form onClick={() => { openEditBox(); close = false }} name="card" className="card">

                    <div name="tag" className="note-tag-box">
                        <span className="note-tag">{note.tags}</span>
                    </div>

                    <div onClick={() => { close = true; deleteNote() }} name="close" className="note-close-button">
                        <i name="close" className="fas fa-times-circle" />
                    </div>

                    <div name="body" className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.content}</p>
                    </div>
                </form>
            </div >


        </>
    )
}

export default Note
