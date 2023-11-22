import { Background } from "./background.js"
import { InputHandler } from "./InputHandler.js"
import { Player } from "./Player.js"
import { UI } from "./UI.js"
import { scale } from "./const.js"
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemies.js"

export class Game {
    constructor(width, height) {
        this.score = 0
        this.scale = scale
        this.fontColor = 'black'
        this.width = width
        this.height = height
        this.groundMargin = 200
        this.speed = 0
        this.maxSpeed = 3
        this.enemies = []
        this.enemyTimer = 0
        this.enemyInterval = 1000
        this.particles = []
        this.maxParticles = 50
        this.collisions = []
        this.time = 0
        this.maxTime = 60000
        this.lives = 5
        this.floatingMessages = []
        this.gameOver = false
        this.debug = false
        this.player = new Player(this)
        this.input = new InputHandler(this)
        this.background = new Background(this)
        this.UI = new UI(this)
        this.player.currentState = this.player.states[0]
        this.player.currentState.enter()
    }

    update(deltaTime) {
        if (this.time > this.maxTime) this.gameOver = true
        else this.time += deltaTime
        this.background.update()
        this.player.update(this.input.keys, deltaTime)

        // handle enemies
        if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy()
            this.enemyTimer = 0
        } else {
            this.enemyTimer += deltaTime
        }

        this.enemies.forEach(enemy => {
            enemy.update(deltaTime)
        })
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)

        // handle particles
        this.particles.forEach((particle, index) => {
            particle.update()
            if (particle.markedForDeletion) this.particles.splice(index, 1)
        })

        if (this.particles.length > this.maxParticles) {
            this.particles.length = this.maxParticles
        }

        // handle collisions
        this.collisions.forEach((collision, index) => {
            collision.update(deltaTime)
            if (collision.markedForDeletion) this.collisions.slice(index, 1)
        })

        // handle messages
        this.floatingMessages.forEach((message, index) => {
            message.update()
        })

        this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion)
    }

    draw(context) {
        this.background.draw(context)
        this.player.draw(context)
        this.enemies.forEach(enemy => {
            enemy.draw(context)
        })
        this.UI.draw(context)
        this.particles.forEach((particle) => {
            particle.draw(context)
        })
        this.collisions.forEach((collision) => {
            collision.draw(context)
        })
        this.floatingMessages.forEach((message, index) => {
            message.draw(context)
        })
    }

    addEnemy() {
        if (this.speed > 0 && Math.random() > 0.5) {
            this.enemies.push(new GroundEnemy(this))
        } else if (this.speed > 0) {
            this.enemies.push(new ClimbingEnemy(this))
        }
        this.enemies.push(new FlyingEnemy(this))
    }
}