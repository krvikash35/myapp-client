const eventName = "myCustomEvent";

class MyEvent {
  dispatch = (type, payload) => {
    const evt = new CustomEvent(eventName, { detail: { type, payload } });
    window.dispatchEvent(evt);
  };
  subscribe = fn => {
    window.addEventListener(eventName, fn);
  };
  unsubscribe = fn => {
    window.removeEventListener(eventName, fn);
  };
}

const myevent = new MyEvent();
export default myevent;
