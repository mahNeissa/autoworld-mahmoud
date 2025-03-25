import React from 'react'
import PropTypes from 'prop-types'
import StepProgressBar from "react-step-progress"
import "react-step-progress/dist/index.css"

const StatusStepper = props => {
  // const {steps, currentStep} = props

  const step1Content = <h1></h1>
  const step2Content = <h1></h1>
  const step3Content = <h1></h1>

  const steps = [
    {
      label: "Pending",
      name: "Pending",
      content: step1Content
    },
    {
      label: "Approved",
      name: "Approved",
      content: step2Content
    },
    {
      label: "Pending For Publishing",
      name: "Pending For For Publishing",
      content: step3Content
      // validator: step2Validator
    },
    {
      label: "Published",
      name: "Published",
      content: step3Content
    }
  ]

  const currentStep = 2

  function step2Validator() {
    return true
  }

  function step3Validator() {
    // return a boolean
  }

  return (
      <div style={{textAlign:'center'}}>
        <StepProgressBar
            startingStep={currentStep}
            steps={steps}
            onSubmit={() => {}}
            secondaryBtnClass={'d-none'}
            primaryBtnClass={'d-none'}
        />
      </div>
  )
}

StatusStepper.propTypes = {

}

export default StatusStepper
