import React, { Component } from 'react'

class SellProductDiv extends Component {

	constructor(props) {
		super(props)
		this.state = { productId: '', customer: '' }
	}


	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}


	handleSubmit = async (e) => {
		e.preventDefault()
    const { productId, customer } = this.state
    try {
      await this.props.sellProduct(productId, customer)
      window.alert(`Product sold to\n${customer}`)
    }
    catch (e) {
      console.log(e)
      window.alert("Error occured")
    }
	}


	render() {
		return (
			<div id="content" className="mt-3">
				<div className="card mb-4" >
					<div className="card-body">
						<h5 className="text-center"><i>Sell a product</i></h5>

						<form className="my-3" onSubmit={this.handleSubmit}>
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Enter product ID"
									name="productId"
									value={this.state.productId} onChange={this.handleChange}
								/>
							</div>
              <div className="form-group">
								<input type="text" className="form-control" placeholder="Enter customer's address"
									name="customer"
									value={this.state.customer} onChange={this.handleChange}
								/>
							</div>
							<button type="submit" className="btn btn-primary btn-block">Sell</button>
						</form>

					</div>
				</div>
			</div>
		);
	}
}

export default SellProductDiv;