import React from 'react'
import {toast} from 'react-toastify'
import {useState} from 'react'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { db } from '../firebase.config'
import {setDoc, doc, severTimestamp, serverTimestamp } from 'firebase/firestore'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from'../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'


function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
 // formData can take other ids into its object so that way the onChange can be used globally. 
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) =>({
        ...prevState,
        [e.target.id]: e.target.value
    }))
  };

  const onSubmit = async (e) => {
      e.preventDefault()
     
      try {
         const auth = getAuth()
         
         const userCredential = await createUserWithEmailAndPassword(auth, email, password)

         const user = userCredential.user

         updateProfile(auth.currentUser, {
             displayName: name,
         })

         const formDataCopy = {...formData}
         delete formDataCopy.password
         formDataCopy.timestamp = serverTimestamp()

         await setDoc(doc(db, 'users', user.uid), formDataCopy)

         navigate('/')
      } catch (error) {
          toast.error('Something went wrong with registration')
      }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit} >
          <input
              type="text"
              className="nameInput"
              placeholder="name"
              id="name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <img
                className="showPassword"
                src={visibilityIcon}
                alt="Show Password "
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <Link to ='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
            <div className='signUpBar'>
                <p className='signUpText'>Sign Up</p>
                <button className='signUpButton'>
                    <ArrowRightIcon fill='#ffffff' width ='34px' height='34px'/>
                </button>
            </div>
          </form>
          <OAuth/>
          <Link to='/sign-in' className='registerLink'>
              Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
}
export default SignUp