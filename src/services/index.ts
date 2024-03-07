const fetchPokedex = async () => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
  const result = await fetch(url);
  const data = await result.json();
  return data;
};

const fetchImage = async (name: string) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const result = await fetch(url);
  const data: any = await result.json();
  return data.sprites?.other.home.front_default;
};

const fetchDetails = async (name: string) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const result = await fetch(url);
  const data: any = await result.json();
  return data;
};

export { fetchPokedex, fetchImage, fetchDetails };
