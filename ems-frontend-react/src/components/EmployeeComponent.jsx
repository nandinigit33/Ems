import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {
// state variables
    const [firstName, setFirstName] = useState('')
    const[lastName, setLastName]= useState('')
    const[email, setEmail]= useState('')

    const {id} = useParams();

    const [errors, setErrors] = useState({
    firstName : '',
    lastName: '',
    email: ''
})
    const navigator = useNavigate();

    useEffect(() =>{
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

// function handleFirstName(e){
// setFirstName(e.target.value);
// }
//arrow function-if arrow functuion has a single statement in the body we can remove braces 
//Also we can directly paste this arraow function value in the onChange value
// const handleFirstName = (e) =>  setFirstName(e.target.value);
    

// function handleLastName(e){
//     setLastName(e.target.value);
//     }
// const handleLastName = (e) => {
//     setLastName(e.target.value);
//     }

// //     function handleEmail(e){
// //         setEmail(e.target.value);
// //         }
//     const handleEmail = (e) => {
//         setEmail(e.target.value);
//         }

        //function saveEmployee(e){
            function saveOrUpdateEmployee(e){
            e.preventDefault();

            if(validateForm()){

                const employee = {firstName, lastName, email}
                console.log(employee)

                if(id){
                    updateEmployee(id, employee).then((response) => {
                        console.log(response.data);
                        navigator('/employees');
                    }).catch(error => {
                        console.error(error);
                    })
                }else{
                    //to send  form submission data
                    createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                    }).catch(error => {
                        console.error(error);
                    })
                } 
        }
    }

//function to check the form data for validation
function validateForm(){
    let valid = true;
//use spread operator to copy an object into another object, here copying errors to errorsCopy
    const errorsCopy = {... errors}

    if(firstName.trim()){
        errorsCopy.firstName = '';
    } else {
        errorsCopy.firstName = 'First Name is required';
        valid = false;
    }

    if(lastName.trim()){
        errorsCopy.lastName = '';
    } else {
        errorsCopy.lastName = 'Last Name is required';
        valid = false;
    }

    if(email.trim()){
        errorsCopy.email = '';
    } else {
        errorsCopy.email = 'Email is required';
        valid = false;
    }

    setErrors(errorsCopy);

    return valid;
}

function pageTitle(){
if(id){
    return <h2 className='text-center'>Update Employee</h2>
}else{
   return <h2 className='text-center'>Add Employee</h2>

    }
}   
  return (
    
               
                   <div className = "container">
                   <br></br>
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {/* <h2 className='text-center'>Add Employee</h2> */}
                                {
                                    pageTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group mb-2">
                                            <label className='form-label'> First Name: </label>
                                            <input type = 'text' placeholder="Enter First Name" name="firstName" 
                                            // className="form-control" 
                                            //Note that symbol is different before form-control
                                            className={`form-control ${errors.firstName ? 'is-invalid': ''}`} 
                                            value={firstName} 
                                                // onChange={handleFirstName}></input>
                                                onChange={(e) =>  setFirstName(e.target.value)}>
                                                </input>
                                                { errors.firstName && <div className='invalid-feedback'> { errors.firstName} </div>}
                                        </div>

                                        <div className = "form-group mb-2">
                                            <label className='form-label'> Last Name: </label>
                                            <input type = 'text' placeholder="Enter Last Name" name="lastName" 
                                            // className="form-control" 
                                            className={`form-control ${errors.lastName ? 'is-invalid': ''}`} 

                                                value={lastName} 
                                                // 
                                                onChange={(e) => setLastName(e.target.value)}></input> 
                                                { errors.lastName && <div className='invalid-feedback'> { errors.lastName} </div>}
        
                                        </div>

                                        <div className = "form-group mb-2">
                                            <label className='form-label'> Email: </label>
                                            <input type = 'email' placeholder="Enter Email" name="email" 
                                            // className="form-control" 
                                            className={`form-control ${errors.email ? 'is-invalid': ''}`} 

                                                value={email} 
                                                // onChange={handleEmail}></input>
                                                onChange={(e) => setEmail(e.target.value)}></input>
                                                { errors.email && <div className='invalid-feedback'> { errors.email} </div>}

                                        </div>

                                        {/* <button className="btn btn-success" onClick={saveEmployee}>Submit</button> */}
                                        <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
           
  )
}

export default EmployeeComponent