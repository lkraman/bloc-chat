import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [] };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount(){
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  createRoom(e){
  const newRoomName = this.state.newRoomName;
  e.preventDefault()
  this.roomsRef.push({
    name: newRoomName 
  });
}

handleChange(e){
  this.setState({ newRoomName: e.target.value });
}

  render() {
    return (
      <section>
      {
        this.state.rooms.map( (room, index) =>
        <p className="rooms" key={index} > {room.name}</p>,
        console.log(this.state.rooms)
        )
      }

      <form onSubmit={(e) => this.createRoom(e)}>
          <label>
            New Room Name:
            <input type="text" value={this.state.newRoomName} onChange={ e => this.handleChange(e) }/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
}

export default RoomList;
