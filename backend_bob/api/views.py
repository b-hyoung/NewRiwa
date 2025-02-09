## Api 요청이 오면 데이터를 처리 후 응답을 반환
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import status
from .serializers import MessageSerializer,UserSerializer
import json
from django.http import JsonResponse
from django.views import View
import os

class HelloAPI(APIView):
    def get(self, request):
        data = {"message": "Hello from Django!"}
        serializer = MessageSerializer(data)
        return Response(serializer.data)
    
## 해당 맥에서 유저 정보를 가져올 떄 사용
#class UserInfoApi(APIView):
        def get(self,request):
            username = request.GET.get('username') # 쿼리에서 username 받아오기
        
            ## 유저이름이 존재하지 않을 때
            if not username :
                return Response({"error" : "UserName parameter is required"},
                        status=status.Http_400_BAD_RQUEST)
            
            try :
                 user = User.objects.get(username=username) # 해당 username을 가진 유저 찾기
                 serializer = UserSerializer(user) # 유저 정보를 Json으로 반환
                 return Response(serializer.data,status=status.HTTP_200_OK)
            #해당 유저가 없다면 404 Not FOund 반환
            except User.DoesNotExist:
                 return Response({"error" : "User not found"},status=status.HTTP_404_NOT_FOUND)
            
## 파일로 불러오기
class UserInfoFromJsonAPI(View):
    def get(self,request):
        #Url 파라미터로 'name'받아오기
        user_name=request.GET.get('username')

    # JSON 파일 경로 설정
        file_path = os.path.join('api','data','users.json')
        print("File Path" , file_path)
        #json 파일을 데이터 읽기
        try :
            with open(file_path,'r') as file:
                data = json.load(file)
        except FileNotFoundError:
            return JsonResponse({'error' : "JSON File not found"},status=404)
        
        # 이름으로 유저 찾기
        user = next((user for user in data if user['username'].lower() == user_name.lower()),None)

        if user :
            return JsonResponse(user)
        else:
            return JsonResponse({'error' : 'User not found'} , status=404)