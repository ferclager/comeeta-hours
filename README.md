# cometa-hours

## Description
cometa-hours is an application that allows you to log in and insert your planned or completed activity hours for the day on the Cometa website.

#### Configuration
Before using the application, make sure to configure the default.json file with your own data. Here is an example of how to configure it:
```json
{
    "login": {
      "user": "your.username",
      "pass": "your.pass",
      "id": "your.company.id"
    },
    "project": "your.project.number",
    "activity": "your.activity.number",
    "hours": {
      "Monday": "0500",
      "Tuesday": "0700",
      "Wednesday": "0800",
      "Thursday": "0900",
      "Friday": "0700",
      "Saturday": "0000",
      "Sunday": "0000"
    }
  }
```
#### Docker commands
```console
docker build -t mycometa:1.0 .
docker run --cpus=1 -m 512m --memory-reservation=256m -it mycometa:1.0 bash
```

#### Manual execution:
```console
./today.sh
```

## Steps:
### Using Docker:
1. Clone or download this repository.
2. Configure the `default.json`` file with your own data.
3. Build the Docker image.
```console
    docker build -t mycometa:1.0 .
```
4. Run the Docker container in interactive mode.
```console
    docker run --cpus=1 -m 512m --memory-reservation=256m -it mycometa:1.0 bash
```
5. Execute the `today.sh` script to insert the configured hours for today.
```console
    ./today.sh
```
### Running Locally (without Docker):
1. Clone or download this repository.
2. Configure the `default.json`` file with your own data.
3. Navigate to the main folder.
4. Run the `install.sh` script once (skip this step for subsequent runs).
```console 
    ./install.sh
```
5. Execute the `today.sh` script to insert the configured hours for today.
```console
    ./today.sh
```

### Check if you have a Mac with M chip
If you are unsure whether you have a Mac with an M chip, you can use the `check.sh` script:
```console
./check.sh
```
If the result is:
```
M chip detected; please, use script install.sh one time, and daily, your today.sh.
```
Then you cannot run the application using Docker.

*Note: Make sure to replace your.username, your.pass, your.company.id, your.project.number, your.activity.number, and hours with your actual credentials and desired hours.*
