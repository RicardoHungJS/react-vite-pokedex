import { useEffect, useRef, useState } from "react";

interface dropdownProps {
  placeholder: string;
  results: dropdownOptions[];
  onSelect: (url: string) => void;
}

export interface dropdownOptions {
  name: string;
  url: string;
}

function Dropdown({ placeholder, results, onSelect }: dropdownProps) {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ulList = listRef?.current?.classList;
    if (isOpen) {
      ulList?.remove('h-0');
      ulList?.add('h-[750px]');
    } else {
      ulList?.remove('h-[750px]');
      ulList?.add('h-0');
    }

  }, [isOpen])

  useEffect(() => {
    console.log(results);
  }, [results])


  const openDropDown = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='w-64 h-10' onClick={openDropDown}>
      <p className="flex pl-4 items-center w-full h-10 bg-white font-bold text-zinc-500 rounded mb-1">{`Select ${placeholder}`}</p>
      <ul className="scrollStyled flex flex-col justify-around text-xs bg-white overflow-y-auto border-zinc-400 
      shadow-[3px_3px_40px_-10px_#828282] rounded h-0 transition-all duration-300 max-h-screen" ref={listRef}>
        {
          results?.length ?
            results?.map((option: dropdownOptions) => {
              return <li key={option.name} className="font-bold pl-4 text-zinc-500 min-w-max flex items-center h-10 min-h-[2.5rem] hover:bg-zinc-400 hover:text-white 
              transition-all cursor-pointer" onClick={() => onSelect(option.url)}>{option.name}</li>
            })
            : <p>No data</p>
        }
      </ul>
    </div>
  )
}

export default Dropdown;