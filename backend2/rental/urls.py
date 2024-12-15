from django.urls import path
from . import views

urlpatterns = [
    path('add/tenant/', views.AddTenant.as_view(), name='assign_room'),
    # path('add/tenant/', views.AddTenant.as_view(), name='assign_room'),
    # path('assign/room/', views.AssignRoom, name='assign_room'),
]