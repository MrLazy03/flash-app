import { FlatList } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../../styledComponents/Container";
import { Text } from "../../styledComponents/text";
import Card from "../Card";
import { fetchMovies } from "../../store/modules/movies/movieSlice";
import STATUS from "../../store/constants";

const MovieList = () => {
  const dispatch = useDispatch();
  const { movieList, loading, error } = useSelector((state) => state.movies2);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  const renderItem = ({ item }) => {
    return <Card item={item} />;
  };
  const renderMovieList = () => {
    if (loading === STATUS.PENDING) return <Text>Loading</Text>;
    else if (loading === STATUS.FAILED) return <Text>{error}</Text>;

    return (
      <FlatList
        data={movieList[0]}
        renderItem={renderItem}
        keyExtractor={(item) => item.Title}
      />
    );
  };
  return <Container>{renderMovieList()}</Container>;
};

export default MovieList;
