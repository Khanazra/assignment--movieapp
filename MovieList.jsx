import React, { Component } from "react";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { AiOutlineCodepen } from "react-icons/ai";
import { BsFire } from "react-icons/bs";

// import PropTypes from "prop-types";
// import classes from "./MoviesList.module.css";
import "./MoviesList.css";
class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      search: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search)
      this.fetchMovie(this.state.search);
  }

  fetchMovie = async (search) => {
    if (search === "") search = "war";
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=45f0782a&s=${search}`
      );
      const data = await res.json();
      // console.log(data);
      if (data.Response === "False") this.setState({ movies: [] });
      else this.setState({ movies: data.Search });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount() {
    this.fetchMovie("war");
  }

  render() {
    return (
      <div className="search">
        <h1>Movie Searching App</h1>
        <input
          onChange={(e) => {
            this.setState({
              search: e.target.value,
            });
          }}
          type="text"
        />
        <div className="container">
          <div className="movie_parents">
            {this.state.movies.map((movie, index) => (
              <div className="movie" key={index}>
                <img src={movie.Poster} />
                <div className="movie_text">{movie.Title}</div>
              </div>
            ))}
          </div>
        </div>
        <div className=" footer_style">
          <p>@ 2017 Azra Banu</p>
          <BsFillEnvelopeAtFill className="icon" />
          <AiFillGithub className="icon" />
          <FaLinkedinIn className="icon" />
          <AiOutlineCodepen className="icon" />
          <BsFire className="icon" />
        </div>
      </div>
    );
  }
}

MovieList.propTypes = {};

export default MovieList;
// alt={movie.Title}
