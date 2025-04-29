# 🏠 Airbnb Listings Scraper & Viewer – Full Stack Web App

This is a full-stack web application built to scrape Airbnb listings and display them through a clean and responsive UI that resembles the Airbnb website.
## Live Link
- https://peaceful-douhua-f828e4.netlify.app/

---
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
 
## Screenshots
![Screenshot 2025-04-29 133758](https://github.com/user-attachments/assets/a6e73252-e63f-45c9-82ea-c249c4f10226)

![Screenshot 2025-04-29 132459](https://github.com/user-attachments/assets/c6dc9c10-c488-42e1-9ae1-5a6992a0fa81)

![Screenshot 2025-04-29 134048](https://github.com/user-attachments/assets/a95df226-ed54-413e-bf64-79122c813d40)

![Screenshot 2025-04-29 134036](https://github.com/user-attachments/assets/3ad2b01b-42bc-499c-8f23-d2cda7c5f595)

![Screenshot 2025-04-29 133942](https://github.com/user-attachments/assets/cbc4914c-32bd-4c54-ac0a-edd49d21002e)
