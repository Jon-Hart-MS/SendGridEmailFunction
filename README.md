# SendGrid Email Azure Function

## Description
This Azure Function exposes an HTTP endpoint (`contactmetrigger`) that receives JSON data containing `name`, `email`, and `message`. It then sends an email via SendGrid based on the provided details.

## What Are Azure Functions?
Azure Functions is a serverless solution on Microsoft Azure. It lets you run event-driven code without managing servers. In this case, an HTTP request triggers the function.

## Requirements
- Node.js
- Azure Functions Core Tools
- A valid SendGrid API key (`SENDGRID_API_KEY` environment variable)

## Installation
1. Clone this repository.
2. Navigate to the project folder and install dependencies:

   ```bash
   npm install
   ```

3. For local testing, store your SendGrid API key in the local.settings.json file. Update the SENDGRID_API_KEY value with your actual key:

   ```
      {
        "IsEncrypted": false,
        "Values": {
         "FUNCTIONS_WORKER_RUNTIME": "node",
         "AzureWebJobsStorage": "UseDevelopmentStorage=true",
         "SENDGRID_API_KEY": "YOUR_SENDGRID_API_KEY"
        }
      }
   ```

## Running Locally
Start the Azure Function Core Tools:

```bash
func start
```

By default, the function runs at:

```
http://localhost:7071/api/contactmetrigger
```

## Invoking the Function
Use PowerShell to send a request with the required JSON fields:

```powershell
Invoke-RestMethod -Uri "http://localhost:7071/api/contactmetrigger" -Method POST `
    -Body (@{ name="John Doe"; email="john@example.com"; message="Hello!" } | ConvertTo-Json) `
    -ContentType "application/json"
```

## Deployment
Deploy the function to Azure using your preferred method (Azure CLI, VS Code extensions, or Azure Portal). Ensure the `SENDGRID_API_KEY` setting is configured as an Application Setting in Azure.

```
