import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { ApiResponse } from "../../interfaces/apiResponse";

const HeaderComponent = () => {

    const { data, error }: ApiResponse = useFetch('https://pokeapi.co/api/v2/pokedex/');

    useEffect(() => {
        console.log(data.results);
    }, [data])

    return (
        <header className="w-screen h-20 bg-red-700 flex items-center justify-center relative">
            <ul className="flex text-xs overflow-auto">
                {
                    data?.results.map((region: any) => {
                        return <li className="px-1 font-bold min-w-max">{region.name}</li>
                    })
                }
            </ul>
        </header>
    )
}

export default HeaderComponent;