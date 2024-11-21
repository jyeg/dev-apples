# Project

- [Reviewer Notes and Considerations](#reviewer-notes-and-considerations)
- [Tradeoffs](#tradeoffs)
- [Running the project](#running-the-project)
- [Testing](#testing)

## Reviewer Notes and Considerations

I spent a little more than 2 hours on this project as I wanted to better demonstrate my ability to build a solution with a real world project setup. Normally I wouldnt automatically reach for shadcn ui, react hook forms, or prisma but these were easy to use with next.js. See tradeoffs for more details.

I chose the following technologies and approaches:

- Next.js to easily include frontend and backend code in the same project.
- React 19 RC for the latest react features including server actions.
- Npm is used as the package manager for simplicity.
- Docker for database dependencies.
- Prisma as its ORM and database migrations for simple usage with next.js.
- Shadcn UI for components because it is a full featured component library which is actively maintained with great design. Shadcn components are not installed via npm but are added to the project in the `components/ui` folder.
- Tailwind CSS for styling as it is a dependency of shadcn ui.
- Zod for form validation on the client side.
- React Hook Form for form handling because it is a dependency of shadcn ui forms.
- React Context for state management.
- React Testing Library for unit testing.
- Cypress for E2E testing.

## Tradeoffs

- Database model was kept simple with only a few fields to keep the project focused.
  - I would add more tables and relationships to better represent a real world project management system. Ex: Users, Projects, Notifications, etc.
- The project could benefit from additional unit tests, I only added a few to get started.
- The project could benefit from additional E2E tests, I only added a few to get started.
- I only added a few components to keep the project focused.
- Environment variables are stored in the `env` file and be better protected in a real world project.
- e2e tests use the dev database which I would not do in a real world project.
- Auth was not implemented because it is out of scope for this project.
- I chose ZOD to be able to mimic reuse of the same validation schema for the client and server side. If this was a real world project I would have likely had two separate apps, one for the client and one for the server with two different schemas.

## Challenges

- Jest and react testing library were not playing well with react hook form and react rc. If I had more time I would have liked to dig deeper into this.
- Cypress and react hook form with the conditional fields were causing some headaches.
- TypeORM and next.js server actions were causing me to spin my wheels. After searching the internet I could not find any examples of next.js server actions being used with TypeORM and I ended up just using simple a prisma setup, of which next.js had examples.

## Running the project

### Install dependencies

This project uses npm as its package manager.

```bash
npm install
```

This project depends on docker for database dependencies.

```bash
brew install docker
```

### Start the database

```bash
npm run db:up
```

### Build the project

```bash
npm run build
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Generate migrations

```bash
npx prisma migrate dev --name init
```

## Testing

### Run Jest tests

```bash
npm run test
```

### Run E2E tests

```bash
npm run build && npm run start
npm run cypress:open
```
