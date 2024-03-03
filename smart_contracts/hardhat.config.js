require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.1",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/gSxcw_uO2h71PDGWTt52Ffg-F-Rjemob',
      accounts: ['915b480d15159944bc358662296b74bb9f41684a2b439067170a6e71345f40d5']
    }
  }
};
