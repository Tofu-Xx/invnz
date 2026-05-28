import{_ as s,H as n,f as t,i as e}from"./chunks/framework.eFU6Tutu.js";const u=JSON.parse('{"title":"组合规则详解","description":"","frontmatter":{},"headers":[],"relativePath":"guide/combination-rules.md","filePath":"guide/combination-rules.md"}'),p={name:"guide/combination-rules.md"};function i(l,a,d,c,o,h){return n(),t("div",null,[...a[0]||(a[0]=[e(`<h1 id="组合规则详解" tabindex="-1">组合规则详解 <a class="header-anchor" href="#组合规则详解" aria-label="Permalink to &quot;组合规则详解&quot;">​</a></h1><p>有了字根之后，如何把它们组合成一个完整的音韵字？本文详细解释四条组合规则。</p><h2 id="规则一-韵尾包围" tabindex="-1">规则一：韵尾包围 <a class="header-anchor" href="#规则一-韵尾包围" aria-label="Permalink to &quot;规则一：韵尾包围&quot;">​</a></h2><p>四个韵尾（en、an、eng、ang）拥有包裹能力——它们用自身 IDC <strong>包住</strong>前面的字根。</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ie + an</span></span>
<span class="line"><span>  ie → 也</span></span>
<span class="line"><span>  an → ⿵𰃦</span></span>
<span class="line"><span>  ⿵𰃦 + 也 → ⿵𰃦也</span></span></code></pre></div><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>i + en</span></span>
<span class="line"><span>  i → 一</span></span>
<span class="line"><span>  en → ⿵冂</span></span>
<span class="line"><span>  ⿵冂 + 一 → ⿵冂一</span></span></code></pre></div><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>u + ang</span></span>
<span class="line"><span>  u → 五</span></span>
<span class="line"><span>  ang → ⿹勹</span></span>
<span class="line"><span>  ⿹勹 + 五 → ⿹勹五</span></span></code></pre></div><h2 id="规则二-声母包裹" tabindex="-1">规则二：声母包裹 <a class="header-anchor" href="#规则二-声母包裹" aria-label="Permalink to &quot;规则二：声母包裹&quot;">​</a></h2><p>声母字根包裹整个韵部（韵母组合的结果）：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>例：zhong（zh + ong）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>韵部：ong → 工（单一音素，去 IDC → 工）</span></span>
<span class="line"><span>声母：zh → ⿱止</span></span>
<span class="line"><span>组合：⿱止 + 工 → ⿱止工</span></span></code></pre></div><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>例：tian（t + ie + an）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>韵部：ie + an → ⿵𰃦也（韵尾包裹 ie 的字根）</span></span>
<span class="line"><span>声母：t → ⿰七</span></span>
<span class="line"><span>组合：⿰七 + ⿵𰃦也 → ⿰七⿵𰃦也</span></span></code></pre></div><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>例：guan（g + u + an）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>韵部：u + an → ⿵𰃦五（韵尾 an 包裹 u）</span></span>
<span class="line"><span>声母：g → ⿰𠂎</span></span>
<span class="line"><span>组合：⿰𠂎 + ⿵𰃦五 → ⿰𠂎⿵𰃦五</span></span></code></pre></div><h2 id="规则三-仅有韵尾时的特殊处理" tabindex="-1">规则三：仅有韵尾时的特殊处理 <a class="header-anchor" href="#规则三-仅有韵尾时的特殊处理" aria-label="Permalink to &quot;规则三：仅有韵尾时的特殊处理&quot;">​</a></h2><p>当韵部<strong>只有一个韵尾</strong>（没有其他韵母音素）时，规则二的包裹方向取决于声母字根的 IDC 类型：</p><h3 id="声母-idc-⿰-左右结构-→-韵尾包裹声母内核" tabindex="-1">声母 IDC = ⿰（左右结构）→ 韵尾包裹声母内核 <a class="header-anchor" href="#声母-idc-⿰-左右结构-→-韵尾包裹声母内核" aria-label="Permalink to &quot;声母 IDC = ⿰（左右结构）→ 韵尾包裹声母内核&quot;">​</a></h3><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>例：tan（t + an）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>声母 t → ⿰七（⿰ 结构）</span></span>
<span class="line"><span>韵尾 an → ⿵𰃦</span></span>
<span class="line"><span>组合：⿵𰃦 + 七（内核）→ ⿵𰃦七</span></span></code></pre></div><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>例：han（h + an）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>声母 h → ⿰丩（⿰ 结构）</span></span>
<span class="line"><span>韵尾 an → ⿵𰃦</span></span>
<span class="line"><span>组合：⿵𰃦 + 丩 → ⿵𰃦丩</span></span></code></pre></div><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>例：gen（g + en）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>声母 g → ⿰𠂎（⿰ 结构）</span></span>
<span class="line"><span>韵尾 en → ⿵冂</span></span>
<span class="line"><span>组合：⿵冂 + 𠂎 → ⿵冂𠂎</span></span></code></pre></div><h3 id="声母-idc-⿱-或其他-→-声母包裹韵尾" tabindex="-1">声母 IDC = ⿱ 或其他 → 声母包裹韵尾 <a class="header-anchor" href="#声母-idc-⿱-或其他-→-声母包裹韵尾" aria-label="Permalink to &quot;声母 IDC = ⿱ 或其他 → 声母包裹韵尾&quot;">​</a></h3><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>例：ban（b + an）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>声母 b → ⿱不（⿱ 结构）</span></span>
<span class="line"><span>韵尾 an → ⿵𰃦，去 IDC → 𰃦</span></span>
<span class="line"><span>组合：⿱不 + 𰃦 → ⿱不𰃦</span></span></code></pre></div><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>例：den（d + en）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>声母 d → ⿱𠂊（⿱ 结构）</span></span>
<span class="line"><span>韵尾 en → ⿵冂，去 IDC → 冂</span></span>
<span class="line"><span>组合：⿱𠂊 + 冂 → ⿱𠂊冂</span></span></code></pre></div><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>例：lan（l + an）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>声母 l → ⿺𠃊（⿺ 包围结构）</span></span>
<span class="line"><span>韵尾 an → ⿵𰃦，去 IDC → 𰃦</span></span>
<span class="line"><span>组合：⿺𠃊 + 𰃦 → ⿺𠃊𰃦</span></span></code></pre></div><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>例：shan（sh + an）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>声母 sh → ⿸尸（⿸ 包围结构）</span></span>
<span class="line"><span>韵尾 an → ⿵𰃦，去 IDC → 𰃦</span></span>
<span class="line"><span>组合：⿸尸 + 𰃦 → ⿸尸𰃦</span></span></code></pre></div><h3 id="判定规则总结" tabindex="-1">判定规则总结 <a class="header-anchor" href="#判定规则总结" aria-label="Permalink to &quot;判定规则总结&quot;">​</a></h3><table tabindex="0"><thead><tr><th>声母 IDC</th><th>包裹方向</th><th>示例</th></tr></thead><tbody><tr><td>⿰（左右）</td><td>韵尾包声母</td><td>tan → ⿵𰃦七</td></tr><tr><td>⿱（上下）</td><td>声母包韵尾</td><td>ban → ⿱不𰃦</td></tr><tr><td>⿸（左上包）</td><td>声母包韵尾</td><td>shan → ⿸尸𰃦</td></tr><tr><td>⿺（左下包）</td><td>声母包韵尾</td><td>lan → ⿺𠃊𰃦</td></tr></tbody></table><h2 id="规则四-⿰x一-→-⿱x一" tabindex="-1">规则四：⿰X一 → ⿱X一 <a class="header-anchor" href="#规则四-⿰x一-→-⿱x一" aria-label="Permalink to &quot;规则四：⿰X一 → ⿱X一&quot;">​</a></h2><p>当组合结果恰好是 <code>⿰X一</code>（左右结构，右边是「一」）时，自动修正为 <code>⿱X一</code>（上下结构，下面是「一」）：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>⿰不一 → ⿱不一（bu 的音韵字）</span></span>
<span class="line"><span>⿰七一 → ⿱七一（ti 的音韵字）</span></span></code></pre></div><p>这条规则让更多结果看起来像常见的上下结构汉字。</p><h2 id="全流程示例" tabindex="-1">全流程示例 <a class="header-anchor" href="#全流程示例" aria-label="Permalink to &quot;全流程示例&quot;">​</a></h2><h3 id="zhong" tabindex="-1">zhong <a class="header-anchor" href="#zhong" aria-label="Permalink to &quot;zhong&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 拆解：zh + ong</span></span>
<span class="line"><span>2. 查字根：⿱止 + 工</span></span>
<span class="line"><span>3. 韵部：[工]（单一非韵尾，去 IDC → 工）</span></span>
<span class="line"><span>4. 声母包韵部：⿱止 + 工 → ⿱止工</span></span></code></pre></div><h3 id="tian" tabindex="-1">tian <a class="header-anchor" href="#tian" aria-label="Permalink to &quot;tian&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 拆解：t + ie + an</span></span>
<span class="line"><span>2. 查字根：⿰七 + 也 + ⿵𰃦</span></span>
<span class="line"><span>3. 韵部：[也, ⿵𰃦] → ⿵𰃦也（韵尾包 ie）</span></span>
<span class="line"><span>4. 声母包韵部：⿰七 + ⿵𰃦也 → ⿰七⿵𰃦也</span></span></code></pre></div><h3 id="shuang" tabindex="-1">shuang <a class="header-anchor" href="#shuang" aria-label="Permalink to &quot;shuang&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 拆解：sh + u + ang</span></span>
<span class="line"><span>2. 查字根：⿸尸 + 五 + ⿹勹</span></span>
<span class="line"><span>3. 韵部：[五, ⿹勹] → ⿹勹五（韵尾包 u）</span></span>
<span class="line"><span>4. 声母包韵部：⿸尸 + ⿹勹五 → ⿸尸⿹勹五</span></span></code></pre></div><h3 id="han" tabindex="-1">han <a class="header-anchor" href="#han" aria-label="Permalink to &quot;han&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. 拆解：h + an</span></span>
<span class="line"><span>2. 查字根：⿰丩 + ⿵𰃦</span></span>
<span class="line"><span>3. 韵部：[⿵𰃦]（仅有韵尾）</span></span>
<span class="line"><span>4. 声母是 ⿰ → 韵尾包内核</span></span>
<span class="line"><span>5. ⿵𰃦 + 丩 → ⿵𰃦丩</span></span></code></pre></div><h2 id="常见音韵字速查" tabindex="-1">常见音韵字速查 <a class="header-anchor" href="#常见音韵字速查" aria-label="Permalink to &quot;常见音韵字速查&quot;">​</a></h2><table tabindex="0"><thead><tr><th>拼音</th><th>音韵字</th><th>规则</th></tr></thead><tbody><tr><td>ba</td><td>八</td><td>直接映射</td></tr><tr><td>bo</td><td>⿱不火</td><td>规则二</td></tr><tr><td>ban</td><td>⿱不𰃦</td><td>规则三</td></tr><tr><td>bian</td><td>⿱不⿵𰃦也</td><td>规则一 + 规则二</td></tr><tr><td>zhong</td><td>⿱止工</td><td>规则二</td></tr><tr><td>guan</td><td>⿰𠂎⿵𰃦五</td><td>规则一 + 规则二</td></tr><tr><td>tian</td><td>⿰七⿵𰃦也</td><td>规则一 + 规则二</td></tr><tr><td>han</td><td>⿵𰃦丩</td><td>规则三</td></tr><tr><td>lan</td><td>⿺𠃊𰃦</td><td>规则三</td></tr><tr><td>jin</td><td>⿱几冂</td><td>规则三（⿱包韵尾）</td></tr><tr><td>hong</td><td>⿰丩工</td><td>规则二</td></tr><tr><td>yong</td><td>用</td><td>整体映射</td></tr></tbody></table><hr><p>在<a href="/guide/playground.html">互动演示</a>中实时体验这些规则。或查看<a href="/guide/special-syllables.html">特殊音节</a>了解零声母和整体映射的处理。</p>`,42)])])}const g=s(p,[["render",i]]);export{u as __pageData,g as default};
