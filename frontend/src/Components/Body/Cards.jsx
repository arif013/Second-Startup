import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


export default function MediaCard( props ) {
  return (
    <>
      {props.shoe.map((entry) => (
        
        <Card key={entry.id} sx={{ maxWidth: 345, padding: "10px 20px" }}>
          <CardMedia
            sx={{ height: 380, width: "100%" }}
            image={entry.imageUrl}
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {entry.Title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {entry.Price}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
