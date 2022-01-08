# Favs
Pick favorites from a list of results and make comments on them

In development

# Development

With Docker and Docker Compose intalled, you should be able to run this all locally with `docker-compose up`

Or to actually develop the code in the `/api` and `/ui` directories:
- just run postgres with `docker-compose -f db.yml up`
- run the frontend:
    ```
    cd ui
    npm install
    npm run start
    ```
- run the api:
    ```
    cd api
    npm install
    npm run dev
    ```
