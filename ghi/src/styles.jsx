import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

export const StyledTextField = styled(TextField)`
  background-color: #333;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;

  & label {
    color: #fff;

    &.Mui-focused {
      color: #fff !important;
    }
  }

  & input {
    color: #fff;

    &::placeholder {
      color: #fff;
    }

    &:focus {
      border-color: #fff;
    }
  }
`;
