from django.db import models
from django.contrib.auth.models import User

class Host(models.Model):
    name = models.CharField(max_length=100)
    is_superhost = models.BooleanField(default=False)
    profile_image = models.URLField()
    response_rate = models.FloatField(null=True, blank=True)
    response_time = models.CharField(max_length=50, null=True, blank=True)
    join_date = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Listing(models.Model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    address = models.CharField(max_length=255, null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default='USD')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    rating = models.FloatField()
    num_reviews = models.IntegerField(default=0)
    description = models.TextField()
    property_type = models.CharField(max_length=100)
    capacity = models.IntegerField()
    bedrooms = models.IntegerField()
    beds = models.IntegerField()
    baths = models.FloatField()
    check_in = models.CharField(max_length=50, null=True, blank=True)
    check_out = models.CharField(max_length=50, null=True, blank=True)
    host = models.ForeignKey(Host, on_delete=models.CASCADE, related_name='listings')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField()
    position = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['position']

    def __str__(self):
        return f"Image for {self.listing.title}"

class Amenity(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Amenities'

    def __str__(self):
        return self.name

class ListingAmenity(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='listing_amenities')
    amenity = models.ForeignKey(Amenity, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Listing amenities'

    def __str__(self):
        return f"{self.amenity.name} for {self.listing.title}"