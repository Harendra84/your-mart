import { Component } from "react";
import { ref, onValue, remove } from 'firebase/database';
import { auth, db } from "./FirebaseConfig";
import { onAuthStateChanged, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';

export class ShoppingCart extends Component {

  state = {
    products: {},
  }

  componentDidMount() {

    let cartid = localStorage.getItem('cartid');
    let refrence = ref(db, 'shopping-cart/' + cartid + '/items');
    onValue(refrence, (snapshot) => {
      let products = snapshot.val();
      this.setState({ products: products });
      console.log(this.state.products);

    });
  }

  handleDelete = (product) => {

    let products = { ...this.state.products };

    delete products[product];
    this.setState({ products: products });
    let cartid = localStorage.getItem('cartid');
    remove(ref(db, 'shopping-cart/' + cartid + '/items/' + product));
  }

  handleClick = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // logic of payment gatway
      }
      else {
        signInWithRedirect(auth, new GoogleAuthProvider());
      }
    });
  }


  render() {
    return (
      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(this.state.products).map((product, i) => (<tr>
              <th scope="row">{i + 1}</th>
              <td>{this.state.products[product].product.title}</td>
              <td>{this.state.products[product].product.price}</td>
              <td>{this.state.products[product].quantity}</td>
              <td>{this.state.products[product].quantity * this.state.products[product].product.price}</td>
              <td><button className="btn btn-danger" onClick={() => { this.handleDelete(product) }}>delete</button></td>
            </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><button className="btn btn-success pe-0 ps-0" onClick={() => { this.handleClick() }}>checkout</button></td>
            </tr>
          </tfoot>
        </table>
      </div>);
  }
}