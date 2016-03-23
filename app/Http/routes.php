<?php

Route::get('/', function () {
    return view('index');
})->name('index');

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

    Route::get('project/all', 'ProjectController@getAllProjects');
    Route::put('project/active/{id}', 'ProjectController@toggleActive');
    Route::post('project/create', 'ProjectController@create');
    Route::put('project/update/{id}', 'ProjectController@update');
    Route::post('project/updateFile/{id}', 'ProjectController@updateWithFile');
    Route::get('project/viewFile/{id}', 'ProjectController@viewFile');
    Route::get('project/{id}/student', 'ProjectController@getProjectStudents');
    Route::post('createUser', 'UserController@store');

    Route::get('post/recent', 'PostController@getRecentTeasers');

    Route::post('user', 'UserController@store');

    Route::resource('post', 'PostController');
    Route::resource('student', 'StudentController');
    Route::resource('project', 'ProjectController');
    Route::resource('technology', 'TechnologyController');
    Route::resource('sponsor', 'SponsorController');
});
