class Particle {
    constructor(game) {
        this.game = game
        this.markedForDeletion = false
    }

    update() {
        this.x -= this.speedX + this.game.speed
        this.y -= this.speedY
        this.size *= 0.95
        if (this.size < 0.5) this.markedForDeletion = true
    }
}

export class Dust extends Particle {
    constructor(game, x, y) {
        super(game)
        this.x = x
        this.y = y
        this.size = (Math.random() * 10 + 10) * this.game.scale
        this.speedX = Math.random()
        this.speedY = Math.random()
        this.color = 'rgba(0,0,0,0.2)'
    }

    draw(context) {
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fillStyle = this.color
        context.fill()
    }
}

export class Splash extends Particle {
    constructor(game, x, y) {
        super(game)
        this.x = x
        this.y = y
        this.size = (Math.random() * 100 + 100) * this.game.scale
        this.speedX = Math.random() * 6 - 4
        this.speedY = Math.random() * 4 - 1
        this.weight = 0
        this.image = document.getElementById('fire')
    }

    update() {
        super.update()
        this.weight += 0.1
        this.y += this.weight
    }

    draw(context) {
        context.save()
        context.translate(this.x, this.y)
        context.rotate(this.angle)
        context.drawImage(this.image, 0, 0, this.size, this.size)
        context.restore()
    }
}

export class Fire extends Particle {
    constructor(game, x, y) {
        super(game)
        this.x = x
        this.y = y
        this.size = (Math.random() * 100 + 50) * this.game.scale * 0.7
        this.speedX = 1
        this.speedY = 1
        this.image = document.getElementById('fire')
        this.angle = 0
        this.va = Math.random() * 0.2 - 0.1
    }

    update() {
        super.update()
        this.angle += this.va
        this.x += Math.sin(this.angle * 10)
    }

    draw(context) {
        context.save()
        context.translate(this.x, this.y)
        context.rotate(this.angle)
        context.drawImage(this.image, 0, 0, this.size, this.size)
        context.restore()
    }
}