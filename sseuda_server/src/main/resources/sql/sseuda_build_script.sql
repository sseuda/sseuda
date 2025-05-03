-- 테이블 삭제
DROP TABLE IF EXISTS tbl_tag;
DROP TABLE IF EXISTS tbl_alarm;
DROP TABLE IF EXISTS tbl_likes;
DROP TABLE IF EXISTS tbl_comment;
DROP TABLE IF EXISTS tbl_reports;
DROP TABLE IF EXISTS tbl_post;
DROP TABLE IF EXISTS tbl_category_small;
DROP TABLE IF EXISTS tbl_category_big;
DROP TABLE IF EXISTS tbl_user_role;
DROP TABLE IF EXISTS tbl_member;

-- 회원 테이블
CREATE TABLE IF NOT EXISTS tbl_member (
    user_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '회원 번호',
    user_fullname VARCHAR(20) NOT NULL COMMENT '회원 이름',
    username VARCHAR(20) NOT NULL UNIQUE COMMENT '아이디',
    password VARCHAR(255) NOT NULL COMMENT '비밀번호',
    user_nickname VARCHAR(20) COMMENT '닉네임',
    user_email VARCHAR(255) NOT NULL UNIQUE COMMENT '이메일',
    user_phone VARCHAR(20) NOT NULL COMMENT '전화번호',
    enroll_date DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '가입일',
    user_status ENUM('탈퇴', '활성') DEFAULT '활성' COMMENT '탈퇴여부'
);

-- 회원권한 테이블
CREATE TABLE IF NOT EXISTS tbl_user_role (
    user_id INT PRIMARY KEY COMMENT '회원 번호',
    user_role ENUM('SUPER', 'ADMIN', 'USER') DEFAULT 'USER' COMMENT '회원 권한',
    FOREIGN KEY (user_id) REFERENCES tbl_member(user_id) ON DELETE CASCADE
);

-- 대분류 카테고리 테이블
CREATE TABLE IF NOT EXISTS tbl_category_big (
    big_category_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '카테고리번호(대)',
    big_category_name VARCHAR(50) NOT NULL COMMENT '카테고리이름(대)',
    user_id INT NOT NULL COMMENT '회원 번호',
    FOREIGN KEY (user_id) REFERENCES tbl_user_role(user_id) ON DELETE CASCADE
);

-- 소분류 카테고리 테이블
CREATE TABLE IF NOT EXISTS tbl_category_small (
    small_category_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '카테고리번호(소)',
    small_category_name VARCHAR(50) NOT NULL COMMENT '카테고리이름(소)',
    big_category_id INT NOT NULL COMMENT '카테고리번호(대)',
    FOREIGN KEY (big_category_id) REFERENCES tbl_category_big(big_category_id) ON DELETE CASCADE
);

-- 게시글 테이블
CREATE TABLE IF NOT EXISTS tbl_post (
    post_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '게시글번호',
    post_title VARCHAR(300) NOT NULL COMMENT '게시글제목',
    user_id INT NOT NULL COMMENT '작성자',
    post_content TEXT NOT NULL COMMENT '게시글내용',
    post_create_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
    post_update_at DATETIME NULL COMMENT '수정일',
    view_count INT DEFAULT 0 COMMENT '조회수',
    post_delete CHAR(1) DEFAULT 'N' COMMENT '삭제여부',
    small_category_id INT NOT NULL COMMENT '소분류 카테고리 ID',
    FOREIGN KEY (user_id) REFERENCES tbl_member(user_id) ON DELETE CASCADE,
    FOREIGN KEY (small_category_id) REFERENCES tbl_category_small(small_category_id) ON DELETE CASCADE
);

-- 신고 테이블
CREATE TABLE IF NOT EXISTS tbl_reports (
    reports_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '신고번호',
    reporter_id INT NOT NULL COMMENT '신고자 ID',
    reported_id INT NOT NULL COMMENT '신고된 유저 ID',
    post_id INT NOT NULL COMMENT '신고된 게시글 ID',
    reports_create_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '신고일',
    reason VARCHAR(300) COMMENT '신고사유',
    reports_status ENUM('처리중', '완료') DEFAULT '처리중' COMMENT '처리상태',
    FOREIGN KEY (reporter_id) REFERENCES tbl_member(user_id) ON DELETE CASCADE,
    FOREIGN KEY (reported_id) REFERENCES tbl_member(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES tbl_post(post_id) ON DELETE CASCADE
);

-- 댓글 테이블
CREATE TABLE IF NOT EXISTS tbl_comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '댓글번호',
    comment_text VARCHAR(200) NOT NULL COMMENT '댓글내용',
    comment_create_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '댓글작성일',
    comment_update_at DATETIME NULL COMMENT '댓글수정일',
    comment_delete CHAR(1) DEFAULT 'N' COMMENT '삭제여부',
    post_id INT NOT NULL COMMENT '게시글번호',
    user_id INT NOT NULL COMMENT '회원',
    FOREIGN KEY (post_id) REFERENCES tbl_post(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES tbl_member(user_id) ON DELETE CASCADE
);

-- 좋아요(반응) 테이블
CREATE TABLE IF NOT EXISTS tbl_likes (
    likes_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '반응번호',
    likes_create_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '생성일시',
    post_id INT NOT NULL COMMENT '게시글번호',
    user_id INT NOT NULL COMMENT '회원',
    FOREIGN KEY (post_id) REFERENCES tbl_post(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES tbl_member(user_id) ON DELETE CASCADE
);

-- 알림 테이블
CREATE TABLE IF NOT EXISTS tbl_alarm (
    alarm_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '알림번호',
    alarm_type ENUM('POST', 'COMMENT', 'LIKE') NOT NULL COMMENT '알림 유형',
    alarm_detail VARCHAR(255) NOT NULL COMMENT '알림 내용',
    user_id INT NOT NULL COMMENT '알림 받을 회원 ID',
    post_id INT NOT NULL COMMENT '알림 대상 게시글 ID',
    comment_id INT DEFAULT NULL COMMENT '알림 대상 댓글 ID',
    likes_id INT DEFAULT NULL COMMENT '알림 대상 반응 ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '알림 생성 시간',
    FOREIGN KEY (user_id) REFERENCES tbl_member(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES tbl_post(post_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES tbl_comment(comment_id) ON DELETE CASCADE,
    FOREIGN KEY (likes_id) REFERENCES tbl_likes(likes_id) ON DELETE CASCADE
);

-- 태그 테이블
CREATE TABLE IF NOT EXISTS tbl_tag (
    tag_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '태그번호',
    tag_name VARCHAR(50) NOT NULL COMMENT '태그명',
    post_id INT NOT NULL COMMENT '게시글번호',
    FOREIGN KEY (post_id) REFERENCES tbl_post(post_id) ON DELETE CASCADE
);

-- 회원 더미데이터
INSERT INTO tbl_member
(user_id, user_fullname, username, password, user_nickname, user_email, user_phone, enroll_date, user_status)
VALUES
    (1, '아이유', 'iu_93', 'password123!', '이지금', 'iu@example.com', '010-1234-5678', '2023-04-15 14:23:00', '활성'),
    (2, '박보검', 'bogummy', 'password123!', '보검이', 'bogummy@example.com', '010-2345-6789', '2023-09-08 09:12:00', '활성'),
    (3, '수지', 'suzy_bae', 'password123!', '배뚠뚠', 'suzy@example.com', '010-3456-7890', '2023-11-27 16:55:00', '탈퇴'),
    (4, '정해인', 'haein_j', 'password123!', '해인이', 'haein@example.com', '010-4567-8901', '2024-02-03 20:47:00', '활성'),
    (5, '한소희', 'sohee_h', 'password123!', '소히', 'sohee@example.com', '010-5678-9012', '2023-07-01 11:05:00', '활성'),
    (6, '차은우', 'eunwoo_c', 'password123!', '얼굴천재', 'eunwoo@example.com', '010-6789-0123', '2024-08-21 08:33:00', '활성'),
    (7, '김태리', 'taeri_kim', 'password123!', '리리', 'taeri@example.com', '010-7890-1234', '2023-12-10 22:11:00', '활성'),
    (8, '송중기', 'joongki_s', 'password123!', '기송이', 'joongki@example.com', '010-8901-2345', '2025-01-16 19:40:00', '탈퇴'),
    (9, '김세정', 'sejeong_k', 'password123!', '정이', 'sejeong@example.com', '010-9012-3456', '2024-05-09 13:09:00', '활성'),
    (10, '이도현', 'dohyun_lee', 'password123!', '현이', 'dohyun@example.com', '010-0123-4567', '2023-03-25 17:30:00', '활성');

-- 회원 권한 더미데이터
INSERT INTO tbl_user_role (user_id, user_role) VALUES
    (1, 'SUPER'),
    (2, 'ADMIN'),
    (3, 'USER'),
    (4, 'USER'),
    (5, 'USER'),
    (6, 'USER'),
    (7, 'USER'),
    (8, 'USER'),
    (9, 'USER'),
    (10, 'USER');

-- 대분류 카테고리 더미데이터
INSERT INTO tbl_category_big
(
    big_category_id,
    big_category_name,
    user_id
)
VALUES
    (1, '여행', 2),
    (2, '자기개발', 2),
    (3, '육아', 2);

-- 소분류 카테고리 더미데이터
INSERT INTO tbl_category_small
(
    small_category_id,
    small_category_name,
    big_category_id
)
VALUES
    (1, '일본', 1),
    (2, '중국', 1),
    (3, '태국', 1),
    (4, 'JAVA', 2),
    (5, '강아지', 3),
    (6, '호주', 1),
    (7, '해바라기', 3);


-- 게시글 더미데이터
INSERT INTO tbl_post
(post_id, post_title, user_id, post_content, post_create_at, post_update_at, view_count, post_delete, small_category_id)
VALUES
    (1, '일본 여행 추천 코스', 1, '도쿄에서 후쿠오카까지의 일정 추천드립니다.', NOW(), NULL, 15, 'N', 1),
    (2, '중국 음식 너무 맛있어요', 2, '중국에서 먹은 마라탕이 잊히질 않네요.', NOW(), NULL, 20, 'N', 2),
    (3, '태국에서 코끼리와 교감한 날', 3, '치앙마이 코끼리 보호소 방문 후기입니다.', NOW(), NULL, 12, 'N', 3),
    (4, 'JAVA 입문자를 위한 팁', 4, '처음 자바 공부할 때 꼭 알아야 할 개념들 정리.', NOW(), NULL, 40, 'N', 4),
    (5, '강아지 키울 때 필요한 준비물', 5, '입양 전에 꼭 준비해야 할 것들을 정리해봤어요.', NOW(), NULL, 33, 'N', 5),
    (6, '호주 워홀 비자 신청 팁', 6, '최근 신청해본 경험을 공유합니다.', NOW(), NULL, 25, 'N', 6),
    (7, '해바라기 씨앗 심기', 7, '봄에 심기 좋은 해바라기 키우는 방법.', NOW(), NULL, 17, 'N', 7),
    (8, '일본 온천 여행 후기', 3, '벳푸 온천 정말 좋았어요!', NOW(), NULL, 18, 'N', 1),
    (9, '중국 기차 여행 팁', 4, '기차표 예매 꿀팁과 후기도 공유합니다.', NOW(), NULL, 22, 'N', 2),
    (10, '태국 음식 추천 리스트', 5, '팟타이, 쏨땀, 똠얌꿍은 꼭 먹어야 해요!', NOW(), NULL, 29, 'N', 3),
    (11, 'JAVA 람다 표현식 쉽게 이해하기', 1, '함수형 프로그래밍의 시작!', NOW(), NULL, 45, 'N', 4),
    (12, '우리 강아지 입양 후기', 2, '작은 말티즈를 입양했어요.', NOW(), NULL, 10, 'N', 5),
    (13, '호주에서 즐긴 서핑', 3, '골드코스트에서의 서핑 경험 공유합니다.', NOW(), NULL, 27, 'N', 6),
    (14, '해바라기 꽃말과 의미', 4, '해바라기는 희망과 기다림의 상징입니다.', NOW(), NULL, 8, 'N', 7),
    (15, '일본 벚꽃 명소 TOP5', 5, '벚꽃 시즌에 가기 좋은 일본 명소 추천!', NOW(), NULL, 31, 'N', 1),
    (16, '중국 길거리 음식 탐방', 6, '현지 느낌 제대로 나는 음식 후기입니다.', NOW(), NULL, 13, 'N', 2),
    (17, '태국의 숨겨진 해변', 7, '사람 적고 조용한 해변 추천드려요.', NOW(), NULL, 21, 'N', 3),
    (18, 'JAVA로 만드는 게시판', 8, 'Spring Boot와 MySQL을 활용한 예제입니다.', NOW(), NULL, 38, 'N', 4),
    (19, '강아지 산책 필수템', 9, '하네스, 리드줄, 물병 등 소개합니다.', NOW(), NULL, 14, 'N', 5),
    (20, '호주 대자연 여행기', 10, '블루마운틴 국립공원 다녀왔어요.', NOW(), NULL, 16, 'N', 6),
    (21, '해바라기 키우기 일지', 1, '씨앗부터 꽃 필 때까지 기록입니다.', NOW(), NULL, 19, 'N', 7);


-- 신고 더미데이터
INSERT INTO tbl_reports
(reporter_id, reported_id, post_id, reports_create_at, reason, reports_status)
VALUES
(2, 3, 2, '2025-01-15 10:30:00',
 '해당 게시글에는 비속어 및 공격적인 표현이 반복적으로 사용되어 있어 다른 사용자에게 불쾌감을 줄 수 있습니다. 검토 부탁드립니다.',
 '처리중'),
(4, 5, 5, '2025-02-02 14:10:00',
 '짧은 시간 안에 동일한 내용을 여러 번 게시하여 도배로 의심되며, 커뮤니티 이용에 불편을 주고 있습니다.',
 '처리중'),
(6, 7, 8, '2025-02-20 18:45:00',
 '게시글 내에 타인의 명예를 훼손할 수 있는 허위 정보가 포함되어 있습니다. 확인 후 조치가 필요해 보입니다.',
 '완료'),
(8, 9, 1, '2025-03-03 09:05:00',
 '해당 게시물에는 본인의 전화번호와 이메일이 노출되어 있어 개인정보 유출 우려가 있습니다. 빠른 조치 부탁드립니다.',
 '처리중'),
(10, 4, 10, '2025-03-22 16:30:00',
 '댓글과 게시글에서 특정 사용자를 지속적으로 비난하고 있어 사이버 불링으로 판단됩니다. 심각한 상황입니다.',
 '완료');


-- 댓글 더미데이터
INSERT INTO tbl_comment (comment_id, comment_text, comment_create_at, comment_update_at, comment_delete, post_id, user_id)
VALUES
    (1, '멋진 여행이네요!', NOW(), NULL, 'N', 1, 8),
    (2, '저도 도쿄 가보고 싶어요!', NOW(), NULL, 'N', 1, 3),
    (3, '만리장성 꼭 가보고 싶네요.', NOW(), NULL, 'N', 2, 4),
    (4, '팟타이 좋아요!', NOW(), NULL, 'N', 3, 5),
    (5, '저도 JAVA 배우는 중이에요.', NOW(), NULL, 'N', 4, 9),
    (6, '우리집 강아지도 여기 좋아해요!', NOW(), NULL, 'N', 5, 5),
    (7, '서핑 재밌죠!', NOW(), NULL, 'N', 6, 3),
    (8, '해바라기 사진도 보여주세요~', NOW(), NULL, 'N', 7, 4),
    (9, '온천 어디서 묵으셨어요?', NOW(), NULL, 'N', 8, 5),
    (10, '기저귀 가방 추천 좀요!', NOW(), NULL, 'N', 10, 3);


-- 좋아요(반응) 더미데이터
INSERT INTO tbl_likes (likes_create_at, post_id, user_id)
VALUES
    ('2025-01-05 10:15:00', 1, 3),
    ('2025-01-06 12:20:00', 2, 4),
    ('2025-01-07 14:00:00', 3, 4),
    ('2025-01-08 09:30:00', 4, 3),
    ('2025-01-09 11:45:00', 5, 6),
    ('2025-01-10 15:10:00', 6, 5),
    ('2025-01-11 17:25:00', 7, 7),
    ('2025-01-12 19:50:00', 8, 8),
    ('2025-01-13 21:00:00', 9, 9),
    ('2025-01-14 22:30:00', 10, 10),
    ('2025-01-15 10:00:00', 11, 5),
    ('2025-01-15 10:30:00', 12, 3),
    ('2025-01-15 11:00:00', 13, 4),
    ('2025-01-15 11:30:00', 14, 5),
    ('2025-01-15 12:00:00', 15, 6),
    ('2025-01-15 12:30:00', 16, 7),
    ('2025-01-15 13:00:00', 17, 8),
    ('2025-01-15 13:30:00', 18, 9),
    ('2025-01-15 14:00:00', 19, 10),
    ('2025-01-15 14:30:00', 20, 7),
    ('2025-01-15 15:00:00', 1, 4),
    ('2025-01-15 15:30:00', 2, 5),
    ('2025-01-15 16:00:00', 3, 6),
    ('2025-01-15 16:30:00', 4, 7),
    ('2025-01-15 17:00:00', 5, 8);


-- 알림 더미데이터
INSERT INTO tbl_alarm (alarm_type, alarm_detail, user_id, post_id, comment_id, likes_id, created_at)
VALUES
    ('COMMENT', '3번 회원님이 회원님의 게시글에 댓글을 남겼습니다.', 3, 1, 1, NULL, '2025-01-05 10:20:00'),
    ('COMMENT', '4번 회원님이 회원님의 게시글에 댓글을 남겼습니다.', 4, 1, 2, NULL, '2025-01-05 10:21:00'),
    ('COMMENT', '5번 회원님이 회원님의 게시글에 댓글을 남겼습니다.', 5, 2, 3, NULL, '2025-01-06 11:00:00'),
    ('COMMENT', '3번 회원님이 회원님의 게시글에 댓글을 남겼습니다.', 3, 3, 4, NULL, '2025-01-07 12:00:00'),
    ('COMMENT', '4번 회원님이 회원님의 게시글에 댓글을 남겼습니다.', 4, 4, 5, NULL, '2025-01-08 13:00:00'),
    ('COMMENT', '5번 회원님이 회원님의 게시글에 댓글을 남겼습니다.', 5, 5, 6, NULL, '2025-01-09 14:00:00'),
    ('COMMENT', '6번 회원님이 회원님의 게시글에 댓글을 남겼습니다.', 6, 6, 7, NULL, '2025-01-10 15:00:00'),
    ('COMMENT', '7번 회원님이 회원님의 게시글에 댓글을 남겼습니다.', 7, 7, 8, NULL, '2025-01-11 16:00:00'),
    ('COMMENT', '3번 회원님이 회원님의 게시글에 댓글을 남겼습니다.', 3, 8, 9, NULL, '2025-01-12 17:00:00'),
    ('COMMENT', '5번 회원님이 회원님의 게시글에 댓글을 남겼습니다.', 5, 10, 10, NULL, '2025-01-13 18:00:00'),

    ('LIKE', '6번 회원님이 회원님의 게시글을 좋아합니다.', 6, 1, NULL, 1, '2025-01-05 10:15:00'),
    ('LIKE', '7번 회원님이 회원님의 게시글을 좋아합니다.', 7, 2, NULL, 2, '2025-01-06 12:20:00'),
    ('LIKE', '8번 회원님이 회원님의 게시글을 좋아합니다.', 8, 3, NULL, 3, '2025-01-07 14:00:00'),
    ('LIKE', '4번 회원님이 회원님의 게시글을 좋아합니다.', 4, 4, NULL, 4, '2025-01-08 09:30:00'),
    ('LIKE', '5번 회원님이 회원님의 게시글을 좋아합니다.', 5, 5, NULL, 5, '2025-01-09 11:45:00'),
    ('LIKE', '6번 회원님이 회원님의 게시글을 좋아합니다.', 6, 6, NULL, 6, '2025-01-10 15:10:00'),
    ('LIKE', '7번 회원님이 회원님의 게시글을 좋아합니다.', 7, 7, NULL, 7, '2025-01-11 17:25:00'),
    ('LIKE', '3번 회원님이 회원님의 게시글을 좋아합니다.', 3, 8, NULL, 8, '2025-01-12 19:50:00'),
    ('LIKE', '4번 회원님이 회원님의 게시글을 좋아합니다.', 4, 9, NULL, 9, '2025-01-13 21:00:00'),
    ('LIKE', '5번 회원님이 회원님의 게시글을 좋아합니다.', 5, 10, NULL, 10, '2025-01-14 22:30:00');

-- 태그 더미데이터
INSERT INTO tbl_tag (tag_id, tag_name, post_id) VALUES
    (1, '벚꽃', 1),
    (2, '도쿄', 1),
    (3, '중국여행', 2),
    (4, '맛집', 3),
    (5, '태국', 3),
    (6, '자바', 4),
    (7, 'SpringBoot', 4),
    (8, '강아지', 5),
    (9, '산책', 5),
    (10, '호주', 6),
    (11, '서핑', 6),
    (12, '꽃', 7),
    (13, '가드닝', 7),
    (14, '후쿠오카', 8),
    (15, '온천', 8),
    (16, '자바', 9),
    (17, '육아', 10),
    (18, '벚꽃', 11),
    (19, '도쿄', 12),
    (20, '중국여행', 13),
    (21, '맛집', 14),
    (22, '태국', 15),
    (23, '자바', 16),
    (24, 'SpringBoot', 17),
    (25, '강아지', 18),
    (26, '산책', 19),
    (27, '호주', 20),
    (28, '서핑', 21),
    (29, '꽃', 1),
    (30, '가드닝', 2),
    (31, '후쿠오카', 3),
    (32, '온천', 4),
    (33, '자바', 5),
    (34, '육아', 6),
    (35, '벚꽃', 7),
    (36, '도쿄', 8),
    (37, '중국여행', 9),
    (38, '맛집', 10),
    (39, '태국', 11),
    (40, '자바', 12),
    (41, 'SpringBoot', 13),
    (42, '강아지', 14),
    (43, '산책', 15),
    (44, '호주', 16),
    (45, '서핑', 17),
    (46, '꽃', 18),
    (47, '가드닝', 19),
    (48, '후쿠오카', 20),
    (49, '온천', 21),
    (50, '자바', 1);