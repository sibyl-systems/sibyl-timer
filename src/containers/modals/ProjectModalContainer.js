import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import getAllProjects from 'api/getAllProjects'
import { addProject } from 'store/actions'

import Modal from 'react-modal'
import Styled from 'styled-components/macro'
import Select from 'react-select'


import {
    ModalContainer,
    ModalTitle,
    ModalContent,
    ButtonContainer,
    ActionButton,
    selectStyles,
    Loader,
    Label,
    FormGroup
} from 'components/styles/modal'

Modal.setAppElement('#root')

const ProjectModalContainer = ({ modalOpen, closeTimerModal }) => {
    const dispatch = useDispatch()
    const projects = useSelector(state => state.projects)

    useEffect(() => {
        handleLoadProjects()
        return () => {
            setSelectedProject(false)
        }
    }, [])

    const [loadingProjects, setLoadingProjects] = useState(false)
    const [projectOptions, setProjectOptions] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)

    const handleLoadProjects = async () => {
        //2do: set current projects in memory as the available options first.
        setLoadingProjects(true)
        const result = await getAllProjects()
        const options = result.projects.filter(current => !Object.keys(projects).includes(current.id))
        setProjectOptions(options)
        setLoadingProjects(false)
    }
    const handleSelectProject = project => {
        setSelectedProject(project)
    }

    const handleCloseModal = () => {
        setSelectedProject(false)
        closeTimerModal()
    }

    const handleSubmitModal = () => {
        if (selectedProject) {
            dispatch(addProject(selectedProject))
            setSelectedProject(false)
            closeTimerModal()
        }
        console.warn('no project selected.')
    }

    return (
        <ModalOuterContainer
            isOpen={modalOpen}
            onRequestClose={handleCloseModal}
            style={{ overlay: { backgroundColor: 'hsla(0, 0%, 0%, 0.33)' } }}
        >
            <ModalTitle>Add Project</ModalTitle>
            <ModalContent>
                <FormGroup>
                    <Label>Select Project {loadingProjects ? <Loader title="Loading..." /> : null}</Label>
                    <Select
                        styles={selectStyles}
                        getOptionLabel={option => option.name}
                        getOptionValue={option => option.id}
                        options={projectOptions}
                        onChange={handleSelectProject}
                        value={selectedProject}
                    />
                </FormGroup>
            </ModalContent>
            <ButtonContainer>
                <ActionButton onClick={handleCloseModal}>Cancel</ActionButton>
                <ActionButton onClick={handleSubmitModal}>Add project</ActionButton>
            </ButtonContainer>
        </ModalOuterContainer>
    )
}

export default ProjectModalContainer

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
