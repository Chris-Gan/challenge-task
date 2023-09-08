import '@testing-library/jest-dom';
import 'jest-canvas-mock';
HTMLCanvasElement.prototype.getContext = () => {
  // return whatever mock context you'd like here
  return {};
};
