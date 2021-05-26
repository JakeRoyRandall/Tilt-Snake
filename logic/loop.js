import { height, width } from './constants'
import gameover from './gameover'
import { Accelerometer } from 'expo-sensors'

const randSq = () => {
    const top = Math.round( Math.random() * ( height - 40 ) )
    const left = Math.round( Math.random() * ( width - 40 ) )
    return { x: top, y: left }
}

const getDir = (data) => {
    if (data.y > 0 && data.y > data.x) return "UP"
    if (data.y < 0 && data.x > data.y) return "DOWN"
    if (data.y < 0 && data.y > data.x) return "LEFT"
    if (data.x > 0 && data.x > data.y) return "RIGHT"
}

const moveSnake = ( snake, dir, speed ) => {
    const { x, y } = snake.position
    switch ( dir ) {
        case 'DOWN':
            snake.position = { x: x + speed, y: y }
            break
        case 'UP':
            snake.position = { x: x - speed, y: y }
            break
        case 'LEFT':
            snake.position = { x: x, y: y - speed }
            break
        case 'RIGHT':
            snake.position = { x: x, y: y + speed }
            break
    }
    return snake
}

const checkCollision = ( snake, food, dispatch ) => {
    const { fx, fy } = food.position
    const hitWall = () => {
        const hitTopWall = snake.position.x < 0
        const hitBottomWall = snake.position.x > height
        const hitLeftWall = snake.position.y < 0
        const hitRightWall = snake.position.y > width
        if ( hitTopWall || hitBottomWall || hitLeftWall || hitRightWall ) return true
    }
    const hitSelf = () => {
        
    }
    const hitFood = () => {
        
    }



    if (hitWall()) dispatch({ type: 'hit-wall'} )
    if (hitSelf()) dispatch({ type: 'hit-self'} )
    if (hitFood()) dispatch({ type: 'hit-food'} )
}

const loop = ( entities, { dispatch, events } ) => {
    let { food, snake } = entities
    if (food.position.x === 0) { food.position = randSq() }
    if ( events.length && events[0].type === "accel-data"){
        let dir = getDir(events[0].detail)
        let speed = 10
        snake = moveSnake(snake, dir, speed)
        checkCollision(snake, food, dispatch)
        return { food, snake }
    }
    return { food, snake }
}

export default loop 