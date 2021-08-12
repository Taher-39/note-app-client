import React, { useState } from 'react';
import GetNotes from '../GetNotes/GetNotes';

const Home = () => {
    const [note, setNote] = useState({})

    //send data from UI
    const handleChange = (e) => {
        const newNote = {}
        newNote[e.target.name] = e.target.value;
        setNote(newNote)
    }
    const handleSubmit = (e) => {
        const url = `https://desolate-garden-71918.herokuapp.com/addNote`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
        .then(data => {
            if(data){
                alert("Note Added Successfully.")
            }
        })
        e.preventDefault()
    }

    
    return (
        <div>
            <h2>Note App</h2>
            <form onSubmit={handleSubmit}>
                <input className='form-control d-inline w-25' type="text" name="note" id="" onChange={handleChange}  placeholder=" Note description" required/>
                <button className='btn btn-success mx-1' type="submit">Submit</button>
            </form>
            <div>
                <GetNotes />
            </div>
        </div>
    );
};

export default Home;