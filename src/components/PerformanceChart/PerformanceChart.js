import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import mockedData from '../../data/performance.json'

let formattedData = []

/**
 * Format the raw data from mocks or API to get a formatted version of it which can be easily exploited by the components
 * @param {object} rawData 
 */
const formatData = (rawData) => {
  rawData.data.forEach(element => {
    let dataElement = {}
    dataElement.subject = rawData.kind[element.kind]
    dataElement.value = element.value;
    dataElement.fullMark = 150
    formattedData.push(dataElement)
  })
}

const PerformanceChart = (props) => {

  const [ data, setData ] = useState([]);

    const params = useParams()
    const location = useLocation()

  useEffect(() => {
    if (location.search === "?isfetched") {
        const callApi = async () => {
            const rawData = await (
                await fetch(`http://localhost:3000/user/${params.id}/performance`)
            ).json();
            formatData(rawData.data)
            setData(formattedData)
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
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data} >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'white'}} />
          <Radar name="Mike" dataKey="value" fill="rgb(255, 1, 1)" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }

export default PerformanceChart;