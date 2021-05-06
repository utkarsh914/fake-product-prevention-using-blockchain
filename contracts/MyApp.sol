pragma solidity ^0.5.0;

contract MyApp {

	address public owner;
	// initialize IDs
	uint manufacturerId = 0;
	uint customerId = 0;
	uint productId = 0;

	// define all custom structs

	struct Manufacturer {
		bool exists;
		string name;
		address _address;
	}

	struct Product {
		bool exists;
		uint id;
		string name;
		string model;
		address manufacturer;
		address curOwner;
	}

	// struct Customer {
	// 	bool exists;
	// 	string name;
	// 	address _address;
	// }


	// mapping(address => Customer) public customers;
	mapping(address => Manufacturer) public manufacturers;
	mapping(uint => Product) public products;
	mapping(uint => address[]) public owners;


	// events to be emitted
	event ManufacturerCreated(string name, address _address);
	event ProductCreated(uint id, address manufacturer);
	event OwnershipUpdated(uint id, address newOwner);


	// constructor function
	constructor() public {
		owner = msg.sender;
	}


	function createManufacturer(string memory _name, address _address) public {
		Manufacturer storage m = manufacturers[_address];
		m.exists = true;
		m.name = _name;
		m._address = _address;
		emit ManufacturerCreated(_name, _address);
	}


	function createProduct(string memory _name, string memory _model) public {
		require(manufacturers[msg.sender].exists == true, "You are not a Manufacturer!");

		Product storage p = products[productId];
		p.exists = true;
		p.id = productId;
		p.name = _name;
		p.model = _model;
		p.manufacturer = msg.sender;
		p.curOwner = msg.sender;

		// push cur owner(manufacturer) to owners array
		owners[productId].push(msg.sender);

		productId++;
		emit ProductCreated(productId-1, msg.sender);
	}


	function getOwners(uint _id) public view returns(address[] memory) {
		return owners[_id];
	}


	function updateOwnership(uint _id, address _newOwner) public {
		Product storage p = products[_id];
		require(p.curOwner == msg.sender, "Not authorized");
		
		p.curOwner = _newOwner;
		owners[_id].push(_newOwner);

		emit OwnershipUpdated(_id, _newOwner);
	}

}