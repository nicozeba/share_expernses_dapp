// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ShareExpenses {
  // Constructor
  constructor(){}

  ///Events

  // para que son esos "indexed"
  event DepositAccountCreated(
    address indexed creator,
    // address indexed addrresToDeposit,
    uint256 amountPerPeople,
    uint256 expectedAmountOfPeople
  );

  event DepositAccountPayed(
    address indexed payer,
    address indexed accountPayed,
    uint256 amount
  );

  event DepositAccountClosed(
    address indexed creator
  );

  // Structures and variables
  struct DepositAccount {
    // address addrresToDeposit;
    // address[] depositedUsers;
    uint256 balance;
    uint256 amountPerPeople;
    uint256 expectedAmountOfPeople;
    uint256 realAmountOfPeople;
  }

  mapping(address => DepositAccount) private _depositAccountList;

  // Validators functions

  // 1 - Checks if the msg.sender just create an DepositAccount
  // 2- Checks if the DepositAccout associated exists
  // 3- Only the creator can invoke retiveDepositAccountMoney
  // 4- Checks if all the users pay the deposit to be closed

  // Smart Contract Functios
  // Needs to check 1
  function createDepositAccount(
    // address addrresToDeposit,
    uint256 amountPerPeople,
    uint256 expectedAmountOfPeople
  ) external {
    _depositAccountList[msg.sender] = DepositAccount( 0, amountPerPeople, expectedAmountOfPeople, 0);
    emit DepositAccountCreated(msg.sender, amountPerPeople, expectedAmountOfPeople);
  }

  // Needs to check 2
  function payToDepositAccount(
    address addrresToDeposit,
    uint256 amount
  ) external payable {
    _depositAccountList[addrresToDeposit].realAmountOfPeople += 1;
    _depositAccountList[addrresToDeposit].balance += amount;
    emit DepositAccountPayed(msg.sender, addrresToDeposit, amount);
  }

  // Needs to check 2, 3 and 4
  function retriveDepositAccountMoney() external {
    payable(msg.sender).transfer(_depositAccountList[msg.sender].balance);
    delete (_depositAccountList[msg.sender]);
    emit DepositAccountClosed(msg.sender);    
  }

  function getBalance() external view returns(uint256){
    return address(this).balance;
  }
}