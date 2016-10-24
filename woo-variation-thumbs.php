<?php
/*
 * Plugin Name: Woo Variation Thumbs
 * Plugin URI: 
 * Description: Replace variation dropdown select with images
 * Version: 1.0
 * Author: katbo
 * Author URI: 
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: woo-variation-thumbs
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if (!class_exists('WooVariationThumbs')) {

    class WooVariationThumbs {
        
        function __construct() {

            add_action( 'wp_enqueue_scripts', array( $this, 'add_wvts_scripts') );
			
        } 
        
        public function add_wvts_scripts() {

            wp_register_style( 'woo-variation-thumbs-style', plugins_url('assets/woo-variation-thumbs.css', __FILE__) );
            wp_enqueue_style( 'woo-variation-thumbs-style' );
            wp_register_script( 'woo-variation-thumbs-script', plugins_url('assets/woo-variation-thumbs.js', __FILE__), 'jquery', false, true );
            wp_enqueue_script( 'woo-variation-thumbs-script' );
        }
            
    }
}

global $woo_variation_tumbs;
$woo_variation_htumbs = new WooVariationThumbs();

?>