from django.contrib import admin
from .models import Tenant, Room, Building, User, Payment, Notification, Message

# Register your models here.

admin.site.register(Tenant)
admin.site.register(Room)
admin.site.register(Building)
admin.site.register(User)
admin.site.register(Payment)
admin.site.register(Notification)
admin.site.register(Message)
