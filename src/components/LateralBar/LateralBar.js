import React from 'react';
import './LateralBar.css'
import cycle from '../../assets/icons/cycle.svg';
import lift from '../../assets/icons/lift.svg';
import meditate from '../../assets/icons/meditate.svg';
import swim from '../../assets/icons/swim.svg';

const LateralBar = () => {
    return (
        <aside id="lateral-bar">
            <ul>
                <li><img src={meditate} alt="icone de meditation"></img></li>
                <li><img src={swim} alt="icone de natation"></img></li>
                <li><img src={cycle} alt="icone de vélo"></img></li>
                <li><img src={lift} alt="icone d'haltère"></img></li>
            </ul>
            <p>Copiryght, SportSee 2020</p>
        </aside>
    );
};

export default LateralBar;