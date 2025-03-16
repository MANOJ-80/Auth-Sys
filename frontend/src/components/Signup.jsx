import { useState } from 'react';
import { signupFields } from "../constants/formField"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from 'axios'
import { useNavigate} from 'react-router-dom'

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const navigate = useNavigate();

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount=()=>{
    const { username, 'email-address': email, password, 'confirm-password': confirmPassword } = signupState;

    console.log("User Info:", username, email, password, confirmPassword);
    
    
    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }
    
    axios.post('http://localhost:5000/register', {
      name: username,  
      email,
      password
    })

     .then(response => {
        {console.log(response)
          navigate('/')
        }
        
        alert('Account created successfully!');
      })
      .catch(err => console.log(err))
      
  }    

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>

         

      </form>
    )
}