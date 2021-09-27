import React from 'react';
import Cell from './Cell'
import './App.css';

var maxRow = 20;
var maxCol = 40;

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      mainGrid: [],
      data: {}
    }
  }

  componentDidMount() {
    console.log("mounting")
    this.initializeGrid();
    fetch("/url/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.text())
    .then(text => this.setState({data: text}))
    .catch((error) => console.log(error));
  };

  initializeGrid = () => {
    var grid = []
    
    for(var i=0; i < maxRow; i ++){
      var row = []
      for(var j=0; j < maxCol; j++){
        row.push(this.initialCell());
      }
      grid.push(row)
    }
    this.setState({mainGrid: grid})
  }

  initialCell = () => {
    var properties = {
      isFinalPath: false,
      isVisited: false,
      isWall: false,
    }
    return properties
  }

  setCellProperties = (state) => {
    var properties = {
      isFinalPath: false,
      isVisited: false,
      isWall: false,
    }
    console.log(state)
    properties[state] = true;
    console.log(JSON.stringify(properties))
    return properties
  }
  handleAnimation = () => {
    fetch("/nextVisitedNodes", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
    .then(data => {
      console.log(JSON.stringify(data))
      var copy = this.state.mainGrid
      copy[data.i][data.j] = this.setCellProperties(data.state)

      this.setState({mainGrid: copy})
    })
    .catch((error) => console.log(error));
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          Welcome to Visual Algo
        </header>
        <button onClick = {this.handleAnimation}>Start Search</button>
        <div className = 'grid-wrapper'> 
          {(this.state.mainGrid).map( (row, index) => {
            var rowIndex = index
            return ( 
              <div className = 'gridRow' key={index}>
                {row.map( (col, index )=> (
                    <Cell 
                      key={index + rowIndex}
                      isFinalPath= {col.isFinalPath}
                      isVisited= {col.isVisited}
                      isWall= {col.isWall}
                    /> 
                    )
                  )}
              </div>
            )}
            )}
        </div>
      </div>
    );
    
  }


}

export default App;

//change later to render row by row isntead of cell by cell
//everything in {} in React means the code inside is read as JavaScript
