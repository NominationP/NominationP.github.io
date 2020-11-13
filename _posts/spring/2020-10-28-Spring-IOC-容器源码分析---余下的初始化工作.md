---
layout: post
title: "Spring IOC 容器源码分析（六）- 余下的初始化工作"
subtitle: ''
author: "YiBo"
header-style: text
tags:
  - Spring
  - IOC
typora-root-url: ../../../yibo.github.io
---



## 1. 前记

这篇文章是这个系列的最后一篇文章，bean填充属性后，进行最后的初始化工作，也就是`initializeBean`



## 2. 源码分析

![image-20201112102826923](/img/in-post/2020-10/image-20201112102826923.png)

- ![image-20201112103004414](/img/in-post/2020-10/image-20201112103004414.png)
- ![image-20201112103053750](/img/in-post/2020-10/image-20201112103053750.png)





## 3. 总结

这个系列的文章全程摘抄 [Spring IOC 容器源码分析 - 余下的初始化工作](https://www.shuzhiduo.com/A/E35pAl2Ldv/) 这位大佬的文章

断断续续也终于算结束了

虎头蛇尾也不为过了，过了N天细节都忘记了，只记得我搞明白过bean ：）



如果这样，那我写的有啥意义呢，必须要回顾，进行更深层次的理解

回到 [Spring IOC 源码剖析总览](https://nominationp.github.io/2020/10/10/Spring-IOC-%E6%BA%90%E7%A0%81%E5%89%96%E6%9E%90%E6%80%BB%E8%A7%88/) 来看看我列出来的几个问题，能不能 **「自问自答」**



-------------

**附录**

| IOC文章列表                                                  |
| ------------------------------------------------------------ |
| [Spring IOC 源码剖析总览](https://nominationp.github.io/2020/10/10/Spring-IOC-源码剖析总览/) |
| [Spring IOC 容器源码分析（一）- 获取单例bean](https://nominationp.github.io/2020/10/22/Spring-IOC-获取单例bean/) |
| [Spring IOC 容器源码分析（二）- 创建单例 bean 的过程](https://nominationp.github.io/2020/10/23/Spring-IOC-容器源码分析-创建单例bean的过程/) |
| [Spring IOC 容器源码分析（三）- 创建原始 bean 对象](https://nominationp.github.io/2020/10/25/Spring-IOC-容器源码分析-三-创建原始-bean-对象/) |
| [Spring IOC 容器源码分析（四）- 循环依赖的解决办法](https://nominationp.github.io/2020/10/26/Spring-IOC-容器源码分析-循环依赖的解决办法/) |
| [Spring IOC 容器源码分析（五） - 填充属性到 bean 原始对象](https://nominationp.github.io/2020/10/27/Spring-IOC-容器源码分析-五-填充属性到-bean-原始对象/) |
| **[Spring IOC 容器源码分析（六）- 余下的初始化工作](https://nominationp.github.io/2020/10/28/Spring-IOC-%E5%AE%B9%E5%99%A8%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90-%E4%BD%99%E4%B8%8B%E7%9A%84%E5%88%9D%E5%A7%8B%E5%8C%96%E5%B7%A5%E4%BD%9C/)** |

