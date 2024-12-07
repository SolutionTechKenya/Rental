from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['password','username','is_Admin']
        extra_kwargs={'password':{'write_only':True}}
        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Get the default token
        token = super().get_token(user)
        
        # Add custom claims
        #adding aditional information to the token
        # token['username'] = user.username
        # token['email'] = user.email
        
        return token
    
    def validate(self, attrs):
        # Get the default validation data
        try:
            # Attempt default validation
            data = super().validate(attrs)
        except (InvalidToken, TokenError) as e:
            # Custom error handling
            raise serializers.ValidationError({
                'status': 'error',
                'message': 'Invalid credentials',
                'details': str(e)
            })
        
        # Add additional user information to the response
        user = self.user
        # if not user.is_superuser:
        #        raise serializers.ValidationError({
        #         'status': 'error',
        #         'message': 'Invalid credentials',
        #     })
        data.update({
            'isAdmin':user.is_Admin,
            'username':user.username
        })
        print(data)
        
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer  
    
    
    
          