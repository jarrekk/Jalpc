---
layout: post
title: "Llama Guard: LLM-based Input-Output Safeguard for Human-AI Conversations"
date: 2026-01-08 16:31:00
desc: "Llama Guard: LLM-based Input-Output Safeguard for Human-AI Conversations"
keywords: "Llama Guard: LLM-based Input-Output Safeguard for Human-AI Conversations,Paper-Conference,AI 보안,security for ai"
categories: [Paper-Conference]
tags: ["AI 보안", "security for ai"]
icon: fa-book
---

> Source: [https://sanghole.tistory.com/14](https://sanghole.tistory.com/14)

<h1>개인적인 요약</h1>
<p data-ke-size="size16">기존에 있는 정책 보안 대한 API들은 인간과 LLM이 생성해주는 프롬프트와 대답 쌍을 구별하지 못하고, API가 블랙 박스로 활용되어 사용자들이 직접 정책을 추가할 수 없었다. 그래서 LLM에 특화된 Llama Guard라는 LLM을 생성하였다.</p>
<p data-ke-size="size16">Llama Guard는 아래 4가지의 지침을 활용하여서 safe Guard 목적을 달성한다.</p>
<blockquote data-ke-style="style1">
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>safe/unsafe에 대한 지침 세트를 입력으로 받는다.</li>
<li>사용자 메시지와 에이전트 메시지를 분류한다.</li>
<li>사용자/에이전트의 메시지를 차쳬로 대화에 포함한다.</li>
<li>safe/unsafe를 출력하며 unsafe면 위반된 분류 체계의 범주들이 나열된다.</li>
</ol>
</blockquote>
<p data-ke-size="size16">각기 다른 정책에 대한 표준 점수가 없으니, 본 논문은 3가지의 방법을 활용하였다.</p>
<blockquote data-ke-style="style1">
<p data-ke-size="size16">1.대부분의 API는 카테고리별 확률 점수를 생성하기에, 본 논문도 카테고리의 예측 점수를 확인한다.<br/>2.다중 클래스 분류 설정에서 메트릭을 얻기 위해, 카테고리에서 하나를 제외하고 나머지는 다 음성으로 간주한다.<br/>3.위의 방법과 비슷하지만, benign을 제외하고는 drop하고, benign은 음성으로 처리한다.</p>
</blockquote>
<p data-ke-size="size16">사용한 Benchmarks는 2개로 ToxicChat과 OpenAI Moderation Evaluation Dateset이다.<br/>사용한 API는 4가지로</p>
<aside>
<p data-ke-size="size16">OpenAI Moderation API(11가지 콘턴체 안전 범주를 위반하는지 판단),<br/>Perspective API( 온라인 플랫픔에서 유해&amp;공격적인 콘텐츠를 제거하도록 설계),<br/>Azure AI Content Safety API(다중 레이블 분류기),<br/>GPT-4</p>
</aside>
<p data-ke-size="size16">점수는 AUPRC점수를 주로 확인하였다. 대체로 Llama Guard가 준수한 성능을 뽑았으며, 해당 모델이 학습한 dataset을 활용해도 점수차는 0.09라는 점수차로 거의 준수한 성능을 내었다.</p>
<p data-ke-size="size16">기존 Llama 2 - 7b model도 ToxicChat이라는 데이터셋을 활용하면 좋은 성능이 나왔지만, Llama Guard는 ToxicChat을 20%만 활용하여서 Fine-tunning을 시도해도 basemodel이 100%를 학습했을 때의 성능이 나왔다.</p>
<p data-ke-size="size16">한계점으로는</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>기본 지식은 훈련 데이터에 의해 제한되었으며, 훈련 데이터를 넘어서는 지식과 관련될 때는 잘못된 판단을 내릴 수 있다.</li>
<li>대부분의 데이터들이 영어이기 때문에 다른 언어에서는 성능 비교를 못해봤다.</li>
<li>Fine-tuning 때문에 비윤리적이거나, 안전하지 않다고 간주될 수 있는 결과를 생성 가능하고 프롬프트 injection에 취약할 수 있다.</li>
</ol>
<h1>추후 연구 동향</h1>
<h3 data-ke-size="size23">Llama-Guard의 현재 연항</h3>
<p data-ke-size="size16">현재 github에는 Llama-guard를 출시 후, 버전이 3개가 더 나왔으며 Prompt-Guard도 나왔다.</p>
<p data-ke-size="size16">Llama Guard 3는 Llama 3.1 아키텍처를 기반으로 성능과 효율성의 균형을 맞추는데 주력한다. 1B 모델의 도입으로 경량화를 시도하였다.</p>
<p data-ke-size="size16">Llama Guard 3 Vision도 출시하였는데 이미지 내의 유해성을 판단하는 능력을 갖춘 모델이다. (깊게는 알아보지 못했다)</p>
<p data-ke-size="size16">2025, 4월에 공개된 Llama Guard 4는 12B 파라미터 규모로 Llama 4 Scout 아키텍처에서 파생되었다. MoE 구조를 안정성 분류라는 특수 목적에 맞춰 Dense 아키텍처로 Pruning을 시도하였다.</p>
<p data-ke-size="size16"> </p>
<h3 data-ke-size="size23">한국에서는 이런 연구가 없나?</h3>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>Samsung.IBM의 Granite-3.3-2B-Instruct 모델을 기반으로 한다.
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>한국어 안전성 밴치마크에서 Llama Guard 4나 Quen3Guard보다 F1 score 0.90을 기록하며 한국어 특화 guard를 입증하였다.</li>
<li>SGuard-v1: Safety Guardrail for Large Language Models</li>
</ol>
</li>
<li>카카오카카오 자체 LLM인 Kanana를 기반으로 하여 한국어의 언어적 특성에 최적화.
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li><a href="https://huggingface.co/collections/kakaocorp/kanana-safeguard">https://huggingface.co/collections/kakaocorp/kanana-safeguard</a></li>
<li>Kanana Safeguard.</li>
</ol>
</li>
</ol>
<h1>논문 파트별 요약</h1>
<h2 data-ke-size="size26">abstarct</h2>
<p data-ke-size="size16">Llama Guard는 LLM 기반 입력- 출력 보호 모델이다.</p>
<p data-ke-size="size16">언어 모델로서 다중 클래스 분류를 수행하고, 이진 결정 점수를 생성한다. 제로샷 또는 퓨샷 프롬프팅을 용이하게 하는 등 모델의 기능을 향상시켰다.</p>
<h2 data-ke-size="size26">1. Introduction.</h2>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>지난 몇 년간 AI 에이전트의 기능에 도약이 있었다.</li>
<li>생성형 AI 기반 제품이 모델 자체의 모든 입력과 출력을 완화하는 보호 장치를 권장했다.</li>
<li>원래 있던 기능들을 사용하려고 했으나, 입/출력 장치로 적용될 때 부족함이 있다.
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>문제점1 : 사용자가 제기하는 안전 위험과 AI 에이전트가 제기하는 안전 위험을 구별하는 도구 X
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>문제인 이유: 사용자가 학술적 호기심으로 물어보는 정보와 도움을 차단할 수 있다.</li>
<li>사용자의 프롬프트와, 에이전트의 대답을 구별하지 못 하는 것이 문제이다.</li>
</ul>
</li>
<li>문제점 2: 각 도구는 고정된 taxonomies만 시행하므로,새로운 정책에 맞게 조정이 불가능함.</li>
<li>문제점 3: 각 도구는 API 접근만 제공한다. 파인튜닝을 통해 특정 사례에 맞게 설정하는 것은 불가능.</li>
<li>기존 도구는 작은 크기의 기존 트랜스포머 모델을 사용한다.</li>
</ol>
</li>
<li>본 연구의 기여
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>에이전트와의 상호 작용과 관련된 안전 위험 분류 체계 소개</li>
<li>Llama Guard를 소개한다.모델 입력을 사전에 정의할 수 있다.</li>
<li>적용 가능한 분류 체계를 입력으로 포함, 분류를 위해 지시 작업을 사용한다.</li>
<li>인간 프롬프트와 AI 모델을 분류하기 위해 분리시킨다.</li>
<li>모델 가중치를 공개적으로 릴리스하여 유로 API에 의존하지 않고 모델을 자유롭게 사용하고, 또한 Llma Guard를추가적으로 실험, 파인튜닝</li>
</ol>
</li>
</ol>
<h2 data-ke-size="size26">2. Safety Risk Taxonomy</h2>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>A taxonomy of risks that are of interest : 관심 대상이 되는 위험에 대한 분류 체계</li>
<li>Risk Guidelines : 분류 체계의 각 위험 범주에 대해 장려되는 출력 &amp; 금지되는 출력 사이의 경계선을 결정해주는 지침.</li>
</ol>
<p data-ke-size="size16">위 2가지의 조건을 만족하는 classifiers에 의존한다.</p>
<h3 data-ke-size="size23">2-1. 안전 위험분류 체계.</h3>
<p data-ke-size="size16">고려되는 위험 범주를 기반으로 샘플 분류 체계를 만들었다.</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>폭력 및 혐오</li>
<li>성적 컨텐츠</li>
<li>총기 및 불법 무기</li>
<li>규제 또는 통제 물질</li>
<li>자살 및 자해</li>
<li>범죄 계획</li>
</ol>
<h2 data-ke-size="size26">3. Llama Guard 구축</h2>
<h3 data-ke-size="size23">3-1. Instruction-following Tasks</h3>
<p data-ke-size="size16">Instruction following을 활용한 zero-shot perfomer. 사용자 지시문 뒤에 목표 응답이 이어지는 시퀸스에 대해 언어 모델링 목적함수를 적용. 입-출력 세이프가딩 과제를 위해 4가지 핵심 구성 요소 식별</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>A set of Guideline (문제점 2, 3에 대한 해결책)→ 파인튜닝 없이도 새로운 정책을 적용한 제로샷, 퓨샷 Llama Guard 프롬프트에서도 성공.</li>
<li>safe/unsafe에 대한 지침 세트를 입력으로 받는다. 이 세트로 파인튜닝을 시도.</li>
<li>The Type of Classification. (문제점 1에 대한 해결책)</li>
<li>사용자 메시지와 에이전트 메시지를 분류해야하는지 여부를 나타냄.</li>
<li>The conversation.</li>
<li>사용자와 에이전트가 차례로 참여하는 대화를 포함.</li>
<li>The output format이진 분류와 다중 레이블 분류를 모두 지원하며, 분류기의 점수는 첫 번째 토큰의 확률값으로부터 확인할 수 있다.</li>
<li>safe와 Unsafe를 출력. 만약 Unsafe면 위반된 분류 체계의 범주들이 나열.</li>
</ol>
<h3 data-ke-size="size23">3-2. Zero-shot and few-shot promting</h3>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>Zeor-shot 프롬프팅은 추론 시 대상 도메인의 카테고리 이름 + 카테고리 설명을 프롬프트에 사용하는 것을 포함한다.</li>
<li>Few-shot 프롬프팅은 Zero-shot과 유사하지만 추가로 프롬프트애 각 카테고리에 대한 2~4개의 예제를 포함한다. 이러한 예제는 학습하지 않고 시도되어 진다.</li>
</ol>
<h3 data-ke-size="size23">3.3. Data Collection. (데이터 만들기)</h3>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>무해성에 대한 인간 선호도 데이터셋 활용</li>
<li>Anthropic(Ganguli et al., 2022)에서 공개한 무해성에 대한 인간 선호도 데이터셋을 활용하였다.</li>
<li>단일 턴 프롬프트 추출</li>
<li>해당 데이터셋에서 각 샘플의 첫 번째 인간 프롬프트만을 선택하고 이에 대응되는 어시스턴트의 응답과 이후 모든 대화 턴을 제거하여 초기 단일 턴 프롬프트 데이터셋을 구성하였다.</li>
<li>응답 생성</li>
<li>내부 Llama 체크포인트 중 하나를 사용하여 추출된 각 프롬프트에 대해 요청을 수행하는 협력적 응답과 정책에 따라 요청을 거부하는 거부응답이 혼합된 결과를 생성하였다.</li>
<li>전문 레드팀을 통한 주석
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>Prompt-category</li>
<li>Response-category</li>
<li>Prompt-label (safe 또는 unsafe)</li>
<li>Response-label (safe 또는 unsafe)</li>
<li>주석 과정에서 입력 또는 출력 형식이 부적절한 예제는 제거하는 데이터 정제 과정을 함께 수행하였다.</li>
</ul>
</li>
<li>생성된 프롬프트–응답 쌍에 대해 2장에서 정의한 분류 체계를 기준으로 내부 전문 레드팀이 주석을 수행하였다. 각 샘플은 다음 네 가지 레이블로 주석되었다.</li>
<li>학습 및 평가용 데이터 분할</li>
<li>최종 데이터셋을 무작위로 분할하여, 전체 데이터의 75%를 파인튜닝용으로, 나머지 25%를 평가용으로 사용하였다.</li>
</ol>
<h3 data-ke-size="size23">3.4 Model &amp; Training Details.</h3>
<p data-ke-size="size16">모델 학습 방법</p>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>Llama2-7b 모델 활용. 배포 비용을 낮춘 가장 작은 모델</li>
<li>8개의 A100 80GB GPU, 배치 크기 2, 시퀸스 길이 4096,</li>
<li>model parallelism of 1, 학습률 2 * 10^(-6)을 활용.</li>
<li>500스텝 동안 학습, 학습 데이터셋에 대한 1 epoch에 해당한다.</li>
</ul>
<p data-ke-size="size16">데이터 증강 방법으로는 지정한 카테고리 안에서만 안정성 평가를 진행해야기 때문에, 2가지 증강 기법을 사용한다.</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>위반되지 않은 무작위 카테고리에 대해서 랜덤하게 drop한다.</li>
<li>위반된 모든 카테고리를 삭제하고, 모두 safe로 변경한다.</li>
</ol>
<h2 data-ke-size="size26">4. Experiments</h2>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>표준화된 정책이 없어서 서로 다른 모델이 각자의 정책을 학습한 문제점이 있다.</li>
<li>데이터셋 자체도 모델이 정의한 정책에 맞는 데이터셋으로 학습했기 때문에 모델 비교에도 어려움이 있다.</li>
</ul>
<p data-ke-size="size16">위의 2가지 문제점을 보완하기 위해 2가지 방법으로 평가한다.</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>자체 데이터셋에서의 In-domain performance을 절대 성능으로 측정.</li>
<li>제로샷, 퓨샷 프롬프팅을 활용해서 다른 taxonomies에 대한 적응성 측정.</li>
</ol>
<h3 data-ke-size="size23">4.1 Evaluation Methodology in On- and Off-policy Settings.</h3>
<aside>
<p data-ke-size="size16">On policy: 같은 정책(내부 테스트셋)</p>
<p data-ke-size="size16">Off policy: 외부 데이터셋과 같은 다른 정책</p>
</aside>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>서로 다른 정책을 가진 여러 데이터셋을 가진 다양한 방법을 평가 하는 데 관심이 있으므로, 각기 다른 설정에서 평가할 방법을 찾아야 한다.</li>
</ul>
<p data-ke-size="size16">먼저 markov et al. (2023)은 가능한 분류 체계를 정렬하려고 시도 하였지만 부분적인 정렬만 가능했다.</p>
<p data-ke-size="size16">범주에 대한 매핑 실패 &amp; 불분명한 매핑으로 주관성을 유발할 수 있으며 완벽하게 정렬해도 기준이 다를 수 있다.</p>
<p data-ke-size="size16">그래서 본 논문에서는 3가지의 기법을 활용한다.</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>Overall binary classification for APIs that provide per-category output.$$<br/>\hat{y}<i>i = \max</i>{c \in {c_1, c_2, \ldots, c_n&#125;&#125; \left(\hat{y}_{c,i}\right),<br/>$$
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>Ŷᵢ 는 i번째예시에 대한 예측 점수</li>
<li>C1, c2.. 는 클래스</li>
<li>ŷ_{c,i}는 i번째 예시에 대한 C1, C2.. 에 대한 양성 카테고리의 예측 점수.ŷ_{c,i}는 카테고리별로 어떤 점수가 있고, 그 중에서 max값을 뽑아서 해당 카테고리를 알려주는 점수. 그래서 max를 사용한다</li>
<li>여기서 Ŷᵢ 는 카테고리에 상관없이 unsafe, safe에 대한 점수</li>
</ul>
</li>
<li>대부분의 API는 카테고리별 확률 점수를 생성한다. 그래서 본 논문은 classifier에서 나온 점수를 기반으로 이진 분류의 확률을 다음과 같이 계산한다.</li>
<li>Per-category binary classification via 1-vs-all→ 해당 이유는 모델 입력을 동적으로 변경하여 분류 작업을 맞춤 설정할 수 있어서
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>카테고리 $c_k$ 에 대해서 예측 작업 $t_k$를 실행한다.
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>작업 $t_k$에 대해 $c_k$만 양성으로 간주한다. 나머지는 다 음성으로 간주</li>
<li>작업 $t_k$에 대한 분류기는 프롬프트를 통해 샘플이 $c_k$를 위반하는 경우에만 안전하지 않다고 예측한다.</li>
<li>작업 $t_k$에 대한 이진 분류 점수는 $c_k$의 점수로 사용된다.</li>
</ol>
</li>
</ol>
</li>
<li>해당 방법은 다중 클래스 분류 설정에서 카테고리별 메트릭을 얻기 위한 접근 방식. on and off-policy settings에 대해서 이 접근 방식을 사용한다.</li>
<li>Per-category binary classification via 1-vs-benign.위 방법과 유사하지만 $c_j\ne k$ 에 대해서, 나머지를 다 음성 처리를 하는 것이 아닌 그냥 고려 대상에서 제외한다. 즉, benign가 라벨인 친구만 음성으로 두고 나머지 라벨은 다 버린다.</li>
<li>해당 방법은 어려운 음성 샘플들을 잠재적으로 제거할 수 있다. off-policy로 평가될 때 사용하는 모든 기준선 Api에 대해 이 접근 방식을 따른다.</li>
</ol>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>잘 이해를 하지 못해서 드는 예시.2번 방법긍정: 폭력(C1)인 샘플, 부정: 안전한 문장, C2, C3 .3번 방법그러면 이 문장은 폭력인가, 아니면 안전한 문장인가만 판단한다. 이러면 비교 대상을 안전한 것만으로 제한을 하는 것 이니까 다른 C2, C3의 간섭을 받지 않기 때문에 더 좋은 결과를 뽑을 수 있다고 논문에서 명시했던 것 이다.</li>
<li>긍정: 폭력(C1) / 부정: 안전한 문장 /. 제외: C2, C3</li>
<li>즉, C1만 맞다. 나머지 전부는 아니다. 라고 판단한다.</li>
<li>이 문장은 폭력인가, 아니면 폭력이 아닌가?.</li>
<li>C1, C2, C3가 각각 폭력, 혐오, 성적 콘텐츠일 때</li>
</ul>
<h3 data-ke-size="size23">4.2 Public Benchmarks.</h3>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>ToxicChatBased Label은 Zampieri et al. (2019)의 바람직하지 않은 콘텐츠에 대한 정의를 기반으로 한다.</li>
<li>10k개의 사용자-AI간의 샘플로 구성된 밴치마크이다</li>
<li>OpenAI Moderation Evaluation Dataset.</li>
<li>1680개의 프롬프트 예시를 포함한다. 라벨은 프롬프트가 위험한지 아닌지에 대한 이진 flag이다.</li>
</ol>
<h3 data-ke-size="size23">4.3 Baselines &amp; Evaluation Metrics.</h3>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>4.3.1 Probalilty Score-Based Baselines.
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>OpenAI Moderation API.</li>
<li>11가지의 콘텐츠 안전 범주를 위반하는지 여부를 평가하기 위해 미세 조정된 GPT 기반의 다중 레이블 분류기이다. 11가지의 범주에 대한 확률 점수, 범주별 이진 레이블, 전반적인 이진 레이블을 반환한다.</li>
<li>Perspective API머신러닝 모델을 사용하여 주어진 콘텐츠를 분석 &amp; 유해하다고 인식될 가능성을 나타내는 확률 점수를 공개한다.</li>
<li>온라인 플랫폼 및 유해하고 공격적인 콘텐츠를 제거하도록 설계.</li>
</ul>
</li>
<li>4.3.2 Other Baselines.
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>Azure AI Content Safety API</li>
<li>다중 레이블 분류기로 4가지 안전 범주 중 하나를 식별한다, 0~6점(6점이 가장 심각한 위반)</li>
<li>GPT-4</li>
<li>제로샷 프롬프팅을 활용해 검열을 시도할 수 있다.</li>
</ul>
</li>
<li>4.3.3 AUPRC를 평가 지표로 활용한다.</li>
</ul>
<h3 data-ke-size="size23">4.4 Overall Results.</h3>
<p data-ke-size="size16">다양한 벤치마크에서 Llama Guard와 확률 점수 기반 베이스라인 API간의 비교를 포함하여 나온 점수를 보여준다.</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>자체 테스트 세트에서의 높은 잠재력을 보여준다</li>
<li>별도의 훈련 없이 타사의 테스트셋에서도 준수한 성능을 보여준다.</li>
</ol>
<p data-ke-size="size16">프롬프트/대답에 대한 것. 데이터셋 내 각 카테고리별 성능 분석표.</p>
<h3 data-ke-size="size23">4.5 Studying the Adaptability of the Model</h3>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>4.5.1 Adaptability via Prompting.OpenAI 테스트 세트에 대한 설명. Few-Shot까지 했을 때 더 좋은 성능이 나오도록 유도하였다</li>
</ul>
<pre class="cpp" data-ke-language="cpp"><code>카테고리별 성능

1-vs-all 분류 방식에 더해 정책 불일치가 존재했기 댸문에, 이진 분류 때의 성능보다는 낮게 나온다. 

unsafe로 분류했을 때, 잘못된 category로 분류하면 패널티를 줬기 때문에 성능이 더 낮게 나옴.</code></pre>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>4.5.2 Adaptability via Fine-tuning.</li>
<li>정책에 더 빠르게 적응하는 것을 확인할 수 있다. Llama Guard는 20%만 사용하여도 100%를 다 학습한 Llama2-7b와 유사한 성능을 달성할 수 있다.</li>
<li>다른 데이터셋을 활용해서 Fine-tuning을 시도하면 성능이 더 잘 나오는지 확인하기 위해 10, 20 , 50, 100%를 사용해본다.</li>
</ul>
<h2 data-ke-size="size26">5. Related Work.</h2>
<h3 data-ke-size="size23">Zero-shopt and few-shot inference using LLMs.</h3>
<p data-ke-size="size16">새로운 정책에 맞게 조정하기 위해, 대상 데이터셋에서 보지 못한 범주에 대한 제로샷, 퓨샷을 수행한다.</p>
<p data-ke-size="size16">새로운 정책에 적응하기 위해서이다.</p>
<hr data-ke-style="style1">
<h3 data-ke-size="size23">Moderation of human-generated content.</h3>
<p data-ke-size="size16">대규모 네트워크의 content moderation 분야와 관련이 있다. 하지만 인간이 생성한 content와 LLM 생성 contenct는 차이점이 존재한다.</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>텍스트의 스타일과 길이가 다르다</li>
<li>인간의 잠재적 유해 유형은 일반적으로 혐오 발언에 국한된다. LLM은 더 넓은 범위의 잠재적 유해를 다룬다</li>
<li>LLM 생성 콘텐츠를 보호하는 것은 프롬프트와 응답 쌍을 다루는 것을 포함한다.</li>
</ol>
<hr data-ke-style="style1"/>
<h3 data-ke-size="size23">Guarding LLM-generated content.</h3>
<p data-ke-size="size16">LLM 기반 대화 시스템을 안전하게 만들기 위해서는 모델 응답을 확인해야 한다. 공격적인 콘텐츠에 부적적하게 응답을 할 수 있기 때문에, 이런 환경을 조사하고 시스템의 출시 결정을 내리기 위한 프레임워크를 제안한다. Dinan et al.(2021)</p>
<hr data-ke-style="style1"/>
<h3 data-ke-size="size23">Toxichat.</h3>
<p data-ke-size="size16">GPT4, Vicuna의 생성물을 기반으로 LLM 생성 출력을 다루지는 않지만, 모두 사용자 프롬프트의 분류를 다룬다.</p>
<hr data-ke-style="style1"/>
<h1>6. Limitations &amp; Broader Impacts.</h1>
<h2 data-ke-size="size26">한계점</h2>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>상식 지식은 훈련 데이터에 의해 제한된다. 훈련 데이터를 넘어서는 지식과 관련될 때 잘못된 판단을 내릴 수 있다.</li>
<li>대부분의 데이터들이 영어이기 때문에 다른 언어에 사용될 때 적절한 성능인지는 모르겠다.</li>
<li>Fine-tuning 때문에 비윤리적이거나 안전하지 않다고 간주될 수 있는 언어를 생성할 수 있다. 프롬프트 주입 공격에 취약할 수 있다.</li>
</ol>
<h1>7. Conclusion.</h1>
<p data-ke-size="size16">LLM 기반 입-출력 보호 모델인 Llama Guard는 전통적인 다중 작업 설정에 대한 추가 오버헤드 없이 프롬프트 및 응답 분류 작업에 대해 별도로 훈련될 수 있다.</p>
<p data-ke-size="size16">기존 공개 데이터셋에서도 강력한 성능을 보여주었으며, 추가 미세조정을 통해 자체 정책을 가진 새로운 데이터셋에서도 적용될 수 있다.</p>
<hr data-ke-style="style1"/>
<h1>background 지식</h1>
<h2 data-ke-size="size26">Few-shot Prompting.</h2>
<aside>
<p data-ke-size="size16">"whatpu"는 탄자니아에 서식하는 작은 털복숭이 동물입니다. whatpu를 사용하는 문장의 예<br/>라는 단어를 사용하는 문장의 예입니다:<br/>우리는 아프리카를 여행하고 있었는데 아주 귀여운 whatpu를 보았습니다.<br/>"farduddle"을 한다는 것은 정말 빠르게 위아래로 점프한다는 뜻입니다. farduddle을 사용하는 문장의 예를 사용하는 문장의 예입니다:</p>
</aside>
<p data-ke-size="size16">위와 같이, 프롬프트 자체에 예시를 들어주는 것을 Few-shot Promtp라고 한다.</p>
<h2 data-ke-size="size26">Zero-shot Prompting.</h2>
<p data-ke-size="size16">위와 달리 직접적인 예시와 시연이 프롬프트에 명시를 안해준다.</p>
<p data-ke-size="size16">그러면 어떻게 하냐?, 예시 없이 규칙과 지시만을 제공한다. 위 논문에서 활용한 Zero-Shot Prompting은 추론 시점에 Taxonomy에 대한 카테고리를 넣어줌으로써 직접적인 예시보다는, 카테고리를 활용하였다.</p>
<h2 data-ke-size="size26">AUPRC</h2>
<p data-ke-size="size16">이진 분류 모델의 성능을 평가하는 지표이다.</p>
<p data-ke-size="size16">Precision-Recall Cureve의 면적을 의미한다.</p>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>Precision-Recall BCureve는 모델의 threshold를 변경하면서 Precision과 Recall의 변화를 그래프로 나타내는 것 이다.</li>
</ul>
<p data-ke-size="size16">모델이 Positive 클래스를 잘 예측하면서도 Negative 클래스를 잘 구분하는 경우에 높은 값을 가진다. Positive 클래스에 집중되어 있는 데이터셋에서 더 민감한 지표로 작용한다.</p>
<h2 data-ke-size="size26">Fine-Tuning.</h2>
<p data-ke-size="size16">이미 훈련되어 있는 LLM에 특정 데이터셋을 추가로 학습시켜, 모델을 특정 잡업이나 도메인에 알맞게 미세 조정하는 과정을 말한다.</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>전체 파인튜닝보통 모델의 높은 적응성이 필요할 때 사용한다.</li>
<li>모든 매개변수를 업데이트하여 모델 전체를 새로운 데이터를 맞춰 재학습하는 방식.</li>
<li>효율적인 파라미터 파인튜닝</li>
<li>PEFT는 일부만 조정하는 최신 방식이다. 데이터셋와 모델 사이의 특정 유사성이 있을 때 적합하다. LoRA는 대표적인 PEFT기법이다.</li>
</ol></hr>
