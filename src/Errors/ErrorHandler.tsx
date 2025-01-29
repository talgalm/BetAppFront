export const ErrorHandler = (showBoundray?: (error: Error) => void) => {
  console.log('showBoundray:', showBoundray);
  if (showBoundray) {
    console.log('Calling showBoundray with new Error');
    showBoundray(new Error('!_!'));
  } else {
    console.log('showBoundray is undefined');
  }
};
