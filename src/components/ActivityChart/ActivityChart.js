import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ActivityChart.css'
import mockedData from '../../data/activity.json'

/**
 * Format the tooltip that is shown on hover of the barChart
 * 
 * @param {boolean} active state of the tooltip visibility
 * @param {object[]} payload all of the data that is used to display the graph
 * @returns {HTMLCollection}
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    // console.log(payload)
    return (
      <div className="bar-chart-tooltip">
        <p className="label">{`${payload[0].value} kg`}</p>
        <p className="label">{`${payload[1].value} kCal`}</p>
      </div>
    );
  }
  return null;
};

const ActivityChart = (props) => {

    const [ data, setData ] = useState([]);

    const params = useParams()
    const location = useLocation()
     
    useEffect(() => {
        if (location.search === "?isfetched") {
            const callApi = async () => {
                const data = await (
                    await fetch(`http://localhost:3000/user/${params.id}/activity`)
                ).json();
               setData(data.data.sessions);
            };
            callApi();
        }
        else {
            setData(mockedData.find(mockedData => mockedData.data.userId === Number(params.id)).data.sessions)
        }
    },[])

    /**
     * Permet de numéroter les valeurs de l'axe des abscisses à partir de 1
     * 
     * @param {object} tick 
     * @param {number} index 
     * @returns {number}
     */
    const iterateXAxis = (tick, index) => {
		  return index + 1
	  }

    /**
     * 
     * 
     * @param {object} props contains all the data of the legend, including the payload object
     * @returns {HTMLCollection}
     */
    const renderLegend = (props) => {
        const { payload } = props;
        const legendData = [{ name: "Poids", unit: " (kg)"}, { name: "Calories brûlées", unit: " (kCal)"}]
      
        return (
          <ul className = "custom-bar-chart-legend">
            {
              payload.map((entry, index) => {
                const { dataKey, color } = entry
                const style = { backgroundColor: color}
                return (
                <>
                    <div className="custom-legend-puce" style={style}></div>
                    <li key={`item-${index}`}>{legendData[index].name}{legendData[index].unit}</li>
                </>
                )
            })
            }
          </ul>
        );
      }
  
    return (
        <ResponsiveContainer width="100%" height="100%" wrapperStyle={{ background: "#f4f4f4" }}>
            <BarChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid vertical={false} stroke="rgba(222, 222, 222, 1)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} tickFormatter={iterateXAxis} />
                <YAxis hide={true} datakey={"kilogram"} yAxisId="left" orientation='left' />
                <YAxis datakey={"calories"} yAxisId="right" orientation="right" tickLine={false} axisLine={false} domain={['dataMin - 4', 'dataMax']}/>
                <Tooltip wrapperStyle={{ outline: 'none' }} content={<CustomTooltip />}/>
                <Legend verticalAlign="top" align="right" content={renderLegend} wrapperStyle={{ left: 0, paddingTop: 30, paddingBottom: 40}} />
                <Bar barSize={7} legendType ="cirlce" yAxisId="right" dataKey="kilogram" fill="rgba(40, 45, 48)" radius={[7, 7, 0, 0]} />
                <Bar barSize={7} legendType ="cirlce" yAxisId="left" dataKey="calories" fill="rgba(230, 0, 0)" radius={[7, 7, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );

};

export default ActivityChart;