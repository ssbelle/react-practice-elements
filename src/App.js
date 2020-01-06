import React from 'react';
import { ReactComponent as Hamburger } from "./hamburger.svg";
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      draggedItem: [],
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
      draggedItem: this.draggedItem
    });
  }

  onDrop = (event, index ) => {
    console.log('>>> YO DROP', event, index)
      console.log('>>> YO DROP2', this.state, this.draggedItem)
      // if(this.draggedItem === this.state.draggedItem) {
      //   console.log('this.draggedItem === this.state.draggedItem', this.draggedItem === this.state.draggedItem)
      //   return;
      // }
      // filter out the currently dragged item
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
             <li className="drag"
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

// const Button = (props) => <button>{props.children}</button>;
// const Widget = (props) => <input type="text" onChange={props.update} />;

// App.propTypes = {
//   txt: PropTypes.string,
// }
//
// App.defaultProps = {
//   txt: "default txt",
// }

export default App;
