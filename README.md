# docker-example

通过 docker 实现多个测试环境共存示例

## 快速开始
一个项目首次启动需要先初始化 docker 虚拟网络，并为项目指定一个名字
```bash
./testenv/network/network-init.sh -n example -p 8080 create
```
启动一个独立的测试环境，通过 -n 参数传入项目名，通过 -b 参数传入独立测试环境的名字
```bash
./testenv/docker.sh -n example -b master start
```
等待构建完成，通过 http://localhost:8080/master/ 访问测试页面

切换到 feature 分支再启动一个独立的测试环境

```bash
git checkout feature
./testenv/docker.sh -n example -b feature start
```
通过 http://localhost:8080/feature/ 访问另一套页面

## 清除测试环境
```bash
./testenv/docker.sh -n example -b feature remove
./testenv/docker.sh -n example -b master remove
./testenv/network/network-init.sh -n example remove
```