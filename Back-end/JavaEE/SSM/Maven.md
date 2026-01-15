# Maven作用
项目构建（不同开发工具构建出的结果不同）
依赖管理
## 依赖管理
### 依赖属性说明
maven导入依赖的属性GAVP：GroupID，ArtifactID，Version，Packing
GroupID组织名
ArtifactID依赖名
Version主版本号.次版本号.修订号
主版本号（模块的改变）
次版本号（功能改变）
修订号（改bug） 
```
**GAV遵循一下规则：**
  1） **GroupID 格式**：com.{公司/BU }.业务线.[子业务线]，最多 4 级。

    说明：{公司/BU} 例如：alibaba/taobao/tmall/aliexpress 等 BU 一级；子业务线可选。

    正例：com.taobao.tddl 或 com.alibaba.sourcing.multilang  com.atguigu.java

  2） **ArtifactID 格式**：产品线名-模块名。语义不重复不遗漏，先到仓库中心去查证一下。

    正例：tc-client / uic-api / tair-tool / bookstore

  3） **Version版本号格式推荐**：主版本号.次版本号.修订号 1.0.0

    1） 主版本号：当做了不兼容的 API 修改，或者增加了能改变产品方向的新功能。

    2） 次版本号：当做了向下兼容的功能性新增（新增类、接口等）。

    3） 修订号：修复 bug，没有修改方法签名的功能加强，保持 API 兼容性。

    例如： 初始→1.0.0  修改bug → 1.0.1  功能调整 → 1.1.1等

**Packaging定义规则：**

  指示将项目打包为什么类型的文件，idea根据packaging值，识别maven项目类型！

  packaging 属性为 jar（默认值），代表普通的Java工程，打包以后是.jar结尾的文件。

  packaging 属性为 war，代表Java的web工程，打包以后.war结尾的文件。

  packaging 属性为 pom，代表不会打包，用来做继承的父工程。
```

### 代码添加依赖GAV
