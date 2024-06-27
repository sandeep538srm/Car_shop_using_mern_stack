import React from "react";

export default class DeleteFormComponent extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.delete} className="w-50">
        <input
          type="number"
          placeholder="p_id"
          name="p_id"
          className="form-control my-2"
        />
        <input type="submit" value="Delete" className="btn btn-danger" />
      </form>
    );
  }
}
