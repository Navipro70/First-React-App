import {followingCreator} from "../../redux/users-reducer";
import Users from "./Users";
import {connect} from "react-redux";

let mapStateToProps = state => {
    return {
        users: state.usersPage.users,
    }
}

let mapDispatchToProps = dispatch => {
    return {
        following: id => dispatch(followingCreator(id)),
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;


