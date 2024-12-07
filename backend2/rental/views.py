from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import api_view,authentication_classes
# Create your views her
from rest_framework.decorators import permission_classes,api_view
from rest_framework.authentication import TokenAuthentication
from .models import User
from .serializer import UserSerializer

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Authenticate admin user using username and password
            # admin_username = serializer.validated_data['AdminUsername']
            # admin_password = serializer.validated_data['AdminPassword']
            # admin_instance = authenticate(username=admin_username, password=admin_password)
            # if not admin_instance:
            #     return Response({"Error": 'Incorrect Admin credentials'}, status=status.HTTP_400_BAD_REQUEST)

            # # Create a new user if the admin is authenticated
            # if not admin_instance.is_superuser:
            #     return Response({"Error": 'You are not Allowed to perform the operation'}, status=status.HTTP_403_FORBIDDEN)

            user = User.objects.create_user(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password'],
                is_Admin=serializer.validated_data['is_Admin'],
                # email=serializer.validated_data['email']
            )

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            user_data = {
                "username": user.username,
                "isAdmin": user.is_Admin,
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }

            return Response(user_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)