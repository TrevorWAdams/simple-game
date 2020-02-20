import React from "react"
import { useMachine } from "@xstate/react"
import { Machine, assign } from "xstate"

const timerMachine = Machine({
  initial: "idle",
  context: {
    elapsed: 0,
    duration: 30,
    interval: 0.1,
  },
  states: {
    idle: {
      on: {
        GO: {
          target: "running",
        },
      },
    },
    running: {
      invoke: {
        src: context => cb => {
          const interval = setInterval(() => {
            cb("TICK")
          }, 1000 * context.interval)

          return () => {
            clearInterval(interval)
          }
        },
      },
      on: {
        "": [
          {
            target: "completed",
            cond: context => {
              return context.elapsed >= context.duration
            },
          }
        ],
        TICK: {
          actions: assign({
            elapsed: context =>
              +(context.elapsed + context.interval).toFixed(2),
          }),
        },
      },
    },
    completed: {
      on: {
        "": {
          target: "running",
          cond: context => context.elapsed < context.duration,
        },
      },
    },
    done: {
      type: "final"
    }
  },
  on: {
    "DURATION.UPDATE": {
      actions: assign({
        duration: (context, event) => event.value,
      }),
    },
    RESET: {
      actions: assign({
        elapsed: (context, event) => (context.elapsed = 0),
      }),
    },
  },
})

const Timer = () => {
  const [state, send] = useMachine(timerMachine)
  const { elapsed, duration } = state.context

  return (
    <section>
      <button onClick={() => send("GO")}>GO</button>
      <label>
        <span>Elapsed time:</span>
        <output>
          {elapsed.toFixed(1)}s / {duration.toFixed(1)}s
        </output>
        <progress max={duration} value={elapsed} />
      </label>
      <label>
        <span>Duration:</span>
        <input
          type="range"
          min={1}
          max={30}
          value={duration}
          onChange={e => {
            send("DURATION.UPDATE", { value: +e.target.value })
          }}
        />
      </label>
      <button onClick={_ => send("RESET")}>Reset</button>
    </section>
  )
}

export default Timer
