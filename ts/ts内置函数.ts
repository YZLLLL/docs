/**
 * 返回一个去除xx属性的接口
 * 例如 interface A {
 *  name: string,
 *  age: number,
 *  height: number,
 *  weight: number,
 *  ...等等
 * }
 * 有一个新类型和A一样，但是仅仅没有height属性
 */


// 在TypeScript中，有一些内置的类型函数可以用来操作和转换类型。以下是一些常用的类型函数： 

// 1.  Partial<T> ：将类型 T 中的所有属性转换为可选属性。例如， Partial<{ name: string, age: number }> 将返回 { name?: string, age?: number } 。 
 
// 2.  Required<T> ：将类型 T 中的所有可选属性转换为必选属性。例如， Required<{ name?: string, age?: number }> 将返回 { name: string, age: number } 。 
 
// 3.  Readonly<T> ：将类型 T 中的所有属性转换为只读属性。例如， Readonly<{ name: string, age: number }> 将返回 { readonly name: string, readonly age: number } 。 
 
// 4.  Pick<T, K> ：从类型 T 中选择指定的属性 K ，并返回一个新的类型。例如， Pick<{ name: string, age: number }, 'name'> 将返回 { name: string } 。 
 
// 5.  Omit<T, K> ：从类型 T 中排除指定的属性 K ，并返回一个新的类型。例如， Omit<{ name: string, age: number }, 'name'> 将返回 { age: number } 。 

interface A {
  name: string,
  age: number,
  height: number,
  weight: number, 
}

type OptionalProps<T, K extends keyof T> = Partial<T> & Omit<T, K>
type OptionalPerson = OptionalProps<A, 'age' | 'name'>;

