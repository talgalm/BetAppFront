import { useState } from "react";
import { TypographyTypes } from "../../../Theme/Typography/typography";
import { Typography } from "../../Topography/topography";
import { BetInput, NumOfChars } from "./InputTextFull.styles";
interface InputTextFullProps {
  inputRef: React.RefObject<HTMLInputElement>; 
}

const InputTextFull: React.FC<InputTextFullProps> = ({ inputRef }) => {
  const [descriptionInput, setDescriptionInput] = useState("");

  return (
    <div>
      <BetInput
        ref={inputRef}
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
