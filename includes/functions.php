<?php

/**
 * Fetch total Users form database
 *
 * @param $args
 * @return array|object|stdClass[]|null
 */
function rud_get_users( $args = [] ) {
    global $wpdb;
    $defaults = [
        'number'    => 20,
        'offset'    => 0,
        'orderby'   => 'id',
        'order'     => 'ASC',
        'search'    => '',
        'start_date' => '',
        'end_date'   => '',
    ];

    $args = wp_parse_args( $args, $defaults );

    // search section
    $search = '';
    if ( ! empty( $args['search'] ) ) {
        $search = $wpdb->prepare(
            "AND (name LIKE %s OR email LIKE %s OR phone LIKE %s)",
            '%' . $wpdb->esc_like( $args['search'] ) . '%',
            '%' . $wpdb->esc_like( $args['search'] ) . '%',
            '%' . $wpdb->esc_like( $args['search'] ) . '%'
        );
    }

    // Build the date range query part
    $date_query = '';
    if ( ! empty( $args['start_date'] ) && ! empty( $args['end_date'] ) ) {
        $date_query = $wpdb->prepare( "AND DATE(created_at) BETWEEN %s AND %s", $args['start_date'], $args['end_date'] );
    } elseif ( ! empty( $args['start_date'] ) ) {
        $date_query = $wpdb->prepare( "AND DATE(created_at) = %s", $args['start_date'] );
    }
    
    $items = $wpdb->get_results(
        $wpdb->prepare(
            "SELECT * FROM {$wpdb->prefix}react_user_data_users WHERE 1=1 $search $date_query ORDER BY {$args['orderby']} {$args['order']} LIMIT %d, %d",
            $args['offset'],
            $args['number']
        )
    );

    return $items;
}


/**
 * custom users data form users table in word-press
 */
function get_all_users_data( $args = [] ) {
    // Set up default query arguments
    $defaults = [
        'number'    => 20,
        'offset'    => 0,
        'orderby'   => 'ID',
        'order'     => 'DESC',
        'role__in'  => ['administrator', 'editor', 'author', 'contributor', 'subscriber'] // Include all roles
    ];

    // Parse incoming $args into an array and merge it with $defaults
    $args = wp_parse_args( $args, $defaults );

    // Set up query arguments to retrieve users based on parsed arguments
    $query_args = [
        'number'    => $args['number'],
        'offset'    => $args['offset'],
        'orderby'   => $args['orderby'],
        'order'     => $args['order'],
        'role__in'  => $args['role__in'],
    ];

    // Retrieve the user query
    $user_query = new WP_User_Query($query_args);
    // Get the results
    $users = $user_query->get_results();

    // Initialize an array to hold user data
    $users_data = [];

    // Check for results
    if (!empty($users)) {
        // Loop through each user
        foreach ($users as $user) {
            $users_data[] = [
                'id'            => $user->ID,
                'user_login'    => $user->user_login,
                'user_nicename'    => $user->user_nicename,
                'email'         => $user->user_email,
                'registered_at' => $user->user_registered,
                'url'           => $user->user_url,
                'status'        => $user->status ? $user->status : false,
                'display_name'  => $user->display_name,
                'roles'         => $user->roles,
            ];
        }
    } else {
        // No users found
        $users_data = ['message' => 'No users found.'];
    }

    return $users_data;
}

/**
 * Insert a new user
 *
 * @param $args
 * @return int|WP_Error
 */
function rud_insert_user( $args = [] ) {

    if ( empty( $args['name'] ) ) {
        return new \WP_Error( 'failed-to-insert', __( 'Name not found', 'rud' ) );
    }

    global $wpdb;

    $defaults = [
        'name'          => '',
        'email'         => '',
        'phone'         => '',
        'address'       => '',
        'created_by'    => get_current_user_id(),
        'created_at'    => current_time( 'mysql' )
    ];


    $data = wp_parse_args( $args, $defaults );

    error_log( print_r( $data, true ) );

    if ( isset( $data['id'] ) ) {
        $id = $data['id'];

        unset( $data['id'] );

        $updated = $wpdb->update(
            "{$wpdb->prefix}react_user_data_users",
            $data,
            [ 'id' => $id ],
            [
                '%s',
                '%s',
                '%s',
                '%s',
                '%d',
                '%s'
            ],
            [ '%d' ]
        );
        return $updated;
    } else {

        $inserted = $wpdb->insert(
            "{$wpdb->prefix}react_user_data_users",
            $data,
            [
                '%s',
                '%s',
                '%s',
                '%s',
                '%d',
                '%s'
            ]
        );

        if ( ! $inserted ) {
            return new \WP_Error( 'failed-to-insert', __( 'Failed to insert data', 'rud' ) );
        }

        return $wpdb->insert_id;
    }
}

/**
 * Fetch single data from a specific table in database
 *
 * @param $table_name
 * @param $id
 * @return array|object|stdClass|null
 */
function rud_fetch_single_data( $table_name ,$id ) {
    global $wpdb;

    return $wpdb->get_row(
        $wpdb->prepare( "SELECT * FROM {$wpdb->prefix}{$table_name} WHERE id = %d", $id )
    );
}


/**
 * Get the count of total Data
 *
 * @return int
 */
function rud_count( $table_name = '' ) {
    global $wpdb;
    return (int) $wpdb->get_var( "SELECT count(id) FROM {$wpdb->prefix}{$table_name}" );
}


function rud_delete_data( $table_name = '', $id ) {
    global $wpdb;

    $deleted =  $wpdb->delete(
        $wpdb->prefix . $table_name,
        [ 'id' => $id ],
        [ '%d' ]
    );

    if ( ! $deleted ) {
        return new \WP_Error( 'failed-to-insert', __( 'Failed to insert data', 'rud' ) );
    }

    return $deleted;
}