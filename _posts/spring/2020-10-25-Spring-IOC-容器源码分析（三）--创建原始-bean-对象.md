---

layout: post
title: "Spring IOC 容器源码分析（三）- 创建原始 bean 对象"
subtitle: ''
author: "YiBo"
header-style: text
tags:
  - Spring
  - IOC
typora-root-url: ../../../yibo.github.io
---

## 1 前记

上篇是 创建bean的过程，在最后总结中，第三步： 创建wrapperBean中调用了`createBeanInstance()`方法

本节将介绍

1. 三种不同的方法构建bean对象
2. 构造bean对象的俩种策略

## 2. 源码分析

### 2.1 创建bean对象的过程

![image-20201025135730387](/img/in-post/2020-10/image-20201025135730387.png)

![image-20201025140232984](/img/in-post/2020-10/image-20201025140232984.png)

1. 检测类的访问权限，若禁止访问，则抛出异常
2. 若工厂方法不为空，则通过工厂方法构建 bean 对象，并返回结果
3. 若构造方式已解析过，则走快捷路径构建 bean 对象，并返回结果
4. 如第三步不满足，则通过组合条件决定使用哪种方式构建 bean 对象

这里有三种构造 bean 对象的方式，如下：

1. 通过“工厂方法”的方式构造 bean 对象
2. 通过“构造方法自动注入”的方式构造 bean 对象
3. 通过“默认构造方法”的方式构造 bean 对象



### 2.2 通过 构造方法自动注入 的方式创建 bean 实例

![image-20201025141513824](/img/in-post/2020-10/image-20201025141513824.png)

第二部分

![image-20201025142110615](/img/in-post/2020-10/image-20201025142110615.png)

![image-20201025142348728](/img/in-post/2020-10/image-20201025142348728.png)

![image-20201025142626172](/img/in-post/2020-10/image-20201025142626172.png)

![image-20201025142902818](/img/in-post/2020-10/image-20201025142902818.png)

![image-20201025143013864](/img/in-post/2020-10/image-20201025143013864.png)

第三部分

![image-20201025143408662](/img/in-post/2020-10/image-20201025143408662.png)

1. 创建 BeanWrapperImpl 对象
2. 解析构造方法参数，并算出 minNrOfArgs
3. 获取构造方法列表，并排序
4. 遍历排序好的构造方法列表，筛选合适的构造方法
   1. 获取构造方法参数列表中每个参数的名称
   2. 再次解析参数，此次解析会将value 属性值进行类型转换，由 String 转为合适的类型。
   3. 计算构造方法参数列表与参数值列表之间的类型差异量，以筛选出更为合适的构造方法
5. 缓存已筛选出的构造方法以及参数值列表，若再次创建 bean 实例时，可直接使用，无需再次进行筛选
6. 使用初始化策略创建 bean 对象
7. 将 bean 对象放入 BeanWrapperImpl 对象中，并返回该对象



> ???????????
>
> 想要理解的更深刻，我觉得要把各种配置下的构造函数配置测试一下，才能理解
>
> 但另一方面我觉得也没啥必要，这里的主要工作，额，可以回顾一下，他是标题：通过 “构造方法自动注入的方式创建bean实例”
>
> 核心便是，根据参数值类型筛选合适的构造方法，再通过实例化策略去生成

### 2.3 通过 默认构造方法 的方式创建bean实例

![image-20201025144408343](/img/in-post/2020-10/image-20201025144408343.png)

通过无参构造方法创建bean对象

![image-20201025144538494](/img/in-post/2020-10/image-20201025144538494.png)





## 3 总结

这里主要分析了构造bean的三种方式，俩种策略

- 工厂方法构造 （没有详细源码）
- 构造方法自动注入 （详细源码）
- 默认构造 （详细源码）

经过上面3中方法构造成功后，再通过俩种策略去实现

- 反射 （详细源码）
- GCLTG （没有详细源码）



ok，面试题： 构造bean对象的三种方式，以及俩种策略

-------------

**附录**

| IOC文章列表                                                  |
| ------------------------------------------------------------ |
| [Spring IOC 源码剖析总览](https://nominationp.github.io/2020/10/10/Spring-IOC-源码剖析总览/) |
| [Spring IOC 容器源码分析（一）- 获取单例bean](https://nominationp.github.io/2020/10/22/Spring-IOC-获取单例bean/) |
| [Spring IOC 容器源码分析（二）- 创建单例 bean 的过程](https://nominationp.github.io/2020/10/23/Spring-IOC-容器源码分析-创建单例bean的过程/) |
| **[Spring IOC 容器源码分析（三）- 创建原始 bean 对象](https://nominationp.github.io/2020/10/25/Spring-IOC-容器源码分析-三-创建原始-bean-对象/)** |
| [Spring IOC 容器源码分析（四）- 循环依赖的解决办法](https://nominationp.github.io/2020/10/26/Spring-IOC-容器源码分析-循环依赖的解决办法/) |
| [Spring IOC 容器源码分析（五） - 填充属性到 bean 原始对象](https://nominationp.github.io/2020/10/27/Spring-IOC-容器源码分析-五-填充属性到-bean-原始对象/) |
| [Spring IOC 容器源码分析（六）- 余下的初始化工作](https://nominationp.github.io/2020/10/28/Spring-IOC-%E5%AE%B9%E5%99%A8%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90-%E4%BD%99%E4%B8%8B%E7%9A%84%E5%88%9D%E5%A7%8B%E5%8C%96%E5%B7%A5%E4%BD%9C/) |







