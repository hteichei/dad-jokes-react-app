import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import uuidv1 from 'uuid/v1';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokeArray: [],
      loadingMsg: 'Loading...'
    };
  }
  componentDidMount = async () => {
    try {
      for (let i = 0; i < 20; i++) {
        const response = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' }
        });
        let obj = {
          joke: response.data.joke,
          upVote: 0,
          downVote: 0,
          id: uuidv1()
        };
        this.setState({
          jokeArray: [...this.state.jokeArray, obj]
        });
      }
    } catch (err) {
      this.setState({
        loadingMsg: 'Response error. Try again...'
      });
    }
  };

  newJokes = () => {
    this.setState(
      {
        jokeArray: [],
        loadingMsg: 'loading new jokes'
      },
      this.componentDidMount
    );
  };

  handleLike = jokeId => {
    // map over the array, ignore every joke except the one you are upvoting or downvoting
    //  replace that one with +1
    const updatedJokes = this.state.jokeArray.map(joke => {
      if (joke.id === jokeId) {
        return Object.assign({}, joke, {
          upVote: joke.upVote + 1
        });
      } else {
        return joke;
      }
    });
    this.setState({
      jokeArray: updatedJokes
    });
  };

  handleDislike = jokeId => {
    // map over the array, ignore every joke except the one you are upvoting or downvoting
    //  replace that one with +1
    const updatedJokes = this.state.jokeArray.map(joke => {
      if (joke.id === jokeId) {
        return Object.assign({}, joke, {
          downVote: joke.downVote + 1
        });
      } else {
        return joke;
      }
    });
    this.setState({
      jokeArray: updatedJokes
    });
  };

  render() {
    const jokes = this.state.jokeArray.map(j => (
      <Joke
        id={j.id}
        joke={j.joke}
        key={this.props.id}
        upVote={j.upVote}
        downVote={j.downVote}
        countLike={this.handleLike}
        countDislike={this.handleDislike}
      />
    ));
    if (this.state.jokeArray.length < 20) {
      return <div>{this.state.loadingMsg}</div>;
    } else {
      return (
        <div className="JokeList">
          <ul>{jokes}</ul>
          <button onClick={this.newJokes}>New Jokes!</button>
        </div>
      );
    }
  }
}

export default JokeList;
