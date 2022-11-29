# smart-contract-wallet-demo

Account abstraction on ethereum using smart contract wallets. This is the first phase of a technological rollout of advanced account abstraction. Smart contracts in this application maintain all functionality of EOAs with additional configurations which are classified as **services**

## Running the App
### Frontend
- Feel free to run the app with the following

```bash
cd shield-wallet-frontend
npm i
npm run start
```
### Contracts
- Feel free to run test cases and scripts of the contracts as follows (make sure you are in root so open a new terminal if you just ran the frontend app)
- Also make sure you have foundry installed
```bash
cd smart-contracts
forge build
forge test
npm run deploy:services
```
