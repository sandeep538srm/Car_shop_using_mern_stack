import React from "react";
import "./style.css";
let stl = "";
export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: window.sessionStorage.getItem("user"),
      wish: "",
    };
  }
  componentDidMount() {
    let date = "";
    date = new Date().getHours();
    //date = 17
    if (date < 12) {
      stl = "mrng";
      this.setState({
        wish: "Good Morning",
      });
    } else if (date < 16) {
      stl = "aftr";
      this.setState({
        wish: "Good Afternoon",
      });
    } else if (date < 20) {
      stl = "eve";
      this.setState({
        wish: "Good Evening",
      });
    }
  }
  render() {
    this.state = {
      ...this.state,
      user: window.sessionStorage.getItem("user"),
    };
    return (
      <div>
        <h1 className={stl}>
          {this.state.wish} {this.state.user}
        </h1>
      </div>
    );
  }
}
