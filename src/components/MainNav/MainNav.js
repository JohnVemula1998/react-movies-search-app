import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        width:"100%",
        position:"fixed",
        bottom: 0,
        background: 'linear-gradient(45deg, #2d313a 30%, #2d313b 90%)',
        backgroundColor:"#2d313a",
        zIndex: 100,
    }
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
   React.useEffect(() => {
     if(value === 0) navigate('/');
     else if(value === 1)navigate('/movies');
     else if(value === 2)navigate('/series');
     else if(value === 3)navigate('/search');
  }, [value,navigate]);
  

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        className={classes.root}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
        style={{ color: "white" }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="TV Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Search"
        icon={<SearchIcon />}
      />
      </BottomNavigation>
    </Box>
  );
}
