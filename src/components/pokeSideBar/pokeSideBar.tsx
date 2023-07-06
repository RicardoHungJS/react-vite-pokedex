import { useEffect, useRef, useState } from 'react';
import { ApiResponse } from '../../interfaces/apiResponse';
import useFetch from '../../hooks/useFetch';
import { fetchHelper } from '../../helpers/fetchHelper';
import { deepEqual } from '../../helpers/objectComparison';

interface pokeCard {
  name: string;
  imageUrl: string;
}

function PokemonCard({ name, imageUrl }: pokeCard) {
  return (
    <div className='flex rounded-md px-4 my-1 justify-between items-center flex-wrap group hover:bg-gray-300 hover:shadow-[3px_3px_16px_-10px_#828282] group cursor-pointer hover:peer-[2]:scale-125 transition-all duration-200 py-2 w-11/12 min-w-[250px] h-16' key={`key-${name}`}>
      <p className='flex justify-center items-center font-bold my-2 transition-all duration-100 group-hover:text-xl group-hover:text-gray-600'>{name.toUpperCase()}</p>
      {imageUrl !== '' ? <img className='transition-all duration-100 h-14 group-hover:scale-125' src={imageUrl} alt="pokemon image" /> : <></>}
    </div>
  )
}

function PokeSideBar() {
  const { data, error }: ApiResponse = useFetch('https://pokeapi.co/api/v2/pokedex/2/');
  const prevDataRef = useRef(null)

  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [searchPokemon, setSearchPokemon] = useState<string>('');
  const [searchedPokemonArray, setSearchedPokemonArray] = useState<Array<pokeCard>>([])
  const [pokemonsInformation, setPokemonsInformation] = useState<Array<pokeCard>>([])

  const sideBarButtonRef = useRef<HTMLDivElement>(null);
  const sideBarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(pokemonsInformation);
  }, [pokemonsInformation])


  useEffect(() => {
    const sideBar = sideBarRef?.current?.classList;
    const sideBarButton = sideBarButtonRef.current?.classList;

    if (openSideBar) {
      sideBarButton?.remove('left-0');
      sideBarButton?.add('left-80');
      sideBar?.remove('w-0');
      sideBar?.add('w-80');
      sideBar?.remove('opacity-0');
      sideBar?.add('opacity-100');
    } else {
      sideBarButton?.remove('left-80');
      sideBarButton?.add('left-0');
      sideBar?.remove('w-80');
      sideBar?.add('w-0');
      sideBar?.remove('opacity-100');
      sideBar?.add('opacity-0');
    }
  }, [openSideBar])

  useEffect(() => {
    if (data && !deepEqual(data, prevDataRef.current)) {
      const fetchData = async () => {
        const pokePromises = data.pokemon_entries.map(async (pokemon: any) => {
          const pokeimage = await fetchHelper(`https://pokeapi.co/api/v2/pokemon/${pokemon.entry_number}/`);

          return {
            name: pokemon.pokemon_species.name,
            imageUrl: pokeimage.data?.sprites?.front_default,
          }
        })

        const pokeData = await Promise.all(pokePromises)

        setPokemonsInformation(prevPokemons => [...prevPokemons, ...pokeData])
      }

      fetchData();
    }

    prevDataRef.current = data;
  }, [data])


  useEffect(() => {
    if (searchPokemon === '') {
      setSearchedPokemonArray([])
      return
    }
    const debounceTimer = setTimeout(() => {
      let auxSearchPokemon = searchPokemon;
      setSearchedPokemonArray(pokemonsInformation.filter((elem: any) => {
        return elem.name.toLowerCase().startsWith(auxSearchPokemon.toLowerCase())
      }))

      auxSearchPokemon = '';
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [pokemonsInformation, searchPokemon])

  useEffect(() => {
    if (searchedPokemonArray.length > 0) {
      console.log('searched pokemons', searchedPokemonArray);
    }
  }, [searchedPokemonArray])

  const searchPokemonEvent = (e: string) => {
    setSearchPokemon(e)
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <aside>
      <div className={`scrollStyled top-0 w-0 h-screen overflow-y-auto overflow-x-hidden transition-all duration-300 bg-gray-200 flex flex-col items-center py-4 opacity-0 ease-linear`} ref={sideBarRef}>
        <div className='w-full h-fit grid place-items-center pb-3 justify-self-start'>
          <input className='h-9 w-11/12 rounded px-2 py-1 shadow-[3px_3px_20px_-10px_#828282] outline-none' autoComplete='off' type="text" name="search" placeholder='Search Pokemon' onChange={(e) => searchPokemonEvent(e.target.value)} />
          {(searchedPokemonArray.length === 0 && searchPokemon !== '') && <label className='flex justify-center items-center text-xs w-11/12 text-red-800 mt-2 min-w-[250px]'>Searched pokemon is not in this list<span className='m text-lg'>😥</span></label>}
        </div>
        {
          pokemonsInformation.length > 0 && searchPokemon === '' ?
            pokemonsInformation.map((card) => PokemonCard(card)) :
            searchedPokemonArray.length > 0 && searchedPokemonArray.map(card => PokemonCard(card))
        }
      </div>
      <div className='absolute w-6 h-6 left-0 bg-white top-7 mx-6 flex justify-center items-center cursor-pointer transition-all duration-300 ease-linear' ref={sideBarButtonRef} onClick={() => setOpenSideBar(!openSideBar)}>X</div>
    </aside>
  )
}

export default PokeSideBar