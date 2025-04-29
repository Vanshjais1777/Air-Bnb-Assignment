import json
import argparse
import requests
from datetime import datetime
import time
import random
from urllib.parse import urlencode
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

class AirbnbSpider(scrapy.Spider):
    name = 'airbnb_spider'
    
    def __init__(self, location='New York', checkin=None, checkout=None, guests=2, *args, **kwargs):
        super(AirbnbSpider, self).__init__(*args, **kwargs)
        self.location = location
        self.checkin = checkin or (datetime.now().strftime('%Y-%m-%d'))
        self.checkout = checkout or (datetime.now().strftime('%Y-%m-%d'))
        self.guests = int(guests)
        self.results = []
        
        # Create the search URL
        query_params = {
            'query': self.location,
            'checkin': self.checkin,
            'checkout': self.checkout,
            'adults': self.guests
        }
        self.start_urls = [f'https://www.airbnb.com/s/{self.location.replace(" ", "-")}/homes?{urlencode(query_params)}']
        
        self.logger.info(f"Starting scrape for: {self.start_urls[0]}")

    def parse(self, response):
        # Find the JSON data in the page
        # Airbnb loads data via JavaScript, so we need to extract it from the page source
        script_content = response.xpath('//script[contains(text(), "bootstrapData")]/text()').get()
        
        if not script_content:
            self.logger.error("Could not find bootstrapData in the page")
            return
        
        try:
            # Try to extract the JSON data
            # This is a simplified approach - in a real scenario you'd need to handle this more robustly
            start_index = script_content.find('{')
            end_index = script_content.rfind('}') + 1
            json_data = json.loads(script_content[start_index:end_index])
            
            # Extract listing data from the JSON
            # The actual structure will depend on Airbnb's current implementation
            listings_data = self._extract_listings(json_data)
            
            if not listings_data:
                self.logger.error("Could not extract listings data")
                return
            
            for listing in listings_data:
                yield scrapy.Request(
                    url=f"https://www.airbnb.com/rooms/{listing.get('id')}",
                    callback=self.parse_listing,
                    meta={'basic_info': listing}
                )
            
            # Handle pagination
            next_page_url = self._extract_next_page(json_data)
            if next_page_url:
                yield scrapy.Request(url=next_page_url, callback=self.parse)
                
        except Exception as e:
            self.logger.error(f"Error parsing JSON data: {e}")
    
    def parse_listing(self, response):
        basic_info = response.meta.get('basic_info', {})
        
        # Extract listing details
        try:
            # Extract JSON data from the listing page
            script_content = response.xpath('//script[@id="data-deferred-state"]/text()').get()
            if script_content:
                listing_data = json.loads(script_content)
                listing_detail = self._extract_listing_details(listing_data, basic_info)
                
                # Send the data to our API
                self._send_to_api(listing_detail)
                
                # Store the results
                self.results.append(listing_detail)
                
                self.logger.info(f"Scraped listing: {listing_detail.get('title')}")
                
                return listing_detail
            
        except Exception as e:
            self.logger.error(f"Error parsing listing detail: {e}")
    
    def _extract_listings(self, json_data):
        # This is a simplified extraction - in reality, you'd need to navigate Airbnb's JSON structure
        # The actual structure may change, so this would need to be updated accordingly
        try:
            # Navigate to the listings data in the JSON
            # This is a placeholder - you'd need to find where Airbnb stores the listings in their JSON
            if 'data' in json_data and 'presentation' in json_data['data']:
                explore_tabs = json_data['data']['presentation'].get('exploreV3', {})
                sections = explore_tabs.get('sections', [])
                
                listings = []
                for section in sections:
                    if 'listings' in section:
                        for listing in section['listings']:
                            listing_info = {
                                'id': listing.get('id'),
                                'title': listing.get('title'),
                                'location': listing.get('location', {}).get('city', ''),
                                'price_per_night': float(listing.get('price', {}).get('rate', 0)),
                                'currency': listing.get('price', {}).get('currency', 'USD'),
                                'rating': float(listing.get('rating', {}).get('value', 0)),
                                'reviews': int(listing.get('reviewsCount', 0)),
                                'image_url': listing.get('image', {}).get('url', '')
                            }
                            listings.append(listing_info)
                
                return listings
            
            return []
        
        except Exception as e:
            self.logger.error(f"Error extracting listings: {e}")
            return []
    
    def _extract_next_page(self, json_data):
        # Extract the URL for the next page
        # This is a simplified approach
        try:
            pagination = json_data.get('data', {}).get('presentation', {}).get('pagination', {})
            next_page = pagination.get('nextPage')
            if next_page:
                return f"https://www.airbnb.com{next_page}"
            return None
        except Exception as e:
            self.logger.error(f"Error extracting next page: {e}")
            return None
    
    def _extract_listing_details(self, json_data, basic_info):
        # Extract detailed information about a listing
        try:
            pdp_sections = json_data.get('niobeMinimalClientData', [])
            listing_data = {}
            
            for section in pdp_sections:
                if 'data' in section and 'presentation' in section['data']:
                    presentation = section['data']['presentation']
                    if 'pdpSections' in presentation:
                        listing_data = presentation['pdpSections']
                        break
            
            # Extract the details from the listing data
            # This is a simplified approach - you'd need to navigate Airbnb's actual JSON structure
            
            # Get amenities
            amenities = []
            if 'amenities' in listing_data:
                amenity_groups = listing_data['amenities'].get('sections', [])
                for group in amenity_groups:
                    for amenity in group.get('items', []):
                        amenities.append(amenity.get('title'))
            
            # Get description
            description = listing_data.get('description', {}).get('description', '')
            
            # Get host information
            host_data = listing_data.get('host', {})
            host = {
                'name': host_data.get('name', ''),
                'isSuperhost': host_data.get('isSuperhost', False),
                'profileImage': host_data.get('avatar', {}).get('url', ''),
                'responseRate': host_data.get('responseRate', {}).get('value') if host_data.get('responseRate') else None,
                'responseTime': host_data.get('responseTime', {}).get('text') if host_data.get('responseTime') else None,
                'joinDate': host_data.get('memberSince', '')
            }
            
            # Get images
            images = []
            if 'photos' in listing_data:
                for photo in listing_data['photos'].get('data', []):
                    images.append(photo.get('picture', ''))
            
            # Combine with basic info
            result = {
                'title': basic_info.get('title', listing_data.get('title', '')),
                'location': basic_info.get('location', ''),
                'address': listing_data.get('location', {}).get('address', ''),
                'latitude': listing_data.get('location', {}).get('lat'),
                'longitude': listing_data.get('location', {}).get('lng'),
                'price_per_night': basic_info.get('price_per_night', 0),
                'currency': basic_info.get('currency', 'USD'),
                'total_price': listing_data.get('price', {}).get('total', {}).get('amount'),
                'rating': basic_info.get('rating', 0),
                'reviews': basic_info.get('reviews', 0),
                'description': description,
                'amenities': amenities,
                'host': host,
                'images': images or [basic_info.get('image_url', '')],
                'property_type': listing_data.get('roomAndPropertyType', {}).get('roomType', 'Entire home'),
                'capacity': listing_data.get('basicInfo', {}).get('capacity', self.guests),
                'bedrooms': listing_data.get('basicInfo', {}).get('bedroomCount', 1),
                'beds': listing_data.get('basicInfo', {}).get('bedCount', 1),
                'baths': listing_data.get('basicInfo', {}).get('bathroomCount', 1),
                'check_in': self.checkin,
                'check_out': self.checkout
            }
            
            return result
        
        except Exception as e:
            self.logger.error(f"Error extracting listing details: {e}")
            return {}
    
    def _send_to_api(self, listing_data):
        # Send the listing data to our API
        try:
            api_url = 'http://localhost:8000/api/add_listing/'
            headers = {'Content-Type': 'application/json'}
            
            response = requests.post(
                api_url,
                data=json.dumps(listing_data),
                headers=headers
            )
            
            if response.status_code == 201:
                self.logger.info(f"Successfully sent listing to API: {listing_data.get('title')}")
            else:
                self.logger.error(f"Failed to send listing to API. Status code: {response.status_code}, Response: {response.text}")
        
        except Exception as e:
            self.logger.error(f"Error sending data to API: {e}")

def run_spider(location, checkin, checkout, guests):
    # Set up the Scrapy crawler
    process = CrawlerProcess(get_project_settings())
    
    # Add our spider with the provided parameters
    process.crawl(
        AirbnbSpider,
        location=location,
        checkin=checkin,
        checkout=checkout,
        guests=guests
    )
    
    # Start the crawling process
    process.start()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Scrape Airbnb listings')
    parser.add_argument('--location', type=str, default='New York', help='Location to search for')
    parser.add_argument('--checkin', type=str, help='Check-in date (YYYY-MM-DD)')
    parser.add_argument('--checkout', type=str, help='Check-out date (YYYY-MM-DD)')
    parser.add_argument('--guests', type=int, default=2, help='Number of guests')
    
    args = parser.parse_args()
    
    # Run the spider
    run_spider(args.location, args.checkin, args.checkout, args.guests)