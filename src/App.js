import React, { Component } from 'react';
import Navbar from './components/Navbar';
import FooterBar from './components/FooterBar';
import GameGrid from './components/GameGrid';
import Cats from './utils/Cats';

class App extends Component {

  state = {
    gameActive: false,
    score: 0,
    topScore: 0,
    result: "Click Any Cat To Begin!",
    cats: Cats
  }

  // Use Fisher-Yates Shuffle to shuffle the cats array in this.state
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there are remaining elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  shuffleCats() {
    let tempCatArray = this.state.cats;
    this.setState({
      cats: this.shuffle(tempCatArray)
    });
  }

  findCatIndex(id) {
    for (let i = 0; i < this.state.cats.length; i++) {
      if (parseInt(id, 0) === parseInt(this.state.cats[i].id, 0)) {
        return i;
      }
    }
  }

  setCatClicked(index, value) {
    let tempCatArray = this.state.cats;
    tempCatArray[index].clicked = value;
    console.log("Set cat at index " + index + " clicked to true");
    this.shuffleCats();
  }

  resetCats() {
    let tempCatArray = this.state.cats;
    tempCatArray.forEach(function(cat) {
      cat.clicked = false;
    });
    this.shuffleCats();
    console.log("All cats reset");
  }

  increaseScore() {
    let tempScore = this.state.score;
    let tempTopScore = this.state.topScore;
    tempScore += 1;

    (tempScore >= tempTopScore) ? this.setState({score: tempScore, topScore: tempScore}) : this.setState({ score: tempScore});
  }

  endGame() {
    this.setState({
      score: 0
    });
    this.resetCats();
  }

  setGameActive(toggle) {
    this.setState({
      gameActive: toggle
    });
  }

  clickCat = event => {
    
    let catIndex = this.findCatIndex(event.target.id);
    this.setGameActive(true);

    if (this.state.cats[catIndex].clicked === true) {
      this.setState({
        result: "You guessed Incorrectly!"
      });
      this.endGame();
    }
    else {
      this.increaseScore();
      this.setState({
        result: String("You guessed Correctly!")
      });
      this.setCatClicked(catIndex, true);
      console.log(this.state);
    }

    this.shuffleCats();
    console.log(this.state.cats);
  };

  render() {
    return (
      <div>
        <Navbar score={this.state.score} topScore={this.state.topScore} gameActive={this.state.gameActive} result={this.state.result}></Navbar>
        <GameGrid cats={this.state.cats} clickCat={this.clickCat}></GameGrid>
        <FooterBar></FooterBar>
      </div>
    );
  }
}

export default App;
