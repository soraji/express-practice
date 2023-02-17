## About

인프런의 [습관부터 바꿔주는 Node.js & Express 기초](https://www.inflearn.com/course/%EC%8A%B5%EA%B4%80%EB%B6%80%ED%84%B0-%EB%85%B8%EB%93%9C-%EC%9D%B5%EC%8A%A4%ED%94%84%EB%A0%88%EC%8A%A4-%EA%B8%B0%EC%B4%88/dashboard) 강의를 수강하면서 직접 백엔드 서버를 구축하는 repo입니다 (◍ᐡ₃ᐡ◍)

---

<br>

## Swagger
http://ec2-3-36-87-15.ap-northeast-2.compute.amazonaws.com:8080/api-docs/

---

<br>

## Stack

`javaScript`, `express`, `mysql`, `prisma`, `aws`

<br>

<br>

<br>

# 서버 폴더구조

```
📦src
 ┣ 📂controllers
 ┃ ┗ 📜index.js
 ┣ 📂middleware
 ┃ ┣ 📜index.js
 ┃ ┣ 📜jwtAuth.js
 ┃ ┗ 📜pagination.js
 ┣ 📂models
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┣ 📜login.dto.js
 ┃ ┃ ┃ ┗ 📜register.dto.js
 ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜swagger.js
 ┃ ┣ 📂posts
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┃ ┣ 📜comment.dto.js
 ┃ ┃ ┃ ┃ ┣ 📜create-child-comment.dto.js
 ┃ ┃ ┃ ┃ ┣ 📜create-comment.dto.js
 ┃ ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┃ ┗ 📜update-comment.dto.js
 ┃ ┃ ┃ ┣ 📂tag
 ┃ ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┃ ┗ 📜tag.dto.js
 ┃ ┃ ┃ ┣ 📜create-post.dto.js
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┣ 📜post.dto.js
 ┃ ┃ ┃ ┣ 📜posts.dto.js
 ┃ ┃ ┃ ┗ 📜update-post.dto.js
 ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜swagger.js
 ┃ ┣ 📂users
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📜create-user.dto.js
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┣ 📜update-user.dto.js
 ┃ ┃ ┃ ┗ 📜users.dto.js
 ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┗ 📜index.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜swagger.js
 ┃ ┗ 📜index.js
 ┣ 📂swagger
 ┃ ┣ 📜defaultSwagger.js
 ┃ ┗ 📜index.js
 ┣ 📂utils
 ┃ ┣ 📜index.js
 ┃ ┗ 📜paging.js
 ┣ 📜database.js
 ┣ 📜index.js
 ┗ 📜server-register.js
```
