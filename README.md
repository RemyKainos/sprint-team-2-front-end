# sprint-team-2-front-end

# How to start the application
---

 1. Run `npm install` to build the application with all the packages.
 2. Run `npm start` to start the application.

# Tests
---

1. Run `npm run test` to run Unit tests.
2. Run `npm run test-ui` to run UI tests.
3. Run `npm run test-integration` to run Integration tests.

# ESLint
---

In the package.json, you can see that ESLint is running a check on the code after the build:

1. To run ESLint on every git commit, when you clone the repo. Use the command `npm run prepare` to initialise husky
2. To add any new rules to the linting process navigate to /.vscode/settings.json, from the project directory.
3. Navigate to the ESLint website to see what other rules can be added to the project at https://eslint.org/docs/latest/rules/
4. To run a ESLint check locally, Use the command `npm run lint` and it will give you errors if your code violates the linting rules.

2. Run `UI_TEST_URL=http://localhost:3000 npm run test-ui` to run ui tests, will also likely require backend to be running to pass  

# How to run the application on Docker locally
---

1. Run `docker build -t <service name + optional tag> .` which will read the docker file, build the environment and create local image.
2. Run `docker images` to verify your image is available after building.
3. Run `docker run -p 3000:3000 <service name + optional tag>` to run the Docker build and display on port 3000.

# Docker on GitHub Actions
---

When running pull request to main branch, the deploy.yml file will be run which will deploy the UI to the AWS Server.
The link to the server is https://wvrhehxy3p.eu-west-1.awsapprunner.com/
