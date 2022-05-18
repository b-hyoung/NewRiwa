Error_table = {
	1 : "입력이 유효하지 않습니다.",
	2 : "유효하지 않은 유저명입니다.",
	3 : "비밀번호가 유효하지않습니다.",
	4 : "등록할 수 없는 유저입니다.",
	5 : "등록된적 없는 유저입니다.",
	6 : "입력된 유저입니다. put메소드로 갱신해주세요",
	101 : "DB에 해당하는 것이 없습니다"
}



def error_msg(msg_num):
	msg = Error_table[msg_num]
	return {"error_msg" : msg}

