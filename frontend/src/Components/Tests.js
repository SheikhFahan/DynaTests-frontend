import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

const Tests = () => {
  const cardData = [
    {
      title: "Focused Tests",
      content:
        "Tests which contain questions from a unique category like Coding, Physics, Python etc.",
        type : "focused_tests"
    },
    {
      title: "Comprehensive Tests",
      content:
        "Tests which contain questions from a multiple categorie like JEE is composed of Physics, Chemisty and Maths etc.",
        type : "comprehesive_tests",
    },
  ];
  return (
    <div className="flex flex-wrap justify-center items-center p-14 mb-10">
      {cardData.map((card, index) => (
        <Card
          key={index}
          to={`/categories/${card.type}/`}
          as={Link}
          className="no-underline w-25 h-40 m-10 p-10 min-h-80 bg-gradient-to-b from-gray-100 to-white border-2 border-gray-300 hover:shadow-md hover:border-gray-500"
        >
          <Card.Title className="text-xl text-center mb-4 underline">
            {card.title}
          </Card.Title>
          <Card.Body>
            <Card.Text className="no-underline">{card.content}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Tests;
