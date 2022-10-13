import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  // const ShareExpenses = await ethers.getContractFactory("ShareExpenses");

  // const shareExpenses = ShareExpenses.attach(accounts[1].address);
  const shareExpenses = await ethers.getContractAt(
    "ShareExpenses",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    accounts[1]
  );
  await shareExpenses.retriveDepositAccountMoney();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
