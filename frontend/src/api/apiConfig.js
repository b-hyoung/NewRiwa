// src/api/apiConfig.js

const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * 사용자 정보(UserInfo) 관련 API
 */
export const USER_INFO_API = {
    /**
     * 사용자 정보 생성 (POST)
     * 사용처: MainPage.js, UserInfoPage.js
     */
    CREATE: `${API_BASE_URL}/UserInfo/`,

    /**
     * 특정 사용자 정보 조회 (GET)
     * 사용처: UserInfoPage.js
     * @param {string} nickname - 조회할 사용자 닉네임
     */
    GET: (nickname) => `${API_BASE_URL}/UserInfo/${nickname}/`,

    /**
     * 팀 모드별 사용자 정보 조회 (GET)
     * 사용처: User_Stat.js
     * @param {string} nickname - 조회할 사용자 닉네임
     * @param {string|number} teamMode - 팀 모드 (1: 솔로, 2: 듀오, 3: 스쿼드)
     */
    GET_BY_TEAM_MODE: (nickname, teamMode) => `${API_BASE_URL}/UserInfo/${nickname}/?matchingTeamMode=${teamMode}`,

    /**
     * @deprecated - GET_BY_TEAM_MODE를 사용하는 것을 권장합니다.
     * 팀 모드별 사용자 정보 생성 (POST)
     * 사용처: User_Stat.js
     * @param {string|number} teamMode - 팀 모드
     */
    CREATE_BY_TEAM_MODE: (teamMode) => `${API_BASE_URL}/UserInfo/?matchingTeamMode=${teamMode}`,
};

/**
 * 사용자 게임 기록(UserGameRecord) 관련 API
 */
export const USER_GAME_RECORD_API = {
    /**
     * 사용자 게임 기록 생성 (POST)
     * 사용처: UserInfoPage.js
     */
    CREATE: `${API_BASE_URL}/UserGameRecord/`,

    /**
     * 특정 사용자 게임 기록 조회 (GET)
     * 사용처: Headers.js
     * @param {string} nickname - 조회할 사용자 닉네임
     */
    GET: (nickname) => `${API_BASE_URL}/UserGameRecord/${nickname}/`,
};

/**
 * 사용자 스탯(UserStats) 관련 API
 */
export const USER_STATS_API = {
    /**
     * 랭크별 티어 정보 조회 (POST)
     * 사용처: UserInfoPage.js
     */
    GET_BY_RANK: `${API_BASE_URL}/UserStats/`,
};

/**
 * @deprecated - 형식이 일관되지 않아 사용을 권장하지 않습니다. USER_INFO_API.GET을 사용하세요.
 * 사용자 정보 조회 (GET)
 * 사용처: UserInfoPage.js (상단 useEffect)
 */
export const DEPRECATED_USER_INFO_API_GET = (nickname) => `http://127.0.0.1:8000/api/userinfo/?username=${nickname}`;
