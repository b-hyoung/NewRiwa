## Api 요청이 오면 데이터를 처리 후 응답을 반환
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import MessageSerializer

class HelloAPI(APIView):
    def get(self, request):
        data = {"message": "Hello from Django!"}
        serializer = MessageSerializer(data)
        return Response(serializer.data)