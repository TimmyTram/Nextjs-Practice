# NextJS Practice
This is Timmy Tram's personal project / Study project for CSC 648. </br>

This repository serves as practice and reference for creating a backend in NextJS using Prisma + Mongodb Atlas

# Table of Contents
1. [Instructions to Run](#instructions-to-run)
2. [List of Endpoints](#list-of-endpoints-last-updated-1092024)
	1. [User Endpoints](#users)
		1. [User GET Endpoints](#user-get-endpoints)
		2. [User POST Endpoints](#user-post-endpoints)
		3. [User PATCH Endpoints](#user-patch-endpoints)
	2. [Location Endpoints](#locations)
		1. [Location GET Endpoints](#location-get-endpoints)
		2. [Location POST Endpoints](#location-post-endpoints)
	3. [Review Endpoints](#reviews)
		1. [Review GET Endpoints](#review-get-endpoints)
		2. [Review POST Endpoints](#review-post-endpoints)
	4. [Bookmark Endpoints](#bookmarks)
		1. [Bookmark GET Endpoints](#bookmark-get-endpoints)
		2. [Bookmark POST Endpoints](#bookmark-post-endpoints)
3. [Check list](#check-list)
4. [To Do List](#todo)


## Instructions to Run

1. git clone https://github.com/TimmyTram/Nextjs-Practice.git
2. cd .\NextJS-Practice\
3. npm install
4. Create an .env file at the root (Inside of NextJS-Practice Folder)
5. ADD to .env file `DATABASE_URL="mongodb+srv://<your-username>:<your-password>@<your-cluster-name>.mongodb.net/<your-database-name>?retryWrites=true&w=majority"`
6. Run in terminal `npx prisma generate`
7. Run in terminal `npm run dev`


## List of Endpoints (Last updated 10/9/2024):

### Users:

#### User GET Endpoints

##### 1. GET All Users
**Endpoint:** `GET /api/users` </br>
**Description:** Gets all users from Database </br>
**Response Body:**
```json
[
	{
		"id": "user-id",
		"username": "username",
		"email": "example@example.com",
		"role": "CUSTOMER",
		"timestamp": "timestamp"
	},
	{
		"id": "user-id",
		"username": "username",
		"email": "example@example.com",
		"role": "CUSTOMER",
		"timestamp": "timestamp"
	}
]
```

##### 2. Get Specific User
**Endpoint:** `GET /api/users/{userId}` </br>
**Description:** Get a specific user by their userId </br>
**Response Body:**
```json
{
	"id": "user-id",
	"username": "username",
	"email": "example@example.com",
	"role": "CUSTOMER",
	"timestamp": "timestamp"
}
```

#### User POST Endpoints

##### 1. Create a User
**Endpoint:** `POST /api/users` </br>
**Description:** Create a new user </br>
**Request Body:** 
```json
{
    "username": "username",
    "email": "example@example.com",
	"password": "password"
}
```

#### User PATCH Endpoints

##### 1. Update User email or password
**Endpoint:** `PATCH /api/users/{userId}` </br>
**Description:** Edit a user's data (email, password) </br>
**Request Body:**
```json
{
    "email": "example@example.com"
}

or

{
    "password": "new password wow"
}

or

{
    "email": "example@example.com",
    "password": "wow new email and password"
}
```

-------------------------------------------------------------------------------------------------------------------------

### Locations:

#### Location GET Endpoints

##### 1. Get All Locations
**Endpoint:** `GET /api/locations` </br>
**Description:** Fetches all locations with their operating hours. </br>
**Response Body:**
```json
[
	{
		"id": "67057c9456fb50ebee89d8d1",
		"name": "J. Paul Leonard Library",
		"address": "1630 Holloway Ave, San Francisco, CA 94132",
		"phoneNumber": "(415) 338-1854",
		"hasWifi": true,
		"seatingCapacity": 648,
		"category": "LIBRARY",
		"rating": 0,
		"busynessStatus": 0,
		"imageWebLink": "N/A",
		"animalFriendliness": false,
		"operatingHours": [
			{
				"day": "MONDAY",
				"timeSlots": [
					{
						"startTime": "7:00 AM",
						"endTime": "11:00 PM"
					}
				]
			},
			{
				"day": "TUESDAY",
				"timeSlots": [
					{
						"startTime": "7:00 AM",
						"endTime": "11:00 PM"
					}
				]
			},
			{
				"day": "WEDNESDAY",
				"timeSlots": [
					{
						"startTime": "7:00 AM",
						"endTime": "11:00 PM"
					}
				]
			},
			{
				"day": "THURSDAY",
				"timeSlots": [
					{
						"startTime": "7:00 AM",
						"endTime": "11:00 PM"
					}
				]
			},
			{
				"day": "FRIDAY",
				"timeSlots": [
					{
						"startTime": "7:00 AM",
						"endTime": "7:00 PM"
					}
				]
			},
			{
				"day": "SATURDAY",
				"timeSlots": [
					{
						"startTime": "12:00 PM",
						"endTime": "6:00 PM"
					}
				]
			},
			{
				"day": "SUNDAY",
				"timeSlots": [
					{
						"startTime": "12:00 PM",
						"endTime": "6:00 PM"
					}
				]
			}
		]
	},
	{
		"id": "6706aa607744db33d0d476f8",
		"name": "San Francisco Public Library",
		"address": "100 Larkin St, San Francisco, CA 94102",
		"phoneNumber": "(415) 557-4400",
		"hasWifi": true,
		"seatingCapacity": 1000,
		"category": "LIBRARY",
		"rating": 0,
		"busynessStatus": 0,
		"imageWebLink": "N/A",
		"animalFriendliness": false,
		"operatingHours": [
			{
				"day": "MONDAY",
				"timeSlots": [
					{
						"startTime": "9:00 AM",
						"endTime": "6:00 PM"
					}
				]
			},
			{
				"day": "TUESDAY",
				"timeSlots": [
					{
						"startTime": "9:00 AM",
						"endTime": "8:00 PM"
					}
				]
			},
			{
				"day": "WEDNESDAY",
				"timeSlots": [
					{
						"startTime": "9:00 AM",
						"endTime": "8:00 PM"
					}
				]
			},
			{
				"day": "THURSDAY",
				"timeSlots": [
					{
						"startTime": "9:00 AM",
						"endTime": "8:00 PM"
					}
				]
			},
			{
				"day": "FRIDAY",
				"timeSlots": [
					{
						"startTime": "12:00 PM",
						"endTime": "6:00 PM"
					}
				]
			},
			{
				"day": "SATURDAY",
				"timeSlots": [
					{
						"startTime": "10:00 AM",
						"endTime": "6:00 PM"
					}
				]
			},
			{
				"day": "SUNDAY",
				"timeSlots": [
					{
						"startTime": "12:00 PM",
						"endTime": "6:00 PM"
					}
				]
			}
		]
	}
]
```

##### 2. Get Specific Location Details
**Endpoint:** `GET /api/locations` </br>
**Description:** Fetches all locations with their operating hours. </br>
**Response Body:**
```json
{
	"id": "6706aa607744db33d0d476f8",
	"name": "San Francisco Public Library",
	"address": "100 Larkin St, San Francisco, CA 94102",
	"phoneNumber": "(415) 557-4400",
	"hasWifi": true,
	"seatingCapacity": 1000,
	"category": "LIBRARY",
	"rating": 0,
	"busynessStatus": 0,
	"imageWebLink": "N/A",
	"animalFriendliness": false,
	"operatingHours": [
		{
			"day": "MONDAY",
			"timeSlots": [
				{
					"startTime": "9:00 AM",
					"endTime": "6:00 PM"
				}
			]
		},
		{
			"day": "TUESDAY",
			"timeSlots": [
				{
					"startTime": "9:00 AM",
					"endTime": "8:00 PM"
				}
			]
		},
		{
			"day": "WEDNESDAY",
			"timeSlots": [
				{
					"startTime": "9:00 AM",
					"endTime": "8:00 PM"
				}
			]
		},
		{
			"day": "THURSDAY",
			"timeSlots": [
				{
					"startTime": "9:00 AM",
					"endTime": "8:00 PM"
				}
			]
		},
		{
			"day": "FRIDAY",
			"timeSlots": [
				{
					"startTime": "12:00 PM",
					"endTime": "6:00 PM"
				}
			]
		},
		{
			"day": "SATURDAY",
			"timeSlots": [
				{
					"startTime": "10:00 AM",
					"endTime": "6:00 PM"
				}
			]
		},
		{
			"day": "SUNDAY",
			"timeSlots": [
				{
					"startTime": "12:00 PM",
					"endTime": "6:00 PM"
				}
			]
		}
	]
}
```

#### Location POST Endpoints

##### 1. Create a Location
**Endpoint:** `POST /api/locations` </br>
**Description:** Creates a new location with the provided data. </br>
**Request Body:** 
```json
{
    "name": "San Francisco Public Library",
	"address": "100 Larkin St, San Francisco, CA 94102",
	"phoneNumber": "(415) 557-4400",
	"hasWifi": true,
	"seatingCapacity": 1000,
	"category": "LIBRARY",
	"animalFriendliness": false,
	"operatingHours": [
		{
			"day": "MONDAY",
			"timeSlots": [
				{
					"startTime": "9:00 AM",
					"endTime": "6:00 PM"
				}
			]
		},
		{
			"day": "TUESDAY",
			"timeSlots": [
				{
					"startTime": "9:00 AM",
					"endTime": "8:00 PM"
				}
			]
		},
		{
			"day": "WEDNESDAY",
			"timeSlots": [
				{
					"startTime": "9:00 AM",
					"endTime": "8:00 PM"
				}
			]
		},
		{
			"day": "THURSDAY",
			"timeSlots": [
				{
					"startTime": "9:00 AM",
					"endTime": "8:00 PM"
				}
			]
		},
		{
			"day": "FRIDAY",
			"timeSlots": [
				{
					"startTime": "12:00 PM",
					"endTime": "6:00 PM"
				}
			]
		},
		{
			"day": "SATURDAY",
			"timeSlots": [
				{
					"startTime": "10:00 AM",
					"endTime": "6:00 PM"
				}
			]
		},
		{
			"day": "SUNDAY",
			"timeSlots": [
				{
					"startTime": "12:00 PM",
					"endTime": "6:00 PM"
				}
			]
		}
	]
}
```

-------------------------------------------------------------------------------------------------------------------------

### Reviews:

#### Review GET Endpoints

##### 1. Get All Reviews
**Endpoint:** `GET /api/reviews` </br>
**Description:** Fetches all reviews from the database. </br>
**Response Body:**
```json
[
	{
		"id": "review-id",
		"rating": 3,
		"description": "Place isn't great",
		"timestamp": "timestamp"
	},
	{
		"id": "review-id",
		"rating": 5,
		"description": "I like this library to study",
		"timestamp": "timestamp"
	}
]
```

##### 2. Get Specific Review
**Endpoint:** `GET /api/reviews/{reviewId}` </br>
**Description:** Fetches a single review from the database given a review id. </br>
**Response Body:**
```json
{
	"id": "review-id",
	"rating": 5,
	"description": "I like this library to study",
	"timestamp": "timestamp"
}
```

##### 3. Get All Reviews for Specific Location
**Endpoint:** `GET /api/reviews/locationReviews/{locationId}` </br>
**Description:** Fetches all reviews for a specific location given its id. </br>
**Response Body:**
```json
{
	"id": "review-id",
	"rating": 5,
	"description": "I like this library to study",
	"timestamp": "timestamp"
}
```

##### 4. Get All Reviews from Specific User
**Endpoint:** `GET /api/reviews/userReviews/{userId}` </br>
**Description:** Fetches all reviews for a specific user given their id. </br>
**Response Body:**
```json
{
	"id": "review-id",
	"rating": 5,
	"description": "I like this library to study",
	"timestamp": "timestamp"
}
```

#### Review POST Endpoints

##### 1. Create Review for Specific Location
**Endpoint:** `POST /api/reviews/createReview/{locationId}` </br>
**Description:** Creates a review for a specific location. </br>
**Request Body:**
```json
{
	"rating": 5,
    "description": "I like the public library to study (SF)",
    "userId": "user-id"
}
```

-------------------------------------------------------------------------------------------------------------------------

### Bookmarks

#### Bookmark GET Endpoints

##### 1. Get All Bookmarks
**Endpoint:** `GET /api/bookmarks` </br>
**Description:** Fetches all bookmarks from the database. </br>
**Response Body:**
```json
[
	{
		"id": "bookmark-id",
		"user": {
			"id": "user-id",
			"username": "username",
			"email": "example@example.com"
		},
		"createdAt": "2024-10-08T18:58:11.153Z"
	},
	{
		"id": "bookmark-id",
		"user": {
			"id": "user-id",
			"username": "username",
			"email": "example@example.com"
		},
		"createdAt": "2024-10-08T18:58:32.977Z"
	}
]
```

##### 2. Get All Bookmarks for Specific User
**Endpoint:** `GET /api/bookmarks/userBookmarks/{userId}` </br>
**Description:** Fetches all bookmarks for a specific user given their id. </br>
**Response Body:**
```json
[
	{
		"id": "bookmark-id",
		"location": {
			"id": "location-id",
			"name": "J. Paul Leonard Library"
		},
		"createdAt": "2024-10-08T18:58:11.153Z"
	},
	{
		"id": "bookmark-id",
		"location": {
			"id": "location-id",
			"name": "San Francisco Public Library"
		},
		"createdAt": "2024-10-09T16:58:04.007Z"
	}
]
```

##### 3. Get All Bookmarks for Specific Location
**Endpoint:** `GET /api/bookmarks/locationBookmarks/{locationId}` </br>
**Description:** Fetches all bookmarks for a specific location given its id. </br>
**Response Body:**
```json
[
	{
		"id": "bookmark-id",
		"user": {
			"id": "user-id",
			"username": "username",
			"email": "example@example.com"
		},
		"createdAt": "2024-10-08T18:58:11.153Z"
	},
	{
		"id": "bookmark-id",
		"user": {
			"id": "user-id",
			"username": "username",
			"email": "example@example.com"
		},
		"createdAt": "2024-10-08T18:58:32.977Z"
	}
]
```

#### Bookmark Post Endpoints

##### 1. Create a Bookmark
**Endpoint:** `POST /api/bookmarks/createBookmark/{locationId}` </br>
**Description:** Creates a bookmark for a specific location given its id. </br>
**Request Body:**
```json
{
	"userId": "user-id"
}
```


-------------------------------------------------------------------------------------------------------------------------

### Check List:
- [x] Created Mongodb Atlas DB
- [x] Created NextJS Project
- [x] Initialzed Git Repo
- [x] Installed Necessary Libraries
- [x] Created Markdown documentation
- [x] Created User Schema
- [x] Able to Create a User
- [x] Able to create a Review for a given location
- [x] Able to create a Location with given Operating Hours and Time slots
- [x] Can GET All Users
- [x] Can GET All Locations
- [x] Can GET All Reviews
- [x] Can GET All Reviews for a Specific Location
- [x] Can UPDATE Specific User credentials
- [x] Can CREATE Bookmarks for a Specific User given a specific Location
- [x] Can GET All Bookmarks from a Specific User
- [x] Can GET All Bookmarks for a Specific Location
- [x] Frontend is able to hit backend endpoints
- [x] Refactor certain endpoints to better areas
- [x] Add comments to each HTTP ACTION so I actually know what it does.

### TODO:
- [ ] NextAuth with roles (Credentials Provider)
- [ ] AWS S3 Integration Prototype
- [ ] Search filtering?
