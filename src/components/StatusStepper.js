import React from 'react'
import PropTypes from 'prop-types'
import StepProgressBar from "react-step-progress"
import "react-step-progress/dist/index.css"

const StatusStepper = (props) => {
    const { steps, startingStep } = props // Use props

    return (
        <div style={{ textAlign: 'center' }}>
            <StepProgressBar
                startingStep={startingStep} // Use startingStep from props
                steps={steps} // Use steps from props
                onSubmit={() => {}}
                secondaryBtnClass={'d-none'}
                primaryBtnClass={'d-none'}
            />
        </div>
    )
}

StatusStepper.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            content: PropTypes.node.isRequired
        })
    ).isRequired,
    startingStep: PropTypes.number.isRequired
}

export default StatusStepper