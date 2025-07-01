import React from "react";
import { Card, CardActions, CardContent, Typography, Button } from "@material-ui/core";
import { TooltipRenderProps } from "react-joyride";

const TourTooltip = (props: TooltipRenderProps) => {
  return (
    <Card {...props.tooltipProps}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.step.title}
        </Typography>
        <Typography variant="body2">
          {props.step.content}
        </Typography>
      </CardContent>
      <CardActions>
        {props.index > 0 && (
          <Button color="secondary" variant="text" {...props.backProps}>
            Back
          </Button>
        )}
        <Button color="primary" variant="text" {...props.primaryProps}>
          Next
        </Button>
      </CardActions>
    </Card>
  );
};

export default TourTooltip;
