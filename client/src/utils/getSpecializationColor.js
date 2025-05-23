const colorPalette = [
  "purple",
  "cyan",
  "volcano",
  "green",
  "blue",
  "magenta",
  "orange",
  "red",
  "lime",
  "gold",
  "geekblue",
  "yellow",
];

const specializationColorMap = {};
let colorIndex = 0;

export default function getSpecializationColor(specializationName) {
  if (!specializationName) return "default";
  if (!specializationColorMap[specializationName]) {
    specializationColorMap[specializationName] =
      colorPalette[colorIndex % colorPalette.length];
    colorIndex++;
  }
  return specializationColorMap[specializationName];
}
