import {
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button as MuiButton,
  Typography,
  ButtonProps,
} from "@mui/material";
import { useRef, useState } from "react";

const Button = (props: ButtonProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiButton variant="outlined" {...props} />
);

const Home = () => {
  const [env, setEnv] = useState<string>("");
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <form ref={formRef} method="post">
      <Grid container p="45px" spacing={3}>
        <Grid item lg={4} xs={12}>
          <FormControl fullWidth>
            <TextField placeholder="acstkn" name="acstkn" />
          </FormControl>
        </Grid>
        <Grid item lg={4} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Test</InputLabel>
            <Select
              onChange={e => setEnv(e.target.value as string)}
              value={env}
              label="測試環境"
            >
              <MenuItem value="local">local</MenuItem>
              <MenuItem value="sit">SIT</MenuItem>
              <MenuItem value="uat">UAT</MenuItem>
              <MenuItem value="prod">PROD</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            button: {
              margin: "8px",
            },
          }}
        >
          <Grid item xs={12}>
            <Typography p="8px">ABCD</Typography>
            <Button>campaigns</Button>
            <Button>active-campaigns</Button>
          </Grid>
          <Grid item xs={12}>
            <Typography p="8px">EFG</Typography>
            <Grid container>
              <Grid item xs={3}>
                <TextField placeholder="ASDFW" id="payment-id" />
              </Grid>
              <Grid item xs={3}>
                <Button>GO TO WADW</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Home;
