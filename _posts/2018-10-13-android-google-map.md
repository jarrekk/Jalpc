---
layout: post
title:  "[Android] 안드로이드 구글 맵 연동하기(1) - 초기 셋팅하기"
date:   2018-10-13
desc: "[Android] 안드로이드 구글 맵 연동하기(1) - 초기 셋팅하기"
keywords: "Android,안드로이드,GoogleMap,구글맵,개발"
categories: [Android]
tags: [Android,AndroidStudio,GoogleMap,Developer]
icon: icon-android
---

테스트 환경
---
> Android Studio 3.1.2

Google Maps SDK for Android 초기 셋팅하기
---

1. 구글 API 콘솔 사이트 접속
2. 구글 프로젝트 생성
3. Maps SDK for Android Api 추가
4. 사용자 인증 정보 설정
5. 안드로이드 스튜디오 API 키 추가
6. 안드로이드 스튜디오 라이브러리 추가

---
**1. 구글 API 콘솔 사이트 접속**

구글 API 콘솔 사이트 [Google Api Console](https://console.cloud.google.com/apis/) ( https://console.cloud.google.com/apis/ )에 먼저 접속합니다.

**2. 구글 프로젝트 생성**

이미 만들어진 프로젝트에서 구글맵 연동을 진행하고 싶다면, 해당 프로젝트를 선택하면 되고, 아니면 새로 프로젝트를 만드시면 됩니다.
저는 생성된 프로젝트가 하나도 없는 상황에서 진행을 해보도록 하겠습니다.

상단에 프로젝트 선택을 눌러 새 프로젝트를 클릭합니다.

<img src="{{ site.img_path }}/google_map_1/google_map_1.png">

<img src="{{ site.img_path }}/google_map_1/google_map_2.png">

프로젝트 이름을 입력하고 만들기를 클릭하면 프로젝트가 생성이 됩니다.
차후에 프로젝트 이름은 변경할 수 있으니 걱정안하셔도 됩니다~

<img src="{{ site.img_path }}/google_map_1/google_map_3.png">

**3. Maps SDK for Android Api 추가**

왼쪽에 라이브러리를 클릭하면 구글 API 라이브러리 화면으로 이동하게 됩니다.

<img src="{{ site.img_path }}/google_map_1/google_map_4.png">

그 중에 저희는 Maps SDK for Android를 선택합니다.

<img src="{{ site.img_path }}/google_map_1/google_map_5.png">

여기서 사용 설정을 선택합니다.

<img src="{{ site.img_path }}/google_map_1/google_map_6.png">

그러면 다시 콘솔로 돌아와 Maps SDK for Android Api가 추가된 것을 확인할 수 있습니다.

**4. 사용자 인증 정보 설정**

이제 인증 설정을 위해 사용자 인증 정보를 클릭합니다.

<img src="{{ site.img_path }}/google_map_1/google_map_7.png">

저희는 사용자 인증 정보가 없기 때문에 사용자 인증 정보를 만들어야합니다.
사용자 인증 정보 만들기에서 API키를 클릭합니다.

<img src="{{ site.img_path }}/google_map_1/google_map_8.png">

API키가 생성이 되면 키 제한을 클릭하여 키 제한을 설정해줍니다.

<img src="{{ site.img_path }}/google_map_1/google_map_9.png">

먼저 애플리케이션 제한사항에서 Android앱을 선택합니다.

그리고 패키지 이름 및 지문 추가를 클릭합니다.

<img src="{{ site.img_path }}/google_map_1/google_map_10.png">

패키지 이름은 구글맵을 연동할 안드로이드 프로젝트의 패키지 이름을 설정하시면 됩니다.
안드로이드 스튜디오에서 AndroidManifest.xml에 있는 패키지 이름을 복사해서 붙여넣어주면 됩니다.

<img src="{{ site.img_path }}/google_map_1/google_map_11.png">

SHA-1인증서 지문은 안내되어있는 명령어를 터미널창에서 입력하여 얻을 수 있지만, 저는 다른 방법으로 해보도록 하겠습니다.
안드로이드 스튜디오에서 오른쪽에 보시면 Gradle이라는 탭이 있는데 클릭을 해봅니다.

<img src="{{ site.img_path }}/google_map_1/google_map_12.png">

그럼 다음과 같이 나오는데, 혹시 아무것도 안나온다면 좌측상단에 있는 refresh버튼을 한 번 눌러주시면 됩니다.
여기서 GoogleMap > Tasks > android > signingReport 를 더블 클릭해줍니다.

<img src="{{ site.img_path }}/google_map_1/google_map_13.png">

<img src="{{ site.img_path }}/google_map_1/google_map_14.png">

그러면 안드로이드 스튜디오 하단에 Run창이 보여지면서 SHA-1 인증서 지문이 나타나게 됩니다.
이 지문을 복사해서 붙여넣기하시면 됩니다.
이 과정을 진행한 후에 앱을 실행시킬 때는 안드로이드 스튜디오 상단에서 다음과 같이 app으로 바꿔놓고 실행을 해야합니다.

<img src="{{ site.img_path }}/google_map_1/google_map_15.png">

<img src="{{ site.img_path }}/google_map_1/google_map_16.png">

여기까지 하셨으면, 이제 콘솔 화면에서 API 제한 사항을 클릭해서 Maps SDK for Android를 추가해줍니다.

<img src="{{ site.img_path }}/google_map_1/google_map_17.png">

저장을 누르시면 사용자 인증 정보 설정이 완료가 됩니다.

**5. 안드로이드 스튜디오 API 키 추가**

이제 이 API 키의 키 값을 복사해둡니다.

<img src="{{ site.img_path }}/google_map_1/google_map_18.png">

안드로이드 스튜디오로 돌아와 AndroidManifest.xml에 들어갑니다.
application 태그 안에 meta-data 태그를 만들어 복사해둔 API키를 넣습니다.

<img src="{{ site.img_path }}/google_map_1/google_map_19.png">

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.joinandjoin.parkbeommin.googlemap">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        //////////////////////////////////////////////////////////////
        <meta-data
            android:name="com.google.android.geo.API_KEY"
            android:value="복사해둔 키 값" />
        //////////////////////////////////////////////////////////////

        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>

                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
    </application>

</manifest>
```

**6. 안드로이드 스튜디오 라이브러리 추가**

이제 안드로이드 스튜디오에서 구글 맵 라이브러리를 사용하기 위해 gradle에 사용할 라이브러리를 추가해줍니다.

안드로이드 스튜디오에서 Gradle Scripts > build.gradle ( Module: app )에 들어갑니다.

<img src="{{ site.img_path }}/google_map_1/google_map_20.png">

dependencies에 이 두 가지를 추가해줍니다. 현재 작성 시점에서는 최신 버전이지만, 이 후에 업데이트가 있을 경우 16.0.0 부분을 버전에 맞게 수정하시면 됩니다.
최신 버전이 아닐 경우, 두 코드를 입력하였을 때 노란색으로 표시가 되어 마우스를 올려대면 최신 버전을 안내해줄겁니다.
implementation 'com.google.android.gms:play-services-maps:16.0.0'
implementation 'com.google.android.gms:play-services-location:16.0.0'

<img src="{{ site.img_path }}/google_map_1/google_map_21.png">

```
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:28.0.0'
    implementation 'com.android.support.constraint:constraint-layout:1.1.3'
    /////////////////////////////////////////////////////////////////////
    implementation 'com.google.android.gms:play-services-maps:16.0.0'
    implementation 'com.google.android.gms:play-services-location:16.0.0'
    /////////////////////////////////////////////////////////////////////
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.2'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2'
}
```

추가하고 Sync를 눌러 동기화를 진행해줍니다.

이제 안드로이드에서 구글맵을 사용하기 위한 초기 셋팅이 끝났습니다.

다음 포스팅은 
구글맵 띄우기에 대해서 하도록 하겠습니다.


