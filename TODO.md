# TODO

---

## Projects

- [x] Create (modal completely fresh instance)
  - [x] If no projects have been detected on the server, lock the UI and only
    allow for creation of a new project.
  - On create:
    - [x] Create a `projects` directory.
      - [x] Create a directory that matches what the user entered.
        - [x] Create a `tiles` directory.
    - Set a localStorage entry to:
      - [x] Maintain project name for later load.
- **Top Nav**
  - File:
    - Load:
      - [ ] Text is not grayed out, and there's a side arrow that'll expand a
        list of previous projects to choose from.
        - [ ] Updates state and storage with selected project.
    - [ ] Import
      - [ ] Uploads a `zip` file to the `projects` directory and expands it.
      - [ ] Loads the imported project.
    - [ ] Export
      - [ ] Creates a `zip` of the current project and allows the user to download it.

## Tile Builder

- [ ] **GUI**
  - On Server:
    - Handle query params:
      - [x] If `proj` is set, update `project` state.
  - On Client:
    - [ ] Map Size - [ ] x [ ] inputs to allow for 10x10, etc.
      - [ ] `+ Extend` buttons on T,B,L,R which will push empty tiles to current
        tile Arrays.
      - [ ] `Shift ` tiles button to move all tiles up, down, left, or right - to
        facilitate iteration of a map if you realize you need to enlarge/shrink a
        map's size.
    - [ ] Tools
      - [ ] Paint Brush (places one tile)
        - [ ] On click - tile placed
        - [ ] On mouse down + drag - paint tiles
      - [ ] Paint Bucket (inserts tile to every space on the level)
    - [ ] Z-Offset toggles/radios. 1x, 2x, 3x, etc. When toggled, the tile will
      have a Z offset of tile size times `currOffset`.
    - LocalStorage:
      - On load:
        - [ ] Load GUI pane positioning.
        - [x] If `project` is undefined, check for it in storage and update state.
          - [x] Append query param of `proj=<NAME>` so it can be loaded on the server.
      - During interactions:
        - [ ] Maintain GUI pane positioning.
- [ ] **Isometric grid**
  - [ ] Draws transparent grid over entire visible area
  - [ ] Draws an outline in the center of the grid based on the user defined
    grid size. So if a user says 10x10, then there'll be a 10x10 outline with
    transparent lines within it.
  - [ ] On hover of a tile (within the outlined area)
    - [ ] highlight the grid tile
    - [ ] show a transparent version of the tile that will be added
- [ ] **Tile info**
  - [ ] `id`: hashed name
  - [ ] `pos`: { x, y, z }
  - [ ] `rot`: if using an SVG, or sprite sheet, the rotation could just be a
    layer or X offset to select the correct rotated view.
  - [ ] `type`: ground, wall, enemy, etc.

---

## Map Preview (instance of Map Renderer)

- [ ] Renders map
- [ ] Zoom In/Out
- [ ] Rotate map Front, Left, Back, Right
  - [ ] Update state `viewingAngle` so tile builder can rotate too

---

## Right-rail

- [ ] Load/Save project
  - [ ] Save
    - [ ] Map data
      - arrays of tile data. an array for every `layer`
    - [ ] Rail data
      - tiles and their default settings
- [ ] **Tabs**
  - [ ] Tile browser
    - [x] Add (tiles) Button - allows for selecting a folder or single files.
      - [x] Only load specific file types.
    - [ ] Each tile has a `type` dropdown so you can set a default type for
      tiles and then override that type in the builder if need be.
  - [ ] **Layers**
    - [ ] List of layers
      - [ ] GUI
        - [ ] Add (plus icon) - Create layer
        - [ ] Delete (minus icon) - Remove layer
          - [ ] Give the user an option to opt out of this

---

## Resources

**File Loading**
- https://www.html5rocks.com/en/tutorials/file/dndfiles/
- https://codepen.io/monjer/pen/JKRLzM

**Material Icons**
- https://material.io/tools/icons/?style=baseline
  - You can download icons individually or the full icon pack can be downloaded
  from https://github.com/google/material-design-icons/releases/. Unfortunately
  the `zip` is around 60mb and you have to unzip it to get to all the nested
  `svg` folders for each category. I'm just dropping what SVG's I'm using into
  the `static/svgs` folder for now.
