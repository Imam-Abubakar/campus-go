export const ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_feeReceiver",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "senderUsername",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "transactionType",
				"type": "string"
			}
		],
		"name": "TransactionRecorded",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "feeReceiver",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllTransactions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "recipientName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "recipientUsername",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "recipientAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "senderAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "senderUsername",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "senderName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dateTime",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "transactionType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "transactionFee",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "uniqueId",
						"type": "string"
					}
				],
				"internalType": "struct CampusGo.Transaction[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			}
		],
		"name": "getAllTransactionsByUsername",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "recipientName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "recipientUsername",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "recipientAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "senderAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "senderUsername",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "senderName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dateTime",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "transactionType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "transactionFee",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "uniqueId",
						"type": "string"
					}
				],
				"internalType": "struct CampusGo.Transaction[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_recipientName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_recipientUsername",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "_recipientAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_senderUsername",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_senderName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dateTime",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_transactionType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_uniqueId",
				"type": "string"
			}
		],
		"name": "recordTransaction",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newFeeReceiver",
				"type": "address"
			}
		],
		"name": "setFeeReceiver",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_newFeePercentage",
				"type": "uint8"
			}
		],
		"name": "setTransactionFeePercentage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "transactionFeePercentage",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "transactions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "recipientName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "recipientUsername",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "recipientAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "senderAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "senderUsername",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "senderName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dateTime",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "transactionType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "transactionFee",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "uniqueId",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];