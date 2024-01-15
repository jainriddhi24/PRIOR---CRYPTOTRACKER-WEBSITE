import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import {
  CryptoState
} from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./Authentication/UserSidebar";
import logo from "../components/asset/logo1.png";


const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#fa0505",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    type: "light",
  },
});

function Header() {
  const classes = useStyles();
  const history = useNavigate();

  const {
    currency,
    setCurrency,
    user
  } = CryptoState();

  console.log(currency);

  return (
    <ThemeProvider className="shadow" theme={lightTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <img src={logo} style={{ width: '50px', height: '50px', marginRight: '2px' }} alt="Logo" />
            <Typography
              onClick={() => history(`/`)}
              variant="h6"
              className={classes.title}
            >
              PRIOR
            </Typography>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"

              style = {
                {
                  width: 100,
                  height: 40,
                  marginLeft: 15
                }
              }

              value = {currency}
              onChange = {(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>

            {user? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;