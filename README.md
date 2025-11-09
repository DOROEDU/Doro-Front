# 도로 강사 관리 애플리케이션 - DORO EDU APP

<div align="center"><br/>

  <img width="250px" src="https://github.com/DOROEDU/Doro-Front/assets/42240254/4d858d31-b028-4862-b4e4-bb193b6c6d06" /> 

</div>
<br/>

## 🚀 배포 주소 🚀

> **안드로이드** : 현재 베포 중단 <br>
> **IOS** : 현재 배포 중단 <br>
<br/>

## 📱 애플리케이션 개발팀 📱

|          김민혁          |          노세인          |                                                                                                     
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
|   <img width="160px" src="https://avatars.githubusercontent.com/u/42240254?v=4" />    |                      <img width="160px" src="https://avatars.githubusercontent.com/u/71018440?v=4" />    |
|   [@Minhyeok Kim](https://github.com/jaqwe2301)   |   [@sein](https://github.com/dslov89)   |
<br/>

## 📘 프로젝트 소개 📘

도로는 초중고 등의 교육 교관과  대학생 전문 강사를 연결하는 매칭 서비스를 제공하는 기업입니다.<br/><br/>
DORO EDU APP은 강의 신청 및 관리를 보다 간편하게 처리할 수 있도록 만들어진 애플리케이션입니다.
<br/><br/>
주요 기능은 다음과 같습니다.<br/><br/>

1. 강사 배정 및 강의 관리: 관리자는 강의를 생성하고 해당 강의에 강사를 배정, 사용자(강사)는 등록된 강의를 신청<br/>
2. 강의 배정 알림 발송: 강의에 배정된 강사에게 배정된 사실을 알림을 통해 발송<br/>
3. 공지 및 알림 발송: 관리자는 공지나 알림을 등록하고, 알림을 통해 발송<br/><br/>

---

## 🛠️ Stacks 🛠️

### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)             

### Config
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)        
![env](https://img.shields.io/badge/.env-ECD53F?style=for-the-badge&logo=.env&logoColor=white)        

### Development
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React&nbsp;Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-white?style=for-the-badge&logo=firebase&logoColor=FFCA28)

---
## 화면 구성 📺
> 대표적인 화면 여섯 가지만 포함되어 있습니다.
<br/>

![도로 앱 화면 모음1](https://github.com/DOROEDU/Doro-Front/assets/42240254/b16c7b04-d719-4d7f-981b-eb933ee82f40)
![도로 앱 화면 모음2](https://github.com/DOROEDU/Doro-Front/assets/42240254/b8c7d1f2-13f4-4de1-ad7d-daf32b88f793)


---
## 📦 주요 기술 📦

### ⭐️ JWT 토큰을 활용한 로그인 세션 구현
- JWT 토큰을 안전하게 저장하기 위해 Expo 라이브러리인 SecureStore를 통해 로그인 세션을 관리
- 일반 강사와 관리자를 구분하여, 각 사용자 유형에 맞는 데이터와 API를 사용할 수 있도록 구현

### ⭐️ 푸시 알림 구현
- 일반적으로 알림을 구현하면 Foreground (앱 실행 중) 상태에서 푸시 알림을 사용자가 받을 수 없습니다. 이 문제를 해결하기 위해 notifee 라이브러리의 로컬 알림 기능을 사용하여 Foreground (앱 실행 중) 상태에서도 알림을 받을 수 있도록 구현하였습니다.

### ⭐️ RestFullAPI를 통한 백엔드와 협업

---
