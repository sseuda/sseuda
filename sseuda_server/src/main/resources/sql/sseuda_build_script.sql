-- 테이블 삭제
DROP TABLE IF EXISTS tbl_tag;
DROP TABLE IF EXISTS tbl_alarm;
DROP TABLE IF EXISTS tbl_likes;
DROP TABLE IF EXISTS tbl_reports;
DROP TABLE IF EXISTS tbl_comment;
DROP TABLE IF EXISTS tbl_post;
DROP TABLE IF EXISTS tbl_category_small;
DROP TABLE IF EXISTS tbl_category_big;
DROP TABLE IF EXISTS tbl_user_role;
DROP TABLE IF EXISTS tbl_member;
DROP TABLE IF EXISTS tbl_password_token;

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
    user_status ENUM('탈퇴', '활성', '비활성') DEFAULT '활성' COMMENT '탈퇴여부'
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
    big_category_name VARCHAR(50) NOT NULL COMMENT '카테고리이름(대)'
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

-- 신고 테이블
CREATE TABLE IF NOT EXISTS tbl_reports (
    reports_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '신고번호',
    reporter_id INT NOT NULL COMMENT '신고자 ID',
    reported_id INT NOT NULL COMMENT '신고된 유저 ID',
    post_id INT DEFAULT NULL COMMENT '신고된 게시글 ID (nullable)',
    comment_id INTEGER DEFAULT NULL COMMENT '신고된 댓글 ID (nullable)',
    reports_create_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '신고일',
    reason_code VARCHAR(20) COMMENT '신고사유 코드',
    reason_detail VARCHAR(300) COMMENT '신고사유 상세',
    reports_status VARCHAR(20) DEFAULT '신고접수' COMMENT '처리상태',
    FOREIGN KEY (reporter_id) REFERENCES tbl_member(user_id) ON DELETE CASCADE,
    FOREIGN KEY (reported_id) REFERENCES tbl_member(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES tbl_post(post_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES tbl_comment(comment_id) ON DELETE CASCADE
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
     alarm_type VARCHAR(10) NOT NULL COMMENT '알림 유형',
     user_id INT NOT NULL COMMENT '알림 받을 회원 ID',
     post_id INT DEFAULT NULL COMMENT '알림 대상 게시글 ID',
     comment_id INT DEFAULT NULL COMMENT '알림 대상 댓글 ID',
     likes_id INT DEFAULT NULL COMMENT '알림 대상 반응 ID',
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '알림 생성 시간',
     alarm_check CHAR(1) DEFAULT 'N' COMMENT '알림 확인 여부',

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

-- 비밀번호 변경 토큰
CREATE TABLE tbl_password_token (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expiration DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
    big_category_name
)
VALUES
    (1, '여행'),
    (2, '자기개발'),
    (3, '육아');

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
INSERT INTO tbl_post (post_id, post_title, post_content, post_create_at, user_id, view_count, small_category_id)
VALUES
    (1, '오사카 먹방 여행기 🍜',
     '<p>역사적인 장소를 직접 보니 감회가 새로웠어요.</p><p><img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>계획한 것보다 훨씬 더 즐거운 시간을 보냈어요.</p><h3>여행 팁</h3><ul><li>날씨를 미리 확인하고 준비물 챙기세요.</li><li>사진 찍기 좋은 시간대는 아침과 저녁이에요.</li></ul>',
     '2025-05-21 02:12:38', 10, 55, 5),

    (2, '파리에서의 낭만적인 하루',
     '<p>자연과 도심이 어우러진 멋진 곳이었어요.</p><p><img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>이번 여행은 정말 뜻깊었어요. 현지 음식도 너무 맛있었고 사람들도 친절했어요.</p><h3>여행 팁</h3><ul><li>대중교통 패스를 미리 구매해두면 좋아요.</li><li>현지인 맛집을 사전에 검색해보세요.</li></ul>',
     '2025-05-20 02:12:38', 5, 61, 1),

    (3, '제주도 힐링 코스 추천',
     '<p>여행 중 날씨가 좋아서 사진도 많이 찍었답니다.</p><p><img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>여행 중 날씨가 좋아서 사진도 많이 찍었답니다.</p><h3>여행 팁</h3><ul><li>사진 찍기 좋은 시간대는 아침과 저녁이에요.</li><li>대중교통 패스를 미리 구매해두면 좋아요.</li></ul>',
     '2025-05-19 02:12:38', 6, 129, 2),

    (4, '부산 해운대 일출 후기',
     '<p>역사적인 장소를 직접 보니 감회가 새로웠어요.</p><p><img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>계획한 것보다 훨씬 더 즐거운 시간을 보냈어요.</p><h3>여행 팁</h3><ul><li>사진 찍기 좋은 시간대는 아침과 저녁이에요.</li><li>날씨를 미리 확인하고 준비물 챙기세요.</li></ul>',
     '2025-05-18 02:12:38', 2, 21, 4),

    (5, '도쿄 벚꽃 시즌 여행기',
     '<p>계획한 것보다 훨씬 더 즐거운 시간을 보냈어요.</p><p><img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>계획한 것보다 훨씬 더 즐거운 시간을 보냈어요.</p><h3>여행 팁</h3><ul><li>현지인 맛집을 사전에 검색해보세요.</li><li>날씨를 미리 확인하고 준비물 챙기세요.</li></ul>',
     '2025-05-17 02:12:38', 9, 142, 2),

    (6, '런던에서 만난 비 오는 거리',
     '<p>역사적인 장소를 직접 보니 감회가 새로웠어요.</p><p><img src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>여행 중 날씨가 좋아서 사진도 많이 찍었답니다.</p><h3>여행 팁</h3><ul><li>사진 찍기 좋은 시간대는 아침과 저녁이에요.</li><li>날씨를 미리 확인하고 준비물 챙기세요.</li></ul>',
     '2025-05-16 02:12:38', 10, 121, 5),

    (7, '뉴욕 야경은 정말 끝내줘요',
     '<p>역사적인 장소를 직접 보니 감회가 새로웠어요.</p><p><img src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>이번 여행은 정말 뜻깊었어요. 현지 음식도 너무 맛있었고 사람들도 친절했어요.</p><h3>여행 팁</h3><ul><li>대중교통 패스를 미리 구매해두면 좋아요.</li><li>사진 찍기 좋은 시간대는 아침과 저녁이에요.</li></ul>',
     '2025-05-15 02:12:38', 5, 138, 3),

    (8, '스페인 바르셀로나 여행기',
     '<p>역사적인 장소를 직접 보니 감회가 새로웠어요.</p><p><img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>이번 여행은 정말 뜻깊었어요. 현지 음식도 너무 맛있었고 사람들도 친절했어요.</p><h3>여행 팁</h3><ul><li>현지인 맛집을 사전에 검색해보세요.</li><li>날씨를 미리 확인하고 준비물 챙기세요.</li></ul>',
     '2025-05-14 02:12:38', 2, 49, 1),

    (9, '방콕 야시장 체험기',
     '<p>역사적인 장소를 직접 보니 감회가 새로웠어요.</p><p><img src="https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>여행 중 날씨가 좋아서 사진도 많이 찍었답니다.</p><h3>여행 팁</h3><ul><li>날씨를 미리 확인하고 준비물 챙기세요.</li><li>사진 찍기 좋은 시간대는 아침과 저녁이에요.</li></ul>',
     '2025-05-13 02:12:38', 10, 62, 2),

    (10, '하와이 해변에서의 하루',
     '<p>자연과 도심이 어우러진 멋진 곳이었어요.</p><p><img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>이번 여행은 정말 뜻깊었어요. 현지 음식도 너무 맛있었고 사람들도 친절했어요.</p><h3>여행 팁</h3><ul><li>대중교통 패스를 미리 구매해두면 좋아요.</li><li>날씨를 미리 확인하고 준비물 챙기세요.</li></ul>',
     '2025-05-12 02:12:38', 2, 12, 2),

    (11, '로마 유적지 탐방 후기',
     '<p>이번 여행은 정말 뜻깊었어요. 현지 음식도 너무 맛있었고 사람들도 친절했어요.</p><p><img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>자연과 도심이 어우러진 멋진 곳이었어요.</p><h3>여행 팁</h3><ul><li>날씨를 미리 확인하고 준비물 챙기세요.</li><li>사진 찍기 좋은 시간대는 아침과 저녁이에요.</li></ul>',
     '2025-05-11 02:12:38', 1, 83, 4),

    (12, '베트남 다낭 여행 정보 공유',
     '<p>여행 중 날씨가 좋아서 사진도 많이 찍었답니다.</p><p><img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>자연과 도심이 어우러진 멋진 곳이었어요.</p><h3>여행 팁</h3><ul><li>대중교통 패스를 미리 구매해두면 좋아요.</li><li>사진 찍기 좋은 시간대는 아침과 저녁이에요.</li></ul>',
     '2025-05-10 02:12:38', 2, 40, 3),

    (13, '이탈리아 피렌체 미술관 투어',
     '<p>계획한 것보다 훨씬 더 즐거운 시간을 보냈어요.</p><p><img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>역사적인 장소를 직접 보니 감회가 새로웠어요.</p><h3>여행 팁</h3><ul><li>사진 찍기 좋은 시간대는 아침과 저녁이에요.</li><li>대중교통 패스를 미리 구매해두면 좋아요.</li></ul>',
     '2025-05-09 02:12:38', 3, 55, 1),

    (14, '시드니 오페라하우스 앞에서',
     '<p>역사적인 장소를 직접 보니 감회가 새로웠어요.</p><p><img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>계획한 것보다 훨씬 더 즐거운 시간을 보냈어요.</p><h3>여행 팁</h3><ul><li>현지인 맛집을 사전에 검색해보세요.</li><li>사진 찍기 좋은 시간대는 아침과 저녁이에요.</li></ul>',
     '2025-05-08 02:12:38', 1, 143, 3),

    (15, '싱가포르 여행 꿀팁',
     '<p>이번 여행은 정말 뜻깊었어요. 현지 음식도 너무 맛있었고 사람들도 친절했어요.</p><p><img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>여행 중 날씨가 좋아서 사진도 많이 찍었답니다.</p><h3>여행 팁</h3><ul><li>현지인 맛집을 사전에 검색해보세요.</li><li>날씨를 미리 확인하고 준비물 챙기세요.</li></ul>',
     '2025-05-07 02:12:38', 7, 70, 1),

    (16, '홍콩 딤섬 맛집 추천',
     '<p>이번 여행은 정말 뜻깊었어요. 현지 음식도 너무 맛있었고 사람들도 친절했어요.</p><p><img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>이번 여행은 정말 뜻깊었어요. 현지 음식도 너무 맛있었고 사람들도 친절했어요.</p><h3>여행 팁</h3><ul><li>대중교통 패스를 미리 구매해두면 좋아요.</li><li>현지인 맛집을 사전에 검색해보세요.</li></ul>',
     '2025-05-06 02:12:38', 4, 43, 2),

    (17, '대만 야시장 음식 후기',
     '<p>역사적인 장소를 직접 보니 감회가 새로웠어요.</p><p><img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>이번 여행은 정말 뜻깊었어요. 현지 음식도 너무 맛있었고 사람들도 친절했어요.</p><h3>여행 팁</h3><ul><li>대중교통 패스를 미리 구매해두면 좋아요.</li><li>사진 찍기 좋은 시간대는 아침과 저녁이에요.</li></ul>',
     '2025-05-05 02:12:38', 6, 22, 4),

    (18, '말레이시아 코타키나발루 리조트 체험기',
     '<p>이번 여행은 정말 뜻깊었어요. 현지 음식도 너무 맛있었고 사람들도 친절했어요.</p><p><img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>역사적인 장소를 직접 보니 감회가 새로웠어요.</p><h3>여행 팁</h3><ul><li>사진 찍기 좋은 시간대는 아침과 저녁이에요.</li><li>현지인 맛집을 사전에 검색해보세요.</li></ul>',
     '2025-05-04 02:12:38', 5, 111, 1),

    (19, '필리핀 세부 스노클링 후기',
     '<p>역사적인 장소를 직접 보니 감회가 새로웠어요.</p><p><img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>계획한 것보다 훨씬 더 즐거운 시간을 보냈어요.</p><h3>여행 팁</h3><ul><li>대중교통 패스를 미리 구매해두면 좋아요.</li><li>사진 찍기 좋은 시간대는 아침과 저녁이에요.</li></ul>',
     '2025-05-03 02:12:38', 8, 20, 5),

    (20, '미국 LA 한인타운 방문기',
     '<p>계획한 것보다 훨씬 더 즐거운 시간을 보냈어요.</p><p><img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" alt="여행 이미지" /></p><p>이번 여행은 정말 뜻깊었어요. 현지 음식도 너무 맛있었고 사람들도 친절했어요.</p><h3>여행 팁</h3><ul><li>대중교통 패스를 미리 구매해두면 좋아요.</li><li>날씨를 미리 확인하고 준비물 챙기세요.</li></ul>',
     '2025-05-02 02:12:38', 10, 150, 5);


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


-- 신고 더미 데이터
INSERT INTO tbl_reports
(reporter_id, reported_id, post_id, comment_id, reports_create_at, reason_code, reason_detail, reports_status)
VALUES
(2, 3, 2, NULL, '2025-01-15 10:30:00',
 'ABUSE',
 '해당 게시글에는 비속어 및 공격적인 표현이 반복적으로 사용되어 있어 다른 사용자에게 불쾌감을 줄 수 있습니다. 검토 부탁드립니다.',
 '신고접수'),
(4, 5, 5, NULL, '2025-02-02 14:10:00',
 'SPAM',
 '짧은 시간 안에 동일한 내용을 여러 번 게시하여 도배로 의심되며, 커뮤니티 이용에 불편을 주고 있습니다.',
 '신고접수'),
(6, 7, 8, NULL, '2025-02-20 18:45:00',
 'FALSE_INFO',
 '게시글 내에 타인의 명예를 훼손할 수 있는 허위 정보가 포함되어 있습니다. 확인 후 조치가 필요해 보입니다.',
 '처리완료'),
(8, 9, NULL, 3, '2025-03-03 09:05:00',
 'PRIVACY',
 '댓글에 본인의 전화번호와 이메일이 노출되어 있어 개인정보 유출 우려가 있습니다. 빠른 조치 부탁드립니다.',
 '신고접수'),
(10, 4, NULL, 5, '2025-03-22 16:30:00',
 'HARASSMENT',
 '댓글에서 특정 사용자를 지속적으로 비난하고 있어 사이버 불링으로 판단됩니다. 심각한 상황입니다.',
 '처리완료');


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
INSERT INTO tbl_alarm (alarm_type, user_id, post_id, comment_id, likes_id, alarm_check)
VALUES
    -- 댓글 알림 (comment_id: 1~10)
    ('COMMENT', 1, 1, 1, NULL, 'N'),
    ('COMMENT', 2, 1, 2, NULL, 'Y'),
    ('COMMENT', 3, 2, 3, NULL, 'N'),
    ('COMMENT', 4, 3, 4, NULL, 'N'),
    ('COMMENT', 5, 4, 5, NULL, 'Y'),
    ('COMMENT', 6, 5, 6, NULL, 'N'),
    ('COMMENT', 7, 6, 7, NULL, 'N'),
    ('COMMENT', 8, 7, 8, NULL, 'Y'),
    ('COMMENT', 9, 8, 9, NULL, 'N'),
    ('COMMENT', 10, 10, 10, NULL, 'N'),

    -- 좋아요 알림 (likes_id: 1~25)
    ('LIKE', 1, 1, NULL, 1, 'N'),
    ('LIKE', 2, 2, NULL, 2, 'Y'),
    ('LIKE', 3, 3, NULL, 3, 'N'),
    ('LIKE', 4, 4, NULL, 4, 'N'),
    ('LIKE', 5, 5, NULL, 5, 'Y'),
    ('LIKE', 6, 6, NULL, 6, 'N'),
    ('LIKE', 7, 7, NULL, 7, 'N'),
    ('LIKE', 8, 8, NULL, 8, 'Y'),
    ('LIKE', 9, 9, NULL, 9, 'N'),
    ('LIKE', 10, 10, NULL, 10, 'N'),
    ('LIKE', 10, 11, NULL, 11, 'Y'),
    ('LIKE', 1, 12, NULL, 12, 'N'),
    ('LIKE', 2, 13, NULL, 13, 'N'),
    ('LIKE', 3, 14, NULL, 14, 'Y'),
    ('LIKE', 4, 15, NULL, 15, 'N'),
    ('LIKE', 5, 16, NULL, 16, 'Y'),
    ('LIKE', 6, 17, NULL, 17, 'N'),
    ('LIKE', 7, 18, NULL, 18, 'Y'),
    ('LIKE', 8, 19, NULL, 19, 'N'),
    ('LIKE', 9, 20, NULL, 20, 'N');

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
    (28, '서핑', 20),
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
    (49, '온천', 20),
    (50, '자바', 1);