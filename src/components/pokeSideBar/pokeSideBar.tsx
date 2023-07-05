import { useEffect, useRef, useState } from 'react';
import { ApiResponse } from '../../interfaces/apiResponse';
import useFetch from '../../hooks/useFetch';
import { fetchHelper } from '../../helpers/fetchHelper';

function PokeSideBar() {
  const { data, error }: ApiResponse = useFetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151');
  const [imageUrl, setImageUrl] = useState<Array<any>>([]);
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [searchPokemon, setSearchPokemon] = useState<string>('');

  const sideBarRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<Array<HTMLDivElement | null>>([]);
  const sideBarButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data !== null && data.length !== 0) {
      const fetchPokemonImages = async () => {
        const imageUrls = await Promise.all(
          data?.results.map(async (pkmon: any) => {
            const auxResponse = await fetchHelper(pkmon.url);

            if (auxResponse.data !== null) {
              return auxResponse.data?.sprites?.other['official-artwork']?.front_default
            } else {
              throw new Error("No images found");
            }
          })
        );
        setImageUrl(prevImageArray => [...prevImageArray, imageUrls].flat())
      }
      fetchPokemonImages();
    }
  }, [data])

  useEffect(() => {
    const sideBar = sideBarRef?.current?.classList;
    const imageBox = imageBoxRef.current;
    const sideBarButton = sideBarButtonRef.current?.classList;

    console.log('Hola mundo');

    if (openSideBar) {
      sideBarButton?.remove('left-0');
      sideBarButton?.add('left-80');
      sideBar?.remove('w-0');
      sideBar?.add('w-80');
      sideBar?.remove('opacity-0');
      sideBar?.add('opacity-100');
      imageBox.forEach(imgCard => {
        imgCard?.classList.remove('opacity-0');
        imgCard?.classList.add('opacity-100');
      })
    } else {
      sideBarButton?.remove('left-80');
      sideBarButton?.add('left-0');
      sideBar?.remove('w-80');
      sideBar?.add('w-0');
      sideBar?.remove('opacity-100');
      sideBar?.add('opacity-0');
      imageBox.forEach(imgCard => {
        imgCard?.classList.remove('opacity-100')
        imgCard?.classList.add('opacity-0')
      })
    }
  }, [openSideBar])

  useEffect(() => {
    if (searchPokemon !== '') {
      const debounceTimer = setTimeout(() => {
        console.log(searchPokemon);
      }, 500);

      return () => clearTimeout(debounceTimer);
    }
  }, [searchPokemon])

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
    <aside className=''>
      <div className={`top-0 w-0 h-screen overflow-y-auto overflow-x-hidden transition-all duration-300 bg-gray-200 flex flex-col items-center py-4 opacity-0 ease-linear`} ref={sideBarRef}>
        <div className='w-full h-fit grid place-items-center pb-3 justify-self-start'>
          <input className='h-9 w-11/12 rounded px-2 py-1 shadow-[3px_3px_40px_-10px_#828282] outline-none' autoComplete='off' type="text" name="search" placeholder='Search Pokemon' onChange={(e) => searchPokemonEvent(e.target.value)} />
          <label className='flex justify-center items-center text-xs w-11/12 text-red-800 mt-2'>{`${searchPokemon} is not in this list `}<span className='m text-lg'>😥</span></label>
        </div>
        {
          data?.results?.map((pokemon: any, indx: number) => {
            return (
              <div className='flex justify-between items-center flex-wrap group hover:bg-gray-300 cursor-pointer transition-all duration-200 py-2 w-3/4 h-28' key={`key-${indx}`} ref={(element) => (imageBoxRef.current[indx] = element)}>
                <p className='text-2xl flex justify-center items-center font-bold my-2'>{pokemon?.name}</p>
                {imageUrl.length > 0 ? <img className='aspect-auto transition-all duration-300 h-12' src={imageUrl[indx]} alt="pokemon image" /> : <></>}
              </div>
            )
          })
        }
      </div>
      <div className='absolute w-6 h-6 left-0 bg-white top-7 mx-6 flex justify-center items-center cursor-pointer transition-all duration-300 ease-linear' ref={sideBarButtonRef} onClick={() => setOpenSideBar(!openSideBar)}>X</div>
    </aside>
  )
}

export default PokeSideBar