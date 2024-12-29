"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", total: 232 },
  { name: "Feb", total: 345 },
  { name: "Mar", total: 289 },
  { name: "Apr", total: 433 },
  { name: "May", total: 345 },
  { name: "Jun", total: 354 },
  { name: "Jul", total: 256 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} />
        <YAxis stroke="#888888" fontSize={12} />
        <Bar
          dataKey="total"
          fill="hsl(226.1 70.7% 40.2%)" // indigo-500
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 