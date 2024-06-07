<?php

namespace React\User\Data\Admin;

class Menu {

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'admin_menu' ) );
    }

    public function admin_menu() {
        add_menu_page( __( 'React User Data', 'react-user-data' ), __( 'React User Data', 'react-user-data' ), 'manage_options', 'react-user-data', array( $this, 'react_user_data' ), 'dashicons-superhero'  );
//        add_submenu_page( 'mail-blaster-pro', __( 'E-mails', 'mail-blaster-pro' ), __( 'E-mails', 'mail-blaster-pro' ), 'manage_options', 'mail-blaster-pro-email', array( $this, 'email_page' ) );
//        add_submenu_page( 'mail-blaster-pro', __( 'Users', 'mail-blaster-pro' ), __( 'Users', 'mail-blaster-pro' ), 'manage_options', 'mail-blaster-pro-user', array( $this, 'user_page' ) );
    }


    public function react_user_data() {
        echo 'Run react app here';
    }



}