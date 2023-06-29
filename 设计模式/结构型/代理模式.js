/**             代理模式
 * 允许你提供一个代理对象（ProxyImage）来控制对被代理对象(RealImage)的访问。
 * 它充当客户端和目标对象之间的中介，添加了额外的功能层。
 *
 * 代理模式在实际开发中常用于延迟加载（懒加载）、访问控制、缓存等场景，可以帮助提升系统的性能和安全性。
 */
var RealImage = /** @class */ (function () {
    function RealImage(filname) {
        this.filname = filname;
        this.loadImageFromDisk();
    }
    RealImage.prototype.loadImageFromDisk = function () {
        console.log("\u52A0\u8F7D\u56FE\u7247\uFF1A".concat(this.filname));
    };
    RealImage.prototype.displayImage = function () {
        console.log("\u663E\u793A\u56FE\u7247\uFF1A".concat(this.filname));
    };
    return RealImage;
}());
var ProxyImage = /** @class */ (function () {
    function ProxyImage(filname) {
        this.filname = filname;
    }
    ProxyImage.prototype.displayImage = function () {
        if (!this.realImage) {
            this.realImage = new RealImage(this.filname);
        }
        this.realImage.displayImage();
    };
    return ProxyImage;
}());
var image = new ProxyImage("图片");
image.displayImage();
