# Django Rest Auth with React Vite - 2025

## Steps for Running Project

### Requirements

- **Python 3.9+**
- **Node.js 18+**
- **pnpm** (install with: `npm install -g pnpm`)
- **git**

### Clone the repository:

- Create a empty folder and `cd` into that folder.
- Type the following command to clone project in same directory.

```bash
git clone https://github.com/sushil-kamble/django-react-auth.git .
```

## Backend

### 1. Go to the root folder and perform the following commands:

`cd backend/`

### 2. Create and activate the virtual environment

```bash
python -m venv venv
venv\Scripts\activate
```

> If their is any error activating virtual env, please google search it for your system or try `venv\bin\activate` or `source venv/bin/activate`

### 3. Install required packages

```bash
pip install -r requirements.txt
```

### 4. Run the server

```bash
python manage.py migrate
python manage.py runserver
```

## Frontend

- Head back to the root folder
- Enter in `cd frontend/`

### 1. Installing packages

```bash
pnpm install
```

### 2. Run the application

```bash
pnpm run dev
```

> Make sure both frontend and backend are running.

> Make sure both frontend and backend are running.

## Styling (Recommended)

For enhanced styling with Tailwind CSS and shadcn/ui components, it is recommended to switch to the `feature/tailwind-shadcn-ui` branch:

```bash
git checkout feature/tailwind-shadcn-ui
```

This branch includes modern UI components and better styling architecture for the frontend.

## Recent Major Upgrades (2025)

This project has been upgraded to use the latest stable versions of all dependencies:

### Backend Updates
- **Django**: 4.2 → 5.1.4 (latest stable)
- **djangorestframework**: 3.14.0 → 3.15.2
- **django-cors-headers**: 3.14.0 → 4.5.0
- **PyJWT**: 2.6.0 → 2.10.1
- All other Python packages updated to latest compatible versions

### Frontend Updates
- **React**: 18.2.0 → 18.3.1
- **Vite**: 4.3.2 → 6.3.5 (major upgrade)
- **ESLint**: 8.x → 9.x (flat config migration)
- **React Router**: 6.10.0 → 6.30.1
- **Zustand**: 4.x → 5.x
- **jwt-decode**: 3.x → 4.x (breaking change handled)
- **Prettier**: 2.x → 3.x
- Package manager standardized to **pnpm**

### Key Improvements
- Enhanced build performance with Vite 6
- Modern ESLint flat configuration
- Updated security patches across all dependencies
- Better development experience with latest tooling
- Improved TypeScript support

## Reinitailize git repository

- Delete `.git` folder in project root
  > Make sure you turn on the "Show hidden files, folders and disks" option.
- `git init`
