import * as React from 'react';
import Cards from "./Cards";
import { useEffect, useState } from "react";
import { Grid, Container } from "@mui/material";



export default function SearchAppBar() {
  const [shoe, setShoe] = useState([
    {
      id: "",
      title: "",
      price: "",
      imageUrl: "",
    },
  ]);
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((jsonRes) => setShoe(jsonRes));
  }, []);

  return (
    <>
    <Grid sx={{flexGrow: 1, justifyContent: "center"}} container spacing={{xs:2, md:0}}>
      <Cards  shoe={shoe} />
      </Grid>
    </>
  );
}






