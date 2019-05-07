import React, { useState } from 'react'

import Select from 'react-select'
import Styled from 'styled-components'

const TimerModal = (props) => {

    const {
        projectOptions,
        taskOptions
    } = props

    return (
        <ModalContent>

            <Title>{props.title}</Title>

            <Label>Select Project</Label>
            <Select options={projectOptions} />

            <Label>Select Task</Label>
            <Select options={taskOptions}  />

            <Label>Description</Label>
            {/* <StyleInput value={description} onChange={setDescription} onBlur={handleDes} /> */}

            <TimeInputs>

            </TimeInputs>

            <Checkbox>
                <CheckboxInput />
                <CheckboxLabel></CheckboxLabel>
            </Checkbox>
            <Checkbox>
                <CheckboxInput />
                <CheckboxLabel></CheckboxLabel>
            </Checkbox>

        </ModalContent>
    )


}


export default TimerModal







const ModalContent = Styled.div`
`

const Title = Styled.div`
`

const Label = Styled.label`
`
const StyleInput = Styled.input`
`

const TimeInputs = Styled.div`
`

const Checkbox = Styled.div`
`
const CheckboxInput = Styled.input`
`
const CheckboxLabel = Styled.label`
`