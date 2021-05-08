import React, { Component } from 'react'

class ManufacturerDiv extends Component {

	constructor(props) {
		super(props)
		this.state = { name: "", model: "" }
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleCreateProduct = async (e) => {
		e.preventDefault()
		let { name, model } = this.state
		await this.props.createProduct(name, model)
	}
	

	render() {
		return (
			<div id="content" className="mt-3">
				<div className="card mb-4" >
					<div className="card-body">
						<h5 className="text-center"><i>Add a product</i></h5>
						<form className="my-3" onSubmit={this.handleCreateProduct}>

							<div className="form-group">
								<input type="text" className="form-control" placeholder="Enter name"
									name="name"
									value={this.state.name} onChange={this.handleChange}
								/>
							</div>

							<div className="form-group">
								<input type="text" className="form-control" placeholder="Enter model"
									name="model"
									value={this.state.model} onChange={this.handleChange}
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

export default ManufacturerDiv;