import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from '@mui/material/Accordion';

export const StyledAccordion = styled(Accordion)`
  && {
    background-color: #333;
    color: #fff;
  }
`;

export const StyledDeleteIcon = styled(DeleteIcon)`
&& {
  color: '#bbbbbb';
}
`;

export const DarkBackgroundBox = styled(Box)`
  && {
    background-color: #333; /* Dark background color */
    color: #fff; /* Text color for dark background */
    /* Add other styling properties as needed */
  }
`;

export const DarkBackgroundPaper = styled(Paper)`
  && {
    background-color: #333; /* Dark background color */
    color: #fff; /* Text color for dark background */
    /* Add other styling properties as needed */
  }
`;

export const DarkBackgroundSelect = styled(Select)`
  && {
    color: #fff; /* Text color for dark background */
    /* Add other styling properties as needed */
  }
`;
export const DarkInputLabel = styled(InputLabel)`
  && {
    color: #fff; /* Text color for dark background */
    /* Add other styling properties as needed */
  }
`;

export const DarkInput = styled(Input)`
  && {
    color: #fff; /* Text color for dark background */
    /* Add other styling properties as needed */
  }
`;

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

export const StyledTableCell = styled(TableCell)`
  color: #fff; /* Text color */
  background-color: #333;
`;

export const StyledTableHead = styled(TableCell)`
  color: #fff; /* Text color */
  background-color: #333;
  font-size: 18px;
  font-weight: bold;
`;

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #555; /* Alternative background color for odd rows */
  }
`;

export const OrangeTextButton = styled(Button)`
  color: orange !important;
  background-color: transparent !important
`;

export const StyledNavbar = styled(AppBar)`
  background-color: #545554 !important;
`;