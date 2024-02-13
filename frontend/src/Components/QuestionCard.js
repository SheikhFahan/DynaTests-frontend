import React from 'react';
import { Card, Form } from 'react-bootstrap';
// the category key and difficulty is for the combination questions make changes in the future to make it more unifrom 
const QuestionCard = ({ question, options , handleChoice, currentQuestion, categoryKey, difficulty, id}) => {
  return (
    <Card className=" border-0  min-w-full">
      <Card.Body className=''>
        <Card.Title className="mb-4">{currentQuestion}.  {question.text}</Card.Title>
        <Form.Group>
          {options.map((choice, index) => (
            <Form.Check
              key={index}
              type="radio"
              id={`choice-${index}`}
              label={choice.text}
              name={id}
              onClick={() => handleChoice( question.pk, choice.pk, categoryKey, difficulty )}
            />
          ))}
        </Form.Group>
      </Card.Body>
      <div className='border-3'></div>
    </Card>
  );
};

export default QuestionCard;