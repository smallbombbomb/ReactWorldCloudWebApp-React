#e단어 구름
from wordcloud import WordCloud
# 한국어 자연어 처리 라이브러리
from konlpy.tag import Twitter
# 명사의 출현 빈도
from collections import Counter
# 그래프 생성
import matplotlib.pyplot as plt
# Flask 웹 서버 구축
from flask import Flask, request, jsonify

# 플라스크 웹 서버 객체 생성
app = Flask(__name__)

# 폰트 경로 설정
font_path = 'NanumGothic.ttf'

def get_tags(text, max_count, min_length):
    #명사만 추출
    t = Twitter()
    nouns = t.nouns(text)
    processed = [n for n in nouns if len(n) >= min_length]
    #모든 명사 출현 빈도 계산
    count = Counter(processed)
    result = {}
    #출현 빈도가 높은 max_count개 명사 추출
    for n, c in count.most_common(max_count):
        result[n] = c
    #추출된 단어가 하나도 없으면 '내용 없음'
    if len(result) == 0:
        result["내용이 없습니다"] = 1
    return result


    def make_cloud_image(tags, file_name):
        #만들 워드 클라우드 기본설정
        word_cloud = WordCloud(
            font_path=font_path,
            width=800,
            height=800,
            background_color="white",
        )
        # 추출된 단어 빈도수 목록 이용해 WordCloud  객체 초기화
        word_cloud = word_cloud.generate_from_frequencies(tags)
        #워드 클라우드 이미지로 그림