import React from 'react'

function Char_Ability() {
  return (
    <div className='char_ability'>
        <div className='abil_first'>
        <div>특성 위치 77.5%</div>
            <div>

            </div>
        </div>
        <div className='abil_second'>
            <div>특성 위치 77.5%</div>
            <div>
                
            </div>
        </div>
        {/* */}
        <div className='red_Main'>
            <div>Havoc 파괴</div> {/* 12시 메인이미지 */}
            <div>Frailty Infliction 취약</div> {/* 중앙 핵심 특성 4가지 */}
            <div>Stopping Power 철갑탄</div> {/* 그 외 ↓ 12시 기준 반 시계방향 */}
            <div>Vengeance 복수자</div>
            <div>Spirit Culling 수확</div>
            <div>Quench 갈증</div>
            <div>Dismantle Goliath 열세 극복</div>
            <div>Anima Reaper 영혼 흡수장치</div>
        </div>
        <div className='blue_Main'>
            <div>Fortification 저항</div> {/* 12시 메인이미지 */}
            <div>Diamond Shard 금강</div> {/* 중앙 핵심 특성 */}
            <div>Embolden 대담</div> 
            <div>Cavalcade 특공대</div>
            <div>Dulled Blades 둔감</div>
            <div>Steadfast 견고</div>
            <div>Reinforced Armor 중장갑</div>
        </div>
        <div className='green_Main'>
            <div>Support 지원</div> {/* 12시 메인이미지 */}
            <div>Amplification Drone 증폭 드론</div> {/* 중앙 핵심 특성 */}
            <div>Thorn Shackles 가시덤불</div> 
            <div>Assembly 집결</div>
            <div>Theia 테이아</div>
            <div>Logistics 후방 보급</div>
            <div>Urban Warfare 시가전</div>
            <div>Head Starter 스프린터</div>
        </div>
        {/* */}
        <div className='red_Sub'>
            <div>Havoc 파괴</div> {/* 6시 메인이미지 */}
            <div>Anima Reaper 영혼 흡수장치</div>
            <div>Dismantle Goliath 열세 극복</div>
            <div>Quench 갈증</div>
            <div>Spirit Culling 수확</div>
            <div>Vengeance 복수자</div>
            <div>Stopping Power 철갑탄</div> {/* 그 외 ↓ */}
        </div>
        <div className='blue_Sub'>
        <div></div>
            <div></div> {/* 6시 메인이미지 */}
            <div>Reinforced Armor 중장갑</div>
            <div>Steadfast 견고</div>
            <div>Dulled Blades 둔감</div>
            <div>Cavalcade 특공대</div>
            <div>Embolden 대담</div> 
        </div>
        <div className='green_Sub'>
            <div></div> {/* 6시 메인이미지 */}
            <div>Head Starter 스프린터</div>
            <div>Urban Warfare 시가전</div>
            <div>Logistics 후방 보급</div>
            <div>Theia 테이아</div>
            <div>Assembly 집결</div>
            <div>Thorn Shackles 가시덤불</div> 
        </div>
        {/* */}
    </div>
  )
}

export default Char_Ability