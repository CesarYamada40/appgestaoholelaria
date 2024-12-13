# Hotel Management System Lite - Architecture

## Frontend Architecture
- React Native + Expo
- TypeScript for type safety
- Native Base for lightweight UI components
- Context API for state management
- SQLite for local data persistence

### Key Components
- Navigation: React Navigation
- State Management: React Context API
- UI Framework: Native Base
- Storage: SQLite + AsyncStorage
- Image Handling: expo-image-manipulator

## Data Structure
### SQLite Tables
1. Reservations
   - id (PRIMARY KEY)
   - guest_id (FOREIGN KEY)
   - room_id (FOREIGN KEY)
   - check_in_date
   - check_out_date
   - status
   - created_at

2. Rooms
   - id (PRIMARY KEY)
   - number
   - type
   - price
   - status
   - description

3. Guests
   - id (PRIMARY KEY)
   - name
   - email
   - phone
   - created_at

## Performance Optimizations
- Lazy loading for screens
- Image compression
- Local caching
- Pagination for lists
- Minimal external dependencies

## Data Flow
1. UI Components
2. Context API
3. SQLite Operations
4. Cache Management

## Offline Capabilities
- Full CRUD operations while offline
- Sync queue for future online features
- Local data persistence

## Development Guidelines
- Keep bundle size under 20MB
- Optimize launch time (target: <2s)
- Monitor memory usage (<100MB)
- Use lazy loading for non-critical screens
