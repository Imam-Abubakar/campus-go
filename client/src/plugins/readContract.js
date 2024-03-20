import { ethers } from "ethers";
import { ABI } from "../assets/data/ABI";

const contractAddress = "0xc5F8Cb8c9431e1E26B4F1C72e2BeA60D8B2B687F";

const provider = new ethers.providers.JsonRpcProvider(
  "https://testnet.bitfinity.network"
);

const privateKey = "af2774d38cb132c53226c462a1120f7044fdf50e80d7ea1def8978439477f4b5"; // Replace with the private key of your Ethereum account
const wallet = new ethers.Wallet(privateKey, provider);
const signer = wallet.connect(provider);

//const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, ABI, signer);

const ReadContract = {
  recordTransaction: async function (
    privateKey,
    recipientName,
    recipientUsername,
    recipientAddress,
    senderUsername,
    senderName,
    dateTime,
    transactionType,
    description,
    uniqueId,
    value
  ) {
    try {
      // Create a wallet instance from the provided private key
      const wallet = new ethers.Wallet(privateKey, provider);

      // Connect a signer to the contract
      const connectedContract = contract.connect(wallet);

      // Convert value to wei
      const weiValue = ethers.utils.parseEther(value);

      // Construct transaction data
      const txData = [
        recipientName,
        recipientUsername,
        recipientAddress,
        senderUsername,
        senderName,
        dateTime,
        transactionType,
        description,
        uniqueId
      ];

      // Sign the transaction
      const signedTransaction = await wallet.sendTransaction({
        to: contractAddress,
        value: weiValue,
        data: connectedContract.interface.encodeFunctionData(
          "recordTransaction",
          txData
        ),
      });

      console.log("Transaction successful:", signedTransaction);
      return signedTransaction;
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    }
  },

  getAllTransactionsByUsername: async function (username) {
    try {
      return await contract.getAllTransactionsByUsername(username);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      throw error;
    }
  },

  getAllTransactionsByAddress: async function (address) {
    try {
      return await contract.getAllTransactionsByAddress(address);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      throw error;
    }
  },

  getAllTransactions: async function () {
    try {
      return await contract.getAllTransactions();
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      throw error;
    }
  },

  getTransactionsByRecipient: async function (address) {
    try {
      return await contract.getTransactionsByRecipient(address);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      throw error;
    }
  },

  getAllTransactionsByUsername: async function (username) {
    try {
      return await contract.getAllTransactionsByUsername(username);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      throw error;
    }
  },

  setTransactionFeePercentage: async function (newFeePercentage) {
    try {
      const transaction = await contract.setTransactionFeePercentage(
        newFeePercentage
      );
      await transaction.wait();
      console.log("Transaction successful:", transaction);
      return transaction.hash;
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    }
  },

  setFeeReceiver: async function (newFeeReceiver) {
    try {
      const transaction = await contract.setFeeReceiver(newFeeReceiver);
      await transaction.wait();
      console.log("Transaction successful:", transaction);
      return transaction.hash;
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    }
  },

  getBFTBalance: async function (walletAddress) {
    try {
      const balance = await provider.getBalance(walletAddress);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.error("Failed to fetch BFT balance:", error);
      throw error;
    }
  },
};

export default ReadContract;
