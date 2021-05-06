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
		let { name, address } = this.state
		await this.props.createManufacturer(name, address)
	}
	

	render() {
		return (
			<div id="content" className="mt-3">
				<div className="card mb-4" >
					<div className="card-body">
						<h5 className="text-center">Add a manufacturer</h5>
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