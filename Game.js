import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, Alert } from 'react-native'
import { GameEngine } from "react-native-game-engine"
import Food from './Food'
import Snake from './Snake'
import loop from './logic/loop'
import { height, width } from './logic/constants'
import { Accelerometer } from 'expo-sensors'
import { mockMoveUp, mockMoveDown, mockMoveLeft, mockMoveRight, 
         mockHitWall, mockHitSelf, mockHitFood } from './mock'

const Game = (props) => {
    const gameEngine = useRef(null)
    const [ score, setScore ] = useState(0)
    const [ accel, setAccel ] = useState({ x: 0, y: 0, z: 0 })
    const [ accelSub, setAccelSub ] = useState(null)
    const [ dir, setDir ] = useState("RIGHT")
    
    const entities = () => {
        return {
            snake: { position: { x: (height / 2), y: (width / 2) }, dir: "Right", renderer: <Snake /> },
            food: { position: { x: undefined, y: undefined }, renderer: <Food /> }
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

    useEffect(() => {
        if (props.accelAvail) {
            Accelerometer.setUpdateInterval(16)
            Accelerometer.addListener(data => gameEngine.current.dispatch({type: "accel-data", detail: data}))
            return () => Accelerometer.removeAllListeners()
        }
    }, [props.accelAvail])

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <GameEngine 
                style={{ height: '100%', width: '100%' }}
                running = { true }
                ref = { gameEngine }
                entities = { entities() }
                systems = { [ loop ] }
                onEvent={(e) => eventHandler(e)}
            >
            <Button onPress={() => resetGame()} title="Reset" />
            <Button onPress={() => mockMoveUp(gameEngine)} title="UP" />
            <Button onPress={() => mockMoveDown(gameEngine)} title="Down" />
            <Button onPress={() => mockMoveLeft(gameEngine)} title="LEFT" />
            <Button onPress={() => mockMoveRight(gameEngine)} title="RIGHT" />
            {/* <Button onPress={() => mockHitWall(gameEngine)} title="Mock Hit-Wall" /> */}
            {/* <Button onPress={() => mockHitSelf(gameEngine)} title="Mock Hit-Self" /> */}
            {/* <Button onPress={() => mockHitFood(gameEngine)} title="Mock Hit-Food" /> */}
            {/* <Text> { props.accelAvail ? 'true' : 'false' } </Text> */}
            <Text> { score } </Text>
            </GameEngine>
        </SafeAreaView>
      )
}

export default Game