import React from 'react';
import './Card.css'

const Card = (props) => {
    return (
        <div className="nutrition-card">
            <div className={`nutrition-card-img ${props.class}`}>
                <img src={props.img}></img>
            </div>
            <div className="nutrition-card-details">
                <p>{props.data.value}{props.data.unit}</p>
                <p>{props.data.content}</p>
            </div>
        </div>
    );
};

export default Card;