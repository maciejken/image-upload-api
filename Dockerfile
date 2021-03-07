FROM node:14-alpine

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH=/app/node_modules/.bin:$PATH
ENV PORT=8001
ENV SEQUELIZE_USERNAME=''
ENV SEQUELIZE_PASSWORD=''
ENV SEQUELIZE_HOST=localhost
ENV SEQUELIZE_PORT=5432
ENV SEQUELIZE_DIALECT=sqlite
ENV SEQUELIZE_STORAGE=/app/uploads/images.sqlite
ENV SEQUELIZE_DATABASE=images_qa
ENV SEQUELIZE_LOGGING=''
ENV ID_TOKEN_VALIDITY_SECONDS=900
ENV ACCESS_CONTROL_ALLOW_ORIGIN=http://localhost:8000
ENV IMAGE_UPLOAD_FIELD_NAME=imageUpload
ENV ADMIN_GROUP_ID=1
ENV PATH_TO_UPLOADS=/app/uploads
ENV PATH_TO_THUMBNAILS=/app/uploads/thumbnails
ENV API_PREFIX=/api
ENV RATE_LIMIT_WINDOW_MS=900
ENV RATE_LIMIT_MAX=3

# install node-gyp dependencies
RUN apk add python make gcc g++
# add app
COPY . ./
RUN npm install --quiet

RUN mkdir uploads
RUN mkdir uploads/thumbnails

# start app
CMD ["npm", "start"]
