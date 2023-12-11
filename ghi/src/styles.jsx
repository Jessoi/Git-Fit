import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

export const StyledTextField = styled(TextField)`
  background-color: #333; /* Dark background color */
  color: #fff; /* Text color */
  border: 1px solid #fff; /* Border color */
  border-radius: 4px; /* Optional: Add border radius for rounded corners */

  & label {
    color: #fff; /* Label text color */

    /* Override focused state styles */
    &.Mui-focused {
      color: #fff !important; /* Set the label color when focused */
    }
  }

  & input {
    color: #fff; /* Input text color */

    /* Override focused state styles */
    &::placeholder {
      color: #fff; /* Set the placeholder color when focused */
    }

    &:focus {
      /* Additional styles for the input when focused */
      border-color: #fff; /* Border color when focused */
    }
  }
`;


