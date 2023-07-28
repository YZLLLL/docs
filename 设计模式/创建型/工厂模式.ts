interface car {
  price: number,
  name: string,
  wheel: number,
  color: string,
}

class Car implements car {
  constructor(public name: string, public wheel: number, public color: string, public price: number) {}
}

class CarFactory {
  // 创建挖掘机的工厂函数
  createExcavator(color: string, price: number): Car {
    return new Car("挖掘机", 4, color, price);
  }
  createCommon(wheel: number, color: string, price: number): Car {
    return new Car("普通的车", wheel, color, price);
  }
}

const carFactory = new CarFactory();

const excavator = carFactory.createExcavator("white", 200000); // 创建了一辆挖掘机

const common = carFactory.createCommon(4, "black", 80000); // 创建了一辆车