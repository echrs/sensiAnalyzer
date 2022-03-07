import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from '@mui/material';
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <div>
       <Typography variant="h2">Sensitive skin? We are here to help. Select what you don’t want in your product.</Typography>
      {/* //loopaj filtere */}
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="end"
          control={<Checkbox /> }
          label="End"
          labelPlacement="end"
        />
        <FormControlLabel
          value="end"
          color="white"
          control={<Checkbox />}
          label="End"
          labelPlacement="end"
        />
        <FormControlLabel
          value="end"
          control={<Checkbox />}
          label="End"
          labelPlacement="end"
        />
        <FormControlLabel
          value="end"
          control={<Checkbox />}
          label="End"
          labelPlacement="end"
        />
      </FormGroup>
      <FormControl sx={{ width: "55ch" }}>
        <OutlinedInput multiline="true" placeholder="Paste your ingredients here..." value="AQUA, COCO-CAPRYLATE, METHYLPROPANEDIOL, GLYCERIN, ISOAMYL LAURATE, BUTYROSPERMUM PARKII BUTTER, POTASSIUM CETYL PHOSPHATE, PANTHENOL, RESVERATROL, CAFFEINE, CAMELLIA SINENSIS LEAF EXTRACT, LECITHIN, ALLANTOIN, SODIUM ACRYLATE/SODIUM ACRYLOYLDIMETHYL TAURATE COPOLYMER, CYANOCOBALAMIN, ISOHEXADECANE, GLYCERYL STEARATE CITRATE, CARBOMER, XANTHAN GUM, CAPRYLYL GLYCOL, POLYSORBATE 80, SODIUM HYDROXIDE, SODIUM PHYTATE, LACTIC ACID, SODIUM BENZOATE, POTASSIUM SORBATE, PHENOXYETHANOL"/>
      </FormControl>
      <Button disableElevation variant="contained">
        Go!
      </Button>
    </div>
  );
}
