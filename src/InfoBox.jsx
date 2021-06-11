import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import numeral from "numeral";
const useStyles = makeStyles({

 infoboxRed:{
    borderTop:"10px solid #ff1100",
    color:"#ff1100"
 },
 infoboxGreen:{
  borderTop:"10px solid #008a30",
  color:" #008a30"
},
infoBoxViolet:{
  borderTop:"10px solid #15009e",
  color:"#15009e"
}
})
function InfoBox({ title, cases, total,isRed,isGreen,isViolet,...props }) {
  const classes = useStyles();
  //console.log(title);
  
  return (
    <Card onClick={props.onClick}>
      <CardContent className={`${isRed?classes.infoboxRed:null} ${isViolet?classes.infoBoxViolet:null} ${isGreen?classes.infoboxGreen:null}`}>
        <Typography>{title}</Typography>
        <Typography variant="h4">{cases ? `+${numeral(cases).format("0.0a")}` : "+0"}</Typography>
        <Typography>{total ? `+${numeral(total).format("0.0a")}` : "+0"} total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
