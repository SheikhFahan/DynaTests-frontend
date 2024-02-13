import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link } from 'react-router-dom';

import TableComp from "./TableComp";
import BadgeComp from "./BadgeComp";
import { DatasetController } from "chart.js";

const AccordionComp = ({
  name,
  data,
  isTable,
  copyHandler,
  copySuccess,
  type,
  userId,
  link,
}) => {
  return (
    <Accordion flush alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header className="relative">
          <div>{name} </div>
          <div>
          <Link to={link}>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-2 underline absolute right-11 top-5 rounded"
            onClick={(e)=> {
              e.stopPropagation();
            }}>
              Create {name}
            </button>
            </Link>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          {isTable ? (
            <TableComp
              data={data}
              handler={copyHandler}
              copySuccess={copySuccess}
              type={type}
              userId={userId}
            />
          ) : (
            <BadgeComp data={data} link = {link}/>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AccordionComp;
