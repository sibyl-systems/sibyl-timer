import React, { useState, useEffect } from 'react'
import createTimeEntry from './api/createTimeEntry'
import './App.css'

// import { ipcRenderer } from 'electron' //doesn't work, obviously.
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

const defaultTimers = {
    1: {
        running: false,
        startedTime: null,
        description: '',
        entries: [
            {
                start: 1551539152647,
                end: 1551559946345
            }
        ]
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
    },
}

/**
 * Start timer
 * Stop timer
 * Name timer
 * Log timer
 * Reset timer
 */

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
        console.log(timers[key].running);
        if(timers[key].running) {
            console.log('stopping timer');
            stopTimer(key)
        } else {
            console.log('starting timer');
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
            .catch(err => console.log(err))
    }

    const startTimer = key => {
        //todo: stop all other timers.
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
        const seconds = totalElapsedTime(timers[key].entries)
        createTimeEntry(account, apiKey, secondsToHoursAndMinutes(seconds)).then(res => {
            if(res.STATUS === 'OK') {
                console.log('Everything is going to be alright!');
                console.log(key);
                return resetTimer(key)
            }
            console.log('oh no. Why aren\'t there any errors?');
        })
    }

    return (
        <div className="container">
            {/* Ooops 2do: fix */}
            &nbsp; 
            <div className="row">
                <div className="column column-60">
                    <input value={apiKey} onChange={e => setApiKey(e.target.value)} type="text" />
                </div>
                <div className="column">
                    <button className="button" onClick={getAccount}>Get account</button>
                </div>
            </div>
            { (!account && apiKey) && <h5>Warning, no api key!</h5> }
            {Object.keys(timers).map((key, index) => {
                return (
                    <Timer
                        data={timers[key]}
                        timerKey={key}
                        startTimer={startTimer}
                        stopTimer={stopTimer}
                        resetTimer={resetTimer}
                        logTimer={logTimer}
                        key={key}
                        account={account}
                    />
                )
            })}
        </div>
    )
}

export default App

function Timer({ data, timerKey, startTimer, stopTimer, resetTimer, logTimer, account }) {
    
    return (
        <>
            <h6>
                Timer {timerKey}: <small>{secondsToHoursAndMinutes(totalElapsedTime(data.entries)).hours}:{secondsToHoursAndMinutes(totalElapsedTime(data.entries)).minutes}</small>
            </h6>
            <div>
                {!data.running && <button className="button" onClick={() => startTimer(timerKey)}>Start</button>}
                
                {data.running && <button className="button" onClick={() => stopTimer(timerKey)}>Stop</button>}
                
                {totalElapsedTime(data.entries) > 0 && <button className="button-outline" disabled={!account} onClick={() => logTimer(timerKey)}>Log Time</button>}
                
                {totalElapsedTime(data.entries) > 0 && <button className="button-outline" onClick={() => resetTimer(timerKey)}>Reset</button>}
            </div>
        </>
    )
}

const totalElapsedTime = (entries) => {
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