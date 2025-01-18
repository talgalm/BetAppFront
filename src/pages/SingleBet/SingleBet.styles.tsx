import { styled } from "@mui/material/styles";

export const BetRow = styled("div")({
  display: "flex",
  flexDirection: "row-reverse",
  width: "100%",
  height: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
});
export const AvatarsDiv = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: -10,
  position: "relative",
});

export const Circle = styled("div")({
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "1.5px solid var(--Background-Lavender-Mist, #EDEDF5)",
  background: "url('<path-to-image>') lightgray 50% / cover no-repeat",
  transition: "transform 0.2s ease",
  left: 5,
  position: "relative",
});

export const CircleMore = styled("div")({
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "1.5px solid var(--Background-Lavender-Mist, #EDEDF5)",
  background: "var(--Status-Wild-Blue-Yonder, #7F8CB9)",
  transition: "transform 0.2s ease",
  left: 5,
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const DescriptionDiv = styled("div")({
  display: "flex",
  width: 154,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: 4,
  flexShrink: 0,
  direction: "rtl",
});
