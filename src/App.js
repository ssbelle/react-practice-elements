import React from 'react';
import { ReactComponent as Hamburger } from "./hamburger.svg";
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      draggedItem: {},
      draggedItemIndex: 0,
      items: [],
    };

    this.summonIceAndFire = this.summonIceAndFire.bind(this);
    this.summonIceAndFire();
  }

  summonIceAndFire() {
    fetch('https://anapioficeandfire.com/api/books')
    .then(response => response.json())
    .then(items => this.setState({ items }))
  }

  onDrag = (event, index) => {
    event.preventDefault();
    this.draggedItem = this.state.items[index];

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.parentNode);
    event.dataTransfer.setDragImage(event.target.parentNode, 20, 20);
    this.setState({
      draggedItem: this.draggedItem,
      draggedItemIndex: index,
    });
  }

  onDrop = (event, index ) => {
    if(this.state.draggedItemIndex === index) return;
    let items = this.state.items.filter(item => item !== this.draggedItem);
    items.splice(index, 0, this.draggedItem);
    this.setState({ items });
  }

  onDragOver = (event) => {
    event.preventDefault();
  }

  render(){
    return (
      <div className="test">
        <h3>List of items</h3>
        <ul>
        {this.state.items.map((item, idx) => (
          <li
          className="drag"
          draggable="true"
          key={idx}
          onDrag={(event) => this.onDrag(event, idx)}
          onDrop={event => this.onDrop(event, idx)}
          onDragOver={(event => this.onDragOver(event))}>
            <div>
              <Hamburger />
              {item.name}
            </div>
           </li>
           ))}
       </ul>
     </div>
    )
  }
}
// App.propTypes = {
//   txt: PropTypes.string,
// }
//
// App.defaultProps = {
//   txt: "default txt",
// }

export default App;
