import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  // const ShareExpenses = await ethers.getContractFactory("ShareExpenses");

  // console.log(ethers.utils.parseEther("0.00000000000000001"));

  // var shareExpenses = ShareExpenses.attach(accounts[2].address);
  var shareExpenses = await ethers.getContractAt(
    "ShareExpenses",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    accounts[2]
  );
  await shareExpenses.payToDepositAccount(
    accounts[1].address,
    ethers.utils.parseEther("1"),
    {
      value: ethers.utils.parseEther("1"),
    }
  );

  // shareExpenses = ShareExpenses.attach(accounts[3].address);
  shareExpenses = await ethers.getContractAt(
    "ShareExpenses",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    accounts[3]
  );
  await shareExpenses.payToDepositAccount(
    accounts[1].address,
    ethers.utils.parseEther("1"),
    {
      value: ethers.utils.parseEther("1"),
    }
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
