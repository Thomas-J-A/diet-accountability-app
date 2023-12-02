import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface AverageRatingsByMealChartProps {
  data: { mealType: string; averageRating: number }[];
}

const AverageRatingsByMealChart = ({
  data,
}: AverageRatingsByMealChartProps) => {
  const chart = (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={data} margin={{ bottom: 20, left: -30, right: 30 }}>
        <XAxis
          dataKey="mealType"
          label={{ value: 'Meal', offset: -15, position: 'insideBottom' }}
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis ticks={[2, 4, 6, 8, 10]} />
        <Bar dataKey="averageRating" stroke="#00fff6" fill="#67FFDE" />
      </BarChart>
    </ResponsiveContainer>
  );

  return chart;
};

export default AverageRatingsByMealChart;
