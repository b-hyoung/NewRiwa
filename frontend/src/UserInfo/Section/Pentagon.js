import React, { useMemo } from 'react';
import './css/pentagon.css';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// 랭크 등급을 숫자 값으로 변환하는 헬퍼 함수
// S=100, A+=90, A=80, B+=70, B=60, C+=50, C=40, D=30, F=0
const convertRankToValue = (rank) => {
    switch (rank) {
        case "S": return 100;
        case "A+": return 90;
        case "A": return 80;
        case "B+": return 70;
        case "B": return 60;
        case "C+": return 50;
        case "C": return 40;
        case "D": return 30;
        case "F": return 0;
        default: return 0; // 기본값
    }
};

const CustomTick = ({ payload, x, y, cx, cy, angle }) => {
    const { value, grade } = payload;
    const offset = 25; // Distance from the tick mark, tune this for better spacing

    let textAnchor = 'middle';
    // If x is to the right of the center, anchor to start (text flows right)
    if (x > cx + 5) { // +5 to give a small buffer
        textAnchor = 'start';
    }
    // If x is to the left of the center, anchor to end (text flows left)
    else if (x < cx - 5) { // -5 to give a small buffer
        textAnchor = 'end';
    }
    // Otherwise, it's near the center vertical axis, so middle anchor

    // Calculate position with offset from the original tick (x, y)
    // The angle from Recharts is typically clockwise from 3 o'clock.
    const angleRad = angle * Math.PI / 180;
    const dx = Math.cos(angleRad) * offset;
    const dy = Math.sin(angleRad) * offset;

    return (
        <g>
            {/* Display grade (rank) */}
            <text x={x + dx} y={y + dy - 5} textAnchor={textAnchor} fill="#F4EFEA" fontWeight="bold">
                {grade}
            </text>
            {/* Display value (subject name) */}
            <text x={x + dx} y={y + dy + 5} textAnchor={textAnchor} fill="#F4EFEA" fontSize="12px">
                {value}
            </text>
        </g>
    );
};

function Pentagon({ name, infoTier, dataUser, usertier }) {

    // For now, we'll use a placeholder stats object until `dataUser` prop is populated.
    // This structure mirrors the old `userInfo` state for consistency.
    const userStats = {
        nickName: dataUser.nickname || "김밥님",
        tier: usertier || "Platinum",
        avgRank: "S",
        avgKill: "C",
        avgDamage: "A",
        avgWeapon: "B",
        avgHunt: "D"
    };

    // useMemo helps to avoid re-calculating the chart data on every render,
    // unless the underlying userStats change.
    const chartData = useMemo(() => {
        if (!userStats) return [];
        return [
            { subject: '순위', value: convertRankToValue(userStats.avgRank), grade: userStats.avgRank, fullMark: 100 },
            { subject: '킬', value: convertRankToValue(userStats.avgKill), grade: userStats.avgKill, fullMark: 100 },
            { subject: '가한 피해량', value: convertRankToValue(userStats.avgDamage), grade: userStats.avgDamage, fullMark: 100 },
            { subject: '무기 숙련도', value: convertRankToValue(userStats.avgWeapon), grade: userStats.avgWeapon, fullMark: 100 },
            { subject: '헌트', value: convertRankToValue(userStats.avgHunt), grade: userStats.avgHunt, fullMark: 100 },
        ];
    }, [userStats]);

    return (
        <div className="pentagon">

            {/* CSS 절대 위치를 사용하는 기존 레이블 구조를 유지 */}


            {/* Recharts 레이더 차트 */}
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius={90} // Fixed radius to match original visual scale
                    data={chartData}
                >
                    <PolarGrid stroke="#bebebe" />
                    {/* 각도 축의 텍스트 레이블을 숨깁니다 (CSS로 처리) */}
                    <PolarAngleAxis dataKey="subject" tick={<CustomTick />} startAngle={270} endAngle={-90} />
                    {/* 반지름 축의 선과 텍스트를 숨깁니다 */}
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="User Stats"
                        dataKey="value"
                        stroke="rgb(119, 126, 88)"
                        fill="rgb(161, 239, 255)"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default Pentagon;