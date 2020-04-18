import React from "react";
import "./App.css";
import {Redirect, Route, withRouter, Switch} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import News from "./Components/News/News";
import Settings from "./Components/Settings/Settings";
import UsersProvider from "./Components/Users/UsersContainer";
import ProfileProvider from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import LoginContainer from "./Components/Login/LoginContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {thunkInitializing} from "./redux/app-reducer";
import Preloader from "./Components/Common/Preloader";

class App extends React.Component {
    componentDidMount() {
        this.props.thunkInitializing()
    }

    render() {
        if (!this.props.initialized) return <Preloader />;
        return (
            <div className="app-wrapper container">
                <HeaderContainer/>
                <Navbar/>
                <div className="content">
                    <Switch>
                        <Route path="/profile/:userId?" render={() => <ProfileProvider/>}/>
                        <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                        <Route path="/users" render={() => <UsersProvider/>}/>
                        <Route path="/news" render={() => <News/>}/>
                        <Route path="/settings" render={() => <Settings/>}/>
                        <Route path="/login" render={() => <LoginContainer/>}/>
                        <Route path="/" render={() => <Redirect to="/profile" />}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    initialized: state.app.initialized
});

export default compose(
    withRouter,
    connect(mapStateToProps, {
        thunkInitializing
    })
)(App);
