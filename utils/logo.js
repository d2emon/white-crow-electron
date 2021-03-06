'use strict'

const chalk = require('chalk')
const { say } = require('cfonts')

function greeting () {
  // const cols = process.stdout.columns
  let text = 'White Crow'

  /**
   * if (cols > 104) text = 'electron-vue'
   * else if (cols > 76) text = 'electron-|vue'
   * else text = false
   */

  if (text) {
    say(text, {
      colors: ['yellow'],
      font: 'simple3d',
      space: false
    })
  } else console.log(chalk.yellow.bold('\n  electron-vue'))
  console.log(chalk.blue('  getting ready...') + '\n')
}

module.exports = greeting
