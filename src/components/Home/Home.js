import React, { useEffect, useState } from 'react';
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
        const url = `http://localhost:4000/addNote`;
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
        <div style={{margin: '0 200px'}}>
            <h2>Note App</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="note" id="" onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            <div>
                <GetNotes />
            </div>
        </div>
    );
};

export default Home;