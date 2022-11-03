# Validation Tasks

## Task 1: Improve the US election webapp
Improve the US election website with:

-[X] Add a loader component of your choice that should indicate a transaction in progress. Make sure you are showing the transaction hash and a link to etherscan while the transaction is being mined
-[X] Automatically show the current leader on load and update it on results being submitted
-[ ] Show the current seats won by each candidate. Automatically update the results on successful transactions.
-[ ] Automatically show the state of the election - ended or not.
-[ ] Add the ability for the user to end the election.
-[ ] React to failure by telling the users something went wrong. If you have some kind of error message - display it for the user.

## Task 2: Create Book Library contract webapp
Create a branch for your library webapp out of the main branch and create similar webapp to the one for the Election. The webapp should:
-[ ] Connect to your library contract on Goerli
-[ ] Have a UI to create book, rent a book, return a book, see books available and their copies
-[ ] Connect the corresponding calls and transactions
-[ ] Wait for transactions (loading)
-[ ] React on transaction results (update state)
-[ ] Handle errors and faulty transactions (error handling)







[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmirshko%2Fnext-web3-boilerplate)

This is a default [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), customized as the default boilerplate for new Web3 projects.

## Features

- Separate packages from [ethers.js](https://docs.ethers.io/v5/) for improved tree-shaking, often only ethers Contracts
- Hooks-first approach to fetching and caching data from Contracts and memoization for performance with [SWR](https://swr.vercel.app)
- [web3-react](https://github.com/NoahZinsmeister/web3-react) for ease of connecting to Web3 providers with a solid API
- Auto-generates types for the contract ABIs in the `/contracts` folder via [TypeChain](https://github.com/ethereum-ts/TypeChain)
- MetaMask connection
- WalletConnect connection

### Auto Contract Type Generation

**Note**: After adding in your new contract ABIs (in JSON format) to the `/contracts` folder, run `yarn compile-contract-types` to generate the types.

You can import these types when declaring a new Contract hook. The types generated show the function params and return types of your functions, among other helpful types. 

```ts
import MY_CONTRACT_ABI from "../contracts/MY_CONTRACT.json";
import type { MY_CONTRACT } from "../contracts/types";
import useContract from "./useContract";

export default function useMyContract() {
  return useContract<MY_CONTRACT>(CONTRACT_ADDRESS, MY_CONTRACT_ABI);
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:4001](http://localhost:4001) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
