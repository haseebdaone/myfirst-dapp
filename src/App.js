import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import hello from './saveMessage';
import CircularIndeterminate from './components/loading';
import TextFields from './components/input';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      waitingMessage: '',
      waiting: false
    };

    this.setMessage = this.setMessage.bind(this);
  }

  async componentDidMount() {
    const message = await hello.methods.hello().call();
    this.setState({message});
  }

  async setMessage(info) {
    this.setState({waitingMessage: "Updating message on Blockchain...", waiting: true});

    try {
      const accounts = await web3.eth.getAccounts();
      await hello.methods.changeText(info).send({
        from: accounts[0]
      });
      const message = await hello.methods.hello().call();

      this.setState({waitingMessage: "Update Complete!", waiting: false, message: message});
    } catch (err){
      this.setState({waitingMessage: "Update Failed:" + err.message, waiting: false});
    }

  }

  render() {
    return (
      <div>
        <h1>Ethereum</h1>
        <h1>Blockchain</h1>
        <div className="App">
          <p>Your last saved message:</p>
          <p>{this.state.message}</p>
          <br/>

          <TextFields messageSubmission={this.setMessage}/>
          <br/>

          {this.state.waitingMessage}
          <div className="circularProgress">
            {this.state.waiting ? <CircularIndeterminate /> : null}
          </div>
        </div>
      </div>

    );
  }
}

export default App;
