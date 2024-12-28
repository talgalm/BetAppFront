export const ErrorHandler = (showBoundray?: (error: any) => void) => {
  console.log("showBoundray:", showBoundray); // This will print whether showBoundray is passed or not
  if (showBoundray) {
    console.log("Calling showBoundray with new Error");
    showBoundray(new Error("!_!"));
  } else {
    console.log("showBoundray is undefined");
  }
};
