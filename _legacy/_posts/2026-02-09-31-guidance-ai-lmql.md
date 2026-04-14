---
layout: post
title: "Guidance AI & LMQL"
date: 2026-02-09 16:49:00
desc: "Guidance AI & LMQL"
keywords: "Guidance AI & LMQL,TechnicalDocument,AI 보안,security for ai"
categories: [TechnicalDocument]
tags: ["AI 보안", "security for ai"]
icon: fa-file-text-o
---

> Source: [https://sanghole.tistory.com/31](https://sanghole.tistory.com/31)

<p data-ke-size="size16">일단 Survey에 나온 논문 요약.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16"> </p>
<h3 data-ke-size="size23">Guidance AI</h3>
<p data-ke-size="size16">사용자가 정규 표현식 및 CFG를사용하여 생성을 제약, 조건문과 루프와같은 제어 및 생성을 원활하게 통합할 수 있다.</p>
<p data-ke-size="size16">-&gt; LLM의 텍스트 처리 방식을 테긋트 생성, 프롬프트, 로직 제어를 흐름으로 py 환경 내에 통합한다.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">handlebars 템플릿 언어를 기반으로 구축된 간단하고 직관적인 구문 포함-&gt; 모든 프롬프트에서 변수 삽입을보장.</p>
<p data-ke-size="size16">    </p>
<p data-ke-size="size16">이런 행동들을 언어 모델이 처리하는 토큰 시퀸스에 직접적으로 대응하는 선형 실행 순서를 가져서 수행할 수 있다.</p>
<p data-ke-size="size16"> </p>
<p data-end="717" data-ke-size="size16" data-start="687">Guidance에서는 다음이 동시에 가능다.</p>
<ul data-end="814" data-ke-list-type="disc" data-start="719" style="list-style-type: disc;">
<li data-end="737" data-start="719">토큰 생성: &#123;&#123;gen&#125;&#125;</li>
<li data-end="760" data-start="738">조건 분기: if / select</li>
<li data-end="771" data-start="761">반복: loop</li>
<li data-end="814" data-start="772">확률 기반 선택: &#123;&#123;#select&#125;&#125;&#123;&#123;or&#125;&#125;&#123;&#123;/select&#125;&#125;</li>
</ul>
<p data-end="1336" data-ke-size="size16" data-start="1304"> </p>
<p data-end="1336" data-ke-size="size16" data-start="1304">Guidance에서 중요한 점은, 토큰 단위 타임스텝마다 </p>
<p data-end="1336" data-ke-size="size16" data-start="1304"> </p>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li data-end="318" data-start="301">생성할지(&#123;&#123;gen&#125;&#125;)</li>
<li data-end="342" data-start="321">분기할지(&#123;&#123;#select&#125;&#125;)</li>
<li data-end="365" data-start="345">제약을 걸지(regex, CFG)</li>
<li data-end="397" data-start="368">로직을 실행할지</li>
</ul>
<p data-ke-size="size16">을 프로그램이 결정하게 만든다. 그래서 LLM이 혼자 생성하는 것이 아니라 저 런타임이 매 스텝마다 개입을 해버린다!</p>
<p data-ke-size="size16"> </p>
<p data-end="516" data-ke-size="size16" data-start="491">&#123;&#123;gen&#125;&#125;은 텍스트 생성이 아니라 아래에 있는 것들의 생성 명령이다.</p>
<ul data-end="583" data-ke-list-type="disc" data-start="518" style="list-style-type: disc;">
<li data-end="530" data-start="518">현재 프롬프트 상태</li>
<li data-end="543" data-start="531">이전 토큰 히스토리</li>
<li data-end="569" data-start="544">적용 중인 제약(regex, prefix)</li>
<li data-end="583" data-start="570">KV cache 상태</li>
</ul>
<p data-ke-size="size16">4개를 포함하느 정확히 정의된, 한 시점의 생성 명령.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">&#123;&#123;#Select&#125;&#125;&#123;&#123;or&#125;&#125;&#123;&#123;/select&#125;&#125;.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">select의 실제 동작에는 </p>
<p data-ke-size="size16">1. 다음 토큰을 생성한다</p>
<p data-ke-size="size16">2. 해당 토큰의 .log probability를 반환한다.</p>
<p data-ke-size="size16">3. 후보 토큰들을 trie 구조로 매칭한다.</p>
<p data-ke-size="size16">4. 후보 중 확률이 가장 높은 경로를 선택한다.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">를 통해, 모델의 확률 분포를 직접 이용하여 분기한다.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">그럼 Role label은 뭐함?</p>
<p data-ke-size="size16">&#123;&#123;#assistant&#125;&#125;, &#123;&#123;#user&#125;&#125;, &#123;&#123;#system&#125;&#125;는 해당 role label을 기반으로</p>
<p data-ke-size="size16">1. 토큰 포맷 변경</p>
<p data-ke-size="size16">2. 모델별 API 파라미터 매핑</p>
<p data-ke-size="size16">3. Chat-based / Completion-based LLM의 차이를 흡수.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">또한 HuggingFace 통합과 KV cache 재사용이 가능하다.</p>
<p data-ke-size="size16">KV cache 재사용은 이미 처리한 프롬프트의 key-value attention 결과를 캐시하여,이후 호출 시 재사용할 수 있다.</p>
<p data-ke-size="size16">이러면 동일한 prefix를 반복 사용하는 워크플로우에서 지연을 감소시킨다.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">그래서 Guidance가 뭐하는 친구야?</p>
<p data-ke-size="size16">-&gt; 토큰 토큰 마다의 내부 개입을 해주는 친구이ㅏㄷ.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">만약에 JSONL 형식으로 나와야하는데 형식이 안 맞다?. 그러면 Guidance가 토큰마다의 개입을 통해서 고쳐주는 역할이다.</p>
<p data-ke-size="size16">&#123;&#123;gen&#125;&#125;은 다음 토큰을 생성하는 역할이고</p>
<p data-ke-size="size16">&#123;&#123;select&#125;&#125;는 해당 토큰을 결정할 때, 보통 ai가 단어마다의 점수를 매기는데, 그 중 점수가 가장 높은 친구를 가져오거나 논리 분기나 확률 기반 판단을 하는 친구이다.</p>
<p data-ke-size="size16">또한 프롬프트 끝이나, 토큰이 중간에서 끊기면 Token Healing을사용하여 그전 토큰이 뭐였는지, 그거와 관련지어서 또 연결을 시켜줄 수 있다.</p>
<p data-ke-size="size16">또한 이것들을 평가하는 Regex를 사용하여, 생성-&gt;검사시, 실패를 하면 다시 생성을 하는 과정을 겪을 수도 있다.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">뭔가 이 친구는 </p>
<p data-ke-size="size16">이 요청이 윤리적인지, 유해한지, 위반하는지를 보는게 아니고 </p>
<p data-ke-size="size16">출력 형식, 생성 흐름, 구조, 토큰 경계들을 보는 느낌이다.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16"> </p>
<h2 data-ke-size="size26">LMQL</h2>
<p data-ke-size="size16">-&gt; LLM이 아무 말이나 생성하지 못하게 개발자가 정한 규칙 안에서만 토큰을 생성하도록 강제하는 언어.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">ETH Zurich의 SRI Lab에서 설계한 LMQL 3.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">프롬프트 템플릿의 개념을 새로운 프로그래밍 언어 패러다임으로 더욱 발전시킨다.</p>
<p data-ke-size="size16">Py의 상위 집합으로 개발자는 쿼리 내에 정확한 제약 조건을 포함시킨다. -&gt; 콘텐츠 제한부터 정확성을 위한 세밀한 것 까지 조정가능.</p>
<p data-ke-size="size16"> </p>
<pre class="python" data-ke-language="python" data-ke-type="codeblock" id="code_1770707885481"><code>argmax
  "Answer: {answer}"
where
  len(answer) &lt; 50 and
  not contains(answer, "욕설")</code></pre>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">SQL 처럼 사용하는 LMQL은, where처럼 조건문을 걸 수 있다. not contains를 활용하여서 특정 단어를 무조건 빼도록 만들 수도 있다.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">LMQL은 신기한 디코딩을 실행하는데, 조건을 위반할 가능성이 있는 토큰을 미리 제거하여 남은 토큰 중에서만 선택하도록 한다.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">또한 Beam Search를 통해서 문자열 전체를 하나의 시퀸스로 보고 가장 좋은 문장 몇 개를 유지한다.</p>
<p data-ke-size="size16">문장 하나로 탐색하는 것이 아닌, 변수 상태와 제약 조건 만족 여부 상태로 탐색을 시도한다.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">-&gt; 근데, 텍스트 기준으로 조건이 참/거짓인지 어떻게 알까?. 아직 문장이 다 완성되지도 않았는데?!!?</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">일단 현재 기준으로 해당 단어가 이상한 단어인지 아닌지를 먼저 확인하고,</p>
<p data-ke-size="size16">최종 의미론으로 </p>
<p data-ke-size="size16"> </p>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li data-end="1773" data-start="1745"><b>FIN</b>: 더 생성돼도 값이 절대 안 바뀜</li>
<li data-end="1793" data-start="1774"><b>VAR</b>: 바뀔 수도 있음</li>
<li data-end="1819" data-start="1794"><b>INC</b>: 값이 증가 방향으로만 변함</li>
<li data-end="1842" data-start="1820"><b>DEC</b>: 감소 방향으로만 변함</li>
</ul>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">위의 4개의 값들을 이용해서 앞으로 토큰이 더 생성되면 조건이 어떻게 변경하는지를 확인한다.</p>
<p><figure class="imageblock alignCenter" data-ke-mobilestyle="widthOrigin" data-origin-height="37" data-origin-width="169"><span data-phocus="https://blog.kakaocdn.net/dna/bmilfQ/dJMcabQDjyE/AAAAAAAAAAAAAAAAAAAAAOMAdTAo5O-bLJRuRsi3fZnBsjOqZ4GmKJrM-nexMDh4/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=s7BbUeqZKkGM%2Bg9JKJ%2FUZfpssK0%3D" data-url="https://blog.kakaocdn.net/dna/bmilfQ/dJMcabQDjyE/AAAAAAAAAAAAAAAAAAAAAOMAdTAo5O-bLJRuRsi3fZnBsjOqZ4GmKJrM-nexMDh4/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=s7BbUeqZKkGM%2Bg9JKJ%2FUZfpssK0%3D"><img data-origin-height="37" data-origin-width="169" height="37" loading="lazy" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" src="https://blog.kakaocdn.net/dna/bmilfQ/dJMcabQDjyE/AAAAAAAAAAAAAAAAAAAAAOMAdTAo5O-bLJRuRsi3fZnBsjOqZ4GmKJrM-nexMDh4/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=s7BbUeqZKkGM%2Bg9JKJ%2FUZfpssK0%3D" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&amp;fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbmilfQ%2FdJMcabQDjyE%2FAAAAAAAAAAAAAAAAAAAAAOMAdTAo5O-bLJRuRsi3fZnBsjOqZ4GmKJrM-nexMDh4%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1777561199%26allow_ip%3D%26allow_referer%3D%26signature%3Ds7BbUeqZKkGM%252Bg9JKJ%252FUZfpssK0%253D" width="169"/></span></figure>
</p>
<p data-ke-size="size16">이 사진은 약간 핵심?이라고 할 수는 있는데.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">현재 생성 상태 u에서 토큰 t를 하나 더 붙였을 때, 제약 조건 expr이 앞으로도 만족할 수 있나?를 확인한다.</p>
<p data-ke-size="size16">그럼 다음 토큰 후보 하나하나에 대해, 토큰을 붙이면 미래에 조건 위반이 확정되는지를 확인할 수 있다.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">가능성이 있음-&gt;유지</p>
<p data-ke-size="size16">불가능 -&gt; 즉시 제거.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16"> </p>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li data-end="2412" data-start="2392">모델이 다음 토큰 후보들을 계산</li>
<li data-end="2437" data-start="2413">각 토큰에 대해 FollowMap 실행</li>
<li data-end="2467" data-start="2438">제약 조건을 현재 + 미래 관점에서 평가</li>
<li data-end="2482" data-start="2468">위반 확정 토큰 제거</li>
<li data-end="2501" data-start="2483">남은 토큰만으로 디코딩 진행</li>
<li data-end="2530" data-start="2502">이 과정을 모든 변수, 모든 토큰에 대해 반복</li>
</ul>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16"> </p>
