module.exports = async () => {
  try {
    require('dotenv').config();

    let networkId;

    if (process.argv[5] == 'mainnet') {
      networkId = '1';
    } else if (process.argv[5] == 'ropsten') {
      networkId = '3';
    } else if (process.argv[5] == 'rinkeby') {
      networkId = '4';
    } else {
      throw new Error('Invalid Network ID!');
    }

    const { CONSTANTS } = require('../../constants');
    const PhoneToken = artifacts.require('PhoneToken');

    const phoneTokenInstance = await PhoneToken.at(
      CONSTANTS[networkId].contracts.phoneToken.address
    );

    let receipt = await phoneTokenInstance.mint(
      CONSTANTS[networkId].contracts.sale.address,
      CONSTANTS[networkId].saleAmount
    );

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
