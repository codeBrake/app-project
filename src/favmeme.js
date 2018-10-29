import React from 'react';
import App from './App.js';

export default function Favmeme(props) {
    console.log(111111111, props)
    
    return(
        <div className="list">
            <div>
                {props.meme.name}
            </div>
            <img src={props.meme.url} alt="Favs"/>
            <button className="delete-button" onClick={() => props.deleteFavFn(props.id)}>Delete</button>
        </div>
    )
        
}