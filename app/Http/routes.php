<?php

Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'api'], function () {
    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('authenticate', 'AuthenticateController@authenticate');
    Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
    Route::get('authenticate/refresh', 'AuthenticateController@refreshToken');

    Route::put('student/active/{id}', 'StudentController@toggleActive');
    Route::put('student/{studentId}/connecProject/{projectId}', 'StudentController@connectToProject');
    Route::put('student/{studentId}/disconnectProject', 'StudentController@disconnectStudentFromProject');
    Route::get('student/{studentId}/posts', 'StudentController@getBlogPostsForStudent');
    Route::post('student/{id}/post', 'StudentController@addStudentPost');
    Route::resource('post', 'PostController');
    Route::resource('student', 'StudentController');

    Route::get('project/all', 'ProjectController@getAllProjects');
    Route::put('project/active/{id}', 'ProjectController@toggleActive');
    Route::resource('user', 'UserController');
    Route::resource('project', 'ProjectController');
});
