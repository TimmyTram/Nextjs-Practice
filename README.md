# NextJS Practice
This is Timmy Tram's personal project / Study project for CSC 648. </br>

This repository serves as practice and reference for creating a backend in NextJS using Prisma + Mongodb Atlas
 

## Instructions to Run

1. git clone https://github.com/TimmyTram/Nextjs-Practice.git
2. cd .\NextJS-Practice\
3. npm install
4. Create an .env file at the root (Inside of NextJS-Practice Folder)
5. ADD to .env file `DATABASE_URL="mongodb+srv://<your-username>:<your-password>@<your-cluster-name>.mongodb.net/<your-database-name>?retryWrites=true&w=majority"`
6. Run in terminal `npx prisma generate`
7. Run in terminal `npm run dev`


## List of Endpoints (Last updated 10/8/2024):

#### 1. Create A User:
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

#### 2. Get All Users:
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
	...
]
```

#### 3. Create A Location:
**Endpoint:** `POST /api/locations` </br>
**Description:** Create a new Location </br>
**Request Body:** 
```json
{
    "name": "J. Paul Leonard Library",
	"address": "1630 Holloway Ave, San Francisco, CA 94132",
	"phoneNumber": "(415) 338-1854",
	"hasWifi": true,
	"seatingCapacity": 648,
	"category": "LIBRARY",
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
}
```

#### 4. Get All Locations:
**Endpoint:** `GET /api/locations` </br>
**Description:** Gets all locations from Database </br>
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
    ...
]
```

#### 5. Create a Review:
**Endpoint:** `POST /api/reviews` </br>
**Description:** Create a review </br>
**Request Body:** 
```json
{
    "rating": number ranging from 1 to 5,
    "description": "description",
    "userId": "user-id",
    "locationId": "location-id"
}
```

#### 6. Get All Reviews:
**Endpoint:** `GET /api/reviews` </br>
**Description:** Gets all reviews from Database </br>
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
	...
]
```

#### 7. Get All Reviews for a Specific Location:
**Note:** This endpoint should be refactored to be `/api/reviews/{locationId}`</br>
**Endpoint:** `GET /api/locations/{locationId}` </br>
**Description:** Gets all reviews from Database </br>
**Response Body:**
```json
[
	{
		"id": "review-id",
		"rating": 5,
		"description": "I like this library to study",
		"timestamp": "timestamp"
	}
	...
]
```

#### 8. Create Bookmark
**Endpoint:** `POST /api/users/{userId}/bookmarks` </br>
**Description:** Create a bookmark for a specified location </br>
**Request Body:** 
```json
{
	"locationId": "67057c9456fb50ebee89d8d1"
}
```

#### 9. Get All Bookmarks from Specific User
**Endpoint:** `GET /api/users/{userId}/bookmarks` </br>
**Description:** Gets all reviews from Database </br>
**Response Body:**
```json
[
	{
		"id": "bookmark-id",
		"location": {
			"id": "location-id",
			"name": "location-name"
		},
		"createdAt": "timestamp"
	}
]
```

#### 10: Get All Bookmarks from Specific Location
**Endpoint:** `GET /api/locations/{locationId}/bookmarks` </br>
**Description:** Gets all reviews from Database </br>
**Response Body:**
```json
[
	{
		"id": "bookmark-id",
		"location": {
			"id": "location-id",
			"name": "location-name"
		},
		"createdAt": "timestamp"
	}
]
```

#### 11: Update Specific User
**Endpoint:** `PATCH /api/users/{locationId}` </br>
**Description:** Update the password or email of a given user </br>
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
    "email": "example@example.com"
    "password": "wow new email and password"
}
```

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

### TODO:
- [ ] Refactor certain endpoints to better areas
- [ ] NextAuth with roles (Credentials Provider)
- [ ] AWS S3 Integration Prototype
- [ ] Search filtering?
- [ ] Add comments to each HTTP ACTION so I actually know what it does.
