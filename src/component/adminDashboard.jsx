
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import './../css/adminDashboard.css';
import axios from 'axios';

class AdminDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            tabData: []
        }
    }

    componentWillMount() {
        if(localStorage.getItem('userData'))
            console.log("call user fees");
        else
            this.setState({redirect: true});   
    }

    async componentDidMount() {
        var apiBaseUrl = "http://localhost:5000/api/";
        var self = this;
        var obj =[]; 
        const dataTab = await axios.get(apiBaseUrl+'users');
        dataTab.data.map( value => {
            obj.push({
                fname: value.firstName,
                lname: value.lastName,
                email: value.email,
                age: value.age,
                phoneNo: value.phoneNo,
                id: value._id
            });
            this.setState({ tabData:  obj});
        })
        console.log("This is the filtered user data", this.state.tabData);
    }

    // handleEdit (getRow) {
    //     console.log("Edit is called", getRow);
    // }

    async handleDelete (getRow) {
        var apiBaseUrl = "http://localhost:5000/api/";
        var self = this;
        var userObj =[]; 
        const dataTab = await axios.delete(apiBaseUrl+'users/' + getRow.original.id);
        dataTab.data.map( value => {
            userObj.push({
                fname: value.firstName,
                lname: value.lastName,
                email: value.email,
                age: value.age,
                phoneNo: value.phoneNo,
                id: value._id
            });
            this.setState({ tabData:  userObj});
        })
    }

    render(){        
        const columns = [
            { Header: 'First Name', accessor: 'fname' },
            { Header: 'Last Name', accessor: 'lname'},  //, Cell: props => <span className='number'>{props.value}</span> 
            { Header: 'Email', accessor: 'email', disable: true },
            { Header: 'Age', accessor: 'age' },
            { Header: 'Phone', accessor: 'phoneNo' },
            { Header: '', 
                Cell: row => (
                    <div>
                        {/* <button className="btn btn-success userWarningBtn" onClick={ () => this.handleEdit(row)}>Edit</button> */}
                        <button className="btn btn-primary userPrimaryBtn" onClick={ () => this.handleDelete(row)}>Delete</button>
                    </div>
            )}
        ];


        if(this.state.redirect)
            return(<Redirect to='/login'/>)

        return(
            <div>
                <div className="addNewUser">
                    <button className="btn btn-success">Add New User</button>
                </div>
                <div className="adminTable">
                    <ReactTable data={this.state.tabData} columns={columns} defaultPageSize={10} minRows={1}/>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;





// var apiBaseUrl = "http://localhost:5000/api/";
// var self = this;
// var obj =[]; 
// axios.get(apiBaseUrl+'users')
//     .then((response) => {
//         if(response.status == 200){
        
//         }
//     }).catch((error) => {
//         console.log(error);
//     });
// }