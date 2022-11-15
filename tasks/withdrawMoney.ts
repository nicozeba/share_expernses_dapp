import { task, types } from "hardhat/config";

task("withdrawDepositAccount", "Pay to a Deposit Account")
  .addParam(
    "userindex",
    "Index of the user into hardhat users array that will pay",
    1,
    types.int
  )
  .setAction(async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    const user = accounts[taskArgs.userindex];
    const shareExpenses = await hre.ethers.getContractAt(
      "ShareExpenses",
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      user
    );

    await shareExpenses.retriveDepositAccountMoney();
  });
