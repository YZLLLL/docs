**TCP,传输层协议，Transmission Control Protocol）是一种面向连接的、可靠的、基于[字节流](https://baike.baidu.com/item/字节流/3196772?fromModule=lemma_inlink)的[传输层](https://baike.baidu.com/item/传输层/4329536?fromModule=lemma_inlink)[通信协议](https://baike.baidu.com/item/通信协议/3351624?fromModule=lemma_inlink)**



SYN(synchronous建立联机) 

ACK(acknowledgement 确认) 

PSH(push传送) 

FIN(finish结束) 

RST(reset重置) 

URG(urgent紧急)

Sequence number(顺序号码) 

Acknowledge number(确认号码)

##### 三次握手

![](E:\learn\js\docs\计算机网络\imgs\三次握手.png)

![.\imgs\三次握手.png]()

##### 四次挥手



##### 主要特点

（1）基于流的方式；

（2）面向连接；

（3）可靠通信方式；

（4）在网络状况不佳的时候尽量降低系统由于重传带来的带宽开销；

（5）通信连接维护是面向通信的两个端点的，而不考虑中间[网段](https://baike.baidu.com/item/网段/11026985?fromModule=lemma_inlink)和节点。

为满足TCP协议的这些特点，TCP协议做了如下的规定：

①[数据分片](https://baike.baidu.com/item/数据分片/23734827?fromModule=lemma_inlink)：在发送端对用户数据进行分片，在接收端进行重组，由TCP确定分片的大小并控制分片和重组；

②到达确认：接收端接收到分片数据时，根据分片数据序号向发送端发送一个确认；

③[超时](https://baike.baidu.com/item/超时/10884849?fromModule=lemma_inlink)重发：[发送方](https://baike.baidu.com/item/发送方/9452946?fromModule=lemma_inlink)在发送分片时启动超时定时器，如果在定时器超时之后没有收到相应的确认，重发分片；

④[滑动窗口](https://baike.baidu.com/item/滑动窗口/8351795?fromModule=lemma_inlink)：TCP连接每一方的接收缓冲空间大小都固定，接收端只允许另一端发送接收端缓冲区所能接纳的数据，TCP在滑动窗口的基础上提供流量控制，防止较快主机致使较慢主机的缓冲区溢出；

⑤失序处理：作为IP数据报来传输的TCP分片到达时可能会失序，TCP将对收到的数据进行[重新排序](https://baike.baidu.com/item/重新排序/22265517?fromModule=lemma_inlink)，将收到的数据以正确的顺序交给应用层；

⑥重复处理：作为IP数据报来传输的TCP分片会发生重复，TCP的接收端必须丢弃重复的数据；

⑦[数据校验](https://baike.baidu.com/item/数据校验/2609771?fromModule=lemma_inlink)：TCP将保持它首部和数据的检验和，这是一个端到端的检验和，目的是检测数据在[传输过程](https://baike.baidu.com/item/传输过程/22722988?fromModule=lemma_inlink)中的任何变化。如果收到分片的检验和有差错，TCP将丢弃这个分片，并不确认收到此报文段导致对端超时并重发。



##### 拥塞控制

（1）[慢启动](https://baike.baidu.com/item/慢启动/8242395?fromModule=lemma_inlink)

每当建立一个TCP连接时或一个TCP连接发生超时重传后，该连接便进入慢启动阶段。进入慢启动后，TCP实体将[拥塞窗口](https://baike.baidu.com/item/拥塞窗口/4399307?fromModule=lemma_inlink)的大小初始化为一个报文段，即：cwnd=1。此后，每收到一个报文段的确认（ACK），cwnd值加1，即拥塞窗口按指数增加。当cwnd值超过慢启动阈值（ssthresh）或发生报文段丢失重传时，慢启动阶段结束。前者进入[拥塞避免](https://baike.baidu.com/item/拥塞避免/20590357?fromModule=lemma_inlink)阶段，后者[重新进入](https://baike.baidu.com/item/重新进入/56582857?fromModule=lemma_inlink)慢启动阶段。

（2）拥塞避免

在慢启阶段，当cwnd值超过慢启动阈值（ssthresh）后，慢[启动过程](https://baike.baidu.com/item/启动过程/53607541?fromModule=lemma_inlink)结束，TCP连接进入拥塞避免阶段。在拥塞避免阶段，每一次发送的cwnd个报文段被完全确认后，才将cwnd值加1。在此阶段，cwnd值线性增加。

（3）快速重传

快速重传是对超时重传的改进。当源端收到对同一个报文的三个重复确认时，就确定一个报文段已经丢失，因此立刻重传丢失的报文段，而不必等到重传[定时器](https://baike.baidu.com/item/定时器/5109454?fromModule=lemma_inlink)（[RTO](https://baike.baidu.com/item/RTO/8933435?fromModule=lemma_inlink)）超时。以此减少不必要的[等待时间](https://baike.baidu.com/item/等待时间/16598254?fromModule=lemma_inlink)。

（4）快速恢复

快速恢复是对丢失[恢复机制](https://baike.baidu.com/item/恢复机制/15396214?fromModule=lemma_inlink)的改进。在快速重传之后，不经过慢启动过程而直接进入拥塞避免阶段。每当快速重传后，置ssthresh=cwnd/2、cwnd=ssthresh+3。此后，每收到一个重复确认，将cwnd值加1，直至收到对丢失报文段和其后若干报文段的累积确认后，置cwnd=ssthresh，进入拥塞避免阶段。