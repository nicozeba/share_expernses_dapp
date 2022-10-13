import { ethers } from "hardhat";

async function main() {
  const ShareExpenses = await ethers.getContractFactory("ShareExpenses");
  const shareExpenses = await ShareExpenses.deploy();

  await shareExpenses.deployed();

  console.log(
    `ShareExpenses Contract was deployed with address ${shareExpenses.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
