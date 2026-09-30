"""从原始 Word 材料生成网页数据，原始文档不变。使用 Python 标准库。"""
from pathlib import Path
import json
import shutil
import re
import zipfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'materials'
OUT.mkdir(exist_ok=True)
NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

def paragraphs(path):
    with zipfile.ZipFile(path) as z:
        xml = ET.fromstring(z.read('word/document.xml'))
    return [
        ''.join(t.text or '' for t in p.findall('.//w:t', NS))
        for p in xml.findall('.//w:p', NS)
        if p.findall('.//w:t', NS)]

types, cases = [], []
for text in paragraphs(ROOT / '材料/诈骗类型.docx'):
    if re.match(r'^[一二三四五六七八九十]+、', text):
        types.append({'title': text, 'paragraphs': []})
    else:
        types[-1]['paragraphs'].append(text)
for text in paragraphs(ROOT / '材料/案例.docx'):
    if re.match(r'^案例\s*\d+：', text):
        title = re.sub(r'（最经典，推荐首选）|（非常贴近大学生日常）|（澳门大学生高频踩坑类型）', '', text)
        cases.append({'title': title, 'paragraphs': []})
    else:
        cases[-1]['paragraphs'].append(text)
for name in ['诈骗类型.docx', '案例.docx']:
    shutil.copy2(ROOT / '材料' / name, OUT / name)

faq = [
 ('接到自称公检法的电话，要求转账怎么办？', '先挂断电话，停止转账。不要依据对方提供的号码或链接核验身份，请自行通过官方渠道联系有关机构。要求转账至“安全账户”、缴纳保证金或保密的来电具有明显诈骗风险。'),
 ('怀疑被骗后，第一时间应该做什么？', '立即停止联系和转账，联系银行或支付平台说明情况，询问止付或账户保护措施；保存聊天、电话号码、网址、转账凭证，并尽快致电澳门司法警察局报案热线 993。'),
 ('8800 7777 和 993 有什么区别？', '8800 7777 是司法警察局的 24 小时防诈骗查询热线，提供查询与防骗资讯；993 是 24 小时报案热线。怀疑发生犯罪并需要报案时，请拨打 993。'),
 ('刷单兼职先垫付本金，可信吗？', '先垫钱、做联单任务、交保证金才能提现都是危险信号。小额返利也不能证明平台可靠。停止付款，通过可信招聘渠道核验工作内容和雇主身份。'),
 ('网上认识的人推荐投资平台，应该怎么判断？', '不要凭感情关系、盈利截图或小额提现记录判断平台可信。对“稳赚不赔”、私人投资网址、提款前再交税费或保证金保持警惕，停止追加资金并核验平台。'),
 ('群组里的优惠换汇广告可靠吗？', '校内群组成员身份和转账截图不能证明交易安全。不要向陌生个人账户先付款；选择正规银行或持牌兑换机构，并核实实际到账。'),
 ('租房时怎样降低受骗风险？', '核验业主身份和中介资质，实地看房，阅读租约并保留收款凭证。不要仅凭社交群广告付款，谨慎对待一次预付全年租金的折扣要求。'),
 ('收到退款链接或“客服”要求共享屏幕，怎么办？', '不要打开陌生链接或安装对方指定的软件，不提供验证码、不共享银行操作屏幕。直接从官方应用或官方网站进入客服渠道核验订单。'),
 ('已经输入密码或银行卡资料，应该如何处理？', '从可信设备进入官方渠道修改密码；如多处使用同一密码，也应分别修改。立即联系银行或支付平台保护账户，检查异常交易，保存证据并按情况报案。'),
 ('视频里确实是家人或同学，还需要核实吗？', '需要。声音与视频可能被伪造，遇到借钱或紧急汇款要求时，挂断后拨打自己已保存的号码，或通过其他可信方式核实身份与事情经过。'),
 ('游戏交易平台要求充值解冻资金，怎么办？', '不要继续充值。优先使用游戏官方认可的渠道；陌生网站要求保证金、解冻费或反复充值是危险信号。保存网址、聊天与付款记录，联系平台并按情况报案。'),
 ('在书院遇到疑似诈骗，可以找谁？', '可联系蔡继有书院办公室、保安值班人员或身边的导师及辅导人员。校内紧急情况可联系澳大保安中心 8822 4000；诈骗查询与报案请分别拨打 8800 7777 或 993。')
]
posts = [
 {'question': '兼职群说最后一单完成就能提现，我已经付了两次，还要继续吗？', 'answer': '停止追加付款，保留任务截图和转账记录，联系银行并按情况报案。反复要求垫付或交保证金是典型危险信号。', 'tag': '兼职'},
 {'question': '租房中介说一次付一年租金更便宜，怎么核验？', 'answer': '先核验中介资质和业主身份，实地看房并阅读租约，保留付款凭证；不要因折扣而仓促支付大额租金。', 'tag': '租房'},
 {'question': '有人发来银行转账截图，但我账户没有到账，可以先给钱吗？', 'answer': '不要以截图代替银行实际到账记录，也不要向陌生个人先付款换汇。使用正规银行或持牌兑换机构。', 'tag': '换汇'}
]
sources = [
 {'title': '澳门司法警察局 · 防诈骗查询热线', 'url': 'https://www.pj.gov.mo/Web/Policia/crime05.html?lang=en'},
 {'title': '澳门司法警察局 · 报案热线', 'url': 'https://www.pj.gov.mo/Web/Policia/hotline/'},
 {'title': '澳门大学 · 保安服务', 'url': 'https://sfs.cmdo.um.edu.mo/our-services/security-services/'},
 {'title': '蔡继有书院 · 联系方式', 'url': 'https://ckyc.rc.um.edu.mo/'},
 {'title': '蔡继有书院 · 学生关怀服务', 'url': 'https://ckyc.rc.um.edu.mo/student-life/student-caring-services/'}
]
data = {
 'intro': '面向在澳学生的防诈学习空间。了解常见骗局，识别生活中的风险信号，在需要时及时找到帮助。',
 'types': types, 'cases': cases,
 'faq': [{'question': q, 'answer': a} for q, a in faq], 'posts': posts,
 'videos': [{'title': '防诈宣传视频 ' + str(i), 'src': f'materials/videos/video-{i}.mp4', 'poster': f'materials/videos/poster-{i}.jpg'} for i in range(1, 5)],
 'contacts': [
  {'name': '司法警察局报案热线', 'number': '993', 'tel': '993', 'detail': '24 小时 · 需要报案时', 'source': sources[1]},
  {'name': '防诈骗查询热线', 'number': '8800 7777', 'tel': '+85388007777', 'detail': '24 小时 · 查询及防骗资讯', 'source': sources[0]},
  {'name': '澳门大学保安中心', 'number': '8822 4000', 'tel': '+85388224000', 'detail': '24 小时 · 校内紧急求助', 'source': sources[2]}
 ],
 'college': [
  {'name': '蔡继有书院办公室', 'number': '8822 9400', 'tel': '+85388229400', 'detail': '书院事务与协助转介', 'source': sources[3]},
  {'name': '蔡继有书院保安值班', 'number': '6332 4946', 'tel': '+85363324946', 'detail': '书院内即时协助', 'source': sources[4]}
 ], 'email': 'ckycollege@um.edu.mo', 'sources': sources, 'verified': '2026-09-30'
}
# 独立材料脚本兼容直接打开 HTML，也可部署至任意静态服务器。
(OUT / 'content.json').write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
(OUT / 'content.js').write_text('// 网页内容材料，由 scripts/prepare_materials.py 生成。\nwindow.ANTIFRAUD_CONTENT = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
print(f'Prepared {len(types)} types, {len(cases)} cases, {len(faq)} FAQs')
