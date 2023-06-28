interface dropdownProps {
    placeholder: string;
    results: Array<dropdownOptions>;
    onSelect: (url: string) => void;
}

export interface dropdownOptions {
    name: string;
    url: string;
}

function Dropdown({ placeholder, results, onSelect }: dropdownProps) {

    const handlerSelect = (url: string) => {
        console.log(onSelect(url));
    }

    return (
        <div className={`${placeholder}`}>
            <div className="">Seleccione {placeholder}</div>
            <ul className="flex text-xs overflow-auto">
                {
                    results?.map((option: dropdownOptions) => {
                        return <li className="px-1 font-bold min-w-max" onClick={() => handlerSelect(option.url)}>{option.name}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Dropdown;