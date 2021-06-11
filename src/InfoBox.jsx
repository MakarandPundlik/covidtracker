import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infobox">
      <CardContent>
        <Typography>{title}</Typography>
        <Typography variant="h4">{total}</Typography>
        <Typography>{total} total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
