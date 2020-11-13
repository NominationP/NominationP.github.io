---
layout: post
title: "Spring AOP 源码分析系列文章导读"
subtitle: ''
author: "YiBo"
header-style: text
tags:
  - Spring
  - AOP
typora-root-url: ../../../yibo.github.io
date: 2020-11-12 13:00
---

## 1. 前记

终于把 [Spring IOC 系列](https://nominationp.github.io/archive/?tag=IOC)搞完了，还是有所获

我写这些文章是因为恐惧，没有工作的恐惧，想入行java，却又迟迟没动手

很多时候，我认为我所做的一些所谓的「努力」只是流于表面，安慰自己罢了，比如买java课，比如看书

但怎么才能做到真正有效且高效呢 ----> 现在能给出的答案就是 **「向具体实际的目标靠近」**

比如我写这系列文章是为了什么 ----> **「找到java好的工作」**

和前面一个系列的文章一样，我觉得用看大佬博客，这个方式来完成 ---- [田小波- Spring AOP 源码分析系列文章导读](http://www.tianxiaobo.com/2018/06/17/Spring-AOP-%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E7%B3%BB%E5%88%97%E6%96%87%E7%AB%A0%E5%AF%BC%E8%AF%BB/)

这里再留一坑，等我看完这个系列：

#### **「自问自答」**

- 

## 2. AOP 原理

Aspect Oriented Program

AOP原理： 通过代理对象，运行插入到目标方法前后的方法

## 3. AOP术语

通过一个例子来简单表述吧 

参考 什么是面向切面编程AOP？ - 夏昊的回答 - 知乎 https://www.zhihu.com/question/24863332/answer/863736101

```java
@Repository
public class UserDao {
 public void addUser(){
 System.out.println("添加用户");
 }
 public void updateUser(){
 System.out.println("修改用户");
 }
 public void deleteUser(){
 System.out.println("删除用户");
 }
}
```



```java
@Aspect
public class MyAspectLog {
    /**
     * 方法执行完后执行的方法
     */
// 「通知（Advice）」after before after-returning after-throwing  aound
// 「切入点（Pointcut）」value="execution(* cn.xh.dao.UserDao.addUser(..))"
// 「切面（Aspect）」= 通知 + 切入点
// 「连接点（Join point）」方法，比如上面的`addUser`
@After(value="execution(* cn.xh.dao.UserDao.addUser(..))")  
    public void log(){
        System.out.println("记录日志");
    }
}
在spring配置文件中加入：
<!-- 启动@aspectj的自动代理支持-->
    <aop:aspectj-autoproxy />
 
    <!-- 定义aspect类 -->
    <bean name="myAspect" class="cn.xh.dao. MyAspectLog "/>
```

上述注释中 

**「通知（Advice）」**after before after-returning after-throwing  aound

**「切入点（Pointcut）」**value="execution(* cn.xh.dao.UserDao.addUser(..))"

**「切面（Aspect）」**= 通知 + 切入点

**「连接点（Join point）」**方法，比如上面的`addUser` 

除此之外还有

 **「织入（Weaving）」**： **通过动态代理对目标对象方法进行增强的过程**

以上就所有术语了，这样更好懂一些



## 4. 总结

主要了解这几个术语

[田小波- Spring AOP 源码分析系列文章导读](http://www.tianxiaobo.com/2018/06/17/Spring-AOP-%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90%E7%B3%BB%E5%88%97%E6%96%87%E7%AB%A0%E5%AF%BC%E8%AF%BB/) 他这里比较详细的贴了每个术语所对应的源码，我是看的比较头大，看下来也不容易吸收