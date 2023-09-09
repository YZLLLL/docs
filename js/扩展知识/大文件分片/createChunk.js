export default function createChunk(file, size, index) {
  return new Promise((reslove, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (e) {
      // 获取到chunk内容
      const chunk = reader.result.slice(index * size, (index + 1) * size);
      // 计算md5
      // 假装计算
      new Promise(res => {
        setTimeout(function () {
          res('zxf1gasd2zx3as1as2x3asda2ks')
        }, Math.random() * 500)
      }).then(res => {
        reslove({
          chunk,
          hash: res,
          index,
        })
      })
    }
  })
}