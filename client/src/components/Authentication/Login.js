import React from 'react';
import Button from './Button';
import {FaGithub,FaGoogle,FaFacebook} from 'react-icons/fa';


const Login = () => {
   
    
    return (
        <div className='h-screen flex bg-red-bg1'>
              <div className='w-full inline-block  max-w-md m-auto    bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-10'>
               
{/*            
c
            
            {/* <Button text="Log in with Google"  >
                {/* <svg class="h-12 w-12 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M17.788 5.108A9 9 0 1021 12h-8" /></svg> */}
            {/* </Button>
            <Button text="Log in with Github"   ></Button>
            <Button text="Log in with Facebook" ></Button> */}
             
             <button className='  px-1  px-3'><FaGithub ></FaGithub>Github</button>
             <button className= ' px-3'><FaGoogle></FaGoogle>Google</button>
             <button className='  px-3'><FaFacebook></FaFacebook>Facbook</button>
            </div> 
         </div>
    );
};

export default Login;
