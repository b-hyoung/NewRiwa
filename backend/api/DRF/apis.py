from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets, status

from api.error_utils import error_msg
from api.DRF.User_serializers import UserStatsSerializer, UserStatsSerializerCreateSerializer, UserInfoSerializer, UserInfoCreateSerializer
from api.ER_utils.ER_DB_utils_image import get_ER_ItemsImg, get_ER_charicon_image
from api.ER_utils.ER_DB_utils_transfom import get_ER_char_name
from api.DRF.apis_utils import set_userinfo_serializers_data, set_usergame_serializers_data

from .Game_serializers import  UserGameRecordCreateSerializer, UserGameRecordSerializer
from ..models import ER_Stats_Model, ER_User_Info_Model, ER_Game_Record_Model

class UserStatsViewSet(viewsets.ModelViewSet):
	queryset  = ER_Stats_Model.objects.all()
	serializer_class = UserStatsSerializer

	def list(self, request, *args, **kwargs):
		msg = "검색창입니다."
		return Response({"msg" : msg}, status=status.HTTP_400_BAD_REQUEST)

	def create(self, request):
		serializer = UserStatsSerializerCreateSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn:
				return Response(UserStatsSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(1), status=status.HTTP_400_BAD_REQUEST)

	def retrieve(self, request, pk=None):
		user = get_object_or_404(ER_User_Info_Model, inckname=pk)
		if user:
			serializer = UserInfoSerializer(user)
			return Response(serializer.data, status=status.HTTP_200_OK)
		else:
			self.create(request)
		queryset = ER_User_Info_Model.objects.filter(nickname=pk).last()
		if queryset:
			serializer = UserInfoSerializer(queryset)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(5), status=status.HTTP_404_NOT_FOUND)

class UserInfoViewSet(viewsets.ModelViewSet):
	queryset = ER_User_Info_Model.objects.filter().order_by("-id")
	serializer_class = UserInfoSerializer

	def list(self, request, *args, **kwargs):
		msg = "검색창입니다."
		return Response({"msg" : msg}, status=status.HTTP_200_OK)

	def create(self, request):
		try:
			ER_User_Info_Model.objects.get(nickname=request.data["nickname"])
		except:
			serializer = UserInfoCreateSerializer(data=request.data)
			if serializer.is_valid():
				rtn = serializer.create(request, serializer.data)
				if rtn:
					api = UserInfoSerializer(rtn).data
					set_userinfo_serializers_data(api, rtn)
					return Response(api, status=status.HTTP_201_CREATED)
				else :
					return Response(error_msg(1), status=status.HTTP_400_BAD_REQUEST)
		else:
			return Response(error_msg(6), status=status.HTTP_400_BAD_REQUEST)

	def retrieve(self, request, pk=None):
		user = get_object_or_404(ER_User_Info_Model, nickname=pk)
		if user:
			api = UserInfoSerializer(user).data
			set_userinfo_serializers_data(api, user)
			return Response(api, status=status.HTTP_200_OK)
		else:
			return Response(error_msg(5), status=status.HTTP_404_NOT_FOUND)

class UserGameViewSet(viewsets.ModelViewSet):
	queryset = ER_Game_Record_Model.objects.filter().order_by("-id")
	serializer_class = UserGameRecordSerializer

	def list(self, request, *args, **kwargs):
		msg = "검색창입니다."
		return Response({"msg" : msg}, status=status.HTTP_200_OK)
	
	#POST
	def create(self, request):
		serializer = UserGameRecordCreateSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn:
				api = {}
				for i, data in enumerate(rtn):
					api[i] = UserGameRecordSerializer(data).data
					set_usergame_serializers_data(api, data, i)
				return Response(api, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(1), status=status.HTTP_400_BAD_REQUEST)

	def retrieve(self,request, pk=None):
		queryset = ER_Game_Record_Model.objects.filter(nickname=pk).order_by("-id")[:20]
		if queryset:
			api = {}
			for i, data in enumerate(queryset):
				api[i] = UserGameRecordSerializer(data).data
				set_usergame_serializers_data(api, data, i)
			return Response(api, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(5), status=status.HTTP_404_NOT_FOUND)

	def update(self, request, pk=None):
		serializer = UserGameRecordCreateSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn:
				temp = {}
				for i, data in enumerate(rtn):
					temp[i] = UserGameRecordSerializer(data).data 
				return Response(temp, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(1), status=status.HTTP_400_BAD_REQUEST)