import React, { useState } from 'react'
import { Dialog } from '@reach/dialog'
import Styled from 'styled-components/macro'

const ConfirmDialog = props => {
    const { children, title, description } = props
    const [open, setOpen] = useState(false)
    const [callback, setCallback] = useState({ cb: null })
    const [messages, setMessages] = useState({
        title: null,
        description: null
    })

    const show = (callback, messages) => event => {
        event.preventDefault()

        event = {
            ...event,
            target: { ...event.target, value: event.target.value }
        }

        setOpen(true)
        setCallback({ cb: () => callback(event) })
        if (messages) {
            setMessages(messages)
        }
    }

    const hide = () => {
        setOpen(false)
        setCallback({ cb: null })
    }

    const confirm = () => {
        callback.cb()
        hide()
    }
    return (
        <>
            {children(show)}

            {open && (
                <Dialog
                    style={{
                        width: '600px',
                        maxWidth: '100%',
                        margin: '155px auto 0',
                        background: 'transparent',
                        padding: '0',
                        outline: 'none'
                    }}
                    onDismiss={hide}
                >
                    <DialogWrapper>
                        <ModalTitle>{messages.title || title}</ModalTitle>
                        <ModalContent>
                            <p>{messages.description || description}</p>
                        </ModalContent>
                        <ButtonContainer>
                            <ActionButton onClick={hide}>Cancel</ActionButton>
                            <ActionButton onClick={confirm}>OK</ActionButton>
                        </ButtonContainer>
                    </DialogWrapper>
                </Dialog>
            )}
        </>
    )
}

export default ConfirmDialog

const DialogWrapper = Styled.div`
    width: 100%;
    background: ${props => props.theme.backgroundColor};;
    overflow: auto;
    border-radius: 10px;
    overflow: hidden;
    outline: none;
    display: flex;
    flex-direction: column;
    min-height: 150px;
`

const ModalTitle = Styled.div`
    padding: 20px;
    min-height: 50px;
    color: ${props => props.theme.textColor};
    background: ${props => props.theme.foregroundColor};
`
const ModalContent = Styled.div`
    padding: 20px;
`

const ButtonContainer = Styled.div`
    display: flex;
    margin-top: auto;
`
const ActionButton = Styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    border: none;
    border-top: 1px solid ${props => props.theme.primaryAccentColor};
    color: ${props => props.theme.textColor};
    box-shadow: none;
    padding: 8px 16px;
    width: 100%;
    min-height: 50px;
    &:hover {
        background-color: ${props => props.theme.primaryAccentColor};
        color: white;
    }
    &:first-child {
        border-right: 1px solid ${props => props.theme.primaryAccentColor};
    }

`
