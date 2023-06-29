/**             代理模式
 * 允许你提供一个代理对象（ProxyImage）来控制对被代理对象(RealImage)的访问。
 * 它充当客户端和目标对象之间的中介，添加了额外的功能层。
 * 
 * 代理模式在实际开发中常用于延迟加载（懒加载）、访问控制、缓存等场景，可以帮助提升系统的性能和安全性。
 */
class RealImage {
  constructor(public filname: string) {
    this.loadImageFromDisk();
  }

  loadImageFromDisk() {
    console.log(`加载图片：${this.filname}`);
  }

  displayImage() {
    console.log(`显示图片：${this.filname}`);
  }
}

class ProxyImage {
  public realImage: RealImage;
  constructor(public filname: string) {}

  displayImage() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filname);
    }
    this.realImage.displayImage();
  }
}

const image = new ProxyImage("图片");
image.displayImage();

/**
 * 以上代码展示了如何使用代理模式来控制对真实图片对象的访问。
 * 当调用代理对象的 displayImage() 方法时，它会先检查是否已经创建了真实图片对象，如果没有则创建并加载图片，然后调用真实图片对象的 displayImage() 方法来显示图片。 
 */