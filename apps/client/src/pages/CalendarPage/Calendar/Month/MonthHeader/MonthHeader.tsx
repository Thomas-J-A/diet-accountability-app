import { Flex, Text, Box } from '@radix-ui/themes';
import formatMonthAndYear from '../format-month-and-year';

interface MonthHeaderProps {
  year: number;
  month: number;
}

// Header displaying month, year, and appropriate background for each month
const MonthHeader = ({ year, month }: MonthHeaderProps) => {
  let imagePath;
  let imageCredit;

  // Determine which image to use based on current month
  switch (month) {
    case 0:
      imagePath = '/month-bgs/january.jpg';
      imageCredit = (
        <Text size="1">
          Photo by{' '}
          <a href="https://unsplash.com/@elisaih?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Elisa
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/photos/snow-covered-pine-tree-during-daytime-VjyTp23kbic?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </Text>
      );

      break;
    case 1:
      imagePath = '/month-bgs/february.jpg';
      imageCredit = (
        <Text size="1">
          Photo by{' '}
          <a href="https://unsplash.com/@ultratunafish?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Tunafish
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/photos/purple-and-white-flower-in-tilt-shift-lens-md80c79mpeM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </Text>
      );

      break;
    case 2:
      imagePath = '/month-bgs/march.jpg';
      imageCredit = (
        <Text size="1">
          Photo by{' '}
          <a href="https://unsplash.com/@monstercritic?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Sergey Shmidt
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/photos/orange-petaled-flowers-koy6FlCCy5s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </Text>
      );
      break;
    case 3:
      imagePath = '/month-bgs/april.jpg';
      imageCredit = (
        <Text size="1">
          Photo by{' '}
          <a href="https://unsplash.com/@danielsessler?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Daniel Seßler
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/photos/white-and-pink-cherry-blossom-in-close-up-photography-o9fQZdtbevE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </Text>
      );

      break;
    case 4:
      imagePath = '/month-bgs/may.jpg';
      imageCredit = (
        <Text size="1">
          Photo by{' '}
          <a href="https://unsplash.com/@roma_kaiuk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Roma Kaiuk🇺🇦
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/photos/brown-and-white-fox-on-green-grass-during-daytime-rtOPcbdwV9w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </Text>
      );

      break;
    case 5:
      imagePath = '/month-bgs/june.jpg';
      imageCredit = (
        <Text size="1">
          Photo by{' '}
          <a href="https://unsplash.com/@artem_kniaz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Artem Kniaz
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/photos/green-wheat-field-under-blue-sky-during-daytime-RWeO3t9FxG0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </Text>
      );

      break;
    case 6:
      imagePath = '/month-bgs/july.jpg';
      imageCredit = (
        <Text size="1">
          Photo by{' '}
          <a href="https://unsplash.com/@tcooper86?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Tim Cooper
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/photos/sunflower-flower-RmLSBjS5diE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </Text>
      );

      break;
    case 7:
      imagePath = '/month-bgs/august.jpg';
      imageCredit = (
        <Text size="1">
          Photo by{' '}
          <a href="https://unsplash.com/@tunagraphy?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            meriç tuna
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/photos/sunflower-fields-znT5MmTjASY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </Text>
      );

      break;
    case 8:
      imagePath = '/month-bgs/september.jpg';
      imageCredit = (
        <Text size="1">
          Photo by{' '}
          <a href="https://unsplash.com/@katiemoum?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Katie Moum
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/photos/orange-and-yellow-dried-leaves-on-tree-DLNoV-SFQ-U?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </Text>
      );

      break;
    case 9:
      imagePath = '/month-bgs/october.jpg';
      imageCredit = (
        <Text size="1">
          Photo by{' '}
          <a href="https://unsplash.com/@puregeorgia?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Alfred Schrock
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/photos/yellow-leaves-on-black-and-yellow-concrete-road-C7E8WTsvkmY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </Text>
      );

      break;
    case 10:
      imagePath = '/month-bgs/november.jpg';
      imageCredit = (
        <Text size="1">
          Photo by{' '}
          <a href="https://unsplash.com/@georgeiermann?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Georg Eiermann
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/photos/brown-leaves-during-daytime-tptxCrf-8eA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </Text>
      );

      break;
    case 11:
      imagePath = '/month-bgs/december.jpg';
      imageCredit = (
        <Text size="1">
          Photo by{' '}
          <a href="https://unsplash.com/@roiboscht?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Stephan H.
          </a>{' '}
          on{' '}
          <a href="https://unsplash.com/photos/several-red-baubles-on-snow-covered-pine-lSTXJu-0Spo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </Text>
      );

      break;
  }

  return (
    <Flex
      position="relative"
      align="start"
      height="8"
      style={{
        borderTop: '2px solid var(--gray-1)',
        borderBottom: '2px solid var(--gray-1)',
        background: `url(${imagePath}) center/cover no-repeat`,
      }}
    >
      <Box
        pl="2"
        pr="2"
        style={{
          background: 'rgb(0 0 0 / 50%',
          borderBottomRightRadius: 'var(--radius-2)',
        }}
      >
        <Text size="5" weight="bold">
          {formatMonthAndYear(year, month)}
        </Text>
      </Box>
      <Box
        position="absolute"
        bottom="0"
        right="0"
        pl="1"
        pr="1"
        style={{
          background: 'rgb(0 0 0 / 50%)',
          borderTopLeftRadius: 'var(--radius-2)',
        }}
      >
        {imageCredit}
      </Box>
    </Flex>
  );
};

export default MonthHeader;
