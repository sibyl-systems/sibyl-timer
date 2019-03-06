This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Thanks create react app!

## Available Scripts

See all available scripts in `package.json`

## Known bugs/issues

- ~~Timers when using hotkeys sometimes double time.~~
- ~~Timers when using hotkeys occasionally remove time.~~
- Project lists & task lists are retrived every second when timer is running

## MVP

#### Timers

- Start
- Stop
- Log
- Name / Description

#### Global keys

- Open application
- Start timer
- Stop timer

#### Logging

- Log to project
- Log to task
    - Task select from all
    - Task select from project

## Short-term Roadmap

- Save api key
- Save timers
- Configure hotkeys

- Better design
    - Seperate screen when timer is running
    - Animations

- Graph of start + stop timers with idle time included.

## Roadmap (ideas for the future)

- Auto pause from inactivity
- Regular reminders to stop timer after working hours?
- Option to remove time from a timer left running
- No timer running reminder
- 

## Context

Available contexts:

- CurrentUser
    - () => get account
    - () => setapikey
    - apikey
    - account (json response)

- Timers
    - list (array of current timers)
    - () => start
    - () => stop
    - () => reset
    - () => log

- Projects
    - () => get
    -list
- Tasks
    - () => get
    -list

- LoggedTime
    - list
    - () => add