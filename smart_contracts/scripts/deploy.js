const { ethers } = require("hardhat")
// import ethers from 'hardhat'

const main = async() => {
  const transactionsFactory = await ethers.getContractFactory("Transfer");
  const transactionsContract = await transactionsFactory.deploy();
  
  await transactionsContract.deployed();
  console.log(`Open transaction on etherscan, https://goerli.etherscan.io/address/${transactionsContract.address}`);
};

const runMain = async() => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();