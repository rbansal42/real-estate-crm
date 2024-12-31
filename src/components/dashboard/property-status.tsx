'use client';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface PropertyStatus {
  status: string;
  count: number;
}

interface PropertyStatusProps {
  data: PropertyStatus[];
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(217, 91%, 60%)', // Blue
  'hsl(271, 91%, 65%)', // Purple
];

export function PropertyStatus({ data }: PropertyStatusProps) {
  const total = data.reduce((acc, item) => acc + item.count, 0);

  return (
    <>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Property Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="60%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    strokeWidth={2}
                    stroke="hsl(var(--background))"
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const percentage = Math.round((data.count / total) * 100);
                    return (
                      <div className="rounded-lg border bg-background p-3 shadow-sm">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: payload[0].color }}
                            />
                            <span className="font-medium">{data.status}</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">{data.count}</span>
                            <span className="text-sm text-muted-foreground">
                              ({percentage}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-8 space-y-3">
            {data.map((item, index) => {
              const percentage = Math.round((item.count / total) * 100);
              return (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium">{item.status}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium">{item.count}</span>
                    <span className="text-sm text-muted-foreground">
                      ({percentage}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </>
  );
} 