import { Flex, Box, Text, Em, Tabs, Button } from '@radix-ui/themes';
import {
  DayEvent,
  Meal,
  MealTypeEnum,
} from '../../../../../__generated__/graphql';

enum HealthRating {
  ExtremelyUnhealthy = 1,
  VeryUnhealthy,
  Unhealthy,
  FairlyUnhealthy,
  AverageHealthiness,
  FairlyHealthy,
  Healthy,
  VeryHealthy,
  ExtremelyHealthy,
  SoHealthyItHurts,
}

const mapRatingToText = (rating: number): string => {
  switch (rating) {
    case HealthRating.ExtremelyUnhealthy:
      return 'Extremely Unhealthy';
    case HealthRating.VeryUnhealthy:
      return 'Very Unhealthy';
    case HealthRating.Unhealthy:
      return 'Unhealthy';
    case HealthRating.FairlyUnhealthy:
      return 'Fairly Unhealthy';
    case HealthRating.AverageHealthiness:
      return 'Average Healthiness';
    case HealthRating.FairlyHealthy:
      return 'Fairly Healthy';
    case HealthRating.Healthy:
      return 'Healthy';
    case HealthRating.VeryHealthy:
      return 'Very Healthy';
    case HealthRating.ExtremelyHealthy:
      return 'Extremely Healthy';
    case HealthRating.SoHealthyItHurts:
      return 'So Healthy It Hurts';
    default:
      return 'Invalid Rating';
  }
};

interface TabContentProps {
  value: MealTypeEnum;
  meal: Meal | undefined;
  setFormMode: React.Dispatch<React.SetStateAction<'ADD' | 'EDIT' | null>>;
}

// Displays details for breakfast/lunch/dinner depending on active tab
const TabContent = ({ value, meal, setFormMode }: TabContentProps) => {
  return meal ? (
    <Tabs.Content value={value}>
      <Flex direction="column" align="center" gap="2" p="3">
        <Flex p="2">
          <Text size="1">
            <Em>No photos to display</Em>
          </Text>
        </Flex>

        <Flex direction="column" gap="1">
          <Text size="1" weight="bold" align="center">
            {meal.location}
          </Text>
          <Text size="1" align="center">
            {meal.description}
          </Text>
          <Text size="3" weight="bold" align="center">
            {mapRatingToText(meal.rating)}
          </Text>
        </Flex>

        <Button
          style={{ width: '100%', cursor: 'pointer' }}
          onClick={() => {
            setFormMode('EDIT');
          }}
        >
          Edit
        </Button>
      </Flex>
    </Tabs.Content>
  ) : (
    <Tabs.Content value={value}>
      <Flex direction="column" align="center" gap="2" p="3">
        <Text size="3">No data.</Text>
        <Button
          style={{ width: '100%', cursor: 'pointer' }}
          onClick={() => {
            setFormMode('ADD');
          }}
        >
          Add
        </Button>
      </Flex>
    </Tabs.Content>
  );
};

interface MealsDisplayProps {
  currentDayEvent: DayEvent | undefined;
  setFormMode: React.Dispatch<React.SetStateAction<'ADD' | 'EDIT' | null>>;
  activeTab: MealTypeEnum;
  setActiveTab: React.Dispatch<React.SetStateAction<MealTypeEnum>>;
}

// Displays tabs and tab content (meal info) for each meal of the day
const MealsDisplay = ({
  currentDayEvent,
  setFormMode,
  activeTab,
  setActiveTab,
}: MealsDisplayProps) => {
  // Intermediate function to handle conversion of types between
  // what the Radix-UI 'Tabs' component wants, and local state
  const handleTabChange = (value: string) => {
    setActiveTab(value as MealTypeEnum);
  };

  // Extract meal from day event, if meal exists
  const extractMeal = (
    currentDayEvent: DayEvent,
    mealType: MealTypeEnum,
  ): Meal | undefined => {
    return currentDayEvent.meals.find((m) => m.type === mealType);
  };

  const breakfast =
    currentDayEvent && extractMeal(currentDayEvent, MealTypeEnum.Breakfast);

  const lunch =
    currentDayEvent && extractMeal(currentDayEvent, MealTypeEnum.Lunch);

  const dinner =
    currentDayEvent && extractMeal(currentDayEvent, MealTypeEnum.Dinner);

  return (
    <Box>
      <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
        <Tabs.List size="2" style={{ justifyContent: 'center' }}>
          <Tabs.Trigger value={MealTypeEnum.Breakfast}>Breakfast</Tabs.Trigger>
          <Tabs.Trigger value={MealTypeEnum.Lunch}>Lunch</Tabs.Trigger>
          <Tabs.Trigger value={MealTypeEnum.Dinner}>Dinner</Tabs.Trigger>
        </Tabs.List>

        <Box>
          <TabContent
            value={MealTypeEnum.Breakfast}
            meal={breakfast}
            setFormMode={setFormMode}
          />

          <TabContent
            value={MealTypeEnum.Lunch}
            meal={lunch}
            setFormMode={setFormMode}
          />

          <TabContent
            value={MealTypeEnum.Dinner}
            meal={dinner}
            setFormMode={setFormMode}
          />
        </Box>
      </Tabs.Root>
    </Box>
  );
};

export default MealsDisplay;
