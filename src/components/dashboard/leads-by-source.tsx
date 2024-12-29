"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "MagicBricks", value: 45 },
  { name: "99acres", value: 35 },
  { name: "Direct", value: 15 },
  { name: "Others", value: 5 },
]

const COLORS = ["hsl(226.1 70.7% 40.2%)", "hsl(213.1 70.7% 40.2%)", "#00C49F", "#FF8042"]

export function LeadsBySource() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
} 