import { useState } from 'react'
import './Account.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { DevTool } from "@hookform/devtools";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = () => {

  const navigate = useNavigate();

  const letsGo = "Let's go"

  const schema = Yup.object({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    phonenumber: Yup.string().required('Phone Number is required').max(11),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
    passwordrepeat: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password Repeat is required').min(8, 'Password Repeat must be at least 8 characters').matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password Repeat must contain at least 8 characters, one uppercase, one number and one special case character"),
    email: Yup.string().email('Enter a valid Email-Address').required('Email is required')
  })

  const form = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      password: '',
      passwordrepeat: '',
      phonenumber: '',
      email: ''
    },
    resolver: yupResolver(schema)
  });

  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, formState, reset } = form;

  const showPasswordHandler = () => {
    setShow(!show)
  }

  const showPasswordHandlerTwo = () => {
    setShowTwo(!showTwo)
  }


  console.log(formState)

  const { errors, isSubmitSuccessful } = formState;

  // useEffect(() => {

  //   const fetchData = async () => {
  //     const response = await axios.get('https://ecommerce-web-app-b2b2d-default-rtdb.firebaseio.com/.json');
  //     const existingData = response.data;
  //     console.log("compare emails",Object.values(existingData))?.map(items => items.email === getValues('email'))
  //   }

  //   fetchData()

  // }, [])


  const submitHandler = async (data) => {

    const response = await axios.get('https://ecommerce-web-app-b2b2d-default-rtdb.firebaseio.com/.json');
    const existingData = response.data;

    const emailExist = Object.values(existingData)?.find(items => items.email === data.email);

    if (emailExist) {
      setError(true)
      return
    } else {
      try {
        setLoading(true)
        axios.post('https://ecommerce-web-app-b2b2d-default-rtdb.firebaseio.com/.json', data)
        console.log(data)
        navigate('/login')
      } catch (error) {
        setLoading(false)
        console.log(error)
      }

    }

  }


  useEffect(() => {

    if (isSubmitSuccessful) {
      reset()

    }


  }, [isSubmitSuccessful, reset])


  return (
    <div>
      <div className='h-fit py-7 w-[750px] mt-10 m-auto backdrop-blur-sm border-2 shadow-2xl border-black'>
        <div className='flex flex-col text-center font-thin'>
          <h3 className='mt-10 text-5xl'>Welcome</h3>
          <h4 className='mt-4 text-2xl font-semibold animate-bounce'>Sign up to continue</h4>
        </div>

        <form className='form' onSubmit={handleSubmit(submitHandler)} >
          <div className='flex m-auto mt-20 mb-3 nameForm'>
            <label htmlFor="firstname"></label>
            <input type="text" id='firstname' className='w-80 m-auto focus:border-2 focus:border-black focus:shadow-md focus:shadow-black' placeholder='First Name' {...register('firstname', { required: { value: true, message: 'First Name is required' } })} />
            <label htmlFor="lastname"></label>
            <input type="text" id='lastname' className='w-80 m-auto focus:border-2 focus:border-black focus:shadow-md focus:shadow-black' placeholder='Last Name' {...register('lastname', { required: { value: true, message: 'Last Name is required' } })} />
          </div>
          <div className='grid grid-cols-2 text-center font-semibold'>
            <p className='text-red-500'>{errors.firstname?.message}</p>
            <p className='text-red-500'>{errors.lastname?.message}</p>
          </div>


          <div className='flex flex-col p-7 passForm'>
            <label htmlFor="password"></label>
            <input type={show === false ? 'password' : 'text'} id='password' className='focus:border-2 focus:border-black focus:shadow-md focus:shadow-black' placeholder='Password' {...register('password', { required: { value: true, message: 'Password is required' } })} />
            <button onClick={showPasswordHandler}>{show === false ? <VisibilityIcon className='absolute right-10 -mt-[2.1rem] cursor-pointer passIcon' /> : <VisibilityOffIcon className='absolute right-10 -mt-[2.1rem] cursor-pointer' />}</button>
            <p className='text-red-500 mt-2 text-justify font-semibold'>{errors.password?.message}</p>
            <label htmlFor="passwordrepeat"></label>
            <input type={showTwo === false ? 'password' : 'text'} id='passwordrepeat' className='mt-5 focus:border-2 focus:border-black focus:shadow-md focus:shadow-black' placeholder='Repeat Password' {...register('passwordrepeat', { required: { value: true, message: 'Password Repeat is required' } })} />
            <button onClick={showPasswordHandlerTwo}>{showTwo === false ? <VisibilityIcon className='absolute right-10 -mt-[2.1rem] cursor-pointer passIcon' /> : <VisibilityOffIcon className='absolute right-10 -mt-[2.1rem] cursor-pointer' />}</button>
            <p className='text-red-500 mt-2 text-justify font-semibold'>{errors.passwordrepeat?.message}</p>
          </div>
          <div className='mt-3 flex m-auto nameForm'>
            <label htmlFor="email"></label>
            <input type="text" id='email' className='w-80 m-auto focus:border-2 focus:border-black focus:shadow-md focus:shadow-black' placeholder='Email' {...register('email', { required: { value: true, message: 'Enter a valid Email-Address' } })} />
            <label htmlFor="phonenumber"></label>
            <input type="text" id='phonenumber' className='w-80 m-auto focus:border-2 focus:border-black focus:shadow-md focus:shadow-black' placeholder='Phone Number' {...register('phonenumber', { required: { value: true, message: 'Enter a valid phone number' } })} />
          </div>
          <div className='grid grid-cols-2 text-center font-semibold'>
            <p className='text-red-500  mt-2'>{errors.email?.message}</p>
            <p className='text-red-500  mt-2'>{errors.phonenumber?.message}</p>
          </div>
          <div className='flex justify-center mt-10'>
            <button type='submit' className='py-3 px-6 bg-black text-white btn-signup text-xl hover:scale-110 active:scale-95 transition-all active:bg-white active:text-black active:border-2 active:border-black'>{loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : <>{letsGo}<ArrowForwardIcon className='ml-1 -mt-[1.5px]' /></>}</button>
          </div>



          <div className='flex justify-center mt-5 font-semibold'>{error ? <p className='text-red-500 font-semibold text-xl'>Email already exists. Please enter another Email-Address</p> : null}</div>
          <div className='flex justify-center mt-10'>
            <h3>Already have an account? <Link to="/login" className='font-semibold '>Sign in</Link></h3>
          </div>
        </form>
      </div>
      <DevTool control={control} />
    </div>
  )
}

export default Account