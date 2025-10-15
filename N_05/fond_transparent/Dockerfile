# Use the official Nginx image from Docker Hub.
# The 'alpine' tag refers to a minimal, lightweight version of Linux.
FROM nginx:stable-alpine

# Copy your website files from your current directory
# into the default Nginx web root directory inside the container.
COPY . /usr/share/nginx/html

# Tell Docker that the container listens on port 80 at runtime.
EXPOSE 80