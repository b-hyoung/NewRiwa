from .ER_DB import ER_char_img
from Eriwa.settings import STATIC_URL

def get_ER_char_image(charcode:int):
	return ("image/Char/icon/" + ER_char_img[charcode])