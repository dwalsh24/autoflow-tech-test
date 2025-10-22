# AutoFlow Automated Tech Test

Submission for Daniel Walsh

## Prerequisites 
Node - Installation instructions can be found here: https://nodejs.org/en/download

Yarn - The project uses a yarn monorepo. Installation instructions can be found here: https://yarnpkg.com/getting-started/install

## Running the tests
Ensure the AutoFlow Film Store is running separately on http://localhost:4200/ 

Install the dependencies and browser binary required for Playwright with:
```bash
yarn install
yarn playwright install chromium
```
Run the tests from the project root, or ui-tests package with:
```bash
yarn test
```
When the tests have finished running, a html report should open automatically with the results