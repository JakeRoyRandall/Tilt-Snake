import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Accelerometer } from 'expo-sensors'
import Game from './Game'

const App = () => {
  const [ ready, setReady ] = useState(true)
  const [ accelAvail, setAccelAvail ] = useState(null)

  useEffect(() => {
    // Checks if the Accelerometer is avail (need to ask Mobile Web Users and set up alt for traditional Web)
    Promise.resolve(Accelerometer.isAvailableAsync()).then((value) => setAccelAvail(value))
  }, [])

  return (
    <View style={{ backgroundColor: 'black' }}>
        { ready && <Game accelAvail={accelAvail} /> }
    </View>
  )
}

export default App