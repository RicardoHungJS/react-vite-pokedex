import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { ApiResponse } from "../../interfaces/apiResponse";
import Dropdown from "../dropdown/dropdown";

const HeaderComponent = () => {

  const { data, error }: ApiResponse = useFetch('https://pokeapi.co/api/v2/pokedex/');
  const [listData, setListData] = useState<any>([]);

  useEffect(() => {
    setListData(data)
  }, [data])

  useEffect(() => {
    if (listData) {
      console.log(listData?.results);
    }
  }, [listData])

  const selectRegion = (url: string) => {
    console.log(url);
  }

  return (
    <header className="w-screen h-20 bg-red-700 flex items-center justify-center px-5">
      <Dropdown placeholder="region" results={listData?.results} onSelect={selectRegion} />
    </header>
  )
}

export default HeaderComponent;