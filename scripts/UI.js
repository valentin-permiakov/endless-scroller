export class UI {
    constructor(game) {
        this.game = game
        this.fontSize = 30
        this.fontFamily = 'Helvetica'
        this.livesImg = document.getElementById('lives')
    }

    draw(context) {
        context.font = `${this.fontSize}px ${this.fontFamily}`
        context.textAlign = 'left'
        context.fillStyle = this.game.fontColor

        // score
        context.fillText(`Score: ${this.game.score}`, 20, 50)

        // timer
        context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`
        context.fillText(`Time: ${(this.game.time * 0.001).toFixed(1)}`, 20, 80)

        // lives
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImg, 25 * i + 20, 95, 25, 25)
        }

        // gameover message
        if (this.game.gameOver) {
            context.font = `${this.fontSize * 2}px ${this.fontFamily}`
            context.textAlign = 'center'
            if (this.game.score > 20) {
                context.fillText(`Win!`, this.game.width * 0.5, this.game.height * 0.5 - 20)
                context.fillText(`What are creatures of the night afraid of? YOU!`, this.game.width * 0.5, this.game.height * 0.5 + 40)
            } else {
                context.fillText(`Lost!`, this.game.width * 0.5, this.game.height * 0.5 - 20)
                context.fillText(`Better luck next time!`, this.game.width * 0.5, this.game.height * 0.5 + 40)

            }
        }

    }

}