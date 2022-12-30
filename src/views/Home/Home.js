import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import Header from '../../components/Header/Header'
import Card from '../../components/Card/Card'
import PerformanceChart from '../../components/PerformanceChart/PerformanceChart'
import ActivityChart from '../../components/ActivityChart/ActivityChart'
import SessionChart from '../../components/SessionChart/SessionChart'
import ScoreChart from '../../components/ScoreChart/ScoreChart'
import LateralBar from '../../components/LateralBar/LateralBar'
import flame from '../../assets/icons/flame.svg';
import chicken from '../../assets/icons/chicken.svg';
import apple from '../../assets/icons/apple.svg';
import hamburger from '../../assets/icons/hamburger.svg';
import './Home.css'


const Home = () => {

    const params = useParams()
    const userId = params.id ? params.id : "12"



    const [ userData, setUserData ] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:3000/user/${userId}`)
          .then(res => res.json())
          .then(result => {
            setIsLoaded(true);
            setUserData(result)
          },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
    }, [])

    /**
     * displays a layer with a lower opacity when hovering the session graph box.
     * The layer starts from the right side of the box, and follows the cursor.
     * 
     * @param {object} event contains the event data used to get the cursor position.
     */
    const translateXLayer = (event) => {
        const test = document.querySelector(".line-chart-layer");
        test.style.transform = `translateX(${event.pageX-220}px)`
        const offsetWidth = document.querySelector(".line-chart").offsetWidth;
        const layerWidth = (offsetWidth-(event.pageX-220))
        test.style.width = `${layerWidth}px`
    }

    /**
     * Set the width of the opacity layer to 0 when the cursor gets out of the session graph box.
     */
    const resetXLayer = () => {
        const test = document.querySelector(".line-chart-layer");
        test.style.width = `0px`
    }

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {

        return (
            <>
                <Header/>
                <main>
                    <LateralBar/>
                    <div id="content">
                        <section className="greet">
                            <p>Bonjour <span>{userData.data.userInfos.firstName}</span></p>
                            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                        </section>
                        <section className="stats">
                            <div className="activity">
                                <div className="daily-activities">
                                    <h3 className="subtitle">Activité quotidienne</h3>
                                    <ActivityChart/>
                                </div>
                                <div className="activity-card-container">
                                    <div className="line-chart card-graph" onMouseMove={translateXLayer} onMouseOut={resetXLayer}>
                                        <div className="line-chart-layer"></div>
                                        <h3 className="subtitle">Durée moyenne des sessions</h3>
                                        <SessionChart/>
                                    </div>
                                    <div className="card-graph radar-chart">
                                        <PerformanceChart />
                                    </div>
                                    <div className="card-graph radial-chart">
                                        <h3 className="subtitle">Score</h3>
                                        <ScoreChart score={userData.data.score ? userData.data.score : userData.data.todayScore }/>
                                    </div>
                                </div>
                            </div>

                            <div className="nutrition-container">
                                <Card img={flame} class={"bg-red"} data={{value:(userData.data.keyData.calorieCount/1000).toFixed(3), unit:'kCal', content:'Calories'}}/>
                                <Card img={chicken} class={"bg-blue"} data={{value:userData.data.keyData.carbohydrateCount, unit:'g', content:'Proteines'}}/>
                                <Card img={apple} class={"bg-yellow"} data={{value:userData.data.keyData.lipidCount, unit:'g', content:'Glucides'}}/>
                                <Card img={hamburger} class={"bg-pink"} data={{value:userData.data.keyData.proteinCount, unit:'g', content:'Lipides'}}/>
                            </div>
                        </section>
                    </div>
                </main>
            </>
        );
};
}

export default Home;