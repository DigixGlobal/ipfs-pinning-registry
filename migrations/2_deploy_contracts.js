var HashLogger = artifacts.require("./HashLogger.sol");

module.exports = function(deployer) {
  deployer.deploy(HashLogger);
};
