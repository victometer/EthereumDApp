

const main = async () => {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const Transactions = await hre.ethers.getContractFactory('Transactions');
  const transactions = await Transactions.deploy();

  await transactions.deployed();
  console.log('Transactions deployed to:', transactions.address);
}

const runMain = async() => {
  try {
    await main();
    ProcessingInstruction.exit(0);
  } catch(error){
    console.error(error);
    ProcessingInstruction.exit(1);
  }
}
runMain();