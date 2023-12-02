import { DayEvent } from '../../../__generated__/graphql';
import ChartWrapper from './ChartWrapper/ChartWrapper';
import AverageRatingsByMealChart from './AverageRatingsByMealChart/AverageRatingsByMealChart';
import AverageRatingsByDayChart from './AverageRatingsByDayChart/AverageRatingsByDayChart';
import AverageRatingsByLocationChart from './AverageRatingByLocationChart/AverageRatingsByLocationChart';
import generateByMealData from './helpers/generate-by-meal-data';
import generateByDayData from './helpers/generate-by-day-data';
import generateByLocationData from './helpers/generate-by-location-data';

interface ChartsProps {
  data: DayEvent[];
  timeframe: 7 | 30;
  startDate: Date;
}

const Charts = ({ data, timeframe, startDate }: ChartsProps) => {
  // Massage base data into what is required by each particular chart
  const byMealData = generateByMealData(data);
  const byDayData = generateByDayData(data, timeframe, startDate);
  const byLocationData = generateByLocationData(data);

  return (
    <>
      <ChartWrapper heading="Average ratings by day">
        <AverageRatingsByDayChart data={byDayData} />
      </ChartWrapper>

      <ChartWrapper heading="Average ratings by meal">
        <AverageRatingsByMealChart data={byMealData} />
      </ChartWrapper>

      <ChartWrapper heading="Average ratings by location">
        <AverageRatingsByLocationChart data={byLocationData} />
      </ChartWrapper>
    </>
  );
};

export default Charts;
