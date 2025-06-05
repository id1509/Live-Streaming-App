import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home=()=>{
    const [id, setId]=useState('')
    const navigate=useNavigate()
    return(
        <div className='flex items-center justify-center h-screen'>
            <input type="text" placeholder='Enter Room ID' value={id} onChange={(e)=>setId(e.target.value)} className='border-2 rounded-md px-4 py-2 border-teal-400' />
            <button type='submit' onClick={()=>navigate(`/room/${id}`)} className='mx-4 bg-lime-400 rounded-xl px-4 py-2'>JOIN</button>
        </div>
    )
}

export default Home