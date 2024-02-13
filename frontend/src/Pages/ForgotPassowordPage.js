import React , {useState} from 'react'
import axios from 'axios'
import ButtonComp from "../Components/ButtonComp";
import Form from "react-bootstrap/Form";


const ForgotPassowordPage = () => {
    const url = "http://127.0.0.1:8000/api/forgot_password/"
    const [email, setEmail] = useState()
    const [message, setMessage] = useState("");

    const fetchUser = async (e) =>{
        e.preventDefault();
        if (!email) return alert("please enter a valid email") 
        try {
            const response = await axios.post(`${url}`,{email :email}, {
            headers : {
                "Content-Type" : "application/json"
            }
        } )
        if(response.status == 200){
            setMessage("Reset email sent successfully, check your email")
        }
    }catch (error) {
        console.error("Error sending email:", error);
        setMessage("Invalid Email, please enter a valid email")

      }}

  return (
    <div className="flex flex-col items-center w-full pb-32 mb-16  text-black">
    <Form onSubmit={fetchUser} className="flex flex-col mt-20 mb-3 w-1/5">
      <Form.Group className="mb-3" controlId="formBasicEmail" onChange = {(e)=>{ setEmail(e.target.value)}}>
        <Form.Control type="text" placeholder="email" name="email" className="bg-gray-100" />
        {message? <Form.Text className="text-muted">{message}</Form.Text>: <Form.Text className="text-muted">Enter the email associated with the account</Form.Text>}
        
      </Form.Group>
     <div className="flex flex-col items-center">
     <ButtonComp text = "Confirm" />
     </div>
    </Form>
  </div>
  )
}

export default ForgotPassowordPage