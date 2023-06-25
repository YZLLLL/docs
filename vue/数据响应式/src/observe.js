import Observer from "./Observer";
export default function observe(data) {
  if (data === null || typeof data !== "object") {
    return;
  }
  let ob;
  if (data.__ob__) {
    ob = data.__ob__;
  } else {
    ob = new Observer(data);
  }
  return ob;
}