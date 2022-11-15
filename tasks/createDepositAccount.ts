import { task, types } from "hardhat/config";

task(
  "createDepositAccount",
  "Create a Deposit Account associated to a Hardhat User"
)
  .addParam(
    "userindex",
    "Index of the user into hardhat users array",
    1,
    types.int
  )
  .addParam("amount", "Amount of Ehters per Person", 1, types.string)
  .addParam(
    "persons",
    "Amount of Persons into the DepositAccount",
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

    await shareExpenses.createDepositAccount(
      hre.ethers.utils.parseEther(taskArgs.amount),
      taskArgs.persons
    );
  });
