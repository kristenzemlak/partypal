import React, { Component } from 'react';
import firebase from './firebase';
import Header from './components/Header';
import ListItem from './components/ListItem';
import Footer from './components/Footer';
import './App.scss';

class App extends Component {
  constructor() {
    super();

    //variables to hold firebase data:
    this.state = {
      items: [],
      who: '',
      what: '',
    };
  }

  componentDidMount() {

    //variable to connect database
    const dbRef = firebase.database().ref();

    //listen for database changes
    dbRef.on('value', (response) => {

      //store database info new array
      const newState = [];

      //store database response
      const data = response.val();

      //push new data to newState array
      for (let key in data) {
        newState.push({
          key: key,
          name: data[key].who,
          food: data[key].what,
        });
      }

      // setState to newState array
      this.setState({
        items: newState,
      });
    });
  }

  //update name and value
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  //prevent empty entries (couldn't get this to work)
  // handleConfirm = (event) => {
  //   event.preventDefault();

	// 	(this.state.who && this.state.what) === '' ? 
	// 	prompt('Please enter your name and item')
	// }

  //store and display submitted data
  handleSubmit = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref();

    //copy object & push to db
    dbRef.push({
      who: this.state.who,
      what: this.state.what,
    });

    //reset form after submit
    this.setState({
      who: '',
      what: '',
    })
  }

  //remove items from page & db
  removeItem = (itemID) => {
    const dbRef = firebase.database().ref();
    dbRef.child(itemID).remove();
  }

  render() {
    return (
      <div className="App">

        <Header />

        <div className="inputArea wrapper">
          <h3>Add to the list:</h3>
          <form action="" className="form" >
            <label className="visuallyHidden" name="who" htmlFor="who"></label>
              <input
                  className="addWho"
                  name="who"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.who}
                  placeholder={`Name`}
              />
            <label className="visuallyHidden" name="what" htmlFor="what"></label>
              <input
                  className="addWhat"
                  name="what"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.what}
                  placeholder={`Item`}
              />
            <button onClick={this.handleSubmit} className="submitButton">Add</button>
          </form>
        </div>

        <div className="resultsArea wrapper">
          <h3>Already accounted for:</h3>
          <ul>
            {this.state.items.map((item) => {
              return (
                <ListItem 
                  name={item.name} 
                  food={item.food} 
                  key={item.key} 
                  id={item.key} 
                  removeItem={this.removeItem} />)
            })}
          </ul>
        </div>

        <Footer />

      </div>
    );
  }
}

export default App;