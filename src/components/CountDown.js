import React, { useEffect } from 'react'
import { useMachine } from "@xstate/react"
import { Machine } from "xstate"


const countDownMachine = Machine(
  {
    id: "countDown",
    initial: "idle",
    context: {
      seconds: 5,
    },
    states: {
      idle: {
        on: {
          NEXT: "next",
          actions: ["onNext"],
        },
      },
      next: {
        on: {
          NEXT: "next",
          actions: ["onNext"],
        },
      },
      done: {
        type: "final",
      },
    },
  },
  {
    actions: {
      onNext: (context, event) => {
        console.log("onNext", context, event)
      },
    },
  }
)

const CountDown = () => {
 
  const [current, send] = useMachine(countDownMachine)


    useEffect(() => {
      let interval = null
     
        interval = setInterval(() => {
          setSeconds(seconds => seconds - 1)
        }, 1000)
    
    }, [seconds])


  return (
    <div>
      <div>{seconds}</div>
    </div>
  )
}

export default CountDown
