const MonsterFactory = artifacts.require("MonsterFactory");

module.exports = function (deployer, network, accounts) {
  let currentAccount = accounts[0];
  if (network == "testnet") {
    console.warn("WARNING: Using account[1] for testnet");
    currentAccount = accounts[1];
  }
  deployer.deploy(MonsterFactory, currentAccount, { from: currentAccount });
};
