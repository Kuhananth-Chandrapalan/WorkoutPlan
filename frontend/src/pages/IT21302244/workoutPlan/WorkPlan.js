import React from 'react'
import LeftPane from '../../../components/IT21302244/leftPane/LeftPane'
import CenterPane from '../../../components/IT21302244/centerPane/CenterPane'
import RightHomePane from '../../../components/IT21302244/rightPane/RightHomePane'

export default function WorkoutPlan() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
        <div style={{ flex: 1, padding: '10px' }}>
            <LeftPane />
        </div>
        <div style={{ flex: 2, padding: '10px' }}>
            <CenterPane />
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
            <RightHomePane />
        </div>
    </div>
  )
}
