# Node JS Back end application

This project contains a small Node Js app using express with:

- Rest api
  - `GET /messages`: Display a message list
  - `POST /messages`: Create a new message
  - `PUT /messages/:id`: Update the selected message
  - `DELETE /messages/:id`: Delete the selected message

- MySQL database:
  - table `messages`:
    - `id`: int AUTO_INCREMENT, Primary Key
    - `title`: varchar(255)
    - `content`: varchar(255)
    - `createdAt`: DateTime
    - `updatedAt`: DateTime

**For the database versionning we are using `sequelize`**
```bash
npx sequelize-cli db:migrate
```

To **lauch the app** localy:
- Download this repository
- Install dependencies
- A [docker-compose](./docker-compose.yml) file is available:
  ```bash
  # Lauch MySQL, PHPMYADMIN and API containers:
  docker-compose up -d
  # Don't forget to lauch migrations and fixtures
  docker-compose exec server npx sequelize-cli db:migrate
  docker-compose exec server npx sequelize-cli db:seed:all
  ```
- Check that http://localhost:3000 is displaying the correct api status


**Tests are available**:
```bash
# unit tests
npm run unit

# functional tests, the api must be callable on http://localhost:3000
npm run e2e

# code linting
npm run lint
```