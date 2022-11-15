import { task, types } from "hardhat/config";

task("showUserInfo", "Displays information about a Hardhat User")
  .addParam(
    "userindex",
    "Index of the user into hardhat users array",
    1,
    types.int
  )
  .setAction(async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    const user = accounts[taskArgs.userindex];
    console.log(
      `User ${taskArgs.userindex}: ${hre.ethers.utils.formatEther(
        await user.getBalance()
      )}`
    );
  });
