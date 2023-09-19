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

 - To run ESLint on every git commit, when you clone the repo. Use the command `npm run prepare` to initialise husky
 - To add any new rules to the linting process navigate to /.vscode/settings.json, from the project directory.
 - Navigate to the ESLint website to see what other rules can be added to the project at https://eslint.org/docs/latest/rules/

 - To run a ESLint check locally, Use the command `npm run lint` and it will give you errors if your code violates the linting rules.
