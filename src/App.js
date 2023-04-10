import { useState } from 'react';
import './App.css';
import { FaLink, FaCopy } from "react-icons/fa"
import { Button, Loading } from "@nextui-org/react"
import { message } from "antd"
// API Request sample: https://apis.webxspark.com/v2.0/mini-links/magic?insert&url=https://ai.webxspark.com/reword-me/ 
function App() {
  const [btnState, setBtnState] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [responseBox, setVisibility] = useState(0);
  const [shortUrl, setShortUrl] = useState("");
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    messageApi.success("Copied to clipboard!");
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const reqData = new URLSearchParams();
    reqData.append('insert', true)
    reqData.append('url', data.get('url'));
    if (!data.get('url') || data.get('url') === "") {
      messageApi.info("Please enter an URL to minify!", 5);
      return;
    }
    setBtnState(true);
    fetch("https://apis.webxspark.com/v2.0/mini-links/magic", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: reqData
    }).then(response => response.json())
      .then(res => {
        setBtnState(false);
        console.log(res)
        if (res.status == 200) {
          var short_url = res.short_url;
          setVisibility(true)
          setShortUrl(short_url);
        }
      })
  }
  return (
    <div className="flex justify-center pt-16">
      <div className='w-full'>
        <div className='text-3xl font-semibold text-center'>MiniLinks</div>
        <div className='pt-4 text-xl text-center'>MiniLinks is a free tool to shorten a URL.<br />Use our URL Shortener to create a rememberable and easy-to-share URL.</div>
        <form className='my-12 mx-64 flex flex-col items-center gap-4 bg-white px-9 py-4 rounded-xl' onSubmit={handleFormSubmit}>
          <div className="flex gap-4 w-full items-center">
            <FaLink className='text-xl animate-bounce ' />
            <input name="url" type='url' placeholder='Enter the link here' className='py-3 w-full px-2 text-xl focus:outline-none ' />
            <button className='bg-black text-white px-10 py-2 rounded-lg disabled:bg-gray-900' disabled={btnState}>
              {btnState ? (<Loading type="points-opacity" color="currentColor" size="sm" />) : 'Minify'}
            </button>
          </div>
          {
            responseBox ? (<><div className='bg-[#f6f5fa] rounded-md px-4 py-4 w-full'>
              <div className='flex justify-between items-center'>
                <a target='_blank' className='underline underline-offset-4' href={shortUrl}>{shortUrl}</a>
                <div className='flex items-center gap-4'>
                  <Button onClick={() => { copyToClipboard(shortUrl) }} auto type="button" flat color={'secondary'}>Copy &nbsp;<FaCopy className="text-sm" /></Button>
                  <div onClick={() => { setVisibility(false) }} className='h-full p-2 cursor-pointer hover:bg-gray-200 font-bold'>X</div>
                </div>
              </div>
            </div></>) : <></>
          }
        </form>
      </div>
      {contextHolder}
    </div>
  );
}

export default App;
