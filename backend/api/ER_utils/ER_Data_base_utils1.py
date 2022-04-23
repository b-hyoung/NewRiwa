from .ER_Data_base import ER_char_img
from Eriwa.settings import STATIC_URL
def get_ER_char_image(charcode:int):
	return (STATIC_URL + "image/Char/icon/" + ER_char_img[charcode])