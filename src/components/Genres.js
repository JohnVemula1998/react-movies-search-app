import React, { useEffect } from "react";
import axios from "axios";
import Chip from "@mui/material/Chip";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
        //console.log(selectedGenres);
      };
      const handleRemove = (genre) =>{
          setSelectedGenres(
              selectedGenres.filter((selected) => selected.id !== genre.id)
          );
          setGenres([...genres,genre]);
          setPage(1);
      }
  const fetchGenres = async () => {
    const Key = `1452e6e0980f76d9c09368379bd64adf`;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${Key}&language=en-US`
    );
    setGenres(data.genres);
    //console.log(data);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            size="small"
            color="primary"
            key={genre.id}
            clickable
            style={{ margin: 2}}
            onDelete={() => handleRemove(genre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            style={{ margin: 2,
            backgroundColor:"#ffffff"}}
            label={genre.name}
            key={genre.id}
            clickable
            size="small"

            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
