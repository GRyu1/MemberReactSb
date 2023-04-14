import React , {Component} from "react";
import ApiService from "../../ApiService";

import { TextField, Button , Typography } from "@mui/material";

class AddUserComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            firstName: '',
            lastName: '',
            age : '',
            salary : '',
            message : null 
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveUser = (e) => {
        e.preventDefault();

        let user = {
            username : this.state.username,
            password : this.state.password,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            age : this.state.age,
            salary : this.state.salary,
        }

        ApiService.addUser(user)
        .then(resp => {
            this.setState({
                message: user.username + '님이 성공적으로 등록되었습니다.'
            })
            console.log(this.state.message);
            this.props.history.push('/users');
        })
        .catch(err => {
            console.log('saveUser() 에러', err)
        });
    }

    render (){
        return(
            <div>
                <Typography variant="h4" style={style}>Add User</Typography>
                <form style={formContainer}>
                    <TextField type="text" fullWidth margin="normal" placeholder="please input your username" name="username" value={this.state.username} onChange={this.onChange} />
                    <TextField fullWidth margin="normal" type="password" placeholder="please input your password" name="password" value={this.state.password} onChange={this.onChange} />                        
                    <TextField fullWidth margin="normal" placeholder="please input your first name" name="firstName" value={this.state.firstName} onChange={this.onChange}/>
                    <TextField fullWidth margin="normal" placeholder="please input your last name" name="lastName" value={this.state.lastName} onChange={this.onChange}/>
                    <TextField fullWidth margin="normal" type="number" placeholder="please input your age" name="age" value={this.state.age} onChange={this.onChange} />
                    <TextField fullWidth margin="normal" type="number" placeholder="please input your salary" name="salary" value={this.state.salary} onChange={this.onChange} />
                    <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
                </form>
            </div>
        );
    }
}
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
}

const style = {
    display:'flex',
    justifyContent: 'center',
    color : 'black'
}

export default AddUserComponent;