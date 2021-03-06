from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('news/', include('News.urls')),
    path('user/', include('Users.urls')),
    path('lessons/', include('Lessons.urls')),
    path('schedule/', include('Schedule.urls')),
    path('deadlines/', include('DeadLines.urls')),
    path('gradebook/', include('GradeBook.urls')),
    path('tests/', include('Tests.urls')),
    path('gradecount/', include('TransferDbToFlask.urls')),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verify/', TokenVerifyView.as_view(), name='token_verify'),
]
