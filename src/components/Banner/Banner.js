import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";
import b1 from "../asset/btc.png"
const useStyles = makeStyles((theme) => ({
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
   
  },
}));

const Banner = () => {
  const classes = useStyles();
 
  return ( 
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={b1} style={{ width: '255px', height: '255px', margin:'5px', paddingTop: '30px',  }} alt="" />
           </div>
            <Container className={classes.bannerContent}>
              <div className={classes.tagline}>
                <Typography
                  variant="h1"
                  style={{
                    fontWeight: "bold",
                    marginBottom: 15,
                    fontFamily: "Montserrat",
                  }}
                >
                  PRIOR
                </Typography>
                <Typography
                  variant="subtitle2"
                  style={{
                    color: "lightblack",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat",
                  }}
                >
                  Navigate the Crypto Cosmos with Confidence!!
                </Typography>
              </div>
              <Carousel />
            </Container>
        </div>
    );
}

export default Banner;