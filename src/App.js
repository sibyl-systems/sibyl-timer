import './App.css'

import React from 'react'

import AppLayout from './components/AppLayout'
import { HashRouter, Switch, Route } from 'react-router-dom'
import RouteIf from './helpers/RouteIf'

import Setup from './pages/Setup'
import Dashboard from './pages/Dashboard'

import { connect } from 'react-redux'

import { submitApiKey, reorderTimer } from './store/actions'

const App = props => {
    return (
        <AppLayout>
            <HashRouter>
                <Switch>
                    <Route exact path="/" render={() => <Setup {...props} />} />
                    <RouteIf condition={props.user.apikey} redirect="/" path="/dashboard" exact component={Dashboard} />
                </Switch>
            </HashRouter>
        </AppLayout>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = { submitApiKey, reorderTimer }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
