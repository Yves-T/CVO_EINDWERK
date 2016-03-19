<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->safeEmail,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Student::class, function (Faker\Generator $faker) {
    return [
        'firstname' => $faker->firstName,
        'lastname' => $faker->lastName,
        'school' => $faker->word,
        'study' => $faker->word,
        'year' => $faker->year($max = 'now'),
        'intrest' => $faker->word
    ];
});

$factory->define(App\Project::class, function (Faker\Generator $faker) {
    return [
        'title' => $faker->word,
        'year' => $faker->word,
        'partner' => $faker->word,
        'location' => $faker->word,
        'isActive' => true,
        'longdescription' => $faker->word
    ];
});