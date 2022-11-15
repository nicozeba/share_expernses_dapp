import { task, types } from "hardhat/config";

task("payDepositAccount", "Pay to a Deposit Account")
  .addParam(
    "userindex",
    "Index of the user into hardhat users array that will pay",
    1,
    types.int
  )
  .addParam(
    "usertopay",
    "Index of the user into hardhat users array to pay",
    2,
    types.int
  )
  .addParam("amount", "Amount of Ehters per Person", 1, types.string)
  .setAction(async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    const user = accounts[taskArgs.userindex];
    const userToPay = accounts[taskArgs.usertopay];
    const shareExpenses = await hre.ethers.getContractAt(
      "ShareExpenses",
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      user
    );

    await shareExpenses.payToDepositAccount(
      userToPay.address,
      hre.ethers.utils.parseEther(taskArgs.amount),
      {
        value: hre.ethers.utils.parseEther(taskArgs.amount),
      }
    );
  });
