* 本质上充当web应用程序与浏览器之间的代理服务器

* 能够创建有效的离线体验、拦截网络请求

* 采用JavaScript控制关联的页面或者网站，拦截并修改访问和资源请求，细粒度地缓存资源。可以完全控制应用在特定情形（最常见的情形是网络不可用）下的表现。

* 运行在worker上下文，因此他不能访问DOM，它运行在其他线程中，所以不会造成阻塞，设计完全为异步，同步的API（XHR和localStorage）不能再service worders中使用

* 安全性：Service workers只能由HTTPS承载，修改网络请求的能力暴露给中间人会遭到攻击会很危险，在火狐浏览器的用户隐私模式，不可使用

* service workers大量使用了promise，因为通常会等到响应后继续，根据相应返回一个成功或者失败的操作。

##  Service workers可以做哪些事情
1. 后台数据同步
2. 响应来自其他源的资源请求
3. 集中接收计算成本高的数据更新，比如地理位置和陀螺仪信息，这样多个页面就可以利用同一组数据
4. 在客户端进行CoffeeScript，LESS，CJS/AMD等模块编译和依赖管理（用于开发目的）
5. 后台服务钩子
6. 自定义模板用于特定URL模式
7. 性能增强，比如预取用户可能需要的资源，比如相册中的后面数张图片

* 后台消息传递
* 网络代理，转发请求，伪造响应
* 离线缓存
* 消息推送
* 对时间或日期作出响应
* 进入地理栅栏

## 生命周期
![Image text](http://jbcdn2.b0.upaiyun.com/2016/01/55b0169cdfe92b08203757ebc4e5ece2.png)

## 一个service worker要经历以下过程：
1. 安装
2. 激活，激活成功之后，打开chrome://inspect/#service-workers可以查看到当前运行的service worker
3. 监听fetch和message事件，下面两种事件会进行简要描述
4. 销毁，是否销毁由浏览器决定，如果一个service worker长期不使用或者机器内存有限，则可能会销毁这个worker

#### 调试
![Image text](http://img.blog.csdn.net/20160610232003208)
1. 这里的 scope，是指可以拦截请求的域,使用New Work -> offline 模拟断网，刷新页面： 
2. 同一个网址，返回了相同页面。说明Service Worker成功拦截了原始的请求（如果不拦截，会出现页面无法访问的提示）



###	联想知识：阻塞、promise、localStorage、http和https的区别