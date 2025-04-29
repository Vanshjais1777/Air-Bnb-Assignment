from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Q
from django.utils.dateparse import parse_date
from .models import Listing
from .serializers import ListingSerializer, ListingCreateSerializer

class ListingViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ListingSerializer
    
    def get_queryset(self):
        queryset = Listing.objects.all().order_by('-rating')
        
        # Filter by location
        location = self.request.query_params.get('location')
        if location:
            queryset = queryset.filter(location__icontains=location)
        
        # Filter by check-in and check-out dates
        # This is simplified, in a real app you would check availability
        check_in = self.request.query_params.get('checkIn')
        check_out = self.request.query_params.get('checkOut')
        if check_in and check_out:
            check_in_date = parse_date(check_in)
            check_out_date = parse_date(check_out)
            if check_in_date and check_out_date:
                # In a real app, you would filter based on availability
                pass
        
        # Filter by guests
        guests = self.request.query_params.get('guests')
        if guests:
            try:
                guests_count = int(guests)
                queryset = queryset.filter(capacity__gte=guests_count)
            except ValueError:
                pass
        
        # Filter by price range
        min_price = self.request.query_params.get('minPrice')
        max_price = self.request.query_params.get('maxPrice')
        
        if min_price:
            try:
                min_price_value = float(min_price)
                queryset = queryset.filter(price_per_night__gte=min_price_value)
            except ValueError:
                pass
                
        if max_price:
            try:
                max_price_value = float(max_price)
                queryset = queryset.filter(price_per_night__lte=max_price_value)
            except ValueError:
                pass
        
        # Filter by minimum rating
        min_rating = self.request.query_params.get('minRating')
        if min_rating:
            try:
                rating_value = float(min_rating)
                queryset = queryset.filter(rating__gte=rating_value)
            except ValueError:
                pass
        
        return queryset

@api_view(['POST'])
def add_listing(request):
    serializer = ListingCreateSerializer(data=request.data)
    if serializer.is_valid():
        listing = serializer.save()
        return Response(
            {'id': listing.id, 'message': 'Listing created successfully'},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)