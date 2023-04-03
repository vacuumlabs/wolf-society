import Image from 'next/image'
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from 'react-parallax-mouse'
import topLeftWolf from 'public/images/topLeftWolf.png'
import topRightWolf from 'public/images/topRightWolf.png'
import bottomRightWolf from 'public/images/bottomRightWolf.png'
import bottomLeftWolf from 'public/images/bottomLeftWolf.png'
import { Box } from '@mui/material'

export const BreadAndButterImage = () => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <MouseParallaxContainer
        resetOnLeave
        containerStyle={{
          width: '40vw',
          height: '36vw',
          paddingTop: '5%',
          paddingLeft: '5%',
          margin: 'auto',
        }}
      >
        <MouseParallaxChild
          factorX={0.1}
          factorY={-0.1}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: '6%',
            left: '5.5%',
          }}
        >
          <Image
            src={topLeftWolf}
            alt="Wolf image"
            style={{
              width: '15.5vw',
              height: 'auto',
            }}
          />
        </MouseParallaxChild>
        <MouseParallaxChild
          factorX={0.2}
          factorY={0.2}
          style={{ position: 'absolute', zIndex: 2, top: '6%', left: '44%' }}
        >
          <Image
            src={topRightWolf}
            alt="Wolf image"
            style={{
              width: '15.5vw',
              height: 'auto',
            }}
          />
        </MouseParallaxChild>
        <MouseParallaxChild
          inverted
          factorX={0.2}
          factorY={0.2}
          style={{
            position: 'absolute',
            zIndex: 2,
            top: '39.5%',
            left: '6%',
          }}
        >
          <Image
            src={bottomLeftWolf}
            alt="Wolf image"
            style={{
              width: '15.5vw',
              height: 'auto',
            }}
          />
        </MouseParallaxChild>
        <MouseParallaxChild
          factorX={-0.1}
          factorY={0.1}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: '39%',
            left: '43%',
          }}
        >
          <Image
            src={bottomRightWolf}
            alt="Wolf image"
            style={{
              width: '15.5vw',
              height: 'auto',
            }}
          />
        </MouseParallaxChild>
      </MouseParallaxContainer>
    </Box>
  )
}
