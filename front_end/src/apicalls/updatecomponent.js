import React from "react";
import { updateProduct } from "../apicalls/apiservices/apiservice"; // Adjust the import path if needed
import FormComponent from "../forms/services/updateform";

export default class UpdateComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "",
    };
  }

  update = (e) => {
    e.preventDefault();
    let obj = {
      p_id: parseInt(e.target.p_id.value),
      p_name: e.target.p_name.value,
      p_cost: parseInt(e.target.p_cost.value),
      p_cat: e.target.p_cat.value,
      p_desc: e.target.p_desc.value,
      p_img: e.target.p_img.value,
    };
    updateProduct(obj).then(
      (posRes) => {
        this.setState({
          status: posRes.data.update,
        });
        alert("Update success");
      },
      (errRes) => {
        console.log(errRes);
      }
    );
  };

  render() {
    return (
      <div className="container">
        {/* <div className="text-info h1">I am from Update Component</div> */}
        <FormComponent update={this.update} />
        <h1 className="text-primary">{this.state.status}</h1>
      </div>
    );
  }
}
