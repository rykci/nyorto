import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Game({ api }) {
  const [photos, setPhotos] = useState(null)
  const [answer, setAnswer] = useState(Math.round(Math.random()))
  const [currentPhoto, setCurrentPhoto] = useState(null)
  const [toast, setToast] = useState({ show: false, result: false })
  const [stashedPic, setStashedPic] = useState(null)

  useEffect(() => {
    const getPhotos = async () => {
      let photoArray = [[], []]
      let result1 = await api.search.getPhotos({
        query: "toronto street",
        orientation: "landscape",
        perPage: 30,
      })
      let result2 = await api.search.getPhotos({
        query: "new york street",
        orientation: "landscape",
        perPage: 30,
      })
      photoArray[0] = result1.response.results
      photoArray[1] = result2.response.results

      setCurrentPhoto(photoArray[answer].pop())
      setPhotos(photoArray)
    }

    getPhotos()
  }, [])

  const makeGuess = (guess) => {
    if (guess === answer) {
      setToast({ show: true, result: true, photo: currentPhoto, answer })
    } else {
      setToast({ show: true, result: false, photo: currentPhoto, answer })
    }

    if (stashedPic) {
      setCurrentPhoto(stashedPic.photo)
      setAnswer(stashedPic.answer)
      setStashedPic(null)
    } else {
      let newAnswer = Math.round(Math.random())
      setCurrentPhoto(photos[newAnswer].pop())
      setAnswer(newAnswer)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {toast.show ? (
        <div
          onClick={() => {
            if (!stashedPic) {
              setToast({ ...toast, show: false })
              setStashedPic({ photo: currentPhoto, answer: answer })
              setCurrentPhoto(toast.photo)
              setAnswer(toast.answer)
            }
          }}
          className={`${
            toast.result ? "bg-green-500" : "bg-red-500"
          } cursor-pointer fixed top-4 text-center p-4 px-8 md:p-8 md:px-16 opacity-80 text-white font-bold rounded-xl`}
        >
          {toast.result ? "Correct" : "Incorrect"}
        </div>
      ) : null}
      {currentPhoto ? (
        <>
          <img
            className="object-cover absolute h-screen w-screen -z-10"
            src={currentPhoto.urls.regular}
            alt=""
          />
          <div className="flex w-screen h-screen justify-between">
            <div
              onClick={() => makeGuess(0)}
              className="cursor-pointer hover:bg-gray-500 hover:opacity-30 w-2/5 text-white font-bold text-xl"
            >
              Toronto 🍁
            </div>
            <div
              onClick={() => makeGuess(1)}
              className="cursor-pointer hover:bg-gray-500 hover:opacity-30 w-2/5 text-white font-bold text-xl text-right"
            >
              🍎 New York
            </div>
          </div>
        </>
      ) : (
        <>No More Photos!</>
      )}
      <Link
        className="cursor-pointer opacity-60 hover:opacity-100 fixed bottom-8 bg-blue-500 text-white font-semibold p-2 px-8 rounded-lg"
        to="/"
      >
        HOME
      </Link>
    </div>
  )
}

export default Game
