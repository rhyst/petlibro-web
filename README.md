# Petlibro-web

An unofficial web app for Petlibro smart pet devices.

The app can be accessed here: https://rhyst.github.io/petlibro-web

## Working Devices

The following devices can be controlled with this app:

- PLAF103 Granary Feeder

PRs with support for other devices welcome.

## Functionality

The following features are implemented:

- Log in to PetLibro account
- List devices
- List device notifications
- Accept/reject and quit shared devices

For the working devices listed above the following features are implemented:
- Display today's schedule
- Display general schedule
- Toggle today's scheduled feeds
- Add/remove/edit general scheduled feeds
- Manual feed
- Display logs

## Not Implemented

The following is a list of features are not implemented but are in the official mobile apps:

- Device registration/initialisation - probably will not be implemented as the devices are initially configured via bluetooth
- User registration - may be implemented but as you need the app for device registration anyway this seems unnecessary
- Editing device details (like name or preferred unit) - may be implemented
- Editing user details (like nickname) - may be implemented
- Meal call - may be implemented
- Anything specific for non granary feeder devices - May be implemented but currently do not have access to other Petlibro devices
- Anything with camera - May be implemented but currently do not have access to a Petlibro device with a camera