const rand = () => { return Math.random().toFixed(3)}

const mockMoveUp = (gameEngine) => {
    const mock = { x: 0, y: -1 }
    gameEngine.current.dispatch({type: "accel-data", detail: mock})
}

const mockMoveDown = (gameEngine) => {
    const mock = { x: 0, y: 1 }
    gameEngine.current.dispatch({type: "accel-data", detail: mock})
}

const mockMoveLeft = (gameEngine) => {
    const mock = { x: -1, y: 0 }
    gameEngine.current.dispatch({type: "accel-data", detail: mock})
}

const mockMoveRight = (gameEngine) => {
    const mock = { x: 1, y: 0 }
    gameEngine.current.dispatch({type: "accel-data", detail: mock})
}

const mockHitWall = (gameEngine) => {
    gameEngine.current.dispatch({ type: "hit-wall" })
}

const mockHitSelf = (gameEngine) => {
    gameEngine.current.dispatch({ type: "hit-self" })
}

const mockHitFood = (gameEngine) => {
    gameEngine.current.dispatch({ type: "hit-food" })
}

export { mockMoveUp, mockMoveDown, mockMoveLeft, mockMoveRight, mockHitWall, mockHitSelf, mockHitFood }