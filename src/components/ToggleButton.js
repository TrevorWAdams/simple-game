import React from 'react'
import { useMachine } from "@xstate/react"
import { Machine } from "xstate"

 const toggleMachine = Machine({
   id: "toggle",
   initial: "inactive",
   states: {
     inactive: {
       on: { TOGGLE: "active" },
     },
     active: {
       on: { TOGGLE: "inactive" },
     },
   },
 })

const ToggleButton = () => {
  const [current, send] = useMachine(toggleMachine)

  return (
    <button onClick={() => send("TOGGLE")}>
      {current.matches("inactive") ? "Off" : "On"}
    </button>
  )
}

export default ToggleButton
