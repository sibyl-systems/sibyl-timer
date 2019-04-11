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
                <svg width="30" height="30" version="1.1" viewBox="0 0 30 30">
                    <path d="M29.06,23.31v5.75c0,0.52-0.42,0.94-0.94,0.94H1.87c-0.52,0-0.94-0.42-0.94-0.94v-5.75 c0-0.52,0.42-0.94,0.94-0.94s0.94,0.42,0.94,0.94v4.81h24.38v-4.81c0-0.52,0.42-0.94,0.94-0.94S29.06,22.79,29.06,23.31z M8.16,8.89 l5.95-5.74v20.17c0,0.52,0.42,0.94,0.94,0.94c0.52,0,0.94-0.42,0.94-0.94V3.15l5.95,5.74c0.18,0.18,0.42,0.26,0.65,0.26 c0.25,0,0.49-0.1,0.67-0.29c0.36-0.37,0.35-0.97-0.02-1.33l-7.53-7.28c-0.04-0.04-0.08-0.05-0.12-0.08 c-0.06-0.04-0.11-0.08-0.17-0.11C15.29,0.03,15.18,0.01,15.06,0c-0.01,0-0.01,0-0.02,0s-0.01,0-0.02,0c-0.11,0-0.23,0.02-0.33,0.07 c-0.06,0.03-0.12,0.07-0.17,0.11c-0.04,0.03-0.09,0.04-0.12,0.08L6.86,7.54C6.48,7.9,6.47,8.5,6.83,8.87 C7.19,9.24,7.79,9.25,8.16,8.89z"/>
                </svg>
            </button>
        </div>
    )
}

export default TimeLogger
