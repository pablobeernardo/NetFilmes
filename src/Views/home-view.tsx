import React, { useState, useEffect } from 'react';
import { Container, Movielist, Movie } from './styles';
import { API_URL, API_KEY, API_IMAGE } from '../config/config';
import SearchBox from './Components/movie-filter';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

export default function HomeView(){

    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/popular?api_key=${API_KEY}&language=pt-BR&page=1`)
        .then(response => response.json())
        .then(data => {
            setMovies(data.results);
            setFilteredMovies(data.results);
        });
    },[]);

    const handleFilter = (filtered: Movie[]) => {
        setFilteredMovies(filtered);
    };

    return (
        <Container>
            <h1>Net Filmes</h1>
            <SearchBox movies={movies} onFilter={handleFilter} />
            <Movielist>
                {
                    filteredMovies.map(movie => {
                        return (
                            <Movie key={movie.id}>
                                <a href="#"><img src={`${API_IMAGE}${movie.poster_path}`} alt={movie.title}></img></a>
                                <span>{movie.title}</span>
                            </Movie>
                        )
                    })
                }           
            </Movielist>
        </Container>
    )
}
