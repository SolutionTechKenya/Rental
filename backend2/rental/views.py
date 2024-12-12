from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import api_view,authentication_classes
from rest_framework.decorators import permission_classes,api_view
from rest_framework.authentication import TokenAuthentication
from .models import User, Tenant, Building, Room
from .serializer import UserSerializer, TenantSerializer

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
    
class AddTenant(generics.CreateAPIView):
    queryset = Tenant.objects.all()
    permission_classes = [AllowAny]
    serializer_class = TenantSerializer
    
    def get(self, request, *args, **kwargs):
        owner_id = request.user.id
        print(owner_id)
        # Fetch all buildings owned by the user
        buildings = Building.objects.filter(owner=owner_id)
        for building in buildings:
            print(building)
        # Correctly collect all rooms across buildings
        rooms = Room.objects.filter(building__in=buildings)
        for room in rooms:
            print('ndesa',room.id)
        # Collect all tenants in those rooms
        
        tenants = Tenant.objects.filter(room__in=rooms)
        for tenant in tenants:
            print('Alpha',tenant.id)
        
        # Serialize the tenants (note: no data= parameter)
        serializer = self.get_serializer(tenants, many=True)
        
        return Response({
            "tenants": serializer.data,
            "count": tenants.count(),
        }, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        print(request.data)  # Log the incoming request data
        data = request.data.copy()
        instance = Room.objects.get(room_no = data['room'])
        data["room"] = instance.id
        print(data)
        serializer = self.get_serializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            print("Added 1 tenant")
            return Response({"message": "success"}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Log validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
        
