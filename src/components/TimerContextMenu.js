import React from 'react'

import { ContextMenu, MenuItem } from 'react-contextmenu'

const WrappedMenuItem = ({ clickHandler, className, children }) => {
    return (
        <div className={className} onClick={clickHandler}>
            <MenuItem>{children}</MenuItem>
        </div>
    )
}

const TimerContextMenu = ({
    timer,
    handleStopTimer,
    handleStartTimer,
    handleLogTimer,
    handleChangeTask,
    handleEditTimer,
    handleResetTimer,
    handleToggleTimerSettings
}) => {
    return (
        <ContextMenu id={timer.id}>
            {timer.running ? (
                <MenuItem onClick={handleStopTimer}>Stop</MenuItem>
            ) : (
                <MenuItem onClick={handleStartTimer}>Start</MenuItem>
            )}
            <MenuItem onClick={handleLogTimer}>Log Timer</MenuItem>
            <MenuItem onClick={handleChangeTask}>Re-assign task</MenuItem>
            <MenuItem onClick={handleEditTimer}>Edit Timer</MenuItem>
            <MenuItem onClick={handleResetTimer}>Reset Timer</MenuItem>
            <MenuItem divider />
            <WrappedMenuItem
                className={`react-contextmenu-toggle ${timer.settings.isBillable && 'is-selected'}`}
                clickHandler={() => handleToggleTimerSettings('isBillable')}
            >
                {timer.settings.isBillable ? <span>[&#10004;]</span> : <span>[&#10006;]</span>}
                &nbsp;Is billable?
            </WrappedMenuItem>
            <WrappedMenuItem
                className={`react-contextmenu-toggle ${timer.settings.keepTimer && 'is-selected'}`}
                clickHandler={() => handleToggleTimerSettings('keepTimer')}
            >
                {timer.settings.keepTimer ? <span>[&#10004;]</span> : <span>[&#10006;]</span>}
                &nbsp;Keep timer?
            </WrappedMenuItem>
        </ContextMenu>
    )
}

export default TimerContextMenu
