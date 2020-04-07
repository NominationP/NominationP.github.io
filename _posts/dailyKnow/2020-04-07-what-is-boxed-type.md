---
layout: post
title: "什么是 boxing?"
subtitle: 'java 中什么是 boxed type'
author: "YiBo"
header-style: text
tags:
  - 一句话知道是什么🍆
  - java
---

### 🔵 WHAT 
一些类是“原始的”，意味着他们不像对象一样拥有属性，例如java中的`int`，但是`integers`是被`boxed`的，`integers`可以看成一个`object`

### 🔵 WHY
`boxed type` 意味着这些值在堆上的一个块中分配，并通过指针引用，这有利于实现运行时的统一性（使通用函数等更容易实现），但要付出额外的间接费用（`construct`...）。

### reference:
- [What does it mean to say a type is “boxed”?](https://stackoverflow.com/questions/1418296/what-does-it-mean-to-say-a-type-is-boxed)