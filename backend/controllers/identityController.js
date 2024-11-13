const { verifyIdentity } = require('../services/blockchainService');

const verifyUserIdentity = async (req, res) => {
  const { userAddress, data } = req.body;

  try {
    const result = await verifyIdentity(userAddress, data);
    res.status(200).json({ message: 'Identity verified', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying identity' });
  }
};

module.exports = { verifyUserIdentity };
