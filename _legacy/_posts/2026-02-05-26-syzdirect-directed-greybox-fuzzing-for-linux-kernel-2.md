---
layout: post
title: "SyzDirect: Directed Greybox Fuzzing for Linux Kernel(2)"
date: 2026-02-05 15:58:00
desc: "SyzDirect: Directed Greybox Fuzzing for Linux Kernel(2)"
keywords: "SyzDirect: Directed Greybox Fuzzing for Linux Kernel(2),Paper-Conference,퍼징"
categories: [Paper-Conference]
tags: ["퍼징"]
icon: fa-book
---

> Source: [https://sanghole.tistory.com/26](https://sanghole.tistory.com/26)

<p data-ke-size="size16">이 논문은 진짜 이해가 잘 안가서 시간이 오래 걸렸다. 어짜피 결과에 대한 것들은 이렇게 연구해서~ 이렇게 나왔어요~ 보여주는 것 뿐이니까 해당 알고리즘에 대해서 노션에 정리한 것들을 올릴 예정. </p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">노션에 정리한 글 중간 중간 약간의 나쁜 말들이 있어서 그것만 지우고 올렸다.. 다시 읽어보는데 정리는 잘 한 것 같다. 이제 해당 SyzDriect으로 실제 작동을 해보면서 얻어나갈 예정..</p>
<p data-ke-size="size16"> </p>
<h2 data-ke-size="size26">진입점 식별.</h2>
<p data-ke-size="size16">일단 퍼징을 하기 위해서는 진입점을 식별하는 것이 중요하다.</p>
<p data-ke-size="size16">왜냐??. 처음 진입점 자체를 잘 못 잡으면 퍼징을 아무리 돌려도 의미가 없으니까!!</p>
<p data-ke-size="size16">그래서 일단 본 논문에서는 Linux를 두 가지 특성을 내놓음.</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>Syscall variant는 Syzlang 언어로 특정 리소스에 대한 특정 작업을 설명한다. 이는 기존에 있는 syscall 보다 더 많은 정보를 가지고 있다.</li>
<li>Syscall 진입점에 들어간 후에는 다음 실행되어야할 함수를 결정하기 위해 디스패치를 진행한다.→ 4번만 3~4번 읽어보니까 Syscall variant라는 말이 계속해서 나오며, “resource”와 “ “operation”이 계속 해서 나올 것이니까 잘 이해하고 넘어가야한다.</li>
<li>→ 여기서 디스패치란?. 어떤 리소스가 처리되고, 어떤 작업이 수행되어야 하는지를 결정하기 위해 시스템 콜 인수를 파싱하는 것.</li>
</ol>
<p data-ke-size="size16"><b>그래서 이 특징 가지고 뭐함?</b></p>
<p data-ke-size="size16">저기 나오는 resource와 operation을 이용해서 통일된 방식으로 모델링을 진행할 거야.</p>
<p data-ke-size="size16"><b>모델링을 해서 뭐함?</b></p>
<p data-ke-size="size16">모델링을 진행하면 시스템 콜 변형과 커널 함수를 매칭할 수 있어.</p>
<p data-ke-size="size16">지금 나오는 저 흐름을 제대로 기억해야 4번을 따라갈 수 있다.ㅠ</p>
<h3 data-ke-size="size23">앵커 함수.</h3>
<p data-ke-size="size16">갑자기 무슨 앵커 함수가 나오냐?. 위에 나오는 dispatch 부분때문에 나오는 것이다. 모델링을 할 때, 모든 함수를 직관적으로 모델링을 하기에는 시간이 많이든다..</p>
<p data-ke-size="size16">→ 그래서 디스패치 프로세스를 분석하여 후속 코드에서 어떤 리소스가 조작되고, 어떤 연산을 수행하는지 이해한다.</p>
<p data-ke-size="size16">→ 디스패치 후, 처음 실행되는 함수를 앵커 함수라고 한다.</p>
<h3 data-ke-size="size23">연산 모델링.</h3>
<p data-ke-size="size16">Syscall 이름과 command parameter를 이용해서 커널 함수와 Syzlang veriant가 각각 리소스를 어떻게 처리하는지 모델링한다.</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>시스템 콜 변형 분석을 위해 Syzlang 설명에서 직접 syscall name을 extract.</li>
<li>그 후 parameters를 parse, 그 안에 numeric constants를 명령 값으로 사용한다.</li>
<li>→ 커널 함수 분석을 위해 Control flow and data flow를 활용하여 명령값 추출.</li>
<li>syscall 이름을 활용하여 forward analysis를 통해 CFG에서 모든 switch 문을 찾는다.</li>
<li>data flow analysis를 통해 switch문의 변수가 syscall 매개변수와 관련이 있는지 확인.</li>
<li>만약 switch가 분기→ case내의 함수를 앵커 함수로 사용하며, 해당 case의 상수 값을 명령 값으로 사용한다.</li>
</ol>
<h3 data-ke-size="size23">예시</h3>
<p><figure class="imageblock alignCenter" data-ke-mobilestyle="widthOrigin" data-origin-height="76" data-origin-width="463"><span data-phocus="https://blog.kakaocdn.net/dna/cY9n4v/dJMcahpLFUz/AAAAAAAAAAAAAAAAAAAAAJbiVZ-Fgx47MowPkziAdzZfJbzT75-kWcHyiJsDNk5S/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=RQb4CWosdm%2BrBg0A%2Bk%2Fnzh9uSyU%3D" data-url="https://blog.kakaocdn.net/dna/cY9n4v/dJMcahpLFUz/AAAAAAAAAAAAAAAAAAAAAJbiVZ-Fgx47MowPkziAdzZfJbzT75-kWcHyiJsDNk5S/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=RQb4CWosdm%2BrBg0A%2Bk%2Fnzh9uSyU%3D"><img data-origin-height="76" data-origin-width="463" height="76" loading="lazy" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" src="https://blog.kakaocdn.net/dna/cY9n4v/dJMcahpLFUz/AAAAAAAAAAAAAAAAAAAAAJbiVZ-Fgx47MowPkziAdzZfJbzT75-kWcHyiJsDNk5S/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=RQb4CWosdm%2BrBg0A%2Bk%2Fnzh9uSyU%3D" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&amp;fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FcY9n4v%2FdJMcahpLFUz%2FAAAAAAAAAAAAAAAAAAAAAJbiVZ-Fgx47MowPkziAdzZfJbzT75-kWcHyiJsDNk5S%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1777561199%26allow_ip%3D%26allow_referer%3D%26signature%3DRQb4CWosdm%252BrBg0A%252Bk%252Fnzh9uSyU%253D" width="463"/></span></figure>
</p>
<p data-ke-size="size16"> </p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>Syzlang에 있는 syscall name을 직접 extract하여 keyctl$update를 가져온다.</li>
<li>여기에 있는 code const[KEYCTL_UPDATE]를 파싱하여 KEYCTL_UPDATE라는 numeric constants를 명령 값으로 사용한다.</li>
<li>→&gt;&gt; 이제 모델링을 진행할 때는, keyctl,KEYCTL_UPDATE로 진행하여</li>
</ol>
<p><figure class="imageblock alignCenter" data-ke-mobilestyle="widthOrigin" data-origin-height="219" data-origin-width="475"><span data-phocus="https://blog.kakaocdn.net/dna/clrGOC/dJMcadnj1Ul/AAAAAAAAAAAAAAAAAAAAAP4G69CztttBKhH45bGMoGKwJ-pTyp-cJBmuD2TN3Zzx/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=eAqZcxB8XsZTERSl92Nb0KIANjc%3D" data-url="https://blog.kakaocdn.net/dna/clrGOC/dJMcadnj1Ul/AAAAAAAAAAAAAAAAAAAAAP4G69CztttBKhH45bGMoGKwJ-pTyp-cJBmuD2TN3Zzx/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=eAqZcxB8XsZTERSl92Nb0KIANjc%3D"><img data-origin-height="219" data-origin-width="475" height="219" loading="lazy" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" src="https://blog.kakaocdn.net/dna/clrGOC/dJMcadnj1Ul/AAAAAAAAAAAAAAAAAAAAAP4G69CztttBKhH45bGMoGKwJ-pTyp-cJBmuD2TN3Zzx/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=eAqZcxB8XsZTERSl92Nb0KIANjc%3D" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&amp;fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FclrGOC%2FdJMcadnj1Ul%2FAAAAAAAAAAAAAAAAAAAAAP4G69CztttBKhH45bGMoGKwJ-pTyp-cJBmuD2TN3Zzx%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1777561199%26allow_ip%3D%26allow_referer%3D%26signature%3DeAqZcxB8XsZTERSl92Nb0KIANjc%253D" width="475"/></span></figure>
</p>
<p data-ke-size="size16">KEYCTL_UPDATE를 stich 분기분으로 활용하는 것을 찾는다..</p>
<p data-ke-size="size16">→ 분기되는 처음 함수를 앵커 함수로 활용한다고 했으니까, 6번 줄 에서 분기가 되는 것을 확인하였고 처음에 있는 함수가 keyctl_update_key니까,</p>
<p data-ke-size="size16">keyctl_update_key를 [keyctl, KEYCTL_UPDATE]로 분기한다!!</p>
<h3 data-ke-size="size23">리소스 모델링</h3>
<p data-ke-size="size16">근데 리소스 모델링은 동일한 리소스가 커널 코드와, Syzlang 설명 간에 다르게 명명되고 정의될 수 있다.</p>
<p data-ke-size="size16">그래서 리소스 이름으로 모델링할 수 없다</p>
<p data-ke-size="size16">→ 본 논문은…. 리소스 생성 시 불변량을 사용하여 모델링할 것을 제안함!!!!</p>
<p data-ke-size="size16">장치 및, 파일 시스템 리소스를 생성하려면 그 전에, 파일 시스템/ 장치 결로를 나타내는 상수 문자열이 필요하다!!!..</p>
<p data-ke-size="size16">→ 리소스 유형을 지정하기 위해서는 리소스 생성과 관련된 문자열 또는 상수가 필요하다..</p>
<p data-ke-size="size16">→ EX) fd 0, 1, 2를 지정해서 하는 것 처럼.</p>
<h3 data-ke-size="size23">IF) Syscall 변경일 경우 ← 이거 자체가 Syzlang을 기반으로..</h3>
<p data-ke-size="size16">매개변수를 파싱하여 해당 리소스를 얻을 수 있다.</p>
<p data-ke-size="size16"> </p>
<p><figure class="imageblock alignCenter" data-ke-mobilestyle="widthOrigin" data-origin-height="162" data-origin-width="474"><span data-phocus="https://blog.kakaocdn.net/dna/wDoLz/dJMcaferwPE/AAAAAAAAAAAAAAAAAAAAAI3fO62iYxJh30KiNUy7MRdOMIZEGO5u4VRHed3aQfRo/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=IreLkxW%2Fh7eEDqsjmN1fmcsmaNY%3D" data-url="https://blog.kakaocdn.net/dna/wDoLz/dJMcaferwPE/AAAAAAAAAAAAAAAAAAAAAI3fO62iYxJh30KiNUy7MRdOMIZEGO5u4VRHed3aQfRo/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=IreLkxW%2Fh7eEDqsjmN1fmcsmaNY%3D"><img data-origin-height="162" data-origin-width="474" height="162" loading="lazy" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" src="https://blog.kakaocdn.net/dna/wDoLz/dJMcaferwPE/AAAAAAAAAAAAAAAAAAAAAI3fO62iYxJh30KiNUy7MRdOMIZEGO5u4VRHed3aQfRo/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=IreLkxW%2Fh7eEDqsjmN1fmcsmaNY%3D" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&amp;fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FwDoLz%2FdJMcaferwPE%2FAAAAAAAAAAAAAAAAAAAAAI3fO62iYxJh30KiNUy7MRdOMIZEGO5u4VRHed3aQfRo%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1777561199%26allow_ip%3D%26allow_referer%3D%26signature%3DIreLkxW%252Fh7eEDqsjmN1fmcsmaNY%253D" width="474"/></span></figure>
</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">Syzlang 설명에서 sendmsg$rds는 2행에서 sock_rds라는 리소스를 입력으로 받는다.</p>
<p data-ke-size="size16">sock_rds는 1행에서 여러 상수를 입력으로 받으므로.. sock_rds를 상수 목록 [AF_RDS, SOCK_SEQPACKEY]으로 모델링한다.</p>
<h3 data-ke-size="size23">IF) Kernel Function 경우</h3>
<p data-ke-size="size16">간접 호출의 대상을 분석하여 필요한 리소스를 결정한다.</p>
<p data-ke-size="size16">또!! 뭘 관찰함. 그게 뭐냐~ → 다른 유형의 리소스가. 고유한 가상 테이블과 유사한 데이터 구조에 할당되는 것을 관찰했다?..</p>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li><b>TCP 소켓</b>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>tcp_prot_ops 같은 ops 테이블이 붙음</li>
<li>내부 엔트리들이 tcp_* 계열 함수로 구성 (예: connect/sendmsg/recvmsg 등)</li>
</ul>
</li>
<li><b>UNIX 도메인 소켓</b>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>unix_stream_ops / unix_dgram_ops 같은 ops 테이블이 붙음</li>
<li>내부 엔트리들이 unix_* 계열 함수로 구성</li>
</ul>
</li>
<li><b>RDS 소켓</b>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>rds_proto_ops 같은 ops 테이블이 붙음</li>
<li>내부 엔트리들이 rds_* 계열 함수로 구성</li>
</ul>
</li>
</ul>
<p data-ke-size="size16">→ 커널은 자원 종류마다 서로 다른 ops(=vtable 비슷한 함수 포인터 테이블)를 붙여서, 같은 ‘소켓/파일’이라도 타입에 따라 호출되는 구현이 달라지게 만든다. 라고 하네요!!</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">그리고 또, 이제.. syscall entry.. 즉 진입점을 들어가고 나서부터는 커널은 간접 호출을 통해 함수 디스패치를 수행한다. 이 때! !!! 간접 호출은 리소스에 해당하는 가상 데이블을 querires해버림.</p>
<p data-ke-size="size16">쿼리? 그게 뭐냐!!! 그냥 flow를 보면</p>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>간접 호출이 발생한다</li>
<li>그 간접 호출은 해당 자원에 연결된 vtable/ops 테이블을 <b>참조해서</b></li>
<li>그 안에서 맞는 함수 포인터를 <b>찾아</b></li>
<li>그 함수로 점프(호출)하므로</li>
<li>제어 흐름이 그 기능을 수행하는 코드로 이동한다</li>
</ul>
<p data-ke-size="size16">이렇게… 약간 참조!! 느낌. 그래서, 그 가상 테이블로 점프해서 거기에 있는 함수를 모두 앵커 함수라고 하는데..</p>
<p data-ke-size="size16">but!! 리소스의 가상 테이블과 리소스 생성 시의 불변량 사이에는 간극이 존재한다 ..ㅠ</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">→ 자원 타입을 식별하는 단서로 ops/vtable을 쓰고 싶지만, <b>그 ops가 어떤 생성 상수(invariants)에서 비롯됐는지 직접 연결이 안 되어 있어서</b>, 그 연결고리를 추가 분석으로 메워야 한다.</p>
<p data-ke-size="size16">그래서 또 관찰 하고.. 분석해버림ㅠ</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>모듈 로딩 또는 커널 초기화 중에서 커널은.. 일반적인 등록 함수를 호출하는데, 이 등록 함수는 상수 정보 및 리소스 생성 함수와 같은 핵심 정보를 인수로 받는다.<br/>with GPT로 예시 들기.<br/><br/>(비유: “(AF_RDS, SOCK_SEQPACKET) 조합이면 rds_create로 만들어라” 같은 규칙을 미리 등록)<br/><span style="color: #333333; text-align: start;">모듈 로딩/부팅 초기화 때 커널이<span> </span></span><b>공용 등록 함수(registration function)</b><span style="color: #333333; text-align: start;"><span> </span>를 호출해서,</span><br/>
<ul data-ke-list-type="disc" style="list-style-type: disc;">
<li>“이 자원 타입은 이런 <b>상수 정보</b>(예: family/type/path 등)로 식별되고”</li>
<li>“실제로 만들 때는 이 <b>create 함수</b>를 써라”</li>
</ul>
를 커널 내부 테이블에 <b>등록</b>해 둡니다<br/><br/></li>
<li>리소스 생성 함수는!! 리소스 객체를 나타내는 커널 구조체에 다른 상수와 가상 테이블을 할당한다.<br/><br/>나중에 실제로 자원을 만들 상황이 오면(예: socket() 호출), 커널이 ❶에서 등록해 둔 규칙을 보고 <b>해당 create 함수를 호출</b>합니다,<br/>→ 내부 테이블에 등록해둔 것들을.</li>
<li>리소스 생성 함수는 리소스 객체를 나타내는 커널 구조체에 다른 상수와 가상 테이블을 할당한다.. <br/>     <br/>    with GPT로 예시 들기. <br/>     <br/>    create 함수 안에서는 “커널 구조체로 표현되는 자원 객체”를 세팅하면서 추가적인 상수들을 채우고 그 자원 타입에 맞는 ops/vtable을 구조체에 대입합니다. <br/>     <br/>    →결과적으로 이후에 obj→ops→sendmsg( . . . ) 같은 간접호출이 발생하면 이 단계에서 붙여둔 vtable을 따라 해당 기능 코드로 제어 흐름이 가게 된다.<br/><br/></li>
</ol>
<p data-ke-size="size16">그래서.. 이 3가지 단계를 확인했는데. 이 확인한 걸로 뭐함?</p>
<ol data-ke-list-type="decimal" style="list-style-type: decimal;">
<li>일반적으로 사용되는 등록 함수 목록을 수동으로 수집.</li>
<li>domain 지식을 활용하여 변수 이름을 기반으로 핵심 상수 값과 생성 함수를 추출.</li>
<li>등록 함수의 각 호출 사이트에 대해, 가상 테이블에 해당하는 리소스를 모델링하기 위해 추출된 모든 리소스 관련 상수를 사용.</li>
</ol>
<p data-ke-size="size16">→총 20개의 등록 함수와 소켓, 장치, 파일 시스템과 같은 일반 리소스와 관련된 핵심 변수를 수동으로 수집.</p>
<p data-ke-size="size16"> </p>
<p><figure class="imageblock alignCenter" data-ke-mobilestyle="widthOrigin" data-origin-height="388" data-origin-width="477"><span data-phocus="https://blog.kakaocdn.net/dna/CiA3d/dJMcab38u0D/AAAAAAAAAAAAAAAAAAAAAHbMhPg0ueWA0XTCSq-YMbAFKRWKrIPLAPVBclv9dkaa/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=2WHng8PMGdyhp%2B2mt6Ej0tRufes%3D" data-url="https://blog.kakaocdn.net/dna/CiA3d/dJMcab38u0D/AAAAAAAAAAAAAAAAAAAAAHbMhPg0ueWA0XTCSq-YMbAFKRWKrIPLAPVBclv9dkaa/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=2WHng8PMGdyhp%2B2mt6Ej0tRufes%3D"><img data-origin-height="388" data-origin-width="477" height="388" loading="lazy" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" src="https://blog.kakaocdn.net/dna/CiA3d/dJMcab38u0D/AAAAAAAAAAAAAAAAAAAAAHbMhPg0ueWA0XTCSq-YMbAFKRWKrIPLAPVBclv9dkaa/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=2WHng8PMGdyhp%2B2mt6Ej0tRufes%3D" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&amp;fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FCiA3d%2FdJMcab38u0D%2FAAAAAAAAAAAAAAAAAAAAAHbMhPg0ueWA0XTCSq-YMbAFKRWKrIPLAPVBclv9dkaa%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1777561199%26allow_ip%3D%26allow_referer%3D%26signature%3D2WHng8PMGdyhp%252B2mt6Ej0tRufes%253D" width="477"/></span></figure>
</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">rds_rdma_extra_size를 트리거하는 것은 간접 호출을 포함, 이에 대한 제어 흐름은 rds_sendmsg로 지시한다.  <br/><br/> → 코드에 rds_sendmsg가 없는데 어떻게 제어 흐름을 지시?. <br/><br/>sendmsg 시스템 콜이 RDS 소켓에 대해 호출될 때, 커널은 간접 호출 메커니즘을 통해 rds_sendmsg를 호출하게 되고, 이 rds_sendmsg를 포함하는 호출 체인을 통해 최종적으로  rds_rdma_extra_size 함수에 도달하게 되는 것!!!! <br/><br/>이때, rds_sendmsg를 앵커 함수로 지정하고, 모든 참조를 검사한다. <br/><br/>→ rds_sendmsg는 RDS 소켓의 가상 테이블과 유사한 구조체인 rds_proto_ops에 속한다..  <br/><br/>→ 그럼 rds_proto_ops는 어떤 리소스 관련 상수와 일치하는지 보기 위해서, 리소스 생성을 분섞! <br/><br/>→ RDS 소켓의 생성은 아래와 같다. 4행에서 소켓 등록 함수를 호출!! 그리고 인수와 재귀적으로 중첩된 필드를 분석하여 패밀리 유형과, 생성 함수를 얻는다!!!!!!</p>
<p data-ke-size="size16"> </p>
<p><figure class="imageblock alignCenter" data-ke-mobilestyle="widthOrigin" data-origin-height="436" data-origin-width="452"><span data-phocus="https://blog.kakaocdn.net/dna/BZcHO/dJMcafZLxTX/AAAAAAAAAAAAAAAAAAAAAGqwJhpF9zw24opjJG6Dfs783tavkVPQwmxFN3ABz7BE/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=DmVLc0Ex8LsNkygZMn5hoQyHiKE%3D" data-url="https://blog.kakaocdn.net/dna/BZcHO/dJMcafZLxTX/AAAAAAAAAAAAAAAAAAAAAGqwJhpF9zw24opjJG6Dfs783tavkVPQwmxFN3ABz7BE/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=DmVLc0Ex8LsNkygZMn5hoQyHiKE%3D"><img data-origin-height="436" data-origin-width="452" height="436" loading="lazy" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" src="https://blog.kakaocdn.net/dna/BZcHO/dJMcafZLxTX/AAAAAAAAAAAAAAAAAAAAAGqwJhpF9zw24opjJG6Dfs783tavkVPQwmxFN3ABz7BE/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=DmVLc0Ex8LsNkygZMn5hoQyHiKE%3D" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&amp;fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FBZcHO%2FdJMcafZLxTX%2FAAAAAAAAAAAAAAAAAAAAAGqwJhpF9zw24opjJG6Dfs783tavkVPQwmxFN3ABz7BE%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1777561199%26allow_ip%3D%26allow_referer%3D%26signature%3DDmVLc0Ex8LsNkygZMn5hoQyHiKE%253D" width="452"/></span></figure>
</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">→ rds_create를 더 추적하여서 22행에서 rds_proto_ops의 할당을 얻는다. <br/><br/> → 16행에서 소켓 유형에 대한 검사를 찾을 수 있으며, 이는 소켓 유형의 값이 할당문과 유사한 SOCK_SEQPACKET임을 나타낸다. <br/><br/>짜잔~ 그러면 rds_sendmsg가 AF_RDS_SOCK_SEQPACKET 리소스를 필요로 한다는 것을 앎.</p>
<p data-ke-size="size16"> </p>
<h3 data-ke-size="size23">진입 시스템 호출 식별</h3>
<p data-ke-size="size16">전통적인 제어 흐름 분석 + 매칭 접근 방식을 결합!!! 진입 시스템 호출 식별!</p>
<p data-ke-size="size16">→ control flow analysis를 수행하여 제어 흐름 그래프를 구축, 대상에 도달할 수 있는 기본 시스템 호출을 식별!</p>
<p data-ke-size="size16">→ CGF로 커널 함수 모델링 &amp; 대상 함수를 시스템 호출 변형과 일치시킴!!!</p>
<p data-ke-size="size16">→ 실행 불가능하면 죽여!</p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16"> </p>
<p data-ke-size="size16">이거 그대로 복사 붙여넣기 하고 블로그에 사용할 이미지 만들어달라고 하니까 진짜 깔끔하게 정리해줬음..</p>
<p><figure class="imageblock alignCenter" data-filename="Gemini_Generated_Image_19g8jb19g8jb19g8.png" data-ke-mobilestyle="widthOrigin" data-origin-height="1536" data-origin-width="2816"><span data-phocus="https://blog.kakaocdn.net/dna/miWSI/dJMb99ZAOZf/AAAAAAAAAAAAAAAAAAAAACkCyatjwwhLRAoyM8fyvdGv_xDhHyUHTjiNP5OQMg-v/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=RzIWMlE3pG2ez5YDkZxwVg0EefE%3D" data-url="https://blog.kakaocdn.net/dna/miWSI/dJMb99ZAOZf/AAAAAAAAAAAAAAAAAAAAACkCyatjwwhLRAoyM8fyvdGv_xDhHyUHTjiNP5OQMg-v/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=RzIWMlE3pG2ez5YDkZxwVg0EefE%3D"><img data-filename="Gemini_Generated_Image_19g8jb19g8jb19g8.png" data-origin-height="1536" data-origin-width="2816" height="1536" loading="lazy" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" src="https://blog.kakaocdn.net/dna/miWSI/dJMb99ZAOZf/AAAAAAAAAAAAAAAAAAAAACkCyatjwwhLRAoyM8fyvdGv_xDhHyUHTjiNP5OQMg-v/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&amp;expires=1777561199&amp;allow_ip=&amp;allow_referer=&amp;signature=RzIWMlE3pG2ez5YDkZxwVg0EefE%3D" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&amp;fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FmiWSI%2FdJMb99ZAOZf%2FAAAAAAAAAAAAAAAAAAAAACkCyatjwwhLRAoyM8fyvdGv_xDhHyUHTjiNP5OQMg-v%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1777561199%26allow_ip%3D%26allow_referer%3D%26signature%3DRzIWMlE3pG2ez5YDkZxwVg0EefE%253D" width="2816"/></span></figure>
</p>
