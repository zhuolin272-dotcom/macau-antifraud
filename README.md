# 澳门书院防诈宣传静态网站

公开网址：https://zhuolin272-dotcom.github.io/macau-antifraud/

项目仓库：https://github.com/zhuolin272-dotcom/macau-antifraud

`main` 分支更新后，GitHub Actions 自动发布四个页面与 `assets`、`materials` 资源。

根据 `提示词.docx` 制作，使用 HTML、CSS、JavaScript，无后端、数据库、注册或发帖功能。所有页面内容在本地运行，不向外部发送搜索词或访客数据。

## 打开网站

双击 `index.html`，推荐使用 Chrome 或 Edge。也可在根目录启动任意静态 HTTP 服务器。四个页面可以独立访问和互相跳转，无需安装网站依赖。

## 项目结构

- `index.html`：首页，四段视频选择与播放。
- `types.html`：10 类诈骗与 7 个案例，案例可展开。
- `faq.html`：12 个问答，按问题及答案即时检索；3 个模拟帖子。
- `help.html`：警方、校园及书院求助渠道，下方预留补充区。
- `assets/css/style.css`：配色、排版、响应式与焦点样式。
- `assets/js/main.js`：内容渲染、视频切换与搜索逻辑。
- `materials/content.js`：网页实际读取的文字材料，与界面代码分离，支持直接打开 HTML。
- `materials/content.json`：同一内容的 JSON 版本，方便编辑或迁移。
- `materials/logos`、`materials/videos`：转换后的浏览器可用资源。
- `materials/案例.docx`、`materials/诈骗类型.docx`：原始资料副本。
- `scripts`：材料整理、页面生成与视频转换辅助脚本；运行网站不需要这些脚本。

## 修改内容

日常修改可直接编辑 `materials/content.js` 中的对应字段。JSON 备份不会被网页自动读取，修改时建议同步更新。若修改了原始 Word，运行 `scripts/prepare_materials.py` 可重新抽取类型与案例，同时会重新生成 FAQ 和联系人字段；这些维护字段在该脚本中管理。请备份手工修改后的内容再重新生成。

网站并不在线解析 Word，材料在构建时抽取，网页运行时读取 `materials/content.js`。使用 `textContent` 渲染文字，材料内容不会作为 HTML 执行。界面采用固定导航、无衬线字体、深蓝与白色，优先适配桌面，同时支持手机和键盘操作。

## 视频与标志

原始 TIFF 已转换为 PNG；四段 MOV 已转换为 H.264/AAC MP4，保留原有声音并生成封面。`materials/videos/素材对应.txt` 记录原始文件映射。视频不自动播放；只有选中视频才加载媒体，避免同时下载四段影片。原始 `材料` 文件夹与提示词保留。

## 内容核对

“认识诈骗分级”按要求保留导航名称。原材料只有类型分类，故没有编造风险等级。案例未附新闻出处，不将其视为已独立核实的新闻事实；页面已注明出处待核对。案例 2 的正文金额与损失金额存在差异，原文保留。FAQ 和模拟帖子为本项目补充编写，帖子标明为模拟内容。

电话号码按 2026-09-30 所查官方页面整理。拨号链接可在支持拨号的设备上使用；短号 993 适用于澳门本地拨号，境外请查看警方官网获取适用联系渠道。银行止付是否成功取决于银行及交易状态，网站不作追回资金承诺。

来源：

- 司法警察局防诈骗查询：<https://www.pj.gov.mo/Web/Policia/crime05.html?lang=en>
- 司法警察局报案热线：<https://www.pj.gov.mo/Web/Policia/hotline/>
- 澳门大学保安服务：<https://sfs.cmdo.um.edu.mo/our-services/security-services/>
- 蔡继有书院办公室：<https://ckyc.rc.um.edu.mo/>
- 蔡继有书院学生关怀服务：<https://ckyc.rc.um.edu.mo/student-life/student-caring-services/>

## 部署

将四个 HTML、`assets` 与 `materials` 上传到静态网站服务器的同一目录即可。路径为相对路径，可部署在域名根目录或子目录。无需上传原始 `材料`、`.tools`、辅助脚本或 QA 文件。公开发布前建议先核实案例出处及所有联系方式，并确认视频素材的使用授权。
