import React from "react";
import { insertProduct } from "./apiservices/apiservice"; // Adjust the import path if needed
import FormComponent from "../forms/services/insertform";

export default class CreateComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "",
    };
  }

  insert = (e) => {
    e.preventDefault();
    let obj = {
      p_id: parseInt(e.target.p_id.value),
      p_name: e.target.p_name.value,
      p_cost: parseInt(e.target.p_cost.value),
      p_cat: e.target.p_cat.value,
      p_desc: e.target.p_desc.value,
      p_img: e.target.p_img.value,
    };
    insertProduct(obj).then(
      (posRes) => {
        this.setState({
          status: posRes.data.insert,
        });
        alert("Insert success");
      },
      (errRes) => {
        console.log(errRes);
      }
    );
  };

  render() {
    return (
      <div className="container">
        {/* <div className="text-info h1">I am from Create Component</div> */}
        <FormComponent insert={this.insert} />
        <h1 className="text-primary">{this.state.status}</h1>
      </div>
    );
  }
}
