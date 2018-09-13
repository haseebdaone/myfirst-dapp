import web3 from './web3';

const address = '0x02ca4bfd64a8370282a21c6d00e701f1c9f2a520';

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_hello",
				"type": "string"
			}
		],
		"name": "changeText",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "hello",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

export default new web3.eth.Contract(abi, address);
