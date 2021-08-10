import React, { useEffect, useState } from 'react';

const GetNotes = () => {
    const [totalNotes, setTotalNotes] = useState([])
    const [willUpdateNote, setWillUpdateNote] = useState({})
    const [changeNote, setChangeNote] = useState({})

    //get from database
    useEffect(() => {
        const url = `http://localhost:4000/getNote`
        fetch(url).then(res => res.json()).then(data => setTotalNotes(data))
    }, [])

    //load single note for update
    const handleEdit = (id) => {
        fetch(`http://localhost:4000/getSingleNote?id=` + id)
            .then(res => res.json())
            .then(data => setWillUpdateNote(data))
    }
    //update handler
    const handleChange = (e) => {
        const newValue = {}
        newValue[e.target.name] = e.target.value;
        setChangeNote(newValue);
    }
    //submit new update value
    const handleSubmit = (e) => {
        fetch(`http://localhost:4000/updateNote/${willUpdateNote._id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(changeNote)
        }).then(data => {
            if(data){
                alert("Updated Successfully.")
            }
        })
        e.preventDefault()
    }
    //delete note 
    const handleDeleteNote = (id) => {
        const url = `http://localhost:4000/deleteNote/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                alert("Delete Note Successfully.")
            }
        })
    }
    return (
        <div>
            <div>
                {
                    totalNotes.map(note => <p key={note._id}>
                        {note.note}
                        <button onClick={() => handleEdit(note._id)}>Edit</button>
                        <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
                    </p>
                    )}
            </div>
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="note" defaultValue={willUpdateNote.note} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default GetNotes;