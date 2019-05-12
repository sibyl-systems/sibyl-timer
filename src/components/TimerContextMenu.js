import React from 'react'

import { useSelector } from 'react-redux'

import { ContextMenu, MenuItem } from 'react-contextmenu'

import ConfirmDialog from 'containers/ConfirmDialog'

import '@reach/dialog/styles.css'

// const WrappedMenuItem = ({ clickHandler, className, children }) => {
//     return (
//         <div className={className} onClick={clickHandler}>
//             <MenuItem>{children}</MenuItem>
//         </div>
//     )
// }

const TimerContextMenu = ({
    timer,
    handleLogTimer,
    handleEditTimer,
    handleResetTimer,
    handleToggleTimerSettings,
    handleRemoveTimer
}) => {
    const user = useSelector(store => store.user)
    return (
        <ConfirmDialog title="Confirm" description="Are you sure?">
            {confirm => {
                return (
                    <ContextMenu id={timer.id}>
                        <MenuItem onClick={handleLogTimer}>Log Timer</MenuItem>
                        <MenuItem onClick={handleEditTimer}>Edit Timer</MenuItem>
                        <MenuItem
                            onClick={confirm(handleResetTimer, {
                                title: 'Reset this timer?',
                                description: 'Are you sure you want to reset this timer to 00h 00m?'
                            })}
                        >
                            Reset Timer
                        </MenuItem>
                        <MenuItem
                            onClick={confirm(handleRemoveTimer, {
                                title: 'Remove this timer?',
                                description: 'Are you sure you want to remove this timer and forfeit any tracked time?'
                            })}
                        >
                            Remove Timer
                        </MenuItem>
                        {!timer.task.unassignedTask && (
                            <>
                                <MenuItem divider />
                                <MenuItem>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`${user.account.URL}#tasks/${timer.task.id}`}
                                    >
                                        Open in teamwork
                                    </a>
                                </MenuItem>
                            </>
                        )}
                        {/* <MenuItem divider />
                        <MenuItem divider /> */}
                        {/* <WrappedMenuItem
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
                        </WrappedMenuItem> */}
                    </ContextMenu>
                )
            }}
        </ConfirmDialog>
    )
}

export default TimerContextMenu
