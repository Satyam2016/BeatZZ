import React from 'react';
import { loginEndpoint } from '../spotify';

export default function Login() {
  return (
    <div  className="h-full  w-full">
    <div className="flex items-center justify-center  bg-gradient-to-br from-black to-[#121286]">
        <a href={loginEndpoint} >
          <div className="text-2xl">LOG IN</div>
        </a>
        </div>
    </div>
  );
}
