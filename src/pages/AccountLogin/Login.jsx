import { useContext, useEffect, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const { auth, setAuth } = useContext(AuthContext);

    const [error, setError] = useState(false);

    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const navigateToHome = () => {
        setOpen(false)
        setTimeout(() => {
            navigate('/')
        }, 500);
    }

    const navigate = useNavigate()

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,

    };




    const schema = Yup.object({
        email: Yup.string().email('Enter a valid email format').required('Email is required'),
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
    })

    const form = useForm({
        defaultValues: {
            password: '',
            email: ''
        },
        resolver: yupResolver(schema)
    });


    const [show, setShow] = useState(false);

    const showPasswordHandler = () => {
        setShow(!show)
    }

    const { register, handleSubmit, formState, reset } = form;

    const { errors, isSubmitSuccessful } = formState;

    const submitHandler = async (data) => {

        const response = await axios.get('https://ecommerce-web-app-b2b2d-default-rtdb.firebaseio.com/.json');
        const existingData = response.data;

        const emailExist = Object.values(existingData)?.find(items => items.email === data.email && items.password === data.password);

        if (emailExist) {
            setAuth(true)
            setOpen(true)
        } else {
            setError(true)
            setOpen(true)
        }

        console.log('Data:', data)
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset()
        }


    }, [isSubmitSuccessful, reset])



    return (
        <div>
            <div className='h-[800px] w-[750px] mt-10 m-auto backdrop-blur-sm border-2 shadow-2xl border-black'>

                <div className='flex flex-col text-center font-thin'>
                    <h3 className='mt-10 text-5xl'>Welcome Back</h3>
                    <h4 className='mt-4 text-2xl font-semibold animate-bounce'>Login to continue</h4>
                </div>

                <form className='form mt-10' onSubmit={handleSubmit(submitHandler)}>
                    <div className='mt-3 flex m-auto'>
                        <label htmlFor="Email"></label>
                        <input type="text" id='Email' className='w-80 m-auto focus:border-2 focus:border-black focus:shadow-md focus:shadow-black' placeholder='Email' {...register('email', { required: { value: true, message: 'Enter a valid Email-Address' } })} />
                    </div>
                    <div className='flex justify-center text-center font-semibold mt-3'>
                        <p className='text-red-500'>{errors.email?.message}</p>
                    </div>
                    <div className='flex flex-col p-7 -mt-1'>
                        <label htmlFor="Password"></label>
                        <input type={show === false ? 'password' : 'text'} id='Password' className='w-80 m-auto focus:border-2 focus:border-black focus:shadow-md focus:shadow-black' placeholder='Password' {...register('password', { required: { value: true, message: 'Password is required' } })} />
                        <button onClick={showPasswordHandler}>{show === false ? <VisibilityIcon className='absolute right-56 -mt-[2.1rem] cursor-pointer' /> : <VisibilityOffIcon className='absolute right-56 -mt-[2.1rem] cursor-pointer' />}</button>
                    </div>
                    <div className='flex justify-center text-center font-semibold'>
                        <p className='text-red-500 -mt-4'>{errors.password?.message}</p>
                    </div>
                    <div className='flex justify-center mt-5'>
                        <button className='py-3 px-6 bg-black text-white btn-signup text-xl hover:scale-110 active:scale-95 transition-all active:bg-white active:text-black active:border-2 active:border-black'>Login<ArrowForwardIcon className='ml-1 -mt-[1.5px]' /></button>
                    </div>
                    <div>
                        {auth ? <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <h3 className='text-green-500 text-center mb-5 text-4xl'>Awesome!</h3>
                                <Typography id="modal-modal-description" sx={{ mt: 1 }} className='text-center'>
                                    You have successfully logged in.
                                </Typography>

                                <button onClick={navigateToHome} className='bg-green-500 text-white h-10 w-16 flex justify-center items-center mt-4 m-auto hover:bg-white hover:border-2 hover:border-green-500 transition-all hover:text-green-500 active:scale-90'>Ok</button>
                            </Box>
                        </Modal> : null}
                        {error ? <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <h3 className='text-red-500 text-center mb-5 text-4xl'>Invalid Email!</h3>
                                <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: '1.1em' }} className='text-center'>
                                    Your email or password is not correct. Please try again
                                </Typography>

                                <button onClick={handleClose} className='bg-red-500 text-white h-10 w-16 flex items-center justify-center mt-4 m-auto hover:bg-white hover:border-2 hover:border-red-500 transition-all hover:text-red-500 active:scale-90'>Ok</button>
                            </Box>
                        </Modal> : null}
                    </div>
                    <div className='flex justify-center mt-10'>
                        <h3>{`Don't have an account yet?`}<Link to="/signup" className='font-semibold '> Sign up</Link></h3>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login