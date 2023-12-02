import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts';

interface AverageRatingsByLocationChartProps {
  data: { mealLocation: string; averageRating: number }[];
}

const AverageRatingsByLocationChart = ({
  data,
}: AverageRatingsByLocationChartProps) => {
  const chart = (
    <ResponsiveContainer width="100%" height={150}>
      <AreaChart data={data} margin={{ bottom: 20, left: -30, right: 30 }}>
        <XAxis
          dataKey="mealLocation"
          label={{
            value: 'Location',
            offset: -15,
            position: 'insideBottom',
          }}
          interval={0}
          tick={{ fontSize: 8 }}
          tickMargin={8}
          angle={20}
        />
        <YAxis ticks={[2, 4, 6, 8, 10]} />
        <Area
          type="monotone"
          dataKey="averageRating"
          stroke="#00fff6"
          fill="#67FFDE"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return chart;
};

export default AverageRatingsByLocationChart;
