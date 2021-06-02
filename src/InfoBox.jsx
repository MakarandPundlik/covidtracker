import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infobox">
        <CardContent>
            <Typography className="card_title" color="textSecondary">{title}</Typography>
            <Typography className="card_title" variant="h4">{cases}</Typography>
            <Typography className="card_title" color="textSecondary">{total} total</Typography>
        </CardContent>
    </Card>
  );
}

export default InfoBox;
