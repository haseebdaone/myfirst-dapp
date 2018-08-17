import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

class TextFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChanges = this.handleChanges.bind(this);
    this.handleSubmits = this.handleSubmits.bind(this);
  }

  handleChanges(event) {
    this.setState({value: event.target.value});

  }

  async handleSubmits(event) {
    event.preventDefault();
    await this.props.messageSubmission(this.state.value);
    this.setState({value: ''});
  }



  render() {
    return (
      <form onSubmit={this.handleSubmits} autoComplete="off">
        <TextField
          onChange={this.handleChanges}
          value={this.state.values}
          id="notsearch"
          label="Message"
          type="search"
          margin="normal"
        />
        <br/>
        <Button type="submit" variant="contained" color="primary" className="button">
          Save Message
        </Button>
      </form>
    );
  }
}

export default TextFields;
