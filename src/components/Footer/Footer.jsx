import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';

import './Footer.css'
const Footer = () => {
  return (
    <div className='bg-black text-white py-10 h-[350px] mt-[80vh]'>
      <div className='flex justify-around align-middle items-center'>
        <h3 className='text-2xl font-thin'>Stay Connected</h3>
        <Link className='text-3xl font-extralight' to='/'><span className='font-bold font-serif'>MR</span>.BLUE</Link>
        <h3 className='text-2xl font-thin'>Follow Us</h3>
      </div>
      <div className='flex justify-around items-center mt-10'>
        <Link to='/signup' className='text-xl bg-white w-60 ml-2 text-black py-4 text-center'>Sign-Up</Link>
        <p className='w-72 text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, iste! Perferendis sapiente ducimus aut et deserunt impedit dignissimos explicabo fuga.ّ</p>
        <div className='mr-7'>
          <ul className='text-lg'>
            <li className='flex flex-col'>
              <a href="https://github.com/Arka452"><GitHubIcon /> Github</a><a href=""><LinkedInIcon /> LinkedIn</a><a href="/"><FacebookIcon /> Facebook</a><a href="/"><InstagramIcon /> Instagram</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer