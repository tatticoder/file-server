# file-server

file-server is a usier friendly file server that allows people who are less familiar with technology and not comfortable with setting up complex media servers to make a local sharable server which can be accessed by anyone in the network over any browser and stream or even download videos and songs from server.

## Warning!
Currently this app is in development and you should expect breaking changes with each update even if the version number might not indicate that which might not be backwards compatible.

## Table of Contents
- [Prerequisites](#Prerequisites)
- [Installing file-server](#Installing-file-server)
- [Using file-server](#Using-file-server)
- [How to contribute?](#How-to-contribute)
- [Report a bug](#Report-a-bug)
- [Requesting a feature](#Requesting-a-feature)
- [Contact](#Contact)
- [License](#License)

## Prerequisites

Before you begin, ensure you have met the following requirements:
* Installed Nodejs v12 onwards on your system
* Your system runs on Linux environment (Support for Windows will be added soon!)

## Installing file-server

To install file-server, run following commands:

Linux and macOS:
```
git clone https://github.com/tatticoder/file-server.git
cd file-server
npm i
```
## Using file-server

To use file-server, change the value of `directoryPath` variable in [/routes/list.js](./routes/list.js) on line 3 to path of folder you want to host.
Then run following command in terminal (in root of project folder):
```
npm run start
```
You should get output like
```
> node index.js

Listening on port 8000!!!
```
Open the URL on localhost with port number mentioned or view on other device in your LAN by using private ip address ( run `ip a` in linux to get your private IP) and port number. You can change port used by setting up environment variables default is 8000.

## How to Contribute?
You can browse through existing issues or open a new issue  and submit a PR to fix that issue.
For detailed info read [How to contribute?](./CONTRIBUTING.md)

## Report a bug
If you encountered some problem when running this app, check if issue already exists, if not open a new issue in issues tab and try to explain your problem in fewer than 100 words. Mention steps to reproduce problem if applicable. 

## Requesting a feature
If you would like to see some new feature added to this please create a new issue.

## Contact

This project is maintained by [@tatticoder](https://github.com/tatticoder) 🐛

## License

This project uses the [MIT License](./LICENSE).
