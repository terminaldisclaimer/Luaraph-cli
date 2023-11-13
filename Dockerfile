# Use an official Node.js runtime as the base image
FROM node:14

# Copy package.json and package-lock.json to the working directory
#COPY package*.json /app/luaraph
COPY entrypoint.sh /entrypoint.sh
COPY package.json /package.json

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . /app/luaraph

# Define the command to run the application with inputfile and outputfile arguments
#CMD [ "node", "app.js","-a", "$API_KEY", "-i", "$INPUT_FILE", "-o", "$OUTPUT_FILE" ]
ENTRYPOINT ["/entrypoint.sh"]