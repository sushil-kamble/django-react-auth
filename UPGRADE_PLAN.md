# Django-React Authentication Project - Dependency Upgrade Plan

## Project Overview

This document outlines a comprehensive strategy for upgrading all dependencies in the Django-React authentication project to their latest stable versions, including major version updates where appropriate.

## Current State Analysis

### Backend (Django)
- **Django**: 4.2 (current LTS)
- **djangorestframework**: 3.14.0
- **django-cors-headers**: 3.14.0
- **djangorestframework-simplejwt**: 5.3.0+
- **PyJWT**: 2.6.0
- **Database**: SQLite (development)

### Frontend (React + Vite)
- **React**: 18.2.0
- **Vite**: 4.3.2
- **React Router**: 6.10.0
- **Axios**: 1.4.0
- **Package Manager**: Mixed (yarn.lock + pnpm-lock.yaml) → **Target: pnpm only**

## Upgrade Strategy

### Phase 1: Backend Dependency Upgrades

#### 1.1 Python Package Updates
```bash
# Target versions for requirements.txt
Django==5.1.*               # 4.2 → 5.1 (major upgrade)
djangorestframework==3.15.*  # 3.14.0 → 3.15.x
django-cors-headers==4.5.*   # 3.14.0 → 4.5.x
djangorestframework-simplejwt==5.3.*  # Latest stable
PyJWT==2.10.*               # 2.6.0 → 2.10.x
asgiref==3.8.*              # 3.6.0 → 3.8.x
pytz==2024.*                # 2023.3 → 2024.x
sqlparse==0.5.*             # 0.4.3 → 0.5.x
```

#### 1.2 Django 5.1 Breaking Changes to Address
1. **URL patterns**: Update deprecated `url()` usage to `path()`
2. **Middleware**: Verify middleware order and compatibility
3. **Settings**: Review deprecated settings and update
4. **Database**: Check for migration compatibility
5. **Security**: Update CORS and security settings

#### 1.3 Implementation Steps
```bash
# 1. Create backup
cp requirements.txt requirements.txt.backup

# 2. Update requirements.txt with new versions
# 3. Create new virtual environment
python -m venv venv_new
source venv_new/bin/activate  # or venv_new\Scripts\activate on Windows

# 4. Install updated dependencies
pip install -r requirements.txt

# 5. Run Django checks
python manage.py check
python manage.py makemigrations
python manage.py migrate

# 6. Test API endpoints
python manage.py test
python manage.py runserver
```

### Phase 2: Frontend Dependency Upgrades

#### 2.1 Package Manager Cleanup
```bash
# Remove yarn.lock to standardize on pnpm
rm frontend/yarn.lock

# Update package.json scripts for pnpm
# Update README.md installation instructions
```

#### 2.2 Major Framework Updates
```json
{
  "dependencies": {
    "react": "^18.3.1",           // 18.2.0 → 18.3.1
    "react-dom": "^18.3.1",       // 18.2.0 → 18.3.1
    "react-router-dom": "^6.28.0", // 6.10.0 → 6.28.0
    "axios": "^1.7.8",            // 1.4.0 → 1.7.8
    "zustand": "^5.0.1",          // 4.3.8 → 5.0.1
    "jwt-decode": "^4.0.0",       // 3.1.2 → 4.0.0
    "dayjs": "^1.11.13",          // 1.11.7 → 1.11.13
    "js-cookie": "^3.0.5"         // Already latest
  },
  "devDependencies": {
    "vite": "^6.0.1",             // 4.3.2 → 6.0.1 (major)
    "@vitejs/plugin-react": "^4.3.4", // 4.0.0 → 4.3.4
    "eslint": "^9.15.0",          // 8.38.0 → 9.15.0 (major)
    "prettier": "^3.3.3",         // 2.8.8 → 3.3.3 (major)
    "@types/react": "^18.3.12",   // 18.0.28 → 18.3.12
    "@types/react-dom": "^18.3.1" // 18.0.11 → 18.3.1
  }
}
```

#### 2.3 Breaking Changes to Handle

**Vite 6 Changes:**
- Update `vite.config.js` for new plugin format
- Check for deprecated configuration options
- Verify HMR functionality

**ESLint 9 Changes:**
- Migrate to flat config format (`eslint.config.js`)
- Update plugin configurations
- Remove deprecated rules

**React 18.3 Changes:**
- Verify concurrent features compatibility
- Check for deprecated lifecycle methods
- Update development tools

#### 2.4 Implementation Steps
```bash
# 1. Backup current state
cp package.json package.json.backup
cp pnpm-lock.yaml pnpm-lock.yaml.backup

# 2. Remove yarn.lock
rm yarn.lock

# 3. Update package.json with new versions
# 4. Clear node_modules and reinstall
rm -rf node_modules
pnpm install

# 5. Update configuration files
# - Migrate ESLint to flat config
# - Update Vite config for v6
# - Verify Prettier config

# 6. Test build and development
pnpm run dev
pnpm run build
pnpm run lint
```

### Phase 3: Configuration File Updates

#### 3.1 ESLint Migration (v8 → v9)
Create new `eslint.config.js`:
```javascript
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Migrate existing rules from .eslintrc.cjs
      'react-refresh/only-export-components': 'warn',
    },
  },
]
```

#### 3.2 Vite Configuration Update
Update `vite.config.js` for Vite 6:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Add any new Vite 6 specific configurations
  optimizeDeps: {
    // Update if needed for new dependencies
  },
})
```

#### 3.3 Django Settings Updates
Review `backend/settings.py` for Django 5.1:
```python
# Update deprecated settings
# Verify CORS configuration
# Check middleware order
# Update security settings if needed
```

### Phase 4: Testing and Validation

#### 4.1 Backend Testing
```bash
# 1. Django system checks
python manage.py check --deploy

# 2. Database migrations
python manage.py showmigrations
python manage.py migrate

# 3. Run tests
python manage.py test

# 4. Manual API testing
# - User registration
# - User login
# - Protected routes
# - Token refresh
```

#### 4.2 Frontend Testing
```bash
# 1. Development server
pnpm run dev

# 2. Production build
pnpm run build
pnpm run preview

# 3. Linting
pnpm run lint

# 4. Manual testing
# - Login/logout flow
# - Protected routes
# - API integration
# - Component rendering
```

#### 4.3 Integration Testing
- Test full authentication flow
- Verify CORS functionality
- Check API endpoint responses
- Validate JWT token handling

### Phase 5: Documentation Updates

#### 5.1 README.md Updates
```markdown
## Frontend Installation (Updated)

### Prerequisites
- Node.js 18+
- pnpm (install with: npm install -g pnpm)

### Installation
```bash
cd frontend/
pnpm install
pnpm run dev
```

#### 5.2 Version Documentation
Create or update version compatibility notes:
- Python 3.9+ required
- Node.js 18+ required
- Django 5.1 features and changes
- React 18.3 concurrent features

## Risk Assessment and Mitigation

### High Risk Areas
1. **Vite 4 → 6**: Major version jump with potential breaking changes
2. **ESLint 8 → 9**: Complete configuration format change
3. **Django 4.2 → 5.1**: Multiple versions with accumulated changes
4. **jwt-decode 3 → 4**: API changes in JWT handling

### Mitigation Strategies
1. **Backup Strategy**: Keep backups of all configuration files
2. **Rollback Plan**: Document rollback steps for each phase
3. **Incremental Testing**: Test after each major upgrade
4. **Environment Isolation**: Use new virtual environments

### Rollback Procedures
```bash
# Backend rollback
cp requirements.txt.backup requirements.txt
pip install -r requirements.txt

# Frontend rollback
cp package.json.backup package.json
cp pnpm-lock.yaml.backup pnpm-lock.yaml
pnpm install
```

## Expected Benefits

### Performance Improvements
- **Vite 6**: Enhanced build performance and HMR
- **React 18.3**: Better concurrent rendering
- **Django 5.1**: Improved ORM and async support

### Security Enhancements
- Latest security patches across all dependencies
- Updated authentication libraries
- Modern security best practices

### Developer Experience
- Better TypeScript support
- Improved debugging tools
- Enhanced development server features
- Modern tooling configurations

## Implementation Timeline

### Phase 1-2: Core Upgrades (2-3 hours)
- Backend dependency updates
- Frontend framework upgrades

### Phase 3: Configuration (1-2 hours)
- ESLint migration
- Vite configuration
- Django settings review

### Phase 4: Testing (2-3 hours)
- Comprehensive testing
- Integration verification
- Performance validation

### Phase 5: Documentation (1 hour)
- README updates
- Migration notes
- Version documentation

**Total Estimated Time: 6-9 hours**

## Success Criteria

✅ All dependencies updated to latest stable versions
✅ No breaking functionality in authentication flow
✅ Build processes working correctly
✅ All tests passing
✅ Documentation updated
✅ Development and production environments functional

## Next Steps

1. Review and approve this upgrade plan
2. Switch to Code mode for implementation
3. Execute upgrades phase by phase
4. Validate each phase before proceeding
5. Update documentation and commit changes

---

*This upgrade plan ensures a systematic approach to modernizing the Django-React authentication project while minimizing risks and maintaining functionality.*