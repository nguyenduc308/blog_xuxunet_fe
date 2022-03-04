export const debounce = (callback, delay = 250, isImmediate = false) => {
    let timerId;
    return function() {
        const ctx = this;
        const arg = arguments;
        const later = function() {
            timerId = null;
            callback.apply(ctx, arg);
        };
  
        if (isImmediate && !timerId) {
            callback.apply(ctx, arg);
        }
  
        if (!isImmediate) {
            clearTimeout(timerId);
  
            timerId = setTimeout(later, delay);
        }
    }
  };
