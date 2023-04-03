import Image from 'next/image'
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from 'react-parallax-mouse'
import haveFunGuy from 'public/images/haveFunGuy.png'
import haveFunAnimals from 'public/images/haveFunAnimals.png'
import haveFunBg from 'public/images/haveFunBg.png'
import { Box } from '@mui/material'

export const HaveFunImage = () => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <MouseParallaxContainer
        resetOnLeave
        containerStyle={{
          width: '40vw%',
          height: '36vw',
          paddingTop: '5%',
          paddingLeft: '5%',
          margin: 'auto',
        }}
      >
        <MouseParallaxChild
          factorX={0}
          factorY={0}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: '21%',
            left: '15.5%',
          }}
        >
          <Image
            src={haveFunBg}
            alt="Background image"
            style={{
              width: '28vw',
              height: 'auto',
            }}
          />
        </MouseParallaxChild>
        <MouseParallaxChild
          factorX={0.1}
          factorY={0.1}
          style={{ position: 'absolute', zIndex: 2, top: '10.5%', left: '23%' }}
        >
          <Image
            src={haveFunGuy}
            alt="Guy image"
            style={{
              opacity: 1,

              width: '22vw',
              height: 'auto',
            }}
          />
        </MouseParallaxChild>
        <MouseParallaxChild
          factorX={0.1}
          factorY={0.1}
          style={{
            position: 'absolute',
            zIndex: 3,
            top: '6.5%',
            left: '5%',
          }}
        >
          <Image
            src={haveFunAnimals}
            alt="Animals image"
            style={{
              width: '27.5vw',
              height: 'auto',
            }}
          />
        </MouseParallaxChild>
      </MouseParallaxContainer>
    </Box>
  )
}
