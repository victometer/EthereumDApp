const hre = require("hardhat");

const main = async () => {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const transactionsContract = await hre.ethers.deployContract('Transactions');
  // const transactionsContract = await transactionsFactory.deploy();
  console.log('Got contract Factory!')

  await transactionsContract.waitForDeployment();
  console.log('Contract Ready for Deployment!')
  const contrAddress = await transactionsContract.getAddress()
  console.log('Transactions deployed to:', contrAddress);
}

const runMain = async() => {
  try {
    await main();
    process.exit(0);
  } catch(error){
    console.error(error);
    process.exit(1);
  }
}
runMain();
