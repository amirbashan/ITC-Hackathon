import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import rideStatusMap from "../lib/rideStatusMap";
import useRideRequests from "../hooks/useRideRequests";
import RequestList from "./RequestList";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RideCard({ ride, isConstantSize = false }) {
  const { requests } = useRideRequests(ride._id);
  console.log(requests);
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
        // onClick={() => navigate(`/pets/${pet._id}`)}
      >
        <CardHeader
        //   avatar={petIconMap[pet.type]}

        // title={"hello"}
        // subheader={"Hello 2"}
        />
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            Pick up at:{" "}
            {ride.pickUp.coordinates[0] + " , " + ride.pickUp.coordinates[1]}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Drop off At:{" "}
            {ride.dropOff.coordinates[0] + " , " + ride.dropOff.coordinates[1]}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Requested Time: {ride.rideTime}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Ride Status: {rideStatusMap[ride.status]}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Price Alone: {ride.priceAlone || "N/A"}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Price Split: {(ride.priceSplit + 2) / 2 || "N/A"}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={(e) => {
              e.stopPropagation();
              handleExpandClick();
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container spacing={2}>
              {requests && <RequestList rides={requests} />}
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
