require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.1",
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/dkKgVATKotWLOSDjUSVPdjtOfKEs7aq6',
      accounts: ['915b480d15159944bc358662296b74bb9f41684a2b439067170a6e71345f40d5']
    }
  }
};
