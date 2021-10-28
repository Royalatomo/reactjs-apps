import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/NoteContext';
import '../css/Home.css'
import Navbar from "./Navbar"
import NoteBox from './NoteBox'
import NoteEdit from "./NoteEdit"
import { useHistory } from "react-router-dom"

function Home() {

    const { setNoteState, showNote, editNote } = useContext(NoteContext);


    const apiKey = localStorage.getItem('token')

    const url = "http://localhost:5000"

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

    const addNote = async () => {

        let title = document.getElementsByClassName('home-note-title-taker')[0].value
        let content = document.getElementsByClassName('home-note-body-taker')[0].value
        let tags = document.getElementsByClassName('home-note-tag-taker')[0].value


        const response = await fetch(url + "/api/notes/addnote", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': apiKey
            },

            body: JSON.stringify({ title, content, tags })
        });

        const jsonData = await response.json();

        if (jsonData.success) {
            getNotes()
        } else {
            alert(jsonData.msg)
        }

        return jsonData
    }



    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])


    let login = "";

    const history = useHistory()

    if (localStorage.getItem('token')) {
        login = true;
    } else {
        login = false;
        history.push('/about')
    }



    const toggelInputArea = (name) => {

        if (name === "take-note") {
            document.getElementsByClassName('home-toggel-box')[0].style.display = "none"
            document.getElementsByClassName('home-input-box')[0].style.display = "flex"
        } else if (name === "close") {
            document.getElementsByClassName('home-toggel-box')[0].style.display = "flex"
            document.getElementsByClassName('home-input-box')[0].style.display = "none"

            document.getElementsByClassName('home-note-title-taker')[0].value = ""
            document.getElementsByClassName('home-note-body-taker')[0].value = ""
            document.getElementsByClassName('home-note-tag-taker')[0].value = ""
        }
    }
    return (
        <>

            <Navbar login={login} />

            <div className="container home-main-body">

                {showNote ? <NoteEdit tag={editNote.tag} noteId={editNote.noteId} heading={editNote.heading} content={editNote.content} /> : ""}

                <div className="home-take-note-div">

                    <div className="home-toggel-box">
                        <textarea onClick={() => toggelInputArea('take-note')} type="text" placeholder="Take Note..." className="home-toggel-form-input" />
                    </div>

                    <div className="home-input-box">

                        <textarea type="text" placeholder="Title" className="home-input-form home-note-title-taker" />
                        <textarea type="text" placeholder="Take a note..." className="home-input-form home-note-body-taker" />
                        <textarea type="text" placeholder="Add tag" className="home-input-form home-note-tag-taker" />

                        <div className="home-input-box-button">
                            <span className="home-input-box-button-save" name="save" onClick={() => { addNote(); toggelInputArea('close') }}>Add Note</span>
                            <span className="home-input-box-button-close" name="close" onClick={() => toggelInputArea('close')}>Close</span>
                        </div>

                    </div>


                </div>

            </div>

            <div className="row my-3 home-notes-area">
                <NoteBox />
            </div>

            <div className="home-footer"></div>
        </>
    )
}

export default Home
