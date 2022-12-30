import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import './ScoreChart.css'



const style = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  lineHeight: '24px',
  textAlign: 'center',
  backgroundColor: "white",
  borderRadius: "50%",
  width: "62%",
  height: "62%"
};

/**
 * 
 * @param {object[]} payload all of the data that is used to display the graph
 * @returns {HTMLCollection}
 */
const CustomizedLegend = ({ payload }) => {
  
  if (payload && payload.length) {
    return (
      <div className="custom-radial-legend">
        <p className="bold">{payload[1].payload.uv + "%"}</p>
        <p>de votre</p>
        <p>objectif</p>
      </div>
    )
  }

  return null;
};

/**
 * 
 * @param {number} score the user's score used in the radialBarChart, contains a value between 0 and 1.
 */
const ScoreChart = ({score}) => {
  
  const data = [
    {
      name: '',
      uv: 100,
      fill: 'white',
    },
    {
      name: 'score',
      uv: score*100,
      fill: 'red',
    },
  ];
  

    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="0%" outerRadius="140%" startAngle={90}  endAngle={450} barSize={13} data={data}>
          <RadialBar
            cornerRadius={"100"}
            minAngle={15}
            background={false}
            clockWise
            dataKey="uv"
          />
          <Legend layout="vertical" verticalAlign="middle" wrapperStyle={style} content={<CustomizedLegend />}/>
        </RadialBarChart>
      </ResponsiveContainer>
    );

}

 
export default ScoreChart;