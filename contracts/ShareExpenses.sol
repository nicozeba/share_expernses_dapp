// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ShareExpenses {
  // Constructor
  constructor(){}

  ///Events
  event DepositAccountCreated(
    address indexed creator,
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

  // Errors
  error ShareExpenses__DepositAccountAlreadyExists(address);
  error ShareExpenses__DepositAccountNotExists(address);
  error ShareExpenses__NotAllUsersPays();  

  // Structures and variables
  struct DepositAccount {
    uint256 balance;
    uint256 amountPerPeople;
    uint256 expectedAmountOfPeople;
    uint256 realAmountOfPeople;
  }

  mapping(address => DepositAccount) private _depositAccountList;

  // Modifiers
  // Use to know if a Deposit Account exists, if not exists continue, if exists throw an error
  modifier depositAccountAlreadyExists(address depositAccountAddress) {
    // If value is 0, is because the Deposit Account is not created
    if (_depositAccountList[depositAccountAddress].amountPerPeople > 0) {
      revert ShareExpenses__DepositAccountAlreadyExists(depositAccountAddress);
    }
    _;
  }

  // Use to know if a Deposit Account not exists to continue, if exists continue, if not exists throw an error
  modifier depositAccountNotExists(address depositAccountAddress) {
    // If value is 0, is because the Deposit Account is not created
    if (_depositAccountList[depositAccountAddress].amountPerPeople == 0) {
      revert ShareExpenses__DepositAccountNotExists(depositAccountAddress);
    }
    _;
  }

  // check if the amount of expected users pays the debt
  modifier notAllUsersPays(address depositAccountAddress){
    if (_depositAccountList[depositAccountAddress].realAmountOfPeople < _depositAccountList[depositAccountAddress].expectedAmountOfPeople) {
      revert ShareExpenses__NotAllUsersPays();
    }
    _;    
  }

  // Smart Contract Functios
  function createDepositAccount(
    // address addrresToDeposit,
    uint256 amountPerPeople,
    uint256 expectedAmountOfPeople
  ) external depositAccountAlreadyExists(msg.sender) {
    _depositAccountList[msg.sender] = DepositAccount(0, amountPerPeople, expectedAmountOfPeople, 0);
    emit DepositAccountCreated(msg.sender, amountPerPeople, expectedAmountOfPeople);
  }

  function payToDepositAccount(
    address addrresToDeposit,
    uint256 amount
  ) external payable depositAccountNotExists(addrresToDeposit){
    _depositAccountList[addrresToDeposit].realAmountOfPeople += 1;
    _depositAccountList[addrresToDeposit].balance += amount;
    emit DepositAccountPayed(msg.sender, addrresToDeposit, amount);
  }

  function retriveDepositAccountMoney() external depositAccountNotExists(msg.sender) notAllUsersPays(msg.sender){
    payable(msg.sender).transfer(_depositAccountList[msg.sender].balance);
    delete (_depositAccountList[msg.sender]);
    emit DepositAccountClosed(msg.sender);    
  }

  function getBalance() external view returns(uint256) {
    return address(this).balance;
  }
}