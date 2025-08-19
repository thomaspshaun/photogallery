
# Photo Gallery Web App

## Project Overview

This is a modern, full-stack photo gallery web application built with React, Vite, Bootstrap, and Azure Static Web Apps. It allows users to browse photography galleries organized by folder structure, with a dynamic backend API powered by Azure Functions. The project is designed for easy deployment, maintainability, and extensibility.

## Features
- Responsive, modern UI using React and Bootstrap
- Navigation: Home, Gallery, About, Contact pages
- Dynamic gallery generation from a folder structure
- Fullscreen photo viewing and navigation
- Download photos directly from the gallery
- Backend API (Azure Functions) scans the `galleries` folder and serves gallery data
- Deployed to Azure Static Web Apps with CI/CD via GitHub Actions

## Architecture
- **Frontend:** React (Vite), Bootstrap, React Router
- **Backend/API:** Azure Functions (Node.js, ES Modules)
- **Deployment:** Azure Static Web Apps
- **CI/CD:** GitHub Actions workflow

## Folder Structure
```
Project Alpha/
├── api/                # Azure Functions backend (gallery API)
│   └── gallery/
│       └── index.js
├── galleries/          # Photo galleries (folders and images)
├── src/                # React frontend source code
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Gallery.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   └── App.jsx
├── .github/workflows/  # GitHub Actions workflow for Azure deployment
│   └── azure-static-web-apps-*.yml
├── README.md
└── ...
```

## Setup & Development
1. **Clone the repo:**
	```
	git clone https://github.com/thomaspshaun/photogallery.git
	cd photogallery
	```
2. **Install dependencies:**
	```
	npm install
	```
3. **Run locally:**
	```
	npm run dev
	```
4. **Gallery API:**
	- The backend scans the `galleries` folder for albums/photos.
	- For local development, ensure the `galleries` folder exists at the repo root.
	- The API endpoint is `/api/gallery`.

## Deployment
1. **Push changes to GitHub.**
2. **Azure Static Web Apps:**
	- Connect your repo in the Azure Portal.
	- App location: `/`
	- API location: `api`
	- Output location: `dist`
3. **CI/CD:**
	- The GitHub Actions workflow automatically builds and deploys the app and API.

## Developer Notes
- The backend API uses ES module syntax and exports a default function for Azure compatibility.
- The gallery path is set to `../galleries` relative to the API function.
- All code changes should be committed and pushed to trigger redeployment.
- For troubleshooting, check the Azure Portal (Functions, Logs) and GitHub Actions workflow runs.

## Contributing
1. Fork the repo and create a feature branch.
2. Make changes and submit a pull request.
3. Ensure new galleries/photos are added to the `galleries` folder and committed.

## License
MIT
