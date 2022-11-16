# Share Expenses Contract

This project was develop with the porpuse to have a basic example of a Smart Contract with Solidity and Hardhat.

**Description of the reality:**

The idea is to create an Smart Contract that has differents Deposit Accounts associated to differentes users. The Deposit Accounts are associated to differents users and a user can not have got two Deposit Accounts at the same momment.

Each Deposit Account has the following information:

- Amount of persons associated.
- Amount of ethers per person.

To withdraw the ethers of a Deposit Account, the owner of this has to wait until all users pay their debt.

## Project Creation

This commands are not necessary to be exacuted, it is only to show what commands are need to create a project.

- **Node proyect creation**

  ```bash
  mkdir shared_expenses_dapp
  cd shared_expenses_dapp
  npm init
  ```

- **Hardhat install**
  ```bash
  npm install --save-dev hardhat
  ```
- **Hardhat init project**
  ```bash
  npx hardhat
  ```
  > **Note:** In case that you not select to install `hardhat-toolbox` consider execute:
  >
  > ```bash
  > npm install --save-dev @nomicfoundationhardhat-toolbox
  > ```

## Project Init

Once you download or unzip the project execute:

```bash
npm install
```

And compile the hardhat files to generate the executables files:

```bash
npx hardhat compile
```

## Working with the local network and the contract

Consider the following folder structure:

```bash
|_contracts
|_scripts
|_tasks
|_test
```

- Inside the `contracts` folder, there are located the `.sol` files that represents the contracts implementation files.

- Inside `scripts` folder, there are located the scripts files used to interact with the Smart Contract.

- Inside `tasks` folder, there are located the files asociated to the Hardhat custom tasks, implemented by the developers.

- Inside the `test` folder, there are located the unit test files.

### Interacting with the local blockchain

Hardhat has a build-in blockchain network. That network could be started with the command:

```bash
npx hardhat node
```

When the network is started, you can deploy our Share Expenses contract executing:

```bash
npx hardhat run scripts/0-deploy.ts --network localhost
```

#### Interacting using Scripts

When the Smart Contract is deployed, you can interact using the scripts asociated to the Deposit Account, pay to the Deposit Account, get the money asossiated to a Deposit Account and get information of the Balances of the contract and the associated users.

```bash
npx hardhat run scripts/1-createDepositAccount.ts --network localhost

npx hardhat run scripts/2-payToDepositAccount --network localhost

npx hardhat run scripts/3-withdrawMoney --network localhost

npx hardhat run scripts/4-showAccoutsBalances.ts --network localhost
```

#### Interaction using tasks

> **Note:** to make the use of the task simpler, we use the index of the users into the Hardhat users array. You can use the values from 0 to 19.

If you execute the command:

```bash
npx hardhat --help
```

You can show the commands that you can use with Hardhat blockchain. In this case, in the output of the command we will see the commands `createDepositAccount`, `payDepositAccount`, `withdrawDepositAccount` and `showUserInfo`. This commands were develop by the developers.

The description for this custom commands are the follwing:

- **Create Deposit Account**

  This script is used to create a Deposit Account.

  Example:

  ```bash
  npx hardhat createDepositAccount --userindex 1 --amount 4 --persons 5--network localhost
  ```

  **Parameters**:

  - `--userindex` index number into hardhat users array that will be the owner of the Deposit Account.

  - `--amount` amount per user to be deposited.

  - `--persons` amount of people to be expected that send a pyament

- **Pay to a Deposit Account**

  This script is used to send a payment to a Deposit Account.

  Example:

  ```
   npx hardhat payDepositAccount --userindex 3 --usertopay 1 --amount 4 --network localhost
  ```

  **Parameters**:

  - `--userindex` index number into hardhat users array that will pay.

  - `--usertopay` index number into hardhat users array that is owner of the Deposit Account.

  - `--amount` amount of etheres to be sended.

- **Withdra Deposit Account**

  This script is used to get the money of a Deposit Account.

  Example:

  ```
  npx hardhat withdrawDepositAccount --userindex 1  --network localhost
  ```

  **Parameters**:

  - `--userindex` index number into hardhat users array of the user that is owner of te Deposit Account.

- **Show User Balance**

  This script is used to show the user balance information

  Example:

  ```
  npx hardhat showUserInfo --userindex 1  --network localhost
  ```

  **Parameters**:

  - `--userindex` index number into hardhat users array.

### Execute Unit Test

To execute the Unit Test, you have to execute the command:

```bash
npx hardhat test
```
