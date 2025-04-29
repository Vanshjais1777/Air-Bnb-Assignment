# 🏠 Airbnb Listings Scraper & Viewer – Full Stack Web App

This is a full-stack web application built to scrape Airbnb listings and display them through a clean and responsive UI that resembles the Airbnb website.

## 📌 Objective

- Scrape Airbnb listings using Scrapy.
- Store scraped data in a MySQL database via Django REST APIs.
- Display listings using a ReactJS + Tailwind CSS frontend.

## 🚀 Tech Stack

### Backend
- **Framework**: Django REST Framework
- **Database**: MySQL
- **APIs**:
  - `GET /api/listings/` - Fetch all listings
  - `POST /api/add_listing/` - Add a new listing

### Scraper
- **Tool**: Scrapy
- **Features**:
  - Pagination support
  - Input parameters: location, check-in date, check-out date, guests
  - Sends POST requests to the backend to store data

### Frontend
- **Framework**: ReactJS
- **Styling**: Tailwind CSS
- **Pages**:
  - **Search Results Page**: Filters based on location, date, guests, price, ratings
  - **Listing Page**: Displays full details of the selected listing

---

## Live Link
- https://peaceful-douhua-f828e4.netlify.app/
