import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

interface AverageRatingsByDayChartProps {
  data: { date: string; averageRating: number | null }[];
}

const AverageRatingsByDayChart = ({ data }: AverageRatingsByDayChartProps) => {
  const chart = (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={data} margin={{ bottom: 20, left: -30, right: 30 }}>
        <XAxis
          dataKey="date"
          label={{
            value: 'Day Of Month',
            offset: -15,
            position: 'insideBottom',
          }}
        />
        <YAxis ticks={[2, 4, 6, 8, 10]} />
        <Line
          connectNulls
          type="monotone"
          dataKey="averageRating"
          stroke="#67FFDE"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return chart;
};

export default AverageRatingsByDayChart;
