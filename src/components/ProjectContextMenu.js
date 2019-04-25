import React from 'react'

import { ContextMenu, MenuItem } from 'react-contextmenu'

const ProjectContextMenu = ({
    project,
    removeProject
}) => {
    return (
        <ContextMenu id={project.id}>
            <MenuItem onClick={() => removeProject(project.id)}>Remove Project</MenuItem>
        </ContextMenu>
    )
}

export default ProjectContextMenu
