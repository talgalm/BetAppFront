import { useState } from "react";
import { TypographyTypes } from "../../../Theme/Typography/typography";
import { Typography } from "../../Topography/topography";
import { BetInput, NumOfChars } from "./InputTextFull.styles";

const InputTextFull = () => {
  const [descriptionInput, setDescriptionInput] = useState("");

  return (
    <div>
      <BetInput
        placeholder="הקלד כאן את התיאור..."
        typography={TypographyTypes.H5}
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
      />
      <NumOfChars>
        <Typography
          value={`${descriptionInput.length} / 100`}
          variant={TypographyTypes.H7}
        />
      </NumOfChars>
    </div>
  );
};

export default InputTextFull;
