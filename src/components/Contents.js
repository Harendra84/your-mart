import React, { Component } from "react";
import { db } from "./FirebaseConfig";
import { ref, onValue } from 'firebase/database';
import { set } from 'firebase/database';

export class Contents extends Component {

    allProducts = [];
    state = {
        categories: [],
        products: [],
        quantity: 0
    };

    componentDidMount() {
        this.getCategories();
        this.getProducts();
    }

    handleChange = (quantity) => {
        this.setState({ quantity: quantity })
    }

    handleClick=(category)=>{

        if(category==="All Categories")
        {
            this.setState({products:this.allProducts})
        }
        else
        {
            this.state.products=this.allProducts;

            const products=this.state.products.filter((product)=>
            product['category']===category
            )
            this.setState({products:products});
            console.log(products);
        }
    }

    addtocart(product) {
        let productid = (Math.random() * 99999000).toFixed();
        let cartid = localStorage.getItem('cartid')
        if (cartid == null) {
            let cartid = (Math.random() * 99999000).toFixed();
            const reference = ref(db, 'shopping-cart/' + cartid + "/items/" + productid);
            set(reference, {
                'product': product,
                'quantity': Number(this.state.quantity)
            });
            localStorage.setItem('cartid', cartid);
        }
        else {
            const reference = ref(db, 'shopping-cart/' + cartid + "/items/" + productid);
            set(reference, {
                'product': product,
                'quantity': Number(this.state.quantity)
            });
        }
    }

    getCategories() {
        const references = ref(db, 'category');
        onValue(references, (snapshot) => {
            let categories = snapshot.val();
            this.setState({ categories: categories });
            console.log(this.state.categories);
        })
    }

    getProducts() {
        const references = ref(db, 'products');
        onValue(references, (snapshot) => {
            let products = snapshot.val();
            this.setState({ products: products })
            this.allProducts=products;
            console.log(this.state.products);
        })
    }
    render() {
        return (
            <div className='m-3'>
                <div className='row'>
                    <div className='col-3'>
                        <ul className='list-group'>
                            <li key={1} className='list-group-item active' onClick={()=>{this.handleClick("All Categories")}}>All Categories</li>
                            {this.state.categories.map(category => (<li onClick={()=>{this.handleClick(category['categoryname'])}} key={category['categoryname']} className='list-group-item'>{category['categoryname']}</li>))}
                        </ul>
                    </div>
                    <div className='col-9'>
                        <div className='row'>
                            {this.state.products.map(product => (<div className='col-4 mb-3'><div key={product['title']} className='card' style={{ width: '18rem' }}>
                                <img src={product['imageUrl']} className="card-img-top" />
                                <div className="car-body">
                                    <h5 className="card-title">{product['title']}</h5>
                                    <h5 className="card-title">{product['price']}</h5>
                                    <div className="row">
                                        <div className='col-6'>
                                            <select key={product['title']} className="form-select" onClick={(e) => this.handleChange(e.target.value)}>
                                                <option value="0">Quantity</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <div className='col-6'>
                                            <button className="btn btn-info" onClick={() => { this.addtocart(product) }}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}