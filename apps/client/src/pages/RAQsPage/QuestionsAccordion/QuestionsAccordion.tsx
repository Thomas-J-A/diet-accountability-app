import { Link as RouterLink } from 'react-router-dom';
import * as Accordion from '@radix-ui/react-accordion';
import { Box, Text, Quote, Em, Link } from '@radix-ui/themes';
import AccordionItem from './AccordionItem/AccordionItem';

const QuestionsAccordion = () => {
  return (
    <Box
      p="2"
      style={{
        border: '1px solid var(--gray-6)',
        borderRadius: 'var(--radius-2)',
      }}
    >
      <Accordion.Root type="single" collapsible>
        <AccordionItem value="item-1" triggerText="Who is it for?">
          <Text size={{ initial: '1', md: '2' }} weight="light">
            People who are wondering{' '}
            <Quote>How is my diet going this week?</Quote> or{' '}
            <Quote>What did I have for lunch last Monday?</Quote>
          </Text>
        </AccordionItem>

        <AccordionItem value="item-2" triggerText="How do I use it?">
          <Text size={{ initial: '1', md: '2' }} weight="light">
            It&apos;s very simple. To record a meal, click on a day in the
            <RouterLink to="/calendar">calendar</RouterLink>, choose an
            appropriate mealtime, and fill in the form.
          </Text>
        </AccordionItem>

        <AccordionItem value="item-3" triggerText="Can I see the source code?">
          <Text size={{ initial: '1', md: '2' }} weight="light">
            Sure, here&apos;s{' '}
            <Link href="https://github.com/Thomas-J-A/diet-accountability-app">
              a link to the Github repo.
            </Link>
          </Text>
        </AccordionItem>

        <AccordionItem
          value="item-4"
          triggerText="Which genius is behind this work of art?"
        >
          <Text size={{ initial: '1', md: '2' }} weight="light">
            His name is Tom Aspbury, check out his portfolio.
          </Text>
        </AccordionItem>

        <AccordionItem
          value="item-5"
          triggerText="Will this app steal my data?"
        >
          <Text size={{ initial: '1', md: '2' }}>
            No, but it <Em>will</Em> steal your heart. Aww, cozy.
          </Text>
        </AccordionItem>

        <AccordionItem
          value="item-6"
          triggerText="Will this app bring world peace?"
        >
          <Text size={{ initial: '1', md: '2' }} weight="light">
            You are an utter turnip.
          </Text>
        </AccordionItem>

        <AccordionItem
          value="item-7"
          triggerText="Where can I file a complaint?"
        >
          <Text size={{ initial: '1', md: '2' }} weight="light">
            Just head over to the &quot;Contact Us&quot; page and fill out the
            form. Just be aware, there is no actual &quot;Contact Us&quot; page,
            and now I&apos;m upset.
          </Text>
        </AccordionItem>
      </Accordion.Root>
    </Box>
  );
};

export default QuestionsAccordion;
