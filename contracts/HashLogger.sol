pragma solidity ^0.4.4;

/* registy and event emitter */

contract HashLogger {

	address public owner = msg.sender;
	mapping (address => bool) users;

	event AddHash(bytes32 _hash);
	event RemoveHash(bytes32 _hash);

	modifier onlyOwner {
		if (msg.sender != owner) throw;
		_;
	}

	modifier onlyUser {
		if (!users[msg.sender]) throw;
		_;
	}

	function setUser(address _user, bool _status) onlyOwner {
		users[_user] = _status;
	}

	function getUser(address addr) returns (bool) {
		return users[addr];
	}

	function addHash(bytes32 _hash) onlyUser {
		AddHash(_hash);
	}

	function removeHash(bytes32 _hash) onlyUser {
		RemoveHash(_hash);
	}


	function kill() onlyOwner {
		suicide(owner);
	}
}
