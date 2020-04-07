---
layout: post
title: "Leetcode - Best Time to Buy and Sell Stock"
subtitle: ''
author: "Yibo"
header-img: "img/in-post/2020-04/stock-cover1.webp"
tags:
  - leetcode
  - 动态规划
---


	
## [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)
```java
/**
 * 动态规划： dp[i] = max(dp[i-1],prices[i]-prices[j])
 */
fun maxProfit(prices: Array<Int>): Int {
    /** 记录全局最大利润 */
    var maxProfit = 0;
    /** 记录全局最小交易金额 */
    var minPrice = Int.MAX_VALUE
    for (price in prices) {
        /** 找出最小值 */
        minPrice = min(minPrice, price)
        /** 最大利润：当前最大利润 OR 当前金额-最小交易金额 */
        maxProfit = max(maxProfit, price - minPrice)
    }
    return maxProfit
}
maxProfit(arrayOf(7,6,4,3,1))
```

## [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii)
![](/img/in-post/2020-04/122_maxprofit_1.PNG)
```java
/**
 * 上图所示 C < A + B
 * A + B 的利润是最多的
 */
fun maxProfit21(prices: IntArray): Int {
    var maxProfit = 0
    var i = 0
    while (i < prices.size - 1) {
        while (i < prices.size - 1 && prices[i] > prices[i + 1]) {
            i++
        }
        val valley = prices[i]
        while (i < prices.size - 1 && prices[i] <= prices[i + 1]) {
            i++
        }
        val peak = prices[i]
        
        maxProfit += peak - valley
    }
    return maxProfit
}
```

![](/img/in-post/2020-04/122_maxprofit_2.PNG)

```java
/**
 * 上图所示 D = A + B + C
 */
fun maxProfit2(prices: IntArray): Int {
    var maxProfit = 0
    for (i in 1 until prices.size) {
        if (prices[i] > prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1]
        }
    }
    return maxProfit
}
```