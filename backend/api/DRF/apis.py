from django.http import Http404

from rest_framework.response import Response
from rest_framework import viewsets, status, exceptions

from api.error_utils import error_msg

from .serializers import  UserDataCreateSerializer, UserDataSerializer, UserGameRecordCreateSerializer, UserGameRecordSerializer
from ..models import ER_User_Info_Model, ER_Game_Record

class UserDataViewSet(viewsets.ModelViewSet):
	queryset = ER_User_Info_Model.objects.filter().order_by("-id")
	serializer_class = UserDataSerializer

	#POST
	def create(self, request):
		serializer = UserDataCreateSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn:
				return Response(UserDataSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(1), status=status.HTTP_400_BAD_REQUEST)

	#GET
	def list(self, request, *args, **kwargs):
		queryset = self.get_queryset()[:20]
		if not queryset:
			error_msg = "데이터가 없습니다~"
			return Response({"msg" : error_msg}, status=status.HTTP_400_BAD_REQUEST)
		serializer = UserDataSerializer(queryset, many=True)
		return Response(serializer.data)

	#PUT
	def update(self, request, pk=None):
		serializer = UserDataCreateSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.change(request, serializer.data, pk)
			return Response(UserDataSerializer(rtn).data, status=status.HTTP_201_CREATED)
		else :
			return Response({"msg" : "입력이 유효하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)

	#DELETE
	def destroy(self, request,  pk=None,):
		remove_password = request.query_params.get("remove_password",None)
		queryset = self.get_queryset().filter(id=pk, remove_password = remove_password)
		
		if not queryset.exists():
			raise exceptions.ValidationError(error_msg(3),code=400)
		queryset.delete()
		return Response({"msg": "ok"})

class UserGameViewSet(viewsets.ModelViewSet):
	queryset = ER_Game_Record.objects.filter().order_by("-id")
	serializer_class = UserGameRecordSerializer

	#? 이건 의미없을듯? 일단 보류하자
	def list(self, request, *args, **kwargs):
		msg = "의미없는 창 입니다"
		return Response({"msg" : msg}, status=status.HTTP_400_BAD_REQUEST)
	
	def retrieve(self,request, pk=None):
		queryset = ER_Game_Record.objects.filter(nickname=pk).order_by("-id")[:20]
		if queryset:
			temp = {}
			for i, data in enumerate(queryset):
				temp[i] = UserGameRecordSerializer(data).data 
			return Response(temp, status=status.HTTP_201_CREATED)
		else :
			print(pk)
			return Response(error_msg(5), status=status.HTTP_404_NOT_FOUND)

	#POST
	def create(self, request):
		serializer = UserGameRecordCreateSerializer(data=request.data)
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn:
				#여기서 rtn을반복문을 돌면서 UserDataSerializer(rtn).data 이걸 json으로 만들자
				temp = {}
				for i, data in enumerate(rtn):
					temp[i] = UserGameRecordSerializer(data).data 
				return Response(temp, status=status.HTTP_201_CREATED)
		else :
			return Response(error_msg(1), status=status.HTTP_400_BAD_REQUEST)

