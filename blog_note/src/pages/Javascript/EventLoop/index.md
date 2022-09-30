---
title: 事件循环
toc: menu
---

# javascript

## 为什么 js 是单线程

由于 js 用于处理浏览器事件，为了保证页面行为一致性，采用单线程设计。

<Alert type="info">
<p>
  如果设计成多线程，线程一上添加一个dom节点，线程二上删除一个节点。则最终页面效果可能出现多种情况。
</p>
<p>
    虽然js引入worker，但是worker被主线程完全控制且不才能操作dom节点，本质上还是单线程。
</p>
</Alert>
