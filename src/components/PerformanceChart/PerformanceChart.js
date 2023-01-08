import React from 'react';
import { useParams } from "react-router-dom";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import fetchData from '../../services/FetchData';
import formatData from '../../services/FormatData';

const PerformanceChart = () => {

  const params = useParams()
  const type = "performance"
  const fetchedData = fetchData(`http://localhost:3000/user/${params.id}/performance`, type)
  const data = formatData(fetchedData, type)

if(data && data.length) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data} startAngle={30}  endAngle={390}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'white'}} />
          <Radar name="Mike" dataKey="value" fill="rgb(255, 1, 1)" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}

export default PerformanceChart;