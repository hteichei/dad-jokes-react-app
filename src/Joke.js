import React, { Component } from 'react';

class Joke extends Component {
  handleLikeClick = () => this.props.countLike(this.props.id);
  handleDislikeClick = () => this.props.countDislike(this.props.id);

  render() {
    const { joke } = this.props;
    return (
      <div>
        <li key={this.props.id}>
          {joke}
          <button onClick={this.handleLikeClick}>Like</button>
          <button onClick={this.handleDislikeClick}>Dislike</button>
        </li>
        <p>
          Upvote:
          {this.props.upVote}
        </p>
        <p>
          DownVote:
          {this.props.downVote}
        </p>
      </div>
    );
  }
}

export default Joke;
