import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ActivityChart: React.FC = () => {
  const data = [
    { day: 'Mon', sessions: 2, minutes: 45 },
    { day: 'Tue', sessions: 3, minutes: 65 },
    { day: 'Wed', sessions: 1, minutes: 30 },
    { day: 'Thu', sessions: 4, minutes: 80 },
    { day: 'Fri', sessions: 2, minutes: 50 },
    { day: 'Sat', sessions: 1, minutes: 25 },
    { day: 'Sun', sessions: 3, minutes: 70 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="day" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            stroke="#6b7280"
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            stroke="#6b7280"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Bar 
            dataKey="sessions" 
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            name="Sessions"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;