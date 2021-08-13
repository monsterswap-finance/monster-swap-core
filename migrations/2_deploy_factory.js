const MonsterFactory = artifacts.require('MonsterFactory')

module.exports = function(deployer, network, accounts) {
  let currentAccount = accounts[0]
  deployer.deploy(MonsterFactory, currentAccount, { from: currentAccount })
}
