import { height, width } from './constants'

const randSq = () => {
    const top = Math.round( Math.random() * ( height - 40 ) )
    const left = Math.round( Math.random() * ( width - 40 ) )
    return { x: top, y: left }
}

const getDir = (data) => {
    console.log(data)
    if (data.y > 0 && data.y > data.x) return "DOWN"
    if (data.y < 0 && data.x > data.y) return "UP"
    if (data.x < 0 && data.y > data.x) return "LEFT"
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
    const sx = snake.position.x
    const sy = snake.position.y
    const fx = food.position.x
    const fy = food.position.y

    const hitWall = () => {
        const hitTopWall = sx < 0
        const hitBottomWall = sx > height - 20
        const hitLeftWall = sy < 0
        const hitRightWall = sy > width - 20
        if ( hitTopWall || hitBottomWall || hitLeftWall || hitRightWall ) return true
    }

    const hitFood = () => {
        const xDiff = () => {
            if (sx > fx) return sx - fx - 5
            else if (sx === fx) return sx - fx
            else return fx - sx - 15
        }
        const yDiff = () => {
            if (sy > fy) return sy - fy - 5
            else if (sy === fy) return sy - fy
            else return fy - sy  - 15
        }
        if ( xDiff() + yDiff() <= 0 ) {
            food.position = randSq()
            return true
        }
    }

    const hitSelf = () => {
        
    }

    if (hitWall()) dispatch({ type: 'hit-wall'} )
    if (hitSelf()) dispatch({ type: 'hit-self'} )
    if (hitFood()) dispatch({ type: 'hit-food'} )
}

const loop = ( entities, { dispatch, events } ) => {
    let { food, snake } = entities
    if ( food.position.x === undefined ) { food.position = randSq() }
    if ( events.length && events[0].type === "accel-data"){
        let dir = getDir(events[0].detail)
        let speed = 2 
        snake = moveSnake(snake, dir, speed)
        checkCollision(snake, food, dispatch)
        return { food, snake }
    }
    return { food, snake }
}

export default loop 