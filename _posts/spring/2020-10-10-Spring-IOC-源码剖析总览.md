---
layout: post
title: "Spring IOC 源码剖析总览"
subtitle: ''
author: "YiBo"
header-style: text
tags:
  - Spring
  - IOC
---

## 1. 前记

之前总是杞人忧天，思考写博客的时候到底在写什么，现在都2020年了，网上有一大堆类似的博客

现在再想想，首先博客是给自己看的，要对自己负责。至于之后再说

我写这个模块的初衷就是：让自己懂Spring IOC,懂到不惧怕面试官对于这方面的任何问题，我会列一系列问题，如果都明白，那么目的就达成了

- 

## 2. 如何下手

有了目标，不如就从我目前看的博客开始

[Spring IOC 容器源码分析系列文章导读](http://www.tianxiaobo.com/2018/05/30/Spring-IOC-%E5%AE%B9%E5%99%A8%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E7%B3%BB%E5%88%97%E6%96%87%E7%AB%A0%E5%AF%BC%E8%AF%BB/)

![image-20201010135053178](/img/in-post/2020-10/image-20201010135053178.png)

## 3. IOC概念

![image-20201010135520963](/img/in-post/2020-10/image-20201010135520963.png)



## 4. IOC部分特性介绍



### 4.1 autowire

![image-20201010140522825](/img/in-post/2020-10/image-20201010140522825.png)

![image-20201010141141373](/img/in-post/2020-10/image-20201010141141373.png)



#### 通过上图，对`autowire`有了新的理解，之前用这个注解很多次，如果写成XML格式，就是上述所示。我经常使用这个注解的时候，就会报错，说读不到，那就是应该我要取的类还没在容器中



### 4.2 FactoryBean

factorybean是一种可以产生 bean 的 bean

![image-20201010142128820](/img/in-post/2020-10/image-20201010142128820.png)

> ?????????????

#### 这个例子就很绕，折腾半天，为了表明实现`FactoryBean`的Bean，既可以获取到真正要获取的bean（Hello）还可以获取到他本身（HelloFactory） 让我很疑惑，为什么要这样做呢，像上面直接把一个普通得类放容器不就好了吗？希望后续可以揭晓



> 以上内容我写了40分钟 我是猪

### 4.3 factory-method

factory-method 可用于标识静态工厂的工厂方法（工厂方法是静态的）

我觉得没啥重要，不写了

### 4.4 lookup-method

这里，主要是觉得这个例子比较有意思

```xml
<bean id="news" class="xyz.coolblog.lookupmethod.News" scope="prototype"/>
<bean id="newsProvider" class="xyz.coolblog.lookupmethod.NewsProvider">
    <property name="news" ref="news"/>
</bean>
```

这里直接通过代码来说需求，上述配置文件就是一个单例的 `newsProvider` 需要引入一个非单例的 `news`

按照这样配置，newsProvider中的news是不会变的

解决的俩种方法：
![image-20201010143710511](/img/in-post/2020-10/image-20201010143710511.png)



![image-20201010143917483](/img/in-post/2020-10/image-20201010143917483.png)



### 4.5 depends-on

![image-20201010144151429](/img/in-post/2020-10/image-20201010144151429.png)

###  4.6 BeanPostProcessor

BeanPostProcessor 是 Spring 框架的一个扩展点，通过实现 BeanPostProcessor 接口，我们就可插手 bean 实例化的过程。比如大家熟悉的 AOP 就是在 bean 实例后期间将切面逻辑织入 bean 实例中的，AOP 也正是通过 BeanPostProcessor 和 IOC 容器建立起了联系

> ？？？？？？？？？？ **具体怎么联系的，想不到，期待后续**

![image-20201010144520165](/img/in-post/2020-10/image-20201010144520165.png)

#### 总结一下这一小节，可以看成是对XML文件中的配置项多了几个了解，不同的配置有什么用，比如 

#### alias 给bean创建别名

#### autowire 自动（根据bean的name等）引入依赖

#### factory-method 标识静态方法 

#### lookup-method 让引入的非单例类每次都是全新的

#### depends-on 定义bean注册的顺序

#### FactoryBean 我认为是一种模式，但还不知道有啥用

#### ApplicationContextAware 接口 获取容器中信息的入口

#### BeanPostProcessor 定制化bean生成前后的动作



## 5 写在最后

整篇文章写下来，会让我觉得很乱，从视觉上来说，这篇博客从根本上来说没有任何价值，对我只是让我更加记忆深刻，也为我后续的写作积攒经验

工作一年俩年三年，我都在混沌（第三次出现了。。）中度过，回首往事，没有什么值得去叙说的，写文章应该是个不错的开始

