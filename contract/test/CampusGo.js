const { ethers } = require("hardhat");
const { expect } = require("chai");


describe("CampusGo", function () {
  let tokenTransfer;
  let owner;
  let feeReceiver;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, feeReceiver, user1, user2] = await ethers.getSigners();

    const TokenTransfer = await ethers.getContractFactory("CampusGo");
    tokenTransfer = await TokenTransfer.deploy(feeReceiver.address);
  });

  describe("recordTransaction", function () {
    it("Should record a transaction and transfer tokens to the recipient", async function () {
      const amount = 100;
      const transactionType = "Ride payment";
      const description = "Sample description";
      const uniqueId = "abc123";

      // Send tokens from user1 to user2
      try {
        await tokenTransfer.recordTransaction(
            "Recipient Name",
            "recipientUsername",
            user2.address,
            "Sender Username",
            "Sender Name",
            "2024-03-20T08:00:00Z",
            transactionType,
            description,
            uniqueId,
            { value: amount }
          );
      } catch (error) {
        console.log("ERROR", error);
      }
     
      

      // Check if the transaction is recorded
      const transactions = await tokenTransfer.getTransactionsBySender(user1.address);
      console.log("Transactions:", transactions);
      expect(transactions).to.have.lengthOf(1);
      expect(transactions[0].amount).to.equal(amount);
      expect(transactions[0].recipientAddress).to.equal(user2.address);
      expect(transactions[0].transactionType).to.equal(transactionType);
      expect(transactions[0].description).to.equal(description);
      expect(transactions[0].uniqueId).to.equal(uniqueId);

      // Check if tokens are transferred to the recipient
      const user2BalanceBefore = await ethers.provider.getBalance(user2.address);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for the transaction to be mined
      const user2BalanceAfter = await ethers.provider.getBalance(user2.address);
      expect(user2BalanceAfter.sub(user2BalanceBefore)).to.equal(amount);
    });
  });

});
