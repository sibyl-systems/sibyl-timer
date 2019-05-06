import React, { useState } from 'react'

import Styled from 'styled-components'

const TimerModal = (props) => {

    return (
        <ModalContent>

            <Title>{props.title}</Title>

            <Label>Select Project</Label>
            <StyledReactSelect options={} defaultValue={} />

            <Label>Select Task</Label>
            <StyledReactSelect options={} defaultValue={} />

            <Label>Description</Label>
            <StyleInput />

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