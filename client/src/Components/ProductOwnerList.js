import React, { Component } from 'react'

class ProductOwnerList extends Component {

	constructor(props) {
		super(props)
		this.state = { productId: '', exists: true, owners:[] }
	}

	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const { account, contract } = this.props
		const { productId } = this.state
		try {
			const p = await contract.methods.getProduct(productId).call({ from: account })
			console.log(p)
			this.setState({ exists: p.exists, owners: p.owners })
		}
		catch (e) {
			console.log(e)
			window.alert("Error occured!")
		}
	}

	renderOwnerList = () => {
		const { owners } = this.state

		// if (owners.length === 0) {
		// 	return <p>Invalid product ID</p>
		// }

		return owners.map((owner, i) => {
			return <li key={i}>{owner}</li>
		})
	}


	render() {
		return (
			<div id="content" className="mt-4">

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
		);
	}
}

export default ProductOwnerList;