import React, { useState } from 'react';
import { Autocomplete, TextField, Chip, Box } from '@mui/material';
import { ChipContainer } from './UserAutocomplete.styles';

type UserAutocompleteProps = {
  options: string[];
  value: string[];
  onChange: (event: React.SyntheticEvent, newValue: string[]) => void;
};

const UserAutocomplete: React.FC<UserAutocompleteProps> = ({ options, value, onChange }) => {
  const [error, setError] = useState(false);

  const handleBlur = () => {
    if (value.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <Box>
      <Autocomplete
        multiple
        options={options}
        value={value}
        onChange={(event, newValue) => {
          setError(false);
          onChange(event, newValue);
        }}
        onBlur={handleBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Options"
            error={error}
            helperText={error ? 'Please select at least one user.' : ''}
          />
        )}
        renderTags={(value, getTagProps) => (
          <ChipContainer>
            {value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return <Chip key={key} label={option} {...tagProps} />;
            })}
          </ChipContainer>
        )}
        ListboxProps={{
          style: {
            maxHeight: '150px',
            overflow: 'auto',
          },
        }}
      />
    </Box>
  );
};

export default UserAutocomplete;
