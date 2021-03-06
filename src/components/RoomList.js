import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {title: "", rooms: []};
      this.roomsRef = this.props.firebase.database().ref("rooms");
      this.handleChange = this.handleChange.bind(this);
      this.createRoom = this.createRoom.bind(this);
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({ title: this.state.title });
    this.setState({ title: "" });
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) })
    });
  }

  selectRoom(room) {
    this.props.setActiveRoom(room);
  }



  render() {
    const roomForm = (
      <form onSubmit={this.createRoom}>
        <input
        type="text"
        value={this.state.title}
        placeholder="Enter Room Name"
        onChange={this.handleChange}
        />
      <button id='submit'>Enter</button>

      </form>
    );

    const roomList = this.state.rooms.map((room) =>
      <div key={room.key} onClick={(e) => this.props.setActiveRoom(room, e)}>{room.title}</div>
    );

    return(
      <div>
        <div>{roomForm}</div>
        <ul>{roomList}</ul>
      </div>
    );
  }
}

export default RoomList;
