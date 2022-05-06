import "./SkillBox.css";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SkillCard from "./SkillCard.js";
import Typography from "@mui/material/Typography";
import DjangoImg from "../img/django.png";
import FigmaImg from "../img/figma.png";
import HtmlImg from "../img/html5.png";
import ReactImg from "../img/react.png";
import BootstrapImg from "../img/bootstrap.png";
import MySQLImg from "../img/mysql.png";
import PostgreSQLImg from "../img/postgresql.png";
import ExpressjsImg from "../img/expressjs.png";
import ASPNetCoreImg from "../img/ASP.NET_Core.png";
import SqliteImg from "../img/sqlite.png";
import GitImg from "../img/git.png";

const frontend = [
  {
    id: "Html",
    name: "Html",
    img: HtmlImg,
  },
  {
    id: "React",
    name: "React",
    img: ReactImg,
  },
  {
    id: "Bootstrap",
    name: "Bootstrap",
    img: BootstrapImg,
  },
];

const backend = [
  {
    id: "Django",
    name: "Django",
    img: DjangoImg,
  },
  {
    id: "Express.js",
    name: "Express.js",
    img: ExpressjsImg,
  },
  {
    id: ".NET Core",
    name: ".NET Core",
    img: ASPNetCoreImg,
  },
];

const database = [
  {
    id: "MySQL",
    name: "MySQL",
    img: MySQLImg,
  },
  {
    id: "PostgreSQL",
    name: "PostgreSQL",
    img: PostgreSQLImg,
  },
  {
    id: "Sqlite",
    name: "Sqlite",
    img: SqliteImg,
  },
];

const more = [
  {
    id: "Figma",
    name: "Figma",
    img: FigmaImg,
  },
  {
    id: "Git",
    name: "Git",
    img: GitImg,
  },
];

export default function SkillBox(props) {
  let data;

  switch (props.title) {
    case "Front-end":
      data = frontend;
      break;
    case "Back-end":
      data = backend;
      break;
    case "Database":
      data = database;
      break;
    default:
      data = more;
  }

  const [cards, updateCards] = useState(data);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCards(items);
  }

  return (
    <div className="BoxSet">
      <Typography variant="h" sx={{ fontWeight: "bold" }} color={props.color}>
        {props.title}
      </Typography>
      <hr
        style={{
          width: "80%",
          height: 1,
          backgroundColor: "#C9C9C9",
          borderColor: "#FFF3DE",
        }}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="cards">
          {(provided) => (
            <ul
              className="cards"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cards.map(({ id, name, img }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <SkillCard img={img} name={name} />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
