import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, Alert } from 'react-native'
import { GameEngine } from "react-native-game-engine"
import Food from './Food'
import Snake from './Snake'
import loop from './logic/loop'
import { height, width } from './logic/constants'
import { Accelerometer } from 'expo-sensors'

const Game = (props) => {
    const gameEngine = useRef(null)
    const [ score, setScore ] = useState(0)
    const [ accel, setAccel ] = useState({ x: 0, y: 0, z: 0 })
    const [ accelSub, setAccelSub ] = useState(null)
    const [ dir, setDir ] = useState("RIGHT")
    
    const entities = () => {
        return {
            snake: { position: { x: (height / 2), y: (width / 2) }, dir: "Right", renderer: <Snake /> },
            food: { position: { x: 0, y: 0 }, renderer: <Food /> }
        }
    }
    
    const resetGame = () => {
        gameEngine.current.stop()
        gameEngine.current.swap(entities())
        gameEngine.current.start()
    }

    const eventHandler = (e) => {
        switch (e.type) {
            case "hit-wall":
                Alert.alert("Game over","You hit a wall!")
                gameEngine.current.stop()
                break
            case "hit-self":
                Alert.alert("Game over","You bit yourself!")
                gameEngine.current.stop()
                break
            case "hit-food":
                setScore(score + 1)
                break
        }
    }

    const mockAccel = () => {
        let rand = () => { return Math.random().toFixed(3)}
        let mock = { x: rand(), y: rand() }
        gameEngine.current.dispatch({type: "accel-data", detail: mock})
    }

    const mockHitWall = () => {
        let rand = () => { return Math.random().toFixed(3)}
        let mock = { x: rand(), y: rand() }
        gameEngine.current.dispatch({type: "accel-data", detail: mock})
    }

    const mockHitSelf = () => {
        gameEngine.current.dispatch({ type: "hit-self" })
    }

    const mockHitFood = () => {
        gameEngine.current.dispatch({ type: "hit-food" })
    }


    useEffect(() => {
        if (props.accelAvail) {
            Accelerometer.setUpdateInterval(16)
            Accelerometer.addListener(data => gameEngine.current.dispatch({type: "accel-data", detail: data}))
            return () => Accelerometer.removeAllListeners()
        }
    }, [props.accelAvail])

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <Button onPress={() => resetGame()} title="Reset" />
            <Button onPress={() => mockAccel()} title="Mock Accel" />
            <Button onPress={() => mockHitWall()} title="Mock Hit-Wall" />
            <Button onPress={() => mockHitSelf()} title="Mock Hit-Self" />
            <Button onPress={() => mockHitFood()} title="Mock Hit-Food" />
            <Text> { props.accelAvail ? 'true' : 'false' } </Text>
            <Text> { score } </Text>
            <GameEngine 
                style={{ height: '100%', width: '100%' }}
                running = { true }
                ref = { gameEngine }
                entities = { entities() }
                systems = { [ loop ] }
                onEvent={(e) => eventHandler(e)}
            />
        </SafeAreaView>
      )
}

export default Game