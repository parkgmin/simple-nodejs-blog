var express = require("express");
var bodyParser = require("body-parser");
var api = require("./api.js");
var sqlite3 = require("sqlite3").verbose()
var db = new sqlite3.Database("./blog.db");
var session = require('express-session');

var app = express();

// 뷰 등록 + 템플릿 엔진 등록
app.set('views', __dirname + '/views'); // 템플릿이 있는 디렉토리
app.set('view engine', 'ejs'); // 템플릿 엔진
app.engine('html', require('ejs').renderFile);

// 정적 파일 디렉터리 등록
app.use('/public', express.static(__dirname + '/public'));

// 세션 설정
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
   }));

// POST 요청 처리를 위한 body-parser
app.use(bodyParser.urlencoded({ extended: true }));


//////// URL Routing ////////////
app.get("/", function(req, res) {
    obj = {
        user_id: req.session.user_id || null
    }
    res.render("index.ejs", obj);
});

// 게시물 목록 가져오기
// query 값 목록
// * sort
// - view_count: 조회수 정렬
// - recommend: 추천수 정렬
// * page
// 페이지 인덱스(1부터 시작)
app.get("/posts/:page", function(req, res) {
    var page = req.params.page
    obj = {
        posts: [
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1},
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1},
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1},
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1},
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1},
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1},
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1}
        ],
        page: page,
        max_page: 1
    }
    res.render("posts.ejs", obj);
});

// id 게시물 가져오기
app.get("/post/:id", function(req, res) {
    obj = {
        user_id: "root",

        post: {
            id: req.params.id,
            title: "야호야호",
            content: "asdsafjkefqofnqnw<br>"
        },
        comments: [
            { id: 1, user_id: "root", content: "ㅋㅋㅋㅋㅋ "},
            { id: 2, user_id: "test1", content: "ㅋㅋㅋㅋㅋ "},
            { id: 3, user_id: "test2", content: "ㅋㅋㅋㅋㅋ "},
            { id: 4, user_id: "test3", content: "ㅋㅋㅋㅋㅋ "}
        ]
    }
    res.render("post.ejs", obj);
});

// id 게시물에 댓글 추가
// Body 값
// - content: 댓글 내용
app.post("/post/:id/comments", function(req, res) {

})

// id 댓글 삭제
app.get("/comment/:id/delete", function(req, res) {
    
})

// 로그인 페이지 가져오기
app.get("/login", function(req, res) {
    res.render("login.ejs");
});

// 회원가입 페이지 가져오기
app.get("/signup", function(req, res) {
    res.render("signup.ejs");
});

// 회원가입 요청
app.post("/users", function(req, res) {

});

// 로그인 요청
app.post("/login", function(req, res) {

});

// 로그아웃 요청
app.post("/logout", function(req, res) {

});

// 회원탈퇴 요청
app.post("/user/:id/delete", function(req, res) {

});



//
//
//
//////// Admin /////////
app.get("/admin", function(req, res) {
    res.render("admin.ejs");
});


// 관리자 로그인 페이지를 가져옵니다.
app.get("/admin/login", function(req, res) {
    res.render("admin_login.ejs");
});

// 관리자 로그인 페이지에서 로그인 시도를 할 경우.
app.post("/admin/login", function(req, res) {
    var id = req.body.id;
    var pw = req.body.password;
});

// 게시물 작성하기
app.get("/admin/write", function(req, res) {
    res.render("admin_write.ejs");
});

// 게시물 목록 보기
app.get("/admin/posts/:page", function(req, res) {
    var page = parseInt(req.params.page)
    obj = {
        posts: [
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1},
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1},
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1},
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1},
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1},
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1},
            {id: 1, title: "HIHIHI", view_count: 1, recommend_count: 1}
        ],
        page: page,
        max_page: 100
    }
    res.render("admin_posts.ejs", obj);
});
// 게시물 수정하기
app.get("/admin/post/:id/modify", function(req, res) {
    obj = {
        id: 1,
        title: "제목입니다",
        content: "내용입니다"
    }
    res.render("admin_modify.ejs", obj);
});
// 게시물 삭제하기
app.get("/admin/post/:id/delete", function(req, res) {

});

// 유저 목록
app.get("/admin/users/:page", function(req, res) {
    var page = parseInt(req.params.page);
    obj = {
        page: page,
        max_page: 100,
        users: [
            { id: "test1" },
            { id: "test2" },
            { id: "test22" },
            { id: "test31" },
            { id: "test4" },
            { id: "test5" },
        ]
    };
    res.render("admin_users.ejs", obj);
});

// id 유저 삭제
app.post("/admin/user/:id/delete", function(req, res) {

});

// 댓글목록 보기
app.get("/admin/comments/:page", function(req, res) {
    var page = parseInt(req.params.page);
    obj = {
        page: page,
        max_page: 100,
        comments: [
            { user_id: "test1", content: "ㅋㅋㅋㅋㅋ" },
            { user_id: "test2", content: "ㅋㅋㅋㅋㅋ"  },
            { user_id: "test22", content: "ㅋㅋㅋㅋㅋ"  },
            { user_id: "test31", content: "ㅋㅋㅋㅋㅋ"  },
            { user_id: "test4", content: "ㅋㅋㅋㅋㅋ"  },
            { user_id: "test5", content: "ㅋㅋㅋㅋㅋ"  }
        ]
    };
    res.render("admin_users.ejs", obj);
});

// 관리자가 특정 댓글 삭제
app.post("admin/comment/:id/delete", function(req, res) {

});


app.listen(3000, function() {
    console.log("서버를 시작합니다.")
});
