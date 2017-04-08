pragma solidity ^0.4.4;

/* registy and event emitter */

contract HashLogger {

	address public owner = msg.sender;
	mapping (address => bool) users;

	event UpdateHash(bytes32 _hash, bool _added);

	modifier onlyOwner {
		if (msg.sender != owner) throw;
		_;
	}

	modifier onlyUser {
		if (users[msg.sender] != true) throw;
		_;
	}

	function setUser(address _user, bool _status) onlyOwner {
		users[_user] = _status;
	}

	function getUser(address addr) returns (bool) {
		return users[addr];
	}

	function setHash(bytes32 _hash, bool _added) onlyUser {
		UpdateHash(_hash, _added);
	}

	function kill() onlyOwner {
		suicide(owner);
	}
}
