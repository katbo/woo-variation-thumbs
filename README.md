This is a basic WordPress/WooCommerce plugin that hides the product variations drop down and instead displays an unordered list of variation images or names. 

The images/names can be clicked to select. In the background, the corresponding select option will be checked, and all native WooCommerce 
processing that normally occurs upon variation selection will be triggered.

In order to find variation images/names, the plugin relies on the JSON-formatted variation data that WooComemrce conveniently supplies 
with the product variation form. No product or product meta data needs to be accesssed, making the process very fast.

Open tasks: 
1 - Add an admin settings area to allow the user to choose the variation image dimensions.
2 - Find a way for the user to specify whether a particular attribute should be displayed as image or as name. This gets complicated by the fact that WooCommerce has no action hook to add custom meta data to the product attributes table.
