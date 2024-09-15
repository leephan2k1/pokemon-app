## Setup and running instructions

Currently, I am using [Node version 20.14](https://nodejs.org/en/download/package-manager) and [PostgreSQL](https://www.postgresql.org/download/) database version 16. You can install them beforehand if you don’t have them already.

1. Clone this repo

```
git clone git@github.com:leephan2k1/pokemon-app.git
```

2. In the workspace directory of the project /pokemon-app, run the following command to install the necessary libraries.

```
npm ci
```

3. Set up the environment variables by referring to the guide in the file /pokemon-app/apps/pokemon-be/.env.example for the Back-end project and /pokemon-app/apps/pokemon-fe/src/environments for the Front-end project.
4. To run the project in the local development environment, in the workspace directory /pokemon-app, enter the command to run both the Angular and NestJS projects simultaneously:

```
npm run dev
```

## List of implemented features

### Frontend (Angular)

Basic user authentication (signup/ login) with JWT by username/
password

Implement a responsive layout with Header, Menu or Navigator,
Footer, and a main content section

Create a home page with:

- A carousel featuring 4 Pokémon-related YouTube video trailers
- A section displaying 10 Pokémon (first on database) with images
  and names

Implement a Pokémon list page with

- Button to import the csv file, which include the list of Pokémon
- A search bar with 300ms debounce time for filtering Pokémon by
  name
- Advanced search feature with filters (type, legendary status, speed
  ranges).

- Pagination (default 20 Pokémon per page) with a dropdown to
  change the number of visible Pokémon (10, 20, 50, 100)
- Ability to filter Pokémon with query params in the URL

Create a Pokémon detail modal/ dialog

- Display a detailed view modal with the Pokémon's image and
  comprehensive information upon clicking on item of list
- Add a favorite Pokémon feature, allowing users to mark/unmark
  favorite Pokémon by click to heart icon

### Backend (With NestJS)

Design your database (MongoDB/MySql/PostgreSQL...) to store
Pokémon, user data and favorite Pokémon lists

Implement RESTful API endpoints for:

- Signup/Login/Logout
- Import list of Pokémon by csv file
- Fetching Pokémon list with pagination and filtering
- Retrieving Pokémon details by id
- Mark/unmark favorite Pokémon
- Fetching user's favorite Pokémon list

### Any assumptions or design decisions you made

In my project, I used the PostgreSQL database in a NestJS project along with TailwindCSS and the Flowbite plugin, as well as NG-ZORRO for the following reasons:

PostgreSQL is the most popular relational database due to its simplicity and ease of deployment. Additionally, PostgreSQL offers many extensions for small and medium-sized projects without requiring more complex technologies to solve problems.

TailwindCSS is a utility-first CSS framework, which helps me significantly reduce time by focusing only on writing styles without having to navigate through too many files. Moreover, TailwindCSS provides many free and available plugins such as Flowbite, RibbleUI, and DaisyUI. Additionally, I used NG-ZORRO for handling more complex modal (dialog) processing.
