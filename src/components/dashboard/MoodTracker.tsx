import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MoodTracker: React.FC = () => {
  const data = [
    { day: 'Mon', mood: 7.2 },
    { day: 'Tue', mood: 8.1 },
    { day: 'Wed', mood: 6.8 },
    { day: 'Thu', mood: 8.5 },
    { day: 'Fri', mood: 7.9 },
    { day: 'Sat', mood: 8.3 },
    { day: 'Sun', mood: 7.8 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="day" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            stroke="#6b7280"
          />
          <YAxis 
            domain={[0, 10]}
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
            formatter={(value) => [`${value}/10`, 'Mood Score']}
          />
          <Line 
            type="monotone" 
            dataKey="mood" 
            stroke="#14b8a6" 
            strokeWidth={3}
            dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodTracker;