import React from 'react';
import{
     Form
} from 'react-bootstrap';

const Addtextpart = ({label, disabled, type, className, value, onChange}) => {
    return(
        <Form.Group>
            {label}
            <Form.Control disabled={disabled} type={type} className={className} value={value} onChange={onChange} />
        </Form.Group>
    )
}
export default Addtextpart