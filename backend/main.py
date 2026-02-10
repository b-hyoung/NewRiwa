# backend/main.py
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 설정: frontend(http://localhost:3000)에서의 요청을 허용하기 위함
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 앱의 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def read_root():
    return {"Hello": "World"}

@app.get("/api/test")
def test_endpoint():
    return {"message": "Test endpoint is working!"}

# 실제 이터널 리턴 API의 URL (가정)
ETERNAL_RETURN_API_URL = "https://open-api.bser.io/v1" 
# 이 부분은 실제 이터널리턴 개발자 API 문서를 확인하고 수정해야 합니다.
# API_KEY = "YOUR_ETERNAL_RETURN_API_KEY" 

@app.get("/api/UserInfo/{nickname}/")
async def get_user_info(nickname: str):
    # 지금은 실제 API 연동 전에 가짜(mock) 데이터를 반환하도록 만들어봅시다.
    mock_data = {
        "user": {
            "nickname": nickname,
            "level": 50,
        },
        "stats": [
            {"season": "10", "tier": "Gold", "lp": 50},
            {"season": "9", "tier": "Platinum", "lp": 120},
        ],
        "most_played_characters": [
            {
                "krChar": "알렉스",
                "char": "Alex",
                "games": "78",
                "winning": "12.3",
                "kda": "3.5"
            },
            {
                "krChar": "쇼이치",
                "char": "Shoichi",
                "games": "53",
                "winning": "7.3",
                "kda": "2.3"
            },
            {
                "krChar": "유키",
                "char": "Yuki",
                "games": "32",
                "winning": "4.2",
                "kda": "1.76"
            }
        ]
    }
    
    # 실제 API 연동 시에는 아래와 같은 코드를 사용하게 됩니다. (httpx 사용)
    # async with httpx.AsyncClient() as client:
    #     try:
    #         # user_search_url = f"{ETERNAL_RETURN_API_URL}/user/nickname?query={nickname}"
    #         # headers = {"x-api-key": API_ETERNAL_RETURN_KEY} 
    #         # res = await client.get(user_search_url, headers=headers)
    #         # res.raise_for_status() # 오류가 있으면 예외 발생
    #         # user_data = res.json()
    #         # ... 추가적인 API 호출 ...
    #         return mock_data # 최종적으로 프론트에 전달할 데이터
    #     except httpx.HTTPStatusError as e:
    #         raise HTTPException(status_code=e.response.status_code, detail="Failed to fetch data from Eternal Return API")

    return mock_data