// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CampusGo {
    address public owner;
    address public feeReceiver;
    uint256 public transactionFeePercentage; // Fee percentage in basis points (0.5% = 50)

    struct Transaction {
        uint256 amount;
        string recipientName;
        string recipientUsername;
        address payable recipientAddress;
        address senderAddress;
        string senderUsername;
        string senderName;
        string dateTime;
        string transactionType;
        string description;
        uint256 transactionFee;
        string uniqueId;
    }

    Transaction[] public transactions;

    mapping(string => Transaction[]) transactionsByUsername;

    event TransactionRecorded(
        string senderUsername,
        uint256 timestamp,
        uint256 amount,
        string transactionType
    );

    constructor(address _feeReceiver) {
        owner = msg.sender;
        feeReceiver = _feeReceiver;
        transactionFeePercentage = 50; // Default transaction fee percentage: 0.5%
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only contract owner can call this function"
        );
        _;
    }

    function recordTransaction(
        string memory _recipientName,
        string memory _recipientUsername,
        address payable _recipientAddress,
        string memory _senderUsername,
        string memory _senderName,
        string memory _dateTime,
        string memory _transactionType,
        string memory _description,
        string memory _uniqueId
    ) external payable {
        uint256 transactionFee = (msg.value * transactionFeePercentage) / 10000;
        require(msg.value >= transactionFee, "Insufficient transaction fee");
        uint256 amountAfterFee = msg.value - transactionFee;
        _recipientAddress.transfer(amountAfterFee);
        payable(feeReceiver).transfer(transactionFee);
        Transaction memory newTransaction = Transaction({
            amount: msg.value,
            recipientName: _recipientName,
            recipientUsername: _recipientUsername,
            recipientAddress: _recipientAddress,
            senderAddress: msg.sender,
            senderUsername: _senderUsername,
            senderName: _senderName,
            dateTime: _dateTime,
            transactionType: _transactionType,
            description: _description,
            transactionFee: transactionFee,
            uniqueId: _uniqueId
        });
        transactions.push(newTransaction);
        transactionsByUsername[_senderUsername].push(newTransaction);
        transactionsByUsername[_recipientUsername].push(newTransaction);
        emit TransactionRecorded(
            _senderUsername,
            block.timestamp,
            msg.value,
            _transactionType
        );
    }

    function getAllTransactions() external view returns (Transaction[] memory) {
        return transactions;
    }

    function getAllTransactionsByUsername(string memory _username)
        external
        view
        returns (Transaction[] memory)
    {
        return transactionsByUsername[_username];
    }

    function setTransactionFeePercentage(uint8 _newFeePercentage)
        external
        onlyOwner
    {
        require(_newFeePercentage <= 100, "Fee percentage cannot exceed 1%");
        transactionFeePercentage = _newFeePercentage;
    }

    function setFeeReceiver(address _newFeeReceiver) external onlyOwner {
        feeReceiver = _newFeeReceiver;
    }

}
