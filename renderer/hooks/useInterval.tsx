import * as react from 'react'

type Noop = () => void
type AccurateIntervalCallback = (scheduledTime?: number) => void
type AccurateIntervalOptions = { aligned?: boolean; immediate?: boolean }
type IntervalOnClear = Noop
type AccurateIntervalType = (
    callback: AccurateIntervalCallback,
    catchUpTick: AccurateIntervalCallback,
    delay: number,
    opts?: AccurateIntervalOptions
) => { clear: Noop }
type IntervalType = (callback: AccurateIntervalCallback, effectOptions: [number, IntervalOnClear?]) => any

const accurateInterval: AccurateIntervalType = (callback, catchUpTick, delay, opts) => {
    const now = new Date().getTime()
    let nextAt = now
    let timeout = null

    if (!opts) opts = {}
    if (opts.aligned) {
        nextAt += delay - (now % delay)
    }
    if (!opts.immediate) {
        nextAt += delay
    }

    const wrapper = function wrapper() {
        let scheduledTime = nextAt
        const now = new Date().getTime()
        nextAt += delay
        if (nextAt - now <= -1000) {
            catchUpTick((nextAt - now) * -1)
            nextAt = now + delay;
            timeout = setTimeout(wrapper, delay)
        } else {
            timeout = setTimeout(wrapper, nextAt - now)
            callback(scheduledTime)
        }
    }

    const clear = function clear() {
        return clearTimeout(timeout)
    }

    timeout = setTimeout(wrapper, nextAt - new Date().getTime())

    return {
        clear: clear
    }
}


const useInterval: IntervalType = (callback, [delay, onClear = () => {}]) => {
    const savedCallback = react.useRef<AccurateIntervalCallback>()

    react.useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    react.useEffect(() => {
        const tick = () => {
            savedCallback.current()
        }
        const catchUpTick = (catchup: number) => {
            savedCallback.current(catchup)
        }
        if (delay !== null) {
            let id = accurateInterval(tick, catchUpTick, delay, { aligned: false})
            return () => {
                onClear()
                id.clear()
            }
        }
    }, [delay])
}

export default useInterval
