import React, { Component } from 'react'

class ProductOwnerList extends Component {

	constructor(props) {
		super(props)
		this.state = { productId: '', owners:[] }
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const owners = await this.props.searchProduct(this.state.productId)
		console.log(owners)
		this.setState({ owners })
	}

	renderOwnerList = () => {
		const { owners } = this.state
		return owners.map((owner, i) => {
			return <li key={i}>{owner}</li>
		})
	}


	render() {
		return (
			<div id="content" className="mt-3">
				<div className="card mb-4" >
					<div className="card-body">
						<h5 className="text-center"><i>Search a product</i></h5>

						<form className="my-3" onSubmit={this.handleSubmit}>
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Enter product ID"
									name="productId"
									value={this.state.productId} onChange={this.handleChange}
								/>
							</div>
							<button type="submit" className="btn btn-primary btn-block">Search</button>
						</form>

						<div>
							<ul> {this.renderOwnerList()} </ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductOwnerList;