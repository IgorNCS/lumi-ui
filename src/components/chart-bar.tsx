"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

const chartConfig = {
  consumption: {
    label: "Consumo",
    color: "hsl(var(--primary))",
  },
  line:{
    label: "Consumo",
    color: "rgb(255, 0, 0)",
  }
} satisfies ChartConfig;

interface ConsumptionData {
  month: string;
  consumption: number;
}

interface Invoice {
  id: string;
  installation: string;
  client: string;
  dueDate: string;
  totalAmount: string;
  publicContribution: string;
  notaFiscal: string;
  referencyMonth: string;
  band: string;
  user: any; // You might want to create a specific interface for User
  company: any; // You might want to create a specific interface for Company
  energyData: any[]; // You might want to create a specific interface for EnergyData
  historyEnergy: {
    id: string;
    invoice_id: string;
    consumptionHistory: {
      year: string;
      month: string;
      consumption: string;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface ComponentBarProps {
  data: Invoice[];
}

export function ComponentBar({ data }: ComponentBarProps) {
  const [chartData, setChartData] = useState<ConsumptionData[]>([]);

  useEffect(() => {
    console.log("Received data:", data);
    if (data && data.length > 0) {
      const latestInvoice = data[0];
      if (latestInvoice && latestInvoice.historyEnergy && latestInvoice.historyEnergy.length > 0) {
        const consumptionHistory = latestInvoice.historyEnergy[0].consumptionHistory;
        const formattedData = consumptionHistory
          .sort((a, b) => {
            const months = consumptionHistory.map(item => item.month);
            return months.indexOf(a.month) - months.indexOf(b.month);
          })
          .map(item => ({
            month: item.month,
            consumption: parseInt(item.consumption, 10),
          }));
        setChartData(formattedData);
      } else {
        setChartData([]);
      }
    } else {
      setChartData([]);
    }
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consumo</CardTitle>
        <CardDescription>Nos ultimos meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
            />
            <YAxis tickLine={true} tickMargin={10} axisLine={true} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="consumption"
              fill='rgba(0, 182, 24, 0.8)'
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
              stroke='rgba(0, 182, 24, 0.4)'
              strokeWidth={2}
            />
            <Line
              dataKey="consumption"
              stroke="rgba(0, 182, 24, 0.8)"
              strokeWidth={1}
              dot={false}
            />
          </BarChart>
          
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {chartData.length > 1 && (
          <div className="flex gap-2 font-medium leading-none">
            A fatura {chartData[chartData.length - 1].consumption > chartData[chartData.length - 2].consumption ? 'subiu' : 'caiu'} em {(((chartData[chartData.length - 1].consumption - chartData[chartData.length - 2].consumption) / chartData[chartData.length - 2].consumption) * 100).toFixed(2)}% esse mês <TrendingUp className="h-4 w-4" />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

