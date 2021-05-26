import React, { useState, useEffect } from 'react'
import { Gyroscope } from 'expo-sensors'

const gyro = () => {
  const [ gyro, setGyro ] = useState({ x: 0, y: 0, z: 0 })
  const [ gyroSub, setGyroSub ] = useState(null)
  const [ isGyroAvail, setIsGyroAvail ] = useState(null)

  const sensorSubscribe = (speed) => {
    Gyroscope.setUpdateInterval(speed)
    setGyroSub( Gyroscope.addListener(data => { setGyro(data) }) )
  }

  const unsubscribe = () => {
    gyroSub && gyroSub.remove()
    setGyroSub(null)
  }

  useEffect(() => {
    setIsGyroAvail(Gyroscope.isAvailableAsync())
  }, [])

  useEffect(() => {
    if (isGyroAvail) sensorSubscribe(64)
    else alert('tilt sensor not available')
    return () => unsubscribe()
  }, [isGyroAvail])

  return gyro
}

export default gyro