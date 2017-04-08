var HashLogger = artifacts.require("./HashLogger.sol");

const exampleHash = '0x4afeb08a2bf63b8e42f4b67bd92dbf7e4a23f991c7acf0236a9d1c04462db278';

contract('HashLogger', function(accounts) {
  it("set should set the default owner", function() {
    return HashLogger.deployed().then(function(instance) {
      return instance.owner.call();
    }).then((owner) => {
      assert.equal(owner, accounts[0], "deployer account isn't the owner");
    });
  });
  it("should allow owner to set and unset users", function() {
    let registry;
    return HashLogger.deployed().then(function(instance) {
      registry = instance;
      return registry.setUser(accounts[1], true)
    }).then(() => {
      return registry.getUser.call(accounts[1])
    }).then((status) => {
      assert.equal(status, true, "user wasn't registered properly");
    }).then(() => {
      return registry.setUser(accounts[1], false)
    }).then(() => {
      return registry.getUser.call(accounts[1])
    }).then((status) => {
      assert.equal(status, false, "user wasn't registered properly");
    }).then(() => {
      return registry.setUser(accounts[1], true)
    }).then(() => {
      return registry.getUser.call(accounts[1])
    }).then((status) => {
      assert.equal(status, true, "user wasn't registered properly");
    });
  });
  it("should throw when non-owner tries to set or unset address", function() {
    let registry;
    return HashLogger.deployed().then(function(instance) {
      registry = instance;
      return registry.setUser(accounts[2], true, { from: accounts[2] })
    }).then((res) => {
      assert.ifError(res);
    }).catch((err) => {
      assert(err);
    });
  });
  it("should allow registered addreses to trigger AddHash event", function() {
    let registry;
    let event;
    return HashLogger.deployed().then(function(instance) {
      registry = instance;
      event = instance.AddHash((err, result) => assert.equal(result.args._hash, exampleHash));
      return registry.addHash(exampleHash, { from: accounts[1] });
    }).then(() => {
      event.stopWatching();
    });
  });
  it("should allow registered addreses to trigger RemoveHash event", function() {
    let registry;
    let event;
    return HashLogger.deployed().then(function(instance) {
      registry = instance;
      event = instance.RemoveHash((err, result) => assert.equal(result.args._hash, exampleHash));
      return registry.removeHash(exampleHash, { from: accounts[1] });
    }).then(() => {
      event.stopWatching();
    });
  });
  it("should throw when non-user tries to addHash", function() {
    let registry;
    return HashLogger.deployed().then(function(instance) {
      registry = instance;
      return registry.addHash(exampleHash, { from: accounts[2] })
    }).then((res) => {
      assert.ifError(res);
    }).catch((err) => {
      assert(err);
    });
  });
  it("should throw when non-user tries to removeHash", function() {
    let registry;
    return HashLogger.deployed().then(function(instance) {
      registry = instance;
      return registry.removeHash(exampleHash, { from: accounts[2] })
    }).then((res) => {
      assert.ifError(res);
    }).catch((err) => {
      assert(err);
    });
  });
});
