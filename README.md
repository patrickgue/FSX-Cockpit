# FSX-Cockpit

![In Action](doc/20191223_095210.gif)

## Template for your home cockpit

This instrument panel is intended for use in building a home cockpit, but of course [you can do with it what you want](LICENSE).

It is based on a few PowerShell scripts by [the GitHub user paruljain](https://github.com/paruljain/fsx), which provide a REST interface to several FSX flight variables.

The Instrument panel, which is entirely self written and designed, is pulling the data from the REST-interface and displays it.

## Setup

A detailed setup instruction can be found in the original [README file](README_ORIG.md) by *peruljain*.

The netsh command can be simplyfied:

`
   netsh http add urlacl url=http://+:8000/ user=everyone
`
**But:** Depending on your networking environment, this might pose a security risk 

## Differences from the original PS-Scripts

- Changed update rate to sim-framerate at [fsxSimconnect.ps1:125,128](fsxSimconnect.ps1)
- Enabled CORS at [fsxWebServer.ps1:49](fsxWebServer.ps1) (Depending on your networking environment, this might pose a security risk)
- Added several new variables to [fsx.xml](fsx.xml)

## Resources for extending the application

- Simulation Variables
  - FSX resources: [FSX Simulation Variables](https://docs.microsoft.com/en-us/previous-versions/microsoft-esp/cc526981(v=msdn.10))
  - Information for P3D is slightly more detailed but might not work with FSX [P3D Simulation Variables](http://www.prepar3d.com/SDKv3/LearningCenter/utilities/variables/simulation_variables.html)
