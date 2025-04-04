
export const log = (...args: any[]) => {
    if (__DEV__) {
      console.log("[LOG]:", ...args);
    }
  };
  
  export const warn = (...args: any[]) => {
    if (__DEV__) {
      console.warn("[WARN]:", ...args);
    }
  };
  
  export const error = (...args: any[]) => {
    console.error("[ERROR]:", ...args); 
  };
  