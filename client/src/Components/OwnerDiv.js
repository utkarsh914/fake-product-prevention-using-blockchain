import React, { Component } from 'react'

class OwnerDiv extends Component {

	constructor(props) {
		super(props)
		this.state = { name: "", address: "" }
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleCreateManufacturer = async (e) => {
		e.preventDefault()
		const { account, contract } = this.props
		const { name, address } = this.state
		try {
			await contract.methods.createManufacturer(name, address).send({ from: account })
			window.alert(`Created a manufacturer\n${name}\n${address}`)
		}
		catch (e) {
			window.alert("error occured")
			console.log(e)
		}
	}
	

	render() {
		return (
			<div id="content" className="mt-3">
				<div className="card mb-4" >
					<div className="card-body">
						<h5 className="text-center"><i>Add a manufacturer</i></h5>
						<form className="my-3" onSubmit={this.handleCreateManufacturer}>
							
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Enter name"
									name="name"
									value={this.state.name} onChange={this.handleChange}
								/>
							</div>

							<div className="form-group">
								<input type="text" className="form-control" placeholder="Enter address"
									name="address"
									value={this.state.address} onChange={this.handleChange}
								/>
							</div>

							<button type="submit" className="btn btn-primary btn-block">Add</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default OwnerDiv;