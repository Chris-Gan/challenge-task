
# Project Instructions 🚀

## 🛠 Development

### 🏃‍♂️ Running Locally
To run the project in your local environment:
```bash
npm run dev
```

### 🔍 Analyzing Bottlenecks
To check for any performance bottlenecks:
```bash
npm run analyze
```

### 🧪 Unit Tests
To run the unit tests:
```bash
npm run test
```

### ✨ Enhancements
- **Server Side Rendering**: Implemented using NestJS 13.4.

- 🎨 **Design**: Page creation uses **Tailwind CSS**. This approach minimizes dependencies on other design systems and ensures an optimized bundle size.

- 🔄 **CI/CD**: Leveraging GitHub Actions and Vercel for every pull request. Here's how it works:
    - Upon making a pull request to the master branch, the CI process kicks off.
    - Checks include unit testing and linting.
    - Post successful CI build, auto deployment is initiated on Vercel.
 <img width="947" alt="image" src="https://github.com/Chris-Gan/challenge-task/assets/99733425/12abf8f7-5ac4-4b7a-87dd-1fde36eb9175">

### 🌍 Live Website
Check out the demo website <a href="https://sws-coding-test.vercel.app/stocks/au/market-cap-large" target="_blank">here </a>.

🚫 Note: This is a dummy version due to IP whitelisting constraints, preventing requests to the provided API at simplywall.st.

⚠️ Reminder
If you're cloning the project, ensure your local machine's IP is whitelisted. Without this, all your requests will fail.
