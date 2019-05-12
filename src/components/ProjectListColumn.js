import React, {useState} from 'react'
import Styled from 'styled-components/macro'

import { ContextMenuTrigger } from 'react-contextmenu'

import TaskModalContainer from 'containers/modals/TaskModalContainer'


function ProjectListColumn(props) {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <Container {...props.provided.draggableProps} ref={props.provided.innerRef}>
            <ContextMenuTrigger id={props.project.id}>
                <Header>
                    <Title {...props.provided.dragHandleProps}>
                        {props.project.name}
                    </Title>
                    <AddButton onClick={() => setModalOpen(true)}></AddButton>
                    {modalOpen && 
                        <TaskModalContainer 
                            project={props.project}
                            closeTimerModal={() => setModalOpen(false)}
                            modalOpen={modalOpen}
                        />
                    }
                </Header>
            </ContextMenuTrigger>
            <CardList>
                {props.children}
            </CardList>
        </Container>
    )
}

export default ProjectListColumn


const Container = Styled.div`
    margin: 8px;
    width: 400px;
    flex-shrink: 0;
    
    background: ${props => props.theme.backgroundColor};;
    border-radius: 6px 6px 0 0;
    box-shadow: 0 1px 3px -1px rgba(0,0,0,0.5);
    overflow: hidden;
`

const Header = Styled.div`
    display: flex;
    align-items: center;
    padding: 0 16px;
    margin: 0;
    height: 50px;
    justify-content: space-between;
    background: ${props => props.theme.foregroundColor};
`

const Title = Styled.h3`
    font-size: 18px;
    font-weight: 700;
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
    letter-spacing: 0.018em;
`

const CardList = Styled.div`
    max-height: calc(100vh - 200px);
    overflow-y: overlay;
    padding: 0 12px 12px;
    margin-top: 12px;
    overflow-x: hidden;
    padding-bottom: 80px;

    &::-webkit-scrollbar {
        width: 4px
    }

    &::-webkit-scrollbar-track {
        background: 
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.foregroundColor}
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #627FD8
    }

`



const AddButton = Styled.button`
    border: none;
    background: none;
    box-shadow: none;
    width: 36px;
    height: 36px;
    position: relative;
    border-radius: 5px;
    &:hover {
        background: #45476E;
    }
    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        background-color: ${props => props.theme.primaryAccentColor};
        margin: auto;
    }
    &::before {
        width: 45%;
        height: 4px;
    }
    &::after {
        height: 45%;
        width: 4px;
    }
`