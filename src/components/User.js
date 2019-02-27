import React, { Component } from 'react';
import styled from 'styled-components';


const Button = styled.button`
  color: #2A1657;
  padding: 0.25rem 1rem;
  border: solid 2px #2A1657;
  border-radius: 3px;
  margin: 0.5rem;
  font-size: 1rem;
`;
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
       console.log('Failed to Sign in with Google');
    });
 }

  signOut() {
    this.props.firebase.auth().signOut().then(() => {
    this.props.setUser(null);
  })
  .catch(function(error) {
       console.log(error);
       console.log('Failed to Sign Out');
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
      <div>
<<<<<<< HEAD
         <Button onClick={this.login}>Sign In</Button>
         <Button onClick={this.logout}>Sign Out</Button>
         <button onClick={this.login}>Sign In</button>
         <button onClick={this.logout}>Sign Out</button>
=======
         <button onClick={this.signIn}>Sign In</button>
         <button onClick={this.signOut}>Sign Out</button>
>>>>>>> checkpoint-bloc-chat-set-username
         <section className="show-username">
            Sign In As:
            {this.props.user ? this.props.user.displayName : 'Guest'}
          </section>
       </div>

  )
}
}

export default User;