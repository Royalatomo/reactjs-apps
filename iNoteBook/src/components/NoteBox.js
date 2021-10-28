import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext';
import Note from './Note';

function NoteBox() {
    const { noteState } = useContext(NoteContext);

    return (
        <>
            {noteState.map((note, i) => {
                return <Note note={note} key={i} />
            })}
        </>
    )
}

export default NoteBox
