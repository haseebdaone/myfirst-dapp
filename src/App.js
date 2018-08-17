import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import hello from './helloWorld';
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
      this.setState({waitingMessage: "Update Failed:" + err.message});
    }

  }

  render() {
    return (
      <div className="App">
        <p>{this.state.message}</p>
        <br/>

        <TextFields messageSubmission={this.setMessage}/>
        <br/>

        {this.state.waitingMessage}
        {this.state.waiting ? <CircularIndeterminate /> : null}

      </div>
    );
  }
}

export default App;
