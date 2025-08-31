import React, { useState } from 'react'
import "./Login.css"
import logo from "../../assets/logo.png"
import { login, signup } from "../../firebase"
import netflix_spinner from "../../assets/netflix_spinner.gif"

const Login = () => {
  const [loading, setLoading] = useState(false)

  const [signState, setSignState] = useState("Sign In")

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (event)=> {
    event.preventDefault();
    setLoading(true)
    if(signState==="Sign In"){
      await login(email, password)
    }
    else{
      await signup(name,email,password)
    }
    setLoading(false)
  }

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className="login">
      <img src={logo} alt="" className='login-logo'/>
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState ==="Sign Up"?
          <input type="text" value={name} onChange={(e)=>{
            setName(e.target.value)}} placeholder="Jarno1352"/>:<></>}
          <input value={email} onChange={(e)=>{
            setEmail(e.target.value)}} type="email" placeholder="Username@email.com"/>
          <input type="password" value={password} onChange={(e)=>{
            setPassword(e.target.value)}}  placeholder="*****"/>
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox"/>
            <label htmlFor="">Remember me</label>
            </div>
          <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign Up"? <p>Already have an account? <span onClick={() => {
            setSignState("Sign In")
          }}>Sign In Now</span></p>:
          <p>New to Bitflix? <span onClick={() => {
            setSignState("Sign Up")
          }}>Sign Up Now</span></p>}
          

          
        </div>
      </div>
    </div>
  )
}

export default Login
