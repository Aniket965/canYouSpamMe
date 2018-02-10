import React, { Component } from "react";
import "./App.css";
import { data } from "./model";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isSpam: null,
      isloaded: false
    };
    this.detector = this.detector.bind(this);
    this.isSpam = this.isSpam.bind(this)
  }
  detector() {
    this.isSpam(this.state.message)
  }
  cProbOfWord(word, isspam) {
    if (isspam && data.spamWords[word]) {
      return data.spamWords[word] / data.totalSpamWs;
    } else if (data.spamWords[word]) {
      return data.notSpamWords[word] / data.totalNotSpamWs;
    } else {
      return 0.5;
    }
  }
  cProbOfMessage(message,isspam) {
    let r = 1
    let words
    try {
    words = message.split(" ")
    } catch (err) {
    words = [].push(message)
    }
    words.forEach( word => {
      r *= this.cProbOfWord(word,isspam)
    })
    return r
  }
  isSpam(message) {
    let cpOfSpam = this.cProbOfMessage(message,true)
    let cpOfNotSpam = this.cProbOfMessage(message,false)
    let lol_spam = data.pOfA * cpOfSpam
    let lol_not_spam = data.pOfNotA * cpOfNotSpam
    this.setState({ isSpam: (lol_spam > lol_not_spam), isloaded: true });
  }
  render() {
    return (
      <div className="App">
        {this.state.isloaded ? (
          <div className={`result ${this.state.isSpam ? "spam" : "notspam"}`}>
            <h1> {this.state.isSpam ? "Spam 🙁" : "Not Spam 🤩! "} </h1>
          </div>
        ) : null}

        <div className={`content  ${this.state.isloaded ? "fadeout" : ""}`}>
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
