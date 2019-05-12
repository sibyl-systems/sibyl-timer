import React from 'react'
import { useDispatch } from 'react-redux'
import { removeProject } from 'store/actions'

import { ContextMenu, MenuItem } from 'react-contextmenu'

import ConfirmDialog from 'containers/ConfirmDialog'

import '@reach/dialog/styles.css'

const ProjectContextMenu = ({ project }) => {
    const dispatch = useDispatch()
    return (
        <ConfirmDialog title="Confirm" description="Are you sure?">
            {confirm => {
                return (
                    <ContextMenu id={project.id}>
                        <MenuItem
                            onClick={confirm(() => dispatch(removeProject(project.id)), {
                                title: 'Remove this project?',
                                description:
                                    'Are you sure you want to remove this timer and all timers within it? You can’t undo this action.'
                            })}
                        >
                            Remove Project
                        </MenuItem>
                    </ContextMenu>
                )
            }}
        </ConfirmDialog>
    )
}

export default ProjectContextMenu
