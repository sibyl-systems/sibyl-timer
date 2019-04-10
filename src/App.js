import './App.css'

import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import RouteIf from './helpers/RouteIf'

// import Setup from './pages/Setup'
// import Dashboard from './pages/Dashboard'
import ProjectList from './pages/ProjectList'

import { connect } from 'react-redux'

import { submitApiKey, reorderTimer } from './store/actions'

const App = (props) => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" 
                    render={() => (
                        <ProjectList {...props} />
                    )} 
                />
                {/* <Route exact path="/" 
                    render={() => (
                        <Setup {...props} />
                    )} 
                />
                <RouteIf condition={props.user.apikey} redirect="/" path="/dashboard" exact component={Dashboard} /> */}
            </Switch>
        </BrowserRouter>
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
