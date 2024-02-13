import React, { useEffect, useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


import axios from "axios";
import TestHistory from "./TestHistory";

const StudentInfo = ({ name, email, phone, address }) => {
  const navigate = useNavigate();

  const handleChangePassword =  ()=>{
    navigate('/change_password')
  }
  const handleEditInformation =  ()=>{
    navigate('/edit_information', { state: { name, email, phone, address } });
  }

  return (
    <Card className="min-h-screen min-w-full border-0 px-4   ">
      <Card.Body className="flex flex-col border-r border-r-gray-300 border-r-solid border-r-3 ">
        <Card.Title className="text-xl font-semibold mb-4 underline">
          Personal Information
        </Card.Title>
        <Card.Text className="mb-1 text-xl ">Name: {name}</Card.Text>
        <Card.Text className="mb-1 text-xl">Email: {email}</Card.Text>
        <Card.Text className="mb-1 text-xl">Phone: {phone}</Card.Text>
        <Card.Text className="mb-3 text-xl">Address: {address}</Card.Text>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold  text-md rounded mb-2"
          onClick={handleEditInformation}
        >
          Edit Information
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold text-md rounded mb-2"
          onClick={handleChangePassword}
        >
          Change Password
        </button>
        <Card.Text className="my-3 mt-5 pb-1 px-1 min-w-full  bg-gray-200 rounded-md">
            Test History:
          <div className=" max-h-60 border-gray-300 border-3  bg-gray-100 overflow-y-scroll">
            <TestHistory />
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StudentInfo;
