# PiccyEater Diet Accountability App

> App that lets users record and rate their meals each day to help them stick to a diet.

![CI workflow](https://github.com/Thomas-J-A/diet-accountability-app/actions/workflows/ci.yml/badge.svg)
![CD workflow](https://github.com/Thomas-J-A/diet-accountability-app/actions/workflows/release.yml/badge.svg)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<a href="https://piccy-eater.fly.dev/" style="display:inline-block;background-color:#4CAF50;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold; font-size: 16px">🚀 Live App</a>

**Note:** It's fine to use dummy data to sign in (it isn't used beyond authenticating users).

## Table Of Contents

<details>

<summary>Expand Contents</summary>

- [About This Project](#about-this-project)
  - [What It Does](#what-it-does)
  - [How To Use It](#how-to-use-it)
  - [How I Approached It](#how-i-approached-it)
  - [Code Samples](#code-samples)
- [Technical Details](#technical-details)
  - [Architecture](#architecture)
  - [Tools & Technologies](#tools-technologies)
  - [Toolkit Decisions](#toolkit-decisions)
  - [Design Decisions](#design-decisions)
  - [Git & GitHub](#git-github)
  - [Security](#security)
  - [Accessibility](#accessibility)
  - [Performance & Optimizations](#performance-optimizations)
  - [Code Quality & Best Practices](#code-quality-best-practices)
  - [Design & UI/UX](#design-ui-ux)
  - [Authentication & Authorization](#authentication-authorization)
  - [Testing](#testing)
  - [Software Development & CS Fundamentals](#software-cs-fundamentals)
  - [AWS](#aws)
  - [Deployment](#deployment)
  - [Use Of AI](#use-of-ai)
- [Thoughts & Musings](#thoughts-musings)
  - [What I Learned](#what-i-learned)
  - [Challenges I Faced](#challenges-i-faced)
  - [What I Would Change](#what-i-would-change)
  - [Overall Thoughts](#overall-thoughts)
  - [Acknowledgements](#acknowledgements)

</details>

## About This Project <a name="about-this-project"></a>

I wanted to challenge myself by creating a non-trivial, full-stack project, from design to deployment, with a professional Git flow. I knew this would teach me more than multiple smaller projects because it requires more systems-level, architectural thinking as you work across different layers and domains.

### What It Does: <a name="what-it-does"></a>

- Friend wanted an app which kept track of what they were eating, but less strict than a calorie counter.
- You record basic information for each meal including a rating for healthiness, and at a glance you can see the daily average for all meals in a calendar.
- Further details can be seen in data visualizations.

### How To Use It: <a name="how-to-use-it"></a>

1. Sign up
2. Click on a day in the calendar
3. Choose mealtime and complete form
4. Daily meal rating averages are understood via a visual gradient on each date.
5. Statistics page presents data in various charts
6. FAQs page subverted into much less useful Rarely Asked Questions

### How I Approached It: <a name="how-i-approached-it"></a>

- Talked with friend about what they wanted.
- Sketched wireframes, then full designs (faster iterations than using Figma, for me)
- Modelled data for database, thinking about data flow throughout app while referencing designs, ensuring everything (as far as possible) was accounted for.
- Started coding. Spent large amount of time planning the project before writing any code. Led to more coherent structure, quicker development, more consistent design, less frustration.
- Often stepped away from laptop and thought about problem from a broader - and end user's - perspective.
- I decided not to use any tutorials (rarely do, anyway) and all ideas and implementations are my own. The struggling is the learning.

### Code Samples: <a name="code-samples"></a>

- [GraphQL schema](/apps/server/src/schema.graphql)
- [React component](/apps/client/src/components/layout/SignInForm/SignInForm.tsx)
- [Auth in client](/apps/client/src/contexts/AuthContext.tsx)
- [Styled components](/apps/client/src/components/layout/Drawer/Drawer.styled.tsx)
- [Unit tests for util](/apps/client/tests/unit/utils/capitalize-first-letter.test.ts), [custom hook](/apps/client/tests/unit/hooks/useMediaQuery.test.ts), [component](/apps/client/src/pages/CalendarPage/CalendarPage.test.tsx)
- [Integration tests for API](/apps/server/tests/integration/meal.test.ts)
- [Dockerfile](/Dockerfile.prod), [Docker Compose](/docker-compose.yml)
- [GitHub Actions worfklow](/.github/workflows/ci.yml)
- [Custom Eslint config](/apps/client/.eslintrc.cjs)
- [Descriptive Pull Request](https://github.com/Thomas-J-A/diet-accountability-app/pull/81)
- [Liberal use of comments](/apps/server/src/services/day-event.service.ts)

## Technical Details <a name="technical-details"></a>

### Architecture <a name="architecture"></a>

- Monorepo with client and server subdirectories. This made deployment and CI simpler.
- Client is a React project built with Vite, and server is implemented in Node.js with Express.
- API is a GraphQL schema using Apollo Server.
- During development I use Docker Compose to spin up client, server, and MongoDB containers. Client and server containers are configured with bind mounts to local filesystem which allows for real-time updates as I make changes in IDE. The Vite development server serves client files and proxies API requests to the backend.
- In production, project is hosted on the Fly.io PaaS. Whenever an accepted PR is merged into the main branch a GitHub Action workflow is triggered which redeploys the app with the latest changes. User-uploaded images are stored in S3 (separate buckets for dev and prod environments). Data is stored in a MongoDB Atlas cloud database. The built client files are served by Express middleware from a static directory.
- Environment variables are used to handle configuration of project in different enviroments as stated in the Twelve-Factor App methodology.

### Tools & Technologies <a name="tools-technologies"></a>

Selection of what I used:

- TypeScript
- React and its ecosystem
- Radix UI headless component library
- Styled Components
- Vite
- Apollo Client/Server
- Jest
- React Testing Library
- Node.js/Express
- AWS SDK
- MongoDB
- Docker
- ESLint/Stylelint/Prettier
- YAML/TOML/JSON/md
- Linux terminal
- Git/GitHub, GitHub Actions

### Toolkit Decisions <a name="toolkit-decisions"></a>

- Used GraphQL over a REST API as I wanted to challenge myself with a different way of thinking about querying data.
- Used Apollo Client because it handles data fetching, caching, and state management.
- Used Radix UI for quicker development, theming consistency, and ensuring accessibility. Previously wrote completely custom CSS and this saved a lot of time while still offering customization options.
- AWS S3 to store images because there would be too many to store in the server filesystem which would increase bandwidth, slow down requests, and increase costs.
- Vite for client. Previously used a custom webpack config but found Vite to be much faster in development due to utilizing native ES6 imports rather than recompiling on each save.
- Data visualization implemented with recharts library because it has a simpler API than D3.

### Design Decisions <a name="design-decisions"></a>

- Database entities based on access patterns. For example, not associating a `Meal` with a `User`, instead having an array of `Meal`s in the `DayEvent` entity and fetching `Meal`s by querying for the `DayEvent`. Whew. It's less extensible but I knew scope of project from the start so I was able to optimize it for those requirements.
- Static data like testimonials which doesn't change frequently bundled in client build because it prevents queries to the database. I would move them to a database if frequent changes were needed to prevent having to rebuild and redeploy app on each change.
- Added plenty of humour throughout because why not? The world needs to smile! 🥳

### Git & GitHub <a name="git-github"></a>

- Tried to simulate a real-world worflow to facilitate joining a team:

```mermaid
flowchart TD
  A{{Choose task}}-->B{{Pull latest changes}}
  B-->C{{Checkout new branch}}
  C-->D{{Implement feature}}
  D-->E{{Commit, run Git hooks}}
  E-->F{{Push to remote}}
  F-->G{{Open PR, run CI}}
  G-->H{{Merge into always-deployable main}}
  H-->I{{Run CD}}
  I-->A
```

- Main branch protections (require PR, checks must pass).
- Small, frequent commits (around 90 PRs for project).
- Aimed for a daily commit which helped ensure small, manageable tasks.
- Descriptive PRs with clear commit messages and description of change.

### Security <a name="security"></a>

- AWS root user is protected by MFA with no access keys, and IAM users have no privileges apart from assuming a temporary role attached to a policy with privileges only to upload to S3.
- Docker images not run as root user.
- In process of pinning all GitHub Actions to hash versions in CI/CD.
- GraphQL servers have known CSRF issues when handling multipart requests so image uploads are done on client via a presigned URL.
- Secrets/credentials stored in git-ignored .env files in development/testing environments, GitHub Action's Secrets engine during CI, and Fly.io's Secrets API in production.
- Passwords encrypted in database via bcrypt.
- git-leaks program runs in a Git hook and during CI checks which prevents AWS credentials from being committed accidently.
- JWT tokens used for user sessions have a short expiry in case they fall into hands of bad actors (_like Steven Seagal_).

### Accessibility <a name="accessibility"></a>

- Radix UI headless component library is accessibility-first and takes headache out of following WCAG accessibility guidelines, for example focus traps on drawers.
- Added extra ARIA attributes lke alert role for form error messages for screen readers, and aria-invalid is also added to field.
- Manually tested keyboard navigation throughout app. There is a small UX issue with the numerous background image attributions; should be able to skip these if desired.
- React Testing Library promoted good accessibility habits.

### Performance & Optimizations <a name="performance-optimizations"></a>

- Debounced function which queries API until user stops clicking previous/next day buttons in quick succession.
- Presigned S3 URLs so that user can upload directly from client instead of using bandwidth on the server, fetched in batch so all URLs returned at once instead of one request per URL.
- In-memory caching of queried data via Apollo Client.
- Production Docker image is built with a multistage Dockerfile which creates a slimmer production build containing just the artifacts from previous build stages.

### Code Quality & Best Practices <a name="code-quality-best-practices"></a>

- Git hooks via Husky running checks before committing.
- Commitzen enforced to ensure standard Git commit messages.
- ESLint/Stylelint/Prettier, all with completely custom configs.
- Error handling, e.g. centralized GraphQL error handling where expected errors are waved through and unexpected ones are formatted to prevent internal details leaking.
- Liberal use of comments, especially for code which is not easily understood, or requires them for tooling such as the GraphQL schema and IDE extension.
- API testing, react component testing, custom hook testing.
- Consistent directory structure and file naming.

### Design & UI/UX <a name="design-ui-ux"></a>

- Developed mobile-first, responsive on tablet and desktop.
- Tested on Safari, Firefox, and Chrome for cross-browser compatibility.
- Frequent user testing - on different devices - to look for pain points.
- Redirect to referrer feature in client where unauthenticated users who access app at a restricted path will be redirected back to intended page after a successful sign-in.
- Initially created wireframes using Figma as with my FakeMates project but iterations were slow so I changed to hand sketched designs:

<img src="docs/design-sketches.jpeg" alt="Hand drawn sketches of UI" height="600" style="border-radius: 5px; border: 1px solid #fff" />

### Authentication & Authorization <a name="authentication-authorization"></a>

- Decided against an auth service like Okta/Auth0 in order to learn more about the process of authentication specifically in a GraphQL project, so hand rolled the entire auth system.
- GraphQL API protected by an expiring JWT token and graphql-shield library with its permissions and rules.
- Client is inherently unsecure since the user downloads the entire react bundle - hence the need for protections on API - but user session is handled with LocalStorage API, a JWT token, and global state.
- No RBAC necessary, would be easy to add functionality in my PrivateRoute component to check for role as well as general auth status.

### Testing <a name="testing"></a>

- Manually tested during development of API with Postman and Apollo Server's testing playground.
- Unit testing of components, utils, and custom hooks. Basic smoke tests, user interactions.
- Comprehensive integration testing of GraphQL schema using Apollo Server's executeOperation API. Covers all resolvers and most edge cases.
- E2E tests not currently implemented because of time constraints. I would like to add Cypress tests to cover essential user flows like signup within a dedicated Docker Compose file which can spin up project in a testing environment and run in CI.
- Increased confidence in code and prevented regressions when adding new features.
- Helped in forcing modularization of code.
- My aim was to give every component its own test but this results in a lot of mocking and perhaps a more integrated approach would give more accurate feedback.

### Software Development/CS Fundamentals <a name="software-cs-fundamentals"></a>

**Note:** examples for these definitely exist because I made a note of them while using each one, but they elude me as I write this. 😅

- Bitwise operations (to compare relative position of two nodes in document using compareDocumentPosition API, Node constants, and Bitwise '&')
- Currying and closures.
- Functional methods: flatMap, map, filter, some, reduce, find.
- Dependency injection.
- Appropriate data structures.

### AWS <a name="aws"></a>

- Used S3, STS, IAM users/roles, presigned URLs.
- Client queries for presigned URLs from Apollo Server, uploads images directly to S3 bucket.
- Heightened interest in security after reading horror stories about hacked AWS accounts while setting up S3.

### Deployment <a name="deployment"></a>

- #### Scalability

  - Currently serving static assets (JS/HTML/CSS/background images) from Express middleware. This consumes server resources and bandwidth. Consider caching in a CDN.

- #### Availability

  - Had users test in other regions like Japan and it is functioning correctly.
  - Two instances running in production, protects against failure of either machine.
  - Rolling updates.

- #### Maintenance

  - A cron job runs daily via GitHub Actions which checks health of deployed app at its base path.

### Use Of AI (chatGPT) <a name="use-of-ai"></a>

- Helped with clarifying unclear topics and unfamiliar syntax (like this Markdown file with Mermaid syntax!).
- Learned about prompt engineering to get more accurate responses.
- No code copied from its output is in codebase.
- Helpful for small routines, not larger features.
- On a non-trivial project much of the difficulty lies in the configuration and getting all services to play nicely together, not simply writing code; chatGPT struggled with this.
- If you 'cheat', you only cheat yourself, because you don't gain any actual knowledge.
- Important to use as an aide and not rely on it as a black box solution - skills felt less sharp after deferring to it too frequently.

## Thoughts & Musings <a name="thoughts-musings"></a>

### What I Learned <a name="what-i-learned"></a>

- Creating a full stack app from design to deployment is about 3% coding business logic, 90% configuration, and 7% mental anguish (the healthy kind).
- If something is frustrating or difficult, I simply don't grasp it well enough.
- Third party libraries are to be embraced when working on non-trivial projects.
- A lot of the work of a software developer can happen away from the computer.
- GraphQL non-nullable syntax makes a schema look very excitable (User! Meal!), and the tooling is no joke.
- Importance of following the path of data and knowing what is happening where in the entire project.
- DevOps, AWS, CI/CD, Git, Linux in practice - expanding beyond simply writing code.
- Software development is about more than writing code; securing your app, testing, refactoring, deploying, monitoring, etc.
- New react libraries, technologies, languages, concepts.
- Securing an AWS account.
- Git flow made me more comfortable using various Git commands like pulling, stashing, branching.
- Don't commit when tired, will probably cause a bug that the next commit attempts to fix.
- Finding a better balance between depth and breadth when learning new technologies as an antidote to perfectionism, and not being afraid of inserting a cheeky `TODO:` for non-essential parts.

### Challenges I Faced (And How I Overcame Them) <a name="challenges-i-faced"></a>

- In general, whenever I faced a challenge I thought of the system as a whole and not just as lines of code.
- Codegen for creating types from GraphQL schema caused lots of issues when running builds in Docker/CI, as well as accessing from the client. Considering what is available to the code in each environment helped.
- The backend had me doing mental gymnastics considering TypeScript, GraphQL, and Mongoose types all at the same time. Adding IDE extensions helped.
- Organizing react components into logical units. Aimed to limit files to under 200 SLOC which kept each component concise and focused.
- Overcoming limitations of third-party libraries. A lot of functionality isn't documented so I needed to read a lot of source code - for example, of Radix UI components - to see how I could make it do what I wanted.

🎉 _**MOST PERNICIOUS BUG THAT SPENT AN EMBARRASSING AMOUNT OF TIME TO FIX AWARD**_ 🥇: finding out that you can't have multiple parsers in a single ESLint config file (for TypeScript and GraphQL). Solved by moving all top level rules to an override. That was painful.

### What I Would Change <a name="what-i-would-change"></a>

- A monorepo framework such as NX to handle dependencies better.
- Implement as a native app which would give native access to the camera and a simplified UX.
- Refactor some of the mutations done in client. Update cache manually instead of simple but costly refetch.
- Logging with a dedicated logging service.
- Add additional nested error boundaries. Currently a single top level catch-all.
- Implement all TODOs (marked in code with `TODO:`)
- Cypress E2E test suite.
- Reusable form fields.
- Speed up CI jobs by caching dependencies between them.
- Refresh token flow. Requires an Observable in a custom Apollo Link. Currently logs user out and displays message when session expires.
- Scroll to current date on load of calendar feature. Works on desktop, likely related to how viewports/pixel ratio is handled on mobile devices.
- Finish image upload implementation in client, server-side resolvers and client form are all complete, just issue with rendering.

### Overall Thoughts On The Project <a name="overall-thoughts"></a>

I now have a greater appreciation of - and knowledge on - the entire SDLC. From user research, designs, implementation, and deployment, I feel more comfortable working across domains and this has helped greatly when tackling challenges that inevitably appear. I enjoyed constantly learning and applying new tools and concepts throught the project, and I felt that the thorough planning of design/data models before coding helped enormously. I am keen to continue working with new technologies and refining my skills. There was also a specific focus on approaching this project in a way that facilitated joining a team and I feel I have achieved that as I am more comfortable working with Git branching strategies and PRs.

## Acknowledgements <a name="acknowledgements"></a>

I would like to thank my friends, my family, my partner, Kenco coffee, Tottenham Hotspur Football Club. You have all given me far more than I can ever repay. And to the creators of all the open source tools that I was able to use, a sincere gracias.

![Formal thank you in Japanese, couple bowing](https://media.giphy.com/media/zFKPx0ZJhd8vcgdWdp/giphy.gif)
