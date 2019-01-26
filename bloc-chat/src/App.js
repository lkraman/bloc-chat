import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyAfTbKtXZUD0PZzJxGECO3unfiv10ZqX0w",
   authDomain: "bloc-chat-kraman.firebaseapp.com",
   databaseURL: "https://bloc-chat-kraman.firebaseio.com",
   projectId: "bloc-chat-kraman",
   storageBucket: "bloc-chat-kraman.appspot.com",
   messagingSenderId: "596845905245"
 };
 firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList
          firebase={ firebase }
        />
      </div>
    );
  }
}

export default App;
