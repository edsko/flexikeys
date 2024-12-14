# flexikeys

Max for Live device for remapping notes, with support for randomization, key switching, and per-note velocity curves.

![](docs/interface.png)

Explanation of the interface:

* `Load` and `Save` make it possible to load and save presets.
* The device can be in `Enabled` or `Passthru` mode.
  Passthru can be helpful when setting up the mappings, whilst sending the MIDI
  unmodified through to the audio device.
* The top keyboard displays the selected input note.
  Either use the mouse to select a key, or use a MIDI input device.
* The middle keyboard sets up an optional **per note keyswitch**.
  - If used, the keyswitch note is issued prior to the note itself.
  - If more than one keyswitch is selected, a random one is chosen; this can be
    useful for selecting a random articulation.
  - If no notes are selected, no keyswitch is emitted.
* The bottom keyboard is the **per note output**.
  - If more than one output note is selected, a random one is chosen.
  - If no notes are selected, no output is emitted (the note will be silent).
* Finally, we have a **per note velocity curve**.

## Presets

Presets are simple `json` files, which makes it possible to generate them in
code, if desired (of course, these presets can also be created in the interface
itself, as described above). Here is an example:

```json
{
	"keyswitch 62" : 36,
	"keyswitch 64" : 36,
	"keyswitch 67" : 36,
	"keyswitch 71" : 36,
	"keyswitch 72" : 36,
	"keyswitch 74" : 36,
	"keyswitch 79" : 36,
	"keyswitch 81" : 36,
	"keyswitch 69" : 37,
	"keyswitch 60" : 38,
	"keyswitch 76" : 39,
	"keyswitch 65" : 40,
	"pitch 60" : [ 69, 70, 72, 74, 76, 77, 81 ],
	"pitch 62" : 69,
	"pitch 64" : 70,
	"pitch 65" : [ 69, 70, 72, 74, 76, 77, 81 ],
	"pitch 67" : 72,
	"pitch 69" : 62,
	"pitch 71" : 62,
	"pitch 72" : 74,
	"pitch 74" : 76,
	"pitch 76" : [ 69, 70, 72 ],
	"pitch 79" : 77,
	"pitch 81" : 81,
	"velocity 60" : [ 0.5, 0.0, 0, 32 ],
	"velocity 65" : [ 0.5, 0.0, 0, 32 ]
}
```

This particular preset sets up a 16-pad MIDI controller for playing the
Soniccouture Hang Mk 2 handpan. The arguments to the velocity curve are
`drive`, `comp`, `out low` and `out hi`.


