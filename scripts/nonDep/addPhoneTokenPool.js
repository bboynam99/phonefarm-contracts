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
    const MasterFactory = artifacts.require('MasterFactory');

    const masterFactoryInstance = await MasterFactory.at(
      CONSTANTS[networkId].contracts.masterFactory.address
    );

    let receipt = await masterFactoryInstance.add(
      CONSTANTS[networkId].phoneAllocationPoint,
      CONSTANTS[networkId].contracts.phoneToken.address,
      false
    );

    console.log(receipt);
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
