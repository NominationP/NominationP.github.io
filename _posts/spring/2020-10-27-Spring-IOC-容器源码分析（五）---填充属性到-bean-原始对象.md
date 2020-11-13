---
layout: post
title: "Spring IOC 容器源码分析（五） - 填充属性到 bean 原始对象"
subtitle: ''
author: "YiBo"
header-style: text
tags:
  - Spring
  - IOC
typora-root-url: ../../../yibo.github.io
date: 2020-10-27
---

## 1. 前言

填充属性到bean原始对象，不就是用set方法把一些属性设置进去嘛

但是大佬说还有一些别的，比如

- 所有属性值都是以字符串的形式进行配置的，我们在将这些属性值赋值给对象的成员变量时，要根据变量类型进行相应的类型转换
- 对于一些集合类的配置，比如、和，还要将这些配置转换成相应的集合对象才能进行后续的操作
- 如果用户配置了自动注入（autowire = byName/byType），Spring 还要去为自动注入的属性寻找合适的注入项

我觉得也还好，来看看源码吧



> 这篇写的很寡，直接看总结吧



## 2. 源码分析

### 2.1 populateBean 源码一览

<img src="/img/in-post/2020-10/image-20201025165937498.png" alt="image-20201025165937498" style="zoom:100%;" />

![image-20201025170100259](/img/in-post/2020-10/image-20201025170100259.png)

1. 获取属性列表 pvs

2. 在属性被填充到 bean 前，应用后置处理自定义属性填充

3. 根据名称或类型解析相关依赖（autowire）

   该逻辑只会解析依赖，并不会将解析出的依赖立即注入到 bean 对象中。所有的属性值是在 applyPropertyValues 方法中统一被注入到 bean 对象中的。

4. 再次应用后置处理，用于动态修改属性列表 pvs 的内容

5. 将属性应用到 bean 对象中



### 2.2 autowireByName

![image-20201025170510753](/img/in-post/2020-10/image-20201025170510753.png)

### 2.3 autowireByType

![image-20201025170750090](/img/in-post/2020-10/image-20201025170750090.png)

### 2.4 applyPropertyValues方法分析

通过上面的解析，最后通过此方法注入

![image-20201025171631588](/img/in-post/2020-10/image-20201025171631588.png)

![image-20201025171805548](/img/in-post/2020-10/image-20201025171805548.png)

上面来张图我没有截完整，因为作者也不是很明白，我也觉得好晦涩难懂，同时，我觉得也没啥研究必要，最后把大佬的总结粘过来

1. 检测属性值列表是否已转换过的，若转换过，则直接填充属性，无需再次转换
2. 遍历属性值列表 pvs，解析原始值 originalValue，得到解析值 resolvedValue
3. 对解析后的属性值 resolvedValue 进行类型转换
4. 将类型转换后的属性值设置到 PropertyValue 对象中，并将 PropertyValue 对象存入 deepCopy 集合中
5. 将 deepCopy 中的属性信息注入到 bean 对象中



## 3. 总结

本文对 populateBean 方法及其所调用的 autowireByName、autowireByType 和 applyPropertyValues 做了较为详细的分析

我写完，大脑对细节还是一片空白，只是知道注入参数的大概方式

面试题 bean是怎么填充属性的

- name解析
- type解析
- 最后通过 applyPropertyValues 真正注入



-------------

**附录**

| IOC文章列表                                                  |
| ------------------------------------------------------------ |
| [Spring IOC 源码剖析总览](https://nominationp.github.io/2020/10/10/Spring-IOC-源码剖析总览/) |
| [Spring IOC 容器源码分析（一）- 获取单例bean](https://nominationp.github.io/2020/10/22/Spring-IOC-获取单例bean/) |
| [Spring IOC 容器源码分析（二）- 创建单例 bean 的过程](https://nominationp.github.io/2020/10/23/Spring-IOC-容器源码分析-创建单例bean的过程/) |
| [Spring IOC 容器源码分析（三）- 创建原始 bean 对象](https://nominationp.github.io/2020/10/25/Spring-IOC-容器源码分析-三-创建原始-bean-对象/) |
| [Spring IOC 容器源码分析（四）- 循环依赖的解决办法](https://nominationp.github.io/2020/10/26/Spring-IOC-容器源码分析-循环依赖的解决办法/) |
| **[Spring IOC 容器源码分析（五） - 填充属性到 bean 原始对象](https://nominationp.github.io/2020/10/27/Spring-IOC-容器源码分析-五-填充属性到-bean-原始对象/)** |
| [Spring IOC 容器源码分析（六）- 余下的初始化工作](https://nominationp.github.io/2020/10/28/Spring-IOC-%E5%AE%B9%E5%99%A8%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90-%E4%BD%99%E4%B8%8B%E7%9A%84%E5%88%9D%E5%A7%8B%E5%8C%96%E5%B7%A5%E4%BD%9C/) |

