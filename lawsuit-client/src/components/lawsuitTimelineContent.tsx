import "../styles/adjustTimeline.scss";

import {
  Avatar,
  Box,
  Typography,
  Card,
  colors,
  Container,
} from "@material-ui/core";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@material-ui/lab";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Court, Involved, Subject, Event } from "../types/types";

interface LawsuitTimelineContentProps {
  customStyle?: React.CSSProperties;
  events: Event[];
}
function LawsuitTimelineContent({ customStyle, events }: LawsuitTimelineContentProps) {
  return (
    <Timeline
      style={{
        margin: 0,
        ...customStyle,
      }}
      align="left"
    >
      {events.map((item, index) => (
        <OrderItem
          key={item.date}
          item={item}
          isLast={index === events.length - 1}
        />
      ))}
    </Timeline>
  );
}

function OrderItem({ item, isLast }: {item: Event, isLast: boolean}) {
  const { date, documents } = item;

  return (
    <TimelineItem className="adjust-timeline">
      <TimelineSeparator>
        <TimelineDot />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{date}</Typography>
        {documents.map(({ created_at, label, description }) => (
          <Card
            key={created_at}
            style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
          >
            <Typography variant="caption">{label}</Typography>
            <Typography variant="caption">
              {description}
            </Typography>
          </Card>
        ))}
      </TimelineContent>
    </TimelineItem>
  );
}

export default LawsuitTimelineContent;
