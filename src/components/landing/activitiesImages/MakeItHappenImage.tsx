import Image from 'next/image'
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from 'react-parallax-mouse'
import makeItHappenWolf from 'public/images/makeItHappenWolf.png'
import makeItHappenHand from 'public/images/makeItHappenHand.png'
import makeItHappenCircle from 'public/images/makeItHappenCircle.png'
import { Box } from '@mui/material'

export const MakeItHappenImage = () => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <MouseParallaxContainer
        resetOnLeave
        containerStyle={{
          width: '30vw',
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
            top: '22.5%',
            left: '7.5%',
          }}
        >
          <Image
            src={makeItHappenCircle}
            alt="Circle image"
            style={{
              width: '26vw',
              height: 'auto',
            }}
          />
        </MouseParallaxChild>
        <MouseParallaxChild
          factorX={0.1}
          factorY={0.1}
          style={{ position: 'absolute', zIndex: 2, top: '41.5%', left: '3%' }}
        >
          <Image
            src={makeItHappenWolf}
            alt="Wolf image"
            style={{
              width: '23.5vw',
              height: 'auto',
            }}
          />
        </MouseParallaxChild>
        <MouseParallaxChild
          inverted
          factorX={0.1}
          factorY={0.1}
          style={{
            position: 'absolute',
            zIndex: 2,
            top: '7%',
            left: '35%',
            transform: 'rotate(35deg)',
          }}
        >
          <Image
            src={makeItHappenHand}
            alt="Hand image"
            style={{
              width: '12vw',
              height: 'auto',
            }}
          />
        </MouseParallaxChild>
      </MouseParallaxContainer>
    </Box>
  )
}
