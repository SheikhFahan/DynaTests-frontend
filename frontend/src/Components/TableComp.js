import React, {useState} from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import ButtonComp from "./ButtonComp";
import { Button } from "react-bootstrap";
const TableComp = ({ data, handler, copySuccess, type, userId }) => {

  const formatDate = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };


  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Session</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Duration</th>
          <th>Password</th>
          <th>Session Link</th>
          <th>Delete Session</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{formatDate(item.start_time)}</td>
            <td>{formatDate(item.end_time)}</td>
            <td>{item.duration} mins</td>
            {item.has_password ? (
              <td>
                <Link to="/" className="text-black">
                  Change Password
                </Link>
              </td>
            ) : (
              <td>No password</td>
            )}
            <td
              onClick={() => handler(`${process.env.REACT_APP_DEP_URL}${type}${userId}/${item.pk}/`, index)}
              className="underline"
            >
              {
                copySuccess[index] ? copySuccess[index]: "Share Link"
              }
              
            </td>
            <td>
              <Link to="/" className="text-black">
                Delete Session
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComp;
