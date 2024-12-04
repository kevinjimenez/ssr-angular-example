const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 10;

(async() => {
  const fs = require('fs');
  console.log('prerender routes');
  // By ID
  const pokemonsId =Array.from({length: TOTAL_POKEMONS}, (_, i) => i + 1);
  console.log(pokemonsId);
  let fileContent = pokemonsId.map((id) => `/pokemons/${id}`).join('\n');
  console.log(fileContent);


  // By PAGE
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    fileContent += `\n/pokemons/page/${page}`;
  }

  // BY NAME
  const pokemonList =  await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}}`).then((res) => res.json());

  fileContent += '\n';
  fileContent += pokemonList.results.map(({name}) => `/pokemons/${name}`).join('\n');




  fs.writeFileSync('routes.txt', fileContent);
  console.log('routes.txt created');
})()
