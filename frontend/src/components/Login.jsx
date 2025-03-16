import { useState } from 'react';
import { loginFields } from "../constants/formField.js";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from 'axios'
import { useNavigate } from 'react-router-dom' 

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const navigate = useNavigate()

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(loginState)
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () =>{
        const { ['email-address']: email, password } = loginState;

        console.log("User Info:", email, password);


        axios.post('http://localhost:5000/login', { email, password })
    .then(result => {
      if (result.data.message === 'Success') {
        const username = result.data.user.name || result.data.user.email;
        localStorage.setItem('username', username);
        navigate('/home');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}