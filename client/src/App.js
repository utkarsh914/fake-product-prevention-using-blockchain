import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import "./App.css";
import MyApp from "./contracts/MyApp.json";

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
      this.setState({ web3, account, contract: instance }, this.runExample);
    }
    catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
      console.error(error);
    }
  };



  runExample = async () => {
    const { account, contract } = this.state;

    // creates a manufacturer
    await contract.methods
      .createManufacturer("Manufacturer #0", "0x2176ea15CD29352b5015CD57AA3e3C80e80B8240")
      .send({ from: account });

    // Get the value omanufacturer from the contract to prove it worked.
    const response = await contract.methods
      .manufacturers("0x2176ea15CD29352b5015CD57AA3e3C80e80B8240").call();

    console.log(response);

    // Update state with the result.
    this.setState({ storageValue: response });
  };



  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <div>The stored value is: {this.state.storageValue._address}</div>
      </div>
    );
  }
}

export default App;
