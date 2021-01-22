---
layout: post
title: "ThreadLocal到底是什么"
subtitle: ''
author: "YiBo"
header-style: text
tags:
  - Spring  
  - 多线程
  - 到底是什么
typora-root-url: ../../../yibo.github.io
date: 2020-11-17 14:00
---

## 1. 前记

[spring中的bean是线程安全的吗?]()这篇文章引出并解释了 `ThreadLocal`

## 2. 理解Java中的ThreadLocal

### 2.1 源码

```java
public void set(T value) {
    Thread t = Thread.currentThread(); // 获取当前线程
    ThreadLocalMap map = getMap(t); // 获取t线程的变量threadLocals
    if (map != null)
        map.set(this, value); // 进行赋值
    else
        createMap(t, value);
}

ThreadLocalMap getMap(Thread t) {
    return t.threadLocals;
}
```



### 2.2 对象放在那里

java中 线程 - 栈内存 - 堆内存的关系

![image-20201117175900060](/img/in-post/2020-11/image-20201117175900060.png)

上图中，每个线程中都有一个私有的栈内存

**但是threadlocal不是在栈内存存放，而是在堆内存**



### 2.3 使用 InheritableThreadLocal 共享

可以使用 InheritableThreadLocal 复制父线程的数据



### 2.4 不会导致内存泄露

ThreadLocalMap 在选择 key 的时候，并不是直接选择ThreadLocal实例，而是ThreadLocal实例的**弱引用**



### 2.5 使用场景

- 实现线程安全

  



#### reference 

https://droidyue.com/blog/2016/03/13/learning-threadlocal-in-java/

https://droidyue.com/blog/2014/12/07/differences-between-stack-and-heap-in-java/

