import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState,useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Tabs,Tab } from '@mui/material';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Search = () => {
  const [type, setType] = useState(0);
  const [page,setPage] = useState(0);
  const [searchText, setSearchText] = useState();
  const [content,setContent] = useState();
  const [numOfPages,setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type:'dark',
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const Key = `--------------------------------`;
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${Key}&query=${searchText}&page=${page}`);
    console.log(data);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  }
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);


  return (
    <div>
        <ThemeProvider theme={darkTheme} >
          <div style={{display:'flex',margin:"15px 0px"}}>
          <TextField
          style={{flex: 1, color:'fff'}}
          className="searchBox"
          label='search'
          variant='filled'
          onChange={(e) => setSearchText(e.target.value)}
          
          />

          <button variant="contained" style={{marginLeft:10,padding:10}}onClick={fetchSearch}><SearchIcon/> </button>
          </div>
          <Tabs 
          value={type} 
          indicatorColor="primary" 
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{paddingBottom:5}}>
            <Tab style={{width:"50%",}} label="Search Movies" />
            <Tab style={{width:"50%",}} label="Search Tv Series" />
          </Tabs>

        </ThemeProvider>

        <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Search