import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "ab9c06cd518a69ca4aec15b547d72d67";
const url = "https://api.themoviedb.org/3";
const imgurl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
    <div className="row">
        <h2>{title}</h2>
        <div>
            {arr.map((item, index) => (
                <Card key={index} img={`${imgurl}/${item.poster_path}`} />
            ))}
        </div>
    </div>
);
const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genre, setGenre] = useState([]);
    useEffect(() => {
        const fetchUpcoming = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
            setUpcomingMovies(results);
        };
        const fetchNowPlaying = async () => {
            const {
                data: { results },
            } = await axios.get(
                `${url}/movie/${nowPlaying}?api_key=${apiKey}&page=2`
            );
            setNowPlayingMovies(results);
        };
        const fetchPopular = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
            setPopularMovies(results);
        };
        const fetchTopRated = async () => {
            const {
                data: { results },
            } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
            setTopRatedMovies(results);
        };
        const getAllGenre = async () => {
            const {
                data: { genres },
            } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
            setGenre(genres);
        };

        getAllGenre();
        fetchUpcoming();
        fetchNowPlaying();
        fetchPopular();
        fetchTopRated();
    }, []);
    return (
        <section className="home">
            <div
                className="banner"
                style={{
                    backgroundImage: popularMovies[3]
                        ? `url(${`${imgurl}/${popularMovies[3].poster_path}`})`
                        : "none",
                }}
            >
                {popularMovies[3] && <h1>{popularMovies[3].original_title}</h1>}

                {popularMovies[3] && <p>{popularMovies[3].overview}</p>}
                <div>
                    <button>
                        <BiPlay /> Play
                    </button>
                    <button>
                        My List <AiOutlinePlus />
                    </button>
                </div>
            </div>

            <Row title={"Upcoming Movies"} arr={upcomingMovies} />
            <Row title={"Now Playing Movies"} arr={nowPlayingMovies} />
            <Row title={"Popular Movies"} arr={popularMovies} />
            <Row title={"Top Rated Movies"} arr={topRatedMovies} />
            <div className="genreBox">
                {genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>
                        {item.name}
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Home;
