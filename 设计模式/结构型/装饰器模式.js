/**
 * 装饰器模式（Decorator Pattern）是一种结构型设计模式.
 * 它允许在不改变对象接口的情况下，动态地给对象添加新的功能。
 * 装饰器模式通过将对象包装在一个装饰器类中，然后将装饰器类与原始对象进行组合，从而实现对对象的功能扩展。
 */
var Component = /** @class */ (function () {
  function Component() {}
  Component.prototype.operation = function () {
    console.log("执行原本的操作");
  };
  return Component;
})();
var Decorator = /** @class */ (function () {
  function Decorator(component) {
    this.component = component;
  }
  Decorator.prototype.operation = function () {
    this.component.operation();
    this.additionalOperation();
  };
  Decorator.prototype.additionalOperation = function () {
    console.log("执行装饰器提供的额为操作");
  };
  return Decorator;
})();
var component = new Component();
var decorator = new Decorator(component);
decorator.operation();
/**
 * 在上面的示例中，原始对象（Component）定义了一个操作方法。
 * 装饰器类（Decorator）接受一个原始对象作为参数，并在操作方法中调用原始对象的操作。
 * 然后执行额外的操作。通过将装饰器类与原始对象组合，可以动态地给原始对象添加新的功能，而无需修改原始对象的接口。
 * 装饰器模式可以用于动态地给对象添加新的行为，而不需要对现有对象进行修改。
 * 它在需要扩展对象功能时非常有用，同时也遵循了开闭原则（对扩展开放，对修改关闭）。
 */
