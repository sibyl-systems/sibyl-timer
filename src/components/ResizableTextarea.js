import React, { useState } from 'react'
const ResizableTextarea = ({value, setValue, onBlur, minRows = 1, maxRows = 15, className }) => {
    // const [value, setValue] = useState('')
    const [rows, setRows] = useState(1)
    // const [minRows, setMinRows] = useState(5)
    // const [maxRows, setMaxRows] = useState(10)

    const handleChange = event => {
        const textareaLineHeight = 18

        const previousRows = event.target.rows
        event.target.rows = minRows

        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight)

        if (currentRows === previousRows) {
            event.target.rows = currentRows
        }

        if (currentRows >= maxRows) {
            event.target.rows = maxRows
            event.target.scrollTop = event.target.scrollHeight
        }

        setValue(event.target.value)
        setRows(currentRows < maxRows ? currentRows : maxRows)
    }

    return (
        <textarea
            className={className}
            rows={rows}
            value={value}
            placeholder={'description...'}
            onChange={handleChange}
            onBlur={onBlur}
        />
    )
}

export default ResizableTextarea