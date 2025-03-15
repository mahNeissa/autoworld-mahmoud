import { Card, CardHeader, CardTitle, CardBody, Form, FormGroup, Label, Input } from 'reactstrap'

export const UnCheckboxBasic = () => {
    return (
        <Card>
            <div className='demo-inline-spacing'>
                <FormGroup check inline>
                    <Input type='checkbox' defaultChecked disabled/>
                </FormGroup>
            </div>
        </Card>
    )
}
export const CheckboxBasic = () => {
  return (
    <Card>
          <div className='demo-inline-spacing'>
            <FormGroup check inline>
              <Input type='checkbox' defaultChecked id='basic-cb-checked' />
             </FormGroup>
          </div>
    </Card>
  )
}

