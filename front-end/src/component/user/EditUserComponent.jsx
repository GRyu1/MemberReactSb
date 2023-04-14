import React, { Component } from "react";
import ApiService from "../../ApiService";

import { TextField, Button , Typography } from "@mui/material";

class EditUserComponent extends Component{
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

    componentDidMount(){
        this.loadUser();
    }

    loadUser = () =>{
        ApiService.fetchUserById(window.localStorage.getItem("userID"))
        .then(resp =>{
            let user = resp.data;
            this.setState({
                id: user.id,
                username : user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                age : user.age,
                salary: user.salary
            })
        })
        .catch(err => {
            console.log('loadUser() 에러', err)
        });
    }
    onChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        });
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

        ApiService.editUser(user)
        .then(resp => {
            this.setState({
                message : user.lastName + '님 정보가 수정되었습니다.'})
                this.props.history.push('/users');
        })
        .catch(err => {
            console.log('saveUser() 에러', err);
        })
        
    }

    render(){
        return(
            <div>
                <Typography variant="h1" component="h2" style={style}>Edit User</Typography>;
                <form>
                    <TextField type="text" readOnly={true} fullWidth margin="normal" placeholder="please edit your username" name="username" value={this.state.username} onChange={this.onChange} />
                    <TextField fullWidth margin="normal" type="password" placeholder="please edit your password" name="password" value={this.state.password} onChange={this.onChange} />                        
                    <TextField fullWidth margin="normal" placeholder="please edit your first name" name="firstName" value={this.state.firstName} onChange={this.onChange}/>
                    <TextField fullWidth margin="normal" placeholder="please edit your last name" name="lastName" value={this.state.lastName} onChange={this.onChange}/>
                    <TextField fullWidth margin="normal" type="number" placeholder="please edit your age" name="age" value={this.state.age} onChange={this.onChange} />
                    <TextField fullWidth margin="normal" type="number" placeholder="please edit your salary" name="salary" value={this.state.salary} onChange={this.onChange} />
                    <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
                </form>
            </div>
        )
    }
}
const style = {
    display : 'flex',
    justifyContent : 'center',
}

export default EditUserComponent; 