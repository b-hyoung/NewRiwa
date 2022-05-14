from rest_framework.response import Response
from rest_framework import viewsets, status

from api.error_utils import error_msg
from api.DRF.User_serializers import UserStatsSerializer, UserStatsSerializerCreateSerializer, UserInfoSerializer, UserInfoCreateSerializer
from api.DRF.Base_serialzers import MostpickSerializer
from api.ER_utils.ER_Serializer_setter import set_mostpick_Serializer
# from api.ER_utils.ER_API_setter import set_ER_items_image

from .Game_serializers import  UserGameRecordCreateSerializer, UserGameRecordSerializer
from ..models import ER_Stats_Model, ER_User_Info_Model, ER_Game_Record_Model

class UserStatsViewSet(viewsets.ModelViewSet):
	queryset  = ER_Stats_Model.objects.all()
	serializer_class = UserStatsSerializer

	def list(self, request, *args, **kwargs):
		queryset = self.get_queryset()
		serializer = UserStatsSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def create(self, request):
		serializer = UserStatsSerializerCreateSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn:
				return Response(UserStatsSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(1), status=status.HTTP_400_BAD_REQUEST)

	def retrieve(self, request, pk=None):
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
		msg = "의미없는 창 입니다"
		return Response({"msg" : msg}, status=status.HTTP_400_BAD_REQUEST)

	def create(self, request):
		serializer = UserInfoCreateSerializer(data=request.data)
		if serializer.is_valid():
			#리디렉트
			# nickname = serializer.data.get("nickname")
			# if ER_User_Info_Model.objects.filter(nickname=nickname):
			# 	return(self.retrieve(request, nickname))
			rtn = serializer.create(request, serializer.data)
			if rtn:
				temp = UserInfoSerializer(rtn).data
				temp["mostpick"] = set_mostpick_Serializer(rtn.mostpick)
				return Response(temp, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(1), status=status.HTTP_400_BAD_REQUEST)

	def retrieve(self, request, pk=None):
		queryset = ER_User_Info_Model.objects.filter(nickname=pk).last()
		if queryset:
			serializer = UserInfoSerializer(queryset)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(5), status=status.HTTP_404_NOT_FOUND)

class UserGameViewSet(viewsets.ModelViewSet):
	queryset = ER_Game_Record_Model.objects.filter().order_by("-id")
	serializer_class = UserGameRecordSerializer

	def list(self, request, *args, **kwargs):
		msg = "의미없는 창 입니다"
		return Response({"msg" : msg}, status=status.HTTP_400_BAD_REQUEST)
	
	#POST
	def create(self, request):
		serializer = UserGameRecordCreateSerializer(data=request.data)
		if serializer.is_valid():

			nickname = serializer.data.get("nickname")
			if ER_Game_Record_Model.objects.filter(nickname=nickname):
				return(self.retrieve(request, nickname))

			rtn = serializer.create(request, serializer.data)
			if rtn:
				temp = {}
				for i, data in enumerate(rtn):
					temp[i] = UserGameRecordSerializer(data).data
					# temp[i]["itemImage"] = set_ER_items_image(temp[i]["items"])
				return Response(temp, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(1), status=status.HTTP_400_BAD_REQUEST)

	def retrieve(self,request, pk=None):
		queryset = ER_Game_Record_Model.objects.filter(nickname=pk).order_by("-id")[:20]
		if queryset:
			temp = {}
			for i, data in enumerate(queryset):
				temp[i] = UserGameRecordSerializer(data).data 
			return Response(temp, status=status.HTTP_201_CREATED)
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