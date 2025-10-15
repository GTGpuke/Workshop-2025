# Use the official Nginx image from Docker Hub.
FROM nginx:stable-alpine

# Copy only the specific files needed for the website
# into the Nginx web root directory.
COPY index.html \
     style.css \
     script.js \
     Gemini_Generated_Image_omc8lnomc8lnomc8-removebg-preview.png \
     Gemini_Generated_Image_j0dp30j0dp30j0dp-removebg-preview.png \
     Gemini_Generated_Image_7z1bci7z1bci7z1b-removebg-preview.png \
     /usr/share/nginx/html/

# Tell Docker that the container listens on port 80.
EXPOSE 80