import React from 'react'
import { Card } from "react-bootstrap";

const ContactInfo = () => {
  return (
    <Card className="">
      <Card.Body className="">
        <Card.Title className="">
          Student Information
        </Card.Title>
        <Card.Text className="mb-1 ">business.fahan@gmail.com</Card.Text>
        <Card.Text className="mb-1 ">https://github.com/SheikhFahan</Card.Text>
        <Card.Text className="mb-1 ">https://www.linkedin.com/in/sheikh-fahan/</Card.Text>
        <Card.Text className="mb-1 ">+917889445581</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ContactInfo