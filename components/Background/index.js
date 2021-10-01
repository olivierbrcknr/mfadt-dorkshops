import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

import styles from './Background.module.css'

const Background = (props) => {

  let classes = [styles.Background]
  classes.push(props.className)

  const cnv = useRef(null)

  let highlightColor = '#00F'
  let bgColor = '#FFF'

  const sketch = (p) => {

    let posX = 50
    let posY = 50
    let diam = p.random( 50, 100 )

    let speedX = p.random(5,10)
    let speedY = p.random(5,10)
    let speedR = p.random(30, 100)

    let dirX = 1
    let dirY = 1

    const star = (x, y, radius1, radius2, npoints) => {
      let angle = p.TWO_PI / npoints;
      let halfAngle = angle / 2.0;
      p.beginShape();
      for (let a = 0; a < p.TWO_PI; a += angle) {
        let sx = x + p.cos(a) * radius2;
        let sy = y + p.sin(a) * radius2;
        p.vertex(sx, sy);
        sx = x + p.cos(a + halfAngle) * radius1;
        sy = y + p.sin(a + halfAngle) * radius1;
        p.vertex(sx, sy);
      }
      p.endShape(p.CLOSE);
    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)

      posX = p.random( diam, p.width - diam )
      posY = p.random( diam, p.height - diam )
    }

    p.draw = () => {
      p.background(bgColor)

      posX = posX + dirX * speedX
      posY = posY + dirY * speedY

      if( (posX + diam/2) >= p.width || (posX - diam/2) <= 0 ){
        dirX = dirX * -1
        // speedX = p.random(1,10)
      }

      if( (posY + diam/2) >= p.height || (posY - diam/2) <= 0 ){
        dirY = dirY * -1
        // speedY = p.random(1,10)
      }

      p.fill(highlightColor)
      p.noStroke()

      p.push()
      p.translate(posX, posY)
      p.rotate(p.frameCount / speedR)
      star(0, 0, diam, diam/3*2, 20)
      p.pop()

      // p.circle(posX,posY,diam)
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

  }


  useEffect(()=>{

    // get variables
    var css = getComputedStyle(document.body)
    highlightColor = css.getPropertyValue('--color-highlight')
    bgColor = css.getPropertyValue('--color-bg')

    // create sketch
    const p5 = require("p5")
    const BG_sketch = new p5(sketch, cnv.current)

  },[])


  return (
    <div ref={cnv} className={ classes.join(' ') }>
    </div>
  )
}

export default Background
