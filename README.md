# Authentication with Keycloak for backend service using AngularJS, Patternfly UI

## Download Keyclock server 

Open Source Identity and Access Management for modern Applications and Services.

For more information about Keycloak visit [Keycloak homepage](http://keycloak.org) and [Keycloak Download](http://www.keycloak.org/downloads.html).

- Start up Keycloak by using one of the Standalone executeables in the /bin directory of Keycloak which will start Keycloak  immediately by using the bundled WildFly application server.

        ./standalone.sh -Djboss.socket.binding.port-offset=100


After the startup, open up a browser and navigate to [http://localhost:8180](http://localhost:8180)

## Building

Ensure you have JDK 8 (or newer), Maven 3.2.1 (or newer) and Git installed

    java -version
    mvn -version
    git --version

## Run with standalone Tomcat

To run the project with embedded Tomcat by maven:

    mvn spring-boot:run

Then navigate to [http://localhost:8000](http://localhost:8000) to see the application in action.

### Using Angular-PatternFly in the Application

1. Add Angular and Angular-PatternFly as a dependencies for the project

        $ bower install angular --save
        $ bower install angular-patternfly --save
        $ bower install patternfly --save

2. Add the following CSS include to your HTML file(s):

        <!-- Angular-PatternFly Styles -->
        <link rel="stylesheet" href="bower_components/angular-patternfly/dist/styles/angular-patternfly.min.css" />

3. Add the following script includes to the HTML file(s):

        <!-- Angular-PatternFly  -->
        <script src="bower_components/angular-patternfly/dist/angular-patternfly.min.js"></script>

