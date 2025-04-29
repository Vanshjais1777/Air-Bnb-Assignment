from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ListingViewSet, add_listing

router = DefaultRouter()
router.register(r'listings', ListingViewSet, basename='listing')

urlpatterns = [
    path('', include(router.urls)),
    path('add_listing/', add_listing, name='add_listing'),
]