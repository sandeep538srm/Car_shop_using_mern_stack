// import React from "react";
// import axios from "axios";
// import url from "./url";
// import ProductList from "../forms/services/readform";

// export default class Read extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       products: [],
//       status: "",
//       activePage: 1,
//       itemsPerPage: 10,
//     };
//   }

//   componentDidMount() {
//     this.setState({ status: "loading" });
//     axios
//       .get(url + "/fetchproduct")
//       .then((posRes) => {
//         this.setState({
//           products: posRes.data,
//           status: "",
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         this.setState({ status: "error" });
//       });
//   }

//   handlePageChange(pageNumber) {
//     this.setState({ activePage: pageNumber });
//   }

//   addToCart(product) {
//     // Implement add to cart functionality here
//     alert(`Added ${product.p_name} to cart`);
//   }

//   render() {
//     const { products, status, activePage, itemsPerPage } = this.state;

//     return (
//       <div className="container">
//         <div className="text-primary h1">I am read</div>
//         {status === "loading" && (
//           <div className="d-flex justify-content-center align-items-center vh-100">
//             <div className="spinner-border text-primary" role="status">
//               <span className="sr-only">Loading...</span>
//             </div>
//           </div>
//         )}
//         {status === "error" && <p>Error loading data.</p>}
//         {status === "" && (
//           <ProductList
//             products={products}
//             itemsPerPage={itemsPerPage}
//             activePage={activePage}
//             onPageChange={this.handlePageChange.bind(this)}
//             addToCart={this.addToCart.bind(this)}
//           />
//         )}
//       </div>
//     );
//   }
// }
import React from "react";
import { fetchProducts } from "../apicalls/apiservices/apiservice"; // Adjust the import path if needed
import ProductList from "../forms/services/readform";

export default class Read extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      status: "",
      activePage: 1,
      itemsPerPage: 12,
    };
  }

  componentDidMount() {
    this.setState({ status: "loading" });
    fetchProducts()
      .then((posRes) => {
        this.setState({
          products: posRes.data,
          status: "",
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ status: "error" });
      });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  addToCart(product) {
    // Implement add to cart functionality here
    alert(`Added ${product.p_name} to cart`);
  }

  render() {
    const { products, status, activePage, itemsPerPage } = this.state;

    return (
      <div className="container">
        {/* <div className="text-primary h1">I am read</div> */}
        {status === "loading" && (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}
        {status === "error" && <p>Error loading data.</p>}
        {status === "" && (
          <ProductList
            products={products}
            itemsPerPage={itemsPerPage}
            activePage={activePage}
            onPageChange={this.handlePageChange.bind(this)}
            addToCart={this.addToCart.bind(this)}
          />
        )}
      </div>
    );
  }
}
