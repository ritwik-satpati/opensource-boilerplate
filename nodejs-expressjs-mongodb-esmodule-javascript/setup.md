# Project MAP - Setup

- Rename file name `.env.sample` to `.env`
- Setup `.env` file
  - `PORT` (Optional - Change)
  - `CORS_ORIGIN` (Optional - Change)
  - `USER_ACCESS_TOKEN_SECRET` - Set Keys [Can use this - `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` in the terminal]
  - `USER_ACCESS_TOKEN_EXPIRY` - Set Expiry day [like `30d`]
  - `MONGODB_URI` - Find in [Mongo DB Atlas](https://cloud.mongodb.com/) or user local mongodb uri with port 
- In the terminal `npm init`
- In the terminal `npm run dev` to live the project