import React, { useState, useEffect } from 'react'

const CountDown = () => {
  const time = 5
  const [seconds, setSeconds] = useState(time)
  const [isActive, setIsActive] = useState(false)
  const [game, setGame] = useState(false)

  function start() {
    setIsActive(true)
  }

  function go() {
    setIsActive(false)
    setGame(true)
  }

  function reset() {
    setSeconds(time)
    setIsActive(false)
    setGame(false)
  }

  useEffect(() => {
    let interval = null
    if (seconds === 0) {
      go()
    }
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, seconds])

  

  return (
    <div>
      <div>
        {game ? <button onClick={reset}>Reset</button> : <button onClick={start}>START</button>}
      </div>

      {game ? <div>GAME</div> : <div>{seconds}</div>}
    </div>
  )
}

export default CountDown
