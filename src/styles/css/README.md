# Odyssey Icons

## Icons Currently In Use

##### This list will be continuously updated as we use and rename the icons in the system.
##### If you are searching for an icon to use, go to the [Iconography Master > Original SVG](https://drive.google.com/drive/folders/0B_PEsHoMmVcpUjFJczJRQXo0bEk) folder on Google Drive. The SVGs are categorized in 97 subfolders.

| Icon Name | SVG (Original) Name | Folder  |
| ----- | ----- | ----- |
alarm-o | alarm | 05-time
arrow-up-o | arrow-up-12 | 96-arrows
arrow-down-o | arrow-down-12 | 96-arrows
arrow-left-o | arrow-left-12 | 96-arrows
arrow-right-o | arrow-right-12 | 96-arrows
bar-chart-o | graph-bar-2 | 42-business
bars | view-headline | 18-content
book-view-o | book-view | 18-content
bookmark-o | bookmark-article | 30-bookmark-tags
calendar-o | calendar-2 | 05-time
clipboard-o | task-check-1 | 85-tasks
close-o | close | 02-status
cog-o | cog | 03-settings
desktop-o | computer-imac-1 | 11-computers
envelopes-o | envelope-3 | 06-email
flowchart-o | flow-chart-1 | 31-organization
folder-o| folder-1 | 83-folders
funnel-o | filter-12 | 18-content
help-circle-o | help-circle | 22-interface-feedback
home-o | home-1 | 53-places
home-pin-o | house-location-pin | 54-real-estate
information-circle-o | information-circle-o | 22-interface-feedback
map-marker-o | location-pin-8 | 52-locations
paint-palette-o | paint-palette | 32-design
pie-chart-o | graph-pie-2 | 42-business
pin | pin-1 (solid) | 01-content-edition
pin-o | pin-1 | 01-content-edition
report-problem-circle-o | report-problem-circle | 22-interface-feedback
report-problem-diamond-o | report-problem-diamond | 22-interface-feedback
report-problem-triangle-o | report-problem-triangle | 22-interface-feedback
search-o | search | 01-content-edition
window-application-o | window-module | 47-applications
window-module-o | window-tabs-1 | 47-applications


### Directions:

#### Find Fonts

0. Make a copy of the icon that you are using. **DO NOT** completely remove the file from the shared folders.
  - If you are using an icon and planning on renaming it (e.g., `arrow-down-5.svg` to `arrow-down-o`), please make note of it in the table above, along with the subfolder that the original SVG is located in.

0. Place the copy of the icon(s) that you are planning on using in the **Iconography Master > Odyssey > SVG** folder.

#### Generate Fonts

0. Go to [Icomoon](https://icomoon.io/app/) and login with the following information:
```
Username: mmarrache@processmap.com
Password: iconswehave
```

0. Click the `hamburger menu` icon to the right of the **Odyssey Icons** library and select `Import to Set`.

0. Select newly added icons from the **Find Fonts** section above.

0. Once the icon(s) are added, Click the `hamburger menu` icon again and click on `Select All`.

0. At the bottom of the page, click on the `Generate Font` tab.
	- **Before downloading the font**, click on the settings next to the `Download` button and set the Font Name as `Odyssey-Icons` and the Class Prefix to `oi-`.
	- Click on the CSS Selector dropdown, select 'Use a Class', and put `.oi` in the text input.

0. Click on the `Download` button inside the `Generate Font` tab.

#### Install Fonts

0. Open the `Odyssey-Icons.zip`.

0. Move the files in the `fonts/` folder to the [`src/styles/css/fonts/`](https://github.com/ProcessMAP/cosmos/tree/master/src/styles/css/fonts) directory in [cosmos repo](https://github.com/ProcessMAP/cosmos/).

0. Next, open the `style.css` file and copy and paste only the font icon classes at the bottom of the file beginning with `.oi-` **ONLY** to the [`src/styles/css/odyssey-icons.css`](https://github.com/ProcessMAP/cosmos/blob/master/src/styles/css/odyssey-icons.css) file in [cosmos repo](https://github.com/ProcessMAP/cosmos/).

0. Verify there are no errors in the local project that should be running on your `localhost`.

0. Then `commit` and `push` all your changes as usual.
