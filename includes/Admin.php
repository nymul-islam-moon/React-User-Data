<?php

namespace React\User\Data;


class Admin
{
    public function __construct()
    {
        $this->run();
    }

    protected function run()
    {
        add_action( 'admin_enqueue_scripts', [$this, 'react_user_data_admin_scripts'] );
        new Admin\Menu();
    }

    public function react_user_data_admin_scripts()
    {
        wp_enqueue_style( 'react-user-data-style', plugin_dir_url( RUD_FILE ) . 'build/index.css' );
        wp_enqueue_script( 'react-user-data-script', plugin_dir_url( RUD_FILE ) . 'build/index.js', array( 'wp-element' ), '1.0.0', true );
        wp_localize_script( 'react-user-data-script', 'appLocalizer', [
            'apiUrl'    => home_url('/wp-json'),
            'nonce'     => wp_create_nonce( 'wp_rest' ),
        ] );
    }

}