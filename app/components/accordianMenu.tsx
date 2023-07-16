'use client';
import useSWR from 'swr';
import { Accordion } from "react-bootstrap";

type AccordianProp = {
  accordian:[
    {
      _id:string
      id:number;
      title:string;
      items:[]
    }
  ]
}

const fetcher = (url:string) => fetch(url).then((res) => res.json());

export default function AccordianMenu() {

  const { data , error, isLoading } = useSWR(
    "/api/accordiandata",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

 const { accordian } : AccordianProp =  data ;

  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <nav id="accordian-nav" aria-label="secondary">
        <div id="accordian-nav-container">
          {accordian.map((element: {_id:string, title:string, items:[]}) => (
            <Accordion.Item eventKey={element._id} key={element._id}>
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
