import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import mockedData from '../../data/averageSessions.json'
import './SessionChart.css'

let formattedData = []
const days = [ "L", "M", "M", "J", "V", "S", "D"]

/**
 * Format the raw data from mocks or API to get a formatted version of it which can be easily exploited by the components
 * @param {object} rawData 
 */
const formatData = (rawData) => {
  rawData.sessions.forEach(session => {
    let dataElement = {}
    dataElement.name = days[(session.day)-1]
    dataElement.value = session.sessionLength
    formattedData.push(dataElement)
  })
}

/**
 * Format the tooltip that is shown on hover of the barChart
 * 
 * @param {boolean} active state of the tooltip visibility
 * @param {object[]} payload all of the data that is used to display the graph
 * @returns {HTMLCollection}
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="line-chart-tooltip">
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};

const SessionChart = (props) => {

  const [ data, setData ] = useState([]);

  const params = useParams()
  const location = useLocation()

  useEffect(() => {
    if (location.search === "?isfetched") {
        const callApi = async () => {
            const rawData = await (
                await fetch(`http://localhost:3000/user/${params.id}/average-sessions`)
            ).json();
            formatData(rawData.data)
           setData(formattedData);
        };
        callApi();
    }
    else {
        const rawData = ((mockedData.find(mockedData => mockedData.data.userId === Number(params.id))).data)
        formatData(rawData)
        setData(formattedData)
    }
  },[])

    return (
      <ResponsiveContainer width="100%" height="66%">
        <LineChart data={data}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'white' }} padding={{ left: 10, right: 10 }}/>
          <Line type="natural" dataKey="value" stroke="white" strokeWidth={2}/>
          <Tooltip wrapperStyle={{ outline: 'none' }} cursor={false} content={<CustomTooltip />}/>
        </LineChart>
      </ResponsiveContainer>
    );
  }

export default SessionChart;
