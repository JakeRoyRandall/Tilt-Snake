import React from 'react'
import { StyleSheet, View } from 'react-native'

const Food = (props) => {
    const styles = StyleSheet.create({
        square: {
            position: 'absolute',
            height: 20,
            width: 20,
            backgroundColor: 'pink',
            top: props.position.x,
            left: props.position.y
        }
    })

    return (
            <View style={ styles.square } />
    )
}

export default Food