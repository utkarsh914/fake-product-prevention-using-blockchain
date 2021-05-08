import React, { Component } from "react";
import getWeb3 from "./Utils/getWeb3";
import "./Stylesheets/App.css";
import MyApp from "./contracts/MyApp.json";
import OwnerDiv from "./Components/OwnerDiv";
import ManufacturerDiv from "./Components/ManufacturerDiv";
import ProductOwnerList from "./Components/ProductOwnerList";
import SellProductDiv from "./Components/SellProductDiv";

class App extends Component {
	
	state = { storageValue: 0, web3: null, account: null, contract: null };

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const [account] = await web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = MyApp.networks[networkId];
			if (!deployedNetwork) {
				window.alert('OOPS...');
				return;
			}
			const instance = new web3.eth.Contract( MyApp.abi, deployedNetwork.address,);

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ web3, account, contract: instance });
		}
		catch (error) {
			// Catch any errors for any of the above operations.
			alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
			console.error(error);
		}
	};



	createManufacturer = async (name, address) => {
		const { account, contract } = this.state
		return contract.methods.createManufacturer(name, address)
			.send({ from: account })
	}


	createProduct = async (name, model) => {
		const { account, contract } = this.state
		return contract.methods.createProduct(name, model)
			.send({ from: account })
	}


	searchProduct = async (productId) => {
		const { account, contract } = this.state
		return contract.methods.getOwners(productId)
			.call({ from: account })
	}


	sellProduct = async (productId, customer) => {
		const { account, contract } = this.state
		return contract.methods.updateOwnership(productId, customer)
			.send({ from: account })
	}



	render() {
		if (!this.state.web3) {
			return <div>Loading...</div>;
		}

		return (
			<div className="container pt-5">

				<h1 className="text-center">AuthentiFi Ethereum</h1>

				<h6 className="text-center"><i>{this.state.account}</i></h6>

				<div className="row mt-5">
					<div className="col-md-6">
						<OwnerDiv
							createManufacturer = {this.createManufacturer}
						/>
					</div>
					<div className="col-md-6">
						<ManufacturerDiv
							createProduct = {this.createProduct}
						/>
					</div>
					<div className="col-md-6">
						<ProductOwnerList
							searchProduct = {this.searchProduct}
						/>
					</div>
					<div className="col-md-6">
						<SellProductDiv
							sellProduct = {this.sellProduct}
						/>
					</div>
				</div>
				
			</div>
		);
	}
}

export default App;
