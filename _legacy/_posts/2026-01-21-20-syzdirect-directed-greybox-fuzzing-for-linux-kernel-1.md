---
layout: post
title: "SyzDirect: Directed Greybox Fuzzing for Linux Kernel(1)"
date: 2026-01-21 01:40:00
desc: "SyzDirect: Directed Greybox Fuzzing for Linux Kernel(1)"
keywords: "SyzDirect: Directed Greybox Fuzzing for Linux Kernel(1),Paper-Conference,퍼징"
categories: [Paper-Conference]
tags: ["퍼징"]
icon: fa-book
---

> Source: [https://sanghole.tistory.com/20](https://sanghole.tistory.com/20)

<p data-ke-size="size16">퍼징 관련 프로젝트를 위해서 SyzDirect 읽어보기. 일단 INTRODUCTION~BACKGROUND AND MOTIVATION까지만...</p>
<p data-ke-size="size16"> </p>
<h3 data-ke-size="size23" data-path-to-node="3">1. DGF(Directed Greybox Fuzzing)??</h3>
<p data-ke-size="size16" data-path-to-node="4"><span data-path-to-node="4,0">일단 Introduction에서 Abstract부터 Background까지 이야기하는 흐름은 거의 동일하다. </span><span data-path-to-node="4,1"></span><span data-path-to-node="4,2"><span>DGF는 </span><span>aiming to stress-test a specific part of code</span><span>, 즉 코드의 특정 부분만 집중적으로 패는 것을 목표로 한다</span></span><span data-path-to-node="4,3"><span></span></span><span data-path-to-node="4,4">. </span><span data-path-to-node="4,5"></span><span data-path-to-node="4,6"><span>보통 Entry point부터 Target point까지의 거리를 측정해서, 타겟에 더 가까운 입력을 우선적으로 변이시키는 방식이다</span></span><span data-path-to-node="4,7"><span></span></span><span data-path-to-node="4,8">.</span></p>
<p data-ke-size="size16" data-path-to-node="4"><span data-path-to-node="5,0,0,0">   </span><span data-path-to-node="5,0,0,0"> DGF를 단순히 버그 재현용으로만 쓰는 게 아니다. </span><span data-path-to-node="5,0,0,1"></span><span data-path-to-node="5,0,0,2"><span>개발자가 패치를 내놨을 때 그게 진짜 고쳐진 건지, 아니면 고치다가 다른 데가 터진 건지확인하는 패치 테스팅에서도 엄청 중요하다고 한다</span></span><span data-path-to-node="5,0,0,3"><span></span></span><span data-path-to-node="5,0,0,4">.</span></p>
<h3 data-ke-size="size23" data-path-to-node="6">2. 근데 왜 리눅스 커널에서는 DGF가 안 먹혔나?</h3>
<p data-ke-size="size16" data-path-to-node="7"><span data-path-to-node="7,0">DGF가 좋은 건 알겠는데, 실제로 리눅스 커널에 써본건가?. 써보긴 했는데...</span></p>
<p data-ke-size="size16" data-path-to-node="7"><span data-path-to-node="7,4"> </span><span data-path-to-node="7,5"></span><span data-path-to-node="7,6"><span>원래 사용자 애플리케이션에서는 잘 됐는데, 커널에 도입하기에는 </span><span>Entry Point 식별</span><span>이랑 </span><span>Argument 준비</span><span>가 힘들어서, 적용하기가 힘들다는 것..</span></span><span data-path-to-node="7,6"><span></span></span></p>
<ul data-ke-list-type="disc" data-path-to-node="8" style="list-style-type: disc;">
<li><span data-path-to-node="8,0,0,0">Entry Point가 너무 복잡함 : 단순히 시스템 콜이 많다는 수준이 아니다. </span><span data-path-to-node="8,0,0,1"></span><span data-path-to-node="8,0,0,2"><span>리눅스 원시 시스콜은 330개 정도지만, Syzkaller가 정의한 Syscall Variant까지 따지면 </span><span>4,200개</span><span>나 된다</span></span><span data-path-to-node="8,0,0,3"><span></span></span><span data-path-to-node="8,0,0,4">. </span><span data-path-to-node="8,0,0,5"></span><span data-path-to-node="8,0,0,6"><span>예를 들어 </span><span>sendmsg</span><span> 하나만 해도 프로토콜에 따라 수백 개의 변형이 있는다.</span></span></li>
<li><span data-path-to-node="8,1,0,0">기존 툴(Beacon 등)의 한계: </span><span data-path-to-node="8,1,0,1"></span><span data-path-to-node="8,1,0,2"><span>Beacon 같은 기존 정적 분석 툴은 커널에서는 효율, 성능을 내지 못한다</span></span><span data-path-to-node="8,1,0,4">. </span><span data-path-to-node="8,1,0,5"></span><span data-path-to-node="8,1,0,6"><span>커널 코드는 호출 경로가 너무 깊고, 간접 호출도 많고, 포인터도 계속 타고 들어가야 해서, 조건 분석이 거의 불가능하기 때문이다</span></span><span data-path-to-node="8,1,0,7"><span></span></span><span data-path-to-node="8,1,0,8">.</span></li>
</ul>
<h3 data-ke-size="size23" data-path-to-node="9">3. 그래서 SyzDirect는 이걸 어떻게 해결했나? </h3>
<p data-ke-size="size16" data-path-to-node="10">SyzDirect는 이 문제를 해결하기 위해 커널의 특성을 이용한 새로운 접근법을 들고 나왔다.</p>
<ul data-ke-list-type="disc" data-path-to-node="11" style="list-style-type: disc;">
<li><span data-path-to-node="11,0,0,0">자원 모델링 : </span><span data-path-to-node="11,0,0,1"></span><span data-path-to-node="11,0,0,2"><span>이게 핵심인데, 리눅스 커널이 결국 자원 관리자라는 점을 이용한다</span></span><span data-path-to-node="11,0,0,3"><span></span></span><span data-path-to-node="11,0,0,4">. </span><span data-path-to-node="11,0,0,5"></span><span data-path-to-node="11,0,0,6"><span>커널 함수랑 Syscall 함수를 억지로 매칭하는 게 아니라, 얘네가 어떤 자원을 건드리는지를 모델링해서 그 자원을 매개로 둘을 연결해 버린다</span></span><span data-path-to-node="11,0,0,7"><span></span></span><span data-path-to-node="11,0,0,8">. </span><span data-path-to-node="11,0,0,9"></span><span data-path-to-node="11,0,0,10"><span>이렇게 하면 정확한 Syscall Variant를 찾을 수 있다</span></span><span data-path-to-node="11,0,0,11"><span></span></span><span data-path-to-node="11,0,0,12">.</span></li>
<li><span data-path-to-node="11,1,0,0">템플릿 가이던스: 정적 분석으로 끝나는 게 아니고 </span><span data-path-to-node="11,1,0,1"></span><span data-path-to-node="11,1,0,2"><span>분석 결과를 템플릿로 묶어서 퍼저한테 던져준다</span></span><span data-path-to-node="11,1,0,3"><span></span></span><span data-path-to-node="11,1,0,4">. </span><span data-path-to-node="11,1,0,5"></span><span data-path-to-node="11,1,0,6"><span>그럼 퍼저는 이 템플릿을 따라서 퍼징을 수행하도록 설정!</span></span></li>
<li><span data-path-to-node="11,2,0,0">경량화된 인자 조건 식별: </span><span data-path-to-node="11,2,0,1"></span><span data-path-to-node="11,2,0,2"><span>복잡한 분석 대신 Syzlang에 있는 정보를 활용해서 타겟 도달에 필요한 인자 조건을 가볍게 식별해낸다</span></span><span data-path-to-node="11,2,0,3"><span></span></span><span data-path-to-node="11,2,0,4">.</span></li>
</ul>
<p data-ke-size="size16" data-path-to-node="12"> </p>
<p data-ke-size="size16" data-path-to-node="12">일단 오늘은 여기까지.</p>
