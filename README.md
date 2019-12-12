# Conception, developpement and integration of a Software Service
[![build status](https://github.com/Nefaden/grasbook-reaction-api/badges/master/build.svg)]()
[![VERSION](https://img.shields.io/static/v1?label=npm&message=1.0.0&color=blue)]()

**Project Gras-Book**

- Recreating a facebook-like app. Seperated in micro-services with a service for each part :
    - Posts API (https://github.com/Singebob/grasbook-post-api)
    - Messaging API (https://gitlab.com/projet-gras-book/message-api)
    - User API (https://github.com/EddyCheval/gras-book-user-api)
    - Reaction API (here)
    - Gras-Book UI (https://github.com/SimonHuet/gras-book-front)

**API Reaction** 

- API routing to get all reactions from posts
- Each type are stored in a postgre database
- Reactions are stored on a Redis database

# Getting started

**ENVIRONMENT VARIABLES**

Each environment variable have a meaning :

| **NAME**        | **DESCRIPTION**                        | **TYPE**  |
| --------------- | -------------------------------------- | ----------|
| PORT            | The port of your local server          | INT       |
| HOST            | The host of your local server          | STRING    |
| DB_PORT         | The port of your database server       | INT       |
| DB_HOST         | The host of your database server       | STRING    |
| DB_USER         | The admin user of your database        | STRING    |
| DB_PASSWORD     | The admin's password                   | STRING    |
| DB_NAME         | Your database's name on your server    | STRING    |
| DB_POOL_MAX     | The maximum pool of your database      | INT       |
| REQUESTED_RANGE | The size of the requested range for 416| INT       |
| MAX_RANGE       | Max range available for 416 response   | INT       |
| CONTENT_SIZE    | The size of the requested content      | INT       |
| SCALEWAY_ACESS_KEY    | The A.key of the SCWL O.Storage service | STRING   |
| SCALEWAY_SECRET_KEY   | The S.key of the SCWL O.Storage service | STRING   |
| SCALEWAY_ENDPOINT     | The End. of the SCWL O.Storage service  | STRING   |
| SCALEWAY_REGION       | The Rgion of the SCWL O.Storage service | STRING   |
| SCALEWAY_BUCKET_NAME  | The B.Nme of the SCWL O.Storage service | STRING   |
| KEYCLOAK_PROTOCOL     | The protocole to contact keycloak       | STRING   |
| KEYCLOAK_DOMAIN       | The domaine name or ip adresse          | STRING   |
| KEYCLOAK_REALM        | The realm of client                     | STRING   |
| KEYCLOAK_CLIENT_ID    | The client id for keycloak              | STRING   |
| KEYCLOAK_CLIENT_SECRET| The client's secret                     | STRING   |

| **ID**                      | **DESCRIPTION**                           | **Error** |
| --------------------------- | ----------------------------------------- | --------- |
| id.not.found                | UUID not found                            | 404       |
| invalid.range               | Range (limit && page) provided inadequate | 416       |
| column.not.found            | sortColumn not found                      | 400       |
| unique.constraint.violation | UUID provided already exist               | 400       |
| internal.server.error       | Something went wrong. (bruh)              | 500       |

**START AND TESTS**

- To pull the docker image from the docker-compose and start
You can add the -d tag to run it in background
```bash
> docker-compose up
```
- An alternative to start container without -d tag
```bash
> docker-compose start
```
The website is running at http://localhost:3000

- To run tests
```bash
> docker-compose run api-reaction npm run test
```

- To run linter
```bash
> docker-compose run api-reaction npm run eslint
```

###Note :
Joi v16.1.7 replaced by v15.1.1
Joi-date v2.0.1 replaced by v1.3.0
