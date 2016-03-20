<?php

use App\Blog;
use App\Post;
use App\Project;
use App\Sponsor;
use App\Student;
use App\Tecnology;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::table('users')->delete();

        $project = Project::create(array(
            'title' => 'Plastic recycling',
            'year' => '2016',
            'partner' => 'Some partner',
            'location' => 'Kenya',
            'isActive' => 1,
            'longdescription' => 'The aim of PRA (Plastic Recycling Ahero) is the reduction of waste littering the
                environment, creating employment and revenues for the community and the of sustainable development. The
                 focus of the project is on plastic waste from the community of Ahero (households, industry and
                 healthcare).'
        ));

        $technologies = array(
            ['name' => 'water'],
            ['name' => 'fire']
        );

        foreach ($technologies as $technology) {
            $project->technologies()->save(Tecnology::create($technology));
        }

        $sponsors = array(
            ['name' => 'sponsor1'],
            ['name' => 'sponsor2'],
        );

        foreach ($sponsors as $sponsor) {
            $project->sponsors()->save(Sponsor::create($sponsor));
        }


        $users = array(
            ['name' => 'admin', 'email' => 'admin@cvo.be', 'password' => Hash::make('secret'), 'isAdmin' => 1],
            ['name' => 'student', 'email' => 'student@cvo.be', 'password' => Hash::make('secret'), 'isAStudent' => 1],
            [
                'name' => 'studentwithoutproject',
                'email' => 'studentwithoutproject@cvo.be',
                'password' => Hash::make('secret'),
                'isAStudent' => 1
            ]
        );

        foreach ($users as $user) {
            User::create($user);
        }

        $studentUser = User::where('student', '=', 'admin')->take(1)->get();

        $student = Student::create(array(
            'firstname' => 'student',
            'lastname' => 'lastnameStudent',
            'school' => 'someSchool',
            'study' => 'someStudy',
            'year' => '2008',
            'intrest' => 'someIntrest',
            'users_id' => $studentUser[0]->id,
            'project_id' => $project->id
        ));

        $studentUser = User::where('name', '=', 'studentwithoutproject')->take(1)->get();

        $noProjectStudent = Student::create(array(
            'firstname' => 'studentwithoutproject',
            'lastname' => 'lastnameStudent',
            'school' => 'someSchool',
            'study' => 'someStudy',
            'year' => '2008',
            'intrest' => 'someIntrest',
            'users_id' => $studentUser[0]->id,
            'project_id' => null,
            'isActive' => false
        ));

        $blog = Blog::create(array(
            'year' => '2016',
            'title' => 'someBLog',
            'project_id' => $project->id
        ));

        $post = Post::create(array(
            'title' => 'someBlogTitle',
            'student_id' => $student->id,
            'blog_id' => $blog->id,
            'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis ut sapien eu lobortis.
            Nullam maximus enim nec diam pellentesque, vitae euismod ex lobortis. Morbi ac mattis dui, a convallis
            turpis. Donec aliquet commodo risus, ut ultricies justo pulvinar a. In porttitor imperdiet leo vel blandit.
             Pellentesque finibus ante ac dapibus efficitur. Sed malesuada eget augue quis accumsan. Curabitur laoreet
             sapien iaculis urna finibus sagittis. Sed sed nisi mauris. Aenean nunc lorem, elementum id rutrum at,
             efficitur vitae lectus. Aenean pretium, magna ac mattis pretium, augue orci elementum est, sed convallis
             arcu mauris mollis justo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
             mus. Praesent id odio risus.'
        ));

        Model::reguard();

    }
}
