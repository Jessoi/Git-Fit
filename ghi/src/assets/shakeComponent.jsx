import { styled, keyframes } from "@mui/system";
import Box from "@mui/material/Box";

const shakeKeyframes = keyframes`
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
`;

const ShakeBox = styled(Box)(({ theme, shouldShake }) => ({
  animation: shouldShake ? `${shakeKeyframes} 1s ease infinite` : "none",
}));

export default ShakeBox;
