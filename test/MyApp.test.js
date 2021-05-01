const { assert } = require("chai")

let MyApp = artifacts.require('./MyApp.sol')

contract('MyApp', (accounts) => {
	
	before(async () => {
		this.app = await MyApp.deployed()
	})


	it('deploys successfully', async () => {
		let address = await this.app.address
		assert.notEqual(address, 0x0)
		assert.notEqual(address, '')
		assert.notEqual(address, null)
		assert.notEqual(address, undefined)
	})


	it('check if product #0 is created by default', async () => {
		let p0 = await this.app.products(0);
		assert.equal(p0.id.toNumber(), 0);
	})


	it('create a new product (#1)', async () => {
		let p1 = await this.app.createProduct("Prod 1", "Model 1");
		assert.equal(p1.logs[0].args.id.toNumber(), 1);
		this.newAddress = p1.receipt.to
	})


	it('Transfer ownership of product #0 to other address', async () => {
		let p0 = await this.app.products(0);
		const oldAddress = p0.curOwner;
		// apply update
		await this.app.updateOwnership(0, this.newAddress);
		p0 = await this.app.products(0); // fetch updated prod #0
		let prevOwnersList = (await this.app.getOwners(0)).logs[0].args.prevOwners;
		
		assert.equal(p0.curOwner.toLowerCase(), this.newAddress.toLowerCase());
		assert.equal(prevOwnersList[0].toLowerCase(), oldAddress.toLowerCase());
	})


	it('Check if prevOwners list updates correctly', async () => {
		let prevOwnersList_0 = (await this.app.getOwners(0)).logs[0].args.prevOwners;
		let prevOwnersList_1 = (await this.app.getOwners(1)).logs[0].args.prevOwners;
		assert.equal(prevOwnersList_0.length, 1);
		assert.equal(prevOwnersList_1.length, 0);
	})

})
