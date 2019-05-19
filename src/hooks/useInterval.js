import { useEffect, useRef } from 'react'

const accurateInterval = (callback, delay, opts) => {
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
        const scheduledTime = nextAt
        nextAt += delay
        timeout = setTimeout(wrapper, nextAt - new Date().getTime())
        callback(scheduledTime)
    }

    const clear = function clear() {
        return clearTimeout(timeout)
    }

    timeout = setTimeout(wrapper, nextAt - new Date().getTime())

    return {
        clear: clear
    }
}

const useInterval = (callback, [delay, cb]) => {
    const savedCallback = useRef()

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        const tick = () => {
            savedCallback.current()
        }
        if (delay !== null) {
            let id = accurateInterval(tick, delay, { aligned: true })
            return () => {
                cb()
                id.clear()
            }
        }
    }, [delay])
}

export default useInterval
