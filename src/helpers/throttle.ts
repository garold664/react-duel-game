/* eslint-disable @typescript-eslint/no-explicit-any */
function throttle<R, A extends any[]>(cb: (...args: A) => R, delay = 100) {
  let shouldWait = false;
  let waitingArgs: A | undefined = undefined;

  const timeoutCallback = () => {
    if (waitingArgs === undefined) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = undefined;
      setTimeout(timeoutCallback, delay);
    }
  };

  return (...args: A) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }
    cb(...args);
    shouldWait = true;

    setTimeout(timeoutCallback, delay);
  };
}

export default throttle;
