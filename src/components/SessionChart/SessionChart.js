import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import fetchData from '../../services/FetchData';
import formatData from '../../services/FormatData';
import './SessionChart.css'

/**
 * Format the tooltip that is shown on hover of the barChart
 * 
 * @param {boolean} active state of the tooltip visibility
 * @param {object[]} payload all of the data that is used to display the graph
 * @returns {HTMLCollection}
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="line-chart-tooltip">
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};

const SessionChart = () => {

  const type = "sessions"
  const params = useParams()
  const fetchedData = fetchData(`http://localhost:3000/user/${params.id}/average-sessions`, type)
  const data = formatData(fetchedData, type)

    if(data && data.length) {
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
  }

export default SessionChart;
