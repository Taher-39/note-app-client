import React, { useEffect, useState } from 'react';

const GetNotes = () => {
    const [totalNotes, setTotalNotes] = useState([])
    const [willUpdateNote, setWillUpdateNote] = useState({})
    const [changeNote, setChangeNote] = useState({})
    const [submitArea, setSubmitArea] = useState(false)

    //get from database
    useEffect(() => {
        const url = `https://desolate-garden-71918.herokuapp.com/getNote`
        fetch(url).then(res => res.json()).then(data => setTotalNotes(data))
    }, [])

    //load single note for update
    const handleEdit = (id) => {
        fetch(`https://desolate-garden-71918.herokuapp.com/getSingleNote?id=` + id)
            .then(res => res.json())
            .then(data => setWillUpdateNote(data))
        
        setSubmitArea(true)
    }
    //update handler
    const handleChange = (e) => {
        const newValue = {}
        newValue[e.target.name] = e.target.value;
        setChangeNote(newValue);
    }
    //submit new update value
    const handleSubmit = (e) => {
        fetch(`https://desolate-garden-71918.herokuapp.com/updateNote/${willUpdateNote._id}`, {
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
        setSubmitArea(false)
    }
    //delete note
    const handleDeleteNote = (id) => {
        const url = `https://desolate-garden-71918.herokuapp.com/deleteNote/${id}`;
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
            <div className='pt-4'>
                {
                    totalNotes.length ?
                        <div>
                            {
                                totalNotes.map(note => <p borer border-1 rounded key={note._id}>
                                    {note.note}
                                    <button onClick={() => handleEdit(note._id)} className='btn btn-success mx-1'>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteNote(note._id)} className='btn btn-danger mx-1'>
                                        Delete
                                    </button>
                                </p>)
                            }
                        </div>
                        : <div className="my-0 mx-auto mt-5">
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden"></span>
                            </div>
                        </div>
                }
            </div>
            
            <div>
                {
                    submitArea && 
                    <form onSubmit={handleSubmit}>
                        <input className='form-control d-inline w-25' type="text" name="note" defaultValue={willUpdateNote.note} onChange={handleChange}  required/>
                        <button type="submit" className='btn btn-success mx-1'>Submit</button>
                    </form>
                }
            </div>
        </div>
    );
};

export default GetNotes;