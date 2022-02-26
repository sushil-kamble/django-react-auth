# Django Rest Auth

## For Running the Project

### Requirements

`Python, Node, git`

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
yarn
```

<details><summary>If you don't have yarn installed</summary>
<p>

```bash
npm i
```

> Remove **yarn.lock** as you will already have **package.lock**

</p>
</details>

### 2. Run the application

```bash
yarn start # OR npm run start
```

> Make sure both frontend and backend are running.

## Reinitailize git repository

- Delete `.git` folder in project root
  > Make sure you turn on the "Show hidden files, folders and disks" option.
- `git init`
