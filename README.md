# WetpaddlersV2

DDS Hackathon 2024 product:  Offline Map POC

## iOS builds

### Setup

```sh
brew install cocoapods
cd Wetpaddlersv2/app/ios/App
pod install
```

### Build

```sh
cd Wetpaddlersv2/app
npm run build:dev
npx cap sync
npx cap open ios
```
(remove `:dev` when building for production)

Then, choose a device and hit the "play" button.

If you run into an error with `xcode-select` during `npx cap sync`, open Xcode > Settings > Locations and select the Command Line Tools (even if there's only one available in the dropdown).
