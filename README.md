# comeeta-hours

## Description

comeeta-hours is a Node.js automation tool that logs into the [Cometa](https://www.cometasoftware.com) website and fills in your planned or completed activity hours for the current day. It uses [Puppeteer](https://pptr.dev/) to drive a headless browser, so you can run it once daily to submit your timesheet automatically.

## Prerequisites

- **Node.js** >= 18 (tested with Node 20)
- **npm** (bundled with Node.js)
- A valid Cometa account (username, password, company ID)

## Project Structure

```
comeeta-hours/
├── config/
│   └── default.json   # User configuration (credentials, project, hours)
├── evidences/          # Screenshots saved after each run (git-ignored)
├── index.js            # Main Puppeteer automation script
├── today.sh            # Wrapper script that retries until success
├── install.sh          # One-time setup script (installs Homebrew, Node, deps)
├── check.sh            # Detects Apple Silicon (M chip) vs Intel
├── Dockerfile          # Docker image definition
├── package.json        # npm dependencies
└── README.md
```

## Configuration

Before using the application, copy and edit `config/default.json` with your own data:

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

| Field | Description |
|-------|-------------|
| `login.user` | Your Cometa username |
| `login.pass` | Your Cometa password |
| `login.id` | Your company ID in Cometa |
| `project` | Project number to log hours against |
| `activity` | Activity number within the project |
| `hours.<Day>` | Hours to log for each weekday (format: `HHMM`, e.g. `"0800"` = 8 h 00 min) |

> **Important:** Never commit real credentials. The `config/default.json` file ships with placeholder values; replace them before running.

## Getting Started

### Using Docker

1. Clone this repository.
2. Edit the `config/default.json` file with your own data.
3. Build the Docker image:
   ```console
   docker build -t mycometa:1.0 .
   ```
4. Run the Docker container in interactive mode:
   ```console
   docker run --cpus=1 -m 512m --memory-reservation=256m -it mycometa:1.0 bash
   ```
5. Inside the container, execute the script:
   ```console
   ./today.sh
   ```

### Running Locally (without Docker)

1. Clone this repository.
2. Edit the `config/default.json` file with your own data.
3. Navigate to the project folder.
4. Run the `install.sh` script once to install dependencies (skip on subsequent runs):
   ```console
   ./install.sh
   ```
5. Execute the script to insert the configured hours for today:
   ```console
   ./today.sh
   ```

### Apple Silicon Check

If you are unsure whether your Mac has an Apple Silicon (M-series) chip, run:

```console
./check.sh
```

This will tell you whether you are on `arm64` (Apple Silicon) or `x86_64` (Intel) and recommend the appropriate workflow.

## How It Works

1. **`today.sh`** invokes `node index.js` in a retry loop (up to 49 attempts). It exits immediately on login failure and retries on other transient errors.
2. **`index.js`** launches a headless Chromium browser via Puppeteer, logs into the Cometa website, navigates to the hours entry page, fills in the project, activity, date, and hours, then confirms submission.
3. Screenshots are saved to the `evidences/` directory for audit purposes.

## License

This project is licensed under the [MIT License](LICENSE).

---

*Note: Replace all placeholder values in `config/default.json` with your actual credentials and desired hours before running.*
