from django.contrib import admin
from .models import Tenant, Room, Building, User

# Register your models here.

admin.site.register(Tenant)
admin.site.register(Room)
admin.site.register(Building)
admin.site.register(User)
