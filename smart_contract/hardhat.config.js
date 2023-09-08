//https://eth-sepolia.g.alchemy.com/v2/qFseLnd0fNQ8L3aw4e4nSpTLHU5nKN20

require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url:'https://eth-sepolia.g.alchemy.com/v2/qFseLnd0fNQ8L3aw4e4nSpTLHU5nKN20',
      accounts: ['a2875cd1a411b24a143ce616b804b0169d77310add87f969bcc9c48db65a1c40']
    }
  }
};
