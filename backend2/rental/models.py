from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
from django.utils import timezone

class User(AbstractUser):
    is_Admin=models.BooleanField(default=False)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username
    
class Owner(User):
    name=models.CharField(max_length=100)
    phone=models.CharField(max_length=10)
    

    
    def __str__(self):
        return self.name
    
class Building(models.Model):
    owner=models.ForeignKey(Owner,on_delete=models.CASCADE)
    name=models.CharField(max_length=100)
    address=models.CharField(max_length=100)
    num_rooms = models.IntegerField()
    price=models.IntegerField()
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    
class Room(models.Model):
    building=models.ForeignKey(Building,on_delete=models.CASCADE)
    room_no=models.IntegerField()
    price=models.IntegerField()
    vacancy = models.BooleanField(default=True)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.room_no
    
class Tenant(User):
    room=models.ForeignKey(Room,on_delete=models.CASCADE)
    phone=models.CharField(max_length=10)

    
    def __str__(self):
        return self.name
        
class Payment(models.Model):
    tenant=models.ForeignKey(Tenant,on_delete=models.CASCADE)
    room=models.ForeignKey(Room,on_delete=models.CASCADE)
    amount=models.FloatField()
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.amount