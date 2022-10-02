import React from "react"
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <img
        className="object-fill absolute h-screen w-screen opacity-50 -z-10"
        src={"home.png"}
        alt=""
      />
      <div className="flex flex-col gap-y-10 mb-64 items-center">
        <div className="font-bold text-3xl opacity-100">
          Can you tell the difference between New York City and Toronto?
        </div>
        <Link
          to="/game"
          className="cursor-pointer  p-2 px-12 rounded-md bg-blue-500 hover:bg-blue-600 font-bold text-white"
        >
          START
        </Link>
      </div>
    </div>
  )
}

export default Home
