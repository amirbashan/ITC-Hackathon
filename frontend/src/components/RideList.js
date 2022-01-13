import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import RideCard from "./RideCard";

export default function RideList({ rides }) {
  return (
    <>
      {rides?.length === 0 && (
        <Alert severity="warning">No rides to display : </Alert>
      )}
      {rides && (
        <Container sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {rides.map((ride) => (
              <RideCard key={ride._id} ride={ride} />
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
}
