"use client";
import React from "react";
import { Accordion } from "react-bootstrap";
import { AccordianType } from "../types";
import "bootstrap/dist/css/bootstrap.min.css";

const accordianData: AccordianType[] = [
  {
    id: 1,
    title: "Men's Shoes",
    items: [
      "Skate",
      "Trainers",
      "Boots",
      "Basketball",
      "Stilletos",
      "Loafers",
      "Ballet",
      "High-Heels",
      "Dress",
    ],
  },
  {
    id: 2,
    title: "Women's Shoes",
    items: [
      "Skate",
      "Trainers",
      "Boots",
      "Basketball",
      "Stilletos",
      "Loafers",
      "Ballet",
      "High-Heels",
      "Dress",
    ],
  },
  {
    id: 3,
    title: "Kids's Shoes",
    items: ["Trainers", "Boots", "Basketball", "Loafers", "Ballet", "Dress"],
  },
  {
    id: 4,
    title: "Acessories",
    items: ["Handbags", "Scarfs", "Belts", "Hats"],
  },
];

export default function AccordianMenu() {
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <nav id="accordian-nav" aria-label="secondary">
        <div id="accordian-nav-container">
          {accordianData.map((element, index) => (
            // convert index to string for eventKey
            <Accordion.Item eventKey={`${index}`} key={index}>
              <Accordion.Header>{element.title}</Accordion.Header>
              <Accordion.Body>
                <div className="panel">
                  <ul>
                    {element.items.map((ele: string) => (
                      <li key={ele}>{ele}</li>
                    ))}
                  </ul>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </div>
      </nav>
    </Accordion>
  );
}
