import requests
import os

# --- Configuration ---
# Paste your API key here
API_KEY = "24URo3rTmFQ8b45A2eqmLBxr"

# The API endpoint URL
API_URL = "https://api.remove.bg/v1.0/removebg"

# --- Script Execution ---

# 1. Ask the user for the filename
input_filename = input("Enter the filename of the image (e.g., my_photo.jpg): ")

# Check if the file exists in the current directory
if not os.path.exists(input_filename):
    print(f"Error: The file '{input_filename}' was not found in this directory.")
else:
    # 2. Automatically create the output filename
    # This is the line that has been changed.
    base_name, extension = os.path.splitext(input_filename)
    output_filename = f"{base_name}-removebg-preview.png"
    
    print(f"Processing '{input_filename}'...")

    # Open the image file in binary mode
    with open(input_filename, 'rb') as image_file:
        # Make the POST request to the API
        response = requests.post(
            API_URL,
            files={'image_file': image_file},
            headers={'X-Api-Key': API_KEY}
        )

    # Check if the request was successful
    if response.status_code == 200:
        # If successful, write the new image to the output file
        with open(output_filename, 'wb') as out_file:
            out_file.write(response.content)
        print(f"✅ Success! Background removed and saved as '{output_filename}'")
    else:
        # If there was an error, print the details
        print(f"❌ Error: {response.status_code}")
        print(response.text)