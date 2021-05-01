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

	it('default product', async () => {
		let p0 = await this.app.products(0);
		console.log("Creating prod 0 ");
		console.log(p0);

		console.log("Creating prod 1 ");
		let x = await this.app.createProduct("Prod 1", "Model 1");
		let listx = {id: x.logs[0].args.id.toNumber(), prevOwners: x.logs[0].args.prevOwners}
		console.log(listx);
		// console.log(x);

		console.log("Created prod 1 ");
		let p1 = await this.app.products(1);

		console.log("Querying owners list of prod 0, 1");
		let o0 = await this.app.getOwners(0);
		let o1 = await this.app.getOwners(1);
		let list0 = {id: o0.logs[0].args.id.toNumber(), prevOwners: o0.logs[0].args.prevOwners}
		let list1 = {id: o1.logs[0].args.id.toNumber(), prevOwners: o1.logs[0].args.prevOwners}
		console.log(list0);
		console.log(list1);


		let update = await this.app.updateOwnership(0, x.receipt.to);
		// console.log(update);
		console.log("Updated prod 0 details");
		p0 = await this.app.products(0);
		console.log(p0);

		console.log("Querying owners list of prod 0");
		o0 = await this.app.getOwners(0);
		list0 = {id: o0.logs[0].args.id.toNumber(), prevOwners: o0.logs[0].args.prevOwners}
		console.log(list0);
	})

})
