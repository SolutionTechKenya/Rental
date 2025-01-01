from django.urls import path
from . import views

urlpatterns = [
    path('add/tenant/', views.AddTenant.as_view(), name='assign_room'),
    path('create/room/', views.CreateRoom.as_view(), name='create_room'),
    path('notifications/', views.NotificationsAndMessages.as_view(), name='create_room'),
    # path('add/tenant/', views.AddTenant.as_view(), name='assign_room'),
    # path('assign/room/', views.AssignRoom, name='assign_room'),
]