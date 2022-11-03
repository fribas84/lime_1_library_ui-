# Validation Tasks

## Task 1: Improve the US election webapp
Improve the US election website with:

- [X] Add a loader component of your choice that should indicate a transaction in progress. Make sure you are showing the transaction hash and a link to etherscan while the transaction is being mined

- [X] Automatically show the current leader on load and update it on results being submitted
- [ ] Show the current seats won by each candidate. Automatically update the results on successful transactions.
- [ ] Automatically show the state of the election - ended or not.
- [ ] Add the ability for the user to end the election.
- [ ] React to failure by telling the users something went wrong. If you have some kind of error message - display it for the user.

## Task 2: Create Book Library contract webapp
Create a branch for your library webapp out of the main branch and create similar webapp to the one for the Election. The webapp should:
- [ ] Connect to your library contract on Goerli
- [ ] Have a UI to create book, rent a book, return a book, see books available and their copies
- [ ] Connect the corresponding calls and transactions
- [ ] Wait for transactions (loading)
- [ ] React on transaction results (update state)
- [ ] Handle errors and faulty transactions (error handling)