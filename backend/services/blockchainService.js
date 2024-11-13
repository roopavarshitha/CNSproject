const Web3 = require('web3');

// Initialize web3 with Infura URL (v1.x onwards)
const web3 = new Web3(process.env.INFURA_URL);  // Infura URL directly

const contractABI = require('../abis/identityContractABI.json');  // ABI of your contract
const contractAddress = process.env.CONTRACT_ADDRESS;  // Contract address from .env

// Create the contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Verify identity function
const verifyIdentity = async (userAddress, data) => {
  try {
    // Send transaction to the contract's verifyIdentity function
    const result = await contract.methods.verifyIdentity(userAddress, data).send({ from: userAddress });
    return result;
  } catch (error) {
    throw new Error('Error interacting with the smart contract');
  }
};

module.exports = { verifyIdentity };
