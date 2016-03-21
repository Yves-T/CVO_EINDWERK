<?php

namespace App\Http\Controllers;

use App\Post;
use App\Project;
use App\Student;
use App\User;
use DB;
use Illuminate\Http\Request;

use App\Http\Requests;

class StudentController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // eager loading of student's project
        $students = Student::with('project')->get();
        foreach ($students as $student) {
            $student->project;
        }
        return response()->json($students);
    }

    /**
     * Get posts for given student id.
     * @param $id
     * @return mixed
     */
    public function getBlogPostsForStudent($id)
    {
        $user = User::findOrFail($id);
        $students = $user->students()->take(1)->get();
        $student = $students[0];
        $posts = $student->posts;
        return response()->json($posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        $student = Student::findOrFail($id);

        $user = $student->user;
        $user->name = $request->studentFirstName . ' ' . $request->studentLasttName;
        $user->email = $request->studentEmail;

        $student->firstname = $request->studentFirstName;
        $student->lastname = $request->studentLastName;
        $student->school = $request->studentSchool;
        $student->study = $request->studentStudy;
        $student->year = $request->studentYear;
        $student->intrest = $request->studentIntrest;
        $student->isActive = $request->studentActive;

        $user->update();
        $student->update();

        DB::commit();
        return response()->json($student->firstname . ' ' . $student->lastname);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Toggle isActive status
     * @param $id
     * @return mixed
     */
    public function toggleActive($id)
    {
        $student = Student::findOrFail($id);
        $active = $student->isActive;
        $active = !$active;
        $student->isActive = $active;
        $student->update();
        return response()->json($id);
    }

    /**
     * Connect a given student to a given project.
     * @param $studentId
     * @param $projectId
     * @return mixed
     */
    public function connectToProject($studentId, $projectId)
    {
        $student = Student::findOrFail($studentId);
        $project = Project::findOrFail($projectId);
        $student->project()->associate($project);
        $student->update();
        return response()->json($project);
    }

    /**
     * Disconnect a given student from a given project.
     * @param $studentId
     * @param $projectId
     */
    public function disconnectStudentFromProject($studentId)
    {
        $student = Student::findOrFail($studentId);
        $student->project_id = null;
        $student->update();
        return response()->json($studentId);
    }

    /**
     * Persist post and associate with given student.
     * @param $studentId
     * @param Request $request
     * @return mixed
     */
    public function addStudentPost($id, Request $request)
    {

        $user = User::findOrFail($id);
        $students = $user->students()->take(1)->get();
        $student = $students[0];
        $project = $student->project;
        $blog = $project->blog;
        $post = new Post();
        $post->title = $request->postTitle;
        $post->content = $request->postcontent;
        $post->student()->associate($student);
        $post->blog()->associate($blog);
        $post->save();
        return response()->json($post->id);
    }
}
