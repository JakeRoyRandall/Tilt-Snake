import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

const Snake = (props) => {
    const styles = StyleSheet.create({
        snake: {
            position: 'absolute',
            height: 20,
            width: 20,
            backgroundColor: 'green',
            top: props.position.x,
            left: props.position.y        }
    })

    return (
        <View style={ styles.snake } />
      )
}

export default Snake