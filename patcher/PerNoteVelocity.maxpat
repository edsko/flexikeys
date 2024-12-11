{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 9,
			"minor" : 0,
			"revision" : 2,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 181.0, 147.0, 1021.0, 628.0 ],
		"openinpresentation" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"boxes" : [ 			{
				"box" : 				{
					"filename" : "ComputeVelocityCurve.js",
					"id" : "obj-15",
					"maxclass" : "newobj",
					"numinlets" : 4,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 15.0, 90.0, 209.999991953372955, 22.0 ],
					"saved_object_attributes" : 					{
						"parameter_enable" : 0
					}
,
					"text" : "v8 ComputeVelocityCurve",
					"textfile" : 					{
						"filename" : "ComputeVelocityCurve.js",
						"flags" : 0,
						"embed" : 0,
						"autowatch" : 1
					}

				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"embed" : 0,
					"id" : "obj-9",
					"maxclass" : "itable",
					"name" : "",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "int", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 15.0, 135.0, 75.0, 75.0 ],
					"pointcolor" : [ 1.0, 0.913725490196078, 0.145098039215686, 1.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 15.0, 120.0, 75.0, 75.0 ],
					"range" : 128,
					"size" : 128
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 10.0,
					"id" : "obj-7",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 206.0, 15.0, 60.0, 50.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 45.0, 60.0, 60.0, 50.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "outLow",
							"parameter_modmode" : 4,
							"parameter_osc_name" : "<default>",
							"parameter_shortname" : "Out Low",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "outLow"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 10.0,
					"id" : "obj-6",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 142.0, 15.0, 60.0, 50.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 45.0, 0.0, 60.0, 50.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_initial" : [ 127.0 ],
							"parameter_initial_enable" : 1,
							"parameter_longname" : "outHi",
							"parameter_modmode" : 4,
							"parameter_osc_name" : "<default>",
							"parameter_shortname" : "Out Hi",
							"parameter_type" : 1,
							"parameter_unitstyle" : 0
						}

					}
,
					"varname" : "outHi"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 10.0,
					"id" : "obj-4",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 79.0, 15.0, 45.0, 50.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 60.0, 45.0, 50.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "comp",
							"parameter_mmax" : 1.0,
							"parameter_mmin" : -1.0,
							"parameter_modmode" : 3,
							"parameter_osc_name" : "<default>",
							"parameter_shortname" : "Comp",
							"parameter_type" : 0,
							"parameter_unitstyle" : 1
						}

					}
,
					"varname" : "comp"
				}

			}
, 			{
				"box" : 				{
					"fontsize" : 10.0,
					"id" : "obj-2",
					"maxclass" : "live.dial",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 15.0, 15.0, 45.0, 50.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 0.0, 45.0, 50.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "drive",
							"parameter_mmax" : 1.0,
							"parameter_mmin" : -1.0,
							"parameter_modmode" : 3,
							"parameter_osc_name" : "<default>",
							"parameter_shortname" : "Drive",
							"parameter_type" : 0,
							"parameter_unitstyle" : 1
						}

					}
,
					"varname" : "drive"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 1 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 2 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 3 ],
					"source" : [ "obj-7", 0 ]
				}

			}
 ],
		"originid" : "pat-31",
		"parameters" : 		{
			"obj-2" : [ "drive", "Drive", 0 ],
			"obj-4" : [ "comp", "Comp", 0 ],
			"obj-6" : [ "outHi", "Out Hi", 0 ],
			"obj-7" : [ "outLow", "Out Low", 0 ],
			"parameterbanks" : 			{
				"0" : 				{
					"index" : 0,
					"name" : "",
					"parameters" : [ "-", "-", "-", "-", "-", "-", "-", "-" ]
				}

			}
,
			"inherited_shortname" : 1
		}
,
		"dependency_cache" : [ 			{
				"name" : "ComputeVelocityCurve.js",
				"bootpath" : "~/Documents/repo/flexikeys/patcher",
				"patcherrelativepath" : ".",
				"type" : "TEXT",
				"implicit" : 1
			}
 ],
		"autosave" : 0,
		"stripecolor" : [ 0.672393599486987, 0.672393440158794, 0.672393481793796, 1.0 ],
		"oscreceiveudpport" : 0
	}

}
