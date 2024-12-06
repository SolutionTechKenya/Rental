
from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.MessageListCreate.as_view(), name="message_list_create"),
    path("notes/delete/<int:pk>/", views.DeleteMessage.as_view(), name="delete_message"),
]