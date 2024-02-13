import React, { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

const InstituteTestSummary = () => {

    const testHistory = useState([
    ])
  return (
    <Card className="border border-gray-300 shadow-md mb-4">
      <Card.Body>
        <Card.Title className="text-xl font-semibold mb-4">
          Test History
        </Card.Title>

        {testHistory.length > 0 ? (
          <ListGroup>
            {testHistory.map((test, index) => (
              <ListGroup.Item key={index} className="flex justify-between">
                <div>
                  <strong>this is  al ong line that i am typing just to check my typing skills apparantly it aint that good</strong>
                  <p>Date: {test.date}</p>
                </div>
                <div>
                  <p>Score: {test.score}</p>
                  <p>Duration: {test.duration}</p>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No test history available.</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default InstituteTestSummary;
