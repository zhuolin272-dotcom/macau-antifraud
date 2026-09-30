/* 界面逻辑与内容分离。全部宣传文字来自 materials/content.js。 */
'use strict';
const content = window.ANTIFRAUD_CONTENT;
const main = document.querySelector('main');
const page = document.body.dataset.page;
// 不改动 HTML 骨架，通过共用脚本同步四页导航名称及当前页面标题。
document.querySelectorAll('nav a[href="types.html"]').forEach(a => { a.textContent = '认识诈骗类型'; });
document.title = document.title.replace('认识诈骗分级', '认识诈骗类型');
// 创建 DOM 并使用 textContent，避免把材料文本当作 HTML 执行。
function el(tag, cls, text) { const node = document.createElement(tag); if (cls) node.className = cls; if (text !== undefined) node.textContent = text; return node; }
function link(text, href, cls) { const a = el('a', cls, text); a.href = href; return a; }
function heading(title, subtitle, eyebrow) { main.append(el('p', 'eyebrow', eyebrow), el('h1', '', title), el('p', 'lead', subtitle)); }
function sectionHead(title, note, id) { const row = el('div', 'section-head'); if (id) row.id = id; row.append(el('h2', '', title), el('span', 'count', note)); main.append(row); return row; }
// 使用文本节点与 mark 高亮字面匹配，搜索词不作为正则表达式或 HTML 执行。
function highlight(node, text, keyword) {
 if (!keyword) { node.textContent = text; return; }
 const lower = text.toLocaleLowerCase(); let start = 0; let index;
 while ((index = lower.indexOf(keyword, start)) !== -1) {
  node.append(document.createTextNode(text.slice(start, index)), el('mark', '', text.slice(index, index + keyword.length)));
  start = index + keyword.length;
 }
 node.append(document.createTextNode(text.slice(start)));
}
function sourceLink(source) { const a = link('官方来源', source.url, 'source'); a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('aria-label', source.title + '（新窗口打开）'); return a; }
function home() {
 const top = el('div', 'home-top'); const intro = el('div'); intro.append(el('p','eyebrow','蔡继有书院 · 防诈宣传'),el('h1','','识别骗局，从了解开始。'),el('p','lead',content.intro)); top.append(intro,link('认识常见诈骗','types.html','text-link')); main.append(top);
 const layout = el('div','video-layout'); const card = el('div','player-card'); const video = el('video'); video.controls = true; video.preload = 'metadata'; video.playsInline = true; video.setAttribute('aria-label','防诈宣传视频播放器'); const caption = el('div','player-caption'); const title = el('h2'); caption.append(title,el('span','','点击播放 · 支持全屏观看')); card.append(video,caption); const list = el('div','video-list'); list.setAttribute('aria-label','选择宣传视频');
 content.videos.forEach((item,i) => { const button = el('button','video-choice'); button.type = 'button'; const label = el('span'); label.append(el('b','',item.title),el('small','','本地宣传素材')); button.append(el('span','num',String(i+1).padStart(2,'0')),label); button.setAttribute('aria-pressed',String(i===0)); button.addEventListener('click',()=>{video.pause();video.src=item.src;video.poster=item.poster;title.textContent=item.title;video.load();list.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));}); list.append(button); });
 video.src=content.videos[0].src;video.poster=content.videos[0].poster;title.textContent=content.videos[0].title;
 const error=el('p','notice','视频暂时无法播放，请确认 materials/videos 中的文件完整，或使用 Chrome / Edge 打开。');error.hidden=true;video.addEventListener('error',()=>error.hidden=false);video.addEventListener('loadeddata',()=>error.hidden=true);card.append(error);layout.append(card,list);main.append(layout);
 const note=el('div','reminder'); note.append(el('b','','遇到可疑情况，先停一步。'),el('p','','停止转账，通过官方渠道核实身份。需要协助时，请前往求助页面联系警方或书院。'));main.append(note);
}
function types() {
 heading('认识诈骗类型','了解常见诈骗手法，从真实案例中识别风险信号。','识骗学习');
 const anchors=el('div','anchor-links');anchors.append(link('诈骗类型介绍','#fraud-types','pill'),link('真实诈骗案例','#real-cases','pill'),link('下载原始类型材料','materials/诈骗类型.docx','pill'),link('下载原始案例材料','materials/案例.docx','pill'));main.append(anchors);
 main.append(el('p','small-note','以下按诈骗类型分类学习；材料未提供正式风险等级，不作等级划分。'));
 sectionHead('诈骗类型介绍','10 类常见手法','fraud-types');const grid=el('div','type-grid');content.types.forEach((item,i)=>{const card=el('article','type-card');card.append(el('div','type-number','类型 '+String(i+1).padStart(2,'0')),el('h3','',item.title.replace(/^[一二三四五六七八九十]+、/,'')));item.paragraphs.forEach(text=>{const row=el('p','type-field');const match=text.match(/^(类型名称|套路|受害人群|提醒)：([\s\S]*)$/);if(match){row.append(el('strong','field-label',match[1]),el('span','',match[2].trim()));}else{row.textContent=text;}card.append(row);});grid.append(card);});main.append(grid);
 const casesHead=sectionHead('真实诈骗案例','7 个材料案例 · 点击展开','real-cases');const actions=el('div','case-actions');const caseIds=content.cases.map((_,i)=>'case-'+(i+1)).join(' ');
 [['全部展开',true],['全部收起',false]].forEach(([label,open])=>{const button=el('button','case-toggle',label);button.type='button';button.setAttribute('aria-controls',caseIds);button.addEventListener('click',()=>{main.querySelectorAll('.case-card').forEach(d=>{d.open=open;});});actions.append(button);});casesHead.append(actions);
 main.append(el('p','notice','案例文字来自所提供的宣传材料，原始报道出处尚待核对。案例 2 原文出现“十几万港币”与“87,300 港币”两种金额，现保留原文供核对。'));
 content.cases.forEach((item,i)=>{const details=el('details','case-card');details.id='case-'+(i+1);details.open=i===0;details.append(el('summary','',item.title));const body=el('div','case-body');item.paragraphs.forEach(text=>{if(/^损失：/.test(text)){const loss=el('p','case-loss');loss.append(el('strong','',text));body.append(loss);}else{const sub=/^(案情|诈骗套路重点|套路重点|防范提示)/.test(text);const point=/^要点：/.test(text);body.append(el('p',sub?'subhead':point?'case-point':'',point?text.replace(/^要点：\s*/,''):text));}});details.append(body);main.append(details);});
}
function faq() {
 heading('常见问题解答','从学生常见疑问出发，找到下一步可以采取的行动。','防诈问答');
 const box=el('div','search-box');const input=el('input');input.type='search';input.placeholder='搜索问题或答案，如：转账、兼职、租房';input.setAttribute('aria-label','搜索防诈问题与答案');const clear=el('button','clear-search','清除');clear.type='button';clear.hidden=true;box.append(input,clear);const status=el('p','search-result');status.setAttribute('role','status');status.setAttribute('aria-live','polite');const results=el('div');main.append(box,status,results);
 function render(){const keyword=input.value.trim().toLocaleLowerCase();const matches=content.faq.filter(x=>(x.question+' '+x.answer).toLocaleLowerCase().includes(keyword));clear.hidden=!keyword;status.textContent=keyword?`找到 ${matches.length} 个相关问答`:`全部 ${content.faq.length} 个问答`;results.replaceChildren();matches.forEach(item=>{const d=el('details','faq-item');d.open=false;const question=el('summary');const answer=el('div','faq-answer');highlight(question,item.question,keyword);highlight(answer,item.answer,keyword);d.append(question,answer);results.append(d);});if(!matches.length)results.append(el('p','empty','没有找到相关问答。试试“银行”“兼职”或“报案”等关键词。'));}input.addEventListener('input',render);clear.addEventListener('click',()=>{input.value='';render();input.focus();});render();
 sectionHead('同学提问','模拟帖子 · 不含真实访客信息');const posts=el('div','posts');content.posts.forEach(item=>{const post=el('article','post');post.append(el('span','tag',item.tag),el('h3','',item.question),el('p','', '回复：'+item.answer));posts.append(post);});main.append(posts);
}
function contact(item, primary=false){const card=el('article','contact'+(primary?' primary':''));card.append(el('h3','',item.name),link(item.number,'tel:'+item.tel,'phone'),el('p','',item.detail),sourceLink(item.source));return card;}
function help(){heading('需要帮助？及时联系。','怀疑遇到诈骗时，先停止转账与联系，保存证据，向警方及可信赖的人求助。','求助渠道');const steps=el('div','steps');[['01 · 停止转账','不要再支付保证金、解冻费或税费。'],['02 · 保护账户','联系银行或支付平台，保存聊天和付款记录。'],['03 · 寻求协助','尽快报案，并联系家人或书院人员。']].forEach(([t,p])=>{const block=el('div');block.append(el('b','',t),el('p','',p));steps.append(block);});main.append(steps);sectionHead('澳门本地与校园求助','点击号码可发起拨号');const contacts=el('div','contacts');content.contacts.forEach((item,i)=>contacts.append(contact(item,i===0)));main.append(contacts);sectionHead('蔡继有书院求助渠道','澳门大学 W12');const college=el('div','college-box');content.college.forEach(item=>college.append(contact(item)));main.append(college);const mail=el('p','small-note');mail.append(document.createTextNode('书院邮箱：'),link(content.email,'mailto:'+content.email),document.createTextNode('。也可向导师或辅导人员寻求协助。'));main.append(mail,el('p','verified','联系方式核对日期：'+content.verified+' · 以官方渠道最新公布的信息为准。'));}
if(!content){main.append(el('p','notice','内容材料未加载，请确认 materials/content.js 文件存在。'));}else{({home,types,faq,help}[page]||home)();}
