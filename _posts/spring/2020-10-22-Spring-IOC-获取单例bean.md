---
layout: post
title: "Spring IOC 容器源码分析(一) - 获取单例bean"
subtitle: ''
author: "YiBo"
header-style: text
tags:
  - Spring
  - IOC
---

## 1. 前记

距上次写已经12天了，进度太慢了，这些博客计划和我找工作的进度应该是息息相关的，通过这一系列的博客，复习之前几个月的学习内容，并且可以去面试

这篇文章主要详细分析`BeanFactory`的`getBean(String)`



## 2. 源码分析

### 2.1 `getBean(String)` 概览

![image-20201022110100702](/img/in-post/2020-10/image-20201022110100702.png)

![image-20201022110218810](/img/in-post/2020-10/image-20201022110218810.png)



> 以下内容可以做代码详情的流程

### 2.2 beanName转换

![image-20201022143728315](/img/in-post/2020-10/image-20201022143728315.png)

### 2.3 从缓存中获取bean实例

![image-20201022144807982](/img/in-post/2020-10/image-20201022144807982.png)

> **?????????????????????????? 这三个结果后续是怎么处理的**

> !!!!!!!!!!!!!!!!!!!!!!!! 通过 `getObjectForBeanInstance()` 完整的bean直接返回，不完整的bean还要经过处理:`factory.getObject()`

**上述流程表示：`getSingleton(beanName)`中返回三种结果： 完整的bean，不完整的bean，null**

上面用到的三个缓存集合：

| 缓存                  | 用途                                                         |
| :-------------------- | :----------------------------------------------------------- |
| singletonObjects      | 用于存放完全初始化好的 bean，从该缓存中取出的 bean 可以直接使用 |
| earlySingletonObjects | 用于存放还在初始化中的 bean，用于解决循环依赖                |
| singletonFactories    | 用于存放 bean 工厂。bean 工厂所产生的 bean 是还未完成初始化的 bean。如代码所示，bean 工厂所生成的对象最终会被缓存到 earlySingletonObjects 中 |

### 2.4 合并父 BeanDefinition 与子 BeanDefinition

```xml
<bean id="hello" class="xyz.coolblog.innerbean.Hello">
    <property name="content" value="hello"/>
</bean>

<bean id="hello-child" parent="hello">
    <property name="content" value="I`m hello-child"/>
</bean>
```

```java
String configLocation = "application-parent-bean.xml";
ApplicationContext applicationContext = new ClassPathXmlApplicationContext(configLocation);
System.out.println("hello -> " + applicationContext.getBean("hello"));
System.out.println("hello-child -> " + applicationContext.getBean("hello-child"));
```

![image-20201022151012903](/img/in-post/2020-10/image-20201022151012903.png)

由测试结果可以看出，hello-child 在未配置 class 的属性下也实例化成功了，表明它成功继承了父配置的 class 属性。



![image-20201022152041282](/img/in-post/2020-10/image-20201022152041282.png)

这个看的不是很清楚，源码就疯狂自己调自己，或是自己的重载方法

但是功能很清楚，就是讲父类的属性，套用到的子类上去，让子类继承父类的配置，并且也可以在未配置class的属性下实例化成功

> ??????????????????这部分还能说的更明白一点吗？



### 2.5 从 FactoryBean 中获取 bean 实例 `getObjectForBeanInstance()`

上面的内容中，不管是从缓存中获取还是直接创建，最终返回的都是这个方法

![image-20201022155242993](/img/in-post/2020-10/image-20201022155242993.png)

![image-20201022155541218](/img/in-post/2020-10/image-20201022155541218.png)

> ???????????????????问题
>
> 每次取的时候都先从缓存取？什么时候可能有缓存呢
>
> 在我看来，这个方法唯一有效的动作就是 factory.getObject() 调用工厂方法生成bean实例，就是把之前生成不完整的bean完整了？剩下就是一些判断

> !!!!!!!!!!!!! 通过 `factory.getOjbect()` 将不完整的bean完整了

![image-20201022160211427](/img/in-post/2020-10/image-20201022160211427.png)



**这是`getBean()`中的源码，创建单例bean的部分，这里重写的`getObject()`不正是`getObjectForBeanInstance()` 中被我称作唯一有效的方法吗，调用之后，bean对象就是完整的bean了**



### 3 总结

写到最后，了解了不少，想想如果现在让我回答 ： spring中bean是怎么生成的？

缓存，依赖（earlySingletonObjects.get()），父类，单例，多例，bean（完整）， FactoryBean（不完整），前置处理，后置处理



先看缓存中有没有

注册依赖其他的bean

​   依次实例化 、 从缓存中获取（完整、非完整）

单例，多例的创建

创建过程中的前置后置处理的设置

​   