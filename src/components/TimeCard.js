//todo: extract logic from here, and SIMPLIFY!!!

import React, { useState, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'

function TimeCard({ data, timerName, account, functions, running }) {
    const { resetTimer, logTimer, editTimerDescription } = functions
    const secondsElapsed = totalTime(data.entries)
    const timeExists = secondsElapsed > 0

    const [additionalSeconds, setadditionalSeconds] = useState(0)

    const editDescription = event => {
        editTimerDescription(timerName, event.target.value)
    }

    const existingTime = totalTime(data.entries) + additionalSeconds

    useEffect(() => {
        if (running) {
            const timerInterval = setInterval(() => {
                setadditionalSeconds(additionalSeconds => additionalSeconds + 1)
            }, 1000)

            return () => {
                clearInterval(timerInterval)
            }
        }
    }, [running])

    const startTimer = timerName => {
        functions.startTimer(timerName)
    }
    const stopTimer = timerName => {
        functions.stopTimer(timerName)
        setadditionalSeconds(0)
    }

    return (
        <div className={`time-card ${running && 'time-card--active'}`}>
            <ContentEditable
                className="time-description"
                html={data.description} // innerHTML of the editable div
                disabled={false} // use true to disable edition
                onChange={editDescription} // handle innerHTML change
            />

            <div className="time-actions">
                <button
                    disabled={!timeExists}
                    className="time-button"
                    onClick={() => {
                        resetTimer(timerName)
                        setadditionalSeconds(0)
                    }}
                    title="Delete saved time"
                >
                    <svg width="30" height="30" version="1.1" viewBox="0 0 30 30">
                        <path
                            d="M29.06,3.39h-3.51c-0.05,0-0.1,0.02-0.15,0.03c-0.05-0.01-0.09-0.03-0.14-0.03h-4.92V0.94 c0-0.52-0.42-0.94-0.94-0.94h-8.82c-0.52,0-0.94,0.42-0.94,0.94v2.45H4.73c-0.04,0-0.08,0.02-0.12,0.03 C4.56,3.41,4.53,3.39,4.48,3.39H0.94C0.42,3.39,0,3.81,0,4.33c0,0.52,0.42,0.94,0.94,0.94h2.91L5.2,29.12 C5.23,29.61,5.64,30,6.14,30h17.75c0.5,0,0.91-0.39,0.94-0.89l1.33-23.85h2.91c0.52,0,0.94-0.42,0.94-0.94 C30,3.81,29.58,3.39,29.06,3.39z M11.53,1.87h6.95v1.52h-6.95V1.87z M23,28.13H7.02L5.72,5.27h18.55L23,28.13z M9.42,25.48 L8.44,8.11C8.41,7.59,8.8,7.15,9.32,7.12C9.83,7.1,10.28,7.48,10.31,8l0.99,17.38c0.03,0.52-0.37,0.96-0.88,0.99 c-0.02,0-0.04,0-0.05,0C9.86,26.37,9.45,25.98,9.42,25.48z M18.67,25.38L19.66,8c0.03-0.52,0.48-0.91,0.99-0.88 c0.52,0.03,0.91,0.47,0.88,0.99l-0.99,17.38c-0.03,0.5-0.44,0.88-0.93,0.88c-0.02,0-0.04,0-0.05,0 C19.04,26.34,18.64,25.89,18.67,25.38z M14.06,25.43V8.05c0-0.52,0.42-0.94,0.94-0.94c0.52,0,0.94,0.42,0.94,0.94v17.38 c0,0.52-0.42,0.94-0.94,0.94C14.48,26.37,14.06,25.95,14.06,25.43z"
                        />
                    </svg>
                </button>

                <button
                    disabled={!timeExists || !account}
                    className="time-button"
                    onClick={() => logTimer(timerName)}
                    title="Share with TeamWork (Log time)"
                >
                    <svg width="30" height="30" version="1.1" viewBox="0 0 30 30">
                        <path d="M29.06,23.31v5.75c0,0.52-0.42,0.94-0.94,0.94H1.87c-0.52,0-0.94-0.42-0.94-0.94v-5.75 c0-0.52,0.42-0.94,0.94-0.94s0.94,0.42,0.94,0.94v4.81h24.38v-4.81c0-0.52,0.42-0.94,0.94-0.94S29.06,22.79,29.06,23.31z M8.16,8.89 l5.95-5.74v20.17c0,0.52,0.42,0.94,0.94,0.94c0.52,0,0.94-0.42,0.94-0.94V3.15l5.95,5.74c0.18,0.18,0.42,0.26,0.65,0.26 c0.25,0,0.49-0.1,0.67-0.29c0.36-0.37,0.35-0.97-0.02-1.33l-7.53-7.28c-0.04-0.04-0.08-0.05-0.12-0.08 c-0.06-0.04-0.11-0.08-0.17-0.11C15.29,0.03,15.18,0.01,15.06,0c-0.01,0-0.01,0-0.02,0s-0.01,0-0.02,0c-0.11,0-0.23,0.02-0.33,0.07 c-0.06,0.03-0.12,0.07-0.17,0.11c-0.04,0.03-0.09,0.04-0.12,0.08L6.86,7.54C6.48,7.9,6.47,8.5,6.83,8.87 C7.19,9.24,7.79,9.25,8.16,8.89z"/>
                    </svg>
                </button>

                {running && (
                    <button className="time-button time-button--stop" onClick={() => stopTimer(timerName)} title="Stop timer">
                        <svg width="30" height="30" version="1.1" viewBox="0 0 30 30">
                            <path
                                d="M11.8,30H4.86c-0.51,0-0.92-0.42-0.92-0.94V0.94C3.94,0.42,4.35,0,4.86,0h6.94 c0.51,0,0.92,0.42,0.92,0.94v28.13C12.72,29.58,12.31,30,11.8,30z M5.78,28.13h5.09V1.88H5.78V28.13z"
                            />
                            <path
                                d="M25.14,30H18.2c-0.51,0-0.92-0.42-0.92-0.94V0.94C17.28,0.42,17.69,0,18.2,0h6.94 c0.51,0,0.92,0.42,0.92,0.94v28.13C26.06,29.58,25.65,30,25.14,30z M19.12,28.13h5.09V1.88h-5.09V28.13z"
                            />
                        </svg>
                    </button>
                )}
                {!running && (
                    <button className="time-button" onClick={() => startTimer(timerName)} title="Start timer">
                        <svg width="30" height="30" version="1.1" viewBox="0 0 30 30">
                            <path
                                d="M4.75,30c-0.16,0-0.31-0.04-0.45-0.12C4,29.72,3.81,29.4,3.81,29.06V0.94C3.81,0.6,4,0.28,4.3,0.12 c0.3-0.17,0.66-0.16,0.95,0.02l22.5,14.06c0.27,0.17,0.44,0.47,0.44,0.8c0,0.32-0.17,0.62-0.44,0.79L5.25,29.86 C5.1,29.95,4.92,30,4.75,30z M5.69,2.63v24.74L25.48,15L5.69,2.63z"
                            />
                        </svg>
                    </button>
                )}

                <div className="time-total">
                    {secondsToHMS(existingTime).hours}:{secondsToHMS(existingTime).minutes}:
                    {secondsToHMS(existingTime).seconds}
                </div>
            </div>
        </div>
    )
}

export default TimeCard

const totalTime = entries => {
    return entries.reduce((acc, curr) => {
        if (curr.end) {
            acc = acc + (curr.end / 1000 - curr.start / 1000)
        }
        return Math.round(acc)
    }, 0)
}

function secondsToHMS(seconds) {
    const pad = n => (n < 10 ? '0' : '') + n
    return {
        hours: pad((seconds / 3600) | 0),
        minutes: pad(((seconds % 3600) / 60) | 0),
        seconds: pad(seconds % 60 | 0)
    }
}
