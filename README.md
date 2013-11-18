FloodSimulation-Browser
=======================

Flood Simulation Browser

This is the flood simulation browser which is an application that can
show floods in different areas around the world. It is created a
bachelor Computer Science project that was completed in 2011. The goal of
this research was to investigate the possible tools that are available to
create crossplatform mobile/tablet based applications.
After extensive research the choice was to create the application with
Sencha Touch.


Installation
========
# Download the SDK from the sencha touch-website. Note that this
application was only tested with sencha-touch 2.2. If you try new
versions it could well be that it is not working and you have to debug :)
# unpack it to the www/ directory and rename the folder to sdk

# Download touchcharts from sencha touch (used for plotting).
# Replace the sdk/sencha-touch.js and unpack touch-chart/src/ into sdk
src, it will ask you to replace certain files, please do so

# Open index.html in the browser
# Hopefully everything is OK and the app can be used.

Problems
=====
The major 'problem' is that the browser doens'nt allow Cross-site
Scripting. It raises the 'Access-Control-Allow-Origin' exception, when
accessing the API
That means that the API is not written in jsonp and is not able to be
used at this moment. Because this was a graduation project I am looking
forward to pick stuff up and take on some API responsibilities.

