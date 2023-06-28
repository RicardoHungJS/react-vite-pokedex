import { useEffect, useState } from 'react';
import { ApiResponse } from '../../interfaces/apiResponse';
import useFetch from '../../hooks/useFetch';
import { fetchHelper } from '../../helpers/fetchHelper';

function PokeSideBar() {
    const { data, error }: ApiResponse = useFetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151');
    const [imageUrl, setImageUrl] = useState<Array<any>>([]);

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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <aside className='absolute w-80 bg-gray-300 top-0 h-screen overflow-auto'>
            <div>
                {
                    data?.results?.map((pokemon: any, indx: number) => {
                        return (
                            <div className='flex justify-center items-center flex-wrap group hover:bg-gray-200 transition-all duration-300 cursor-pointer py-2' key={`key-${indx}`}>
                                <p className='min-w-full text-2xl flex justify-center items-center font-bold my-2'>{pokemon?.name}</p>
                                {imageUrl.length > 0 ? <img className='aspect-auto w-24 group-hover:scale-110 transition-all duration-300' src={imageUrl[indx]} alt="pokemon image" /> : <></>}
                            </div>
                        )

                    })
                }
            </div>
        </aside>
    )
}

export default PokeSideBar