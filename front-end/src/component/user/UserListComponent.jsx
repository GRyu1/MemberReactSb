import React , {Component} from "react";
import ApiService from "../../ApiService";

import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography } from "@mui/material";
import { Create, Delete } from "@mui/icons-material";


class UserListComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            users: [],
            message: null
        }
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList = () => {
        ApiService.fetchUsers()
            .then(resp => {
                this.setState({
                    users: resp.data
                })
            })
        .catch(err => {
            console.log('reloadUserList() Error!', err);
        })
    }

    deleteUser = (userID) => {
        ApiService.deleteUser(userID)
        .then( resp => {
            this.setState({
                message : 'User Deleted Successfully.'
            });

            this.setState({
                users: this.state.users.filter( user => user.id !== userID)
            });
        })
        .catch(err => {
            console.log('deleteUser() Error!', err);
        })
    }

    editUser = (ID) => {
        window.localStorage.setItem("userID", ID);
        this.props.history.push('/edit-user');
    }

    addUser = () => {
        window.localStorage.removeItem("userID")
        this.props.history.push('/add-user');
    }

    render() {

        return(
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>

                <Typography variant="h3" component="h3" style={style}>User List</Typography>
                <Button variant="contained" color="primary" onClick={this.addUser}>Add User</Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>FirstName</TableCell>
                            <TableCell align="right">LastName</TableCell>
                            <TableCell align="right">UserName</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Salary</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map(user =>
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="user">{user.id}</TableCell>
                                <TableCell align="right">{user.firstName}</TableCell>
                                <TableCell align="right">{user.lastName}</TableCell>
                                <TableCell align="right">{user.username}</TableCell>
                                <TableCell align="right">{user.age}</TableCell>
                                <TableCell align="right">{user.salary}</TableCell>
                                <TableCell align="right" onClick={ 
                                        ()=>this.editUser(user.id)}><Create/></TableCell>
                                <TableCell align="right" onClick={
                                        ()=>this.deleteUser(user.id)}><Delete/></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                            )}
                    </TableBody>
                </Table>
            </div>
        );

    }
}

const style = {
    display : 'flex',
    justifyContent : 'center',
    color: 'black',
}

export default UserListComponent;