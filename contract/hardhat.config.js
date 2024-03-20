require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();

//const BITFINITY_PRIVATE_KEY = process.env.BITFINITY_PRIVATE_KEY;
const BITFINITY_PRIVATE_KEY = "af2774d38cb132c53226c462a1120f7044fdf50e80d7ea1def8978439477f4b5";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    testnet_bitfinity: {
      url: 'https://testnet.bitfinity.network',
      accounts: [`0x${BITFINITY_PRIVATE_KEY}`],
    },
  }
};
