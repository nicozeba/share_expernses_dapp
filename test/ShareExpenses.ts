import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ShareExpenses Unit Tests", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {
    // Contracts are deployed using the first signer/account by default
    const accounts = await ethers.getSigners();

    const ShareExpenses = await ethers.getContractFactory("ShareExpenses");
    const shareExpenses = await ShareExpenses.deploy();

    const amountPerUser = ethers.utils.parseEther("1");
    const amountOfUsers = 2;

    return { shareExpenses, accounts, amountPerUser, amountOfUsers };
  }

  describe("Deployment", function () {
    it("Should have 0 balance contract", async function () {
      const { shareExpenses } = await loadFixture(deployContract);

      expect(await shareExpenses.getBalance()).to.equal(0);
    });
  });

  describe("createDepositAccount", function () {
    describe("Events", function () {
      it("Should emit an event when Deposit Account is created", async function () {
        var { shareExpenses, accounts, amountPerUser, amountOfUsers } =
          await loadFixture(deployContract);

        const shareExpensesAux = await ethers.getContractAt(
          "ShareExpenses",
          shareExpenses.address,
          accounts[1]
        );

        await expect(
          shareExpensesAux.createDepositAccount(amountPerUser, amountOfUsers)
        )
          .to.emit(shareExpensesAux, "DepositAccountCreated")
          .withArgs(accounts[1].address, amountPerUser, amountOfUsers);
      });
    });

    describe("Validators", function () {
      it("Revert because Deposit Account already exists", async function () {
        const { shareExpenses, accounts, amountPerUser, amountOfUsers } =
          await loadFixture(deployContract);

        const shareExpensesAux = await ethers.getContractAt(
          "ShareExpenses",
          shareExpenses.address,
          accounts[1]
        );

        await shareExpensesAux.createDepositAccount(
          amountPerUser,
          amountOfUsers
        );

        await expect(
          shareExpensesAux.createDepositAccount(amountPerUser, amountOfUsers)
        ).to.be.revertedWithCustomError(
          shareExpensesAux,
          "ShareExpenses__DepositAccountAlreadyExists"
        );
      });
    });
  });

  describe("payToDepositAccount", function () {
    describe("Events", function () {
      it("Should emit an event when the ethers transfer is done to Deposit Account", async function () {
        const { shareExpenses, accounts, amountPerUser, amountOfUsers } =
          await loadFixture(deployContract);

        var shareExpensesAux = await ethers.getContractAt(
          "ShareExpenses",
          shareExpenses.address,
          accounts[1]
        );

        await shareExpensesAux.createDepositAccount(
          amountPerUser,
          amountOfUsers
        );

        shareExpensesAux = await ethers.getContractAt(
          "ShareExpenses",
          shareExpenses.address,
          accounts[2]
        );

        await expect(
          shareExpensesAux.payToDepositAccount(
            accounts[1].address,
            amountPerUser,
            {
              value: amountPerUser,
            }
          )
        )
          .to.emit(shareExpensesAux, "DepositAccountPayed")
          .withArgs(accounts[2].address, accounts[1].address, amountPerUser);
      });
    });

    describe("Validators", function () {
      it("Revert because Deposit Account not exists", async function () {
        const { shareExpenses, accounts, amountPerUser } = await loadFixture(
          deployContract
        );

        const shareExpensesAux = await ethers.getContractAt(
          "ShareExpenses",
          shareExpenses.address,
          accounts[2]
        );

        await expect(
          shareExpensesAux.payToDepositAccount(
            accounts[1].address,
            amountPerUser,
            {
              value: amountPerUser,
            }
          )
        ).to.be.revertedWithCustomError(
          shareExpensesAux,
          "ShareExpenses__DepositAccountNotExists"
        );
      });
    });
  });

  describe("retriveDepositAccountMoney", function () {
    describe("Events", function () {
      it("Should emit an event when the finish the use of the Deposit Account", async function () {
        const { shareExpenses, accounts, amountPerUser, amountOfUsers } =
          await loadFixture(deployContract);

        var shareExpensesAux = await ethers.getContractAt(
          "ShareExpenses",
          shareExpenses.address,
          accounts[1]
        );

        await shareExpensesAux.createDepositAccount(
          amountPerUser,
          amountOfUsers
        );

        shareExpensesAux = await ethers.getContractAt(
          "ShareExpenses",
          shareExpenses.address,
          accounts[2]
        );

        await shareExpensesAux.payToDepositAccount(
          accounts[1].address,
          amountPerUser,
          {
            value: amountPerUser,
          }
        );

        shareExpensesAux = await ethers.getContractAt(
          "ShareExpenses",
          shareExpenses.address,
          accounts[3]
        );

        await shareExpensesAux.payToDepositAccount(
          accounts[1].address,
          amountPerUser,
          {
            value: amountPerUser,
          }
        );

        shareExpensesAux = await ethers.getContractAt(
          "ShareExpenses",
          shareExpenses.address,
          accounts[1]
        );

        await expect(shareExpensesAux.retriveDepositAccountMoney())
          .to.emit(shareExpensesAux, "DepositAccountClosed")
          .withArgs(accounts[1].address);
      });
    });

    describe("Validators", function () {
      it("Revert because Deposit Account not exists", async function () {
        const { shareExpenses, accounts } = await loadFixture(deployContract);

        const shareExpensesAux = await ethers.getContractAt(
          "ShareExpenses",
          shareExpenses.address,
          accounts[1]
        );

        await expect(
          shareExpensesAux.retriveDepositAccountMoney()
        ).to.be.revertedWithCustomError(
          shareExpensesAux,
          "ShareExpenses__DepositAccountNotExists"
        );
      });

      it("Revert because is not all users pays in the Deposit Account", async function () {
        const { shareExpenses, accounts, amountPerUser, amountOfUsers } =
          await loadFixture(deployContract);

        const shareExpensesAux = await ethers.getContractAt(
          "ShareExpenses",
          shareExpenses.address,
          accounts[1]
        );

        await shareExpensesAux.createDepositAccount(
          amountPerUser,
          amountOfUsers
        );

        await expect(
          shareExpensesAux.retriveDepositAccountMoney()
        ).to.be.revertedWithCustomError(
          shareExpensesAux,
          "ShareExpenses__NotAllUsersPays"
        );
      });
    });
  });
});
