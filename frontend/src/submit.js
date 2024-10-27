// submit.js

import { useEffect } from "react";
import axios from 'axios';

export const SubmitButton = ({Vertices, Connections}) => {

    useEffect(()=>{
        console.log(Vertices,Connections);
    },[Vertices, Connections])

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/pipelines/parse', {
              nodes: Vertices,
              edges: Connections,
            });
            alert(response.data);
            console.log(response.data);
          } 
        catch(error){
            console.error('Error submitting graph:', error);
            alert('There was an error processing your request.');
        }
    }

    return (
        <div onClick={handleSubmit} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button type="submit">Submit</button>
        </div>
    );
}
