'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface TeamPerformance {
  member: string;
  leads: number;
  conversions: number;
  properties: number;
}

interface TeamPerformanceProps {
  data: TeamPerformance[];
}

export function TeamPerformance({ data }: TeamPerformanceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead className="text-right">Leads</TableHead>
              <TableHead className="text-right">Conversions</TableHead>
              <TableHead className="text-right">Properties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.member}>
                <TableCell className="font-medium">{item.member}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary">{item.leads}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary">{item.conversions}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary">{item.properties}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 