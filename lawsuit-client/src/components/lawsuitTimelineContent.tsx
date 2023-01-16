import "../styles/adjustTimeline.scss";

import {
  Typography,
  Card,
  colors,
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
import { Event } from "../types/types";

interface LawsuitTimelineContentProps {
  customStyle?: React.CSSProperties;
  events: Event[];
}
function LawsuitTimelineContent({ customStyle, events }: LawsuitTimelineContentProps) {
  if (events.length === 0) return (
    <Typography>
      Não há eventos cadastrados para este processo
    </Typography>
  );
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
        <TimelineDot style={{ backgroundColor: "#C0D3F8" }} />
        {isLast ? null : (
          <TimelineConnector style={{ backgroundColor: "#C0D3F8" }} />
        )}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">
          {new Date(date).toLocaleDateString()}
        </Typography>
        {documents.map(({ created_at, label, description }) => (
          <Card
            key={created_at}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
              backgroundColor: "#EDF4FE",
              padding: 10,
            }}
          >
            <Typography variant="caption" style={{ fontWeight: "bold" }}>
              {label}
            </Typography>
            <Typography variant="caption" style={{ color: colors.grey[600] }}>
              {description}
            </Typography>
          </Card>
        ))}
      </TimelineContent>
    </TimelineItem>
  );
}

export default LawsuitTimelineContent;
