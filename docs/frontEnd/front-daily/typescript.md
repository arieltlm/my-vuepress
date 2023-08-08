# TypeScript 使用技巧

[[toc]]

## js 补充类型定义

### 声明文件

- 作用：是给 js 代码**补充**类型标注。这样在 ts 编译环境下就不会提示 js 文件“缺少类型”。
- 使用方式：
  - 单独发布声明文件，@types/xxx（scope = @types，xxx 是我们的包名）
  - 发布的包中自带声明文件，package.json 中在 types 中定义我们具体的声明文件入口。如果入口在根目录下且名字叫 index.d.ts 则不用指定 types。

### declare

在声明文件中，通过 declare 我们可以标注 js 全局变量的类型。

```ts
declare var n: number;
declare let s: string;
declare const o: object;
declare function f(s: string): number;
declare enum dir {
  top,
  right,
  bottom,
  left,
}

```
### namespace

- 代表声明的是一个对象

  ```ts
  declare namespace A {
    var n: number;
    var s: string;
    var f: (s: string) => number;
  }
  
  A.n = 1;
  A.s = "1";
  A.f(1);
  
  interface A {
    n: number;
    s: string;
    f: (s: string) => number;
  }
  
  declare const a: A;
  ```

- 我们一般不会用命名空间来声明一个对象，一般都是为了声明一个声明对象，防止因为定义太多重复

  ```ts
  declare namespace Food {
    type A = Window;
    interface Fruits {
      taste: string;
      hardness: number;
    }
  
    interface Meat {
      taste: string;
      heat: number;
    }
  }
  
  /// <reference path='a.d.ts'/>
  let meat: Food.Meat;
  let fruits: Food.Fruits;
  ```

  ```ts
  export namespace Food {
    type A = Window;
    interface Fruits {
      taste: string;
      hardness: number;
    }
  
    interface Meat {
      taste: string;
      heat: number;
    }
  }
  
  import { Food } from "./a.d";
  let meat: Food.Meat;
  let fruits: Food.Fruits;
  ```
- 或者用于给已经定义的类型补充定义（想象一下 es6 的 class），以 antd table 为例子

```js
// 假代码
function Column() {}
function ColumnGroup() {}
function Summary() {}

function Table() {
  this.defaultProps = { rowKey: "key" };
  this.SELECTION_ALL = "SELECT_ALL";
  this.SELECTION_INVERT = "SELECT_INVERT";
  this.SELECTION_NONE = "SELECT_NONE";
}
Table.prototype.Column = Column;
Table.prototype.ColumnGroup = ColumnGroup;
Table.prototype.Summary = Summary;
```

```ts
declare function Table<RecordType extends object = any>(
  props: TableProps<RecordType>
): JSX.Element;
declare namespace Table {
  var defaultProps: {
    rowKey: string;
  };
  var SELECTION_ALL: "SELECT_ALL";
  var SELECTION_INVERT: "SELECT_INVERT";
  var SELECTION_NONE: "SELECT_NONE";
  var Column: typeof import("./Column").default;
  var ColumnGroup: typeof import("./ColumnGroup").default;
  var Summary: typeof import("rc-table/lib/Footer/Summary").default;
}
export default Table;
```

- 我们的框架中给 React 补充类型定义

  ```ts
  declare namespace React {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      styleName?: string;
      ["data-opid"]?: number;
      ["data-content"]?: string;
    }
  }
  ```

- 在 ts 中使用，上述都是给 js 补充声明文件。不过这种很少用。

  ```ts
  namespace aaa {
    const b = 1;
  
    export function a() {
      console.log(b);
    }
  }
  export default aaa;
  
  import aaa from "./a";
  aaa.a();
  aaa.b; // 报错
  ```

  ### module

主要是对应 `import A from 'a'`，当我们使用的第三方库不存在声明文件的时候，我们需要自己补充一个申明文件。

```ts
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.bmp";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.webp";

declare module "moment" {
  import { Dayjs } from "dayjs";

  namespace moment {
    type Moment = Dayjs;
  }
  // 等价于 export default moment; 不过使用这种方式必须开启 "esModuleInterop": true
  export = moment;

  // 如果包是umd 模式，没么这个包可以通过 import 导入
  // 也可以通过 script 导入
  // 这种写法就是为了 script 导入时候，可以全局使用
  export as namespace moment;
}

// 第一种
import { Moment } from "moment";
let a: Moment;

// 第二种
let a: moment.Moment;
```
## 内置函数

### 从 T 中移除 K
`Exclude<T, K>`

```ts
type A = 1 | "2" | 2 | 3;
type B = 1 | 3;
type C = Exclude<A, B>; // 2 | "2"
```
### 交集
`Extract<T, K>`

与上边相反，求的是交集

```ts
type A = 1 | "2" | 2 | 3;
type B = 1 | 3;
type C = Extract<A, B>; // 1 | 3
```

### 从选出 T 中选择 K
`Pick<T, K>`

```ts
interface Base {
  a: number;
  b: string;
  d: number;
}

interface C extends Pick<Base, "a" | "b"> {
  c: number;
}

let c: C = { a: 1, b: "1", c: 1 };

interface C extends Pick<Base, "a"> {
  c: number;
}

let c: C = { a: 1, b: "1", c: 1 }; // 报错不存在 b

// 报错 Base 中没有 m
interface C extends Pick<Base, "a" | "m"> {
  c: number;
}
```

### 从 T 中移除 K
`Omit<T, K>`



```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

interface C extends Omit<Base, "a"> {
  c: number;
}
interface C2 extends Omit<Base, "a" | "b"> {
  c: number;
}
```

### 从 T 中类型变为只读
`Readonly<T>`



```ts
interface A {
  a: number;
  b: string;
}

type B = Readonly<A>;

let b: B = {
  a: 1,
  b: "2",
};

b.a = 1; // 报错
```

### 将 T 类型都变为可选
`Partial<T>`

```ts
interface A {
  a: number;
  b: string;
}

type B = Partial<A>;

let b1: B = { a: 1 };
let b2: B = { b: "1" };
let b3: B = { a: 1, b: "1" };
```

### 将 T 类型都变为必选
`Required<T>`

```ts
interface A {
  a?: number;
  b?: string;
}

type B = Required<A>;

let b1: B = { a: 1 }; // 报错
let b2: B = { b: "1" }; // 报错
let b3: B = { a: 1, b: "1" };
```

### Record
`Record<K, T>`
两者等价

```ts
interface Base {
  [key: string]: any;
}

type Base = Record<string, any>;
```

### 使用频率最高的

- Record
- Partial
- Omit

## 延伸

### 范型

```ts
interface A<T> {
  value: T;
}

// 报错，value 类型是 number
const a: A<number> = { value: "1" };
```

### 范型约束

```ts
interface A<T extends object> {
  value: T;
}

// 报错 number 不满足 object 的约束
type B = A<number>;
```

```ts
interface A<T extends { children?: T[] }> {
  value: T;
}

interface B {
  a: number;
  b: number;
}
// 报错 B 不满足 { children?: T[] } 的约束
type X = A<B>;

interface C {
  a: number;
  b: number;
  children?: C[];
}
type Y = A<C>;
```

### 范型默认值

```ts
interface A<T> {
  value: T;
}

// 报错必须传递一个类型参数
const a: A = { value: 1 };

interface B<T = any> {
  value: T;
}

const b: B = { value: 1 };
const c: B = { value: "1" };
// 错误 value 不是 number 类型
const d: B<number> = { value: "1" };
```

### typeof/keyof

```ts
interface A {
  a: number;
  b: string;
}
const a: A = { a: 1, b: "1" };

(Object.keys(a) as (keyof A)[]).forEach((key) => {
  console.log(a[key]);
});

const b = { a: 1, b: "1" };
(Object.keys(b) as (keyof typeof b)[]).forEach((key) => {
  console.log(b[key]);
});
```





