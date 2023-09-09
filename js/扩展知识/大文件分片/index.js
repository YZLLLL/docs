const CHUNCK_SIZE = 1024 * 1024 * 5;
// navigator.hardwareConcurrency cpu核心数量
// 这里是最大开启的webworker数量
const THREAD_SIZE = navigator.hardwareConcurrency || 5;
const dom = {
  file: document.querySelector("#file"),
}

dom.file.addEventListener("change",function (e) {
  cutFile(e.target.files[0]).then(res=> {
    console.log(res)
  })
})

function cutFile(file) {
  return new Promise((res, rej) => {
    // 存放分片结果
    const result = [];
    // 文件分片数量
    const chunkCount = Math.ceil( file.size / CHUNCK_SIZE );
    // 每个线程需要处理的chun数量
    const workerChunkCount = Math.ceil( chunkCount / THREAD_SIZE );
    // 记录已经处理完的webworker数量
    let hasDone = 0;
    // 开启的webworker数量
    let workerCount = 0;
    for (let i = 0; i < THREAD_SIZE; i++) {
      const worker = new Worker("./worker.js", {
        type: "module"
      });
      // 起始下标
      const startIndex = i * workerChunkCount;
      if (startIndex > chunkCount) {
        break;
      }
      // 结束下标
      let endIndex = startIndex + workerChunkCount;
      if (endIndex > chunkCount) {
        endIndex = chunkCount;
      }
      workerCount++;
      // 下标 左闭合右开
      worker.postMessage({
        file,
        startIndex,
        endIndex,
        CHUNCK_SIZE
      })
      worker.onmessage = function (e) {
        // 这样就是按顺序的
        for (let i = startIndex; i < endIndex; i++) {
          result[i] = e.data[i - startIndex];
        };
        hasDone++;
        console.log(hasDone, workerCount);
        worker.terminate();
        if (hasDone === workerCount) {
          res(result);
        }
      };
    }
  })
}