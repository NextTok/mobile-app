# NikNakApp

The **NikNak App** is the default UI for the NikNak Social Media Network.

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [Yarn](https://yarnpkg.com/)
- [Xcode Command Line Tools](https://developer.apple.com/xcode/) (for iOS simulator)
- [Expo CLI](https://expo.dev/) (if applicable)

---

### Steps to Get Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/TheNikNakCollective/NikNakApp.git
   cd NikNakApp
   ```

2. **Install Dependencies**:
   Run the following command to install all required dependencies:
   ```bash
   yarn install
   ```

---

## Running the App

First open up an iOS Simulator

### Install the NikNak App

To open the iOS simulator and prepare for app installation:
```bash
yarn install:simulator
```

### Launch the App

Once the simulator is open, start the app:
```bash
yarn start
```

This will initialize the development server and allow you to preview the app in the iOS simulator.

---

## Scripts

Here are the available scripts for common development tasks:

| Command                  | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| `yarn install`           | Installs all project dependencies.                                          |
| `yarn install:simulator` | Opens the iOS simulator and prepares the environment for app installation.  |
| `yarn start`             | Starts the app and launches it in the simulator or Expo Go.                |

---

## Troubleshooting

### Common Issues
- **Simulator Not Booted**:
  Ensure the simulator is running before executing `yarn start`. Use `yarn install:simulator` to open the simulator.
  
- **Dependency Issues**:
  If you encounter dependency conflicts, try clearing the cache and reinstalling:
  ```bash
  yarn cache clean
  yarn install
  ```

### Debugging
- Use the React Native Developer Menu (Cmd+D in iOS simulator) for debugging tools like live reload and performance profiling.

---

## Contributing

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push your changes:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---