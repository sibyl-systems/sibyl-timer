import * as React from 'react'
import { useCombobox } from 'downshift'
const Select = ({ options, selected }) => {
    const [items, setItems] = React.useState(options)
    const {
        isOpen,
        selectedItem,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        highlightedIndex,
        getItemProps,
    } = useCombobox({
        initialSelectedItem: selected,
        items: items,
        onInputValueChange: ({ inputValue }) => {
            setItems(
                options.filter(item => item.toLowerCase().startsWith(inputValue.toLowerCase()))
            )
        },
    })

    console.log(options)

    if(!options.length) {
        return <div>No options found</div>
    }

    return (
        <>
            <label {...getLabelProps()}>Choose an element:</label>
            <div {...getComboboxProps()}>
                <input {...getInputProps()} />
                <button {...getToggleButtonProps()} aria-label={'toggle menu'}>
                    &#8595;
                </button>
            </div>
            <ul {...getMenuProps()}>
                {isOpen &&
                    options.map((item, index) => (
                        <li
                            style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
                            key={`${item}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {item}
                        </li>
                    ))}
            </ul>
        </>
    )
}

export default Select
