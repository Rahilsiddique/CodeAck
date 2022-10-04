import React from 'react'
import PropTypes from 'prop-types'

function Card(props) {
  return (
     <div className='text-[#000300]  bg-white w-full '>
            
                <div className='w-full   shadow-xl flex flex-col p-8 my-4 rounded-lg mx-2 hover:scale-105 duration-300 '>
                    {/* <img className='mx-auto w-20 py-[-3rem] bg-white' src={Icon} alt='/'></img> */}
                    <h2 className='text-left font-bold  px-10 py-5 text-1xl'>What is CodeAck?</h2>
                    <p className='text-left px-10 text-4xl font-bold'>CODE for CAUSE!</p>
                    <div className='text-center py-4 px-3   font-medium'>
                        <p className='py-2 mx-8 mt-8 border-b text-left'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </p>
                        {/* <p className='py-2 mx-8 mt-8 border-b'>1 solved</p>
                        <p className='py-2 mx-8 mt-8 border-b'>Send up to </p> */}

                    </div>
                    <button className='bg-[#addbdd] font-medium px-3 w-[200px] mx-auto py-3 rounded-md text-[#000300] '>Get Started </button>

                
                </div>
        </div>
  )
}


export default Card
