const { create } = require('ipfs-http-client');
const client = create({ url: process.env.IPFS_URL });

const uploadToIPFS = async (filePath) => {
  try {
    const file = await client.add(filePath);
    return file.cid.toString();
  } catch (error) {
    throw new Error('Error uploading to IPFS');
  }
};

module.exports = { uploadToIPFS };
