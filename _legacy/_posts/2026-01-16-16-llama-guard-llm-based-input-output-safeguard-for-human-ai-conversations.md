---
layout: post
title: "Llama Guard: LLM-based Input-Output Safeguard for Human-AI Conversations 후속 연구"
date: 2026-01-16 23:36:00
desc: "Llama Guard: LLM-based Input-Output Safeguard for Human-AI Conversations 후속 연구"
keywords: "Llama Guard: LLM-based Input-Output Safeguard for Human-AI Conversations 후속 연구,Paper-Conference,AI 보안,security for ai"
categories: [Paper-Conference]
tags: ["AI 보안", "security for ai"]
icon: fa-book
---

> Source: [https://sanghole.tistory.com/16](https://sanghole.tistory.com/16)

<p data-ke-size="size16"> </p>
<p data-ke-size="size16">그전에 정리한 것들은 노션에 있는 거를 markdown 형식으로 내보내서 바로 복사 붙여넣기 한 글이다.!</p>
<p data-ke-size="size16">그전에 정리한 내용은 아래와 같다. 한국에 이런 연구가 있는지, 그리고 Llama Guard는 어떤 연구를 진행해서 어디까지 발전했는지에 대해서 알아보았다.</p>
<h1 style="color: #333333; text-align: start;">추후 연구 동향</h1>
<h3 data-ke-size="size23" style="color: #000000; text-align: start;">Llama-Guard의 현재 현황</h3>
<p data-ke-size="size16" style="color: #333333; text-align: start;">현재 github에는 Llama-guard를 출시 후, 버전이 3개가 더 나왔으며 Prompt-Guard도 나왔다.</p>
<p data-ke-size="size16" style="color: #333333; text-align: start;">Llama Guard 3는 Llama 3.1 아키텍처를 기반으로 성능과 효율성의 균형을 맞추는데 주력한다. 1B 모델의 도입으로 경량화를 시도하였다.</p>
<p data-ke-size="size16" style="color: #333333; text-align: start;">Llama Guard 3 Vision도 출시하였는데 이미지 내의 유해성을 판단하는 능력을 갖춘 모델이다. (깊게는 알아보지 못했다)</p>
<p data-ke-size="size16" style="color: #333333; text-align: start;">2025, 4월에 공개된 Llama Guard 4는 12B 파라미터 규모로 Llama 4 Scout 아키텍처에서 파생되었다. MoE 구조를 안정성 분류라는 특수 목적에 맞춰 Dense 아키텍처로 Pruning을 시도하였다.</p>
<p data-ke-size="size16" style="color: #333333; text-align: start;"> </p>
<h3 data-ke-size="size23" style="color: #000000; text-align: start;">한국에서는 이런 연구가 없나?</h3>
<ol data-ke-list-type="decimal" style="list-style-type: decimal; color: #333333; text-align: start;">
<li style="list-style-type: decimal;">Samsung.IBM의 Granite-3.3-2B-Instruct 모델을 기반으로 한다.
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li style="list-style-type: decimal;">한국어 안전성 밴치마크에서 Llama Guard 4나 Quen3Guard보다 F1 score 0.90을 기록하며 한국어 특화 guard를 입증하였다.</li>
<li style="list-style-type: decimal;">SGuard-v1: Safety Guardrail for Large Language Models</li>
</ol>
</li>
<li style="list-style-type: decimal;">카카오카카오 자체 LLM인 Kanana를 기반으로 하여 한국어의 언어적 특성에 최적화.
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li style="list-style-type: decimal;"><a href="https://huggingface.co/collections/kakaocorp/kanana-safeguard">https://huggingface.co/collections/kakaocorp/kanana-safeguard</a></li>
<li style="list-style-type: decimal;">Kanana Safeguard.</li>
</ol>
</li>
</ol>
<hr contenteditable="false" data-ke-style="style5" data-ke-type="horizontalRule">
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">그러면 지금 내가 이야기하는 후속 연구는 무엇인지에 대해서. 먼저 내가 노션에 정리한 내용을 먼저 정리해보겠다.</p>
<p data-ke-size="size16"> </p>
<h3 data-ke-size="size23">Q1. MCP? ( Systematic Analysis of MCP Security )</h3>
<p data-ke-size="size16">AI에서 요즘은 MCP를 많이들 사용하고 있으니까, 좀 다른 결이긴 MCP 파일 시스템 접근, DB 조회 등 여러 가지를 수행할 수 있는데 이런 “행동”들을 막아주는 연구도 하고 있는건가?.</p>
<h3 data-ke-size="size23">MCP</h3>
<p data-ke-size="size16">Host,Clinet, Server로 구성된 클라이언트-서버 아키텍처이다. 데이터와 도구를 활용하는 AI 애플리케이션인 Host는 Client를 통해 다수의 Server에 요청을 보낸다.</p>
<h3 data-ke-size="size23">Server는?</h3>
<p data-ke-size="size16">세 가지 핵심 역량을 보유한다.</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>Tools : 외부 작업 수행 가능</li>
<li>Resources : AI 모델에 데이터 노출</li>
<li>Prompts : 워크플로우 최적화를 위한 재사용 가능한 템플릿.</li>
</ol>
<p data-ke-size="size16">위 3가지를 이용해서</p>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>로컬 파일 읽기</li>
<li>데이터 베이스 쿼리</li>
<li>네트워크 엑서스</li>
</ul>
<p data-ke-size="size16">MCP가 도구 포이즈닝 공격(TPA)에 취약하다고 공개했다.</p>
<p data-ke-size="size16">→ 무해한 코드 주석으로 위장하여 tool 설명 안에 악성 지침을 삽입을 할 수 있다.</p>
<p data-ke-size="size16">본 논문에서는 4가지의 카테[고리로 포괄적으로 정리한다.</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>Direct Tool Injection attack.</li>
<li>도구 설명 안에 악성 지시문을 삽입.</li>
<li>Indriect Tool injection attack</li>
<li>웹페이지, README, tool 반환값을 통한 공격</li>
<li>Malicious user attack.</li>
<li>MCP 서버에 악성 도구를 등록한다. EX) 권한 상승, 토큰 탈취</li>
<li>LLM inherent backward.→ MCP는 이 공격들을 더 쉽게, 더 강력하게 만든다.</li>
<li>Jailbreak, prompt leakage, Goal hijaking.</li>
</ol>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>알고가야할 insight.
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>MCP 에이전트는 공격 유형에 따라 서로 다른 민감도를 보인다.반면, 악성 코드 실행은 명시적인 사용자 승인이 필요하다. 결과적으로 파일 기반 공격기 성공할 가능서이 높다.</li>
<li>파일 관련 작업은 사용자 확인 없이 실행될 수 있는 반면</li>
<li>의사 결정 과정에서 도구 설명에 크게 의존한다.</li>
<li>MCP 에이전트의 context learning 능력과 MCP 공유 컨텍스트 내 격리 부족으로 인한 연쇄 공격이 발생할 수 있습니다.</li>
<li>MCP 에이전트는 외부 데이터와 실행 가능한 명령을 구별하는 데 어려움을 겪는다.</li>
</ol>
<hr data-ke-style="style1"/></li>
<li>연구의 기여도MCP 보안 방어를 발전시키기 위한 실질적인 참조 사례 제공</li>
<li>실증적 취약점 분석.</li>
<li>포괄적인 공격 분류 체계, MCP 특화 공격 방법에 대한 최초의 체계적인 분류 및 정량적 분석을 제시한다.</li>
</ul>
<p data-ke-size="size16">여기서 지금 내가 보는 부분은 딱 4번에 해당하는 것만 이해해보기.</p>
<h3 data-ke-size="size23">LLM 고유 공격(LLM inherent Attack)</h3>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>MCP는 에이전트의 도구 호출 능력을 확장하여 기능적 유연성을 향상시킨다.</li>
</ul>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>Jailbreak 공격:role-playing을 통해 에이전트를 jalibreak 상태로 유도하는 악성 도구를 생성할 수 있다. 여기서 더욱더 문제는 컨텍스트 격리 부족으로 인해, 하나의 도구가 성공적으로 jalibreak 되면 이후의 도구들도 이 상태를 상속 받을 수 있다.</li>
<li>특정 프롬프트를 주입하여 LLM의 윤리적 제약이나 접근 경계를 무너뜨린다.</li>
<li>Prompt Leakage 공격민감한 정보를 단계별로 추출하고 LLM의 원래 프롬프트 템플릿이나 훈련 데이터셋을 재구성할 수 있다.</li>
<li>도구 호출 기능을 악용하여서 LLM의 원래 훈련 데이터나 비공개 프롬프트를 반복적으로 추론한다.</li>
<li>Hallucination 공격:</li>
<li>실제 기능을 검증하지 않도 도구 설명에 의존한다는 점을 악용한다. fake database라는 이름의 도구는 데이터베이스 연결이 없음에도 불구하고 실시간 주식 데이터를 제공한다고 허위로 주장할 수 있다.</li>
<li>Backdoor 공격:</li>
<li>블랙박스 모델과의 반복적인 상호작용이 필요하지만, MCP 도구 및 리소스 메커니즘은 자연스러운 진입점을 제공한다. Backdoor 지침이 포함된 도구를 설계하고 MCP Server의 리소스 모듈에 악성 스크립트를 미리 내장할 수 있다. 공격자는 Backdoor 기능을 활성화하기 위해 트리거를 주입할 수도 있다.</li>
<li>Goal Hijack.EX) “추천 제품”을 “악성 링크”로 교체</li>
<li>도구 체인 의존성을 악용하여 오류를 증폭시켜, 에이전트의 목표를 탈취할 수 있다.</li>
<li>SQL Injection.</li>
<li>상용 LLM을 사용할 떄 MCP 에이전트는 종종 API 토큰을 로컬 설정 파일에 저장한다. 공격자는 read_config와 같은 간단한 도구를 사용하여 이러한 민감한 자격 증명을 유출할 수 있다.</li>
</ol>
<h3 data-ke-size="size23">Q2. 본 논문의 문제점인 영어만 막을 수 있는 것에 대한 후속 연구</h3>
<p data-ke-size="size16">이것을 제외하고도 다른 것도 있는 것 같은데 Llama Guard에서도 학습하고, Zero-shot, Few-shot, 파인 튜닝등으로 하는 방법들을 나열 했다면 이 논문은 고자원 언어의 모델을 통해서 저자원 언어의 성능을 향상시키고, 최대한 적은 파라미터를 가지고 LLM Guard 역할을 수행할 수 있도록 만들어준다.</p>
<p data-ke-size="size16">약간, 어짜피 LLM Guard를 하는 건 많으니까 우리 연구는 최대한 적은 파라미터로 많은 언어를 커버하기 위해서 이런 연구 했다!. 이런 느낌.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">핵심 특징</p>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>100개 언어를 위한 파라미터 효율적인 안전 정렬 이진 분류 모델</li>
<li>경량화 및 IoT 도입을 위한 0.5B 파라미터로 구현</li>
<li>13개 고자원 언어로만 훈련.</li>
</ul>
<p data-ke-size="size16">기술적 접근:</p>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>다국어 트랜스포머 XLM-R 모델의 표현 공간을 활용하여 의미적, 구조적으로 유사한 언어를 클러스터링.</li>
<li>클러스터 내 어너의 표현적 근접성을 통해 클러스터 전체에 걸쳐 모델 성능 일반화</li>
<li>주어진 클러스터의 고자원 언어로 모델을 미세조정하면 동일 클러스터의 저자원 언어에 효과적으로 혜택 제공.</li>
</ul>
<p data-ke-size="size16">다국어 안전 데이터셋</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>PolyGuardMix자연 발생 한 다국어 인간-LLM 상호작용과 WildGuardMix의 인간 검증 기계 번역으로 큐레이션.</li>
<li>17개 언어로 190만 개 예제 포함.</li>
<li>다국어 언어 벤치마크수십 개 언어로 평가를 확장한다.</li>
<li>MultiJail, PolygloToxicityPromts, XSafety, XGTest, RTP-LX.</li>
</ol>
<h3 data-ke-size="size23">교차언어 전이 학습.</h3>
<p data-ke-size="size16">핵심 아이디어: 고자원 언어의 모델이나 데이터를 활용하여 저자원 언어의 성능을 향상시킨다.</p>
<p data-ke-size="size16">연구자들이 저자원 어넝로 지식 전이를 확장하기 위해 광범위하게 채택한다.</p>
<h3 data-ke-size="size23">Q1을 보다가 생각난 것.</h3>
<p data-ke-size="size16">“AI 모델에 대한 보안”을 어디까지 정의해야할까?. AI를 보안하는 것</p>
<p data-ke-size="size16">Q1에 있는 공격 중 하나가 원래 있는 config.yaml을 위험하다고 프롬프트에 넣고 재구성을 하는 도중에 악성 프롬프트를 삽입하거나, 필요한 프로그램이라며, github에 있는 악성 프로젝트를 설치하라고 할 때 그냥 clone 후 Readme.md의 지침에 따라 실행하는 것 까지, 이게 MCP 보안이라고 해야하나? AI 보안이라고 해야하나.</p>
<p data-ke-size="size16">논문에서는 MCP Agent의 핵심 상호작용 패턴은 도구 반환 결과에 대한 LLM의 파싱 및 응답에 의존한다고 했다. 공격자는 도구의 출력에 악성 명령어를 삽입합으로써 이러한 특성을 악용할 수 있으며, 이는 LLM이 이를 정당한 운영 명령으로 오해하여 실행하도록 유도한다.</p>
<p data-ke-size="size16">이는 LLM이 이를 정당한 운영 명령으로 오해하여, 실행하도록 유도한다.</p>
<p data-ke-size="size16">LLM은 일반적으로 도구 반환 결과를 시스템에서 검증된 피드백으로 가정하므로, 파싱 과정에서 엄격한 문맥적 격리가 부족합니다.</p>
<p data-ke-size="size16">“신뢰”를 기반으로 한 LLM의 행동이 원래는 실행 권한이 없어서 실행까지는 못했는데, 이제는 MCP라는 프로토콜을 이용해서 이것 저것 실행을 하기 시작하니까 시작한 문제이다.</p>
<h3 data-ke-size="size23">(1) LLM의 인지적 신뢰</h3>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>LLM의 판단에 진위 검증 능력이 없다.</li>
<li>안전하다, 공식, 필요하다 등.. 같은 표현에 설득 해야하며, 그렇게 프롬프트 엔지니어링을 해야한다.,</li>
</ul>
<h3 data-ke-size="size23">(2) 시스템의 구조적 신뢰</h3>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>시스템이 이 데이터/명령은 실행해도 된다고 판단 후, 실행 권한을 부여하는 설계적 전제.
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>코드와 정책으로 강제됨.</li>
<li>보안 경계의 문제.</li>
</ul>
</li>
</ul>
<p data-ke-size="size16">→ 근데 LLM이 말한 명령을 MCP가 어떻게 실행하는 것 일까?.</p>
<p data-ke-size="size16">MCP Agent의 일반적인 실행 파이프라인.</p>
<p data-ke-size="size16">사용자 프롬프트 또는 Tool invocation 결과에 프로젝트를 빌드하기 위해서 ~~ 명령어 실행 필요.</p>
<p data-ke-size="size16">이러면 LLM은이게 설명인지, 해야 할 작업인지, 등을 자연어로 추론한다.</p>
<p data-ke-size="size16">그 후, LLM이 생성한 제안을 JSON으로 보내던, 해서 MCP가 LLM의 출력을 파싱하게 된다면 이 때 실제 실행으로 변환하는 것이다.</p>
<p data-ke-size="size16">→ 근데 말만 들으면 쉬울 것 같은데?. LLM이 생성한 제안 중간에 솔루션을 배치해서 검증만 하면 그만 아닌가?. 실제로 있다.</p>
<p data-ke-size="size16"><a href="https://github.com/invariantlabs-ai/invariant/tree/main">https://github.com/invariantlabs-ai/invariant/tree/main</a></p>
<p data-ke-size="size16">간단 요약</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>AI 에이전트 보안 시스템 - LLM/MCP 기반 AI 애플리케이션을 보호하는 가드레일 레이어</li>
<li>규칙 기반 차단 - Python 스타일의 간단한 규칙 언어로 보안 정책을 작성</li>
<li>실시간 모니터링 - LLM 요청과 도구 호출을 실시간으로 감시 및 분석</li>
<li>공격 탐지 - Pormpt Injection, 악의적인 이메일 전송 등 위험한 패턴을 자동 탐지.</li>
</ol>
<p data-ke-size="size16">LLM 보안 + MCP 보안의 애매한 부분을 한꺼번에 처리해줌.</p>
<p data-ke-size="size16"> </p>
<hr contenteditable="false" data-ke-style="style5" data-ke-type="horizontalRule"/>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">좀 많은 내용이 들어가 있고, 중간에 Q2는 다른 질문이 들어가 있기는 한데 결국에는 내 질문은 MCP에 관련한 보안을 할 때, 결국에 AI가 다른 API나 기능들이 필요해서 해당 기구들을 부르고 사용한다.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">이럴 때 콜을 한 LLM을 보안?,</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">아니면 불러오는 기능들을 보안?.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">이렇게 보면 해당 내용들을 쭉 보면서 MCP를 보안하는 LLM을 하나 더 만들어서 지금 다른 기능들을 call 하고 있는 LLM이 어떤 과정때문에 이 작업을 call 했고, 기능을 불렀는지 맥락적 이해를 통해 해당 기능이 "악성 공격"으로 인해 다른 기능들을 불러 "악성 행동"을 수행하려고 하는지를 보안해야할 것 같은 생각이다.</p>
<p data-ke-size="size16">-&gt; 이거는 약간 좀 구체화해서 다른 Tistory 글로 옮길 예정이다.</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">오늘은 연구 동향을 파악하다가 MCP에 대한 연구 동향이 궁금해졌고 그러다가 엥 LLM에서 도구를 콜하는건, LLM 탓인데 그럼 뭐를 보안해야하는거지? 라는 생각이 들어서 적어본 글 입니다!!!</p></hr>
