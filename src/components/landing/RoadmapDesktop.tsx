import { RoadmapData } from '@/utils/hooks/useContentful'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import RoadmapCard from './RoadmapCard'

const ROTATIONS = [-1.59, 2.19, -2.3]

type RoadmapDesktopProps = {
  roadmapData: (RoadmapData & { color: string })[]
}

export const RoadmapDesktop = ({ roadmapData }: RoadmapDesktopProps) => {
  const [activeTab, setActiveTab] = useState<number>(0)
  return (
    <Box>
      <Tabs
        value={activeTab}
        variant="fullWidth"
        TabIndicatorProps={{ sx: { display: 'none' } }}
      >
        {roadmapData.map((data, index) => {
          const color = activeTab === index ? 'black.main' : 'neutral.700'
          return (
            <Tab
              wrapped
              key={`tab-${index}`}
              sx={{
                py: 5,
                root: { width: '100px' },
                borderBottom: '3px solid',
                borderColor: color,
              }}
              label={
                <Typography
                  variant="caption"
                  color={color}
                  sx={{ '&:hover': { color: 'black.main' } }}
                >
                  {`${data.quarter} ${data.year}`}
                </Typography>
              }
              onClick={() => setActiveTab(index)}
            />
          )
        })}
      </Tabs>
      <Box sx={{ display: 'grid', my: 10 }}>
        {roadmapData.map((data, index) => (
          <Box
            key={index}
            sx={{
              opacity: index >= activeTab ? 1 : 0,
              width: '100%',
              transform:
                index === roadmapData.length - 1
                  ? null
                  : `rotate(${ROTATIONS[index % ROTATIONS.length]}deg)`,
              gridColumn: 1,
              gridRow: 1,
              zIndex: roadmapData.length - index,
            }}
          >
            <RoadmapCard {...data} items={data.items.split('\n')} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
