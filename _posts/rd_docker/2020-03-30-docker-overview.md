---
layout: post
title: "一叶障目🍃docker"
subtitle: 'docker概览'
author: "Yibo"
header-style: text
tags:
  - Docker
---

本篇文章来自[docker官方文档](https://docs.docker.com/engine/docker-overview/)的翻译 

# Docker overview

大约阅读时间：10

Docker是一个用于开发，交付和运行应用程序的开放平台。 Docker使您能够将应用程序与基础架构（环境配置）分开，从而可以快速交付软件。 借助Docker，您可以和管理应用程序相同的方式来管理基础架构（环境配置）。 通过利用Docker的方法来快速交付，测试和部署代码，可以方便编写代码和在生产环境中运行代码。

---

# Docker平台

Docker提供了在松散隔离的环境（称为容器）中打包和运行应用程序的功能。隔离和安全性使您可以在给定主机上同时运行多个容器。容器轻巧，因为它们不需要 hypervisor 的额外负担，而是直接在主机的内核中运行。这意味着与使用虚拟机相比，您可以在给定的硬件组合上运行更多的容器。甚至可以在实际上是虚拟机的主机中运行Docker容器！

Docker提供了工具和平台来管理容器的生命周期：

- 使用容器开发应用程序及其支持组件。
- 容器成为分发和测试应用程序的单元。
- 准备就绪后，可以将应用程序作为容器或协调服务部署到生产环境中。无论您的生产环境是本地数据中心，云提供商还是两者的混合，其工作原理都相同。

# Docker Engine

Docker Engine 是具有以下主要组件的客户端-服务器应用程序：

- docker daemon 是一种长期运行的程序，称为守护程序进程（dockerd命令）。
- REST API，用于指定程序可用于与守护程序进行通信并指示其操作的接口。
- 命令行界面（CLI）客户端（ ``docker' 命令）。

![https://docs.docker.com/engine/images/engine-components-flow.png](https://docs.docker.com/engine/images/engine-components-flow.png)

CLI 使用 Docker REST API 通过脚本或直接 CLI 命令控制或与 Docker 守护程序交互。 许多其他 Docker 应用程序都使用基础 API 和 CLI。

守护进程创建和管理 Docker *对象*，例如镜像，容器，网络和存储卷。

> 注意：Docker已获得开源Apache 2.0许可证的许可。

有关更多详细信息，请参见下面的 [Docker架构](https://www.notion.so/docker-overview-7e62ad2cbf5744fbb400235125a6e573#475484f7ae6b41d58b41184c880ea9cf)

# **Docker有什么用？**

**快速，一致地交付您的应用程序**

Docker通过让开发人员运行本地容器（标准环境中运行应用程序以及服务），从而简化了开发生命周期。容器非常适合持续集成和持续交付（CI / CD）工作流。

考虑以下场景：

- 开发人员在本地编写代码，并使用Docker容器与同事共享。
- 他们使用Docker将其应用程序推送到测试环境中，并执行自动和手动测试。
- 当开发人员发现错误时，可以在开发环境中对其进行修复，然后将其重新部署到测试环境中以进行测试和验证。
- 测试完成后，简单的通过将更新的镜像推送到生产环境，就可以交付给客户了

**响应式部署和扩展**

Docker基于容器的平台允许高度可移植工作栈。 Docker容器可以在开发人员的本地笔记本电脑上，数据中心中的物理或虚拟机上，云提供商上或混合环境中运行。

Docker的可移植性和轻量级的特性还使您可以轻松地动态管理工作栈，并根据业务需求指示实时扩展或缩减应用程序和服务。

**在同一硬件上运行更多工作负载**

Docker轻巧快速。它为基于虚拟机管理程序的虚拟机提供了可行且经济高效的替代方案，因此可以利用更多的计算能力来实现业务目标。 Docker非常适合高密度环境和中小型部署，用更少的资源做更多的事情。

# Docker架构

Docker使用客户端-服务器架构。 Docker *客户端*与 *Docker  daemon* 对话，后者会大量构建，运行和分发Docker容器。 Docker客户端和 *docker daemnon*可以在同一系统上运行，或者可以将 Docker 客户端连接到远程 *Docker daemon*。 Docker客户端和 *daemon* 在*UNIX sockests*或网络接口上使用 *REST API* 进行通信。

![https://docs.docker.com/engine/images/architecture.svg](https://docs.docker.com/engine/images/architecture.svg)

### The Docker daemon

Docker daemon（`dockerd`）监听 Docker API 请求并管理 Docker 对象，例如镜像，容器，网络和卷。daemon 还可以与其他 daemon 通信以管理 Docker 服务。

### Docker客户端

Docker客户端（`docker`）是许多 Docker 用户与 Docker 交互的主要方式。当你使用诸如 `docker run` 之类的命令时，客户端会将这些命令发送至`dockerd`，后者将其执行。 `docker`命令使用Docker API。 Docker客户端可以与多个守护程序通信。

### Docker注册表

Docker *注册表*存储 Docker images。 Docker Hub 是任何人都可以使用的公共注册表，并且 Docker 默认配置为在 Docker Hub 上查找镜像。你也可以运行自己的私人注册表。如果使用Docker Datacenter（DDC），则其中包括Docker Trusted Registry（DTR）。 

当您使用`docker pull`或`docker run`命令时，所需的镜像将从配置的注册表中提取。当您使用`docker push`命令时，镜像会被推送到配置的注册表中。

### Docker对象

使用Docker时，你正在创建和使用镜像，容器，网络，卷，插件和其他对象。这篇文章是其中一些对象的简要概述。

### 镜像（images）

docker image是一个只读模板，其中包含创建Docker容器的说明。通常，一个镜像*基于*另一个镜像，并进行一些其他自定义。例如，您可以基于ubuntu镜像构建镜像，但是额外自定义安装Apache Web服务器和应用程序以及运行应用程序所需的配置详细信息。

您可以创建自己的镜像，也可以只使用其他人创建并在注册表中发布的镜像。要构建自己的进行，可以使用简单的语法创建 Dockerfile，用来定义创建镜像并运行它所需的步骤。 Dockerfile中的每条指令都会在镜像中创建一个层。更改Dockerfile并重建镜像时，仅重建那些已更改的层。与其他虚拟化技术相比，这是使镜像如此轻巧，小型和快速的部分原因。

### **容器（containers）**

容器是镜像的可运行实例。你可以使用Docker API或CLI创建，启动，停止，移动或删除容器。您可以将容器连接到一个或多个网络，将存储附加到该网络，甚至根据其当前状态创建新镜像。

默认情况下，容器与其他容器及其主机之间的隔离程度相对较高。你可以控制容器的网络，存储或其他底层子系统与其他容器或主机之间的隔离程度。

容器：由其镜像以及在创建或启动时为其提供的任何配置选项定义。删除容器后，未存储在持久性存储中的状态更改将消失。

### **示例: `docker run`命令**

以下命令运行一个`ubuntu`容器，以交互方式在本地命令行会话，然后运行`/bin/bash`

`$ docker run -i -t ubuntu / bin / bash`

当你运行此命令时，会发生以下情况（假设您使用的是默认注册表配置）：

1. 如果在本地没有`ubuntu`镜像，则Docker会从配置的注册表中将其拉出，就像手动运行了`docker pull ubuntu`一样。
2. Docker创建了一个新容器，就像手动运行了`docker container create`命令一样。
3. Docker将一个读写文件系统分配给容器，作为其最后一层。这允许运行中的容器在其本地文件系统中创建或修改文件和目录。
4. 在未指定任何网络选项的情况下，Docker创建一个网络接口以将容器连接到默认网络，这包括为容器分配IP地址。默认情况下，容器可以使用主机的网络连接连接到外部网络。
5. Docker启动容器并执行`/ bin / bash`。由于容器是交互式运行的并且已附加到您的终端（由于-i和-t），因此您可以在输出记录到终端时使用键盘提供输入。
6. 当键入`exit`终止`/ bin / bash`命令时，该容器停止但未被移除。你可以重新启动或删除它。

### **服务 （services）**

Services可以在多个Docker daemons之间扩展容器，多个services一起工作称为swarm可以与多个manager *和* worker *一起*协同工作。一个 swarm 的每个成员都是一个Docker daemon，并且所有 daemon 都使用Docker API进行通信。一个service允许定义所需的状态，例如在任何给定时间必须可用的服务副本数。默认情况下，该服务在所有工作节点之间负载平衡。对于消费者而言，Docker服务似乎是一个单独的应用程序。 Docker Engine在Docker 1.12及更高版本中支持 swarm 模式。

# 底层**技术**

Docker用[Go](https://golang.org/)编写，并利用Linux内核的多种功能来提供其功能。

### **命名空间（Namespaces）**

Docker使用一种名为`namespaces`的技术来提供称为 container *的隔离工作区。*运行容器时*，Docker*会为该容器创建一组 namespaces

这些命名空间提供了一层隔离。容器的每个方面都在单独的命名空间中运行，并且其访问仅限于该命名空间。

Docker Engine在Linux上使用以下名称空间：

- The `pid` namespaces: 进程隔离（PID:进程ID）
- The `net` namespaces: 管理网络接口（NET：网络）
- The `ipc` namespaces: 管理对IPC资源的访问（IPC：进程间通信）。
- The `mnt` namespaces: 管理文件系统挂载点（MNT：挂载）。
- The `uts` namespaces: 隔离内核和版本标识符。 （UTS：Unix时间共享系统）。

### Control groups

Linux上的Docker Engine还依赖于另一种称为control groups（`cgroups`）的技术。 cgroup 给应用程序一组限定的特定资源。Control groups允许Docker Engine 将可用的硬件资源共享给容器，并有选择地实施限制和约束。例如，可以限制特定容器的可用内存。

### Union file systems

Union file systems 或 UnionFS 是通过创建层进行操作的文件系统，使其非常轻便且快速。 Docker Engine使用UnionFS为容器提供构建模块。 Docker Engine可以使用多种UnionFS，包括AUFS，btrfs，vfs和DeviceMapper。

### Container format

Docker Engine将namespaces，control groups 和 UnionFS 组合到一个称为container format的包装器中。默认的container format是`libcontainer`。将来，Docker可以通过与BSD Jails或Solaris Zones等技术集成来支持其他 container format。
