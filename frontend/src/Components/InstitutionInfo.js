import React from 'react';
import { Card } from 'react-bootstrap';

const InstitutionInfo = ({ college_name, email, phone, university_name, address }) => {
  return (
    <Card className="border border-gray-300 shadow-md">
      <Card.Body>
        <Card.Title className="text-xl font-semibold mb-4">Institution Information</Card.Title>
        
        <Card.Text className="mb-2 text-black">
          <strong className="mb-2 text-black">College Name:</strong> {college_name}
        </Card.Text>
        
        <Card.Text className="mb-2 text-black">
          <strong className="mb-2 text-black">Email:</strong> {email}
        </Card.Text>
        
        <Card.Text className="mb-2 text-black">
          <strong className="mb-2 text-black">Phone:</strong> {phone}
        </Card.Text>
        
        <Card.Text className="mb-2 text-black">
          <strong className="mb-2 text-black">University Name:</strong> {university_name}
        </Card.Text>
        
        <Card.Text className="mb-2 text-black">
          <strong className="mb-2 text-black">Address:</strong> {address}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default InstitutionInfo;
