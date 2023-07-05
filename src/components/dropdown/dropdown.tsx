interface dropdownProps {
  placeholder: string;
  results: dropdownOptions[];
  onSelect: (url: string) => void;
}

export interface dropdownOptions {
  name: string;
  url: string;
}

const arrayPrueba = [
  { name: 'Option 0', url: "https://www.google.com" },
]

function Dropdown({ placeholder, results = arrayPrueba, onSelect }: dropdownProps) {

  const handlerSelect = (url: string) => {
    onSelect(url);
  }

  return (
    <div className={`${placeholder} w-64 h-10`}>
      <p className="flex pl-4 items-center w-full h-10 bg-white font-bold text-zinc-500 rounded mb-1">Select {placeholder}</p>
      <ul className="flex flex-col justify-center text-xs bg-white overflow-auto h-fit border-zinc-400 shadow-[3px_3px_40px_-10px_#828282] rounded">
        {
          results?.length ?
            results?.map((option: dropdownOptions) => {
              return <li key={option.name} className="font-bold pl-4 text-zinc-500 min-w-max flex items-center h-8 border-b-2 hover:bg-zinc-400 hover:text-white transition-all cursor-pointer last-of-type:border-b-0" onClick={() => handlerSelect(option.url)}>{option.name}</li>
            })
            : <p>No data</p>
        }
      </ul>
    </div>
  )
}

export default Dropdown;