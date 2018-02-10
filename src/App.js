import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isSpam: null,
      isloaded: false
    };
    this.detector = this.detector.bind(this);
  }
  detector() {
    this.setState({ isSpam: false, isloaded: true });
  }
  render() {
    return (
      <div className="App">
      {this.state.isloaded?(
         <div className={`result ${this.state.isSpam ? "spam" : "notspam"}`}>
         <h1> {this.state.isSpam? "Spam 🙁":"Not Spam 🤩! "} </h1>
       </div>
      ):null}

        <div className={`content  ${this.state.isloaded?('fadeout'):""}`}>
          <h1> Spam Detector </h1>
          <div className="input">
            <form
              onSubmit={e => {
                e.preventDefault();
                this.detector();
              }}
            >
              <input
                className="input-search"
                placeholder="Message..."
                type="text"
                onChange={value =>
                  this.setState({ message: value.target.value })
                }
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
