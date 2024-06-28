from django.contrib import admin
from django.urls import path
from StudentApp import views

urlpatterns = [
    path('student/', views.studentApi),
    path('student/<int:id>/', views.studentApi),
    path('admin/', admin.site.urls),
]
