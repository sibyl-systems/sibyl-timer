import './App.css'

import React, { useState, useEffect } from 'react'
import createTimeEntry from './api/createTimeEntry'
import TimeCard from './components/TimeCard'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

const defaultTimers = {
    1: {
        running: false,
        startedTime: null,
        description: 'Test timer',
        entries: []
    },
    2: {
        running: false,
        startedTime: null,
        description: '',
        entries: []
    },
    3: {
        running: false,
        startedTime: null,
        description: '',
        entries: []
    }
}

function App() {
    const [apiKey, setApiKey] = useState('')
    const [account, setAccount] = useState('')
    const [timers, settimers] = useState(defaultTimers)

    useEffect(() => {
        ipcRenderer.on('toggle-timer', toggleTimer)
        return () => {
            ipcRenderer.removeListener('toggle-timer', toggleTimer)
        }
    }, [timers])

    const toggleTimer = (event, key) => {
        if (timers[key].running) {
            stopTimer(key)
        } else {
            startTimer(key)
        }
    }

    const getAccount = () => {
        return fetch(`https://api.teamwork.com/authenticate.json`, {
            method: 'GET',
            headers: {
                Authorization: `Basic ${btoa(`${apiKey}:X`)}`
            }
        })
            .then(response => response.json())
            .then(res => {
                setAccount(res.account)
            })
    }

    const startTimer = key => {
        //todo: stop all other timers.
        for (let timer in timers) {
            if (timer !== key && timers[timer].running) {
                stopTimer(timer)
            }
        }
        const currentTime = Date.now()
        settimers(timers => ({
            ...timers,
            [key]: {
                ...timers[key],
                running: true,
                startedTime: timers[key].startedTime || currentTime,
                entries: [
                    ...timers[key].entries,
                    {
                        start: currentTime
                    }
                ]
            }
        }))
    }
    const editTimerDescription = (key, description) => {
        settimers(timers => ({
            ...timers,
            [key]: {
                ...timers[key],
                description
            }
        }))
    }
    const stopTimer = key => {
        const currentTime = Date.now()
        settimers(timers => {
            const newEntry = timers[key].entries[timers[key].entries.length - 1]
            newEntry.end = currentTime
            return {
                ...timers,
                [key]: {
                    ...timers[key],
                    running: false,
                    entries: [...timers[key].entries]
                }
            }
        })
    }
    const resetTimer = key => {
        settimers(timers => {
            return {
                ...timers,
                [key]: defaultTimers[key]
            }
        })
    }
    const logTimer = key => {
        const seconds = totalHistoricTime(timers[key].entries)
        createTimeEntry(account, apiKey, secondsToHoursAndMinutes(seconds)).then(res => {
            if (res.STATUS === 'OK') {
                return resetTimer(key)
            }
        })
    }

    return (
        <div className="container">
            <div style={{ display: 'flex', 'align-items': 'baseline' }}>
                <h1>TimeKeys </h1>
                &nbsp;&nbsp;&nbsp;
                <small>Better TeamWork time tracking</small>
            </div>
            <div className="temp-api-input">
                <input
                    placeholder="Please enter your API key"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    type="text"
                />
                <button className="button" onClick={getAccount}>
                    Submit API Key
                </button>
            </div>
            {(!account || !apiKey) && (
                <h5>
                    Warning, no api key has been provided! <small>(Also no errors if wrong key is entered)</small>
                </h5>
            )}
            {Object.keys(timers).map((key, index) => {
                return (
                    <TimeCard
                        data={timers[key]}
                        running={timers[key].running}
                        timerName={key}
                        functions={{ startTimer, stopTimer, resetTimer, logTimer, editTimerDescription }}
                        account={account}
                        key={key}
                    />
                )
            })}
        </div>
    )
}

export default App

const totalHistoricTime = entries => {
    return entries.reduce((acc, curr) => {
        if (curr.end) {
            acc = acc + (curr.end / 1000 - curr.start / 1000)
        }
        return acc
    }, 0)
}

function secondsToHoursAndMinutes(seconds) {
    const pad = n => (n < 10 ? '0' : '') + n
    return {
        hours: pad((seconds / 3600) | 0),
        minutes: pad(((seconds % 3600) / 60) | 1)
    }
}
