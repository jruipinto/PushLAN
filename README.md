[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

# PushLAN

PushLAN helps you share a folder with other devices in LAN.

This software is usefull when you want to share some files but a don't have a access
to a usb flash drive, or when using a usb flash drive is not feasible.
BTW transfering / sharing files with this software is usually way quicker than with
a usb flash drive.
If your devices have high speed storages (SSD, NVME, UFS, etc...) and high speed network (gigabit, 5GHz WLAN, etc) you may theorically reach 1Gbps of transfer speeds.

![Screenshot of the example](/screenshot.jpg?raw=true "Screenshot")

## Usage

- Download the appropriate release of **pushlan** for your Operative System.
- Run **PushLAN** in your desktop / laptop
- Select **Shared Folder** and **Start Sharing**
- Give network permissions if asked (windows)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

PS: This project is in need of good tests because its was made in a hurry, so feel free to write them.

### Building

    npm run build
    // or if you haven't installed any package since last build
    npm run build:quick

### Releasing

GitHub will release PushLAN every time you push a commit to master with a new tag version.

When you want to create a new release, follow these steps (if you're the owner or authorized by the owner):

    Update the version in your project's package.json file (e.g. 1.2.3)
    Tag your commit (git tag v1.2.3). Make sure your tag name's format is v*.*.*. Your workflow will use this tag to detect when to create a release
    Push your changes to GitHub (git push && git push --tags)

## Credits
App icon: [PushLAN Icon from 'morningtrain'](https://www.iconfinder.com/morningtrain)

## License
[MIT](https://choosealicense.com/licenses/mit/)
