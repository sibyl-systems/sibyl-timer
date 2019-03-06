import React, { useState, useEffect } from 'react'
import getAllProjects from '../api/getAllProjects'
import getAllTasks from '../api/getAllTasks'
import AsyncSelect from 'react-select/lib/Async'

function TimeLogger({ logTimer, timerName, account, apiKey }) {
    const [projectList, setprojectList] = useState({})
    const [taskList, setTaskList] = useState({})

    const fetchAllProjects = async () => {
        const result = await getAllProjects(account, apiKey)
        setprojectList(result)
    }
    const fetchAllTasks = async () => {
        const result = await getAllTasks(account, apiKey)
        setTaskList(result)
    }
    useEffect(() => {
        fetchAllProjects()
        fetchAllTasks()
    }, [])

    const filterProjects = inputValue => {
        return projectList.projects.filter(i => i.name.toLowerCase().includes(inputValue.toLowerCase()))
    }
    const filterTasks = inputValue => {
        return taskList['todo-items'].filter(i => i.content.toLowerCase().includes(inputValue.toLowerCase()))
    }

    const projectOptions = inputValue =>
        new Promise(resolve => {
            resolve(filterProjects(inputValue))
        })
    const taskOptions = inputValue =>
        new Promise(resolve => {
            resolve(filterTasks(inputValue))
        })

    return (
        <div className="time-logging">
            <label htmlFor="">Project</label>
            {projectList.projects && (
                <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={projectOptions}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                />
            )}
            {taskList['todo-items'] && (
                <AsyncSelect
                    cacheOptions
                    defaultOptions
                    loadOptions={taskOptions}
                    getOptionLabel={option => option.content}
                    getOptionValue={option => option.id}
                />
            )}
            <label htmlFor="">Billable?</label>
            <input type="checkbox" />
            <button className="time-button" onClick={() => logTimer(timerName)} title="Log time">
                Log time
            </button>
        </div>
    )
}

export default TimeLogger
