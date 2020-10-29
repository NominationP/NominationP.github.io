---
layout: post
title: "Spring IOC 容器源码分析（二）- 创建单例 bean 的过程"
subtitle: ''
author: "YiBo"
header-style: text
tags:
  - Spring
  - IOC
typora-root-url: ../../../yibo.github.io
---



## 1 前记

上篇文章是`getBean` 写到最后，我一直在纠结非完整的bean到完整的bean到底是怎么生成的，这篇就是这个问题的答案

在看别人的文章时，对于代码的逻辑，我没有把源码贴出来，而是用mindnode去自己写了一个流程图，但最后写下来也是个庞然大物，和我预想的不是很一样

more is less 苹果的理念一直对我有些许影响，总是想着把东西简单化，但一定会缺失很多细节，重要吗？经过几年的感悟，很重要，可以说细节决定成败，甚至是区分一个人的重要标准（对我来说）

“复杂的东西就是很复杂” 几年前在读一篇英文博客读到的思想：有些东西就是复杂，简单不了，所以才会有门槛，一定是要理解这个复杂的东西，而不是去简单化（缺失细节）

所以我记录出来的庞然大物，可以让我舒服一点

但这从根本上来还是简单的，归纳他成为我的基础，是我必须要做的

还有一点，我在记录着一篇篇文章的时候一定要有重点，比如上篇：`getBean()` 就是获取bean的方法，而不是`createBean()` 

最后，这篇文章我打算用源码的方式去记录，比较比较效果



## 2 源码分析

### 2.1 创建bean实例的入口

首先看他是在哪里被调用，在`getbean()` 中

```java
public T doGetBean(...) {
    // 省略不相关代码
    if (mbd.isSingleton()) {
        sharedInstance = getSingleton(beanName, new ObjectFactory<Object>() {
            @Override
            public Object getObject() throws BeansException {
                try {
                    return createBean(beanName, mbd, args);
                }
                catch (BeansException ex) {
                    destroySingleton(beanName);
                    throw ex;
                }
            }
        });
        bean = getObjectForBeanInstance(sharedInstance, name, beanName, mbd);
    }
    // 省略不相关代码
}
```

`getSingleton(beanName,new ObjectFacotry<>(){})`

第二个参数是个类，这个类里面有个 `getObject()` 方法

说实话我写了3年代码，由于是PHP？所以这种写法很少见，但能理解，不就是参数传了个类吗 O.o

![image-20201023173503994](/img/in-post/2020-10/image-20201023173503994.png)



从上面的分析中，我们知道了 createBean 方法在何处被调用的。那么接下来我们一起深入 createBean 方法的源码中，来看看这个方法具体都做了什么事情。

通过`getOBject()` 调用`createBean()`

### 2.2 createBean()方法

![image-20201023165130546](/img/in-post/2020-10/image-20201023165130546.png)

这段代码没看懂，有三个问题

> ?????????????????????????
>
> 1. ResolveBeanClass(mbd,beanName) 解析bean类型是啥意思？mbd是什么？
> 2. Lookup-method replace-method override method ??
>   这里涉及到``prepareMethodOverrides` 根据下面的分析，只是标记了这个方法有没有重载方法，和 Lookup-method replace-method 有啥关系呢？？？
> 3. 前置后置处理方式？

贴心的博主，接下来会处理第2，3个问题

####  2.2.1 验证和准备 override 方法

Loopkuo-method 和 replace-method 是用户自行配置对bean增强的方式，在增强之前，要做一些准备工作`prepareMethodOverrides()`

![image-20201023165811870](/img/in-post/2020-10/image-20201023165811870.png)



不存在重载的方法，在使用 CGLIB 增强阶段就不需要进行校验，直接找到某个方法进行增强即可

> ????????????????????
>
> 如果有重载方法，怎么验证呢？

####  2.2.2 bean 实例化前的后置处理

![image-20201023170550746](/img/in-post/2020-10/image-20201023170550746.png)



####  2.2.3 调用 doCreateBean 方法创建 bean

![image-20201023172513174](/img/in-post/2020-10/image-20201023172513174.png)



![image-20201023172056529](/img/in-post/2020-10/image-20201023172056529.png)



![image-20201023175653490](/img/in-post/2020-10/image-20201023175653490.png)



1. 从缓存中获取 BeanWrapper 实现类对象，并清理相关记录
2. 若未命中缓存，则创建 bean 实例，并将实例包裹在 BeanWrapper 实现类对象中返回
3. 应用 MergedBeanDefinitionPostProcessor 后置处理器相关逻辑  ????????
4. 根据条件决定是否提前暴露 bean 的早期引用（early reference），用于处理循环依赖问题
5. 调用 populateBean 方法向 bean 实例中填充属性
6. 调用 initializeBean 方法完成余下的初始化工作
7. 注册销毁逻辑

这是作者总结的大致步骤，也是比较明显的，有几个步骤不是很懂，这里先写出来吧

> ??????????????????????
>
> 1. 应用 MergedBeanDefinitionPostProcessor 后置处理器相关逻辑？
> 2. 初始化完成后，干了些啥，然后才销毁的？

## 3 总结

这篇主要是讲了如何创建一个bean，面试题： bean的创建流程说一下

1. `先从缓存中获取，如果没有先标记正在创建，然后调用getObject()—>createBean()`
2. `createBean(): 解析bean的类型，校验是否重载方法，初始化前置后置，最后核心方法doCreateBean()`
3. BeanWrapper `createBeanInstance()`
4. `合并的BeanDefinition后置处理逻辑` ？？？ 虽然写出来了，但不懂
5. `放入singletonFactory 解决循环依赖`
6. 填充属性
7. 初始化（包括前置后置）
8. `又干了一堆不懂的逻辑`
9. 销毁注册逻辑（应该是清除一些缓存）
10. 返回
11. 将完整bean放入 `addSingleton` (本文没有此步骤，在函数之外) 

黑色的流程是我的直觉反应，如果看完这篇文章还不能多出几个，那就白看了，标记的是回顾文章加的



这篇文章写了一个多小时，感觉看着总结就舒服点。。又多了几个我不知道我不知道的问题







-------------

**附录**

| IOC文章列表                                                  |
| ------------------------------------------------------------ |
| [Spring IOC 源码剖析总览](https://nominationp.github.io/2020/10/10/Spring-IOC-源码剖析总览/) |
| [Spring IOC 容器源码分析（一）- 获取单例bean](https://nominationp.github.io/2020/10/22/Spring-IOC-获取单例bean/) |
| **[Spring IOC 容器源码分析（二）- 创建单例 bean 的过程](https://nominationp.github.io/2020/10/23/Spring-IOC-容器源码分析-创建单例bean的过程/)** |
| [Spring IOC 容器源码分析（三）- 创建原始 bean 对象](https://nominationp.github.io/2020/10/25/Spring-IOC-容器源码分析-三-创建原始-bean-对象/) |
| [Spring IOC 容器源码分析（四）- 循环依赖的解决办法](https://nominationp.github.io/2020/10/26/Spring-IOC-容器源码分析-循环依赖的解决办法/) |
| [Spring IOC 容器源码分析（五） - 填充属性到 bean 原始对象](https://nominationp.github.io/2020/10/27/Spring-IOC-容器源码分析-五-填充属性到-bean-原始对象/) |
| [Spring IOC 容器源码分析（六）- 余下的初始化工作](https://nominationp.github.io/2020/10/28/Spring-IOC-%E5%AE%B9%E5%99%A8%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90-%E4%BD%99%E4%B8%8B%E7%9A%84%E5%88%9D%E5%A7%8B%E5%8C%96%E5%B7%A5%E4%BD%9C/) |

