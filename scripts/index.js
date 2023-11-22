import { Game } from "./Game.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, loading, ctx } from "./const.js";

window.addEventListener('load', () => {
    loading.style.display = 'none'


    let lastTime = 0

    const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT)

    const animate = (timeStamp = 0) => {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        game.draw(ctx)
        game.update(deltaTime)
        // if (!game.gameOver)
        requestAnimationFrame(animate)

    }

    animate()
})


