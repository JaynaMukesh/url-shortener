import { useState } from 'react';
import './App.css';
import { FaLink, FaSpinner } from "react-icons/fa"
import {Loading} from "@nextui-org/react"
// API Request sample: https://apis.webxspark.com/v2.0/mini-links/magic?insert&url=https://ai.webxspark.com/reword-me/ 
function App() {
  const [btnState, setBtnState] = useState(true);
  return (
    <div className="flex justify-center pt-16">
      <div className='w-full'>
        <div className='text-3xl font-semibold text-center'>MiniLinks</div>
        <div className='pt-4 text-xl text-center'>MiniLinks is a free tool to shorten a URL.<br />Use our URL Shortener to create a rememberable and easy-to-share URL.</div>
        <form className='my-12 mx-64 flex items-center gap-4 bg-white px-9 py-4 rounded-xl'>
          <FaLink className='text-xl animate-bounce ' />
          <input type='url' placeholder='Enter the link here' className='py-3 w-full px-2 text-xl focus:outline-none ' />
          <button className='bg-black flex h-full items-center text-white px-10 py-2 rounded-lg disabled:bg-gray-900' disabled={btnState}>
            {btnState ? (<Loading type="points-opacity" color="currentColor" size="sm" />) : 'Minify'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
