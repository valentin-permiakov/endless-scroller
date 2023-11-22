/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const scale = 1.7

const CANVAS_WIDTH = canvas.width = 1400
const CANVAS_HEIGHT = canvas.height = 500 * scale

const loading = document.getElementById('loading')

export { canvas, ctx, CANVAS_WIDTH, CANVAS_HEIGHT, loading, scale }