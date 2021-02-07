from rest_framework.response import Response

from rest_framework import viewsets

from .models import Deadlines

from Lessons.models import StudentGroupLesson

from .serializers import DeadlinesSerializer


class DeadlinesViewSet(viewsets.ViewSet):

    def list(self, request):
        user = request.user
        lessons = StudentGroupLesson.get_user_lesson(user)
        queryset = Deadlines.objects.all().filter(lesson__in=lessons)
        serializer = DeadlinesSerializer(queryset, many=True)
        return Response(serializer.data)


