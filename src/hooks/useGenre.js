const UseGenres = (selectedGenres) => {
   if(selectedGenres.length < 1) return '';

   const GennerIds = selectedGenres.map((g) => g.id);
   return GennerIds.reduce((acc,curr) => acc+","+curr);
}

export default UseGenres;