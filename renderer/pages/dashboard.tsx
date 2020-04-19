import * as React from 'react'
import electron from 'electron'
import Head from 'next/head'
import { resetServerContext } from 'react-beautiful-dnd'
import Board from '../components/Board'
import Styled from 'styled-components'
import Header from '../components/ui/Header'

const ipcRenderer = electron.ipcRenderer || false

const Dashboard = () => {
    const handleSystemSuspended = (event, arg) => {
        console.log('system is being suspended')
    }
    React.useEffect(() => {
        if (ipcRenderer) {
            ipcRenderer.send('app-mounted', 'app ready and listening')
            ipcRenderer.on('system-suspended', handleSystemSuspended)
            return () => {
                ipcRenderer.removeListener('system-suspended', handleSystemSuspended)
            }
        }
    }, [])

    return (
        <>
            <Head>
                <title>Sibyl Timer Dashboard</title>
            </Head>
            <Header />
            <BoardContainer>
                <Board />
            </BoardContainer>
        </>
    )
}

const BoardContainer = Styled.div`
    display: flex;
    overflow: hidden;
    padding-left: 8px;
    padding-right: 8px;
    height: calc(100vh - 56px);
`

Dashboard.getInitialProps = async ctx => {
    if (ctx?.req) resetServerContext()
    return {}
}

export default Dashboard
