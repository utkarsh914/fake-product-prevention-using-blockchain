pragma solidity ^0.5.0;

contract MyApp {

	uint n = 0;

	struct Product {
		bool exists;
		uint id;
		string name;
		string model;
		address curOwner;
	}

	mapping(uint => Product) public products;
	mapping(uint => address[]) public prevOwners;

	event ProductCreated(uint id, address[] prevOwners);
	event PrevOwnersList(uint id, address[] prevOwners);
	event OwnershipUpdated(uint id, address newOwner);

	constructor() public {
		createProduct("Demo product", "some model");
	}

	function createProduct(string memory _name, string memory _model) public {
		Product storage p = products[n];

		p.exists = true;
		p.id = n;
		p.name = _name;
		p.model = _model;
		p.curOwner = msg.sender;
		address[] storage prevs = prevOwners[n];
		// prevs.push(msg.sender);

		n++;
		emit ProductCreated(n-1, prevs);
	}

	function getOwners(uint _id) public {
		emit PrevOwnersList(_id, prevOwners[_id]);
	}

	function isProductValid(uint _id) public view returns(bool) {
		return products[_id].exists;
	}

	function updateOwnership(uint _id, address _newOwner) public {
		Product storage p = products[_id];
		require(p.curOwner == msg.sender, "Not authorized");
		address[] storage prevs = prevOwners[_id];
		prevs.push(p.curOwner);
		p.curOwner = _newOwner;

		emit OwnershipUpdated(_id, _newOwner);
	}

}