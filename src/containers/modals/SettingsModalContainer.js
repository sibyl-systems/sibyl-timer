import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import getTags from 'api/getTags'

import Modal from 'react-modal'
import Styled from 'styled-components/macro'
import Select from 'react-select'

import {addDefaultTags} from 'store/actions'

import {
    ModalContainer,
    ModalTitle,
    ModalContent,
    ButtonContainer,
    // ActionButton,
    selectStyles,
    // Loader,
    Label,
    FormGroup
} from 'components/styles/modal'

Modal.setAppElement('#root')

const SettingsModalContainer = ({ modalOpen, closeTimerModal }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [apiKey, setApiKey] = useState(user.apikey)
    const [hiddenInput, setHiddenInput] = useState(true)


    // // const [loadingTags, setLoadingTags] = useState(false)
    const [tagOptions, setTagOptions] = useState([])
    const [selectedTags, setSelectedTags] = useState(user.tags ? user.tags : [])


    
    useEffect(() => {
        handleLoadTags()
        return () => {
            setSelectedTags([])
        }
    }, [])


    const handleLoadTags = async () => {
        // setLoadingTags(true)
        const result = await getTags()
        const options = result.tags
        setTagOptions(options)
        // setSelectedtag(project)
        // setLoadingTags(false)
    }

    const handleCloseModal = () => {
        closeTimerModal()
    }

    const handleSelectTags = tags => {
        setSelectedTags(tags)
        dispatch(addDefaultTags(tags))
    }

    // const handleSubmitModal = () => {
    //     // if (selectedProject) {
    //         closeTimerModal()
    //     // }
    //     console.warn('no project selected.')
    // }

    return (
        <ModalOuterContainer
            isOpen={modalOpen}
            onRequestClose={handleCloseModal}
            style={{ overlay: { backgroundColor: 'hsla(0, 0%, 0%, 0.33)' } }}
        >
            <ModalTitle>
                Settings
                <VersionTitle>
                    v{process.env.REACT_APP_VERSION}
                </VersionTitle>
            </ModalTitle>
            <ModalContent>
                <FormGroup>
                    <Label>API Key <FakeLink onClick={() => setHiddenInput(v => !v)}>Show</FakeLink></Label>
                    <Input disabled autocomplete="off" type={hiddenInput ? 'password' : 'text'} value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Available timer tags</Label>
                    <Select 
                        styles={selectStyles}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.id}
                        options={tagOptions}
                        onChange={handleSelectTags}
                        value={selectedTags}
                        isMulti
                    ></Select>
                </FormGroup>
            </ModalContent>
            <ButtonContainer>
                {/* <ActionButton onClick={handleCloseModal}>Cancel</ActionButton>
                <ActionButton onClick={handleSubmitModal}>Add project</ActionButton> */}
            </ButtonContainer>
        </ModalOuterContainer>
    )
}

export default SettingsModalContainer

const ModalOuterContainer = Styled(ModalContainer)`
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    width: 440px;
    max-width: 100%;
    margin: auto;
    border: none;
    background: ${props => props.theme.backgroundColor};;
    overflow: auto;
    border-radius: 10px;
    overflow: visible;
    outline: none;
    display: flex;
    flex-direction: column;
    min-height: 200px;

`

const Input = Styled.input`
    background: none;
    color: ${props => props.theme.textColor};
    width: 100%;
    box-sizing: border-box;
	border: none;
	border-radius: 0;
	resize: none;
	font-size: 14px;
	line-height: 18px;
	overflow: auto;
	height: auto;
    border-bottom: 1px solid transparent;
    font-weight: 400;
    border-bottom: 1px solid ${props => props.theme.foregroundColor};
    &:focus {
        outline: none;
        border-bottom: 1px solid ${props => props.theme.primaryAccentColor};
    }
	&::placeholder {
		color: ${props => props.theme.textColor}a1;
    }
    padding: 0 8px;
    border: 1px solid ${props => props.theme.primaryAccentColor};
`

const FakeLink = Styled.span`
    display: inline-block;
    align-self: flex-end;
    margin-left: 12px;
    font-size: 14px;
    color: ${props => props.theme.textColor};
    text-decoration: underline;
    &:hover {
        color: ${props => props.theme.primaryAccentColor};
    }
`
const VersionTitle = Styled.span`
    margin-left: auto;
    font-size: 14px;
    color: ${props => props.theme.textColor};
`