import React, { useState, useContext } from 'react'
import "../css/NoteEdit.css"
import NoteContext from '../context/NoteContext';

function NoteEdit(props) {

    const apiKey = localStorage.getItem('token')

    const url = "http://localhost:5000"

    const { setShowNote, getNotes } = useContext(NoteContext);

    const [fieldsValue, setFieldsValue] = useState({ id: props.noteId, heading: props.heading, content: props.content, tag: props.tag })

    const handelChange = (e) => {
        setFieldsValue({ ...fieldsValue, [e.target.name]: e.target.value })
    }

    const save = async () => {

        setShowNote(false)

        const { id, heading, content, tag } = fieldsValue

        const response = await fetch(url + "/api/notes/updatenote", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': apiKey
            },

            body: JSON.stringify({
                noteid: id,
                title: heading,
                content: content,
                tags: tag,
            })
        });

        const jsonData = await response.json();
        getNotes()
        return jsonData

    }

    return (

        <div className={`editnote-main-div`}>

            <div className="editnote-div">

                <div className="editnote-close-button">
                    <i onClick={() => { setShowNote(false) }} className="fas fa-times-circle" />
                </div>

                <div className="editnote-tag-box">
                    <input name="tag" onChange={handelChange} value={fieldsValue.tag} className="editnote-tag" />
                </div>

                <div className="editnote-heading-box">
                    <textarea name="heading" onChange={handelChange} className="editnote-heading">{fieldsValue.heading}</textarea>
                </div>

                <div className="editnote-content-box">
                    <textarea name="content" onChange={handelChange} className="editnote-content">{fieldsValue.content}</textarea>
                </div>

                <div className="editnote-save-box">
                    <button onClick={save} className="editnote-save-button">Save</button>
                </div>
            </div>

        </div>

    )
}

export default NoteEdit
