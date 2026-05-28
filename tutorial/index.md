---
layout: home

hero:
  # name: invnz
  text: 把拼音变成看得见的汉字
  tagline: 输入一段拼音，即可获得由汉字部件组合而成的「音韵字」——每个音素都有自己的字形，每个音节都是一幅结构图。
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/quick-start
    - theme: alt
      text: 实时演示
      link: #demo

features:
  - title: 一码即得
    details: 一个函数 <code>getInvnz(pinyin)</code>，输入拼音，输出音韵字。零配置，零依赖，浏览器和 Node.js 均可使用。
  - title: 409 音节全覆盖
    details: 所有标准汉语拼音全覆盖，从 <code>a</code> 到 <code>zhuang</code>，无一遗漏。每个音节都有唯一的音韵字表示。
  - title: 音韵可视化
    details: 声母、韵母、韵尾——每个音素映射到一个汉字部件。拼音的结构，一眼就能看清。
---

<div class="home-demo" id="demo">
  <RealtimeInput />
</div>

---

<ClientOnly>
<div class="philosophy-section">
  <div class="philosophy-inner">
    <div class="philosophy-quote">
      <span class="quote-mark">「</span>
      音者，声也；韵者，和也；字者，形也。
      <span class="quote-mark">」</span>
    </div>
    <p class="philosophy-body">
      拼音是声音的符号，汉字是意义的符号。invnz 在两者之间架起一座桥梁——<br>
      让每一个音素都有对应的字形，让每一个音节都成为一幅结构图。<br>
      从此，拼音不止是字母的排列，更是可以「看」的结构。
    </p>
  </div>
</div>
</ClientOnly>

<div class="window-divider"></div>

<div class="pipeline-section">
  <h2>从拼音到音韵字，仅需三步</h2>
  <div class="pipeline-steps">
    <div class="pipeline-step">
      <div class="step-number">1</div>
      <div class="step-content">
        <div class="step-title">拆解音素</div>
        <div class="step-desc">将拼音拆分为声母和韵母音素</div>
        <div class="step-example"><code>zhong</code> <span class="step-arrow">→</span> <code>zh</code> + <code>ong</code></div>
      </div>
    </div>
    <div class="pipeline-step">
      <div class="step-number">2</div>
      <div class="step-content">
        <div class="step-title">映射字根</div>
        <div class="step-desc">每个音素对应一个汉字部首或组件</div>
        <div class="step-example"><code>zh</code> <span class="step-arrow">→</span> <code>⿱止</code>　<code>ong</code> <span class="step-arrow">→</span> <code>工</code></div>
      </div>
    </div>
    <div class="pipeline-step">
      <div class="step-number">3</div>
      <div class="step-content">
        <div class="step-title">组合成形</div>
        <div class="step-desc">用汉字结构指示符组合成类汉字</div>
        <div class="step-example"><code>⿱止</code> + <code>工</code> <span class="step-arrow">→</span> <code>⿱止工</code></div>
      </div>
    </div>
  </div>
</div>

<div class="window-divider"></div>

<div class="examples-section">
  <h2>一览</h2>
  <table>
    <thead>
      <tr><th>拼音</th><th>音韵字</th><th>结构解析</th></tr>
    </thead>
    <tbody>
      <tr><td><code>zhong</code></td><td><code>⿱止工</code></td><td>止在上，工在下</td></tr>
      <tr><td><code>tian</code></td><td><code>⿰七⿵𰃦也</code></td><td>七在左，𰃦包也</td></tr>
      <tr><td><code>guan</code></td><td><code>⿰𠂎⿵𰃦五</code></td><td>𠂎在左，𰃦包五</td></tr>
      <tr><td><code>shuang</code></td><td><code>⿸尸⿹勹五</code></td><td>尸左上，勹包五</td></tr>
      <tr><td><code>yong</code></td><td><code>用</code></td><td>整体象形字</td></tr>
      <tr><td><code>hong</code></td><td><code>⿰丩工</code></td><td>丩在左，工在右</td></tr>
      <tr><td><code>han</code></td><td><code>⿵𰃦丩</code></td><td>𰃦包丩（韵尾优先）</td></tr>
    </tbody>
  </table>
</div>

<div class="home-seal">音 韵 之 美</div>

<script setup>
import RealtimeInput from './.vitepress/theme/components/RealtimeInput.vue'
</script>

<style>
  .name.clip{
    height:0.6em;
  }
  .actions[data-v-9f7d2fff]{
    margin:.2em;
    padding-top:0;
  }

.VPFeatures.VPHomeFeatures {
    padding-top: 1em;
}


.pipeline-section {
  margin: 48px 0;
}
.pipeline-section h2 {
  text-align: center;
  font-family: var(--font-calligraphy), cursive;
  font-size: 1.8em;
  margin-bottom: 40px;
}
.pipeline-steps {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}
.pipeline-step {
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}
.pipeline-step:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  border-color: var(--vermillion);
}
.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vermillion);
  color: white;
  font-family: var(--font-nav), serif;
  font-size: 1.2em;
  margin-bottom: 16px;
}
.step-title {
  font-family: var(--font-calligraphy), cursive;
  font-size: 1.2em;
  color: var(--ink-black);
  margin-bottom: 8px;
}
.step-desc {
  font-size: 0.9em;
  color: var(--ink-lighter);
  margin-bottom: 12px;
  line-height: 1.6;
}
.step-example {
  font-family: var(--font-mono), monospace;
  font-size: 0.9em;
  color: var(--ink-light);
  background: #f8f0e0;
  padding: 8px 12px;
  border-radius: 6px;
}
.step-arrow {
  color: var(--vermillion);
  margin: 0 4px;
}

.philosophy-section {
  margin: 60px 0;
  text-align: center;
}
.philosophy-inner {
  max-width: 640px;
  margin: 0 auto;
  padding: 40px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  position: relative;
}
.philosophy-inner::before,
.philosophy-inner::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  border-color: var(--vermillion);
  opacity: 0.3;
}
.philosophy-inner::before {
  top: 8px;
  left: 8px;
  border-top: 2px solid;
  border-left: 2px solid;
}
.philosophy-inner::after {
  bottom: 8px;
  right: 8px;
  border-bottom: 2px solid;
  border-right: 2px solid;
}
.philosophy-quote {
  font-family: var(--font-calligraphy), cursive;
  font-size: 1.5em;
  color: var(--ink-black);
  margin-bottom: 20px;
  line-height: 1.8;
  letter-spacing: 0.08em;
}
.quote-mark {
  color: var(--vermillion);
  font-size: 0.8em;
  vertical-align: middle;
}
.philosophy-body {
  font-family: var(--font-decorative), serif;
  font-size: 1em;
  color: var(--ink-light);
  line-height: 2;
  margin: 0;
}

.examples-section {
  margin: 48px 0;
}
.examples-section h2 {
  text-align: center;
  font-family: var(--font-calligraphy), cursive;
  font-size: 1.8em;
  margin-bottom: 24px;
}
.examples-section table {
  max-width: 640px;
  margin: 0 auto;
}
.examples-section td:first-child {
  font-family: var(--font-mono), monospace;
}

.home-demo {
  margin: 0 -16px;
}
</style>
