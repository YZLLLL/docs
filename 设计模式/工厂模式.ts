class CarFactory {
  // 创建挖掘机的工厂函数
  createExcavator(color: string, price: number): Car {
    return new Car("挖掘机", 4, color, price);
  }
  createCommon(wheel: number, color: string, price: number): Car {
    return new Car("普通的车", wheel, color, price);
  }
}

interface car {
  price: number,
  name: string,
  wheel: number,
  color: string,
}

class Car implements car {
  constructor(public name: string, public wheel: number, public color: string, public price: number) {}
}

const carFactory = new CarFactory();

const excavator = carFactory.createExcavator("white", 130000)