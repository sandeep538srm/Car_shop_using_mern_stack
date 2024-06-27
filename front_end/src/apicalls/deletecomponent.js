import React from "react";
import { deleteProduct } from "./apiservices/apiservice";
import DeleteFormComponent from "../forms/services/deleteform";

export default class DeleteComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "",
    };
  }

  delete = (e) => {
    e.preventDefault();
    let p_id = parseInt(e.target.p_id.value);
    deleteProduct(p_id).then(
      (posRes) => {
        this.setState({
          status: posRes.data.delete,
        });
        alert("Delete success");
      },
      (errRes) => {
        console.log(errRes);
      }
    );
  };

  render() {
    return (
      <div className="container">
        {/* <div className="text-info h1">I am from Delete Component</div> */}
        <DeleteFormComponent delete={this.delete} />
        <h1 className="text-primary">{this.state.status}</h1>
      </div>
    );
  }
}
