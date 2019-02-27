import React, { Component } from 'react';

import fire from '../App';


class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
    this.signIn = this.signIn.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user:null });
        localStorage.removeItem('user');
      }
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then((result) => {
    const user = result.user;
    this.props.setUser(user);
   })
   .catch(function(error) {
       console.log(error);
    });
 }

  signOut() {
    this.props.firebase.auth().signOut().then(() => {
    this.props.setUser(null);
  })
  .catch(function(error) {
       console.log(error);
  });
}

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user})
      }
    })
  }

  render() {
    return(

      <div className="user">
        <section className="btn-group">
         <button type="button" onClick={this.signIn}>Sign In with Google</button>
         <button type="button" onClick={this.signOut}>Sign Out</button>

         <section className="display-username">
            Sign In As:
            {this.props.user ? this.props.user.displayName : 'Guest'}
          </section>
          </section>
       </div>

  )
}
}

export default User;
