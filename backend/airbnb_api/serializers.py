from rest_framework import serializers
from .models import Host, Listing, ListingImage, Amenity, ListingAmenity

class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = ['id', 'name', 'is_superhost', 'profile_image', 'response_rate', 
                 'response_time', 'join_date']

class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = ['id', 'image_url', 'position']

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ['id', 'name']

class ListingSerializer(serializers.ModelSerializer):
    host = HostSerializer(read_only=True)
    images = serializers.SerializerMethodField()
    amenities = serializers.SerializerMethodField()
    
    class Meta:
        model = Listing
        fields = ['id', 'title', 'location', 'address', 'latitude', 'longitude',
                 'price_per_night', 'currency', 'total_price', 'rating', 
                 'num_reviews', 'description', 'property_type', 'capacity',
                 'bedrooms', 'beds', 'baths', 'check_in', 'check_out',
                 'host', 'images', 'amenities']

    def get_images(self, obj):
        images = ListingImage.objects.filter(listing=obj)
        return [image.image_url for image in images]

    def get_amenities(self, obj):
        listing_amenities = ListingAmenity.objects.filter(listing=obj)
        return [la.amenity.name for la in listing_amenities]

class ListingCreateSerializer(serializers.ModelSerializer):
    host_data = serializers.JSONField(write_only=True)
    images = serializers.ListField(child=serializers.URLField(), write_only=True)
    amenities = serializers.ListField(child=serializers.CharField(), write_only=True)
    
    class Meta:
        model = Listing
        fields = ['title', 'location', 'address', 'latitude', 'longitude',
                 'price_per_night', 'currency', 'total_price', 'rating',
                 'num_reviews', 'description', 'property_type', 'capacity',
                 'bedrooms', 'beds', 'baths', 'check_in', 'check_out',
                 'host_data', 'images', 'amenities']

    def create(self, validated_data):
        host_data = validated_data.pop('host_data')
        images_data = validated_data.pop('images')
        amenities_data = validated_data.pop('amenities')
        
        # Create or get host
        host, created = Host.objects.get_or_create(
            name=host_data.get('name'),
            defaults={
                'is_superhost': host_data.get('isSuperhost', False),
                'profile_image': host_data.get('profileImage', ''),
                'response_rate': host_data.get('responseRate'),
                'response_time': host_data.get('responseTime'),
                'join_date': host_data.get('joinDate')
            }
        )
        
        # Create listing
        listing = Listing.objects.create(host=host, **validated_data)
        
        # Add images
        for idx, image_url in enumerate(images_data):
            ListingImage.objects.create(
                listing=listing,
                image_url=image_url,
                position=idx
            )
        
        # Add amenities
        for amenity_name in amenities_data:
            amenity, created = Amenity.objects.get_or_create(name=amenity_name)
            ListingAmenity.objects.create(listing=listing, amenity=amenity)
        
        return listing