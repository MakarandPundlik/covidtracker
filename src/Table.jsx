import { makeStyles } from "@material-ui/core";
import React from "react";


const useStyles = makeStyles({
  table: {
    overflow: "scroll",
    height: "400px",
  },
  tr: {
    display: "flex",
    justifyContent: "space-between",
    "&:nth-of-type(odd)": {
      backgroundColor: "#dfeaed",
    },
  },
  td: {
    padding: "0.5rem",
  },
});
function Table({ countries }) {
  const classes = useStyles();

  return (
    <div className={classes.table}>
      {countries.map(({ country, cases }) => (
        <tr className={classes.tr}>
          <td className={classes.td}>{country}</td>
          <td className={classes.td}>{cases}</td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
