---
'id': 3
'title': 'My picoCAD to Godot workflow'
'uploaded': '2024-01-12'
'updated': '2024-01-12'
'tags': 'blender,game,godot,picocad'
---

[picoCAD](https://johanpeitz.itch.io/picocad) is a very neat tool for creating and exporting lowpoly 3D models. I have a simple (and probably flawed) workflow for importing these models into Godot. This post is not about using picoCAD itself; it covers how I import the already-completed model into Godot 4.2.1 (the most recent version as of the writing of this post).

## Export the model

To start with, I have made a ~busted~ beautiful cannon model.

![exported GIF of picoCAD cannon model](/3/cannon.gif)

picoCAD's toolbox facilitates exporting to OBJ - simply drag-and-drop your picoCAD project file into the toolbox window and `Export OBJ`.

![screenshot of picoCAD toolbox](/3/picocad_toolbox.png)

## Fix the normals

In my experience, something always goes wrong with the normals of my model. This results in issues like the following, where a particular face is illuminated from the wrong direction (inside the object).

![GIF of light source illuminating cannon object from within](/3/normals_bugged.gif)

To get around this, import the OBJ into Blender, disable `Auto Smooth`, and export a new OBJ file.

![Blender auto smooth option](/3/blender_auto_smooth.png)

## Import into Godot

Import your OBJ and PNG files into your Godot project (I just drag-and-drop them from my file browser into the FileSystem panel). Then, add the OBJ file to your scene by dragging and dropping it directly into the scene view from the FileSystem panel. This should allow you to see your object in the scene, albeit with no texturing at all.

![Cannon model with no texture, imported into Godot](/3/cannon_godot_no_texture.png)

To apply your texture:

- select the model's node in the scene tree
- in the Inspector, under `MeshInstance3D`, apply a `New StandardMaterial3D` to the `Surface Material Override` property (1)
- expand this new material property, and find its `Albedo` property
- `Load` a new `Texture` (2)
- select your PNG texture
- expand the `Sampling` property, and change `Filter` to `Nearest` for those eye-gougingly sharp pixels (3)

![Cannon model with no texture, imported into Godot](/3/godot_apply_texture.png)

That should be enough to get your texture working correctly. However, you may notice artifacts resulting from the texture compression, like on my cannon's "wheel":

![Compression artifacts on the cannon's wheel, in Godot](/3/godot_cannon_wheel_artifacts.png)

If this bothers you, it's an easy fix.

## Reimport texture

Select the PNG file in the FileSystem panel. In the Import tab, choose a different `Mode` under `Compress`:

![Reimporting the cannon's texture to remove compression artifacts](/3/godot_texture_reimport.png)

And that's it! I hope this helps you.
