const HashedTimelockERC20 = artifacts.require('./HashedTimelockERC20.sol')

module.exports = function (deployer) {
  deployer.deploy(HashedTimelockERC20)
}
