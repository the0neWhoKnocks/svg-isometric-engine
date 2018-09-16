# TODO

---

## Tile Builder

- [ ] **GUI**
  - [ ] Remember dragged pane positions, re-load them on builder load.
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
- [ ] **Isometric grid**
  - [ ] Draws transparent grid over entire visible area
  - [ ] Draws an outline in the center of the grid based on the user defined
    grid size. So if a user says 10x10, then there'll be a 10x10 outline with
    transparent lines within it.
  - [ ] On hover of a tile (within the outlined area)
    - [ ] highlight the grid tile
    - [ ] show a transparent version of the tile that will be added
- [ ] Tile info
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
    - [ ] Add (tiles) Button - allows for selecting a folder or single files.
      - [ ] Only load specific file types
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
