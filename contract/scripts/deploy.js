require("dotenv").config();
const hre = require("hardhat");

const BITFINITY_PRIVATE_KEY = 

async function main() {
  const provider = hre.ethers.provider;
  const deployerWallet = new hre.ethers.Wallet(BITFINITY_PRIVATE_KEY, provider);

  console.log("Deploying contracts with the account:", deployerWallet.address);

  const balance = await provider.getBalance(deployerWallet.address);
  console.log("Account balance:", balance.toString());

  const nonce = await provider.getTransactionCount(deployerWallet.address);
  console.log("Nonce:", nonce);

  const CampusGo = await hre.ethers.getContractFactory("CampusGo");

  const deployTransaction = await CampusGo.connect(deployerWallet).deploy(
    "0x8EE34791BE5dCbB27401C1B69A7600A6CD57cc7F"
  );

  await deployTransaction.waitForDeployment();
  console.log("CampusGo Contract deployed to:", deployTransaction.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
