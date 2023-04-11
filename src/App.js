import { useState } from 'react';
import './App.css';
import { FaLink, FaCopy, FaWindowClose } from "react-icons/fa"
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
  const clearInputField = () => {
    document.querySelector('[name="url"]').value = "";
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
        <div className='pt-4 md:text-xl text-base font-semibold mx-4 md:font-medium text-center'>MiniLinks is a free tool to shorten a URL.<br />Use our URL Shortener to create a rememberable and easy-to-share URL.</div>
        <form className='my-12 lg:mx-64 mx-4 sm:mx-8 md:mx-12 flex flex-col items-center gap-4 bg-white px-9 py-4 rounded-xl' onSubmit={handleFormSubmit}>
          <div className="flex gap-4 w-full flex-col md:flex-row items-center">
            <div className='flex w-full items-center gap-4'>
              <FaLink className='lg:text-xl text-sm animate-bounce ' />
              <input name="url" type='url' placeholder='Enter the link here' className='py-3 w-full px-2 lg:text-xl md:text-lg focus:outline-none ' />
            </div>
            <button className='bg-black text-white w-full md:w-auto md:px-10 px-6 py-2 rounded-lg disabled:bg-gray-900' disabled={btnState}>
              {btnState ? (<Loading type="points-opacity" color="currentColor" size="sm" />) : 'Minify'}
            </button>
          </div>
          {
            responseBox ? (<><div className='bg-[#f6f5fa] rounded-md px-4 py-4 w-full'>
              <div className='flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center'>
                <a target='_blank' rel="noreferrer noopener" className='underline underline-offset-4 text-sm sm:text-base' href={shortUrl}>{shortUrl}</a>
                <div className='flex items-center gap-4'>
                  <div className='flex gap-3'>
                    <Button className='mx-3 sm:mx-0' onClick={() => { copyToClipboard(shortUrl) }} auto type="button" size={'sm'} flat color={'secondary'}>Copy &nbsp;<FaCopy className="text-sm" /></Button>
                    <div className='flex sm:hidden items-center justify-center w-full'>
                      <div onClick={() => { setVisibility(false); clearInputField(); }} className='py-1 px-10 rounded-xl bg-[#fdd8e5] text-[#f31260] cursor-pointer font-bold'>X</div>
                    </div>
                  </div>
                  <div onClick={() => { setVisibility(false); clearInputField(); }} className='hidden sm:block h-full p-2 cursor-pointer hover:bg-gray-200 font-bold'>X</div>
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
