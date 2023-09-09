import createChunk from "./createChunk.js"
onmessage = function (event) {
  const {
    file,
    startIndex,
    endIndex,
    CHUNCK_SIZE
  } = event.data;
  console.log(startIndex,
    endIndex)
  // console.log(startIndex, endIndex)
  const promises = [];
  for (let i = startIndex; i < endIndex; i++) {
    promises.push(createChunk(file, CHUNCK_SIZE, i));
  }
  Promise.all(promises).then(res => {
    postMessage(res);
  })
  
};