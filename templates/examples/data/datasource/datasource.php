<?php

/* Test Module: */
$modules["datasource"] = array(
        /* The name of the module, used in index listings, titles, headers */
		"name" => "DataSource Utility",
        /* The type of the module.
           Currently used values for type are:
           "css", "core", "utility", "tool" */
		"type" => "utility",
        /* This description appears on the component's examples index page*/
		"description" => "The DataSource Utility provides a common configurable interface for other components to fetch tabular data from a variety of local or remote sources.",
        /* Whether or not the component has a cheatsheet. PR1 will not snip with
           cheatsheets */ 
		"cheatsheet" => false 
);	

/* Sample Utility Examples */
$examples["datasource_local_array"] = array(
    /* Example Name */
	name => "Local Array DataSource", 
    
    /* Modules that this example should be listed with; this array is parallel
    to the sequence array*/
	modules => array("datasource"),
    
    /* Use this as a tease; e.g., for a tooltip hover; it appears next to the 
    example title on component example index pages.*/
	description => "DataSource pointing to a local array",

    /* Use this to prioritize your examples; examples will be sorted based on 
    this number, then based on alphabet (lower numbers come first); this array
    is parallel to the modules array, so you can rank the priority differently
    for the different modules/components being exemplified*/
	sequence => array(1), 

    /* If require, the example will only be viewable in a new window; otherwise,
    the example will display inline.  Examples that require new windows need to
    exist as complete html documents in their _source.html files, including
    relative paths to YUI resources in /build; they are also responsible for
    their own logger displays if they need them.  Best to avoid this except in 
    the case of the CSS examples.  All examples can load in new windows
    optionally if this value is default. 
    If the value is "suppress", no new window option is provided.*/
	newWindow => "default", 

    /* List the YUI components that are necessary to make this example tick;
    Loader will be used to pull in the needed components.*/
	requires => array("datasource"), 
    
    /* Does this example require syntax highlighting?  If so, the approprate JS 
    and CSS resources will be placed on the page. */
	highlightSyntax => true,

    /* Class name to add to the body tag, if required by the example. If
    a bodyclass is not specified (or false), the default body class of
    "yui-skin-sam" will be applied */
    bodyclass => false,

    // NOT SUPPORTED FOR PR1
    /* Use this array to designate what "sources" in the logger console
    should NOT be suppressed.*/
	// logger => array("event", "example"),

    // NOT SUPPORTED FOR PR1
    /* If "require", the logger will always load for this example, regardless 
    of querystring; if "suppress", it will never load; otherwise, default will
    be applied (logger optional); note that if the "newWindow" property is 
    "require", no Logger will be displayed on the example page (you can display
    a logger in your source if you wish).*/
	// loggerInclude => "suppress" 
);

/*$examples["datasource_xhr_json"] = array(
	name => "JSON over XHR DataSource",
	modules => array("datasource"),
	description => "DataSource pointing to JSON data accessed via XHR",
	sequence => array(2),
	newWindow => "default",
	requires => array("datasource"),
	highlightSyntax => true,
    bodyclass => false
);*/

?>
