[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

# Lan Drive

Lan-drive replaces your pen-drive by letting you share a folder on your local area network without the hassles of configuring a shared folder on windows, samba server or any other technique.

![Screenshot of the example](/screenshot.jpg?raw=true "Screenshot")

## Usage

- Download the appropriate release of **LanDrive** for your Operative System.
- Run **Lan Drive** in your desktop / laptop
- Select **Shared Folder** and **Start Sharing**
- Give network permissions if asked (windows)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

PS: This project is in need of good tests because its was made in a hurry, so feel free to write them.

### Building

Using this build workflow, GitHub will build your app every time you push a commit.

### Releasing

When you want to create a new release, follow these steps:

    Update the version in your project's package.json file (e.g. 1.2.3)
    Commit that change (git commit -am v1.2.3)
    Tag your commit (git tag v1.2.3). Make sure your tag name's format is v*.*.*. Your workflow will use this tag to detect when to create a release
    Push your changes to GitHub (git push && git push --tags)

After building successfully, the action will publish your release artifacts. By default, a new release draft will be created on GitHub with download links for your app. If you want to change this behavior, have a look at the electron-builder docs.

## Credits
App icon: [Lan Drive Icon from 'morningtrain'](https://www.iconfinder.com/morningtrain)

## License
[MIT](https://choosealicense.com/licenses/mit/)
