import React from "react";
import Pagination from "react-js-pagination"; // Import a pagination library

export default class ProductList extends React.Component {
  handlePageChange(pageNumber) {
    this.props.onPageChange(pageNumber);
  }

  render() {
    const { products, itemsPerPage, activePage, addToCart } = this.props;
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <>
        <div className="row">
          {currentProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card">
                <img
                  src={product.p_img}
                  className="card-img-top"
                  alt={product.p_name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.p_name}</h5>
                  <p className="card-text">
                    <strong>ID:</strong> {product.p_id}
                    <br />
                    <strong>Cost:</strong> ${product.p_cost}
                    <br />
                    <strong>Category:</strong> {product.p_cat}
                    <br />
                    <strong>Description:</strong> {product.p_desc}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={products.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      </>
    );
  }
}
