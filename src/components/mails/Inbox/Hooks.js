import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMessages } from '../../../reducer/inboxSlice'

export const useFetchMessages  = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchMessages());

        const intervalId = setInterval(()=>{
            dispatch(fetchMessages());
        }, 2000)

        return () => clearInterval(intervalId)
    }, [dispatch])
    }

