import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import numeral from "numeral";
const useStyles = makeStyles({
 infobox:{
   color:"#ff1100"
 },
 infoboxActiveRed:{
    borderTop:"10px solid #ff1100",

 },
 infoboxActiveGreen:{
  borderTop:"10px solid #008a30",
  color:" #008a30"
}    
})
function InfoBox({ title, cases, total,active,isRed,...props }) {
  const classes = useStyles();
  //console.log(title);
  
  return (
    <Card onClick={props.onClick}>
      <CardContent className={`${classes.infobox}  ${active&&!isRed?classes.infoboxActiveGreen:null} ${isRed&&active?classes.infoboxActiveRed:null}`}>
        <Typography>{title}</Typography>
        <Typography variant="h4">{cases ? `+${numeral(cases).format("0.0a")}` : "+0"}</Typography>
        <Typography>{total ? `+${numeral(total).format("0.0a")}` : "+0"} total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
