<?php

use App\Blog;
use App\Comment;
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

        $anotherProject = Project::create(array(
            'title' => 'Finishing the coffee beans humidity sensor project.',
            'year' => '2016',
            'partner' => 'And yet another partner',
            'location' => 'Peru',
            'isActive' => 1,
            'longdescription' => 'The goals of this project in 2016 are:
                Finalize testing and finish final product
                Perform a solid market analysis
                Sign contracts with local partners to fabricate, distribute and repair the devices in Peru
                Start marketing campaign in Jaen, starting in drying centres.'
        ));

        $technologies = array(
            ['name' => 'water'],
            ['name' => 'fire']
        );

        foreach ($technologies as $technology) {
            $project->technologies()->save(Tecnology::create($technology));
        }

        $sponsors = array(
            ['name' => 'Umicore'],
            ['name' => 'AMS'],
            ['name' => 'Bierbeek'],
            ['name' => 'Wortegem-Petegem'],
            ['name' => 'Atlas Copco'],
            ['name' => 'Umicore'],
            ['name' => 'Stad Antwerpen'],
            ['name' => 'KUBFS'],
            ['name' => 'ING'],
            ['name' => 'Pidpa'],
            ['name' => 'H. Familie Sint-Niklaas'],
            ['name' => 'Idewe']
        );

        foreach ($sponsors as $sponsor) {
            $project->sponsors()->save(Sponsor::create($sponsor));
        }


        $users = array(
            ['name' => 'admin', 'email' => 'admin@cvo.be', 'password' => Hash::make('secret'), 'isAdmin' => 1],
            ['name' => 'anotheradmin', 'email' => 'pipo@cvo.be', 'password' => Hash::make('secret'), 'isAdmin' => 1],
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

        $studentUser = User::where('name', '=', 'student')->take(1)->get();

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

        $anotherBlog = Blog::create(array(
            'year' => '2016',
            'title' => 'secondBlog',
            'project_id' => $anotherProject->id
        ));

        $post = Post::create(array(
            'title' => 'Introduction of the project',
            'student_id' => $student->id,
            'blog_id' => $blog->id,
            'content' => '<p>Dear family and friends,</p>

<p>By this blog you’ll be able to follow my progression on the waste management project I’ll be conducting in Ahero, Kenya.
</p>
<p>
First a short introduction to the project:
Waste generation is expected to increase significantly as a result of industrialization, urbanization and modernization
of agriculture in Africa. Changing lifestyles and consumption patterns of the growing urban middle class, in particular,
is increasing the complexity and composition of waste streams. This will further aggravate current capacity constraints
in waste management. Waste management infrastructure is largely non-existent in rural areas in Africa. Improvements in
these infrastructures are urgently needed to combat the high cost of health services and thereby alleviate poverty and
reduce rural-urban migration.
</p>
<p>
A few months ago, the Ebenezer Life Centre asked Humasol in if they could help develop a solution for the increasing
waste problem in Ahero. Normally Humasol focusses on the design and implementation of renewable energy projects but for
the first time waste management is added to their project portfolio.
</p>
<p>
The Ebenezer Life center is a Christian faith-based non-profit organization founded by Winnie Owiti. They rescue and
 support orphans, abandoned children, homeless vulnerable teens from the streets and less fortunate widows. The Center
  provides shelter, food, clothing, education, healthcare, and vocational training through the different outreaches under
  its umbrella affecting more than 1000 children.</p>'
        ));

        $comment = Comment::create(array(
            'email' => 'eenGebuisdeStudent@cvo.be',
            'nickname' => 'het buizerke',
            'comment' => 'Ik vind dat Yves veel punten moet krijgen',
            'post_id' => $post->id
        ));

        $post = Post::create(array(
            'title' => 'Arrival in Kenya!',
            'student_id' => $student->id,
            'blog_id' => $blog->id,
            'content' => '<p>Dear family and friends,</p>
<p>
After a 12 hours flight I arrived in Nairobi early in the morning. Without visiting the capital, I immediately took the
bus straight to Ahero. Seven hours later, I got welcomed in by Kelly and Kilian, two members of the Ebenezer Life Center.
</p>
<p>
The project was actually launched a few weeks before my arrival in Kenya. I asked Tommy (Assistant Manager of Ebenezer)
to form a waste management team so they could start to brainstorm on the topic. That helped us a lot forward because on
the 18th of February we had our first meeting with het complete team (Figure 1 ). We decided to change our name from
waste management committee into recourse committee to show the people that waste doesn’t exist. During an intensive
meeting we discussed the opportunities of waste management for the Ebenezer life Centre.</p>'
        ));


        Model::reguard();

    }
}
