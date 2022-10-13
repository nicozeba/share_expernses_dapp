import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  console.log(
    ` Account 0: ${ethers.utils.formatEther(await accounts[0].getBalance())}`
  );
  console.log(
    ` Account 1: ${ethers.utils.formatEther(await accounts[1].getBalance())}`
  );
  console.log(
    ` Account 2: ${ethers.utils.formatEther(await accounts[2].getBalance())}`
  );
  console.log(
    ` Account 3: ${ethers.utils.formatEther(await accounts[3].getBalance())}`
  );

  // const ShareExpenses = await ethers.getContractFactory("ShareExpenses");
  // const shareExpenses = await ShareExpenses.attach(accounts[0].address);
  var shareExpenses = await ethers.getContractAt(
    "ShareExpenses",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    accounts[0]
  );
  console.log(
    ` Contract: ${ethers.utils.formatEther(await shareExpenses.getBalance())}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
